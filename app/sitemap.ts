import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/*
 * El sitio es una one-page: una sola entrada. El array `images` mete los
 * cuatro renders en Google Imágenes, que para un proyecto inmobiliario es
 * tráfico cualificado.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-08-15"),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE_URL}/img/render-fachadas.jpg`,
        `${SITE_URL}/img/render-locales.jpg`,
        `${SITE_URL}/img/plano-primer-piso.jpg`,
        `${SITE_URL}/img/plano-segundo-piso.jpg`,
      ],
    },
  ];
}
