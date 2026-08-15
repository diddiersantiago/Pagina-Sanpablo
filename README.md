# Urbanización San Pablo — Landing Page Inmobiliaria (VIS · Soracá, Boyacá)

Landing page de alta gama para el proyecto de Vivienda de Interés Social (VIS) **Urbanización San Pablo** ubicado en Soracá, Boyacá (Colombia).

La web es la traducción digital fiel del ayuda-ventas comercial oficial (`Ayudaventas San Pablo.pdf`, edición 2026).

---

## 🚀 Stack Técnico

* **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
* **Estilos:** Tailwind CSS con tokens estrictos de marca y variables CSS en `app/globals.css`
* **Tipografía:** Google Fonts (`Playfair Display` para titulares Didone y `Jost` para sans/kickers), cargadas como **fuentes variables**
* **Animaciones:** GSAP 3 + ScrollTrigger + Scroll suave con Lenis
* **Iconografía:** Lucide React (solo iconos funcionales: WhatsApp, cerrar, menú, chevron)

---

## 📦 Instalación y Ejecución Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

3. **Construir para producción:**
   ```bash
   npm run build
   npm run start
   ```

> ⚠️ **No borres `.next/` con el servidor de desarrollo corriendo.** En Windows los archivos quedan bloqueados, el borrado queda a medias y el runtime de webpack empieza a devolver 500 en todas las rutas. Si pasa: detén el proceso, `rm -rf .next node_modules/.cache` y vuelve a arrancar.

---

## 🌐 Variables de Entorno

| Variable | Para qué | Valor por defecto |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL base del sitio. Alimenta el `canonical`, `robots.txt`, `sitemap.xml`, el `og:image` y **todas** las URLs del JSON-LD. | `https://urbanizacionsanpablo.com` |

El dominio **no está cableado en el código**: vive en [`lib/site.ts`](lib/site.ts). Para cambiarlo basta definir la variable en el entorno (Vercel → Settings → Environment Variables, o un `.env.local` en desarrollo). Sin barra final.

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://midominio.com
```

> **TODO:** confirmar con el cliente cuál es el dominio definitivo.

---

## 🎨 Tokens de Color (Paleta Oficial)

Todos los colores provienen del manual del PDF y están centralizados en `app/globals.css`.

**Se declaran como canales RGB sueltos, no como `#HEX`.** Esto es obligatorio: Tailwind no puede componer transparencia sobre un `var()` que ya contiene un color completo, y descarta la clase entera. Con `#HEX` toda clase con alfa (`bg-sp-navy/40`, `from-sp-navy-deep/95`, `divide-sp-steel/10`…) deja de generar CSS y desaparece de la página en silencio.

```css
/* app/globals.css */
:root {
  --sp-navy: 44 56 66;   /* ✅ canales sueltos */
  /* --sp-navy: #2C3842;    ❌ rompe todas las clases con alfa */
}
```

```ts
/* tailwind.config.ts */
colors: { sp: { navy: "rgb(var(--sp-navy) / <alpha-value>)" } }
```

| Token | HEX | Uso |
|---|---|---|
| `--sp-navy` | `#2C3842` | Fondo dominante oscuro y color madre |
| `--sp-navy-deep` | `#25313C` | Variante profunda para sombras y pies |
| `--sp-navy-soft` | `#323E49` | Superficies de tarjetas oscuras |
| `--sp-steel` | `#526778` | Paneles laterales y tablas |
| `--sp-steel-ink` | `#3E4D5B` | Texto de cuerpo sobre fondo claro |
| `--sp-steel-mute` | `#72828E` | Metadatos — ⚠️ falla AA en texto pequeño sobre crema (3,56) y sobre blanco (3,96). Usa `--sp-steel` |
| `--sp-cream` | `#F7F2EB` | Fondo crema de secciones claras |
| `--sp-white` | `#FFFFFF` | Tarjetas y planos sobre crema |
| `--sp-sand` | `#C6B799` | Acento arena/dorado mate para banda CTA y viñetas |
| `--sp-ivory` | `#EADFC7` | Marfil para titulares sobre fondo navy |
| `--sp-gold` | `#D6A44B` | Dorado del logotipo |
| `--sp-sold` | `#A4443B` | Terracota para sellos de VENDIDO |

