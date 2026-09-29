"use client";

import { SoccerBall } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const links = [
  { href: "/#hero", id: "hero", label: "Perfil" },
  { href: "/#about", id: "about", label: "Quién es" },
  { href: "/#estadisticas", id: "estadisticas", label: "Estadísticas" },
] as const;

export function IslandNav() {
  const [active, setActive] = useState<(typeof links)[number]["id"]>("hero");

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const id = visible.target.id;
        if (id === "hero" || id === "about" || id === "estadisticas") {
          setActive(id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Principal"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center"
    >
      <div className="glass pointer-events-auto mt-6 flex w-max items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 backdrop-blur-[20px] backdrop-saturate-150">
        <span className="flex items-center gap-2 pr-2 text-sm font-semibold text-white">
          <SoccerBall size={18} weight="fill" aria-hidden />
          LY
        </span>
        <ul className="flex items-center gap-1">
          {links.map((link) => {
            const isCurrent = active === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`nav-link pressable inline-flex rounded-full px-3 py-2 text-sm font-semibold transition-[color,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isCurrent
                      ? "bg-white/15 text-white"
                      : "text-white/60"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
