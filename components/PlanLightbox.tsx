"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface PlanLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  subtitle?: string;
}

export default function PlanLightbox({
  isOpen,
  onClose,
  imageSrc,
  title,
  subtitle,
}: PlanLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
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
        className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-lg p-4 sm:p-6 shadow-2xl flex flex-col items-center overflow-hidden"
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
            type="button"
            onClick={onClose}
            aria-label="Cerrar vista ampliada"
            className="p-2 rounded-full text-sp-steel hover:text-sp-navy hover:bg-sp-cream transition-colors focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Container with high detail */}
        <div className="relative w-full h-[65vh] sm:h-[72vh] flex items-center justify-center bg-sp-cream/40 rounded overflow-auto">
          <div className="relative w-full h-full min-h-[300px]">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="w-full flex items-center justify-between pt-3 text-[0.7rem] font-sans text-sp-steel-mute tracking-wider uppercase">
          <span>Urbanización San Pablo · Soracá, Boyacá</span>
          <span className="flex items-center gap-1 text-sp-steel">
            <ZoomIn className="w-3.5 h-3.5" />
            Plano arquitectónico oficial
          </span>
        </div>
      </div>
    </div>
  );
}
