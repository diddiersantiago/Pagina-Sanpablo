---
name: web-development
description: Guía y procedimientos avanzados de desarrollo web moderno. Úsala al diseñar interfaces de alta fidelidad, desarrollar aplicaciones con Next.js/React/TypeScript, implementar sistemas de tokens CSS, animaciones con GSAP/Lenis, optimización de rendimiento Core Web Vitals (Lighthouse 95+), accesibilidad WCAG y SEO estructurado.
---

# Skill: Desarrollo Web Frontend de Alta Gama

Esta skill proporciona los estándares, flujos de trabajo y directrices técnicas para construir aplicaciones web modernas, rápidas, accesibles y estéticamente superiores.

---

## 1. Stack Tecnológico Estándar

* **Framework:** Next.js (App Router) / React + TypeScript.
* **Estilos:** Tailwind CSS o Vanilla CSS estructurado con tokens centralizados (`tokens.css` / `globals.css`).
* **Animaciones:** GSAP 3 + ScrollTrigger, Lenis (scroll suave) o Framer Motion.
* **Iconografía:** Lucide React / Tabler Icons o SVGs optimizados.

---

## 2. Flujo de Trabajo para Nuevas Funcionalidades

### Paso 1: Definición de Tokens y Sistema de Diseño
1. Centralizar variables CSS en `:root` (colores primarios, secundarios, neutros, estados y tipografía).
2. Configurar la escala tipográfica con `clamp()` para fluidez responsiva.
3. Consultar la guía de tokens: [design-system.md](./references/design-system.md).

### Paso 2: Arquitectura de Componentes
1. Dividir la interfaz en componentes atómicos y reutilizables en `components/`.
2. Extraer toda la data estática a `data/*.ts` tipada para evitar contenido hardcodeado en JSX.
3. Separar componentes cliente (`"use client"`) únicamente cuando requieran estado o interactividad en el navegador.

### Paso 3: Animaciones y Micro-interacciones
1. Usar GSAP / Framer Motion con transiciones suaves (`expo.out` o `power2.out`).
2. Respetar siempre `@media (prefers-reduced-motion: reduce)` desactivando parallax y movimientos bruscos.
3. Limitar animaciones a propiedades de rendimiento óptimo: `transform`, `opacity` y `clip-path`.

---

## 3. Lista de Verificación (Checklist de Calidad)

Antes de entregar o desplegar una web:

- [ ] **Rendimiento:** Imágenes en formato WebP/AVIF con dimensiones y `aspect-ratio` reservados (evitar CLS).
- [ ] **Accesibilidad (a11y):** Contraste de color mínimo 4.5:1 (AA), foco visible (`outline-offset`), etiquetas `aria-label` en botones interactivos.
- [ ] **SEO:** Una sola etiqueta `<h1>` por página, metadatos OpenGraph, canonical y datos estructurados JSON-LD.
- [ ] **Responsivo:** Probado en resoluciones móviles (320px, 375px), tablets (768px) y pantallas grandes (1440px+).
- [ ] **Validación:** Build limpio con `npm run build` sin errores de tipos TypeScript ni linter.

---

## 4. Referencias y Documentación
* [Sistema de Diseño y Tokens](./references/design-system.md)
* [Checklist de SEO y Metadatos](./references/seo-checklist.md)
