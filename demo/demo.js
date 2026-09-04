import { createLoader, patterns } from "../src/index.js";

const gallery = document.getElementById("gallery");
const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const colorOn = dark ? "#f2f2f2" : "#111111";
const colorOff = dark ? "#3a3a3a" : "#e2e2e2";

for (const name of Object.keys(patterns)) {
  const card = document.createElement("div");
  card.className = "card";

  const loaderMount = document.createElement("div");
  card.appendChild(loaderMount);

  const label = document.createElement("span");
  label.textContent = name;
  card.appendChild(label);

  gallery.appendChild(card);

  createLoader(loaderMount, {
    pattern: name,
    size: 5,
    dotSize: 8,
    gap: 5,
    duration: 1.4,
    colorOn,
    colorOff,
  });
}
