"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "left";
};

export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
}: RevealProps) {
  const hiddenTransform =
    from === "left" ? "translateX(-48px)" : "translateY(64px)";

  return (
    <motion.div
      className={className ? `reveal-motion ${className}` : "reveal-motion"}
      initial={{
        opacity: 0,
        transform: hiddenTransform,
        filter: "blur(12px)",
      }}
      whileInView={{
        opacity: 1,
        transform: "translate(0px, 0px)",
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
