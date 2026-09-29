export const BAR_COUNT = 16;
export const BAR_STAGGER_MS = 55;

export function barDurationMs(index: number) {
  return 1750 + (index % 5) * 100;
}

export function barDelayMs(index: number) {
  return index * BAR_STAGGER_MS;
}

export const STATS_MOTION_MS = Math.max(
  ...Array.from(
    { length: BAR_COUNT },
    (_, index) => barDelayMs(index) + barDurationMs(index),
  ),
);
