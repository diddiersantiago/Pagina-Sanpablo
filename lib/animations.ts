"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASING = {
  default: "expo.out",
  entrance: "power3.out",
  smooth: "power2.out",
  linear: "none",
} as const;

export const DURATION = {
  text: 0.9,
  media: 1.2,
  stamp: 0.4,
  counter: 1.4,
  fast: 0.3,
} as const;

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/* -------------------------------------------------------------------------- */
/* Lenis singleton                                                            */
/* -------------------------------------------------------------------------- */
/*
 * El lightbox y el menú móvil necesitan frenar el scroll suave; sin un
 * accesor global la instancia queda encerrada en <SmoothScroll> y el fondo
 * sigue desplazándose bajo el overlay.
 */
let lenisInstance: Lenis | null = null;

export const getLenis = () => lenisInstance;

/** Detiene el scroll suave (overlays). No-op si Lenis no está activo. */
export const lockScroll = () => {
  lenisInstance?.stop();
  document.documentElement.style.overflow = "hidden";
};

/** Reanuda el scroll suave. */
export const unlockScroll = () => {
  document.documentElement.style.overflow = "";
  lenisInstance?.start();
};

/**
 * Inicializa Lenis y devuelve su función de limpieza. La limpieza remueve el
 * callback del ticker de GSAP: sin eso, en StrictMode queda un ticker vivo
 * llamando raf() sobre una instancia ya destruida.
 */
export const initLenis = async (): Promise<(() => void) | null> => {
  if (typeof window === "undefined" || prefersReducedMotion()) return null;

  try {
    const LenisCtor = (await import("lenis")).default;
    const lenis = new LenisCtor({
      lerp: 0.08,
      smoothWheel: true,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    lenisInstance = lenis;

    return () => {
      gsap.ticker.remove(tickerFn);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      if (lenisInstance === lenis) lenisInstance = null;
    };
  } catch (error) {
    console.error("Lenis initialization error:", error);
    return null;
  }
};

/* -------------------------------------------------------------------------- */
/* Reveal hook                                                                */
/* -------------------------------------------------------------------------- */

export interface RevealOptions {
  /** Desplazamiento vertical inicial en px. */
  y?: number;
  /** Desplazamiento horizontal inicial en px. */
  x?: number;
  delay?: number;
  duration?: number;
  /** start de ScrollTrigger. Por defecto "top 80%". */
  start?: string;
  ease?: string;
  /** Elemento que dispara el trigger. Por defecto, el propio ref. */
  trigger?: RefObject<HTMLElement | null>;
}

/**
 * Patrón compartido por todas las secciones: fromTo + ScrollTrigger once,
 * respetando prefers-reduced-motion.
 *
 * Nota sobre no-JS: el estado inicial (opacity 0) lo aplica GSAP, nunca el
 * CSS servido. Si el JavaScript no se ejecuta, el contenido queda visible.
 */
export function useReveal(ref: RefObject<HTMLElement | null>, opts: RevealOptions = {}) {
  const {
    y = 24,
    x = 0,
    delay = 0,
    duration = DURATION.text,
    start = "top 80%",
    ease = EASING.default,
    trigger,
  } = opts;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: trigger?.current ?? el,
            start,
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Contador que NO se indexa en cero.
 *
 * El estado arranca con el valor final (el HTML del servidor emite la cifra
 * real y el ancho del texto no cambia). Solo si el elemento está fuera de
 * pantalla al montar se rebobina a cero para animarlo al entrar.
 */
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  targets: number[],
  onUpdate: (values: number[]) => void,
  opts: { start?: string; duration?: number; trigger?: RefObject<HTMLElement | null> } = {}
) {
  const { start = "top 85%", duration = DURATION.counter, trigger } = opts;

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = trigger?.current ?? ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj: Record<string, number> = {};
      const to: Record<string, number> = {};
      targets.forEach((t, i) => {
        obj[`v${i}`] = 0;
        to[`v${i}`] = t;
      });

      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          onUpdate(targets.map(() => 0));
          gsap.to(obj, {
            ...to,
            duration,
            ease: EASING.smooth,
            onUpdate: () => onUpdate(targets.map((_, i) => obj[`v${i}`])),
          });
        },
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
