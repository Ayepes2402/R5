const canvas = document.querySelector("#visual-canvas");
const stage = document.querySelector("#stage");
const titleEl = document.querySelector("#moment-title");
const kickerEl = document.querySelector("#moment-kicker");
const subtitleEl = document.querySelector("#moment-subtitle");
const numberEl = document.querySelector("#moment-number");
const totalEl = document.querySelector("#moment-total");
const mobileNumberEl = document.querySelector("#mobile-moment-number");
const mobileTotalEl = document.querySelector("#mobile-moment-total");
const copyLayer = document.querySelector(".copy-layer");
const helpPanel = document.querySelector("#help-panel");
const operatorUi = document.querySelector("#operator-ui");
const qrLayer = document.querySelector("#qr-layer");
const qrMemory = document.querySelector("#qr-memory");
const qrSocial = document.querySelector("#qr-social");
const qrMemoryLink = document.querySelector("#qr-memory-link");
const qrSocialLink = document.querySelector("#qr-social-link");
const qrMemoryLabel = document.querySelector("#qr-memory-label");
const qrSocialLabel = document.querySelector("#qr-social-label");
const assetFrame = document.querySelector("#moment-asset");
const assetImage = document.querySelector("#moment-image");
const languageButtons = [...document.querySelectorAll("[data-language]")];
const helpButton = document.querySelector("#help-button");
const resetButton = document.querySelector("#reset-button");
const endButton = document.querySelector("#end-button");
const mobileFullscreenButton = document.querySelector("#mobile-fullscreen-button");

let activeIndex = 0;
let showHelp = false;
let activeLanguage = localStorage.getItem("forum-language") || CONFIG.defaultLanguage;
let transitionTimer = 0;
let assetClearTimer = 0;

const visualSystem = new VisualSystem(canvas);

