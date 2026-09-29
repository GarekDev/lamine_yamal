"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 40;
const FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/images/stats-clip/f${String(i).padStart(3, "0")}.jpg`,
);

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
) {
  const imageRatio = img.width / img.height;
  const canvasRatio = width / height;
  let dw = width;
  let dh = height;
  let dx = 0;
  let dy = 0;
  if (imageRatio > canvasRatio) {
    dw = height * imageRatio;
    dx = (width - dw) / 2;
  } else {
    dh = width / imageRatio;
    dy = (height - dh) / 2;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(src));
    img.src = src;
  });
}

export function StatsClip({
  active,
  durationMs,
}: {
  active: boolean;
  durationMs: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[] | null>(null);
  const started = useRef(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all(FRAMES.map(loadImage))
      .then((images) => {
        if (!cancelled) imagesRef.current = images;
      })
      .catch(() => {
        /* Poster frame stays visible. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active || started.current) return;

    let cancelled = false;
    let frameId = 0;
    const startedAt = performance.now();
    started.current = true;

    const sizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return { width: 0, height: 0 };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width, height };
    };

    const paint = (img: HTMLImageElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const { width, height } = sizeCanvas();
      if (!width || !height) return;
      drawCover(ctx, img, width, height);
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const images = imagesRef.current;
      if (!images) {
        if (now - startedAt < durationMs) {
          frameId = requestAnimationFrame(tick);
        }
        return;
      }
      const t = Math.min(1, (now - startedAt) / durationMs);
      const lastIndex = images.length - 1;
      const index = Math.min(lastIndex, Math.round(t * lastIndex));
      paint(images[index]);
      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [active, durationMs]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FRAMES[0]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />
    </>
  );
}
