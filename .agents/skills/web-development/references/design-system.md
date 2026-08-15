# Sistema de Diseño y Tokens CSS

## 1. Declaración de Tokens en CSS

```css
:root {
  /* Paleta cromática HSL / Hex con nombres semánticos */
  --color-primary: #2C3842;
  --color-primary-dark: #25313C;
  --color-accent: #C6B799;
  --color-surface-light: #F7F2EB;
  --color-surface-white: #FFFFFF;
  
  /* Tipografía */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Jost', system-ui, sans-serif;
  
  /* Espaciado y radios */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
}
```

## 2. Tipografía Responsiva con clamp()

* **Titulares H1:** `clamp(2.5rem, 6vw, 5.5rem)`
* **Titulares H2:** `clamp(2rem, 4vw, 3.5rem)`
* **Subtítulos:** `clamp(1.1rem, 1.6vw, 1.5rem)`
* **Kickers:** `0.72rem` con `letter-spacing: 0.22em` en mayúsculas.
* **Cuerpo:** `1rem` con `line-height: 1.75` y `max-width: 62ch`.

## 3. Accesibilidad de Color (WCAG AA)
* Texto normal: contraste mínimo **4.5:1** contra el fondo.
* Texto grande / negrita (≥ 18pt o 14pt bold): contraste mínimo **3:1**.
* Elementos interactivos y bordes de input: contraste mínimo **3:1**.
