"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PROYECTO_DATA } from "@/data/proyecto";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASING, DURATION } from "@/lib/animations";

// El lightbox solo se monta al hacer clic: fuera del bundle inicial.
const PlanLightbox = dynamic(() => import("./PlanLightbox"), { ssr: false });

export default function LocalComercial() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Stamped animation for VENDIDO tags
      gsap.fromTo(
        ".stamp-vendido",
        { scale: 1.15, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: DURATION.stamp,
          stagger: 0.15,
          ease: EASING.smooth,
          scrollTrigger: {
            trigger: ".tabla-locales",
            start: "top 80%",
            once: true,
          },
        }
      );

      // 2. Pulse for available Local 1
      gsap.fromTo(
        ".disponible-highlight",
        { borderLeftColor: "rgba(198, 183, 153, 0.2)" },
        {
          borderLeftColor: "rgba(198, 183, 153, 1)",
          duration: 0.8,
          repeat: 1,
          yoyo: true,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: ".tabla-locales",
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { localComercial } = PROYECTO_DATA;

  return (
    <>
      <section
        ref={sectionRef}
        id="local"
        aria-labelledby="titulo-local-comercial"
        className="relative w-full bg-sp-cream py-20 sm:py-28 px-6 sm:px-8 lg:px-16 border-b border-sp-steel/15 text-sp-steel-ink"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT: Render of Commercial units + Steel bottom banner */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="relative bg-sp-white p-3 sm:p-4 border border-sp-steel/15 overflow-hidden group">
                <div className="relative w-full aspect-[4/3] max-h-[460px] overflow-hidden">
                  <Image
                    src="/img/render-locales.jpg"
                    alt="Render axonométrico de los 3 locales comerciales de Urbanización San Pablo"
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Zoom button */}
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    aria-label="Ver axonometría comercial ampliada"
                    className="absolute bottom-3 right-3 flex items-center px-3 py-1.5 bg-sp-navy/90 hover:bg-sp-navy text-sp-ivory text-xs font-sans tracking-kicker uppercase transition-colors backdrop-blur-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
                  >
                    <span>Ver ampliado</span>
                  </button>
                </div>
              </div>

              {/* Steel Bottom Banner */}
              <div className="mt-4 bg-sp-steel text-sp-ivory p-4 text-xs sm:text-sm font-sans font-light leading-relaxed border border-sp-navy/30">
                <strong className="font-medium text-sp-sand">
                  2 de 3 locales ya vendidos.
                </strong>{" "}
                El comercio del proyecto se está asegurando ahora — queda solo el de mayor área.
              </div>
            </div>

            {/* RIGHT: Content, Table of Units, Pricing */}
            <div className="lg:col-span-6 flex flex-col">
              <span className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-steel font-normal mb-2">
                {localComercial.kicker}
              </span>
              <h2
                id="titulo-local-comercial"
                className="font-display font-normal text-sp-navy text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.02] tracking-tighter uppercase mb-2"
              >
                {localComercial.titulo}
              </h2>
              <p className="font-display italic text-sp-steel text-[clamp(1.05rem,1.5vw,1.35rem)] leading-lyric mb-6">
                {localComercial.subtitulo}
              </p>

              <p className="font-sans font-light text-sp-steel-ink text-[1.02rem] leading-[1.75] mb-8 max-w-prose">
                {localComercial.descripcion}
              </p>

              {/*
                Tabla real: los encabezados eran <span> dentro de <div>, así que
                la información comercial más accionable del sitio no era parseable.
              */}
              <div className="tabla-locales bg-sp-white border border-sp-steel/15 overflow-hidden mb-8">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    Disponibilidad de los locales comerciales de Urbanización San
                    Pablo en Soracá, Boyacá: unidad, área en metros cuadrados y
                    estado de venta.
                  </caption>
                  <thead>
                    <tr className="bg-sp-steel text-sp-ivory font-sans text-xs uppercase tracking-wider font-medium">
                      <th scope="col" className="px-4 py-2.5 font-medium">
                        Unidad
                      </th>
                      <th scope="col" className="px-4 py-2.5 font-medium text-right">
                        Área
                      </th>
                      <th scope="col" className="px-4 py-2.5 font-medium text-right">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sp-steel/10">
                    {localComercial.locales.map((local) => {
                      const disponible = local.estado === "Disponible";
                      return (
                        <tr
                          key={local.unidad}
                          className={
                            disponible
                              ? "disponible-highlight bg-sp-sand/20 border-l-4 border-l-sp-gold transition-colors"
                              : "bg-sp-cream/40 opacity-75"
                          }
                        >
                          <th scope="row" className="px-4 py-4 text-left align-middle">
                            <span
                              className={
                                disponible
                                  ? "font-display text-sp-navy text-base font-semibold block flex items-center gap-2"
                                  : "font-display text-sp-steel text-base line-through block"
                              }
                            >
                              {disponible && (
                                <span className="w-2 h-2 rounded-full bg-sp-gold animate-glow-pulse" />
                              )}
                              {local.unidad}
                            </span>
                            {disponible && (
                              <span className="font-sans text-xs text-sp-steel-ink font-normal block mt-0.5">
                                {localComercial.detalles.salonPrincipal} ·{" "}
                                {localComercial.detalles.accesos}
                              </span>
                            )}
                          </th>
                          <td
                            className={`px-4 py-4 text-right align-middle font-sans text-sm tabular-nums ${
                              disponible
                                ? "font-semibold text-sp-navy text-base"
                                : "text-sp-steel"
                            }`}
                          >
                            {local.area}
                          </td>
                          <td className="px-4 py-4 text-right align-middle">
                            {disponible ? (
                              <span className="inline-block px-3 py-1.5 bg-sp-navy text-sp-ivory font-sans text-xs font-semibold uppercase tracking-wider shadow-sm border border-sp-gold/40">
                                Disponible
                              </span>
                            ) : (
                              <span className="stamp-vendido inline-block px-2.5 py-0.5 bg-sp-sold text-white font-sans text-[0.7rem] uppercase tracking-wider font-bold -rotate-3 border border-white/30 shadow-sm">
                                VENDIDO
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Outstanding Figure Box */}
              <div className="p-6 bg-sp-navy text-sp-ivory flex items-center justify-between shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sp-sand via-sp-gold to-sp-sand" />
                <div>
                  <span className="font-sans text-[0.7rem] uppercase tracking-wider text-sp-sand font-medium block mb-0.5">
                    Área Total Disponible
                  </span>
                  <span className="font-display text-2xl sm:text-3xl text-sp-ivory font-normal tabular-nums">
                    {localComercial.detalles.areaTotal}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-sans text-[0.7rem] uppercase tracking-wider text-sp-sand font-medium block mb-0.5">
                    Valor · Local 1
                  </span>
                  <span className="font-display text-2xl sm:text-3xl text-sp-gold font-normal tabular-nums">
                    {localComercial.detalles.valor}
                  </span>
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
        imageSrc="/img/render-locales.jpg"
        imageAlt="Axonometría ampliada de los tres locales comerciales de Urbanización San Pablo sobre la vía principal en Soracá, Boyacá: Local 1 de 70,40 m² disponible, Local 2 de 50,70 m² y Local 3 de 21,50 m², ambos vendidos."
        title="Locales Comerciales · Urbanización San Pablo"
        subtitle={localComercial.subtitulo}
      />
    </>
  );
}
