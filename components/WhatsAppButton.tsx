"use client";

import { useEffect, useState } from "react";
import { PROYECTO_DATA } from "@/data/proyecto";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after initial load delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Contacto directo por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center group focus:outline-none"
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-full bg-sp-navy text-sp-ivory font-sans text-xs font-light tracking-wide shadow-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        ¿Hablamos por WhatsApp?
      </span>

      <a
        href={PROYECTO_DATA.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir chat de WhatsApp con asesor de San Pablo"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-sp-sand text-sp-navy shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-sp-ivory focus:outline-none"
      >
        {/* Subtle Ping Halo */}
        <span className="absolute inset-0 rounded-full bg-sp-sand animate-ping opacity-20 pointer-events-none" />
        <MessageCircle className="w-7 h-7 text-sp-navy fill-current" />
      </a>
    </aside>
  );
}