**No existe `sp-steel-deep`.** Si lo ves en el código es un error: la paleta solo tiene `steel`, `steel-ink` y `steel-mute`.

---

## 🧩 Estructura de Secciones

El orden lo define [`app/page.tsx`](app/page.tsx). Cada sección tiene `id` propio y es enlazable por ancla.

| # | Componente | `id` | Encabezado |
|---|---|---|---|
| 1 | `Hero` | `#hero` | `h1` |
| 2 | `Proyecto` | `#proyecto` | `h2` |
| 3 | `Arquitectura` | `#arquitectura` | `h2` |
| 4 | `Ubicacion` | `#ubicacion` | `h2` |
| 5 | *(envoltorio Planos)* | `#planos` | `h2` |
| 5a | `PlantaPrimerPiso` | `#primer-piso` | `h3` |
| 5b | `PlantaSegundoPiso` | `#segundo-piso` | `h3` |
| 5c | `Ampliacion` | `#ampliacion` | `h3` |
| 6 | `LocalComercial` | `#local` | `h2` |
| 7 | `Inversion` | `#inversion` | `h2` |
| 8 | `Faq` | `#preguntas-frecuentes` | `h2` |

Los tres bloques de planos **cuelgan de una `<section id="planos">` con su propio `h2`**. Si añades un plano nuevo, mételo dentro de ese envoltorio, no suelto en `<main>`.

---

## 🖼️ Origen de los Assets (`public/img/`)

Las imágenes se extrajeron directamente de las páginas del PDF `Ayudaventas San Pablo.pdf`:

| Archivo | Contenido | Notas |
|---|---|---|
| `logo-san-pablo-trans.png` | Logotipo con transparencia alfa | Redimensionado a 420×420. Se muestra a 208 px como máximo |
| `escudo-soraca-trans.png` | Escudo institucional del Municipio de Soracá | |
| `render-fachadas.jpg` | Render exterior de fachadas en ladrillo a la vista | Fondo de Arquitectura + fuente del `og:image` |
| `plano-primer-piso.jpg` | Planta comercial pareada — Primer piso | |
| `plano-segundo-piso.jpg` | Planta comercial zona privada — Segundo piso | |
| `render-locales.jpg` | Axonometría de los locales comerciales | |
| `logo-san-pablo.png` | Logotipo con fondo navy incrustado | ⚠️ **Sin referencias en el código** (349 kB). Candidato a borrar |
| `icon-192.png` · `icon-512.png` | Iconos del `manifest.webmanifest` | Generados desde el logo transparente |

**Iconos y social** (convención de archivo de Next, viven en `app/`): `favicon.ico`, `icon.png` (192), `apple-icon.png` (180), `opengraph-image.jpg` y `twitter-image.jpg`.

> El `og:image` debe medir **1200×630 exactos** y pesar poco. Con 2048×1451 y 774 kB, WhatsApp recortaba las fachadas y muchas veces descartaba la previsualización entera. Siendo WhatsApp el canal de conversión, **prueba siempre el enlace real en WhatsApp antes de dárselo a los asesores.**

Para regenerar iconos y `og:image` tras cambiar el logo o el render:

```bash
python -c "
from PIL import Image
src = Image.open('public/img/logo-san-pablo-trans.png').convert('RGBA')
for path, s in [('app/icon.png',192), ('app/apple-icon.png',180),
                ('public/icon-192.png',192), ('public/icon-512.png',512)]:
    src.resize((s,s), Image.LANCZOS).save(path, optimize=True)
src.resize((32,32), Image.LANCZOS).save('app/favicon.ico', sizes=[(32,32)])
"
```

---

## 💰 ¿Cómo cambiar o actualizar precios y datos?

Toda la información del proyecto está centralizada y tipada en [`data/proyecto.ts`](data/proyecto.ts). **Ningún componente debería tener cifras cableadas.**

