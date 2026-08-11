// One-off script: generates tasteful SVG placeholder images for every slot
// in content/images.ts. Not part of the build — run manually if a slot's
// dimensions change. Output is intentionally abstract, never photo-like.
import { writeFileSync } from "node:fs";

const PLASTER = "#F0E4C3";
const INK = "#241E15";
const BASALT = "#37453D";
const EMBER = "#A63A2C";
const MARIGOLD = "#D9A23B";

const slots = [
  { file: "hero-boyle-heights.svg", w: 1600, h: 2000, label: "Boyle Heights — dining room", accent: EMBER },
  { file: "wilshire-building.svg", w: 1600, h: 1200, label: "1300 Wilshire — 1905 building", accent: BASALT },
  { file: "molcajete-pancho-villa.svg", w: 1200, h: 1200, label: "Molcajete del Señor Pancho Villa", accent: EMBER },
  { file: "comal-tortillas.svg", w: 1200, h: 1200, label: "Handmade tortillas, on the comal", accent: MARIGOLD },
  { file: "parrillada-brasero.svg", w: 1200, h: 1200, label: "Parrilladas Brasero", accent: EMBER },
  { file: "chaplin-memorabilia.svg", w: 1200, h: 1500, label: "Chaplin memorabilia wall", accent: BASALT },
  { file: "mariachi-boyle-heights.svg", w: 1200, h: 1200, label: "Mariachi — Boyle Heights", accent: MARIGOLD },
  { file: "guacamole.svg", w: 1200, h: 1200, label: "Guacamole, made to order", accent: BASALT },
  { file: "bar-margaritas.svg", w: 1200, h: 1200, label: "The bar", accent: EMBER },
  { file: "exterior-boyle-heights.svg", w: 1200, h: 900, label: "Exterior — Boyle Heights", accent: BASALT },
  { file: "exterior-wilshire.svg", w: 1200, h: 900, label: "Exterior — 1300 Wilshire", accent: MARIGOLD },
  { file: "catering-spread.svg", w: 1200, h: 900, label: "Catering", accent: EMBER },
];

function svg({ w, h, label, accent }) {
  const stripeId = `s${Math.round(Math.random() * 1e6)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Placeholder: ${label}">
  <defs>
    <pattern id="${stripeId}" width="18" height="18" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <rect width="18" height="18" fill="${PLASTER}"/>
      <line x1="0" y1="0" x2="0" y2="18" stroke="${accent}" stroke-opacity="0.08" stroke-width="9"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${stripeId})"/>
  <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="none" stroke="${accent}" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="2 10" stroke-linecap="round"/>
  <circle cx="${w / 2}" cy="${h / 2 - 28}" r="34" fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-width="2"/>
  <path d="M ${w / 2 - 16} ${h / 2 - 28} l 32 0 M ${w / 2} ${h / 2 - 44} l 0 32" stroke="${INK}" stroke-opacity="0.35" stroke-width="2"/>
  <text x="50%" y="${h / 2 + 44}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.max(16, Math.round(w / 42))}" fill="${INK}" fill-opacity="0.75">${label}</text>
  <text x="50%" y="${h / 2 + 44 + Math.max(20, Math.round(w / 34))}" text-anchor="middle" font-family="monospace" font-size="${Math.max(12, Math.round(w / 70))}" letter-spacing="2" fill="${INK}" fill-opacity="0.45">PHOTO PLACEHOLDER — ${w}×${h}</text>
</svg>`;
}

for (const slot of slots) {
  writeFileSync(new URL(`../public/images/${slot.file}`, import.meta.url), svg(slot));
  console.log("wrote", slot.file);
}
