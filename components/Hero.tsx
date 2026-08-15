"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PROYECTO_DATA } from "@/data/proyecto";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, EASING, DURATION } from "@/lib/animations";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const kickerBoxRef = useRef<HTMLDivElement>(null);
  const claimRef = useRef<HTMLParagraphElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);
  const linesSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: EASING.default } });

      // 1. Wavy lines drawing
      if (linesSvgRef.current) {
        const paths = linesSvgRef.current.querySelectorAll("path");
        tl.fromTo(
          paths,
          { strokeDashoffset: 1000, strokeDasharray: 1000, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.8,
            stagger: 0.06,
            ease: EASING.smooth,
          },
          0.3
        );
      }

      // 2. Logo: candidato a LCP — SOLO transform, nunca opacity.
      //    Un elemento en opacity:0 no puede ser LCP y encadena la métrica
      //    a la descarga + hidratación del bundle.
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { scale: 0.94 },
          { scale: 1, duration: 1.1, ease: EASING.entrance },
          0.6
        );
      }

      // 3. H1: candidato a LCP — desplazamiento enmascarado, sin opacity.
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 24 },
          { y: 0, duration: 1.0, ease: EASING.entrance },
          0.9
        );
      }

      // 4. Kicker box & vertical rules
      if (kickerBoxRef.current) {
        tl.fromTo(
          kickerBoxRef.current,
          { opacity: 0, scaleY: 0.8 },
          { opacity: 1, scaleY: 1, duration: DURATION.text, ease: EASING.smooth },
          1.2
        );
      }

      // 5. Claim italic — fade simple. Animar letterSpacing es una propiedad
      //    de layout: reflow en cada frame y CLS si el claim salta de línea.
      if (claimRef.current) {
        tl.fromTo(
          claimRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1.0, ease: EASING.entrance },
          1.4
        );
      }

      // 6. Seal of Soracá
      if (sealRef.current) {
        tl.fromTo(
          sealRef.current,
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: DURATION.text, ease: EASING.entrance },
          1.6
        );
      }

      // 7. Scroll Indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.8 },
          2.0
        );
      }

      // Parallax on Scroll
      if (containerRef.current) {
        gsap.to(".hero-parallax-bg", {
          yPercent: 25,
          ease: EASING.linear,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-parallax-content", {
          yPercent: 12,
          opacity: 0.2,
          ease: EASING.linear,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "65% top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-labelledby="titulo-hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center bg-sp-navy overflow-hidden px-6 sm:px-8 lg:px-16 pt-24 pb-10"
    >
      {/* Background Subtle Gradient & Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-sp-navy-deep/60 via-transparent to-sp-navy-deep/80 pointer-events-none" />

      {/* Hero Background Wavy Lines SVG (Recreated from PDF brand identity) */}
      <div className="hero-parallax-bg absolute inset-0 pointer-events-none flex justify-between opacity-30">
        <svg
          ref={linesSvgRef}
          className="w-full h-full object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Left flowing curves */}
          <path
            d="M -100 0 C 180 200, 80 600, 220 900"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.2"
          />
          <path
            d="M -40 0 C 260 220, 140 580, 320 900"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          <path
            d="M 40 0 C 340 240, 220 620, 420 900"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          <path
            d="M 120 0 C 400 260, 280 640, 500 900"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />

          {/* Right flowing curves */}
          <path
            d="M 1540 0 C 1260 200, 1360 600, 1220 900"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.2"
          />
          <path
            d="M 1480 0 C 1180 220, 1300 580, 1120 900"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          <path
            d="M 1400 0 C 1100 240, 1220 620, 1020 900"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          <path
            d="M 1320 0 C 1040 260, 1160 640, 940 900"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Top Meta Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-start justify-between text-[0.68rem] tracking-kicker uppercase font-sans text-sp-sand/80 pt-2">
        <div className="flex items-center gap-2">
          <span>{PROYECTO_DATA.ubicacion}</span>
          <span className="text-sp-sand/40">•</span>
          <span className="text-white/70">{PROYECTO_DATA.distancia}</span>
        </div>

        {/* Municipality Seal Badge */}
        <div
          ref={sealRef}
          className="flex items-center gap-3 bg-sp-cream text-sp-navy px-3.5 py-1.5 border border-sp-sand/40"
        >
          <div className="relative w-6 h-6">
            <Image
              src="/img/escudo-soraca-trans.png"
              alt="Escudo del Municipio de Soracá"
              fill
              sizes="24px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="font-sans text-[0.55rem] tracking-[0.18em] font-bold text-sp-navy uppercase">
              Municipio de
            </span>
            <span className="font-sans text-[0.625rem] tracking-[0.14em] font-medium text-sp-steel">
              Soracá · Boyacá
            </span>
          </div>
        </div>
      </div>

      {/* Center Hero Identity */}
      <div className="hero-parallax-content relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center my-auto py-8">
        {/* Ambient Golden Glow & Floating Monogram */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-sp-gold/15 blur-3xl pointer-events-none animate-glow-pulse" />
          <div
            ref={logoRef}
            className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 animate-shimmer animate-float drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
          >
            <Image
              src="/img/logo-san-pablo-trans.png"
              alt="Logotipo oficial Urbanización San Pablo"
              fill
              sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Brand Name (H1) */}
        <div className="line-mask mb-3">
          <h1
            ref={titleRef}
            id="titulo-hero"
            className="font-display font-normal text-sp-ivory text-[clamp(2.5rem,7vw,5.75rem)] leading-[1.02] tracking-tightest uppercase"
          >
            <span className="block font-sans text-[0.72rem] sm:text-xs tracking-kicker uppercase text-sp-sand mb-2 font-normal leading-none">
              Urbanización
            </span>
            San Pablo
            <span className="sr-only">
              {" "}
              · Vivienda de Interés Social (VIS) en Soracá, Boyacá, a minutos de Tunja
            </span>
          </h1>
        </div>

        {/* Lema with Star Detail */}
        <div className="flex items-center gap-3 sm:gap-4 my-2 text-sp-sand/90 text-xs sm:text-sm font-sans tracking-[0.18em] uppercase">
          <span className="w-6 sm:w-12 h-[1px] bg-sp-sand/30" />
          <span className="flex items-center gap-1.5 font-light">
            Hogares que construyen futuro
            {/* Estrella de cuatro puntas: SVG inline en vez de U+2726, que no
                está en ningún subset de fuente cargado y caía a fuente del sistema. */}
            <svg
              viewBox="0 0 12 12"
              className="w-2.5 h-2.5 shrink-0 fill-sp-gold"
              aria-hidden="true"
            >
              <path d="M6 0 L7.2 4.8 L12 6 L7.2 7.2 L6 12 L4.8 7.2 L0 6 L4.8 4.8 Z" />
            </svg>
            Soracá
          </span>
          <span className="w-6 sm:w-12 h-[1px] bg-sp-sand/30" />
        </div>

        {/* Kicker Box with Vertical Accent Borders */}
        <div
          ref={kickerBoxRef}
          className="relative my-6 px-6 sm:px-10 py-3 sm:py-3.5 border-y border-white/10 flex items-center justify-center"
        >
          <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-sp-sand/70" />
          <span className="absolute right-0 top-0 bottom-0 w-[2px] bg-sp-sand/70" />
          <p className="font-sans text-xs sm:text-sm tracking-kicker uppercase text-sp-ivory/90 font-medium">
            {PROYECTO_DATA.categoria}
          </p>
        </div>

        {/* Main Lyric Claim */}
        <div className="line-mask mt-2 mb-1">
          <p
            ref={claimRef}
            className="font-display italic font-normal text-sp-sand text-[clamp(1.25rem,2.2vw,1.95rem)] leading-lyric tracking-normal"
          >
            {PROYECTO_DATA.claim}
          </p>
        </div>

        <p className="font-sans text-[0.68rem] tracking-kicker uppercase text-white/60 mt-2 font-light">
          Presentación comercial del proyecto · {PROYECTO_DATA.edicion}
        </p>
      </div>

      {/* Bottom Scroll Indicator & Direct Conversion Link */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pt-4 border-t border-white/10 text-white/70 text-xs">
        <div className="hidden sm:flex items-center gap-2 font-sans text-[0.7rem] tracking-wider text-sp-sand/80">
          <span>{PROYECTO_DATA.edicion}</span>
        </div>

        <a
          ref={scrollIndicatorRef}
          href="#proyecto"
          className="flex flex-col items-center gap-1.5 mx-auto group text-sp-ivory/80 hover:text-sp-ivory transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
          aria-label="Desplazarse a la sección El Proyecto"
        >
          <span className="font-sans text-[0.65rem] tracking-kicker uppercase font-light text-sp-sand">
            Descubrir
          </span>
          <div className="animate-subtle-bounce p-1 rounded-full border border-sp-sand/30 group-hover:border-sp-sand transition-colors">
            <ChevronDown className="w-3.5 h-3.5 text-sp-sand" />
          </div>
        </a>

        <div className="hidden sm:flex items-center gap-2 font-sans text-[0.7rem] tracking-wider text-white/70">
          <span>{PROYECTO_DATA.salaVentas}</span>
        </div>
      </div>
    </section>
  );
}
