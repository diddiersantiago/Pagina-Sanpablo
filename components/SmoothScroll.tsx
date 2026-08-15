"use client";

import { useEffect } from "react";
import { initLenis } from "@/lib/animations";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenisInstance: any = null;

    initLenis().then((lenis) => {
      lenisInstance = lenis;
    });

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
