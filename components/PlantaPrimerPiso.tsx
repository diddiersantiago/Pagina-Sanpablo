"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROYECTO_DATA } from "@/data/proyecto";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { prefersReducedMotion, EASING, DURATION } from "@/lib/animations";

// El lightbox solo se monta al hacer clic: fuera del bundle inicial.
const PlanLightbox = dynamic(() => import("./PlanLightbox"), { ssr: false });

export default function PlantaPrimerPiso() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const planContainerRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Panel steel clip-path reveal from left
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0.8 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: DURATION.text,
            ease: EASING.entrance,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // 2. Spaces list staggered fade + slide
      gsap.fromTo(
        ".espacio-primer-piso",
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          duration: DURATION.fast * 2,
          stagger: 0.07,
          ease: EASING.default,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      // 3. Plan render zoom in + subtle parallax
      if (planContainerRef.current) {
        gsap.fromTo(
          planContainerRef.current,
          { scale: 1.04, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: DURATION.media,
            ease: EASING.default,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );

        gsap.to(planContainerRef.current, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { primerPiso } = PROYECTO_DATA.planos;

  return (
    <>
      <section
        ref={sectionRef}
        id="primer-piso"
        aria-labelledby="titulo-primer-piso"
        className="relative w-full bg-sp-cream pt-8 pb-16 sm:pt-10 sm:pb-24 px-6 sm:px-8 lg:px-16 border-b border-sp-steel/15"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT 40%: Steel panel with metadata and spaces list */}
            <div
              ref={panelRef}
              className="lg:col-span-5 bg-sp-steel text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sp-sand via-sp-gold to-sp-sand" />

              <div>
                <h3
                  id="titulo-primer-piso"
                  className="font-display font-normal text-sp-ivory text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight mb-2"
                >
                  {primerPiso.titulo}
                </h3>
                <p className="font-display italic text-sp-ivory/90 text-sm sm:text-base mb-6 leading-lyric">
                  {primerPiso.subtitulo}
                </p>

                {/* Spaces List */}
                <div className="divide-y divide-white/15 my-6">
                  {primerPiso.espacios.map((espacio, idx) => (
                    <div
                      key={idx}
                      className="espacio-primer-piso group py-2.5 flex items-center justify-between font-sans text-xs sm:text-sm text-white/90 font-light hover:text-sp-ivory hover:bg-white/5 px-2 rounded transition-all cursor-default"
                    >
                      <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        <span className="text-sp-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          ✦
                        </span>
                        {espacio.nombre}
                      </span>
                      <span className="font-semibold text-sp-gold tabular-nums px-2 py-0.5 bg-sp-navy/40 rounded border border-sp-sand/20 group-hover:border-sp-gold/50 transition-colors">
                        {espacio.cantidad}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Figures */}
              <div className="pt-6 border-t border-white/20 mt-4">
                <p className="font-sans text-[0.7rem] uppercase tracking-wider text-sp-sand font-medium mb-3">
                  {primerPiso.notaArea}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sp-navy/50 p-3.5 border border-white/15 rounded-sm hover:border-sp-sand/40 transition-colors shadow-inner">
                    <span className="font-sans text-[0.65rem] uppercase tracking-wider text-sp-sand block font-medium">
                      Esquinera
                    </span>
                    <span className="font-display text-sp-ivory text-xl sm:text-2xl font-normal tabular-nums">
                      {primerPiso.cifras.esquinera}
                    </span>
                  </div>
                  <div className="bg-sp-navy/50 p-3.5 border border-white/15 rounded-sm hover:border-sp-sand/40 transition-colors shadow-inner">
                    <span className="font-sans text-[0.65rem] uppercase tracking-wider text-sp-sand block font-medium">
                      Medianera
                    </span>
                    <span className="font-display text-sp-ivory text-xl sm:text-2xl font-normal tabular-nums">
                      {primerPiso.cifras.medianera}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 60%: Plan Architectural Render */}
            <div
              ref={planContainerRef}
              className="sp-card-interactive lg:col-span-7 bg-sp-white p-4 sm:p-6 border border-sp-steel/20 shadow-md flex flex-col items-center group relative overflow-hidden"
            >
              <div className="relative w-full aspect-[4/3] max-h-[500px] overflow-hidden">
                <Image
                  src="/img/plano-primer-piso.jpg"
                  alt="Plano arquitectónico del primer piso, unidades pareadas de Urbanización San Pablo"
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Zoom CTA Button */}
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Ver plano de primer piso ampliado"
                  className="absolute bottom-3 right-3 flex items-center px-3.5 py-1.5 bg-sp-navy/95 hover:bg-sp-navy text-sp-sand hover:text-sp-ivory border border-sp-sand/30 hover:border-sp-gold text-xs font-sans tracking-kicker uppercase transition-all shadow-lg backdrop-blur-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
                >
                  <span>Ver ampliado</span>
                </button>
              </div>

              {/* Plan Caption */}
              <div className="w-full flex items-center justify-between pt-3 text-[0.7rem] font-sans text-sp-steel tracking-kicker uppercase border-t border-sp-steel/10 mt-2">
                <span>{primerPiso.pie}</span>
                <span className="text-sp-steel font-medium">Primer Nivel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <PlanLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc="/img/plano-primer-piso.jpg"
        imageAlt="Plano arquitectónico ampliado del primer piso de las casas VIS de Urbanización San Pablo en Soracá, Boyacá: 31,715 m² en la esquinera y 30,385 m² en la medianera, con garaje cubierto, sala, comedor, cocina y baño social."
        title="Plano Primer Piso · Unidades Pareadas"
        subtitle={primerPiso.subtitulo}
      />
    </>
  );
}
