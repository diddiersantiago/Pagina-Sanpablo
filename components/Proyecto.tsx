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

const TOTALES = PROYECTO_DATA.areas.tipologias.map((t) => t.totalNum);
const fmt = (n: number) => n.toFixed(2).replace(".", ",");

export default function Proyecto() {
  const sectionRef = useRef<HTMLElement>(null);
  const kickerLineRef = useRef<HTMLDivElement>(null);
  const visPanelRef = useRef<HTMLDivElement>(null);
  // Trigger del contador: la columna derecha está SIEMPRE visible.
  // `.tabla-areas-container` es hidden sm:block — bajo 480px nunca dispara.
  const colRightRef = useRef<HTMLDivElement>(null);

  // Estado inicial = valor final. El HTML del servidor emite 79,92 / 75,57 /
  // 70,40 en lugar de "0,00", y el ancho de la columna no salta al animar.
  const [totales, setTotales] = useState<string[]>(() => TOTALES.map(fmt));

  useCountUp(colRightRef, TOTALES, (values) => setTotales(values.map(fmt)), {
    start: "top 85%",
  });

  useEffect(() => {
    if (prefersReducedMotion()) return;

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
            ease: EASING.default,
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
          duration: DURATION.text,
          ease: EASING.default,
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
          duration: DURATION.text,
          delay: 0.12,
          ease: EASING.default,
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
            duration: DURATION.text,
            ease: EASING.entrance,
            scrollTrigger: {
              trigger: visPanelRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 4. White cards top border scale
      gsap.fromTo(
        ".tarjeta-top-border",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: EASING.default,
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
              className="relative bg-sp-steel text-white p-6 sm:p-8 overflow-hidden shadow-xl"
            >
              {/* Gold gradient top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sp-sand via-sp-gold to-sp-sand" />

              <h3 className="font-display text-sp-ivory text-lg sm:text-xl font-normal uppercase tracking-tight mb-6">
                {PROYECTO_DATA.vis.titulo}
              </h3>

              {/* 2x2 Grid for 4 VIS Key Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-6">
                {PROYECTO_DATA.vis.puntos.map((p, idx) => (
                  <div key={idx} className="flex flex-col group">
                    <p className="font-sans text-sp-ivory text-sm font-medium tracking-wide mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sp-gold inline-block shrink-0 group-hover:scale-125 transition-transform" />
                      {p.titulo}
                    </p>
                    <p className="font-sans text-xs text-white/90 font-light leading-relaxed pl-3">
                      {p.texto}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footnote on Subsidies */}
              <div className="pt-4 border-t border-white/15">
                <p className="font-display italic text-[0.8rem] text-sp-ivory/90 font-normal leading-normal">
                  {PROYECTO_DATA.vis.nota}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Areas Table + Typology Highlight Cards */}
          <div
            ref={colRightRef}
            className="proyecto-col-right lg:col-span-6 flex flex-col"
          >
            <div className="inline-flex flex-col mb-4">
              <h3 className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-steel font-medium">
                {PROYECTO_DATA.areas.kicker}
              </h3>
              <div className="w-16 h-[1.5px] bg-gradient-to-r from-sp-gold to-sp-sand mt-1" />
            </div>

            {/* Desktop Table View */}
            <div className="tabla-areas-container hidden sm:block bg-sp-white border border-sp-steel/20 shadow-md overflow-hidden mb-6">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">
                  Áreas por tipología en Urbanización San Pablo, Soracá, Boyacá:
                  metros cuadrados de primer piso, segundo piso, ampliación de
                  tercer piso y total por unidad.
                </caption>
                <thead>
                  <tr className="bg-sp-steel text-sp-ivory font-sans text-[0.75rem] uppercase tracking-[0.12em] font-medium border-b border-sp-navy/30">
                    <th scope="col" className="py-3.5 px-4 font-medium">
                      Tipología
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-right font-medium">
                      1° Piso
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-right font-medium">
                      2° Piso
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-right font-medium">
                      3° Piso*
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-right font-semibold text-sp-gold"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sp-steel/10 font-sans text-sm text-sp-steel-ink">
                  {PROYECTO_DATA.areas.tipologias.map((item, idx) => (
                    <tr key={item.tipologia} className="transition-colors hover:bg-sp-sand/15">
                      <th
                        scope="row"
                        className="py-4 px-4 font-medium text-sp-navy text-left"
                      >
                        {item.tipologia}
                      </th>
                      <td className="py-4 px-3 text-right tabular-nums">
                        {item.piso1}
                      </td>
                      <td className="py-4 px-3 text-right tabular-nums text-sp-steel">
                        {item.piso2}
                      </td>
                      <td className="py-4 px-3 text-right tabular-nums text-sp-steel">
                        {item.piso3}
                      </td>
                      {/* min-w reserva el ancho de la columna durante el conteo */}
                      <td className="py-4 px-4 text-right font-display text-sp-navy text-lg font-medium tabular-nums text-sp-navy">
                        <span className="inline-block min-w-[7ch] text-sp-navy">
                          {totales[idx]} m²
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards View (No horizontal scrolling) */}
            <div className="sm:hidden flex flex-col gap-3 mb-6">
              {PROYECTO_DATA.areas.tipologias.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-sp-white p-4 border border-sp-steel/20 shadow-sm"
                >
                  <div className="flex justify-between items-baseline mb-2 border-b border-sp-steel/10 pb-2">
                    <span className="font-display text-sp-navy text-base font-medium">
                      {item.tipologia}
                    </span>
                    <span className="font-display text-sp-navy text-xl font-normal tabular-nums inline-block min-w-[7ch] text-right">
                      {totales[idx]} m²
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[0.75rem] font-sans text-sp-steel-ink">
                    <div>
                      <span className="text-sp-steel block text-[0.68rem] uppercase">
                        1° Piso
                      </span>
                      <span className="font-medium tabular-nums">{item.piso1} m²</span>
                    </div>
                    <div>
                      <span className="text-sp-steel block text-[0.68rem] uppercase">
                        2° Piso
                      </span>
                      <span className="font-medium tabular-nums">
                        {item.piso2 === "—" ? "—" : `${item.piso2} m²`}
                      </span>
                    </div>
                    <div>
                      <span className="text-sp-steel block text-[0.68rem] uppercase">
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
            <p className="font-display italic text-[0.8rem] text-sp-steel font-normal mb-8">
              {PROYECTO_DATA.areas.notaTabla}
            </p>

            {/* Typology Cards (White background, 2px top Navy & Gold border) */}
            <div className="tarjetas-tipologia grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Esquinera Card */}
              <div className="sp-card-interactive relative bg-sp-white p-5 border border-sp-steel/20 shadow-sm overflow-hidden flex flex-col justify-between group">
                <span className="tarjeta-top-border absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sp-navy via-sp-gold to-sp-sand origin-left" />
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display text-base uppercase font-medium text-sp-navy">
                    Casa esquinera
                  </h4>
                  <span className="text-[0.65rem] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 bg-sp-sand/20 text-sp-steel-ink">
                    2 frentes
                  </span>
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
              <div className="sp-card-interactive relative bg-sp-white p-5 border border-sp-steel/20 shadow-sm overflow-hidden flex flex-col justify-between group">
                <span className="tarjeta-top-border absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sp-navy via-sp-gold to-sp-sand origin-left" />
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display text-base uppercase font-medium text-sp-navy">
                    Casa medianera
                  </h4>
                  <span className="text-[0.65rem] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 bg-sp-sand/20 text-sp-steel-ink">
                    Óptima
                  </span>
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
