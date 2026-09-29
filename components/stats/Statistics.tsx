"use client";

import { useEffect, useRef, useState } from "react";
import { player } from "@/lib/player";
import { StatsClip } from "@/components/stats/StatsClip";
import {
  barDelayMs,
  barDurationMs,
  STATS_MOTION_MS,
} from "@/lib/stats-motion";

const GLYPHS = "0123456789";
const BAR_FINALS = [
  0.28, 0.46, 0.38, 0.62, 0.54, 0.78, 0.44, 0.9, 0.58, 0.72, 0.4, 0.66, 0.34,
  0.84, 0.48, 0.7,
];

export function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="estadisticas"
      ref={sectionRef}
      className="relative h-dvh min-h-[720px] overflow-hidden bg-void"
    >
      <StatsClip active={active} durationMs={STATS_MOTION_MS} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.42) 36%, transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(20,0,30,0.82) 0%, rgba(20,0,30,0.28) 34%, transparent 58%)",
        }}
      />

      <div className="relative z-10 flex h-full max-w-[560px] flex-col justify-center px-16 py-24">
        <p className="text-sm font-semibold tracking-[0.08em] text-white/70">
          {player.season.label} · Club
        </p>
        <h2 className="mt-4 text-balance text-5xl font-semibold leading-none tracking-[-0.02em] text-white">
          Estadísticas
        </h2>

        <dl className="mt-12 grid grid-cols-3 gap-8">
          <Stat value={player.season.matches} label="Partidos" active={active} />
          <Stat value={player.season.goals} label="Goles" active={active} />
          <Stat value={player.season.assists} label="Asistencias" active={active} />
        </dl>

        <p className="mt-10 text-pretty text-sm leading-5 text-white/65">
          Carrera en el Barcelona: {player.career.matches} partidos,{" "}
          {player.career.goals} goles, {player.career.leagues} Ligas.
        </p>
      </div>

      <Bars active={active} />
    </section>
  );
}

function Stat({
  value,
  label,
  active,
}: {
  value: number;
  label: string;
  active: boolean;
}) {
  const target = String(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!active || !node) return;

    let elapsed = 0;
    const scrambleMs = STATS_MOTION_MS;
    const step = 50;
    const id = window.setInterval(() => {
      elapsed += step;
      if (elapsed >= scrambleMs) {
        node.textContent = target;
        window.clearInterval(id);
        return;
      }
      const locked = Math.floor((elapsed / scrambleMs) * target.length);
      const rest = target
        .slice(locked)
        .split("")
        .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
        .join("");
      node.textContent = target.slice(0, locked) + rest;
    }, step);

    return () => window.clearInterval(id);
  }, [active, target]);

  return (
    <div>
      <dt className="text-sm font-semibold text-white/60">{label}</dt>
      <dd
        className="mt-2 font-mono text-6xl font-semibold leading-none tabular-nums text-white"
        aria-label={target}
      >
        <span ref={ref} aria-hidden>
          {"0".repeat(target.length)}
        </span>
      </dd>
    </div>
  );
}

function Bars({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 z-10 flex h-40 items-end gap-2 px-8"
    >
      {BAR_FINALS.map((bar, index) => {
        const live = (["a", "b", "c"] as const)[index % 3];
        return (
          <span
            key={index}
            className={`stat-bar flex-1 origin-bottom rounded-t-sm bg-fuchsia-300/75 ${active ? `is-live-${live}` : ""}`}
            style={{
              height: "100%",
              ["--bar" as string]: String(bar),
              animationDelay: `${barDelayMs(index)}ms`,
              animationDuration: `${barDurationMs(index)}ms`,
            }}
          />
        );
      })}
    </div>
  );
}
