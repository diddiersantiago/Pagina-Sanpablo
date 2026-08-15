import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} · Casas VIS en Soracá, Boyacá`,
    short_name: "San Pablo",
    description:
      "Casas VIS en Soracá, Boyacá, a minutos de Tunja, desde $147 millones.",
    start_url: "/",
    display: "standalone",
    lang: "es-CO",
    background_color: "#2C3842",
    theme_color: "#2C3842",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