const TITLE_HIGHLIGHTS = {
  "relevo-generacional": {
    es: [{ text: "RELEVO GENERACIONAL", tone: "cyan" }],
  },
  "universidad-mundo": {
    es: [{ text: "La Universidad decidió encontrarse con el mundo.", tone: "cyan" }],
  },
  impacto: {
    es: [{ text: "El impacto sí.", tone: "red" }],
  },
  comunidad: {
    es: [
      { text: "comunidad", tone: "cyan" },
      { text: "transformación", tone: "magenta" },
    ],
  },
  confianza: {
    es: [{ text: "confianza", tone: "magenta" }],
  },
  "nuevas-rutas": {
    es: [
      { text: "experiencia", tone: "cyan" },
      { text: "camino", tone: "magenta" },
      { text: "nuevas rutas", tone: "red" },
    ],
  },
  "vision-generaciones": {
    es: [{ text: "Dos generaciones", tone: "cyan" }],
  },
  "trabajan-juntas": {
    es: [
      { text: "crecimiento", tone: "cyan" },
      { text: "trabajan juntas", tone: "magenta" },
    ],
  },
  "presente-joven": {
    es: [{ text: "presente", tone: "red" }],
  },
  "futuro-construido": {
    es: [
      { text: "futuro", tone: "cyan" },
      { text: "Se construye", tone: "red" },
    ],
  },
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function makeQrPattern(element, value, imageUrl = "") {
  if (imageUrl) {
    element.style.backgroundColor = "#f6f1e8";
    element.style.backgroundImage = `url("${imageUrl}")`;
    element.style.backgroundPosition = "center";
    element.style.backgroundSize = "cover";
    element.style.backgroundRepeat = "no-repeat";
    element.title = value;
    return;
  }
  element.style.backgroundColor = "#f6f1e8";
  element.title = value;
}

function copyFor(moment) {
  return moment.copy?.[activeLanguage] || moment.copy?.[CONFIG.defaultLanguage] || moment.copy?.es || moment;
}

function highlightsFor(moment) {
  return TITLE_HIGHLIGHTS[moment.id]?.[activeLanguage] || TITLE_HIGHLIGHTS[moment.id]?.[CONFIG.defaultLanguage] || [];
}

function appendHighlightedText(parent, text, highlights) {
  if (!highlights.length) {
    parent.append(document.createTextNode(text));
    return;
  }
  const normalizedText = text.toLocaleLowerCase(activeLanguage);
  const ordered = [...highlights].sort((a, b) => b.text.length - a.text.length);
  let cursor = 0;

  while (cursor < text.length) {
    let next = null;
    for (const highlight of ordered) {
      const index = normalizedText.indexOf(highlight.text.toLocaleLowerCase(activeLanguage), cursor);
      if (index === -1) continue;
      if (!next || index < next.index || (index === next.index && highlight.text.length > next.text.length)) {
        next = { ...highlight, index };
      }
    }
    if (!next) {
      parent.append(document.createTextNode(text.slice(cursor)));
      break;
    }
    if (next.index > cursor) {
      parent.append(document.createTextNode(text.slice(cursor, next.index)));
    }
    const span = document.createElement("span");
    span.className = `title-highlight title-highlight--${next.tone}`;
    span.textContent = text.slice(next.index, next.index + next.text.length);
    parent.append(span);
    cursor = next.index + next.text.length;
  }
}

function renderTitle(moment, copy) {
  titleEl.replaceChildren();
  const parent = moment.state === "qr"
    ? Object.assign(document.createElement("a"), {
        href: CONFIG.qr.socialUrl,
        target: "_blank",
        rel: "noopener noreferrer",
      })
    : titleEl;
  appendHighlightedText(parent, copy.title, highlightsFor(moment));
  if (moment.state === "qr") {
    titleEl.append(parent);
  }
}

function updateLanguageUi() {
  document.documentElement.lang = activeLanguage;
  for (const button of languageButtons) {
    const isActive = button.dataset.language === activeLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.textContent = window.languageLabels[button.dataset.language] || button.dataset.language.toUpperCase();
  }
  const qrLabels = CONFIG.qr.labels?.[activeLanguage] || CONFIG.qr.labels?.[CONFIG.defaultLanguage] || {};
  qrMemoryLabel.textContent = qrLabels.memory || "Memorias";
  qrSocialLabel.textContent = qrLabels.social || "@centrodeeventosupb";
}

function assetFor(moment) {
  const configuredAsset = CONFIG.assets.byMoment?.[moment.id];
  return configuredAsset === false ? null : configuredAsset || moment.asset;
}

function setAsset(moment) {
  window.clearTimeout(assetClearTimer);
  const asset = assetFor(moment);
  if (asset?.type === "image" && asset.src) {
    const isBackground = asset.placement === "background";
    const changeImage = assetImage.getAttribute("src") !== asset.src;
    if (changeImage) {
      assetFrame.classList.remove("is-visible");
      assetClearTimer = window.setTimeout(() => {
        assetFrame.classList.toggle("is-background", isBackground);
        stage.classList.toggle("has-background-asset", isBackground);
        assetImage.src = asset.src;
        assetImage.alt = asset.alt || "";
        assetFrame.classList.add("is-visible");
      }, 140);
    } else {
      assetFrame.classList.toggle("is-background", isBackground);
      stage.classList.toggle("has-background-asset", isBackground);
      assetFrame.classList.add("is-visible");
    }
    return;
  }
  assetFrame.classList.remove("is-visible");
  assetClearTimer = window.setTimeout(() => {
    if (!assetFrame.classList.contains("is-visible")) {
      assetFrame.classList.remove("is-background");
      stage.classList.remove("has-background-asset");
      assetImage.removeAttribute("src");
      assetImage.alt = "";
    }
  }, 430);
}

function setMoment(index) {
  activeIndex = Math.max(0, Math.min(moments.length - 1, index));
  const moment = moments[activeIndex];
  const copy = copyFor(moment);
  const asset = assetFor(moment);
  const hasImageAsset = asset?.type === "image" && asset.src;
  const hasBackgroundAsset = hasImageAsset && asset.placement === "background";
  window.clearTimeout(transitionTimer);
  qrLayer.classList.toggle("is-visible", moment.state === "qr");
  copyLayer.classList.add("is-changing");
  transitionTimer = window.setTimeout(() => {
    stage.classList.toggle("is-title-moment", activeIndex === 0);
    stage.classList.toggle("is-closing-moment", activeIndex === moments.length - 1);
    stage.dataset.moment = moment.id;
    copyLayer.classList.toggle("is-qr", moment.state === "qr");
    copyLayer.classList.toggle("has-asset", hasImageAsset && !hasBackgroundAsset);
    copyLayer.classList.toggle("has-background-asset", hasBackgroundAsset);
    kickerEl.textContent = copy.kicker || CONFIG.brandLine;
    renderTitle(moment, copy);
    subtitleEl.textContent = copy.subtitle || "";
    numberEl.textContent = pad(activeIndex + 1);
    mobileNumberEl.textContent = pad(activeIndex + 1);
    requestAnimationFrame(() => {
      copyLayer.classList.remove("is-changing");
    });
  }, 140);
  setAsset(moment);
  visualSystem.setMoment(moment);
}

function nextMoment() { setMoment(activeIndex + 1); }
function previousMoment() { setMoment(activeIndex - 1); }

async function toggleFullscreen() {
  if (!document.fullscreenElement) { await stage.requestFullscreen(); } 
  else { await document.exitFullscreen(); }
}

function toggleHelp() {
  showHelp = !showHelp;
  helpPanel.classList.toggle("is-hidden", !showHelp);
  helpButton.setAttribute("aria-pressed", String(showHelp));
}

function tick() {
  visualSystem.render();
  requestAnimationFrame(tick);
}

document.querySelector("#next-button").addEventListener("click", nextMoment);
document.querySelector("#prev-button").addEventListener("click", previousMoment);
document.querySelector("#fullscreen-button").addEventListener("click", toggleFullscreen);
helpButton.addEventListener("click", toggleHelp);
resetButton.addEventListener("click", () => setMoment(0));
endButton.addEventListener("click", () => setMoment(moments.length - 1));
mobileFullscreenButton.addEventListener("click", toggleFullscreen);

for (const button of languageButtons) {
  button.addEventListener("click", () => {
    activeLanguage = button.dataset.language;
    localStorage.setItem("forum-language", activeLanguage);
    updateLanguageUi();
    setMoment(activeIndex);
  });
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "arrowright" || key === " ") { event.preventDefault(); nextMoment(); }
  if (key === "arrowleft") { event.preventDefault(); previousMoment(); }
  if (key === "f") { event.preventDefault(); toggleFullscreen(); }
  if (key === "h") { event.preventDefault(); toggleHelp(); }
  if (key === "r") { event.preventDefault(); setMoment(0); }
});

totalEl.textContent = String(moments.length);
mobileTotalEl.textContent = String(moments.length);
qrMemoryLink.href = CONFIG.qr.memoryUrl;
qrSocialLink.href = CONFIG.qr.socialUrl;
makeQrPattern(qrMemory, CONFIG.qr.memoryUrl, CONFIG.qr.memoryImage);
makeQrPattern(qrSocial, CONFIG.qr.socialUrl, CONFIG.qr.socialImage);
updateLanguageUi();
setMoment(0);
tick();