# PROMPT — Landing page "Urbanización San Pablo" (VIS · Soracá, Boyacá)

> Copia todo lo que está debajo de la línea y pégalo en tu herramienta de código (Claude Code, Cursor, v0, Lovable, etc.).
> El bloque está escrito para que el modelo NO invente marca: la paleta, la tipografía y los textos son los reales del ayuda-ventas.

---

## 0. ROL Y OBJETIVO

Actúa como un director de arte digital + desarrollador front-end senior especializado en landing pages inmobiliarias de alta gama.

Construye una **landing page de una sola página (one-page, scroll vertical)** para el proyecto inmobiliario **Urbanización San Pablo**, un proyecto de Vivienda de Interés Social (VIS) en Soracá, Boyacá (Colombia).

**Objetivo de negocio:** que un visitante entienda el proyecto en menos de 40 segundos y termine escribiendo por WhatsApp al **324 358 2526**. Todo el diseño debe empujar hacia esa conversión sin volverse agresivo: el tono es **sobrio, elegante, aspiracional y confiable**, no "descuento y urgencia chillona".

**Fuente de verdad:** el ayuda-ventas comercial `Ayudaventas San Pablo.pdf` (7 páginas, edición 2026). La web es la traducción digital de esa pieza: **misma identidad, mismo lenguaje visual, mismos datos**. No cambies colores, no cambies tipografías, no inventes cifras, no inventes amenidades.

---

## 1. REGLA DE ORO (LO MÁS IMPORTANTE)

1. **La paleta y la tipografía son intocables.** Están definidas abajo con valores exactos. No agregues colores "de acento" nuevos (nada de azules brillantes, verdes, morados o gradientes de moda). No sustituyas las tipografías por defaults del framework.
2. **Ningún dato inventado.** Áreas, precios, cantidades y estados (VENDIDO / Disponible) se copian literalmente de la sección 5 de este prompt. Si falta un dato, se omite la pieza — no se rellena.
3. **Las animaciones son de lujo, no de feria.** Movimientos lentos, cortos y suaves. Nada rebota, nada gira, nada parpadea. Si una animación llama más la atención que el contenido, está mal.
4. **Formato de números en español-Colombia:** coma decimal y punto de miles (`79,92 m²`, `$170 millones`). Nunca `79.92`.

---

## 2. STACK TÉCNICO

- **Next.js 15 (App Router) + TypeScript + Tailwind CSS.**
  - Si el entorno no permite Next, usa **HTML5 + CSS + JS vanilla en un solo proyecto estático** con la misma estructura y las mismas variables CSS. La calidad visual no puede bajar.
- **Animación:** GSAP + ScrollTrigger (o Framer Motion si el proyecto es React puro). Scroll suave con **Lenis**.
- **Imágenes:** `next/image` con `placeholder="blur"`, formatos AVIF/WebP.
- **Sin librerías de UI genéricas** (nada de Bootstrap, MUI, shadcn con su look por defecto). Todo el CSS es propio y usa los tokens de la sección 3.
- **Un solo archivo de tokens** (`app/globals.css` o `styles/tokens.css`) donde vivan TODAS las variables de color, tipografía y espaciado. Ningún hex suelto en los componentes.
- Sitio en **español**, `lang="es-CO"`.

---

## 3. PALETA DE COLOR (VALORES EXACTOS — EXTRAÍDOS DEL PDF)

Declara exactamente estos tokens. Son los colores muestreados de la pieza original:

```css
:root {
  /* Base oscura — fondo dominante de portada, cierre y bloques de énfasis */
  --sp-navy:        #2C3842;  /* azul carbón, color madre de la marca */
  --sp-navy-deep:   #25313C;  /* variante más profunda, para vignettes y sombras */
  --sp-navy-soft:   #323E49;  /* hover de superficies oscuras */

  /* Azul acero — segundo color estructural (paneles, tablas, eyebrows) */
  --sp-steel:       #526778;  /* paneles laterales, encabezado de tabla, kickers */
  --sp-steel-ink:   #3E4D5B;  /* color de TEXTO de cuerpo sobre fondo claro */
  --sp-steel-mute:  #72828E;  /* texto secundario / metadatos */

  /* Base clara — fondo dominante de las secciones informativas */
  --sp-cream:       #F7F2EB;  /* crema cálido, fondo principal claro */
  --sp-white:       #FFFFFF;  /* tarjetas y planos sobre crema */

  /* Acentos */
  --sp-sand:        #C6B799;  /* arena/dorado mate — banda CTA, subrayados, viñetas */
  --sp-ivory:       #EADFC7;  /* marfil cálido — TITULARES sobre fondo navy */
  --sp-gold:        #D6A44B;  /* dorado del logotipo — usar con MUCHA moderación */

  /* Estado */
  --sp-sold:        #A4443B;  /* terracota apagado — etiqueta VENDIDO */
}
```

