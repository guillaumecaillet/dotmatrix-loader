const dist = (r, c, size) => {
  const center = (size - 1) / 2;
  return Math.hypot(r - center, c - center);
};

const angle = (r, c, size) => {
  const center = (size - 1) / 2;
  return (Math.atan2(r - center, c - center) + Math.PI) / (2 * Math.PI);
};

const hash = (r, c, size) => {
  const x = Math.sin((r * size + c + 1) * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Each pattern maps a cell (row, col, size) to a raw delay value.
 * Raw values are normalized to a 0-1 fraction of the animation cycle
 * by the grid builder. Returning null marks a cell as static (no blink).
 */
export const patterns = {
  pulse: (r, c, size) => dist(r, c, size),
  wave: (r, c) => r + c,
  rowSweep: (r) => r,
  columnSweep: (r, c) => c,
  orbit: (r, c, size) => angle(r, c, size),
  checker: (r, c) => (r + c) % 2,
  heartbeat: (r, c, size) => (dist(r, c, size) < 0.8 ? 0 : null),
  sparkle: (r, c, size) => hash(r, c, size),
  diamond: (r, c, size) => {
    const center = (size - 1) / 2;
    return Math.abs(r - center) + Math.abs(c - center);
  },
  square: (r, c, size) => {
    const center = (size - 1) / 2;
    return Math.max(Math.abs(r - center), Math.abs(c - center));
  },
  chevron: (r, c) => Math.abs(r - c),
  cross: (r, c, size) => {
    const center = (size - 1) / 2;
    return Math.min(Math.abs(r - center), Math.abs(c - center));
  },
  spiral: (r, c, size) => dist(r, c, size) + angle(r, c, size),
  snake: (r, c, size) => (r % 2 === 0 ? r * size + c : r * size + (size - 1 - c)),
  ripple: (r, c) => Math.hypot(r, c),
  cornersIn: (r, c, size) => {
    const m = size - 1;
    return Math.min(
      Math.hypot(r, c),
      Math.hypot(r, c - m),
      Math.hypot(r - m, c),
      Math.hypot(r - m, c - m)
    );
  },
  zigzag: (r, c, size) => {
    const period = size * 2 - 2 || 1;
    const v = (r + c) % period;
    return v <= size - 1 ? v : period - v;
  },
  starburst: (r, c, size) => Math.min(Math.abs(r - c), Math.abs(r + c - (size - 1))),
  windmill: (r, c, size) => (angle(r, c, size) * 3) % 1,
  quadrants: (r, c, size) => {
    const mid = (size - 1) / 2;
    const top = r < mid, left = c < mid;
    if (top && left) return 0;
    if (top && !left) return 1;
    if (!top && !left) return 2;
    return 3;
  },
  unison: () => 0,
  columnSnake: (r, c, size) => (c % 2 === 0 ? c * size + r : c * size + (size - 1 - r)),
  collision: (r, c, size) => {
    const m = size - 1;
    return Math.min(Math.hypot(r, c), Math.hypot(r - m, c - m));
  },
  staircase: (r, c) => Math.floor((r + c) / 2),
};
