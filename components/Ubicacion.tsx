"use client";

import { useRef } from "react";
import { PROYECTO_DATA } from "@/data/proyecto";
import { useReveal } from "@/lib/animations";

/*
 * Para un proyecto inmobiliario la ubicación es el primer factor de decisión
 * y donde está el volumen de búsqueda local. Es además el único sitio donde
 * tienen sentido el NAP completo y el GeoCoordinates del JSON-LD.
 *
 * Los campos que el cliente aún no ha confirmado (dirección exacta,
 * coordenadas, distancia/tiempo a Tunja, horario) se omiten en lugar de
 * inventarse: ver el bloque TODO CLIENTE en data/proyecto.ts.
 */
export default function Ubicacion() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useReveal(leftRef, { x: -24, y: 0, start: "top 78%" });
  useReveal(rightRef, { x: 24, y: 0, delay: 0.12, start: "top 78%" });

  const u = PROYECTO_DATA.ubicacionSeccion;

  const datos: { termino: string; valor: string }[] = [
    u.distanciaTunjaKm && {
      termino: "Distancia a Tunja",
      valor: u.distanciaTunjaKm,
    },
    u.tiempoTunjaMin && { termino: "Tiempo en carro", valor: u.tiempoTunjaMin },
    u.referenciaVial && { termino: "Referencia vial", valor: u.referenciaVial },
    u.horario && { termino: "Sala de ventas", valor: u.horario },
  ].filter(Boolean) as { termino: string; valor: string }[];

  return (
    <section
      id="ubicacion"
      aria-labelledby="titulo-ubicacion"
      className="relative w-full bg-sp-cream py-20 sm:py-28 px-6 sm:px-8 lg:px-16 text-sp-steel-ink border-b border-sp-steel/15"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* LEFT: título, bajada y descripción */}
        <div ref={leftRef} className="lg:col-span-6 flex flex-col">
          <div className="inline-flex flex-col mb-4">
            <span className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-steel font-normal">
              {u.kicker}
            </span>
            <div className="w-16 h-[1px] bg-sp-steel/30 mt-1" />
          </div>

          <h2
            id="titulo-ubicacion"
            className="font-display font-normal text-sp-navy text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.02] tracking-tighter uppercase mb-3"
          >
            {u.titulo}
          </h2>

          <p className="font-display italic text-sp-steel text-[clamp(1.1rem,1.5vw,1.4rem)] leading-lyric mb-6">
            {u.subtitulo}
          </p>

          <p className="font-sans font-light text-sp-steel-ink text-[1.05rem] leading-[1.75] max-w-prose">
            {u.descripcion}
          </p>
        </div>

        {/* RIGHT: NAP + datos concretos + mapa */}
        <div ref={rightRef} className="lg:col-span-6 flex flex-col gap-6">
          {/* Dirección — NAP */}
          <div className="sp-card-interactive bg-sp-white border border-sp-steel/20 shadow-md p-6 sm:p-8 relative overflow-hidden">
            <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sp-navy via-sp-gold to-sp-sand" />
            <h3 className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-steel font-medium mb-4">
              Cómo llegar
            </h3>
            <address className="not-italic font-sans text-sp-steel-ink">
              <span className="block font-display text-sp-navy text-xl sm:text-2xl uppercase tracking-tight mb-1">
                Urbanización San Pablo
              </span>
              {u.direccion && (
                <span className="block text-[1.02rem] leading-relaxed">
                  {u.direccion}
                </span>
              )}
              <span className="block text-[1.02rem] leading-relaxed">
                {PROYECTO_DATA.ubicacion} · Colombia
              </span>
              <a
                href={PROYECTO_DATA.telefonoHref}
                className="inline-flex items-center gap-1.5 mt-3 font-semibold text-sp-navy border-b-2 border-sp-gold hover:text-sp-steel transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
              >
                <span>{PROYECTO_DATA.telefonoInternacional}</span>
                <span className="text-sp-gold">✦</span>
              </a>
            </address>

            {datos.length > 0 && (
              <dl className="mt-6 pt-6 border-t border-sp-steel/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {datos.map((d) => (
                  <div key={d.termino} className="flex flex-col">
                    <dt className="font-sans text-[0.68rem] uppercase tracking-wider text-sp-steel font-medium">
                      {d.termino}
                    </dt>
                    <dd className="font-display text-sp-navy text-lg tabular-nums font-medium">
                      {d.valor}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <a
              href={PROYECTO_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-6 px-6 py-3.5 bg-gradient-to-r from-sp-sand via-sp-gold to-sp-sand text-sp-navy font-sans text-sm tracking-wider uppercase font-semibold transition-all duration-300 hover:brightness-105 hover:-translate-y-0.5 shadow-md hover:shadow-lg min-h-[48px] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
            >
              Pedir la ruta por WhatsApp
            </a>
          </div>

          {/*
            Mapa: se carga solo cuando el cliente confirme la ubicación exacta.
            El iframe va con loading="lazy" para no penalizar Core Web Vitals.
          */}
          {u.mapaUrl && (
            <div className="bg-sp-white border border-sp-steel/15 p-2">
              <iframe
                src={u.mapaUrl}
                title="Mapa de la ubicación de Urbanización San Pablo en Soracá, Boyacá"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[320px] border-0"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