### Reglas de uso del color (obligatorias)

| Contexto | Fondo | Titular | Cuerpo | Detalle |
|---|---|---|---|---|
| Portada / Hero | `--sp-navy` | `--sp-ivory` | `rgba(255,255,255,.72)` | filetes en `--sp-sand` al 40% |
| Secciones informativas | `--sp-cream` | `--sp-navy` | `--sp-steel-ink` | reglas 1px `--sp-steel` al 20% |
| Paneles de datos / fichas de plano | `--sp-steel` | `--sp-ivory` | `rgba(255,255,255,.85)` | cifras en `--sp-ivory` |
| Tarjetas sobre crema | `--sp-white` | `--sp-navy` | `--sp-steel-ink` | borde superior 2px `--sp-navy` |
| Banda CTA | `--sp-sand` | `--sp-navy` | `--sp-navy` | icono WhatsApp `--sp-navy` |
| Cierre / footer | `--sp-navy` | `--sp-ivory` | `rgba(255,255,255,.6)` | precios en `--sp-ivory` |

- **Ritmo de fondos obligatorio** (así respira la pieza original): `navy → crema → imagen full-bleed → steel → crema → split → navy`. Nunca dos secciones claras planas seguidas sin un corte.
- `--sp-gold` solo para el logotipo y, como máximo, un microdetalle (la viñeta ✦). **No** para textos ni botones.
- `--sp-sold` solo para las etiquetas VENDIDO. Es el único rojo del sitio.
- **Nada de gradientes decorativos.** Se permiten únicamente: (a) el degradado de legibilidad sobre las fotos (`linear-gradient(to top, rgba(44,56,66,.85) 0%, rgba(44,56,66,.15) 55%, transparent 100%)`), y (b) el brillo dorado propio del logo (que ya viene en la imagen).
- **Contraste mínimo AA (4.5:1) en todo el texto.** Si un texto crema sobre foto no llega, sube el degradado, no aclares la marca.

---

## 4. TIPOGRAFÍA (SISTEMA EXACTO)

La pieza usa **dos familias**: una **display serif didone de altísimo contraste** para titulares y cifras, y una **sans geométrica humanista** para todo lo demás.

```css
--font-display: 'Playfair Display', 'Bodoni Moda', 'Prata', Georgia, serif;
--font-sans:    'Jost', 'Questrial', 'Poppins', system-ui, sans-serif;
```

Carga desde Google Fonts (`next/font/google`) con `display: swap` y subconjunto `latin-ext` (hay tildes y `ñ`). Pesos: Playfair Display 400/500 + itálica 400; Jost 300/400/500.

### Escala tipográfica

| Rol | Familia | Tamaño (desktop / móvil) | Peso | Tracking | Caso | Color |
|---|---|---|---|---|---|---|
| **H1 portada** | display | `clamp(3.5rem, 7vw, 6.5rem)` | 400 | `-0.02em` | MAYÚSCULAS | `--sp-ivory` |
| **H2 sección** | display | `clamp(2.5rem, 4.5vw, 4rem)` | 400 | `-0.015em` | MAYÚSCULAS | según fondo |
| **Subtítulo lírico** | display *italic* | `clamp(1.1rem, 1.6vw, 1.5rem)` | 400 | `0` | Frase normal | `--sp-steel` o `--sp-sand` |
| **Kicker / eyebrow** | sans | `0.72rem` | 400 | **`0.22em`** | MAYÚSCULAS | `--sp-steel` |
| **Cuerpo** | sans | `1.0625rem` / `1rem` | 300 | `0.005em` | normal | `--sp-steel-ink` |
| **Cifra destacada** (precios, m²) | display | `clamp(2rem, 3.2vw, 3rem)` | 400 | `-0.01em` | — | `--sp-ivory` / `--sp-navy` |
| **Etiqueta de tabla** | sans | `0.75rem` | 500 | `0.12em` | MAYÚSCULAS | `--sp-ivory` |
| **Legal / disclaimer** | sans | `0.7rem` | 300 | `0.02em` | normal | `rgba(255,255,255,.5)` |

