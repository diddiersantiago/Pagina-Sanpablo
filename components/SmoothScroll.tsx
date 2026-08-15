"use client";

import { useEffect } from "react";
import { initLenis } from "@/lib/animations";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | null = null;

    initLenis().then((dispose) => {
      // En StrictMode el efecto se desmonta antes de que resuelva la promesa:
      // sin este guard queda una instancia huérfana con su ticker vivo.
      if (cancelled) {
        dispose?.();
        return;
      }
      cleanup = dispose;
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
