import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASING = {
  default: "expo.out",
  entrance: "power3.out",
  smooth: "power2.out",
  linear: "none",
};

export const DURATION = {
  text: 0.9,
  media: 1.2,
  stamp: 0.4,
  counter: 1.4,
  fast: 0.3,
};

export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const initLenis = async () => {
  if (typeof window === "undefined" || prefersReducedMotion()) return null;

  try {
    const Lenis = (await import("lenis")).default;
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return lenis;
  } catch (error) {
    console.error("Lenis initialization error:", error);
    return null;
  }
};
