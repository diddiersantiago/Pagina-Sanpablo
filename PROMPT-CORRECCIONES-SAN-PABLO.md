# PROMPT DE CORRECCIONES — Urbanización San Pablo

> Pega todo lo que está debajo de la línea en Antigravity (o en la herramienta que estés usando).
> Está ordenado por fases: **cada fase depende de la anterior**. No saltes la Fase 1.

---

## 0. CONTEXTO Y REGLAS

Estás corrigiendo una landing Next.js 15 (App Router, TypeScript, Tailwind 3.4, GSAP + ScrollTrigger + Lenis) del proyecto inmobiliario **Urbanización San Pablo**, VIS en Soracá, Boyacá. El sitio ya está construido: 10 secciones en `components/`, datos en `data/proyecto.ts`, tokens en `app/globals.css` y `tailwind.config.ts`.

Una auditoría encontró ~50 defectos que se reducen a **4 causas raíz**. Este documento las corrige en orden.

**REGLAS INNEGOCIABLES:**

1. **No cambies ningún dato comercial.** Áreas, precios, estados de locales, teléfono y textos legales están verificados contra el ayuda-ventas oficial. Si un número no está en `data/proyecto.ts`, no lo inventes.
2. **No añadas amenidades, fechas de entrega, número de unidades ni planes de financiación** que no existan en `data/proyecto.ts`.
3. **No cambies la paleta ni las tipografías.** Solo se corrige *cómo* se declaran, no *cuáles* son.
4. **Verifica después de cada fase** con los comandos de la sección 7. No pases a la siguiente fase con la anterior rota.
5. Números en formato español-Colombia: coma decimal (`79,92 m²`, `$170 millones`).

---

## 1. FASE 1 — FUNDAMENTOS (bloquean todo lo demás)

### 1.1 🔴 Los colores con opacidad no generan CSS

**Diagnóstico:** en `tailwind.config.ts` los colores están declarados como `navy: "var(--sp-navy)"`. Tailwind 3 no puede componer alfa sobre un `var()` crudo, así que **descarta la clase entera**. Hay **68 clases muertas** repartidas en 10 componentes.

Consecuencias reales hoy:
- `Arquitectura.tsx:103` — el degradado de legibilidad (`from-sp-navy-deep/95 via-sp-navy/55`) no se renderiza: el titular queda sobre el render a plena luz, ilegible.
- `Arquitectura.tsx:127,144,161` — las micro-fichas "de vidrio" no tienen fondo (`bg-sp-navy/40` muerto).
- `PlanLightbox.tsx:47` — el modal se abre sin fondo oscuro.
- `Proyecto.tsx:233,246,248` — la tabla de áreas no tiene bordes, ni divisores, ni hover.
- `Navbar.tsx:36` — el navbar sigue transparente al hacer scroll.
- `Hero.tsx:266,272,280,281` — los filetes y las barras verticales del kicker son invisibles.

**Corrección — paso A**, reescribe el bloque `:root` de `app/globals.css` con canales RGB:

```css
:root {
  /* Base oscura */
  --sp-navy:        44 56 66;
  --sp-navy-deep:   37 49 60;
  --sp-navy-soft:   50 62 73;

  /* Azul acero */
  --sp-steel:       82 103 120;
  --sp-steel-ink:   62 77 91;
  --sp-steel-mute:  114 130 142;

  /* Base clara */
  --sp-cream:       247 242 235;
  --sp-white:       255 255 255;

  /* Acentos */
  --sp-sand:        198 183 153;
  --sp-ivory:       234 223 199;
  --sp-gold:        214 164 75;

  /* Estado */
  --sp-sold:        164 68 59;
}
```

**Paso B**, en `tailwind.config.ts` envuelve cada token con `<alpha-value>`:

```ts
colors: {
  sp: {
    navy:         "rgb(var(--sp-navy) / <alpha-value>)",
    "navy-deep":  "rgb(var(--sp-navy-deep) / <alpha-value>)",
    "navy-soft":  "rgb(var(--sp-navy-soft) / <alpha-value>)",
    steel:        "rgb(var(--sp-steel) / <alpha-value>)",
    "steel-ink":  "rgb(var(--sp-steel-ink) / <alpha-value>)",
    "steel-mute": "rgb(var(--sp-steel-mute) / <alpha-value>)",
    cream:        "rgb(var(--sp-cream) / <alpha-value>)",
    white:        "rgb(var(--sp-white) / <alpha-value>)",
    sand:         "rgb(var(--sp-sand) / <alpha-value>)",
    ivory:        "rgb(var(--sp-ivory) / <alpha-value>)",
    gold:         "rgb(var(--sp-gold) / <alpha-value>)",
    sold:         "rgb(var(--sp-sold) / <alpha-value>)",
  },
},
```

