"use client";

import { useRef } from "react";
import { PROYECTO_DATA } from "@/data/proyecto";
import { useReveal } from "@/lib/animations";
import { ChevronDown } from "lucide-react";

/*
 * Acordeón <details>/<summary>: el texto de cada respuesta está SIEMPRE en el
 * DOM, aunque el panel esté plegado. Un render condicional de React no sirve
 * aquí — Google penaliza el FAQPage cuyo contenido no existe en la página.
 * El JSON-LD de app/layout.tsx reutiliza literalmente estas mismas cadenas.
 */
export default function Faq() {
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useReveal(headerRef, { y: 24, start: "top 80%" });
  useReveal(listRef, { y: 28, delay: 0.1, start: "top 82%" });

  const { faq } = PROYECTO_DATA;

  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="titulo-faq"
      className="relative w-full bg-sp-cream py-20 sm:py-28 px-6 sm:px-8 lg:px-16 text-sp-steel-ink border-b border-sp-steel/15"
    >
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef} className="flex flex-col mb-10">
          <div className="inline-flex flex-col mb-4">
            <span className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-steel font-normal">
              {faq.kicker}
            </span>
            <div className="w-16 h-[1px] bg-sp-steel/30 mt-1" />
          </div>
          <h2
            id="titulo-faq"
            className="font-display font-normal text-sp-navy text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-tighter uppercase"
          >
            {faq.titulo}
          </h2>
        </div>

        <div ref={listRef} className="border-t border-sp-steel/20">
          {faq.preguntas.map((item) => (
            <details
              key={item.pregunta}
              className="group border-b border-sp-steel/20"
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none py-5 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand">
                <h3 className="font-display text-sp-navy text-lg sm:text-xl font-normal leading-snug">
                  {item.pregunta}
                </h3>
                <ChevronDown
                  className="w-5 h-5 mt-1 shrink-0 text-sp-steel transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="font-sans font-light text-sp-steel-ink text-[1.02rem] leading-[1.75] pb-6 pr-8 max-w-prose">
                {item.respuesta}
              </p>
            </details>
          ))}
        </div>

        <p className="font-display italic text-sp-steel text-sm mt-8">
          ¿Te queda otra duda? Escríbenos por WhatsApp al{" "}
          <a
            href={PROYECTO_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="not-italic font-sans font-medium text-sp-navy border-b border-sp-sand hover:text-sp-steel transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
          >
            {PROYECTO_DATA.telefonoInternacional}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
