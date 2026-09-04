let injected = false;

export function ensureStyles() {
  if (injected || typeof document === "undefined") return;
  injected = true;

  const style = document.createElement("style");
  style.setAttribute("data-dotmatrix-loader", "");
  style.textContent = `
.dl-loader { display: inline-block; }
.dl-dot {
  animation: dl-blink var(--dl-duration, 1.2s) linear infinite;
}
.dl-loader.dl-paused .dl-dot {
  animation-play-state: paused;
}
@keyframes dl-blink {
  0%, 49% { fill: var(--dl-off); opacity: var(--dl-min-opacity, 1); }
  50%, 99% { fill: var(--dl-on); opacity: 1; }
  100% { fill: var(--dl-off); opacity: var(--dl-min-opacity, 1); }
}
`;
  document.head.appendChild(style);
}
