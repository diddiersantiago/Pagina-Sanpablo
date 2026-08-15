import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import { PROYECTO_DATA } from "@/data/proyecto";
import { SITE_URL, SITE_NAME, PRECIOS_VIGENTES_HASTA } from "@/lib/site";
import "./globals.css";

/*
 * Fuentes:
 *  · Sin `weight`: ambas son variables, así que se sirve el eje completo
 *    (font-weight: 100 900 en Jost, 400 900 en Playfair). font-semibold y
 *    font-bold pasan a ser pesos reales en vez de negrita sintética, que es
 *    justo lo que arruina una didone. No cuesta un byte extra: es el mismo
 *    archivo variable que ya se descargaba.
 *  · Jost pierde `italic` (~50 kB): las cursivas las pone Playfair.
 *  · Ambas pierden `latin-ext` (~79 kB): lo único que lo forzaba eran los
 *    ordinales voladitos "3.ᵉʳ", ahora escritos "3er".
 *
 * Sobre el preload de fuentes (3.4): Next 15.5.23 NO emite
 * <link rel="preload" as="font">. Verificado que la causa no es nuestra
 * configuración — `next-font-manifest.json` sale con `"app": {}` y sigue vacío
 * tanto aplicando `className` como usando solo `variable`, y tanto con pesos
 * fijados como con el eje variable. El CSS y los .woff2 sí se generan bien.
 * Impacto real acotado: el LCP es el logo (ese sí lleva preload de imagen),
 * `display: swap` evita el texto invisible y Next genera fallbacks ajustados
 * por métrica ("Playfair Display Fallback"), que absorben el CLS del swap.
 * No se fuerza un preload manual porque el hash del archivo cambia en cada
 * build y quedaría desincronizado.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const jost = Jost({
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // 52 caracteres: entra completo en el SERP (~60).
  title: "Urbanización San Pablo · Casas VIS en Soracá, Boyacá",
  // 141 caracteres, con precio y ubicación adelantados.
  description:
    "Casas VIS en Soracá, Boyacá, a minutos de Tunja, desde $147 millones: 75,57 y 79,92 m² con garaje, balcones y planos para ampliar un 3er piso.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    "Urbanización San Pablo",
    "Casas VIS Soracá",
    "Vivienda de Interés Social Boyacá",
    "Casas cerca a Tunja",
    "Subsidio Mi Casa Ya",
    "Comfaboy vivienda",
    "Casas con garaje Soracá",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Urbanización San Pablo · Casas VIS en Soracá, Boyacá",
    description:
      "Casas VIS de 75,57 y 79,92 m² con garaje cubierto, balcones y planos para ampliar un 3er piso. Desde $147 millones.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_CO",
    type: "website",
    // La imagen la aporta app/opengraph-image.tsx (1200×630 exactos).
  },
  twitter: {
    card: "summary_large_image",
    title: "Urbanización San Pablo · Casas VIS en Soracá, Boyacá",
    description:
      "Casas VIS de 75,57 y 79,92 m² con garaje, balcones y planos para ampliar un 3er piso. Desde $147 millones.",
  },
  alternates: {
    canonical: "/",
  },
  // Sin bloque `icons`: lo resuelven app/icon.png, app/apple-icon.png y
  // app/favicon.ico por convención de archivo.
};

export const viewport: Viewport = {
  themeColor: "#2C3842",
  width: "device-width",
  initialScale: 1,
};

const ORG_ID = `${SITE_URL}/#promotor`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PAGE_ID = `${SITE_URL}/#pagina`;

const { ubicacionSeccion, inversion, areas, faq } = PROYECTO_DATA;

const postalAddress = {
  "@type": "PostalAddress",
  ...(ubicacionSeccion.direccion ? { streetAddress: ubicacionSeccion.direccion } : {}),
  addressLocality: "Soracá",
  addressRegion: "Boyacá",
  addressCountry: "CO",
};

/**
 * Producto multi-tipado: `Product` aporta `offers`, `SingleFamilyResidence`
 * aporta `floorSize` / `numberOfBedrooms`. Es la forma válida de combinarlos;
 * `RealEstateListing` es un tipo de PÁGINA y no admite `offers` ni `address`.
 */
