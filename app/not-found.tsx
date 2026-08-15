import type { Metadata } from "next";
import Link from "next/link";
import { PROYECTO_DATA } from "@/data/proyecto";

export const metadata: Metadata = {
  title: "Página no encontrada · Urbanización San Pablo",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[100svh] w-full bg-sp-navy text-sp-ivory flex flex-col items-center justify-center text-center px-6 sm:px-8 py-24">
      <span className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-sand mb-4">
        Error 404
      </span>

      <h1 className="font-display font-normal text-sp-ivory text-[clamp(2rem,6vw,4rem)] leading-[1.05] tracking-tightest uppercase mb-4 max-w-3xl">
        Esta página no existe
      </h1>

      <p className="font-display italic text-sp-sand text-lg sm:text-xl mb-10 max-w-xl">
        Pero el proyecto sí: casas VIS en Soracá, Boyacá, a minutos de Tunja.
      </p>

      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-sp-sand text-sp-navy font-sans text-sm tracking-wider uppercase font-medium hover:bg-sp-ivory transition-colors min-h-[48px] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
        >
          Volver al inicio
        </Link>
        <a
          href={PROYECTO_DATA.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 border border-sp-sand/60 text-sp-ivory font-sans text-sm tracking-wider uppercase font-medium hover:border-sp-sand transition-colors min-h-[48px] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sp-sand"
        >
          Escribir por WhatsApp
        </a>
      </div>

      <p className="font-sans text-[0.7rem] tracking-kicker uppercase text-white/60 mt-12">
        {PROYECTO_DATA.salaVentas} · {PROYECTO_DATA.telefonoInternacional}
      </p>
    </main>
  );
}