### Reglas tipográficas no negociables

- **El tracking amplio de los kickers (`0.22em`) es la firma de la marca.** Aparece en la portada, en cada encabezado de sección y en los pies de página. No lo reduzcas.
- Interlineado: titulares `1.02`; cuerpo `1.75`; subtítulos itálicos `1.4`.
- Ancho de línea máximo del cuerpo: **65 caracteres** (`max-width: 62ch`).
- Las palabras con tilde y la `ñ` deben renderizarse perfectas en la display — verifica `SORACÁ`, `INTERÉS`, `AMPLIACIÓN`, `sueñan`.
- Los superíndices de `m²` usan el carácter `²`, no `<sup>`.
- **Nunca** uses `font-weight: 700` u 800 en la display: rompe el contraste didone. El peso 400 es el look.
- Números tabulares (`font-variant-numeric: tabular-nums`) en tablas y listas de áreas.

---

## 5. CONTENIDO REAL (COPIAR LITERAL — NO PARAFRASEAR CIFRAS)

**Marca:** Urbanización San Pablo · Soracá · Bajo el lema del logotipo *«Hogares que construyen futuro»*
**Claim principal:** «Donde se construye tu futuro.»
**Categoría:** Proyecto VIS · Vivienda de Interés Social
**Ubicación:** Soracá, Boyacá — a minutos de Tunja
**Aval institucional:** Municipio de Soracá · Boyacá (escudo)
**Contacto WhatsApp:** 324 358 2526
**Sala de ventas:** Soracá, Boyacá
**Edición:** 2026

### 5.1 El proyecto

> Urbanización San Pablo es un proyecto de **Vivienda de Interés Social (VIS)** que integra calidad, sostenibilidad y desarrollo para el crecimiento ordenado de Soracá. Casas de fachada en ladrillo a la vista, en dos tipologías —esquinera y medianera— con garaje cubierto, balcones y estructura prevista para crecer a un tercer piso, además de un local comercial sobre vía.

Titular de sección: **VIVIENDA DE INTERÉS SOCIAL EN SORACÁ**
Subtítulo itálico: *Espacios únicos, familias que sueñan y crecen.*

### 5.2 ¿Qué significa que sea VIS? (4 puntos)

- **Precio regulado.** Valor tope definido por ley (hasta 135 SMMLV), pensado para las familias.
- **Acceso a subsidios.** Aplica a programas de vivienda del Gobierno Nacional y de las cajas de compensación.
- **Calidad garantizada.** Cumple normas técnicas de sismorresistencia, urbanismo y habitabilidad.
- **Inversión que crece.** Alta valorización en un municipio en desarrollo, a minutos de Tunja.

Nota al pie: *Subsidios aplicables según condiciones vigentes: **Mi Casa Ya** y subsidio familiar de vivienda de las cajas de compensación.*

### 5.3 Áreas por tipología · Propiedad horizontal

| TIPOLOGÍA | 1° PISO | 2° PISO | 3° PISO* | TOTAL |
|---|---|---|---|---|
| Casa esquinera | 31,715 | 27,61 | 20,595 | **79,92 m²** |
| Casa medianera | 30,385 | 25,49 | 19,69 | **75,57 m²** |
| Local comercial | 70,40 | — | — | **70,40 m²** |

`*` *Áreas en m². El 3° piso corresponde a la **ampliación futura**: se entregan los planos con la vivienda.*

- **Casa esquinera:** Dos frentes e iluminación adicional. 79,92 m² totales con ampliación.
- **Casa medianera:** Entre unidades, óptima en costo. 75,57 m² totales con ampliación.

### 5.4 Arquitectura

Kicker: **ASÍ SE VE TU FUTURO**
Titular: **ARQUITECTURA QUE VALORIZA**
Bajada itálica: *Fachadas en ladrillo a la vista con carpintería negra: sobrias, durables y con carácter propio frente al paisaje boyacense.*

Tres micro-fichas sobre la imagen:
- **Balcones** — en cada fachada, con herrería forjada
- **Garaje** — privado con portón de diseño
- **Andenes** — arborizados e iluminación urbana

### 5.5 Planos comerciales

**PRIMER PISO** — *El área social de la casa: abierta, iluminada y con garaje propio.*
Garaje cubierto con pérgola 1 · Sala 1 · Comedor 1 · Cocina 1 · Baño social 1 · Punto de escalera 1
Esquinera **31,715 m²** · Medianera **30,385 m²** — *Área privada construida por unidad en primer piso.*
Pie: PLANTA COMERCIAL · UNIDADES PAREADAS

