"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";
import { ArrowRight, Compass } from "lucide-react";

export default function Ampliacion() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scroll-linked progress bar growth
      if (progressBarRef.current && sectionRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 40%",
              scrub: true,
            },
          }
        );
      }

      // Fade elements
      gsap.fromTo(
        ".ampliacion-item",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Proyección de ampliación futura"
      className="relative w-full bg-sp-navy-deep py-14 sm:py-20 px-6 sm:px-8 lg:px-16 border-b border-white/10 overflow-hidden text-sp-ivory"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Kicker */}
        <div className="ampliacion-item flex items-center gap-2 mb-3">
          <Compass className="w-4 h-4 text-sp-sand" />
          <span className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-sand font-normal">
            Estructura con proyección de futuro
          </span>
        </div>

        {/* Big Metaphor / Range Headline */}
        <h3 className="ampliacion-item font-display font-normal text-2xl sm:text-3xl lg:text-4xl text-sp-ivory uppercase tracking-tight mb-6 max-w-3xl">
          Compras hoy <span className="text-sp-sand">55–59 m²</span> y creces hasta{" "}
          <span className="text-sp-sand">75–80 m²</span> sin volver a diseñar
        </h3>

        {/* Visual Progress / Timeline Bar */}
        <div className="ampliacion-item w-full max-w-2xl bg-sp-navy-soft rounded-full h-3 p-0.5 border border-white/15 my-4 relative">
          <div
            ref={progressBarRef}
            className="h-full bg-sp-sand rounded-full origin-left will-change-transform"
            style={{ width: "100%" }}
          />
        </div>

        {/* Timeline Range Indicator */}
        <div className="ampliacion-item flex items-center justify-between w-full max-w-2xl text-xs sm:text-sm font-sans text-white/80 pt-2 mb-6">
          <div className="flex flex-col items-start">
            <span className="text-sp-sand font-medium uppercase tracking-wider text-[0.65rem] sm:text-xs">
              Entrega Inicial
            </span>
            <span className="font-display text-sp-ivory text-base sm:text-lg">
              55–59 m² (2 pisos)
            </span>
          </div>

          <div className="flex items-center text-sp-sand px-2">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div className="flex flex-col items-end">
            <span className="text-sp-sand font-medium uppercase tracking-wider text-[0.65rem] sm:text-xs">
              Con 3.ᵉʳ Piso Ampliado
            </span>
            <span className="font-display text-sp-ivory text-base sm:text-lg">
              75–80 m² totales
            </span>
          </div>
        </div>

        {/* Caption */}
        <p className="ampliacion-item font-sans text-xs sm:text-sm text-white/70 font-light max-w-xl">
          Cada vivienda se entrega con los planos arquitectónicos y estructurales listos. La estructura queda calculada y prevista para que tu casa crezca con tu familia.
        </p>
      </div>
    </section>
  );
}
