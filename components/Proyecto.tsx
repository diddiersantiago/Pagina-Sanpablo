"use client";

import { useEffect, useRef, useState } from "react";
import { PROYECTO_DATA } from "@/data/proyecto";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";
import { Home, Layers, CheckCircle2 } from "lucide-react";

export default function Proyecto() {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerLineRef = useRef<HTMLDivElement>(null);
  const visPanelRef = useRef<HTMLDivElement>(null);

  // Counter states for animated numbers
  const [totalEsquinera, setTotalEsquinera] = useState("0,00");
  const [totalMedianera, setTotalMedianera] = useState("0,00");
  const [totalLocal, setTotalLocal] = useState("0,00");

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTotalEsquinera("79,92");
      setTotalMedianera("75,57");
      setTotalLocal("70,40");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Kicker line expansion
      if (kickerLineRef.current) {
        gsap.fromTo(
          kickerLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 2. Headings and column entrance
      gsap.fromTo(
        ".proyecto-col-left",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".proyecto-col-right",
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // 3. VIS Panel reveal with clip-path
      if (visPanelRef.current) {
        gsap.fromTo(
          visPanelRef.current,
          { clipPath: "inset(100% 0 0 0)", opacity: 0.5 },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visPanelRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 4. Number Counters for Table
      const counterObj = { v1: 0, v2: 0, v3: 0 };
      ScrollTrigger.create({
        trigger: ".tabla-areas-container",
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(counterObj, {
            v1: 79.92,
            v2: 75.57,
            v3: 70.4,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              setTotalEsquinera(counterObj.v1.toFixed(2).replace(".", ","));
              setTotalMedianera(counterObj.v2.toFixed(2).replace(".", ","));
              setTotalLocal(counterObj.v3.toFixed(2).replace(".", ","));
            },
          });
        },
      });

      // 5. White cards top border scale
      gsap.fromTo(
        ".tarjeta-top-border",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".tarjetas-tipologia",
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
      id="proyecto"
      aria-labelledby="titulo-proyecto"
      className="relative w-full bg-sp-cream py-20 sm:py-28 px-6 sm:px-8 lg:px-16 text-sp-steel-ink border-b border-sp-steel/15"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Section Title, Subtitle, Text, VIS Box */}
          <div className="proyecto-col-left lg:col-span-6 flex flex-col">
            {/* Kicker with expanding underline */}
            <div className="inline-flex flex-col mb-4">
              <span className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-steel font-normal">
                {PROYECTO_DATA.proyecto.kicker}
              </span>
              <div
                ref={kickerLineRef}
                className="w-16 h-[1px] bg-sp-steel/30 mt-1 origin-left"
              />
            </div>

            {/* Main Section Title */}
            <h2
              id="titulo-proyecto"
              className="font-display font-normal text-sp-navy text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.02] tracking-tighter uppercase mb-3"
            >
              {PROYECTO_DATA.proyecto.titulo}
            </h2>

            {/* Lyric Subtitle */}
            <p className="font-display italic text-sp-steel text-[clamp(1.1rem,1.5vw,1.4rem)] leading-lyric mb-6">
              {PROYECTO_DATA.proyecto.subtitulo}
            </p>

            {/* Body Description */}
            <p className="font-sans font-light text-sp-steel-ink text-[1.05rem] leading-[1.75] max-w-prose mb-10">
              {PROYECTO_DATA.proyecto.descripcion}
            </p>

            {/* VIS Informational Box (Steel background panel) */}
            <div
              ref={visPanelRef}
              className="relative bg-sp-steel text-white rounded-lg p-6 sm:p-8 shadow-xl overflow-hidden"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-sp-sand" />

              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-sp-sand flex-shrink-0" />
                <h3 className="font-display text-sp-ivory text-lg sm:text-xl font-normal uppercase tracking-tight">
                  {PROYECTO_DATA.vis.titulo}
                </h3>
              </div>

              {/* 2x2 Grid for 4 VIS Key Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-6">
                {PROYECTO_DATA.vis.puntos.map((p, idx) => (
                  <div key={idx} className="flex flex-col">
                    <p className="font-sans text-sp-ivory text-sm font-medium tracking-wide mb-1">
                      {p.titulo}
                    </p>
                    <p className="font-sans text-xs text-white/80 font-light leading-relaxed">
                      {p.texto}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footnote on Subsidies */}
              <div className="pt-4 border-t border-white/15">
                <p className="font-sans text-[0.75rem] text-sp-ivory/90 font-light italic leading-normal">
                  {PROYECTO_DATA.vis.nota}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Areas Table + Typology Highlight Cards */}
          <div className="proyecto-col-right lg:col-span-6 flex flex-col">
            <div className="inline-flex flex-col mb-4">
              <span className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-steel font-normal">
                {PROYECTO_DATA.areas.kicker}
              </span>
              <div className="w-16 h-[1px] bg-sp-steel/30 mt-1" />
            </div>

            {/* Desktop Table View */}
            <div className="tabla-areas-container hidden sm:block bg-sp-white rounded-lg shadow-md border border-sp-steel/15 overflow-hidden mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-sp-steel text-sp-ivory font-sans text-[0.75rem] uppercase tracking-[0.12em] font-medium border-b border-sp-steel-deep">
                    <th className="py-3.5 px-4 font-medium">Tipología</th>
                    <th className="py-3.5 px-3 text-right font-medium">1° Piso</th>
                    <th className="py-3.5 px-3 text-right font-medium">2° Piso</th>
                    <th className="py-3.5 px-3 text-right font-medium">3° Piso*</th>
                    <th className="py-3.5 px-4 text-right font-medium text-sp-sand">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sp-steel/10 font-sans text-sm text-sp-steel-ink">
                  {/* Row 1: Casa Esquinera */}
                  <tr className="transition-colors hover:bg-sp-steel/[0.06] group">
                    <td className="py-4 px-4 font-medium text-sp-navy">
                      Casa esquinera
                    </td>
                    <td className="py-4 px-3 text-right tabular-nums">31,715</td>
                    <td className="py-4 px-3 text-right tabular-nums">27,61</td>
                    <td className="py-4 px-3 text-right tabular-nums text-sp-steel-mute">
                      20,595
                    </td>
                    <td className="py-4 px-4 text-right font-display text-sp-navy text-lg font-normal tabular-nums">
                      {totalEsquinera} m²
                    </td>
                  </tr>

                  {/* Row 2: Casa Medianera */}
                  <tr className="transition-colors hover:bg-sp-steel/[0.06] group">
                    <td className="py-4 px-4 font-medium text-sp-navy">
                      Casa medianera
                    </td>
                    <td className="py-4 px-3 text-right tabular-nums">30,385</td>
                    <td className="py-4 px-3 text-right tabular-nums">25,49</td>
                    <td className="py-4 px-3 text-right tabular-nums text-sp-steel-mute">
                      19,69
                    </td>
                    <td className="py-4 px-4 text-right font-display text-sp-navy text-lg font-normal tabular-nums">
                      {totalMedianera} m²
                    </td>
                  </tr>

                  {/* Row 3: Local Comercial */}
                  <tr className="transition-colors hover:bg-sp-steel/[0.06] group">
                    <td className="py-4 px-4 font-medium text-sp-navy">
                      Local comercial
                    </td>
                    <td className="py-4 px-3 text-right tabular-nums">70,40</td>
                    <td className="py-4 px-3 text-right tabular-nums text-sp-steel-mute">
                      —
                    </td>
                    <td className="py-4 px-3 text-right tabular-nums text-sp-steel-mute">
                      —
                    </td>
                    <td className="py-4 px-4 text-right font-display text-sp-navy text-lg font-normal tabular-nums">
                      {totalLocal} m²
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards View (No horizontal scrolling) */}
            <div className="sm:hidden flex flex-col gap-3 mb-6">
              {PROYECTO_DATA.areas.tipologias.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-sp-white p-4 rounded-lg border border-sp-steel/15 shadow-sm"
                >
                  <div className="flex justify-between items-baseline mb-2 border-b border-sp-steel/10 pb-2">
                    <span className="font-display text-sp-navy text-base font-medium">
                      {item.tipologia}
                    </span>
                    <span className="font-display text-sp-navy text-xl font-normal tabular-nums">
                      {idx === 0
                        ? `${totalEsquinera} m²`
                        : idx === 1
                        ? `${totalMedianera} m²`
                        : `${totalLocal} m²`}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[0.75rem] font-sans text-sp-steel-ink">
                    <div>
                      <span className="text-sp-steel-mute block text-[0.68rem] uppercase">
                        1° Piso
                      </span>
                      <span className="font-medium tabular-nums">{item.piso1} m²</span>
                    </div>
                    <div>
                      <span className="text-sp-steel-mute block text-[0.68rem] uppercase">
                        2° Piso
                      </span>
                      <span className="font-medium tabular-nums">
                        {item.piso2 === "—" ? "—" : `${item.piso2} m²`}
                      </span>
                    </div>
                    <div>
                      <span className="text-sp-steel-mute block text-[0.68rem] uppercase">
                        3° Piso*
                      </span>
                      <span className="font-medium tabular-nums text-sp-steel">
                        {item.piso3 === "—" ? "—" : `${item.piso3} m²`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footnote */}
            <p className="font-sans text-xs text-sp-steel-mute font-light italic mb-8">
              {PROYECTO_DATA.areas.notaTabla}
            </p>

            {/* Typology Cards (White background, 2px top Navy border) */}
            <div className="tarjetas-tipologia grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Esquinera Card */}
              <div className="relative bg-sp-white p-5 rounded-lg border border-sp-steel/15 shadow-sm overflow-hidden flex flex-col justify-between">
                <span className="tarjeta-top-border absolute top-0 left-0 right-0 h-[2px] bg-sp-navy origin-left" />
                <div className="flex items-center gap-2 mb-2 text-sp-navy">
                  <Home className="w-4 h-4 text-sp-sand" />
                  <h4 className="font-display text-base uppercase font-medium">
                    Casa esquinera
                  </h4>
                </div>
                <p className="font-sans text-xs text-sp-steel-ink font-light leading-relaxed">
                  Dos frentes e iluminación adicional.{" "}
                  <strong className="font-medium text-sp-navy">
                    79,92 m² totales
                  </strong>{" "}
                  con ampliación.
                </p>
              </div>

              {/* Medianera Card */}
              <div className="relative bg-sp-white p-5 rounded-lg border border-sp-steel/15 shadow-sm overflow-hidden flex flex-col justify-between">
                <span className="tarjeta-top-border absolute top-0 left-0 right-0 h-[2px] bg-sp-navy origin-left" />
                <div className="flex items-center gap-2 mb-2 text-sp-navy">
                  <Layers className="w-4 h-4 text-sp-sand" />
                  <h4 className="font-display text-base uppercase font-medium">
                    Casa medianera
                  </h4>
                </div>
                <p className="font-sans text-xs text-sp-steel-ink font-light leading-relaxed">
                  Entre unidades, óptima en costo.{" "}
                  <strong className="font-medium text-sp-navy">
                    75,57 m² totales
                  </strong>{" "}
                  con ampliación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
