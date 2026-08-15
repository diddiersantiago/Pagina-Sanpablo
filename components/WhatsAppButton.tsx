import { PROYECTO_DATA } from "@/data/proyecto";
import { MessageCircle } from "lucide-react";

/*
 * La entrada diferida se hace con animation-delay en CSS (.animate-fab-enter),
 * no con un setTimeout de 2,4 s. Así el CTA principal existe en el HTML desde
 * el primer paint —indexable y sin coste de JS— en vez de aparecer tras un
 * re-render del cliente.
 */
export default function WhatsAppButton() {
  return (
    <aside
      aria-label="Contacto directo por WhatsApp"
      className="animate-fab-enter fixed bottom-6 right-6 z-50 flex items-center group"
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 bg-sp-navy text-sp-ivory font-sans text-xs font-medium tracking-wide border border-sp-sand/40 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none rounded-sm">
        ¿Hablamos por WhatsApp?
      </span>

      <a
        href={PROYECTO_DATA.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir chat de WhatsApp con un asesor de Urbanización San Pablo al ${PROYECTO_DATA.telefonoInternacional}`}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-sp-sand via-sp-gold to-sp-sand text-sp-navy shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:brightness-110 active:scale-95 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-gold"
      >
        {/* Subtle Ping Halo */}
        <span className="absolute inset-0 rounded-full bg-sp-gold animate-ping opacity-30 pointer-events-none" />
        <MessageCircle className="w-7 h-7 text-sp-navy fill-current" />
      </a>
    </aside>
  );
}
