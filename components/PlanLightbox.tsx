"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { lockScroll, unlockScroll } from "@/lib/animations";
import { X } from "lucide-react";

interface PlanLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  /** Alt descriptivo con contexto geográfico y áreas. */
  imageAlt: string;
  title: string;
  subtitle?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function PlanLightbox({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  subtitle,
}: PlanLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Guardar el foco para devolverlo al cerrar
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // `overflow: hidden` en el body no detiene a Lenis: hay que pararlo.
    lockScroll();
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      // Trampa de foco: con Tab no se debe salir al fondo
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unlockScroll();
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-sp-navy-deep/95 backdrop-blur-md p-4 sm:p-6 lg:p-10"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative max-w-6xl w-full max-h-[90vh] bg-sp-white p-4 sm:p-6 shadow-2xl flex flex-col items-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-sp-steel/20 mb-3">
          <div>
            <h3
              id="lightbox-title"
              className="font-display text-sp-navy text-lg sm:text-xl font-normal uppercase tracking-tight"
            >
              {title}
            </h3>
            {subtitle && (
              <p className="font-display italic text-sp-steel text-xs sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar vista ampliada"
            className="p-2 text-sp-steel hover:text-sp-navy hover:bg-sp-cream transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Container with high detail */}
        <div className="relative w-full h-[65vh] sm:h-[72vh] flex items-center justify-center bg-sp-cream/40 overflow-auto">
          <div className="relative w-full h-full min-h-[300px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="w-full flex items-center justify-between pt-3 text-[0.7rem] font-sans text-sp-steel tracking-wider uppercase">
          <span>Urbanización San Pablo · Soracá, Boyacá</span>
          <span>Plano arquitectónico oficial</span>
        </div>
      </div>
    </div>
  );
}
