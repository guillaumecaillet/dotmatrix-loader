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
};