**Paso C**, en `app/globals.css` todos los usos crudos de `var(--sp-*)` deben pasar a `rgb(var(--sp-*))`. Están en las líneas **32, 33, 41, 53, 63, 73, 74, 82, 85, 88 y 89** (html, body, focus-visible, reading-progress, selection, scrollbar). Ejemplo:

```css
html  { background-color: rgb(var(--sp-navy)); color: rgb(var(--sp-steel-ink)); }
body  { background-color: rgb(var(--sp-navy)); }
a:focus-visible, button:focus-visible, input:focus-visible {
  outline: 2px solid rgb(var(--sp-sand));
  outline-offset: 3px;
}
#reading-progress { background: rgb(var(--sp-sand)); }
::selection { background: rgb(var(--sp-sand)); color: rgb(var(--sp-navy)); }
::-webkit-scrollbar-track { background: rgb(var(--sp-navy-deep)); }
::-webkit-scrollbar-thumb { background: rgb(var(--sp-steel)); }
::-webkit-scrollbar-thumb:hover { background: rgb(var(--sp-sand)); }
```

La regla `rgba(214,164,75,0.18)` del shimmer (línea ~123) puede quedarse literal o pasar a `rgb(var(--sp-gold) / 0.18)`.

### 1.2 🔴 Token inexistente `sp-steel-deep`

Se usa en `Proyecto.tsx:236` y `LocalComercial.tsx:100`, pero **no existe en la paleta**. Reemplázalo por `border-sp-navy/30` en ambos sitios (o añade el token si prefieres, pero la paleta oficial solo tiene `steel`, `steel-ink` y `steel-mute`).

### 1.3 🔴 Los contadores se indexan en cero

**Diagnóstico:** `Inversion.tsx:15-17` y `Proyecto.tsx:16-18` inicializan el estado en `0`, y solo lo corrigen dentro del `onEnter` de un ScrollTrigger. **Googlebot ejecuta JavaScript pero no hace scroll**, así que el trigger nunca se dispara. Verificado en el HTML que genera el servidor:

```
CASA ESQUINERA · VIS   $0 millones
CASA MEDIANERA · VIS   $0 millones
LOCAL COMERCIAL        $0 millones
```
y `0,00` aparece 6 veces en la columna Total de la tabla de áreas.

Esto además provoca CLS: al animar, `$0 → $170` cambia el ancho del texto y desplaza el "millones" contiguo; `0,00 m² → 79,92 m²` reajusta el ancho de toda la columna.

**Corrección (arregla SEO y CLS de una vez):** inicializa el estado con el **valor final** y anima desde cero solo si el elemento aún no es visible al montar.

```tsx
const [precio, setPrecio] = useState(tarjeta.precioMillones); // SSR emite el valor real

useEffect(() => {
  if (prefersReducedMotion()) return;
  const el = ref.current;
  if (!el) return;

  // Si ya está en pantalla al cargar, no animes: deja el valor final.
  if (el.getBoundingClientRect().top < window.innerHeight) return;

  setPrecio(0);
  const obj = { v: 0 };
  ScrollTrigger.create({
    trigger: el,
    start: "top 85%",
    once: true,
    onEnter: () =>
      gsap.to(obj, {
        v: tarjeta.precioMillones,
        duration: DURATION.counter,
        ease: EASING.smooth,
        onUpdate: () => setPrecio(Math.round(obj.v)),
      }),
  });
}, []);
```

Aplica el mismo patrón a los tres precios de `Inversion.tsx` y a los tres totales de `Proyecto.tsx` (estos con `.toFixed(2).replace(".", ",")`).

**Además, reserva el ancho** para que el conteo no mueva nada: `min-w-[4ch]` (precios) y `min-w-[7ch]` (áreas) en el `<span>`/`<td>` del número, con `tabular-nums`.

### 1.4 🔴 El trigger del contador de áreas está sobre un elemento oculto

`Proyecto.tsx:105` usa `trigger: ".tabla-areas-container"`, que es `hidden sm:block`. Bajo 480px ese elemento es `display:none`, así que las tarjetas móviles **pueden quedarse en "0,00 m²" para siempre**. Cambia el trigger al contenedor de la columna derecha (`.proyecto-col-right`), que está siempre visible.

