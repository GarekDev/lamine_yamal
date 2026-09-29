"use client";

import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { creator } from "@/lib/creator";
import { Reveal } from "@/components/motion/Reveal";

const iconByKey = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  whatsapp: WhatsappLogoIcon,
} as const;

export function Creator() {
  return (
    <section
      id="creador"
      aria-labelledby="creador-titulo"
      className="border-t border-white/8 bg-panel px-16 py-24"
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold tracking-[0.08em] text-white/50">
              Creado por
            </p>
            <h2
              id="creador-titulo"
              className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-[-0.02em] text-white"
            >
              {creator.name}
            </h2>
            <p className="mt-3 text-pretty text-base leading-6 text-white/60">
              {creator.role}. Este perfil editorial fue desarrollado como proyecto
              personal.
            </p>
          </div>

          <nav
            aria-label="Contacto del desarrollador"
            className="flex flex-wrap gap-3"
          >
            {(
              Object.entries(creator.links) as [
                keyof typeof creator.links,
                (typeof creator.links)[keyof typeof creator.links],
              ][]
            ).map(([key, link]) => {
              const Icon = iconByKey[key];
              return (
                <a
                  key={key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pressable inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <Icon size={18} weight="regular" aria-hidden />
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </Reveal>
    </section>
  );
}
