/**
 * URL base del sitio, parametrizada.
 *
 * TODO CLIENTE: confirmar el dominio definitivo. Mientras tanto se usa el
 * valor por defecto; para cambiarlo NO hace falta tocar código, basta definir
 * NEXT_PUBLIC_SITE_URL en el entorno (Vercel → Settings → Environment
 * Variables, o un .env.local en desarrollo). Sin barra final.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://urbanizacionsanpablo.com";

export const SITE_NAME = "Urbanización San Pablo";

/**
 * Vigencia de los precios publicados en el JSON-LD (`priceValidUntil`).
 * Schema.org lo exige en cada Offer; revisar al renovar la lista de precios.
 */
export const PRECIOS_VIGENTES_HASTA = "2026-12-31";