### 1.5 🔴 El Hero se auto-oculta y arrastra el LCP

**Diagnóstico:** `Hero.tsx:49-105` aplica `fromTo(..., {opacity: 0})` al logo, al h1, al claim y al sello dentro de un `useEffect`. Dos consecuencias: (a) el HTML pinta el hero visible y GSAP lo salta a opacidad 0 al hidratar → **parpadeo**; (b) un elemento en `opacity: 0` **no es candidato a LCP**, así que el LCP queda encadenado a descargar 170 kB de JS + hidratar + 0,6 s de timeline.

**Corrección:** el logo y el `<h1>` — que son los candidatos a LCP — **no deben partir de opacidad 0**. Anímalos solo con `transform`:

```tsx
// Logo: entra con escala, SIN tocar opacity
tl.fromTo(logoRef.current, { scale: 0.94 }, { scale: 1, duration: 1.1, ease: EASING.entrance }, 0.6);

// H1: entra con desplazamiento enmascarado, SIN tocar opacity
tl.fromTo(titleRef.current, { y: 24 }, { y: 0, duration: 1.0, ease: EASING.entrance }, 0.9);
```

El resto de elementos del hero (claim, sello, indicador) sí pueden usar `opacity`, porque no son candidatos a LCP.

Elimina también la animación de `letterSpacing` de `Hero.tsx:81-82`: es una propiedad de *layout*, provoca reflow en cada frame y puede generar CLS si el claim salta de línea. Sustitúyela por un fade simple.

**En las secciones bajo el pliegue no hay parpadeo** (el `fromTo` se aplica al crear el ScrollTrigger, fuera de pantalla), así que ahí el patrón actual es válido. Pero **sí** hay que garantizar que el contenido siga siendo legible sin JS: en `PlantaPrimerPiso.tsx:64-77` y `PlantaSegundoPiso.tsx:64-77` el plano arranca en `opacity: 0` esperando el trigger — si el JS falla no aparece nunca. Añade un `<noscript>` con estilos que fuercen `opacity: 1`, o mueve el estado inicial a una clase que solo se aplique cuando JS esté activo.

### 1.6 🟠 Centraliza las animaciones

`lib/animations.ts` exporta `EASING` y `DURATION` pero **ningún componente los usa**: todos hardcodean `"expo.out"`, `0.9`, `1.2`… Sustituye los valores literales por las constantes en los 10 componentes. Si no, cada sección acaba con timings distintos y la página se siente despareja.

Crea además un hook reutilizable en `lib/animations.ts` para el patrón que se repite en todas las secciones:

```ts
export function useReveal(
  ref: RefObject<HTMLElement>,
  opts?: { y?: number; x?: number; delay?: number; start?: string }
) { /* fromTo con ScrollTrigger, once:true, respetando prefersReducedMotion */ }
```

### 1.7 🔴 El foco visible está anulado

`focus:outline-none` sin reemplazo aparece en `Navbar.tsx:44,75,101`, `WhatsAppButton.tsx:24,36`, `Hero.tsx:311` y `PlanLightbox.tsx:73`. La regla `a:focus-visible` de `globals.css:50` pierde por especificidad. Sustituye en todos los casos por:

```
focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand
```

---

## 2. FASE 2 — SEO INDEXABLE

### 2.1 🔴 El `<h1>` dice solo "San Pablo"

`Hero.tsx:252-262`. "San Pablo" es ambiguo: compite con municipios en Nariño, Bolívar y Antioquia, además del santo y la basílica. Ningún encabezado del sitio contiene "Boyacá" ni "Tunja".

Mueve el `<p>Urbanización</p>` **dentro** del `<h1>` como `<span>` y añade contexto indexable sin alterar el diseño:

```tsx
<h1 className="font-display font-normal text-sp-ivory text-[clamp(2.5rem,7vw,5.75rem)] leading-[1.02] tracking-tightest uppercase">
  <span className="block font-sans text-[0.72rem] tracking-kicker uppercase text-sp-sand mb-2">
    Urbanización
  </span>
  San Pablo
  <span className="sr-only"> · Vivienda de Interés Social (VIS) en Soracá, Boyacá, a minutos de Tunja</span>
</h1>
```

`sr-only` en Tailwind posiciona fuera de pantalla (no usa `display:none`), así que es texto plenamente indexable y honesto respecto del contenido visible.

### 2.2 🟠 Jerarquía de encabezados rota

