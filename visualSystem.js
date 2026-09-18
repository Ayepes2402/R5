const TAU = Math.PI * 2;
const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
const lerp = (a, b, t) => a + (b - a) * t;

function hexToRgb(hex) {
  const clean = (hex || "#ffffff").replace("#", "");
  const n = parseInt(clean, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

class VisualSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = 1;
    this.height = 1;
    this.dpr = 1;
    this.time = 0;
    this.momentId = "relevo-generacional";
    this.colors = ["#08a9dd", "#f7353f", "#9b59b6"];
    
    this.particles = Array.from({ length: 70 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.003,
      vy: (Math.random() - 0.5) * 0.003,
      baseRadius: 2.5 + Math.random() * 3.0,
      angle: Math.random() * TAU,
      speed: 0.5 + Math.random() * 1.5,
      orbitRadius: 0.1 + Math.random() * 0.3,
      group: i % 3
    }));

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  setMoment(moment) {
    if (!moment) return;
    this.momentId = moment.id;
    let baseColors = moment.colors || ["#08a9dd", "#f7353f", "#9b59b6"];
    this.colors = baseColors;
    this.time = 0; 
  }

  render() {
    this.time += 1 / 60;
    const ctx = this.ctx;
    if (!ctx) return;
    
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.fillStyle = "rgba(4, 6, 10, 0.85)";
    ctx.fillRect(0, 0, this.width, this.height);

    switch (this.momentId) {
      case "relevo-generacional":
        this.drawRelayPulse(ctx);
        break;
      case "auditorio-grados":
        this.drawRisingSparks(ctx);
        break;
      case "universidad-mundo":
        this.drawPeripheralWorld(ctx);
        break;
      case "academia-industria-ciudad":
        this.drawTriadNodes(ctx);
        break;
      case "impacto":
        this.drawImpactBurst(ctx);
        break;
      case "comunidad":
        this.drawSwarmCommunity(ctx);
        break;
      case "confianza":
        this.drawTrustWeb(ctx);
        break;
      case "nuevas-rutas":
        this.drawPathTrails(ctx);
        break;
      case "vision-generaciones":
        this.drawDualOrbits(ctx);
        break;
      case "trabajan-juntas":
        this.drawHarmonicFusion(ctx); 
        break;
      case "presente-joven":
        this.drawFastPulses(ctx);
        break;
      case "futuro-construido":
        this.drawAscendingMatrix(ctx);
        break;
      case "qr-cierre":
        this.drawDigitalConstellation(ctx); 
        break;
      default:
        this.drawSwarmCommunity(ctx);
        break;
    }
  }

  drawRelayPulse(ctx) {
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;
    ctx.save();
    ctx.shadowBlur = 15;
    for (let i = 0; i < 4; i++) {
      const radius = ((this.time * 60 + i * 80) % 400);
      const alpha = Math.max(0, 1 - radius / 400);
      const col = this.colors[i % this.colors.length];
      ctx.strokeStyle = rgba(col, alpha * 0.9);
      ctx.shadowColor = col;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawRisingSparks(ctx) {
    ctx.save();
    ctx.shadowBlur = 15;
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      let x = p.x * this.width + Math.sin(this.time * 1.5 + p.y * 20) * 25;
      let y = ((p.y * this.height - this.time * 150 * p.speed) % this.height + this.height) % this.height;
      
      let col = this.colors[i % this.colors.length];
      let alpha = Math.sin((y / this.height) * Math.PI); 

      ctx.fillStyle = rgba(col, alpha);
      ctx.shadowColor = col;
      ctx.beginPath();
      ctx.arc(x, y, p.baseRadius * 1.8, 0, TAU);
      ctx.fill();

      ctx.strokeStyle = rgba(col, alpha * 0.4);
      ctx.lineWidth = p.baseRadius * 0.8;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + p.speed * 30);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawPeripheralWorld(ctx) {
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;
    const safeRadius = this.width * 0.38; 

    ctx.save();
    ctx.shadowBlur = 12;
    
    let currentPositions = [];
    
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      let px = (p.x * this.width + Math.cos(this.time * 0.5 + p.y * 10) * 100);
      let py = (p.y * this.height + Math.sin(this.time * 0.5 + p.x * 10) * 100);

      px = (px % this.width + this.width) % this.width;
      py = (py % this.height + this.height) % this.height;

      let dx = px - cx;
      let dy = py - cy;
      let dist = Math.hypot(dx, dy) || 1;

      if (dist < safeRadius) {
        px = cx + (dx / dist) * safeRadius;
        py = cy + (dy / dist) * safeRadius;
      }
      
      currentPositions.push({ 
        x: px, 
        y: py, 
        col: this.colors[i % this.colors.length], 
        r: p.baseRadius 
      });
    }

    for (let i = 0; i < currentPositions.length; i++) {
      let p1 = currentPositions[i];
      
      for (let j = i + 1; j < currentPositions.length; j++) {
        let p2 = currentPositions[j];
        let d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (d < 110) {
          ctx.strokeStyle = rgba(p1.col, 0.25);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = rgba(p1.col, 1.0);
      ctx.shadowColor = p1.col;
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, p1.r * 1.5, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }

  drawTriadNodes(ctx) {
    const t = this.time;
    const colWidth = this.width / 4;

    ctx.save();
    ctx.shadowBlur = 15;
    for (let c = 0; c < 3; c++) {
      let centerX = colWidth * (c + 1);
      let color = this.colors[c % this.colors.length];

      ctx.strokeStyle = rgba(color, 0.35);
      ctx.shadowColor = color;
      ctx.lineWidth = 24;
      ctx.beginPath();
      ctx.moveTo(centerX, this.height * 0.2);
      ctx.lineTo(centerX, this.height * 0.8);
      ctx.stroke();

      for (let i = 0; i < 14; i++) {
        let pY = ((this.height * 0.8) - ((t * 80 + i * 35 + c * 40) % (this.height * 0.6)));
        let pX = centerX + Math.sin(t * 2 + i + c) * 15;

        ctx.fillStyle = rgba(color, 1.0);
        ctx.fillRect(pX - 5, pY - 8, 10, 16);
      }
    }

    ctx.strokeStyle = rgba(this.colors[0], 0.9);
    ctx.shadowColor = this.colors[0];
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(colWidth, this.height * 0.5 + Math.sin(t * 2.5) * 40);
    ctx.lineTo(colWidth * 2, this.height * 0.5 + Math.cos(t * 2.5) * 40);
    ctx.lineTo(colWidth * 3, this.height * 0.5 + Math.sin(t * 2) * 40);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  drawImpactBurst(ctx) {
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;
    const t = this.time * 2;

    ctx.save();
    ctx.shadowBlur = 18;
    for (let i = 1; i <= 6; i++) {
      let size = ((t * 90 + i * 70) % (this.width * 0.8));
      let alpha = Math.max(0, 1 - size / (this.width * 0.8));
      let col = this.colors[i % this.colors.length];

      ctx.strokeStyle = rgba(col, alpha * 0.95);
      ctx.shadowColor = col;
      ctx.lineWidth = 3;
      ctx.strokeRect(cx - size * 0.8, cy - size * 0.5, size * 1.6, size);
    }
    ctx.restore();
  }

  drawSwarmCommunity(ctx) {
    ctx.save();
    ctx.shadowBlur = 12;
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.x += Math.cos(this.time + p.y * 10) * 0.002;
      p.y += Math.sin(this.time + p.x * 10) * 0.002;

      let px = p.x * this.width;
      let py = p.y * this.height;
      let col = this.colors[i % this.colors.length];

      ctx.fillStyle = rgba(col, 1.0);
      ctx.shadowColor = col;
      ctx.beginPath();
      ctx.arc(px, py, p.baseRadius * 2.0, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }

  drawTrustWeb(ctx) {
    ctx.save();
    ctx.shadowBlur = 15;
    
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.x += p.vx * 0.8;
      p.y += p.vy * 0.8;
      if (p.x <= 0 || p.x >= 1) p.vx *= -1;
      if (p.y <= 0 || p.y >= 1) p.vy *= -1;
      p.x = clamp(p.x, 0, 1);
      p.y = clamp(p.y, 0, 1);
    }

    for (let i = 0; i < this.particles.length; i++) {
      let p1 = this.particles[i];
      let px1 = p1.x * this.width;
      let py1 = p1.y * this.height;
      let col = this.colors[i % this.colors.length];

      for (let j = i + 1; j < this.particles.length; j++) {
        let p2 = this.particles[j];
        let px2 = p2.x * this.width;
        let py2 = p2.y * this.height;
        let dist = Math.hypot(px1 - px2, py1 - py2);

        if (dist < 130) {
          let alpha = 1 - (dist / 130);
          ctx.strokeStyle = rgba(col, alpha * 0.6);
          ctx.shadowColor = col;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.lineTo(px2, py2);
          ctx.stroke();
        }
      }

      ctx.fillStyle = rgba(col, 1.0);
      ctx.shadowColor = col;
      ctx.beginPath();
      ctx.arc(px1, py1, p1.baseRadius * 2.2, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }

  drawPathTrails(ctx) {
    ctx.save();
    ctx.shadowBlur = 12;
    ctx.lineWidth = 3;
    for (let i = 0; i < 15; i++) {
      let yOffset = (i / 15) * this.height;
      let col = this.colors[i % this.colors.length];
      ctx.strokeStyle = rgba(col, 0.85);
      ctx.shadowColor = col;
      ctx.beginPath();
      for (let x = 0; x < this.width; x += 20) {
        let y = yOffset + Math.sin(x * 0.01 + this.time * 2 + i) * 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  drawDualOrbits(ctx) {
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;
    ctx.save();
    ctx.shadowBlur = 15;
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      let dir = i % 2 === 0 ? 1 : -1;
      let angle = p.angle + this.time * dir * 1.2;
      let radius = 90 + (i % 5) * 40;
      let x = cx + Math.cos(angle) * radius;
      let y = cy + Math.sin(angle) * radius;
      let col = this.colors[i % this.colors.length];

      ctx.fillStyle = rgba(col, 1.0);
      ctx.shadowColor = col;
      ctx.beginPath();
      ctx.arc(x, y, p.baseRadius * 2.0, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }

  drawHarmonicFusion(ctx) {
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;
    
    const blueColor = this.colors[0] || "#08a9dd"; 
    const redColor = "#f7353f"; // Color rojo restaurado
    const mixColor = "#9b59b6"; 

    let rawCycle = Math.sin(this.time * 1.5); 
    let cycle = Math.max(0, rawCycle + 0.4); 
    let distance = cycle * 110; 

    let radius = 55;
    let joinIntensity = distance === 0 ? 1 : Math.max(0, 1 - (distance / 35));

    ctx.save();
    ctx.lineCap = "round";

    if (joinIntensity > 0) {
      ctx.fillStyle = rgba(mixColor, joinIntensity * 0.3);
      ctx.shadowColor = mixColor;
      ctx.shadowBlur = 45 * joinIntensity;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 3 * joinIntensity, 0, TAU);
      ctx.fill();

      ctx.strokeStyle = rgba(mixColor, joinIntensity * 0.95);
      ctx.lineWidth = 8 * joinIntensity;
      ctx.beginPath();
      ctx.arc(cx, cy, radius + (1 - joinIntensity) * 60, 0, TAU);
      ctx.stroke();
    }

    let drawSegmentedRing = (x, y, col, rotation, rad, segments) => {
      ctx.strokeStyle = col;
      ctx.shadowColor = col;
      ctx.shadowBlur = 15;
      ctx.lineWidth = 12;
      let gap = 0.6;
      
      for (let i = 0; i < segments; i++) {
        let startAngle = rotation + (i * TAU / segments) + gap / 2;
        let endAngle = rotation + ((i + 1) * TAU / segments) - gap / 2;
        ctx.beginPath();
        ctx.arc(x, y, rad, startAngle, endAngle);
        ctx.stroke();
      }
    };

    let leftColor = joinIntensity > 0.8 ? mixColor : blueColor;
    drawSegmentedRing(cx - distance, cy, leftColor, this.time * 1.2, radius, 4);
    
    let rightColor = joinIntensity > 0.8 ? mixColor : redColor; 
    drawSegmentedRing(cx + distance, cy, rightColor, -this.time * 1.2, radius, 4);

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      let isGroup1 = i % 2 === 0;
      
      let ringCenter = isGroup1 ? cx - distance : cx + distance;
      let burstForce = Math.pow(joinIntensity, 2.5) * 180 * p.speed;
      let currentOrbit = radius + 20 + (p.orbitRadius * 30) + burstForce;
      let angle = p.angle + this.time * p.speed * (isGroup1 ? 1 : -1) + (joinIntensity * 3);
      
      let px = ringCenter + Math.cos(angle) * currentOrbit;
      let py = cy + Math.sin(angle) * currentOrbit;

      let pColor = joinIntensity > 0.5 ? mixColor : (isGroup1 ? blueColor : redColor); 
      
      ctx.fillStyle = pColor;
      ctx.shadowColor = pColor;
      ctx.shadowBlur = 10;
      
      ctx.beginPath();
      ctx.arc(px, py, p.baseRadius * 1.5, 0, TAU);
      ctx.fill();
    }

    ctx.restore();
  }

  drawFastPulses(ctx) {
    ctx.save();
    ctx.shadowBlur = 15;
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      let x = (p.x * this.width);
      let y = ((p.y * this.height - this.time * 220 * p.speed) % this.height);
      if (y < 0) y += this.height;
      let col = this.colors[i % this.colors.length];

      ctx.fillStyle = rgba(col, 1.0);
      ctx.shadowColor = col;
      ctx.fillRect(x, y, 4, 22);
    }
    ctx.restore();
  }

  drawAscendingMatrix(ctx) {
    ctx.save();
    ctx.shadowBlur = 15;
    const rows = 6;
    const cols = 15;
    const stepX = this.width / cols;
    const stepY = this.height / rows;

    let index = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let x = c * stepX + stepX * 0.5;
        let y = r * stepY + stepY * 0.5 + Math.sin(this.time * 3 + c) * 10;
        let color = this.colors[index % this.colors.length];

        ctx.fillStyle = rgba(color, 1.0);
        ctx.shadowColor = color;
        ctx.fillRect(x - 6, y - 6, 12, 12);
        index++;
      }
    }
    ctx.restore();
  }

  drawDigitalConstellation(ctx) {
    ctx.save();
    ctx.shadowBlur = 12;
    ctx.lineWidth = 1;

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      
      p.x += Math.cos(this.time * 0.3 + p.y * 5) * 0.0008;
      p.y += Math.sin(this.time * 0.3 + p.x * 5) * 0.0008;

      if (p.x < 0) p.x = 1; 
      if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1; 
      if (p.y > 1) p.y = 0;

      let px = p.x * this.width;
      let py = p.y * this.height;
      let col = this.colors[i % this.colors.length];

      for (let j = i + 1; j < this.particles.length; j++) {
        let p2 = this.particles[j];
        let px2 = p2.x * this.width;
        let py2 = p2.y * this.height;
        let dist = Math.hypot(px - px2, py - py2);

        if (dist < 180) {
          let alpha = 1 - (dist / 180);
          ctx.strokeStyle = rgba(col, alpha * 0.4);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px2, py2);
          ctx.stroke();
        }
      }

      ctx.fillStyle = rgba(col, 0.9);
      ctx.shadowColor = col;
      ctx.beginPath();
      ctx.arc(px, py, p.baseRadius * 1.2, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
  }
}