**SEGUNDO PISO** — *La zona de descanso: dos alcobas con baño y luz natural.*
Alcoba principal 1 · Alcoba auxiliar 1 · Baños completos 2 · Hall de escalera 1 · Terraza descubierta 1
Esquinera **27,61 m²** · Medianera **25,49 m²**
Pie: PLANTA COMERCIAL · ZONA PRIVADA

**AMPLIACIÓN · TERCER PISO** (caja destacada con borde arena):
> Cada vivienda se entrega con los **planos arquitectónicos y estructurales para ampliar un tercer piso**: 20,595 m² (esquinera) · 19,69 m² (medianera). La estructura queda prevista: la casa crece con tu familia.

### 5.6 Local comercial

Titular: **LOCAL COMERCIAL** — *Última oportunidad: solo queda un local disponible.*

> De los tres locales sobre el frente del proyecto, dos ya están vendidos. El Local 1 —el de mayor área— sigue disponible: planta libre de 70,40 m² con doble acceso sobre vía principal, baño privado y fachada con antejardín. Una inversión que crece con la llegada de nuevas familias al sector.

| Unidad | Área | Estado |
|---|---|---|
| **Local 1** | **70,40 m²** | **Disponible** |
| Local 2 | 50,70 m² | VENDIDO |
| Local 3 | 21,50 m² | VENDIDO |

Salón principal: Planta libre · Accesos: 2 · doble puerta · Baño privado: 1
Área total: **70,40 m²** — Valor · Local 1: **$217 millones**
Cintillo inferior: ***2 de 3 locales ya vendidos.** El comercio del proyecto se está asegurando ahora — queda solo el de mayor área.*

### 5.7 Inversión

Titular: **TU INVERSIÓN EN SAN PABLO**
Bajada itálica (alineada a la derecha): *Precio VIS regulado, subsidios vigentes y unidades limitadas: el momento de decidir es ahora.*

| | CASA ESQUINERA · VIS | CASA MEDIANERA · VIS | LOCAL COMERCIAL |
|---|---|---|---|
| **Precio** | **$170 millones** | **$147 millones** | **$217 millones** |
| Detalle | 59,33 m² construidos · 79,92 m² con ampliación de tercer piso. | 55,88 m² construidos · 75,57 m² con ampliación de tercer piso. | Local 1 · 70,40 m² · planta libre con doble acceso y baño. Único disponible. |

Dos notas con viñeta cuadrada arena:
- Por ser **proyecto VIS**, tu compra puede aplicar a subsidios de vivienda del Gobierno Nacional y de las cajas de compensación familiar, según condiciones vigentes.
- **Cada casa se entrega con los planos para ampliar el tercer piso**: compras hoy 55–59 m² y creces hasta 75–80 m² sin volver a diseñar.

**Banda CTA (fondo `--sp-sand`):**
Kicker: AGENDA TU VISITA · Texto: *Escríbenos por WhatsApp y conoce el proyecto en Soracá.* · Botón/teléfono: **324 358 2526** con icono de WhatsApp.

### 5.8 Legal (footer, obligatorio, literal)

> Imágenes de carácter ilustrativo. No constituyen oferta. Áreas aproximadas en m², sujetas a ajustes de diseño y licenciamiento · Soracá, Boyacá.

---

## 6. ESTRUCTURA DE LA PÁGINA (10 SECCIONES)

Cada sección mapea una página del ayuda-ventas. Respeta el orden.

