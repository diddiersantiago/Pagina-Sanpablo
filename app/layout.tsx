import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Urbanización San Pablo · Casas VIS en Soracá, Boyacá | Desde $147 millones",
  description:
    "Proyecto VIS en Soracá, Boyacá: casas de 75,57 y 79,92 m² en ladrillo a la vista, con garaje, balcones y planos para ampliar un tercer piso. Aplica a subsidios. Desde $147 millones.",
  keywords: [
    "Urbanización San Pablo",
    "Casas VIS Soracá",
    "Vivienda de Interés Social Boyacá",
    "Casas cerca a Tunja",
    "Subsidio Mi Casa Ya",
    "Comfaboy vivienda",
    "Casas con garaje Soraca",
  ],
  authors: [{ name: "Urbanización San Pablo" }],
  metadataBase: new URL("https://urbanizacionsanpablo.com"),
  openGraph: {
    title: "Urbanización San Pablo · Casas VIS en Soracá, Boyacá",
    description:
      "Casas VIS de 75,57 y 79,92 m² con garaje cubierto, balcones y planos para ampliar un 3.ᵉʳ piso. Desde $147 millones.",
    url: "https://urbanizacionsanpablo.com",
    siteName: "Urbanización San Pablo",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/img/render-fachadas.jpg",
        width: 1200,
        height: 630,
        alt: "Fachadas en ladrillo a la vista de Urbanización San Pablo, Soracá, Boyacá",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/img/logo-san-pablo.png",
    apple: "/img/logo-san-pablo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: "Urbanización San Pablo",
    description:
      "Proyecto de Vivienda de Interés Social (VIS) en Soracá, Boyacá. Casas de dos pisos con planos para ampliación a tercer piso y locales comerciales.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Soracá",
      addressRegion: "Boyacá",
      addressCountry: "CO",
    },
    telephone: "+573243582526",
    priceRange: "$147.000.000 COP - $217.000.000 COP",
    offers: [
      {
        "@type": "Offer",
        name: "Casa Medianera VIS",
        price: "147000000",
        priceCurrency: "COP",
        category: "Vivienda de Interés Social",
      },
      {
        "@type": "Offer",
        name: "Casa Esquinera VIS",
        price: "170000000",
        priceCurrency: "COP",
        category: "Vivienda de Interés Social",
      },
      {
        "@type": "Offer",
        name: "Local Comercial 1",
        price: "217000000",
        priceCurrency: "COP",
        category: "Local Comercial",
      },
    ],
  };

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
