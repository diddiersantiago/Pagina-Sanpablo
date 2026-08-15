import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Proyecto from "@/components/Proyecto";
import Arquitectura from "@/components/Arquitectura";
import PlantaPrimerPiso from "@/components/PlantaPrimerPiso";
import PlantaSegundoPiso from "@/components/PlantaSegundoPiso";
import Ampliacion from "@/components/Ampliacion";
import LocalComercial from "@/components/LocalComercial";
import Inversion from "@/components/Inversion";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="relative flex flex-col w-full">
        {/* 1. HERO (Pág. 1) */}
        <Hero />

        {/* 2. EL PROYECTO (Pág. 2) */}
        <Proyecto />

        {/* 3. ARQUITECTURA (Pág. 3) */}
        <Arquitectura />

        {/* 4. PLANOS · PRIMER PISO (Pág. 4) */}
        <PlantaPrimerPiso />

        {/* 5. PLANOS · SEGUNDO PISO (Pág. 5) */}
        <PlantaSegundoPiso />

        {/* 6. AMPLIACIÓN · PROYECCIÓN */}
        <Ampliacion />

        {/* 7. LOCAL COMERCIAL (Pág. 6) */}
        <LocalComercial />

        {/* 8. INVERSIÓN (Pág. 7) */}
        <Inversion />
      </main>

      {/* 9. FOOTER & LEGAL */}
      <Footer />

      {/* WhatsApp Floating Action Button */}
      <WhatsAppButton />
    </SmoothScroll>
  );
}