```typescript
// Ejemplo de edición en data/proyecto.ts:
export const PROYECTO_DATA = {
  telefono: "324 358 2526",
  telefonoInternacional: "+57 324 358 2526",  // formato NAP para SEO local
  telefonoHref: "tel:+573243582526",
  whatsappUrl: "https://wa.me/573243582526?text=...",

  inversion: {
    tarjetas: [
      {
        titulo: "CASA ESQUINERA · VIS",
        precioMillones: 170, // <-- Actualiza cifra numérica
        precioFormato: "$170 millones",
        detalle: "59,33 m² construidos · 79,92 m² con ampliación de tercer piso.",
        tipo: "esquinera",
      },
      // ...
    ]
  }
};
```

Al tocar precios, acuérdate de:

1. Actualizar también el **JSON-LD** en [`app/layout.tsx`](app/layout.tsx) (los `Offer` llevan el precio en pesos, sin abreviar).
2. Revisar `PRECIOS_VIGENTES_HASTA` en [`lib/site.ts`](lib/site.ts) — es el `priceValidUntil` que Schema.org exige en cada oferta.
3. Comprobar que la **respuesta 2 del FAQ** (`faq.preguntas`) siga diciendo las mismas cifras: Google compara el texto visible contra el `acceptedAnswer`.

### 📋 Pendiente del cliente

En `data/proyecto.ts` hay un bloque marcado `TODO CLIENTE` con datos que **no se deben inventar**:

* Dirección exacta o referencia vial del proyecto
* Coordenadas (lat/lng) para el mapa y el `GeoCoordinates` del JSON-LD
* Distancia en km y tiempo en carro hasta Tunja
* Horario de atención de la sala de ventas

Mientras estén vacíos, la sección de Ubicación **los omite** en vez de mostrar huecos, y el JSON-LD no emite `geo` ni `openingHoursSpecification`. En cuanto se llenen, ambos aparecen solos.

También falta cualquier mención al **constructor/promotor**. En un tema YMYL (la mayor decisión financiera de una familia) la ausencia del responsable es una señal negativa de confianza.

---

## 🔍 SEO e Indexabilidad

| Archivo | Genera |
|---|---|
| `app/robots.ts` | `/robots.txt` |
| `app/sitemap.ts` | `/sitemap.xml` — una entrada (es one-page) con los 4 renders para Google Imágenes |
| `app/manifest.ts` | `/manifest.webmanifest` |
| `app/not-found.tsx` | 404 con el layout del sitio y `noindex` |

**JSON-LD** (`app/layout.tsx`): un `@graph` con responsabilidades separadas — `RealEstateAgent` (NAP), dos `Product + SingleFamilyResidence`, un `Product` para el Local 1, `WebSite`, `WebPage + RealEstateListing` y `FAQPage`.

Dos reglas que no se pueden romper:

* **`RealEstateListing` es un tipo de PÁGINA**, no de inmueble. No admite `address`, `telephone`, `priceRange` ni `offers`; si se los pones, Google descarta el nodo entero. Las ofertas van en los `Product`.
* **Nunca añadas `aggregateRating` ni reseñas inventadas.** Google lo trata como spam estructurado y penaliza el dominio completo.

**El FAQ usa `<details>/<summary>`** precisamente para que el texto de cada respuesta esté siempre en el DOM. Un render condicional de React no sirve: Google penaliza el `FAQPage` cuyo contenido no existe en la página. El `acceptedAnswer` del JSON-LD reutiliza literalmente las mismas cadenas de `data/proyecto.ts`.

---

## ⚡ Rendimiento — cosas que se rompen fácil

* **Los contadores animados se inicializan con su valor final**, no en cero. Googlebot ejecuta JavaScript pero **no hace scroll**, así que un contador que arranca en `0` y solo se corrige dentro de un `onEnter` de ScrollTrigger acaba indexado como `$0 millones` y `0,00 m²`. Además, animar el ancho del número genera CLS: por eso los `<span>` llevan `min-w-[4ch]` / `min-w-[7ch]` y `tabular-nums`.
* **El logo y el `<h1>` del hero no pueden partir de `opacity: 0`.** Un elemento invisible no es candidato a LCP, y encadenaría la métrica a descargar el bundle + hidratar + terminar la timeline. Se animan **solo con `transform`**.
* **No pongas `priority` en imágenes bajo el pliegue.** El fondo de Arquitectura precargaba ~423 kB compitiendo con el LCP real (el logo, ~16 kB).
* **Todo `<Image fill>` necesita `sizes`.** Sin él Next asume `100vw` y sirve la variante máxima.
* **No fijes `weight` en las fuentes.** Ambas son variables: sin `weight` se sirve el eje completo (`100 900` en Jost, `400 900` en Playfair) y `font-semibold`/`font-bold` son pesos reales en vez de negrita sintética — que es justo lo que arruina una didone.
* **No leas el layout en cada evento de scroll.** Lenis dispara a frecuencia de frame; `Navbar` cachea `scrollHeight` (lo recalcula en `resize`) y escribe el `transform` dentro de un `requestAnimationFrame`.

