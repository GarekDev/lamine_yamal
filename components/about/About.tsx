"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { player } from "@/lib/player";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  const [masia, debut, euro] = player.features;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [300, -260]);
  const renderTransform = useMotionTemplate`translateY(${y}px)`;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-void px-16 py-24"
    >
      <div className="mx-auto grid min-h-[90vh] max-w-[1440px] grid-cols-[minmax(320px,520px)_1fr] items-center gap-16">
        <motion.div
          className="relative isolate h-[85vh] min-h-[560px] will-change-transform"
          style={{ transform: renderTransform }}
        >
          <Image
            src="/images/about-render.png"
            alt="Render de Lamine Yamal con la camiseta del Barcelona, conduciendo el balón"
            fill
            sizes="520px"
            className="object-contain object-bottom"
          />
        </motion.div>

        <div className="relative z-10 max-w-[680px]">
          <Reveal>
            <h2 className="text-balance text-5xl font-semibold leading-none tracking-[-0.02em] text-white">
              Quién es
            </h2>
          </Reveal>
          <div className="mt-8 space-y-6">
            {player.about.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.08 * (index + 1)}>
                <p className="text-pretty text-lg leading-7 text-white/80">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8">
            <Reveal delay={0.12}>
              <p className="text-base font-semibold text-white">{masia.title}</p>
              <p className="mt-2 text-pretty text-sm leading-5 text-white/60">
                {masia.detail}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-base font-semibold text-white">{debut.title}</p>
              <p className="mt-2 text-pretty text-sm leading-5 text-white/60">
                {debut.detail}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24} className="mt-8">
            <p className="text-base font-semibold text-white">{euro.title}</p>
            <p className="mt-2 max-w-[320px] text-pretty text-sm leading-5 text-white/60">
              {euro.detail}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