0. **Navbar** — transparente sobre el hero, se vuelve `--sp-navy` con blur al pasar 80px. Logo a la izquierda (versión reducida), enlaces ancla al centro (El proyecto · Arquitectura · Planos · Local · Inversión) y botón WhatsApp arena a la derecha. En móvil: menú overlay a pantalla completa, fondo navy, enlaces en display, entrada escalonada.
1. **HERO** (pág. 1) — fondo `--sp-navy` con el patrón de líneas onduladas verticales de la marca (SVG, trazo `rgba(255,255,255,.06)`). Logo dorado centrado. H1 «URBANIZACIÓN SAN PABLO». Kicker con filetes verticales: `PROYECTO VIS · VIVIENDA DE INTERÉS SOCIAL`. Claim en display itálica: *«Donde se construye tu futuro.»* Sello del Municipio de Soracá en tarjeta crema arriba a la derecha. Indicador de scroll discreto abajo.
2. **EL PROYECTO** (pág. 2) — fondo crema, rejilla 2 columnas: izquierda titular + párrafo + panel steel «¿QUÉ SIGNIFICA QUE SEA VIS?» (4 puntos en 2×2); derecha tabla de áreas + dos tarjetas blancas (esquinera / medianera).
3. **ARQUITECTURA** (pág. 3) — imagen full-bleed a 100vh con el render de fachadas, degradado de legibilidad, titular abajo a la izquierda y las 3 micro-fichas de vidrio (`backdrop-filter: blur(10px)`, `background: rgba(44,56,66,.35)`, borde `rgba(255,255,255,.18)`) alineadas abajo a la derecha.
4. **PLANO · PRIMER PISO** (pág. 4) — split: panel steel a la izquierda (40%) con la lista de espacios y las dos cifras; render del plano a la derecha sobre blanco.
5. **PLANO · SEGUNDO PISO** (pág. 5) — mismo split **invertido** (plano a la izquierda, panel steel a la derecha), incluyendo la caja «AMPLIACIÓN · TERCER PISO» con borde arena.
6. **AMPLIACIÓN** — franja navy corta, de ancho completo, que narra el crecimiento: `55–59 m² hoy → 75–80 m² con tercer piso`, con una barra de progreso que se llena al hacer scroll.
7. **LOCAL COMERCIAL** (pág. 6) — split: render de los locales a la izquierda, contenido a la derecha sobre crema, con la lista de estados (Disponible / VENDIDO). Cintillo steel al pie del bloque izquierdo.
8. **INVERSIÓN** (pág. 7) — fondo navy. Tres tarjetas de precio (`--sp-navy-soft` con borde superior arena), dos notas con viñeta y la banda CTA arena de ancho completo.
9. **FOOTER** — navy. Logo San Pablo + escudo del Municipio, claim itálico, «Sala de ventas · Soracá, Boyacá» y el texto legal literal. Botón flotante de WhatsApp fijo abajo a la derecha en todo el sitio (arena, ícono navy, sombra suave).

---

## 7. SISTEMA DE ANIMACIÓN (LA PARTE CLAVE)

### 7.1 Física global

```
Easing por defecto:  cubic-bezier(0.16, 1, 0.3, 1)   /* expo.out — salida larga y suave */
Easing de entrada:   cubic-bezier(0.22, 1, 0.36, 1)
Duración estándar:   0.9s   (texto)  ·  1.2s  (imágenes/paneles)
Desfase (stagger):   0.08s–0.12s entre hermanos
Desplazamiento:      máximo 32px en Y, 40px en X. NUNCA más.
Disparo:             ScrollTrigger start "top 80%", once: true
```

- Scroll suave con **Lenis** (`lerp: 0.08`), sincronizado con ScrollTrigger.
- **Nada rebota** (`back`, `elastic`, `bounce` están prohibidos).
- Opacidad siempre `0 → 1`; nunca aparece nada de golpe.
- Un elemento se anima **una sola vez**. Nada se re-anima al volver a subir.

### 7.2 Animaciones por sección

**Hero (al cargar — coreografía de 2,4s):**
1. `0.0s` — Cortina navy cubre la pantalla y se retira hacia arriba (`clip-path: inset(0 0 100% 0)`, 1s).
2. `0.4s` — Las líneas onduladas del fondo se dibujan solas (`stroke-dasharray` animado, 1,8s, stagger 0,06s).
3. `0.7s` — Logo dorado: `opacity 0→1` + `scale 0.94→1` + un barrido de brillo (`mask` diagonal) que cruza una sola vez en 1,1s.
4. `1.0s` — H1 por líneas: cada línea entra desde `y: 24px` con `clip-path` de abajo hacia arriba, stagger 0,1s.
5. `1.3s` — Los dos filetes verticales del kicker crecen desde el centro (`scaleY 0→1`).
6. `1.5s` — Claim itálico con fade + `letter-spacing 0.06em → 0.01em`.
7. `1.8s` — Sello del Municipio entra desde la derecha (x: 24px).
8. `2.2s` — Indicador de scroll: fade in + rebote vertical infinito **muy sutil** (6px, 2s, ease-in-out).
- **Parallax del hero:** al hacer scroll, el patrón de fondo sube a `0.3x` y el contenido a `0.6x`, con fade-out del contenido a los 60vh.

