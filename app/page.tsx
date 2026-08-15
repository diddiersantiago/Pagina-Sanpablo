import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Proyecto from "@/components/Proyecto";
import Arquitectura from "@/components/Arquitectura";
import Ubicacion from "@/components/Ubicacion";
import PlantaPrimerPiso from "@/components/PlantaPrimerPiso";
import PlantaSegundoPiso from "@/components/PlantaSegundoPiso";
import Ampliacion from "@/components/Ampliacion";
import LocalComercial from "@/components/LocalComercial";
import Inversion from "@/components/Inversion";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import { PROYECTO_DATA } from "@/data/proyecto";

export default function Home() {
  return (
    <SmoothScroll>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" className="relative flex flex-col w-full">
        {/* 1. HERO (Pág. 1) */}
        <Hero />

        {/* 2. EL PROYECTO (Pág. 2) */}
        <Proyecto />

        {/* 3. ARQUITECTURA (Pág. 3) */}
        <Arquitectura />

        {/* 4. UBICACIÓN */}
        <Ubicacion />

        {/*
          5. PLANOS (Págs. 4-5 + ampliación)
          Los tres bloques cuelgan de un <h2> propio. Antes eran tres <h3>
          sueltos que estructuralmente colgaban de Arquitectura, lo cual era falso.
        */}
        <section id="planos" aria-labelledby="titulo-planos" className="relative w-full">
          <div className="bg-sp-cream px-6 sm:px-8 lg:px-16 pt-16 sm:pt-24">
            <div className="max-w-7xl mx-auto flex flex-col">
              <div className="inline-flex flex-col mb-3">
                <span className="font-sans text-[0.72rem] tracking-kicker uppercase text-sp-steel font-normal">
                  {PROYECTO_DATA.planos.primerPiso.kicker}
                </span>
                <div className="w-16 h-[1px] bg-sp-steel/30 mt-1" />
              </div>
              <h2
                id="titulo-planos"
                className="font-display font-normal text-sp-navy text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.02] tracking-tighter uppercase"
              >
                Planos de las casas VIS en Soracá
              </h2>
            </div>
          </div>

          <PlantaPrimerPiso />
          <PlantaSegundoPiso />
          <Ampliacion />
        </section>

        {/* 6. LOCAL COMERCIAL (Pág. 6) */}
        <LocalComercial />

        {/* 7. INVERSIÓN (Pág. 7) */}
        <Inversion />

        {/* 8. PREGUNTAS FRECUENTES */}
        <Faq />
      </main>

      {/* 9. FOOTER & LEGAL */}
      <Footer />

      {/* WhatsApp Floating Action Button */}
      <WhatsAppButton />
    </SmoothScroll>
  );
}
