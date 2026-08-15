"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PROYECTO_DATA } from "@/data/proyecto";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";
import PlanLightbox from "./PlanLightbox";
import { Store, Check, Maximize2 } from "lucide-react";

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
          duration: 0.45,
          stagger: 0.15,
          ease: "power2.out",
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
        { borderColor: "rgba(198, 183, 153, 0.2)" },
        {
          borderColor: "rgba(198, 183, 153, 1)",
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
              <div className="relative bg-sp-white rounded-lg p-3 sm:p-4 shadow-md border border-sp-steel/15 overflow-hidden group">
                <div className="relative w-full aspect-[4/3] max-h-[460px] overflow-hidden rounded">
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
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded bg-sp-navy/85 hover:bg-sp-navy text-sp-ivory text-xs font-sans tracking-wide transition-all shadow-md backdrop-blur-sm"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-sp-sand" />
                    <span>Ver ampliado</span>
                  </button>
                </div>
              </div>

              {/* Steel Bottom Banner */}
              <div className="mt-4 bg-sp-steel text-sp-ivory p-4 rounded-lg text-xs sm:text-sm font-sans font-light leading-relaxed border border-sp-steel-deep">
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

              {/* Availability Table */}
              <div className="tabla-locales bg-sp-white rounded-lg border border-sp-steel/15 shadow-sm overflow-hidden mb-8">
                <div className="bg-sp-steel text-sp-ivory px-4 py-2.5 font-sans text-xs uppercase tracking-wider font-medium flex justify-between">
                  <span>Unidad</span>
                  <span>Área</span>
                  <span>Estado</span>
                </div>

                <div className="divide-y divide-sp-steel/10">
                  {/* Local 1 - Disponible */}
                  <div className="disponible-highlight p-4 flex items-center justify-between bg-sp-sand/10 border-l-4 border-sp-sand transition-all">
                    <div>
                      <span className="font-display text-sp-navy text-base font-semibold block">
                        Local 1
                      </span>
                      <span className="font-sans text-xs text-sp-steel-ink font-light">
                        {localComercial.detalles.salonPrincipal} · {localComercial.detalles.accesos}
                      </span>
                    </div>
                    <span className="font-sans text-sm font-medium text-sp-navy tabular-nums">
                      70,40 m²
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-sp-navy text-sp-ivory font-sans text-xs font-medium uppercase tracking-wider shadow-sm">
                      <Check className="w-3 h-3 text-sp-sand" />
                      Disponible
                    </span>
                  </div>

                  {/* Local 2 - Vendido */}
                  <div className="p-4 flex items-center justify-between opacity-60 bg-sp-cream/40">
                    <div>
                      <span className="font-display text-sp-steel text-base line-through">
                        Local 2
                      </span>
                    </div>
                    <span className="font-sans text-sm text-sp-steel-mute tabular-nums">
                      50,70 m²
                    </span>
                    <span className="stamp-vendido inline-block px-2.5 py-0.5 rounded bg-sp-sold text-white font-sans text-[0.7rem] uppercase tracking-wider font-semibold transform -rotate-3 shadow-sm">
                      VENDIDO
                    </span>
                  </div>

                  {/* Local 3 - Vendido */}
                  <div className="p-4 flex items-center justify-between opacity-60 bg-sp-cream/40">
                    <div>
                      <span className="font-display text-sp-steel text-base line-through">
                        Local 3
                      </span>
                    </div>
                    <span className="font-sans text-sm text-sp-steel-mute tabular-nums">
                      21,50 m²
                    </span>
                    <span className="stamp-vendido inline-block px-2.5 py-0.5 rounded bg-sp-sold text-white font-sans text-[0.7rem] uppercase tracking-wider font-semibold transform -rotate-3 shadow-sm">
                      VENDIDO
                    </span>
                  </div>
                </div>
              </div>

              {/* Outstanding Figure Box */}
              <div className="p-5 rounded-lg bg-sp-navy text-sp-ivory flex items-center justify-between shadow-lg">
                <div>
                  <span className="font-sans text-[0.7rem] uppercase tracking-wider text-sp-sand block">
                    Área Total Disponible
                  </span>
                  <span className="font-display text-2xl sm:text-3xl text-sp-ivory font-normal tabular-nums">
                    {localComercial.detalles.areaTotal}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-sans text-[0.7rem] uppercase tracking-wider text-sp-sand block">
                    Valor · Local 1
                  </span>
                  <span className="font-display text-2xl sm:text-3xl text-sp-ivory font-normal tabular-nums">
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
        title="Locales Comerciales · Urbanización San Pablo"
        subtitle={localComercial.subtitulo}
      />
    </>
  );
}