Secuencia actual: `h1 → h2 (Proyecto) → h2 (Arquitectura) → h3 (Primer piso) → h3 (Segundo piso) → h3 (Ampliación) → h2 (Local) → h2 (Inversión)`. Los tres `h3` cuelgan estructuralmente de Arquitectura, que es falso.

- Envuelve `PlantaPrimerPiso` + `PlantaSegundoPiso` + `Ampliacion` en una `<section id="planos">` con un `<h2>` propio: **"Planos de las casas VIS en Soracá"**. Mueve el `id="planos"` de `PlantaPrimerPiso.tsx:101` a esa sección envolvente.
- Da `id` propio a `PlantaSegundoPiso` (`id="segundo-piso"`) y a `Ampliacion` (`id="ampliacion"`): hoy no son enlazables.
- En `Proyecto.tsx:226-228`, el título "ÁREAS POR TIPOLOGÍA · PROPIEDAD HORIZONTAL" es un `<span>`; promuévelo a `<h3>` para que los `<h4>` de las tarjetas (líneas 356 y 374) tengan padre correcto.
- `Hero.tsx:141`: cambia `aria-label` por `aria-labelledby` apuntando al `id` del `<h1>`.

### 2.3 🔴 El JSON-LD no valida

`app/layout.tsx:67-104`. `RealEstateListing` es subtipo de `SearchResultsPage → WebPage → CreativeWork`, es decir, **un tipo de página, no de inmueble**. Por tanto `address`, `telephone`, `priceRange` y `offers` **no son propiedades válidas** ahí: Google descarta el nodo entero y hoy no tienes ninguna señal NAP estructurada ni rich result posible.

Sustitúyelo por un `@graph` con responsabilidades separadas:

- **`RealEstateAgent`** (subtipo de `LocalBusiness`) → NAP: `address` (`PostalAddress` completo), `telephone`, `geo` (`GeoCoordinates`), `openingHoursSpecification`, `areaServed` (Soracá, Tunja, Boyacá), `priceRange: "$$"`.
- **`Product` + `SingleFamilyResidence`** multi-tipado, uno por tipología → este patrón es la forma válida de combinar `offers` (de `Product`) con `floorSize`/`numberOfRooms` (de `Accommodation`). En cada `Offer`: `price`, `priceCurrency: "COP"`, `availability` (`InStock` para las casas y el Local 1; el resto no se publica), `priceValidUntil`, `seller`.
- **`WebSite`** y **`RealEstateListing`/`WebPage`** solo con propiedades de página: `about`, `mainEntity`, `primaryImageOfPage`, `inLanguage: "es-CO"`.

Datos a usar (ya están en `data/proyecto.ts`): esquinera 79,92 m² / $170.000.000 · medianera 75,57 m² / $147.000.000 · Local 1 70,40 m² / $217.000.000. Teléfono `+57 324 358 2526`.

**NO añadas `aggregateRating` ni reseñas inventadas.** Google lo trata como spam estructurado y penaliza el dominio entero.

### 2.4 🔴 Faltan todos los archivos de indexabilidad

Hoy `/robots.txt` y `/sitemap.xml` devuelven **404**. Crea:

| Archivo | Contenido |
|---|---|
| `app/robots.ts` | `allow: "/"`, `sitemap: ${SITE_URL}/sitemap.xml` |
| `app/sitemap.ts` | una sola entrada (es one-page) con el array `images` de los 4 renders — mete las fotos en Google Imágenes |
| `app/manifest.ts` | nombre, `theme_color`, iconos 192/512 |
| `app/opengraph-image.tsx` | genera **1200×630 exactos** con `ImageResponse` |
| `app/twitter-image.tsx` | reexporta el anterior |
| `app/icon.png` (192) · `app/apple-icon.png` (180) · `app/favicon.ico` (32) | redimensionados desde el logo |
| `app/not-found.tsx` | 404 con el layout del sitio y `noindex` |

Parametriza el dominio en **todos** ellos:

```ts
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://urbanizacionsanpablo.com";
```

Hoy el dominio está hardcodeado en `app/layout.tsx:35` y `:40`. **Pendiente de confirmar con el cliente cuál es el dominio definitivo.**

### 2.5 🔴 El og:image está roto justo para WhatsApp

`app/layout.tsx:43-51` declara `1200×630`, pero `render-fachadas.jpg` mide **2048×1451 y pesa 774 KB**. Dos consecuencias: el recorte automático descarta la franja inferior de las fachadas, y con ese peso muchos clientes de WhatsApp descartan la previsualización. **Con WhatsApp como canal de conversión, este es el defecto de mayor impacto comercial del sitio.**