**Titulares de sección (en todo el sitio):**
- Efecto firma: **revelado por línea con máscara**. Cada línea del `<h2>` dentro de un `overflow:hidden`, entra `y: 100% → 0` en 0,9s con stagger 0,1s. (Divide con SplitType o `<span>` por línea.)
- El kicker aparece 0,15s antes, con `letter-spacing 0.32em → 0.22em`.
- El filete de 1px bajo el kicker crece de `scaleX: 0 → 1` con origen izquierdo, 0,8s.

**Sección El Proyecto:**
- Columnas: la izquierda entra `x: -24px`, la derecha `x: +24px`, ambas con fade, offset 0,12s.
- **Tabla de áreas:** encabezado primero; luego cada fila con fade + `y: 12px`, stagger 0,08s. Las cifras TOTAL hacen **conteo numérico** de 0 al valor real en 1,2s (respetando la coma decimal: `79,92`). Al hacer hover, la fila se tiñe `rgba(82,103,120,.06)` en 0,25s.
- **Panel VIS:** el fondo steel se despliega con `clip-path: inset(0 0 100% 0) → inset(0)` de abajo hacia arriba en 0,9s; los 4 puntos entran después con stagger 0,1s.
- **Tarjetas esquinera/medianera:** el borde superior de 2px crece `scaleX 0→1` y luego entra el texto.

**Arquitectura (la sección más cinematográfica):**
- La imagen entra con `scale: 1.12 → 1` a lo largo de todo el scroll de la sección (ScrollTrigger `scrub: 1`) — un zoom-out lentísimo tipo Ken Burns.
- El degradado de legibilidad aumenta su opacidad de 0,4 a 0,85 conforme el titular se acerca al centro.
- Titular y bajada entran con el revelado por líneas.
- Las 3 micro-fichas de vidrio entran una a una desde `y: 20px` con stagger 0,12s; al hacer hover, `background` sube a `rgba(44,56,66,.5)` y el borde a `rgba(255,255,255,.35)` en 0,3s.

**Planos (primer y segundo piso):**
- El panel steel se despliega desde su borde exterior (izquierdo en pág. 4, derecho en pág. 5) con `clip-path`, 1s.
- La lista de espacios: cada renglón entra con fade + `x: -12px`, stagger 0,07s; la línea punteada/filete que separa cada renglón crece `scaleX 0→1` a la vez.
- Las cifras de m² hacen conteo numérico y su `opacity` sube de 0,6 a 1.
- **El render del plano** entra con `scale: 1.04 → 1` + fade en 1,2s, y luego tiene un **parallax suave** (`yPercent: -6` con `scrub`) mientras la sección atraviesa el viewport.
- *Detalle premium opcional:* al pasar el cursor sobre un renglón de la lista (p. ej. "Cocina"), se ilumina un punto marcador sobre el plano. Si lo implementas, usa coordenadas porcentuales y un halo `--sp-sand` al 30%. Si no hay tiempo, omítelo — no lo hagas mal.

**Ampliación (franja navy):**
- Barra de progreso ligada al scroll (`scrub: true`): se llena de 0 a 100% en `--sp-sand`.
- Las cifras `55–59 m²` y `75–80 m²` hacen contra-conteo sincronizado con la barra.

**Local comercial:**
- Las etiquetas **VENDIDO** entran con un `stamp`: `scale 1.08 → 1` + fade en 0,4s, y con una **rotación fija de -3deg** ya presente (no animes la rotación). Stagger 0,15s entre las dos.
- La fila "Local 1 · Disponible" se ilumina al final con un pulso único del borde arena (0,6s, una sola vez).

**Inversión:**
- Las tres tarjetas de precio entran escalonadas (stagger 0,12s) con fade + `y: 24px`; el borde superior arena crece primero.
- Los precios (`$170`, `$147`, `$217`) hacen conteo numérico de 1,4s con `ease: power2.out`.
- **Banda CTA:** se despliega horizontalmente (`scaleX 0→1`, origen izquierdo, 1s) y luego entra el contenido. El número de teléfono tiene un **hover con subrayado que crece desde la izquierda** y un microscale de 1,02.
- Botón flotante de WhatsApp: entra a los 3s de la carga con fade + `scale 0.8→1`; halo de pulso muy tenue cada 4s (opacidad 0,25 máx.).

### 7.3 Micro-interacciones (obligatorias)

