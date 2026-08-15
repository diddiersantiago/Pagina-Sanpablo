# Urbanización San Pablo — Landing Page Inmobiliaria (VIS · Soracá, Boyacá)

Landing page de alta gama para el proyecto de Vivienda de Interés Social (VIS) **Urbanización San Pablo** ubicado en Soracá, Boyacá (Colombia).

La web es la traducción digital fiel del ayuda-ventas comercial oficial (`Ayudaventas San Pablo.pdf`, edición 2026).

---

## 🚀 Stack Técnico

* **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
* **Estilos:** Tailwind CSS con tokens estrictos de marca y variables CSS en `app/globals.css`
* **Tipografía:** Google Fonts (`Playfair Display` para titulares Didone y `Jost` para sans/kickers)
* **Animaciones:** GSAP 3 + ScrollTrigger + Scroll suave con Lenis
* **Iconografía:** Lucide React

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

---

## 🎨 Tokens de Color (Paleta Oficial)

Todos los colores provienen directamente del manual del PDF y están centralizados en `app/globals.css`:

* `--sp-navy`: `#2C3842` (Fondo dominante oscuro y color madre)
* `--sp-navy-deep`: `#25313C` (Variante profunda para sombras y pies)
* `--sp-navy-soft`: `#323E49` (Superficies de tarjetas oscuras)
* `--sp-steel`: `#526778` (Paneles laterales y tablas)
* `--sp-steel-ink`: `#3E4D5B` (Texto de cuerpo sobre fondo claro)
* `--sp-cream`: `#F7F2EB` (Fondo crema de secciones claras)
* `--sp-sand`: `#C6B799` (Acento arena/dorado mate para banda CTA y viñetas)
* `--sp-ivory`: `#EADFC7` (Marfil para titulares sobre fondo navy)
* `--sp-gold`: `#D6A44B` (Dorado sutil del logotipo)
* `--sp-sold`: `#A4443B` (Terracota para sellos de VENDIDO)

---

## 🖼️ Origen de los Assets (`public/img/`)

Las imágenes se extrajeron directamente de las páginas del PDF `Ayudaventas San Pablo.pdf`:

| Archivo | Contenido | Ubicación |
|---|---|---|
| `logo-san-pablo.png` | Logotipo oficial con fondo navy | `public/img/logo-san-pablo.png` |
| `logo-san-pablo-trans.png` | Logotipo con transparencia alfa | `public/img/logo-san-pablo-trans.png` |
| `escudo-soraca-trans.png` | Escudo institucional del Municipio de Soracá | `public/img/escudo-soraca-trans.png` |
| `render-fachadas.jpg` | Render exterior de fachadas en ladrillo a la vista | `public/img/render-fachadas.jpg` |
| `plano-primer-piso.jpg` | Planta comercial pareada - Primer piso | `public/img/plano-primer-piso.jpg` |
| `plano-segundo-piso.jpg` | Planta comercial zona privada - Segundo piso | `public/img/plano-segundo-piso.jpg` |
| `render-locales.jpg` | Axonometría de los locales comerciales | `public/img/render-locales.jpg` |

---

## 💰 ¿Cómo cambiar o actualizar precios y datos?

Toda la información del proyecto está centralizada y tipada en [`data/proyecto.ts`](data/proyecto.ts).

Para actualizar precios, teléfonos o disponibilidad, edita `data/proyecto.ts`:

```typescript
// Ejemplo de edición en data/proyecto.ts:
export const PROYECTO_DATA = {
  telefono: "324 358 2526",
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

---

## 📱 Accesibilidad y Rendimiento

* Formato de números colombiano (`79,92 m²`, `$170 millones`).
* Soporte estricto para `prefers-reduced-motion: reduce`.
* Totalmente responsive (320px a 1920px) con navegación táctil fluida y Lightbox de planos arquitectónicos con zoom.
* Acceso directo e inmediato al canal de WhatsApp (+57 324 358 2526).