Resuélvelo con `app/opengraph-image.tsx` (1200×630 reales, <100 KB). Si prefieres la foto, recórtala:

```bash
python -c "
from PIL import Image, ImageOps
im = Image.open('public/img/render-fachadas.jpg').convert('RGB')
ImageOps.fit(im, (1200, 630), Image.LANCZOS, centering=(0.5, 0.45)).save(
    'app/opengraph-image.jpg', quality=82, optimize=True, progressive=True)
"
```
Debe quedar por debajo de 300 KB. **Prueba el enlace real en WhatsApp antes de dárselo a los asesores.**

### 2.6 🟠 Metadata incompleta

En `app/layout.tsx:21-60`:
- Falta el bloque `robots`. Sin `max-image-preview: "large"` te quedas fuera de las miniaturas grandes en resultados — crítico cuando lo que vende es la foto.
- Falta `twitter` (`card: "summary_large_image"`).
- Falta `export const viewport` con `themeColor`.
- El `title` tiene 84 caracteres y se trunca en el SERP (~60). Recórtalo: **"Urbanización San Pablo · Casas VIS en Soracá, Boyacá"**.
- La `description` tiene 218 caracteres; recórtala a ≤155 adelantando precio y ubicación.
- Elimina el bloque `icons` y deja que lo resuelvan los archivos de la sección 2.4.

---

## 3. FASE 3 — RENDIMIENTO (Core Web Vitals)

### 3.1 🔴 875 KB compitiendo por una imagen de 18 KB

Hay 3 preloads de imagen. El LCP real (el logo del hero) necesitaría ~18 KB.

- **Quita `priority` de `Arquitectura.tsx:100`** y baja `quality` de 90 a 75. Es un fondo bajo un degradado, en la segunda sección, **bajo el pliegue**, y hoy precarga ~423 KB que compiten con el LCP. Es la acción de mayor retorno.
- **Quita `priority` de `Navbar.tsx:53`**: es un logo de 36 px.
- **Cambia `Navbar.tsx:49`** para que use `logo-san-pablo-trans.png`: hoy usa la versión con el fondo navy incrustado dentro de un `overflow-hidden rounded`, lo que dibuja un cuadrito navy sobre el hero.

### 3.2 🔴 Cinco `<Image fill>` sin `sizes`

Sin `sizes`, Next asume `100vw` y sirve la variante máxima. Añade:

| Archivo:línea | `sizes` |
|---|---|
| `Hero.tsx:242` (logo) | `"(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"` |
| `Hero.tsx:217` (escudo) | `"24px"` |
| `Navbar.tsx:48` | `"36px"` |
| `Footer.tsx:17` | `"64px"` |
| `Footer.tsx:48` | `"28px"` |

Y **redimensiona `logo-san-pablo-trans.png`** de 971×971 / 430 KB a ~420 px (o conviértelo a SVG). Se muestra a 208 px como máximo.

### 3.3 🔴 El favicon pesa 351 KB

`app/layout.tsx:56-59` apunta a `/img/logo-san-pablo.png` (971×971, 351 KB, **sin transparencia**), que sale de `/public` sin pasar por el optimizador. Además Google exige favicon cuadrado múltiplo de 48 px. Genera los iconos de la sección 2.4:

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
Baja de 351 KB a ~15 KB.

### 3.4 🟠 Fuentes: ~130 KB recuperables y negrita sintética

En `app/layout.tsx:5-19`:

- **Se usan pesos que no se cargan.** `font-semibold` (600) aparece 7 veces y `font-bold` (700) 3 veces, pero solo se declaran 300/400/500 → el navegador **sintetiza la negrita**, que es justo lo que arruina una didone. Como ambas son fuentes variables, **añadir `"600"` y `"700"` no cuesta ni un byte**.
- **Quita `style: ["normal","italic"]` de Jost**: la cursiva de Jost pesa ~50 KB y solo se usa en `Proyecto.tsx:216` y `:345`. Usa la cursiva de Playfair en esos dos textos.
- **Quita `latin-ext` de ambas** (~79 KB): lo único que lo fuerza son los ordinales voladitos `ᵉʳ` de "3.ᵉʳ piso" (`PlantaSegundoPiso.tsx:106` y `data/proyecto.ts`). Escríbelo **"3er"** y el subset entero sobra.
- El `✦` de `Hero.tsx:269` (U+2726) no está en ningún subset cargado; se renderiza con fuente del sistema. Sustitúyelo por un SVG inline si quieres control tipográfico.
- **No se emite ningún `<link rel="preload" as="font">`** en el HTML (verificado: 0 coincidencias). Investiga por qué —los archivos sí llevan el sufijo de precarga— porque hoy las fuentes se descubren tras descargar y parsear el CSS: tres saltos antes del primer glifo.

