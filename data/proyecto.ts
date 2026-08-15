export interface TipologiaArea {
  tipologia: string;
  piso1: string;
  piso2: string;
  piso3: string;
  total: string;
  totalNum: number;
  descripcion: string;
}

export interface EspacioPlano {
  nombre: string;
  cantidad: number;
}

export interface LocalInfo {
  unidad: string;
  area: string;
  estado: "Disponible" | "VENDIDO";
  destacado?: boolean;
}

export interface TarjetaInversion {
  titulo: string;
  precioMillones: number;
  precioFormato: string;
  detalle: string;
  tipo: "esquinera" | "medianera" | "local";
}

export const PROYECTO_DATA = {
  marca: "Urbanización San Pablo",
  lema: "Hogares que construyen futuro",
  claim: "«Donde se construye tu futuro.»",
  categoria: "Proyecto VIS · Vivienda de Interés Social",
  ubicacion: "Soracá, Boyacá",
  distancia: "a minutos de Tunja",
  aval: "Municipio de Soracá · Boyacá",
  edicion: "Edición 2026",
  telefono: "324 358 2526",
  telefonoRaw: "573243582526",
  /** Formato internacional para consistencia NAP (texto visible + JSON-LD). */
  telefonoInternacional: "+57 324 358 2526",
  /** Destino de los enlaces tel: — en móvil permite llamar de un toque. */
  telefonoHref: "tel:+573243582526",
  whatsappUrl: "https://wa.me/573243582526?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Urbanizaci%C3%B3n%20San%20Pablo%20en%20Sorac%C3%A1",
  salaVentas: "Sala de ventas · Soracá, Boyacá",

  legal: "Imágenes de carácter ilustrativo. No constituyen oferta. Áreas aproximadas en m², sujetas a ajustes de diseño y licenciamiento · Soracá, Boyacá.",

  // 5.1 El Proyecto
  proyecto: {
    kicker: "01 · EL PROYECTO",
    titulo: "VIVIENDA DE INTERÉS SOCIAL EN SORACÁ",
    subtitulo: "Espacios únicos, familias que sueñan y crecen.",
    descripcion:
      "Urbanización San Pablo es un proyecto de Vivienda de Interés Social (VIS) que integra calidad, sostenibilidad y desarrollo para el crecimiento ordenado de Soracá. Casas de fachada en ladrillo a la vista, en dos tipologías —esquinera y medianera— con garaje cubierto, balcones y estructura prevista para crecer a un tercer piso, además de un local comercial sobre vía.",
  },

  // 5.2 ¿Qué significa que sea VIS?
  vis: {
    titulo: "¿QUÉ SIGNIFICA QUE SEA VIS?",
    puntos: [
      {
        titulo: "Precio regulado.",
        texto: "Valor tope definido por ley (hasta 135 SMMLV), pensado para las familias.",
      },
      {
        titulo: "Acceso a subsidios.",
        texto: "Aplica a programas de vivienda del Gobierno Nacional y de las cajas de compensación.",
      },
      {
        titulo: "Calidad garantizada.",
        texto: "Cumple normas técnicas de sismorresistencia, urbanismo y habitabilidad.",
      },
      {
        titulo: "Inversión que crece.",
        texto: "Alta valorización en un municipio en desarrollo, a minutos de Tunja.",
      },
    ],
    nota: "Subsidios aplicables según condiciones vigentes: Mi Casa Ya y subsidio familiar de vivienda de las cajas de compensación.",
  },

  // 5.3 Tabla de Áreas
  areas: {
    kicker: "ÁREAS POR TIPOLOGÍA · PROPIEDAD HORIZONTAL",
    notaTabla: "* Áreas en m². El 3° piso corresponde a la ampliación futura: se entregan los planos con la vivienda.",
    tipologias: [
      {
        tipologia: "Casa esquinera",
        piso1: "31,715",
        piso2: "27,61",
        piso3: "20,595",
        total: "79,92 m²",
        totalNum: 79.92,
        descripcion: "Dos frentes e iluminación adicional. 79,92 m² totales con ampliación.",
      },
      {
        tipologia: "Casa medianera",
        piso1: "30,385",
        piso2: "25,49",
        piso3: "19,69",
        total: "75,57 m²",
        totalNum: 75.57,
        descripcion: "Entre unidades, óptima en costo. 75,57 m² totales con ampliación.",
      },
      {
        tipologia: "Local comercial",
        piso1: "70,40",
        piso2: "—",
        piso3: "—",
        total: "70,40 m²",
        totalNum: 70.4,
        // Texto derivado de localComercial.descripcion, no del ayuda-ventas.
        descripcion: "Planta libre con doble acceso sobre vía principal.",
      },
    ] as TipologiaArea[],
  },

  // 5.4 Arquitectura
  arquitectura: {
    kicker: "ASÍ SE VE TU FUTURO",
    titulo: "ARQUITECTURA QUE VALORIZA",
    bajada: "Fachadas en ladrillo a la vista con carpintería negra: sobrias, durables y con carácter propio frente al paisaje boyacense.",
    fichas: [
      {
        titulo: "Balcones",
        detalle: "en cada fachada, con herrería forjada",
      },
      {
        titulo: "Garaje",
        detalle: "privado con portón de diseño",
      },
      {
        titulo: "Andenes",
        detalle: "arborizados e iluminación urbana",
      },
    ],
  },

  // 5.5 Planos comerciales
  planos: {
    primerPiso: {
      kicker: "02 · PLANOS COMERCIALES",
      titulo: "PRIMER PISO",
      subtitulo: "El área social de la casa: abierta, iluminada y con garaje propio.",
      pie: "PLANTA COMERCIAL · UNIDADES PAREADAS",
      notaArea: "Área privada construida por unidad en primer piso.",
      espacios: [
        { nombre: "Garaje cubierto con pérgola", cantidad: 1 },
        { nombre: "Sala", cantidad: 1 },
        { nombre: "Comedor", cantidad: 1 },
        { nombre: "Cocina", cantidad: 1 },
        { nombre: "Baño social", cantidad: 1 },
        { nombre: "Punto de escalera", cantidad: 1 },
      ] as EspacioPlano[],
      cifras: {
        esquinera: "31,715 m²",
        medianera: "30,385 m²",
      },
    },
    segundoPiso: {
      kicker: "02 · PLANOS COMERCIALES",
      titulo: "SEGUNDO PISO",
      subtitulo: "La zona de descanso: dos alcobas con baño y luz natural.",
      pie: "PLANTA COMERCIAL · ZONA PRIVADA",
      espacios: [
        { nombre: "Alcoba principal", cantidad: 1 },
        { nombre: "Alcoba auxiliar", cantidad: 1 },
        { nombre: "Baños completos", cantidad: 2 },
        { nombre: "Hall de escalera", cantidad: 1 },
        { nombre: "Terraza descubierta", cantidad: 1 },
      ] as EspacioPlano[],
      cifras: {
        esquinera: "27,61 m²",
        medianera: "25,49 m²",
      },
    },
    ampliacion: {
      kicker: "AMPLIACIÓN · TERCER PISO",
      destacado: "Cada vivienda se entrega con los planos arquitectónicos y estructurales para ampliar un tercer piso: 20,595 m² (esquinera) · 19,69 m² (medianera). La estructura queda prevista: la casa crece con tu familia.",
      rangoHoy: "55–59 m²",
      rangoFuturo: "75–80 m²",
    },
  },

  // 5.6 Local comercial
  localComercial: {
    kicker: "03 · LOCAL COMERCIAL",
    titulo: "LOCAL COMERCIAL",
    subtitulo: "Última oportunidad: solo queda un local disponible.",
    descripcion:
      "De los tres locales sobre el frente del proyecto, dos ya están vendidos. El Local 1 —el de mayor área— sigue disponible: planta libre de 70,40 m² con doble acceso sobre vía principal, baño privado y fachada con antejardín. Una inversión que crece con la llegada de nuevas familias al sector.",
    locales: [
      { unidad: "Local 1", area: "70,40 m²", estado: "Disponible", destacado: true },
      { unidad: "Local 2", area: "50,70 m²", estado: "VENDIDO" },
      { unidad: "Local 3", area: "21,50 m²", estado: "VENDIDO" },
    ] as LocalInfo[],
    detalles: {
      salonPrincipal: "Planta libre",
      accesos: "2 · doble puerta",
      banoPrivado: 1,
      areaTotal: "70,40 m²",
      valor: "$217 millones",
    },
    cintillo: "2 de 3 locales ya vendidos. El comercio del proyecto se está asegurando ahora — queda solo el de mayor área.",
  },

  // 5.7 Inversión
  inversion: {
    kicker: "04 · INVERSIÓN",
    titulo: "TU INVERSIÓN EN SAN PABLO",
    bajada: "Precio VIS regulado, subsidios vigentes y unidades limitadas: el momento de decidir es ahora.",
    tarjetas: [
      {
        titulo: "CASA ESQUINERA · VIS",
        precioMillones: 170,
        precioFormato: "$170 millones",
        detalle: "59,33 m² construidos · 79,92 m² con ampliación de tercer piso.",
        tipo: "esquinera",
      },
      {
        titulo: "CASA MEDIANERA · VIS",
        precioMillones: 147,
        precioFormato: "$147 millones",
        detalle: "55,88 m² construidos · 75,57 m² con ampliación de tercer piso.",
        tipo: "medianera",
      },
      {
        titulo: "LOCAL COMERCIAL",
        precioMillones: 217,
        precioFormato: "$217 millones",
        detalle: "Local 1 · 70,40 m² · planta libre con doble acceso y baño. Único disponible.",
        tipo: "local",
      },
    ] as TarjetaInversion[],
    notas: [
      "Por ser proyecto VIS, tu compra puede aplicar a subsidios de vivienda del Gobierno Nacional y de las cajas de compensación familiar, según condiciones vigentes.",
      "Cada casa se entrega con los planos para ampliar el tercer piso: compras hoy 55–59 m² y creces hasta 75–80 m² sin volver a diseñar.",
    ],
    cta: {
      kicker: "AGENDA TU VISITA",
      texto: "Escríbenos por WhatsApp y conoce el proyecto en Soracá.",
      telefono: "324 358 2526",
    },
  },

  // 5.8 Ubicación
  //
  // TODO CLIENTE — datos pendientes de confirmación, NO inventar:
  //   · direccion         → dirección o referencia vial exacta del proyecto
  //   · geo               → coordenadas (lat/lng) para el JSON-LD y el mapa
  //   · distanciaTunjaKm  → distancia en km al casco urbano de Tunja
  //   · tiempoTunjaMin    → tiempo en carro hasta Tunja
  //   · horario           → horario de atención de la sala de ventas
  // Mientras estén vacíos, la sección los omite en lugar de mostrar un hueco.
  ubicacionSeccion: {
    kicker: "UBICACIÓN Y ENTORNO",
    titulo: "UBICACIÓN: SORACÁ, BOYACÁ, A MINUTOS DE TUNJA",
    subtitulo: "El altiplano boyacense, con la capital del departamento al lado.",
    descripcion:
      "Urbanización San Pablo se desarrolla en el municipio de Soracá, Boyacá, a minutos de Tunja. Es un municipio en crecimiento ordenado, con servicios públicos, vías de acceso y la cercanía a la capital del departamento —donde estudian y trabajan la mayoría de las familias compradoras— sin el costo del suelo urbano de Tunja.",
    direccion: "",
    referenciaVial: "",
    distanciaTunjaKm: "",
    tiempoTunjaMin: "",
    horario: "",
    geo: { lat: "", lng: "" },
    mapaUrl: "",
    ciudadesServidas: ["Soracá", "Tunja", "Boyacá"],
  },

  // 5.9 Preguntas frecuentes
  //
  // El texto de cada respuesta se renderiza VISIBLE en la página (acordeón
  // <details>/<summary>: el contenido está siempre en el DOM). El JSON-LD de
  // FAQPage reutiliza literalmente estas mismas cadenas — si divergen, Google
  // trata el bloque como contenido oculto y lo penaliza.
  faq: {
    kicker: "PREGUNTAS FRECUENTES",
    titulo: "PREGUNTAS FRECUENTES SOBRE LAS CASAS VIS EN SORACÁ",
    preguntas: [
      {
        pregunta: "¿Qué es una vivienda VIS y qué beneficios tiene en Soracá, Boyacá?",
        respuesta:
          "VIS significa Vivienda de Interés Social: vivienda con precio regulado por ley, con un valor tope de hasta 135 SMMLV. Al ser VIS, Urbanización San Pablo tiene un precio máximo definido por norma, puede aplicar a programas de subsidio de vivienda del Gobierno Nacional y de las cajas de compensación familiar, y cumple las normas técnicas de sismorresistencia, urbanismo y habitabilidad. En un municipio en desarrollo como Soracá, a minutos de Tunja, eso se traduce además en potencial de valorización.",
      },
      {
        pregunta: "¿Cuánto cuesta una casa en Urbanización San Pablo?",
        respuesta:
          "La casa medianera cuesta $147 millones y la casa esquinera $170 millones. El local comercial disponible (Local 1, de 70,40 m²) tiene un valor de $217 millones. Son precios VIS regulados; consulta las condiciones vigentes con un asesor por WhatsApp al +57 324 358 2526.",
      },
      {
        pregunta: "¿Puedo aplicar al subsidio Mi Casa Ya?",
        respuesta:
          "Por tratarse de un proyecto de Vivienda de Interés Social, tu compra puede aplicar a programas de vivienda del Gobierno Nacional como Mi Casa Ya, según las condiciones y los cupos vigentes al momento de la solicitud. Quien define la asignación es el programa, no el proyecto: nuestros asesores te acompañan en la radicación y te indican qué requisitos debes cumplir.",
      },
      {
        pregunta: "¿Qué subsidios aplican en Boyacá y cómo funciona el de Comfaboy?",
        respuesta:
          "Además de los programas del Gobierno Nacional, puedes acceder al subsidio familiar de vivienda que otorgan las cajas de compensación familiar. En Boyacá la caja de compensación es Comfaboy, así que si estás afiliado a Comfaboy por tu empleador puedes consultar allí tu elegibilidad. Los montos, los requisitos y los plazos los define cada caja según sus condiciones vigentes.",
      },
      {
        pregunta: "¿A qué distancia está Soracá de Tunja?",
        respuesta:
          "Urbanización San Pablo está en Soracá, Boyacá, a minutos de Tunja en carro. Escríbenos por WhatsApp al +57 324 358 2526 y te compartimos la ruta exacta desde el centro de Tunja y la referencia para llegar a la sala de ventas.",
        // TODO CLIENTE: sustituir por la distancia (km) y el tiempo (min) reales.
      },
      {
        pregunta: "¿Cuántos metros cuadrados tiene cada casa?",
        respuesta:
          "La casa esquinera se entrega con 59,33 m² construidos en dos pisos y llega a 79,92 m² con la ampliación del tercer piso. La casa medianera se entrega con 55,88 m² construidos y llega a 75,57 m² con la ampliación. El desglose por nivel es: esquinera 31,715 m² en primer piso, 27,61 m² en segundo y 20,595 m² de ampliación; medianera 30,385 m², 25,49 m² y 19,69 m² respectivamente.",
      },
      {
        pregunta: "¿Realmente puedo construir un tercer piso? ¿Está incluido en el precio?",
        respuesta:
          "Sí. Cada vivienda se entrega con los planos arquitectónicos y estructurales del tercer piso, y la estructura queda calculada y prevista para soportarlo. Lo que está incluido en el precio son los dos pisos construidos —55,88 m² en la medianera y 59,33 m² en la esquinera— más esos planos: la obra del tercer piso la ejecutas cuando lo necesites, sin volver a diseñar ni reforzar.",
      },
      {
        pregunta: "¿Qué diferencia hay entre la casa esquinera y la medianera?",
        respuesta:
          "La casa esquinera tiene dos frentes, lo que le da iluminación natural adicional, y suma 79,92 m² totales con ampliación por un valor de $170 millones. La casa medianera se ubica entre dos unidades, es la opción óptima en costo, y suma 75,57 m² totales con ampliación por $147 millones. Ambas tienen la misma distribución interior: garaje cubierto, sala, comedor, cocina y baño social en primer piso; dos alcobas, dos baños completos y terraza en segundo piso.",
      },
    ],
  },

  // Navbar Links
  navLinks: [
    { label: "El proyecto", href: "#proyecto" },
    { label: "Arquitectura", href: "#arquitectura" },
    { label: "Ubicación", href: "#ubicacion" },
    { label: "Planos", href: "#planos" },
    { label: "Local", href: "#local" },
    { label: "Inversión", href: "#inversion" },
  ],
};