- **Enlaces del navbar:** subrayado de 1px arena que crece desde la izquierda en 0,3s.
- **Botones:** fondo arena → navy con texto crema en 0,25s; sin sombras duras, sin `transform: translateY(-3px)` exagerado (máximo -2px).
- **Cursor personalizado (opcional, solo desktop):** punto de 8px `--sp-sand` con `mix-blend-mode: difference` y `lerp` 0,15. Sobre elementos interactivos crece a 40px con `opacity: .3`. Si lo agregas, mantén el cursor nativo funcional en formularios.
- **Imágenes:** hover con `scale(1.03)` en 0,7s con el easing por defecto.
- Barra de progreso de lectura de 2px `--sp-sand` fija en el borde superior de la ventana.

### 7.4 Restricciones de animación

- Solo se animan `transform` y `opacity` (más `clip-path` y `stroke-dashoffset` en los casos indicados). **Nunca** `width`, `height`, `top`, `left` ni `margin`.
- `will-change` solo durante la animación; retíralo al terminar.
- **`prefers-reduced-motion: reduce` → todo el contenido visible, sin desplazamientos, sin parallax, sin conteos** (muestra el valor final), sin Lenis. Esto no es opcional.
- Ninguna animación puede provocar scroll horizontal ni CLS. Reserva `aspect-ratio` en todas las imágenes.
- En móvil: desactiva parallax y cursor personalizado; reduce duraciones un 25% y desplazamientos a 16px.

---

## 8. RESPONSIVE

Breakpoints: `320 · 480 · 768 · 1024 · 1440 · 1920`.

- **Mobile-first.** Todos los splits de 2 columnas se apilan; el panel steel siempre va **encima** del plano en móvil.
- El hero pasa de 100vh a `min-height: 100svh` (usa `svh`, no `vh`, para evitar el salto de la barra del navegador en iOS).
- La tabla de áreas en móvil se convierte en **tarjetas apiladas** (una por tipología, con las etiquetas 1°/2°/3°/TOTAL a la izquierda). Nunca scroll horizontal en la tabla.
- Las 3 micro-fichas de Arquitectura pasan a un carrusel horizontal con scroll-snap.
- Las tarjetas de precio se apilan; la banda CTA pasa a dos filas (texto arriba, teléfono grande abajo, tap target ≥ 48px).
- Los planos son la pieza más delicada en móvil: dales `max-width: 100%`, fondo blanco y un **botón de "ver plano ampliado"** que abra un lightbox con zoom/pinch.

---

## 9. ACCESIBILIDAD Y RENDIMIENTO

- HTML semántico: un solo `<h1>`, jerarquía correcta, `<section>` con `aria-labelledby`.
- Foco visible en todo lo interactivo: `outline: 2px solid var(--sp-sand); outline-offset: 3px`.
- `alt` descriptivo y en español en cada imagen (ej.: `"Render de las fachadas en ladrillo a la vista de Urbanización San Pablo, Soracá"`).
- El contenido debe ser legible con JavaScript desactivado (las animaciones parten de un estado visible que JS oculta, no al revés — evita el flash de contenido invisible).
- Objetivo Lighthouse: **≥ 95 en Performance, Accesibilidad, Buenas prácticas y SEO.** LCP < 2,5s, CLS < 0,05.
- Imágenes: `priority` solo en el logo del hero; el resto `loading="lazy"`. Sirve el render de fachadas en AVIF a 1920px máximo.
- El enlace de WhatsApp: `https://wa.me/573243582526?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Urbanizaci%C3%B3n%20San%20Pablo%20en%20Sorac%C3%A1` con `rel="noopener"`.

---

## 10. SEO Y METADATOS

```
<title>Urbanización San Pablo · Casas VIS en Soracá, Boyacá | Desde $147 millones</title>
<meta name="description" content="Proyecto VIS en Soracá, Boyacá: casas de 75,57 y 79,92 m² en ladrillo a la vista, con garaje, balcones y planos para ampliar un tercer piso. Aplica a subsidios. Desde $147 millones.">
```

- `og:image` con el render de fachadas + logo, 1200×630.
- Datos estructurados JSON-LD tipo `Residence` / `RealEstateListing` con nombre, dirección (Soracá, Boyacá, CO), rango de precios y teléfono de contacto.
- `canonical`, `lang="es-CO"`, favicon derivado del monograma dorado del logotipo.

---

## 11. ASSETS