### 3.5 🟠 Layout síncrono forzado en cada scroll

`Navbar.tsx:14-25` lee `document.documentElement.scrollHeight` y `clientHeight` **en cada evento de scroll**, y Lenis dispara a frecuencia de frame. Cachea la altura (recalcúlala en `resize`) y envuelve la escritura del `transform` en `requestAnimationFrame`. Añade también una guarda para evitar dividir por cero.

### 3.6 🟡 Otros

- `PlanLightbox` se importa estáticamente desde 3 componentes pero solo se muestra al hacer clic → cárgalo con `next/dynamic` y `ssr: false`.
- `escudo-soraca.png` (31 KB) **no se referencia en ningún sitio**: bórralo.
- `WhatsAppButton.tsx:12-19` retrasa 2,4 s el CTA principal con un `setTimeout`. Reemplázalo por `animation-delay` en CSS: elimina JS y el retardo de paint.
- `next.config.ts`: añade cabeceras de seguridad, `poweredByHeader: false` y `images.minimumCacheTTL` alto.

---

## 4. FASE 4 — CONTENIDO QUE FALTA

### 4.1 🔴 No existe sección de ubicación

Cero apariciones de "ubicación", "cómo llegar" o una dirección física. Lo más cercano es "Sala de ventas · Soracá, Boyacá", que es un municipio, no una dirección. **Para un proyecto inmobiliario la ubicación es el primer factor de decisión** y es donde está el volumen de búsqueda local. Sin esta sección tampoco hay dónde poner el `GeoCoordinates` ni el NAP completo del JSON-LD.

Crea `components/Ubicacion.tsx` con `id="ubicacion"`, entre Arquitectura y Planos, con `<h2>` **"Ubicación: Soracá, Boyacá, a minutos de Tunja"** y:
- La dirección o referencia vial concreta, dentro de `<address>`.
- Distancias y tiempos **numéricos** a Tunja y a la vía principal (un dato numérico específico es lo que Google extrae para snippets).
- Horario de atención de la sala de ventas.
- Mapa: `<iframe>` de Google Maps con `loading="lazy"`, o una imagen estática enlazada para no penalizar CWV.

**PENDIENTE DEL CLIENTE:** dirección exacta, coordenadas y horario. No los inventes — si no están disponibles, deja la sección con los datos que sí existen y marca los faltantes con un `TODO`.

### 4.2 🟠 Bloque FAQ + `FAQPage`

Es la mejor relación valor/esfuerzo: ~600 palabras con keywords naturales y elegible para rich results. Ocho preguntas, cada una atada a una búsqueda real:

1. ¿Qué es una vivienda VIS y qué beneficios tiene en Soracá, Boyacá?
2. ¿Cuánto cuesta una casa en Urbanización San Pablo? *(debe decir $147 y $170 millones en texto visible)*
3. ¿Puedo aplicar al subsidio Mi Casa Ya?
4. ¿Qué subsidios aplican en Boyacá y cómo funciona el de Comfaboy?
5. ¿A qué distancia está Soracá de Tunja?
6. ¿Cuántos metros cuadrados tiene cada casa? *(55,88 / 59,33 m² construidos · 75,57 / 79,92 m² con ampliación)*
7. ¿Realmente puedo construir un tercer piso? ¿Está incluido en el precio?
8. ¿Qué diferencia hay entre la casa esquinera y la medianera?

**Regla crítica:** el texto de cada `acceptedAnswer` debe estar **visible en la página, palabra por palabra**. Un acordeón `<details>/<summary>` sirve (el contenido está en el DOM); un render condicional de React **no**, y Google penaliza el `FAQPage` con contenido oculto.

### 4.3 🟠 SEO local: términos infrautilizados

- **"Tunja" aparece 2 veces.** Tiene ~35× la población de Soracá y es donde vive el comprador objetivo. Falta la distancia concreta.
- **"Comfaboy" aparece 0 veces en la página**, pero está declarada en `keywords` (`layout.tsx:31`). Google ignora la meta keywords desde 2009; lo que sirve es nombrarla en el cuerpo, porque es la caja de compensación de Boyacá. Hoy el sitio dice genéricamente "las cajas de compensación".
- **"Mi Casa Ya" aparece 1 vez**, enterrada en una nota al pie en cursiva de 12 px. Merece un bloque propio de financiación y subsidios.
- No hay ni una mención al **constructor/promotor**. En un tema YMYL (la mayor decisión financiera de una familia) la ausencia total del responsable es una señal negativa de confianza.

