"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROYECTO_DATA } from "@/data/proyecto";
import { lockScroll, unlockScroll } from "@/lib/animations";
import { MessageCircle, Menu, X } from "lucide-react";

const FOCUS_RING =
  "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Lenis dispara a frecuencia de frame: leer scrollHeight/clientHeight en
    // cada evento fuerza un layout síncrono por frame. Se cachea la altura y
    // solo se recalcula en resize; la escritura del transform va en un rAF.
    let maxScroll = 0;
    let ticking = false;

    const measure = () => {
      maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    };

    const paint = () => {
      ticking = false;
      const winScroll = window.scrollY;
      setIsScrolled(winScroll > 20);

      const progressBar = document.getElementById("reading-progress");
      if (!progressBar) return;
      // Guarda: en páginas más cortas que el viewport maxScroll es 0
      const ratio = maxScroll > 0 ? Math.min(winScroll / maxScroll, 1) : 0;
      progressBar.style.transform = `scaleX(${ratio})`;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paint);
    };

    measure();
    paint();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // El overlay móvil debe frenar a Lenis: `overflow:hidden` en el body no lo
  // detiene y el fondo sigue desplazándose bajo el menú.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    lockScroll();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-sp-navy/95 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo brand reduced */}
          <Link
            href="#hero"
            className={`flex items-center gap-3 group ${FOCUS_RING}`}
            aria-label="Urbanización San Pablo - Volver al inicio"
          >
            <div className="relative w-8 h-8 md:w-9 md:h-9">
              <Image
                src="/img/logo-san-pablo-trans.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sp-ivory text-sm sm:text-base tracking-wider uppercase font-medium leading-none">
                San Pablo
              </span>
              <span className="font-sans text-[0.625rem] text-sp-sand tracking-[0.2em] uppercase font-light mt-0.5">
                Soracá · Boyacá
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8"
            aria-label="Navegación principal"
          >
            {PROYECTO_DATA.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative font-sans text-xs lg:text-[0.8rem] text-white/85 hover:text-sp-ivory uppercase tracking-[0.16em] font-normal transition-colors py-1 ${FOCUS_RING}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sp-sand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={PROYECTO_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sp-sand to-sp-gold/90 text-sp-navy font-sans text-xs tracking-wider uppercase font-semibold transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 shadow-sm hover:shadow-md ${FOCUS_RING}`}
              aria-label={`Contactar por WhatsApp al ${PROYECTO_DATA.telefonoInternacional}`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-sp-navy" />
              <span>{PROYECTO_DATA.telefono}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden text-sp-ivory p-2 ${FOCUS_RING}`}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-movil"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="menu-movil"
          className="fixed inset-0 z-40 bg-sp-navy flex flex-col justify-between p-8 pt-28 md:hidden animate-fade-in"
        >
          <div className="flex flex-col gap-6">
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.22em] text-sp-sand">
              Menú de navegación
            </p>
            <nav className="flex flex-col gap-5" aria-label="Navegación móvil">
              {PROYECTO_DATA.navLinks.map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className={`animate-fade-in font-display text-2xl text-sp-ivory hover:text-sp-sand transition-colors uppercase tracking-tight py-1 border-b border-white/10 ${FOCUS_RING}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
            <a
              href={PROYECTO_DATA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-3 w-full py-3.5 bg-sp-sand text-sp-navy font-sans text-sm tracking-wider uppercase font-medium hover:bg-sp-ivory transition-colors ${FOCUS_RING}`}
            >
              <MessageCircle className="w-4 h-4 text-sp-navy" />
              <span>WhatsApp · {PROYECTO_DATA.telefono}</span>
            </a>
            <a
              href={PROYECTO_DATA.telefonoHref}
              className={`flex items-center justify-center w-full py-3.5 border border-sp-sand/60 text-sp-ivory font-sans text-sm tracking-wider uppercase font-medium hover:border-sp-sand transition-colors ${FOCUS_RING}`}
            >
              Llamar · {PROYECTO_DATA.telefonoInternacional}
            </a>
            <p className="text-center font-sans text-xs text-white/60 tracking-wider">
              {PROYECTO_DATA.salaVentas}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
