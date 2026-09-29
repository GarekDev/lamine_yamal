"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.documentElement.classList.remove("scroll-locked");
  }, []);

  return (
    <main id="contenido" className="flex min-h-dvh flex-col items-center justify-center bg-void px-16 text-center">
      <p className="font-mono text-sm text-white/50">404</p>
      <h1 className="mt-4 max-w-[680px] text-balance text-5xl font-semibold leading-none tracking-[-0.02em] text-white">
        Esta página
        <br />
        no está en el campo
      </h1>
      <p className="mt-6 max-w-[680px] text-pretty text-lg leading-7 text-white/70">
        El enlace no existe. Vuelve al perfil de Lamine Yamal.
      </p>
      <Link
        href="/"
        className="pressable mt-10 rounded-full bg-white px-3 py-2 text-base font-semibold text-black"
      >
        Volver al perfil
      </Link>
    </main>
  );
}