### 4.4 🟠 El teléfono nunca es un enlace `tel:`

Cero ocurrencias de `tel:` en todo el proyecto: los 8 enlaces de contacto van a `wa.me`. En móvil no se puede llamar de un toque. Añade `<a href="tel:+573243582526">` al menos en el footer y en la banda CTA, y usa el formato internacional `+57 324 358 2526` al menos una vez en texto visible para consistencia NAP.

### 4.5 🟠 La tabla de locales es una tabla falsa

`LocalComercial.tsx:128-185`: los encabezados "Unidad / Área / Estado" son `<span>` dentro de `<div>`. Es la información comercial más accionable del sitio y no es parseable. Conviértela en `<table>` real con `<caption>` y `<th scope="col">`.

Añade también `<caption>` y `scope="col"` a la tabla de áreas (`Proyecto.tsx:234-243`): es texto indexable gratuito y mejora la elegibilidad para featured snippet.

---

## 5. FASE 5 — ACCESIBILIDAD

### 5.1 Contraste: dos combinaciones fallan AA

Medido sobre la paleta real:

| Combinación | Ratio | Estado | Corrección |
|---|---|---|---|
| `text-white/80` sobre steel (12px) | **4,46** | ✗ | subir a `white/90` (5,15) |
| `text-sp-steel-mute` sobre crema (12px) | **3,56** | ✗ | usar `sp-steel` (5,28) |

Ambas se usan mucho: los 4 puntos VIS y todas las notas al pie.

### 5.2 Menú móvil y lightbox

- El menú móvil (`Navbar.tsx:110-146`) no frena a Lenis, así que **el fondo sigue haciendo scroll**. No cierra con `Escape` y le falta `aria-expanded`/`aria-controls` en el botón.
- El lightbox (`PlanLightbox.tsx:22-38`) usa `document.body.style.overflow = "hidden"`, que **tampoco detiene a Lenis**. Necesita `lenis.stop()` / `lenis.start()`.
- **Problema de arquitectura:** la instancia de Lenis solo existe dentro de `SmoothScroll` y nadie más puede alcanzarla. Expórtala como singleton en `lib/animations.ts` o pásala por contexto.
- El lightbox no atrapa el foco (con Tab se sale al fondo) ni lo devuelve al elemento que lo abrió.
- `animate-fade-in` (`Navbar.tsx:111`) **no existe** en la configuración de Tailwind: la clase no hace nada y los `animationDelay` escalonados de los enlaces tampoco.

### 5.3 Fugas de Lenis

`lib/animations.ts:41` añade un callback a `gsap.ticker` que **nunca se remueve**, y `SmoothScroll.tsx:10` resuelve la promesa después del unmount en StrictMode → queda una instancia huérfana con su ticker vivo llamando `raf()` sobre un Lenis destruido. Guarda la función del ticker y hazle `gsap.ticker.remove(fn)` en el cleanup, con un flag `cancelled` para la promesa.

### 5.4 Menores

- `alt={title}` en `PlanLightbox.tsx:84` → añade una prop `alt` descriptiva con contexto geográfico y áreas.
- Falta `scroll-margin-top` en las secciones: con el header fijo, al llegar por ancla el título queda tapado.
- Falta un enlace "saltar al contenido" hacia `<main>` (que además no tiene `id`).
- `Navbar.tsx:43` usa `href="#"`: cámbialo por `href="/"` o `href="#hero"` (ese `id` ya existe sin usar).
- `select-none` en todo el hero (`Hero.tsx:142`) impide copiar el teléfono y el claim.
- `data/proyecto.ts:110`: la descripción del "Local comercial" en la tabla de áreas no está en el ayuda-ventas. Elimínala o márcala como texto derivado.

---

## 6. FASE 6 — DERIVA DE ESTILO (decisión de diseño)

Hay **20 iconos de lucide repartidos en 12 componentes** (Sparkles, Car, Trees, Home, Layers, TrendingUp, Compass, Store…), más `rounded-lg` y `shadow-xl` en casi todos los paneles.

El ayuda-ventas original **no tiene ni un solo icono, ni una esquina redondeada, ni una sombra**: se estructura con filetes de 1px, tracking amplio y bloques rectangulares. Individualmente cada decisión es inocente; juntas convierten una pieza editorial en un dashboard.

