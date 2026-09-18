window.languageLabels = { es: "ES", pt: "PT" };

window.moments = [
  {
    id: "relevo-generacional",
    copy: { 
      es: { kicker: "Future Leaders Forum · Fórum UPB", title: "RELEVO GENERACIONAL: LA VENTAJA QUE NADIE ESTÁ APROVECHANDO", subtitle: "@centrodeeventosupb" },
      pt: { kicker: "Future Leaders Forum · Fórum UPB", title: "REVEZAMENTO GERACIONAL: A VANTAGEM QUE NINGUÉM ESTÁ APROVEITANDO", subtitle: "@centrodeeventosupb" }
    },
    state: "latent",
    intensity: 0.4,
    colors: ["#08a9dd", "#f7353f", "#9b59b6"],
    behavior: { network: 0.2, stability: 0.5, pulse: 0.3 }
  },
  {
    id: "auditorio-grados",
    copy: { 
      es: { kicker: "Espacio", title: "¿Un gran auditorio solo para hacer grados?", subtitle: "" },
      pt: { kicker: "Espaço", title: "Um grande auditório apenas para cerimônias de formatura?", subtitle: "" }
    },
    asset: { type: "image", src: "./assets/ceremonia-grados-placeholder.png", alt: "Ceremonia", placement: "background" },
    state: "architecture",
    intensity: 0.3,
    colors: ["#f7f7f4", "#08a9dd", "#9b59b6"],
    behavior: { network: 0.1, stability: 0.9, pulse: 0.1 }
  },
  {
    id: "universidad-mundo",
    copy: { 
      es: { kicker: "Encuentro", title: "Los eventos no llegaron a la Universidad. La Universidad decidió encontrarse con el mundo.", subtitle: "" },
      pt: { kicker: "Encontro", title: "Os eventos não chegaram à Universidade. A Universidade decidiu ir ao encontro do mundo.", subtitle: "" }
    },
    state: "expansion",
    intensity: 0.6,
    colors: ["#08a9dd", "#f7f7f4", "#f7353f"],
    behavior: { network: 0.5, stability: 0.3, pulse: 0.6 }
  },
  {
    id: "academia-industria-ciudad",
    copy: { 
      es: { kicker: "Tres fuerzas", title: "Academia + Industria + Ciudad", subtitle: "" },
      pt: { kicker: "Três forças", title: "Academia + Indústria + Cidade", subtitle: "" }
    },
    state: "triad",
    intensity: 0.7,
    colors: ["#08a9dd", "#f7353f", "#9b59b6"],
    behavior: { network: 0.7, stability: 0.6, pulse: 0.5 }
  },
  {
    id: "impacto",
    copy: { 
      es: { kicker: "Impacto", title: "Los eventos nunca fueron el objetivo. El impacto sí.", subtitle: "" },
      pt: { kicker: "Impacto", title: "Os eventos nunca foram o objetivo. O impacto sim.", subtitle: "" }
    },
    state: "impact",
    intensity: 0.8,
    colors: ["#f7353f", "#9b59b6", "#f7f7f4"],
    behavior: { network: 0.8, stability: 0.4, pulse: 0.9 }
  },
  {
    id: "comunidad",
    copy: { 
      es: { kicker: "Comunidad", title: "Un evento trae personas. Una comunidad trae transformación.", subtitle: "" },
      pt: { kicker: "Comunidade", title: "Um evento traz pessoas. Uma comunidade traz transformação.", subtitle: "" }
    },
    state: "community",
    intensity: 0.85,
    colors: ["#08a9dd", "#9b59b6", "#f7f7f4"],
    behavior: { network: 0.95, stability: 0.7, pulse: 0.8 }
  },
  {
    id: "confianza",
    copy: { 
      es: { kicker: "Confianza", title: "El talento crece a la velocidad de la confianza.", subtitle: "" },
      pt: { kicker: "Confiança", title: "O talento cresce na velocidade da confiança.", subtitle: "" }
    },
    state: "trust",
    intensity: 0.9,
    colors: ["#08a9dd", "#9b59b6", "#f7353f"],
    behavior: { network: 1.0, stability: 0.9, pulse: 0.9 }
  },
  {
    id: "nuevas-rutas",
    copy: { 
      es: { kicker: "Rutas", title: "La experiencia construye el camino. Las nuevas generaciones descubren nuevas rutas.", subtitle: "" },
      pt: { kicker: "Rotas", title: "A experiência constrói o caminho. As novas gerações descobrem novas rotas.", subtitle: "" }
    },
    state: "routes",
    intensity: 0.75,
    colors: ["#08a9dd", "#f7353f", "#9b59b6"],
    behavior: { network: 0.6, stability: 0.5, pulse: 0.6 }
  },
  {
    id: "vision-generaciones",
    copy: { 
      es: { kicker: "Relevo", title: "Una visión. Dos generaciones.", subtitle: "" },
      pt: { kicker: "Revezamento", title: "Uma visão. Duas gerações.", subtitle: "" }
    },
    state: "duality",
    intensity: 0.8,
    colors: ["#f7f7f4", "#08a9dd", "#f7353f"],
    behavior: { network: 0.4, stability: 0.8, pulse: 0.5 }
  },
  {
    id: "trabajan-juntas",
    copy: { 
      es: { kicker: "Composición", title: "El crecimiento no ocurre cuando una generación reemplaza a otra. Ocurre cuando trabajan juntas.", subtitle: "" },
      pt: { kicker: "Composição", title: "O crescimento não acontece quando uma geração substitui a outra. Acontece quando trabalham juntas.", subtitle: "" }
    },
    state: "convergence",
    intensity: 0.9,
    colors: ["#08a9dd", "#f7353f", "#9b59b6"],
    behavior: { network: 0.9, stability: 0.7, pulse: 0.8 }
  },
  {
    id: "presente-joven",
    copy: { 
      es: { kicker: "Presente", title: "Los jóvenes no son el futuro. Son el presente que muchas organizaciones aún no ven.", subtitle: "" },
      pt: { kicker: "Presente", title: "Os jovens não são o futuro. São o presente que muitas organizações ainda não veem.", subtitle: "" }
    },
    state: "present",
    intensity: 0.95,
    colors: ["#f7353f", "#08a9dd", "#f7f7f4"],
    behavior: { network: 0.8, stability: 0.4, pulse: 1.0 }
  },
  {
    id: "futuro-construido",
    copy: { 
      es: { kicker: "Futuro construido", title: "El futuro no se hereda. Se construye.", subtitle: "" },
      pt: { kicker: "Futuro construído", title: "O futuro não se herda. Constrói-se.", subtitle: "" }
    },
    state: "future",
    intensity: 1.0,
    colors: ["#f7f7f4", "#08a9dd", "#f7353f"],
    behavior: { network: 1.0, stability: 0.8, pulse: 0.9 }
  },
  {
    id: "qr-cierre",
    copy: { 
      es: { kicker: "Continuidad", title: "@centrodeeventosupb", subtitle: "" },
      pt: { kicker: "Continuidade", title: "@centrodeeventosupb", subtitle: "" }
    },
    state: "qr",
    intensity: 0.9,
    colors: ["#f7f7f4", "#08a9dd", "#f7353f"],
    behavior: { network: 0.9, stability: 0.9, pulse: 0.5 }
  },
];