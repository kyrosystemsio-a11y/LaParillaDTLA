// Screenshots every route at three widths and reports console errors and
// horizontal overflow. Run the dev or production server first, then:
//   npm run verify:shots
// Override with BASE_URL=... SHOT_DIR=... as needed.
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const SHOT_DIR = process.env.SHOT_DIR ?? "./.shots";
// Normally Playwright resolves its own browser (after `npx playwright install`).
// Set CHROMIUM_PATH only where a specific build is pinned by the environment.
const launchOptions = process.env.CHROMIUM_PATH
  ? { executablePath: process.env.CHROMIUM_PATH }
  : {};

const sizes = [
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];

const routes = [
  "/",
  "/menu",
  "/about",
  "/locations",
  "/locations/boyle-heights",
  "/locations/wilshire",
  "/catering",
];

mkdirSync(SHOT_DIR, { recursive: true });

const browser = await chromium.launch(launchOptions);
const problems = [];

for (const size of sizes) {
  const context = await browser.newContext({
    viewport: { width: size.width, height: size.height },
  });
  const page = await context.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") problems.push(`console ${size.name} ${page.url()}: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`pageerror ${size.name} ${page.url()}: ${e.message}`));

  for (const route of routes) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
    const slug = route === "/" ? "home" : route.replace(/\//g, "_").slice(1);
    await page.screenshot({ path: `${SHOT_DIR}/${slug}_${size.name}.png`, fullPage: true });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 1) problems.push(`h-overflow ${size.name} ${route}: ${overflow}px`);
  }
  await context.close();
}

await browser.close();

console.log(`Screenshots written to ${SHOT_DIR}`);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("No console errors, no horizontal overflow.");
