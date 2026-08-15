"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PROYECTO_DATA } from "@/data/proyecto";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";
import { Sparkles, Car, Trees } from "lucide-react";

export default function Arquitectura() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Ken Burns Subtle Zoom Out with Scrub
      if (imageRef.current && sectionRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // 2. Headings entrance
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      // 3. Glass micro-cards staggered entrance
      gsap.fromTo(
        ".micro-ficha-glass",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".micro-fichas-container",
            start: "top 85%",
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
      id="arquitectura"
      aria-labelledby="titulo-arquitectura"
      className="relative w-full min-h-[90vh] lg:min-h-screen bg-sp-navy overflow-hidden flex flex-col justify-end py-16 sm:py-24 px-6 sm:px-8 lg:px-16"
    >
      {/* Full-bleed background image container with Ken Burns effect */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
      >
        <Image
          src="/img/render-fachadas.jpg"
          alt="Render de las fachadas en ladrillo a la vista de Urbanización San Pablo, Soracá"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
          priority
        />
        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-sp-navy-deep/95 via-sp-navy/55 to-transparent" />
      </div>

      {/* Content over image */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
        {/* Left: Titles & Lyric copy */}
        <div ref={textRef} className="lg:col-span-7 flex flex-col">
          <span className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-sand font-normal mb-2">
            {PROYECTO_DATA.arquitectura.kicker}
          </span>
          <h2
            id="titulo-arquitectura"
            className="font-display font-normal text-sp-ivory text-[clamp(2.4rem,4.8vw,4.2rem)] leading-[1.02] tracking-tighter uppercase mb-4"
          >
            {PROYECTO_DATA.arquitectura.titulo}
          </h2>
          <p className="font-display italic text-white/90 text-[clamp(1.1rem,1.6vw,1.45rem)] leading-lyric max-w-2xl">
            {PROYECTO_DATA.arquitectura.bajada}
          </p>
        </div>

        {/* Right: 3 Glassmorphism Micro-Fichas */}
        <div className="micro-fichas-container lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5">
          {/* Card 1: Balcones */}
          <div className="micro-ficha-glass flex-1 bg-sp-navy/40 backdrop-blur-md border border-white/20 rounded-lg p-4 sm:p-4.5 transition-all duration-300 hover:bg-sp-navy/60 hover:border-white/35">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-sp-sand/15 text-sp-sand flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-sp-ivory">
                  {PROYECTO_DATA.arquitectura.fichas[0].titulo}
                </span>
                <span className="font-sans text-xs text-white/80 font-light mt-0.5">
                  {PROYECTO_DATA.arquitectura.fichas[0].detalle}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Garaje */}
          <div className="micro-ficha-glass flex-1 bg-sp-navy/40 backdrop-blur-md border border-white/20 rounded-lg p-4 sm:p-4.5 transition-all duration-300 hover:bg-sp-navy/60 hover:border-white/35">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-sp-sand/15 text-sp-sand flex-shrink-0">
                <Car className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-sp-ivory">
                  {PROYECTO_DATA.arquitectura.fichas[1].titulo}
                </span>
                <span className="font-sans text-xs text-white/80 font-light mt-0.5">
                  {PROYECTO_DATA.arquitectura.fichas[1].detalle}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Andenes */}
          <div className="micro-ficha-glass flex-1 bg-sp-navy/40 backdrop-blur-md border border-white/20 rounded-lg p-4 sm:p-4.5 transition-all duration-300 hover:bg-sp-navy/60 hover:border-white/35">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-sp-sand/15 text-sp-sand flex-shrink-0">
                <Trees className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-sp-ivory">
                  {PROYECTO_DATA.arquitectura.fichas[2].titulo}
                </span>
                <span className="font-sans text-xs text-white/80 font-light mt-0.5">
                  {PROYECTO_DATA.arquitectura.fichas[2].detalle}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
