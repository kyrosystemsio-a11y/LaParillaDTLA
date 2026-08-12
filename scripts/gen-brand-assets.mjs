// Generates the provisional brand mark (app/icon.svg) and the social sharing
// card (app/opengraph-image.png). Not part of the build — run manually:
//   CHROMIUM_PATH=... node scripts/gen-brand-assets.mjs
//
// PROVISIONAL: no official La Parrilla logo exists publicly. The monogram below
// is a stand-in built from the site's own type and palette so the browser tab
// is not the framework default. Replace both assets when the owner supplies
// real brand assets — nothing else needs to change.
import { writeFileSync } from "node:fs";
import { chromium } from "playwright";

const PLASTER = "#F0E4C3";
const INK = "#241E15";
const EMBER = "#A63A2C";

// --- Favicon: "LP" monogram -------------------------------------------------
// Plain SVG so it stays crisp at every size and weighs almost nothing.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="${INK}"/>
  <rect x="4" y="4" width="56" height="56" fill="none" stroke="${EMBER}" stroke-width="2"/>
  <text x="32" y="44" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="${PLASTER}">LP</text>
</svg>`;
writeFileSync(new URL("../app/icon.svg", import.meta.url), icon);
console.log("wrote app/icon.svg");

// --- OG card ----------------------------------------------------------------
// Copy is owner-approved and deliberately carries no founding date.
const card = `<!doctype html><html><head><meta charset="utf-8"><style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Space+Mono:wght@400&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; background:${PLASTER}; color:${INK};
         font-family:Fraunces, Georgia, serif; display:flex; flex-direction:column;
         justify-content:center; padding:0 96px; position:relative; }
  .rule { position:absolute; left:0; right:0; height:14px; background:${INK};
          -webkit-mask-image: radial-gradient(circle at 12px 0, transparent 5px, #000 5.5px);
          mask-image: radial-gradient(circle at 12px 0, transparent 5px, #000 5.5px);
          -webkit-mask-size:24px 14px; mask-size:24px 14px;
          -webkit-mask-repeat:repeat-x; mask-repeat:repeat-x; }
  .top { top:0; } .bottom { bottom:0; transform:rotate(180deg); }
  .eyebrow { font-family:'Space Mono', monospace; font-size:22px; letter-spacing:.22em;
             text-transform:uppercase; color:${EMBER}; margin-bottom:28px; }
  h1 { font-size:132px; line-height:.95; letter-spacing:-.02em; font-weight:400; }
  p { font-size:38px; margin-top:28px; color:${INK}; opacity:.75; font-family:system-ui, sans-serif; }
</style></head><body>
  <div class="rule top"></div>
  <div class="eyebrow">Los Angeles</div>
  <h1>La Parrilla</h1>
  <p>Mexican food in Los Angeles</p>
  <div class="rule bottom"></div>
</body></html>`;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(card, { waitUntil: "networkidle" });
await page.waitForTimeout(600); // let the webfont settle before capture
await page.screenshot({
  path: new URL("../app/opengraph-image.png", import.meta.url).pathname,
});
await browser.close();
console.log("wrote app/opengraph-image.png");