const vivienda = (opts: {
  id: string;
  name: string;
  description: string;
  price: number;
  areaTotal: number;
  areaConstruida: number;
}) => ({
  "@type": ["Product", "SingleFamilyResidence"],
  "@id": `${SITE_URL}/#${opts.id}`,
  name: opts.name,
  description: opts.description,
  category: "Vivienda de Interés Social",
  address: postalAddress,
  numberOfBedrooms: 2,
  numberOfBathroomsTotal: 3,
  numberOfFullBathrooms: 2,
  numberOfRooms: 2,
  floorSize: {
    "@type": "QuantitativeValue",
    value: opts.areaTotal,
    unitCode: "MTK",
  },
  additionalProperty: {
    "@type": "PropertyValue",
    name: "Área construida en la entrega",
    value: opts.areaConstruida,
    unitCode: "MTK",
  },
  offers: {
    "@type": "Offer",
    price: opts.price,
    priceCurrency: "COP",
    availability: "https://schema.org/InStock",
    priceValidUntil: PRECIOS_VIGENTES_HASTA,
    url: SITE_URL,
    seller: { "@id": ORG_ID },
  },
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // NAP estructurado
    {
      "@type": "RealEstateAgent",
      "@id": ORG_ID,
      name: SITE_NAME,
      description:
        "Proyecto de Vivienda de Interés Social (VIS) en Soracá, Boyacá, a minutos de Tunja: casas de dos pisos con planos para ampliación a tercer piso y un local comercial.",
      url: SITE_URL,
      image: `${SITE_URL}/img/render-fachadas.jpg`,
      logo: `${SITE_URL}/icon-512.png`,
      telephone: "+573243582526",
      priceRange: "$$",
      address: postalAddress,
      areaServed: ubicacionSeccion.ciudadesServidas.map((nombre) => ({
        "@type": "Place",
        name: nombre,
      })),
      // TODO CLIENTE: añadir `geo` y `openingHoursSpecification` cuando se
      // confirmen coordenadas y horario de la sala de ventas.
      ...(ubicacionSeccion.geo.lat && ubicacionSeccion.geo.lng
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: ubicacionSeccion.geo.lat,
              longitude: ubicacionSeccion.geo.lng,
            },
          }
        : {}),
    },

    // Una oferta por tipología
    vivienda({
      id: "casa-esquinera",
      name: "Casa esquinera VIS · Urbanización San Pablo",
      description: inversion.tarjetas[0].detalle,
      price: 170000000,
      areaTotal: areas.tipologias[0].totalNum,
      areaConstruida: 59.33,
    }),
    vivienda({
      id: "casa-medianera",
      name: "Casa medianera VIS · Urbanización San Pablo",
      description: inversion.tarjetas[1].detalle,
      price: 147000000,
      areaTotal: areas.tipologias[1].totalNum,
      areaConstruida: 55.88,
    }),
    {
      "@type": "Product",
      "@id": `${SITE_URL}/#local-1`,
      name: "Local comercial 1 · Urbanización San Pablo",
      description: inversion.tarjetas[2].detalle,
      category: "Local comercial",
      floorSize: {
        "@type": "QuantitativeValue",
        value: 70.4,
        unitCode: "MTK",
      },
      offers: {
        "@type": "Offer",
        price: 217000000,
        priceCurrency: "COP",
        availability: "https://schema.org/InStock",
        priceValidUntil: PRECIOS_VIGENTES_HASTA,
        url: `${SITE_URL}/#local`,
        seller: { "@id": ORG_ID },
      },
    },
    // Los locales 2 y 3 están vendidos y no se publican como oferta.

    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "es-CO",
      publisher: { "@id": ORG_ID },
    },

    {
      "@type": ["WebPage", "RealEstateListing"],
      "@id": PAGE_ID,
      url: SITE_URL,
      name: "Urbanización San Pablo · Casas VIS en Soracá, Boyacá",
      inLanguage: "es-CO",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORG_ID },
      mainEntity: { "@id": `${SITE_URL}/#casa-medianera` },
      primaryImageOfPage: `${SITE_URL}/img/render-fachadas.jpg`,
      datePublished: "2026-01-01",
    },

    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      isPartOf: { "@id": PAGE_ID },
      // Cada acceptedAnswer es literalmente el texto visible del acordeón.
      mainEntity: faq.preguntas.map((p) => ({
        "@type": "Question",
        name: p.pregunta,
        acceptedAnswer: {
          "@type": "Answer",
          text: p.respuesta,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO" className={`${playfair.variable} ${jost.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-sp-navy text-sp-steel-ink selection:bg-sp-sand selection:text-sp-navy antialiased">
        <div id="reading-progress" />
        {children}
      </body>
    </html>
  );
}
