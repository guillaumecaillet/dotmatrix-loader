import { ensureStyles } from "./styles.js";
import { patterns } from "../patterns/index.js";

const SVG_NS = "http://www.w3.org/2000/svg";
let instanceId = 0;

function buildDelayMap(size, fn) {
  const raw = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      raw.push(fn(r, c, size));
    }
  }

  const finite = raw.filter((v) => v !== null && v !== undefined);
  const min = Math.min(...finite);
  const max = Math.max(...finite);
  const range = max - min || 1;

  return raw.map((v) =>
    v === null || v === undefined ? null : (v - min) / range
  );
}

export function createLoader(target, options = {}) {
  ensureStyles();

  const {
    pattern = "pulse",
    size = 5,
    dotSize = 6,
    gap = 4,
    duration = 1.2,
    colorOn = "#111111",
    colorOff = "#e2e2e2",
    minOpacity = 0.2,
    shape = "circle",
  } = options;

  const id = `dl-${++instanceId}`;
  const wrapper = document.createElementNS(SVG_NS, "svg");
  wrapper.setAttribute("class", "dl-loader");
  wrapper.dataset.dlId = id;

  const dim = size * dotSize + (size - 1) * gap;
  wrapper.setAttribute("viewBox", `0 0 ${dim} ${dim}`);
  wrapper.setAttribute("width", String(dim));
  wrapper.setAttribute("height", String(dim));
  wrapper.style.setProperty("--dl-on", colorOn);
  wrapper.style.setProperty("--dl-off", colorOff);
  wrapper.style.setProperty("--dl-duration", `${duration}s`);
  wrapper.style.setProperty("--dl-min-opacity", String(minOpacity));

  function render(patternKey) {
    wrapper.replaceChildren();
    const fn = typeof patternKey === "function" ? patternKey : patterns[patternKey];
    if (!fn) {
      throw new Error(`dotmatrix-loader: unknown pattern "${patternKey}"`);
    }
    const delays = buildDelayMap(size, fn);

    let i = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++, i++) {
        const cx = c * (dotSize + gap) + dotSize / 2;
        const cy = r * (dotSize + gap) + dotSize / 2;
        const dot = document.createElementNS(
          SVG_NS,
          shape === "square" ? "rect" : "circle"
        );
        dot.setAttribute("class", "dl-dot");

        if (shape === "square") {
          dot.setAttribute("x", String(cx - dotSize / 2));
          dot.setAttribute("y", String(cy - dotSize / 2));
          dot.setAttribute("width", String(dotSize));
          dot.setAttribute("height", String(dotSize));
        } else {
          dot.setAttribute("cx", String(cx));
          dot.setAttribute("cy", String(cy));
          dot.setAttribute("r", String(dotSize / 2));
        }

        const delay = delays[i];
        if (delay === null) {
          dot.dataset.static = "";
          dot.style.animation = "none";
          dot.style.fill = "var(--dl-off)";
          dot.style.opacity = "var(--dl-min-opacity)";
        } else {
          dot.style.animationDelay = `${delay * duration}s`;
        }

        wrapper.appendChild(dot);
      }
    }
  }

  render(pattern);

  if (target) {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) el.appendChild(wrapper);
  }

  return {
    el: wrapper,
    start() {
      wrapper.classList.remove("dl-paused");
    },
    stop() {
      wrapper.classList.add("dl-paused");
    },
    setPattern(p) {
      render(p);
    },
    destroy() {
      wrapper.remove();
    },
  };
}
