"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { player } from "@/lib/player";

const HERO_RISE_MS = 2800;
const YAMAL_DELAY_MS = 1280;

function lockScroll() {
  document.documentElement.classList.add("scroll-locked");
}

function unlockScroll() {
  document.documentElement.classList.remove("scroll-locked");
}

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 140]);
  const imageTransform = useMotionTemplate`translateY(${y}px)`;
  const zoomRef = useRef<HTMLDivElement>(null);
  const yamalRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = zoomRef.current;
    if (!node) return;

    const animation = node.animate(
      [{ transform: "scale(1.1)" }, { transform: "scale(1)" }],
      {
        duration: 2200,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        fill: "both",
      },
    );

    return () => animation.cancel();
  }, []);

  useLayoutEffect(() => {
    lockScroll();
    window.scrollTo(0, 0);

    const scrollKeys = new Set([
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      " ",
    ]);

    const blockScroll = (event: Event) => {
      event.preventDefault();
    };

    const blockKeys = (event: KeyboardEvent) => {
      if (scrollKeys.has(event.key)) event.preventDefault();
    };

    const freezeScroll = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("keydown", blockKeys);
    window.addEventListener("scroll", freezeScroll, { passive: true });

    let unlocked = false;
    const release = () => {
      if (unlocked) return;
      unlocked = true;
      unlockScroll();
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("keydown", blockKeys);
      window.removeEventListener("scroll", freezeScroll);
    };

    const yamal = yamalRef.current;
    const onYamalEnd = (event: AnimationEvent) => {
      if (event.animationName !== "slide-up") return;
      release();
    };

    if (yamal) {
      yamal.addEventListener("animationend", onYamalEnd);
    }

    const fallback = window.setTimeout(
      release,
      YAMAL_DELAY_MS + HERO_RISE_MS + 120,
    );

    return () => {
      window.clearTimeout(fallback);
      if (yamal) yamal.removeEventListener("animationend", onYamalEnd);
      release();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-dvh min-h-[720px] overflow-hidden bg-void"
    >
      <motion.div
        className="hero-parallax absolute inset-0 overflow-hidden will-change-transform"
        style={{ transform: imageTransform }}
      >
        <div
          ref={zoomRef}
          className="hero-zoom absolute inset-0"
          style={{ transform: "scale(1.1)", transformOrigin: "30% 40%" }}
        >
          <Image
            src="/images/champion.jpg"
            alt="Lamine Yamal con la copa del mundo, sonriendo con la camiseta de España"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[30%_center]"
          />
        </div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.45) 28%, transparent 55%)",
        }}
      />

      <div className="absolute bottom-16 left-16 max-w-[680px]">
        <h1 className="text-8xl font-semibold leading-none tracking-[-0.02em] lg:text-9xl">
          <span className="hero-clip">
            <span className="hero-rise" style={{ animationDelay: "420ms" }}>
              <span className="hero-title">Lamine</span>
            </span>
          </span>{" "}
          <span className="hero-clip">
            <span
              ref={yamalRef}
              className="hero-rise"
              style={{ animationDelay: "1280ms" }}
            >
              <span className="hero-title">Yamal</span>
            </span>
          </span>
        </h1>
        <p className="hero-clip mt-4">
          <span
            className="hero-rise text-sm font-semibold tracking-[0.08em] text-white/70"
            style={{ animationDelay: "2280ms" }}
          >
            {player.role} · {player.club} · {player.country}
          </span>
        </p>
      </div>
    </section>
  );
}
