import Image from "next/image";
import { PROYECTO_DATA } from "@/data/proyecto";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  const { ubicacionSeccion } = PROYECTO_DATA;

  return (
    <footer
      aria-label="Pie de página legal y de contacto"
      className="relative w-full bg-sp-navy-deep text-sp-ivory pt-16 pb-20 px-6 sm:px-8 lg:px-16 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Top Branding and Seals Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand Logo & Slogan */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16">
              <Image
                src="/img/logo-san-pablo-trans.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sp-ivory text-xl uppercase tracking-wider font-medium">
                San Pablo
              </span>
              <span className="font-sans text-[0.7rem] text-sp-sand tracking-[0.2em] uppercase font-light">
                {PROYECTO_DATA.lema}
              </span>
            </div>
          </div>

          {/* Claim Lyric Didone */}
          <div className="text-center md:text-right">
            <p className="font-display italic text-sp-sand text-lg sm:text-xl font-normal">
              {PROYECTO_DATA.claim}
            </p>
            {/* NAP: dirección en <address> para que sea señal estructurada */}
            <address className="not-italic font-sans text-xs text-white/80 mt-1 leading-relaxed">
              {ubicacionSeccion.direccion ? (
                <span className="block">{ubicacionSeccion.direccion}</span>
              ) : null}
              <span className="block">{PROYECTO_DATA.salaVentas}</span>
              <a
                href={PROYECTO_DATA.telefonoHref}
                className="inline-block mt-1 text-sp-sand hover:text-sp-ivory transition-colors tracking-wider focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
              >
                {PROYECTO_DATA.telefonoInternacional}
              </a>
            </address>
          </div>

          {/* Institutional Partner Seal */}
          <div className="flex items-center gap-3 bg-sp-cream text-sp-navy px-4 py-2 border border-sp-sand/30">
            <div className="relative w-7 h-7">
              <Image
                src="/img/escudo-soraca-trans.png"
                alt="Escudo del Municipio de Soracá"
                fill
                sizes="28px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans text-[0.6rem] tracking-[0.16em] font-bold text-sp-navy uppercase">
                Municipio de
              </span>
              <span className="font-sans text-[0.68rem] tracking-[0.12em] font-medium text-sp-steel">
                Soracá · Boyacá
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links & Direct WhatsApp */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-b border-white/10 text-xs font-sans text-white/80">
          <nav
            className="flex flex-wrap justify-center gap-6"
            aria-label="Enlaces de pie de página"
          >
            {PROYECTO_DATA.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-sp-sand transition-colors uppercase tracking-[0.14em] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#preguntas-frecuentes"
              className="hover:text-sp-sand transition-colors uppercase tracking-[0.14em] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
            >
              Preguntas frecuentes
            </a>
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href={PROYECTO_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sp-sand hover:text-sp-ivory transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="font-medium tracking-wider">
                WhatsApp: {PROYECTO_DATA.telefono}
              </span>
            </a>
            <a
              href={PROYECTO_DATA.telefonoHref}
              className="text-sp-sand hover:text-sp-ivory transition-colors font-medium tracking-wider focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
            >
              Llamar: {PROYECTO_DATA.telefonoInternacional}
            </a>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright (Mandatory & Literal) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-sans text-[0.72rem] text-white/70 font-light leading-relaxed max-w-3xl">
            {PROYECTO_DATA.legal}
          </p>
          <span className="font-sans text-[0.68rem] text-white/60 uppercase tracking-widest flex-shrink-0">
            © 2026 Urbanización San Pablo
          </span>
        </div>
      </div>
    </footer>
  );
}