Además, en las fichas de Arquitectura los títulos ("Balcones", "Garaje", "Andenes") pasaron a `font-sans font-semibold` cuando en el PDF son display serif.

**Propuesta:** eliminar los iconos decorativos (conservar solo los funcionales: WhatsApp, cerrar, menú, chevron), pasar `rounded-lg` → `rounded-none` o `rounded-sm`, quitar las sombras salvo en el lightbox, y devolver los títulos de las fichas a `font-display`.

Esto no rompe nada, pero es lo que separa "se ve como el ayuda-ventas" de "se ve como una plantilla". **Consúltalo antes de aplicarlo** si hay dudas sobre la dirección de arte.

---

## 7. VERIFICACIÓN

Ejecuta esto después de cada fase. **Ninguno debe fallar.**

```bash
# 1. Cero clases de color muertas (debe imprimir 0)
grep -rohE '\b(bg|text|border|divide|from|to|via|ring)-sp-[a-z-]+/(\[[0-9.]+\]|[0-9]+)' components app | wc -l
#    (tras la Fase 1 ya generan CSS; para confirmarlo, compila y busca la regla en el CSS de salida)

# 2. Cero tokens inexistentes (debe imprimir 0)
grep -rn "sp-steel-deep" components app | wc -l

# 3. Cero focus:outline-none sin reemplazo
grep -rn "focus:outline-none" components | grep -v "focus-visible:outline" | wc -l

# 4. Cero Image fill sin sizes (debe imprimir 0)
python -c "
import re,glob
n=0
for f in glob.glob('components/*.tsx'):
    s=open(f,encoding='utf-8').read()
    for m in re.finditer(r'<Image\b[^>]*?/>', s, re.S):
        if 'fill' in m.group(0) and 'sizes' not in m.group(0):
            print('SIN sizes:', f, s[:m.start()].count(chr(10))+1); n+=1
print('total:', n)"

# 5. Build limpio + comprobar que los precios YA NO salen en cero
npm run build
grep -c '\$<!-- -->0</span>' .next/server/app/index.html   # debe ser 0
grep -c '0,00' .next/server/app/index.html                  # debe ser 0
grep -o '>147<\|>170<\|>217<' .next/server/app/index.html | wc -l   # debe ser >= 3

# 6. Los archivos de indexabilidad existen
ls app/robots.ts app/sitemap.ts app/opengraph-image.tsx app/icon.png

# 7. Typecheck
npx tsc --noEmit
```

**Criterios de aceptación finales:**

1. El HTML del servidor contiene los precios y las áreas reales, nunca `$0` ni `0,00`.
2. Ninguna clase de color con opacidad se descarta: el degradado de Arquitectura y el fondo del lightbox se ven.
3. El hero no parpadea al cargar y el logo/h1 no parten de `opacity: 0`.
4. Con `prefers-reduced-motion: reduce` la página es 100% legible y estática, con los valores finales visibles.
5. Todo elemento interactivo muestra foco visible al navegar con Tab.
6. Lighthouse ≥95 en las cuatro categorías; LCP <2,5s; CLS <0,05.
7. El enlace compartido en WhatsApp muestra imagen, título y descripción correctos.
8. `npx tsc --noEmit` y `npm run build` pasan sin errores ni warnings.

---

## 8. ORDEN DE EJECUCIÓN RECOMENDADO

| Orden | Qué | Por qué primero |
|---|---|---|
| 1 | Fase 1.1 + 1.2 (colores y token) | 2 archivos reparan 68 clases; todo lo visual depende de esto |
| 2 | Fase 1.3 + 1.4 (contadores) | Un cambio arregla el `$0` indexado **y** el CLS |
| 3 | Fase 1.5 + 1.7 (hero y foco) | Desbloquean LCP y accesibilidad |
| 4 | Fase 3.1 + 3.2 + 3.3 (imágenes) | Mayor retorno en Core Web Vitals |
| 5 | Fase 2.5 (og:image) | Mayor retorno comercial inmediato: WhatsApp es el canal de venta |
| 6 | Fase 2.3 + 2.4 (JSON-LD e indexabilidad) | Antes de desplegar |
| 7 | Fase 2.1 + 2.2 + 2.6 (h1, encabezados, metadata) | |
| 8 | Fase 4 (ubicación, FAQ, tel:) | Requiere datos del cliente |
| 9 | Fase 5 y 6 | Pulido |

**Empieza por la Fase 1 completa y muéstrame el resultado antes de seguir.**
