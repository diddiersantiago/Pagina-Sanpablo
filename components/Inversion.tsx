"use client";

import { useEffect, useRef, useState } from "react";
import { PROYECTO_DATA } from "@/data/proyecto";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  prefersReducedMotion,
  useCountUp,
  EASING,
  DURATION,
} from "@/lib/animations";
import { MessageCircle } from "lucide-react";

const { inversion } = PROYECTO_DATA;
const PRECIOS_FINALES = inversion.tarjetas.map((t) => t.precioMillones);

export default function Inversion() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaBandRef = useRef<HTMLDivElement>(null);

  // El estado arranca con el valor final: el HTML del servidor emite $170 /
  // $147 / $217 y no "$0" (Googlebot ejecuta JS pero no hace scroll). Además
  // el ancho del número no cambia al animar, así que no hay CLS.
  const [precios, setPrecios] = useState<number[]>(PRECIOS_FINALES);

  useCountUp(
    gridRef,
    PRECIOS_FINALES,
    (values) => setPrecios(values.map((v) => Math.round(v))),
    { start: "top 80%" }
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrada de las tarjetas de precio
      gsap.fromTo(
        ".tarjeta-inversion",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.text,
          stagger: 0.12,
          ease: EASING.default,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Banda CTA
      if (ctaBandRef.current) {
        gsap.fromTo(
          ctaBandRef.current,
          { opacity: 0, scaleY: 0.95, y: 20 },
          {
            opacity: 1,
            scaleY: 1,
            y: 0,
            duration: 1.0,
            ease: EASING.default,
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

  const piesTarjeta = [
    "Aplica a subsidios VIS",
    "Precio más accesible",
    "Última unidad comercial",
  ];

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
        <div
          ref={gridRef}
          className="grid-tarjetas-inversion grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12"
        >
          {inversion.tarjetas.map((tarjeta, idx) => (
            <div
              key={tarjeta.tipo}
              className="sp-card-dark-interactive relative bg-gradient-to-b from-sp-navy-soft to-sp-navy-deep p-6 sm:p-8 border border-white/15 hover:border-sp-gold/60 shadow-xl flex flex-col justify-between overflow-hidden group"
            >
              <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sp-sand via-sp-gold to-sp-sand" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-xs uppercase tracking-wider text-sp-sand font-medium">
                    {tarjeta.titulo}
                  </span>
                  {tarjeta.tipo === "esquinera" && (
                    <span className="text-[0.65rem] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 bg-sp-gold/20 text-sp-gold border border-sp-gold/40">
                      Destacada
                    </span>
                  )}
                </div>
                <div className="mb-4 flex items-baseline">
                  {/* min-w reserva el ancho: el conteo no desplaza "millones" */}
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-sp-ivory font-normal tabular-nums inline-block min-w-[4ch] group-hover:text-sp-gold transition-colors">
                    ${precios[idx]}
                  </span>
                  <span className="font-display text-sp-sand text-xl sm:text-2xl ml-1 font-normal">
                    millones
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-white/90 font-light leading-relaxed">
                  {tarjeta.detalle}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="font-sans text-[0.68rem] uppercase tracking-wider text-sp-sand font-medium">
                  {piesTarjeta[idx]}
                </span>
                <a
                  href={PROYECTO_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-sans text-xs uppercase tracking-wider text-sp-ivory hover:text-sp-gold border-b border-sp-sand/50 hover:border-sp-gold transition-colors pb-0.5 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand font-medium"
                >
                  <span>Consultar</span>
                  <span className="text-sp-gold">→</span>
                  <span className="sr-only"> por {tarjeta.titulo} por WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Two Legal/Operational Notes with Square Sand Bullets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {inversion.notas.map((nota, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-sp-navy-soft/60 border border-white/10 rounded-sm"
            >
              <span
                className="mt-1.5 h-2 w-2 shrink-0 bg-sp-gold rotate-45"
                aria-hidden="true"
              />
              <p className="font-sans text-xs text-white/90 font-light leading-relaxed">
                {nota}
              </p>
            </div>
          ))}
        </div>

        {/* Full-width CTA Band (Background --sp-sand to gold gradient) */}
        <div
          ref={ctaBandRef}
          className="relative w-full bg-gradient-to-r from-sp-sand via-sp-gold to-sp-sand text-sp-navy p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl overflow-hidden border border-sp-gold/40"
        >
          <div className="flex flex-col text-center md:text-left">
            <span className="font-sans text-[0.7rem] uppercase tracking-kicker font-bold text-sp-navy/90 mb-1">
              {inversion.cta.kicker}
            </span>
            <p className="font-display italic text-lg sm:text-xl lg:text-2xl text-sp-navy font-semibold leading-snug">
              {inversion.cta.texto}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a
              href={PROYECTO_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-sp-navy text-sp-ivory hover:bg-sp-navy-deep font-sans text-base sm:text-lg tracking-wider uppercase font-semibold transition-all duration-300 group shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-navy min-h-[48px]"
              aria-label={`Escribir por WhatsApp al ${PROYECTO_DATA.telefonoInternacional}`}
            >
              <MessageCircle className="w-6 h-6 text-sp-gold group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-sp-gold transition-colors font-medium">
                {inversion.cta.telefono}
              </span>
            </a>

            {/* En móvil, llamar de un toque */}
            <a
              href={PROYECTO_DATA.telefonoHref}
              className="inline-flex items-center justify-center px-6 py-4 border-2 border-sp-navy text-sp-navy hover:bg-sp-navy hover:text-sp-ivory font-sans text-sm tracking-wider uppercase font-semibold transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-navy min-h-[48px]"
            >
              Llamar
              <span className="sr-only"> al {PROYECTO_DATA.telefonoInternacional}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