> **Nota conocida:** Next 15.5.23 no emite `<link rel="preload" as="font">` — su `next-font-manifest.json` sale con `"app": {}`. No es configuración nuestra (se probó con `className` y con `variable`, y con pesos fijados y variables). El impacto está acotado: el LCP es el logo (que sí lleva preload de imagen), `display: swap` evita el texto invisible y Next genera fallbacks ajustados por métrica que absorben el CLS del swap.

---

## ♿ Accesibilidad

* Formato de números colombiano (`79,92 m²`, `$170 millones`).
* Soporte estricto para `prefers-reduced-motion: reduce`: la página queda estática y **con los valores finales visibles**.
* Totalmente responsive (320 px a 1920 px) con navegación táctil fluida y lightbox de planos con zoom.
* Enlace "saltar al contenido", `scroll-margin-top` en las secciones (el header es fijo) y foco visible en todo elemento interactivo.
* **Nunca uses `focus:outline-none` sin reemplazo.** El par correcto es:
  ```
  focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand
  ```
* **Los overlays deben frenar a Lenis.** `document.body.style.overflow = "hidden"` no lo detiene y el fondo sigue desplazándose bajo el menú móvil o el lightbox. Usa `lockScroll()` / `unlockScroll()` de [`lib/animations.ts`](lib/animations.ts), que acceden al singleton de Lenis.
* El lightbox atrapa el foco con Tab y lo devuelve al elemento que lo abrió.
* Acceso directo al canal de WhatsApp y enlaces `tel:` para llamar de un toque en móvil (+57 324 358 2526).

---

## ✅ Verificación

Ninguno de estos comandos debería fallar antes de desplegar.

```bash
# Tipos y build
npx tsc --noEmit
npm run build

# Cero tokens inexistentes
grep -rn "sp-steel-deep" components app | wc -l          # -> 0

# Cero focus:outline-none sin foco visible de reemplazo
grep -rn "focus:outline-none" components app | grep -v "focus-visible:outline" | wc -l   # -> 0

# Los precios y áreas NO salen en cero en el HTML del servidor
grep -c '\$<!-- -->0<' .next/server/app/index.html       # -> 0
grep -c '0,00' .next/server/app/index.html               # -> 0
```

Y el chequeo que más veces ha salvado la página — **que ninguna clase de color con alfa se descarte**:

```bash
python -c "
import re, glob
pat = re.compile(r'\b(?:bg|text|border|divide|from|to|via|ring)-sp-[a-z-]+/(?:\[[0-9.]+\]|[0-9]+)')
used = set()
for f in glob.glob('components/*.tsx') + glob.glob('app/*.tsx'):
    used.update(pat.findall(open(f, encoding='utf-8').read()))
css = open(glob.glob('.next/static/css/*.css')[0], encoding='utf-8').read()
esc = lambda c: c.replace('/', chr(92)+'/').replace('.', chr(92)+'.').replace('[', chr(92)+'[').replace(']', chr(92)+']')
dead = [c for c in used if esc(c) not in css]
print(f'{len(used)} clases con alfa usadas, {len(dead)} muertas')
[print('  MUERTA:', d) for d in dead]
"
```

---

## 📐 Reglas de contenido

1. **Ningún dato comercial se inventa.** Áreas, precios, estados de locales, teléfono y textos legales están verificados contra el ayuda-ventas oficial. Si un número no está en `data/proyecto.ts`, no va en la página.
2. **No añadas amenidades, fechas de entrega, número de unidades ni planes de financiación** que no existan en `data/proyecto.ts`.
3. Números en formato español-Colombia: coma decimal (`79,92 m²`, `$170 millones`).
