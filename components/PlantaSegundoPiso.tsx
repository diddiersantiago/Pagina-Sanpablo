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

export default function PlantaSegundoPiso() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const planContainerRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Panel steel clip-path reveal from right
      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { clipPath: "inset(0 0 0 100%)", opacity: 0.8 },
          {
            clipPath: "inset(0 0 0 0%)",
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
        ".espacio-segundo-piso",
        { opacity: 0, x: 12 },
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

  const { segundoPiso, ampliacion } = PROYECTO_DATA.planos;

  return (
    <>
      <section
        ref={sectionRef}
        id="segundo-piso"
        aria-labelledby="titulo-segundo-piso"
        className="relative w-full bg-sp-cream py-16 sm:py-24 px-6 sm:px-8 lg:px-16 border-b border-sp-steel/15"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT 60% (Inverted): Plan Architectural Render */}
            <div
              ref={planContainerRef}
              className="sp-card-interactive order-2 lg:order-1 lg:col-span-7 bg-sp-white p-4 sm:p-6 border border-sp-steel/20 shadow-md flex flex-col items-center group relative overflow-hidden"
            >
              <div className="relative w-full aspect-square max-h-[500px] overflow-hidden">
                <Image
                  src="/img/plano-segundo-piso.jpg"
                  alt="Plano arquitectónico del segundo piso, zona privada de Urbanización San Pablo"
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />

                {/* Zoom CTA Button */}
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Ver plano de segundo piso ampliado"
                  className="absolute bottom-3 right-3 flex items-center px-3.5 py-1.5 bg-sp-navy/95 hover:bg-sp-navy text-sp-sand hover:text-sp-ivory border border-sp-sand/30 hover:border-sp-gold text-xs font-sans tracking-kicker uppercase transition-all shadow-lg backdrop-blur-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
                >
                  <span>Ver ampliado</span>
                </button>
              </div>

              {/* Plan Caption */}
              <div className="w-full flex items-center justify-between pt-3 text-[0.7rem] font-sans text-sp-steel tracking-kicker uppercase border-t border-sp-steel/10 mt-2">
                <span>{segundoPiso.pie}</span>
                <span className="text-sp-steel font-medium">Segundo Nivel</span>
              </div>
            </div>

            {/* RIGHT 40% (Inverted): Steel panel with metadata and spaces list */}
            <div
              ref={panelRef}
              className="order-1 lg:order-2 lg:col-span-5 bg-sp-steel text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sp-sand via-sp-gold to-sp-sand" />

              <div>
                <h3
                  id="titulo-segundo-piso"
                  className="font-display font-normal text-sp-ivory text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight mb-2"
                >
                  {segundoPiso.titulo}
                </h3>
                <p className="font-display italic text-sp-ivory/90 text-sm sm:text-base mb-6 leading-lyric">
                  {segundoPiso.subtitulo}
                </p>

                {/* Spaces List */}
                <div className="divide-y divide-white/15 my-6">
                  {segundoPiso.espacios.map((espacio, idx) => (
                    <div
                      key={idx}
                      className="espacio-segundo-piso group py-2.5 flex items-center justify-between font-sans text-xs sm:text-sm text-white/90 font-light hover:text-sp-ivory hover:bg-white/5 px-2 rounded transition-all cursor-default"
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

              {/* Figures Segundo Piso */}
              <div className="pt-4 border-t border-white/20">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-sp-navy/50 p-3.5 border border-white/15 rounded-sm hover:border-sp-sand/40 transition-colors shadow-inner">
                    <span className="font-sans text-[0.65rem] uppercase tracking-wider text-sp-sand block font-medium">
                      Esquinera
                    </span>
                    <span className="font-display text-sp-ivory text-xl sm:text-2xl font-normal tabular-nums">
                      {segundoPiso.cifras.esquinera}
                    </span>
                  </div>
                  <div className="bg-sp-navy/50 p-3.5 border border-white/15 rounded-sm hover:border-sp-sand/40 transition-colors shadow-inner">
                    <span className="font-sans text-[0.65rem] uppercase tracking-wider text-sp-sand block font-medium">
                      Medianera
                    </span>
                    <span className="font-display text-sp-ivory text-xl sm:text-2xl font-normal tabular-nums">
                      {segundoPiso.cifras.medianera}
                    </span>
                  </div>
                </div>

                {/* Ampliación Tercer Piso Highlight Box with Sand Border */}
                <div className="relative bg-sp-navy-deep/80 border border-sp-sand/70 p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sp-gold animate-glow-pulse" />
                    <span className="font-sans text-[0.7rem] uppercase tracking-wider text-sp-gold font-semibold">
                      {ampliacion.kicker}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-white/95 font-light leading-relaxed">
                    {ampliacion.destacado}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <PlanLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc="/img/plano-segundo-piso.jpg"
        imageAlt="Plano arquitectónico ampliado del segundo piso de las casas VIS de Urbanización San Pablo en Soracá, Boyacá: 27,61 m² en la esquinera y 25,49 m² en la medianera, con alcoba principal, alcoba auxiliar, dos baños completos y terraza descubierta."
        title="Plano Segundo Piso · Zona Privada"
        subtitle={segundoPiso.subtitulo}
      />
    </>
  );
}
