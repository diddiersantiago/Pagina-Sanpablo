"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PROYECTO_DATA } from "@/data/proyecto";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASING } from "@/lib/animations";

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
            ease: EASING.linear,
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
            ease: EASING.default,
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
          ease: EASING.default,
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
        {/*
          Sin `priority`: está bajo el pliegue y precargarla (~423 kB) competía
          con el LCP real del hero. `quality` 75 basta para un fondo cubierto
          por un degradado.
        */}
        <Image
          src="/img/render-fachadas.jpg"
          alt="Render de las fachadas en ladrillo a la vista de Urbanización San Pablo, Soracá"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={75}
        />
        {/*
          Degradado de legibilidad. Ahora que las clases con alfa sí generan
          CSS, no hace falta oscurecer todo el render: el titular vive sobre su
          propio panel opaco y la fachada vuelve a verse.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-sp-navy-deep/95 via-sp-navy/55 to-transparent" />
      </div>

      {/* Content over image */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
        {/* Left: Titles & Lyric copy with Glassmorphism Backdrop Blur for maximum contrast */}
        <div
          ref={textRef}
          className="lg:col-span-7 flex flex-col bg-sp-navy-deep/90 sm:bg-sp-navy-deep/85 backdrop-blur-md border border-white/15 p-6 sm:p-8 lg:p-10 relative overflow-hidden"
        >
          {/* Subtle left sand accent line */}
          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-sp-sand" />

          <span className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-sand font-medium mb-2">
            {PROYECTO_DATA.arquitectura.kicker}
          </span>
          <h2
            id="titulo-arquitectura"
            className="font-display font-normal text-sp-ivory text-[clamp(2.2rem,4.2vw,3.8rem)] leading-[1.02] tracking-tighter uppercase mb-4"
          >
            {PROYECTO_DATA.arquitectura.titulo}
          </h2>
          <p className="font-display italic text-sp-ivory text-[clamp(1.05rem,1.5vw,1.35rem)] leading-lyric max-w-2xl">
            {PROYECTO_DATA.arquitectura.bajada}
          </p>
        </div>

        {/* Right: 3 Micro-Fichas — filete de 1px en lugar de icono, como el PDF */}
        <div className="micro-fichas-container lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5">
          {PROYECTO_DATA.arquitectura.fichas.map((ficha) => (
            <div
              key={ficha.titulo}
              className="micro-ficha-glass flex-1 bg-sp-navy-deep/85 backdrop-blur-md border border-white/15 p-4 sm:p-5 transition-colors duration-300 hover:bg-sp-navy-deep/95 hover:border-sp-sand/40"
            >
              <div className="flex items-start gap-3.5">
                <span
                  className="h-[1px] w-6 shrink-0 bg-sp-sand mt-2.5"
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span className="font-display text-base uppercase tracking-tight text-sp-ivory font-normal">
                    {ficha.titulo}
                  </span>
                  <span className="font-sans text-xs text-white/90 font-light mt-0.5">
                    {ficha.detalle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
