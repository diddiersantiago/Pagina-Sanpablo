"use client";

import { useEffect, useRef, useState } from "react";
import { PROYECTO_DATA } from "@/data/proyecto";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";
import { MessageCircle, Square, ArrowUpRight } from "lucide-react";

export default function Inversion() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaBandRef = useRef<HTMLDivElement>(null);

  // Animated counters for prices
  const [precioEsquinera, setPrecioEsquinera] = useState(0);
  const [precioMedianera, setPrecioMedianera] = useState(0);
  const [precioLocal, setPrecioLocal] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPrecioEsquinera(170);
      setPrecioMedianera(147);
      setPrecioLocal(217);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Price cards entrance
      gsap.fromTo(
        ".tarjeta-inversion",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".grid-tarjetas-inversion",
            start: "top 80%",
            once: true,
          },
        }
      );

      // 2. Counter animation for the 3 prices
      const priceObj = { p1: 0, p2: 0, p3: 0 };
      ScrollTrigger.create({
        trigger: ".grid-tarjetas-inversion",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(priceObj, {
            p1: 170,
            p2: 147,
            p3: 217,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              setPrecioEsquinera(Math.round(priceObj.p1));
              setPrecioMedianera(Math.round(priceObj.p2));
              setPrecioLocal(Math.round(priceObj.p3));
            },
          });
        },
      });

      // 3. CTA Band entrance
      if (ctaBandRef.current) {
        gsap.fromTo(
          ctaBandRef.current,
          { opacity: 0, scaleY: 0.95, y: 20 },
          {
            opacity: 1,
            scaleY: 1,
            y: 0,
            duration: 1.0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ctaBandRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { inversion } = PROYECTO_DATA;

  return (
    <section
      ref={sectionRef}
      id="inversion"
      aria-labelledby="titulo-inversion"
      className="relative w-full bg-sp-navy py-20 sm:py-28 px-6 sm:px-8 lg:px-16 text-sp-ivory border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-sand font-normal block mb-2">
              {inversion.kicker}
            </span>
            <h2
              id="titulo-inversion"
              className="font-display font-normal text-sp-ivory text-[clamp(2.1rem,4.5vw,3.8rem)] leading-[1.02] tracking-tighter uppercase"
            >
              {inversion.titulo}
            </h2>
          </div>
          <p className="font-display italic text-sp-sand text-sm sm:text-base lg:text-right max-w-md">
            {inversion.bajada}
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid-tarjetas-inversion grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Card 1: Casa Esquinera */}
          <div className="tarjeta-inversion relative bg-sp-navy-soft rounded-lg p-6 sm:p-8 border border-white/10 flex flex-col justify-between overflow-hidden shadow-xl">
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-sp-sand" />
            <div>
              <span className="font-sans text-xs uppercase tracking-wider text-sp-sand font-medium block mb-3">
                {inversion.tarjetas[0].titulo}
              </span>
              <div className="mb-4">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-sp-ivory font-normal tabular-nums">
                  ${precioEsquinera}
                </span>
                <span className="font-display text-sp-sand text-xl sm:text-2xl ml-1 font-normal">
                  millones
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                {inversion.tarjetas[0].detalle}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="font-sans text-[0.68rem] uppercase tracking-wider text-sp-sand">
                Aplica a subsidios VIS
              </span>
              <a
                href={PROYECTO_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sp-ivory hover:text-sp-sand transition-colors p-1"
                aria-label="Consultar por Casa Esquinera"
              >
                <ArrowUpRight className="w-5 h-5 text-sp-sand" />
              </a>
            </div>
          </div>

          {/* Card 2: Casa Medianera */}
          <div className="tarjeta-inversion relative bg-sp-navy-soft rounded-lg p-6 sm:p-8 border border-white/10 flex flex-col justify-between overflow-hidden shadow-xl">
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-sp-sand" />
            <div>
              <span className="font-sans text-xs uppercase tracking-wider text-sp-sand font-medium block mb-3">
                {inversion.tarjetas[1].titulo}
              </span>
              <div className="mb-4">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-sp-ivory font-normal tabular-nums">
                  ${precioMedianera}
                </span>
                <span className="font-display text-sp-sand text-xl sm:text-2xl ml-1 font-normal">
                  millones
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                {inversion.tarjetas[1].detalle}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="font-sans text-[0.68rem] uppercase tracking-wider text-sp-sand">
                Precio más accesible
              </span>
              <a
                href={PROYECTO_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sp-ivory hover:text-sp-sand transition-colors p-1"
                aria-label="Consultar por Casa Medianera"
              >
                <ArrowUpRight className="w-5 h-5 text-sp-sand" />
              </a>
            </div>
          </div>

          {/* Card 3: Local Comercial */}
          <div className="tarjeta-inversion relative bg-sp-navy-soft rounded-lg p-6 sm:p-8 border border-white/10 flex flex-col justify-between overflow-hidden shadow-xl">
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-sp-sand" />
            <div>
              <span className="font-sans text-xs uppercase tracking-wider text-sp-sand font-medium block mb-3">
                {inversion.tarjetas[2].titulo}
              </span>
              <div className="mb-4">
                <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-sp-ivory font-normal tabular-nums">
                  ${precioLocal}
                </span>
                <span className="font-display text-sp-sand text-xl sm:text-2xl ml-1 font-normal">
                  millones
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                {inversion.tarjetas[2].detalle}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="font-sans text-[0.68rem] uppercase tracking-wider text-sp-sand">
                Última unidad comercial
              </span>
              <a
                href={PROYECTO_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sp-ivory hover:text-sp-sand transition-colors p-1"
                aria-label="Consultar por Local Comercial"
              >
                <ArrowUpRight className="w-5 h-5 text-sp-sand" />
              </a>
            </div>
          </div>
        </div>

        {/* Two Legal/Operational Notes with Square Sand Bullets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {inversion.notas.map((nota, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded bg-sp-navy-soft/60 border border-white/5"
            >
              <Square className="w-3.5 h-3.5 text-sp-sand fill-sp-sand mt-1 flex-shrink-0" />
              <p className="font-sans text-xs text-white/80 font-light leading-relaxed">
                {nota}
              </p>
            </div>
          ))}
        </div>

        {/* Full-width CTA Band (Background --sp-sand) */}
        <div
          ref={ctaBandRef}
          className="relative w-full bg-sp-sand text-sp-navy rounded-lg p-6 sm:p-8 lg:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col text-center md:text-left">
            <span className="font-sans text-[0.7rem] uppercase tracking-kicker font-bold text-sp-navy/90 mb-1">
              {inversion.cta.kicker}
            </span>
            <p className="font-display italic text-lg sm:text-xl lg:text-2xl text-sp-navy font-medium leading-snug">
              {inversion.cta.texto}
            </p>
          </div>

          <a
            href={PROYECTO_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-4 rounded-md bg-sp-navy text-sp-ivory hover:bg-sp-navy-deep font-sans text-base sm:text-lg tracking-wider uppercase font-semibold transition-all duration-300 shadow-md hover:-translate-y-0.5 group focus:outline-none min-h-[48px]"
            aria-label="Escribir por WhatsApp al 324 358 2526"
          >
            <MessageCircle className="w-6 h-6 text-sp-sand group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-sp-sand transition-colors font-medium">
              {inversion.cta.telefono}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
