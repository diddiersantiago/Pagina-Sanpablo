"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROYECTO_DATA } from "@/data/proyecto";
import { MessageCircle, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      // Reading progress bar
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.getElementById("reading-progress");
      if (progressBar) {
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-sp-navy/95 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo brand reduced */}
          <Link
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Urbanización San Pablo - Volver al inicio"
          >
            <div className="relative w-8 h-8 md:w-9 md:h-9 overflow-hidden rounded">
              <Image
                src="/img/logo-san-pablo.png"
                alt="Logo Urbanización San Pablo"
                fill
                className="object-contain"
                priority
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
            className="hidden md:flex items-center gap-8 lg:gap-10"
            aria-label="Navegación principal"
          >
            {PROYECTO_DATA.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative font-sans text-xs lg:text-[0.8rem] text-white/80 hover:text-sp-ivory uppercase tracking-[0.16em] font-normal transition-colors py-1 focus:outline-none"
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-sp-sand text-sp-navy font-sans text-xs tracking-wider uppercase font-medium transition-all duration-300 hover:bg-sp-ivory hover:-translate-y-0.5 shadow-sm"
              aria-label="Contactar por WhatsApp al 324 358 2526"
            >
              <MessageCircle className="w-3.5 h-3.5 text-sp-navy" />
              <span>{PROYECTO_DATA.telefono}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-sp-ivory p-2 focus:outline-none"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-sp-navy flex flex-col justify-between p-8 pt-28 md:hidden animate-fade-in">
          <div className="flex flex-col gap-6">
            <p className="font-sans text-[0.7rem] uppercase tracking-[0.22em] text-sp-sand">
              Menú de navegación
            </p>
            <nav className="flex flex-col gap-5">
              {PROYECTO_DATA.navLinks.map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${idx * 60}ms` }}
                  className="font-display text-2xl text-sp-ivory hover:text-sp-sand transition-colors uppercase tracking-tight py-1 border-b border-white/5"
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
              className="flex items-center justify-center gap-3 w-full py-3.5 rounded bg-sp-sand text-sp-navy font-sans text-sm tracking-wider uppercase font-medium hover:bg-sp-ivory transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-sp-navy" />
              <span>WhatsApp · {PROYECTO_DATA.telefono}</span>
            </a>
            <p className="text-center font-sans text-xs text-white/50 tracking-wider">
              {PROYECTO_DATA.salaVentas}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