Las imágenes se extraen del PDF `Ayudaventas San Pablo.pdf` (páginas rotadas 90°, formato horizontal). Guárdalas en `/public/img/` con estos nombres:

| Archivo | Contenido | Uso |
|---|---|---|
| `logo-san-pablo.png` | Logotipo dorado completo (viene con fondo navy `#2C3842` incorporado) | Hero y footer — **solo sobre fondo navy**, o recórtale el fondo si lo necesitas sobre crema |
| `render-fachadas.jpg` | Render exterior de la manzana en ladrillo a la vista | Sección Arquitectura (full-bleed) |
| `plano-primer-piso.jpg` | Planta amueblada del primer piso, unidades pareadas | Sección Planos |
| `plano-segundo-piso.jpg` | Planta amueblada del segundo piso | Sección Planos |
| `render-locales.jpg` | Axonometría de los 3 locales con sellos VENDIDO | Sección Local comercial |
| `escudo-soraca.png` | Escudo del Municipio de Soracá | Hero y footer |

Comando de extracción (Python + PyMuPDF), por si necesitas regenerarlas:

```bash
pip install pymupdf pypdf
python -c "from pypdf import PdfReader; r=PdfReader('Ayudaventas San Pablo.pdf'); [open(f'p{i+1}_{j}.jpg','wb').write(im.data) for i,p in enumerate(r.pages) for j,im in enumerate(p.images)]"
```

**El patrón de líneas onduladas del fondo del hero recréalo en SVG**, no lo uses como imagen: son ~10 curvas verticales suaves, trazo de 1px en `rgba(255,255,255,.06)`, distribuidas de forma irregular a los lados del lienzo.

---

## 12. CRITERIOS DE ACEPTACIÓN

La entrega se considera correcta si:

1. Un screenshot del hero y otro del ayuda-ventas puestos lado a lado **se leen como la misma marca**.
2. No aparece **ningún** color fuera de los tokens de la sección 3.
3. Los titulares son display serif en mayúsculas con tracking negativo; los kickers son sans con `0.22em`. Sin excepciones.
4. Todas las cifras coinciden **carácter por carácter** con la sección 5, incluida la coma decimal.
5. Ninguna animación dura más de 1,4s ni desplaza más de 32px.
6. Con `prefers-reduced-motion: reduce` la página es 100% legible y estática.
7. En un iPhone SE (375px) no hay scroll horizontal, ni texto por debajo de 14px, ni tap targets menores a 44px.
8. El WhatsApp es accesible desde cualquier punto del scroll en menos de un gesto.

---

## 13. LO QUE NO DEBES HACER

- ❌ Cambiar la paleta "para modernizarla" o agregar un acento nuevo.
- ❌ Usar tipografías por defecto (Inter, Roboto, Arial, system-ui como principal).
- ❌ Poner el logotipo dorado sobre fondo claro sin tratar el fondo navy que trae incorporado.
- ❌ Inventar amenidades (piscina, gimnasio, portería 24h, zonas comunes) — el proyecto **no** las declara.
- ❌ Inventar fechas de entrega, número de unidades, etapas o planes de financiación.
- ❌ Animaciones con rebote, giros, confeti, contadores regresivos o pop-ups de urgencia.
- ❌ Modo oscuro conmutable: la página **ya** alterna oscuro y claro por diseño.
- ❌ Formularios que pidan datos personales sin política de tratamiento de datos (Ley 1581 de 2012, Colombia). Si agregas formulario, incluye la casilla de autorización de datos.
- ❌ Omitir el texto legal del footer.

---

## 14. ENTREGABLE

Entrega el proyecto completo y funcional:
- Estructura de carpetas clara (`app/`, `components/`, `public/img/`, `styles/`).
- Un componente por sección, nombres en español (`Hero.tsx`, `Proyecto.tsx`, `Arquitectura.tsx`, `PlantaPrimerPiso.tsx`, `PlantaSegundoPiso.tsx`, `Ampliacion.tsx`, `LocalComercial.tsx`, `Inversion.tsx`, `Footer.tsx`).
- Toda la data en `data/proyecto.ts` como objeto tipado (áreas, precios, listas, estados) — nada hardcodeado dentro del JSX.
- Las animaciones centralizadas en `lib/animations.ts` con las constantes de duración y easing reutilizables.
- `README.md` con instrucciones de instalación, de dónde salen los assets y cómo cambiar precios.

Empieza por los tokens de diseño y el hero; muéstrame ese avance antes de continuar con el resto de las secciones.
