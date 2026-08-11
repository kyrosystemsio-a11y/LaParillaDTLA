// Verifies every menu category anchor scrolls to its own heading, at both the
// mobile (horizontal bar) and desktop (sticky rail) layouts. Run the server
// first, then: npm run verify:anchors
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
// See audit-shots.mjs — CHROMIUM_PATH is an escape hatch for pinned environments.
const launchOptions = process.env.CHROMIUM_PATH
  ? { executablePath: process.env.CHROMIUM_PATH }
  : {};

const browser = await chromium.launch(launchOptions);
let failures = 0;

for (const vp of [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
]) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/menu`, { waitUntil: "networkidle" });

  const slugs = await page.$$eval('nav[aria-label="Menu categories"] a', (as) =>
    as.map((a) => a.getAttribute("href").slice(1)),
  );

  console.log(`\n== ${vp.name} (${vp.width}px) — ${slugs.length} categories ==`);

  for (const slug of slugs) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click(`nav[aria-label="Menu categories"] a[href="#${slug}"]`);
    await page.waitForTimeout(450);

    const result = await page.evaluate((s) => {
      const section = document.getElementById(s);
      if (!section) return { ok: false, reason: "section missing" };
      const heading = section.querySelector("h2");
      const top = heading.getBoundingClientRect().top;
      // Heading must be on screen and not hidden behind the sticky header.
      return { ok: top >= 0 && top < window.innerHeight * 0.6, top: Math.round(top) };
    }, slug);

    if (!result.ok) {
      failures++;
      console.log(`  FAIL ${slug} — ${result.reason ?? `heading at y=${result.top}`}`);
    } else {
      console.log(`  ok   ${slug} (heading y=${result.top})`);
    }
  }
  await context.close();
}

await browser.close();
console.log(failures === 0 ? "\nAll anchors OK" : `\n${failures} anchor failures`);
process.exit(failures === 0 ? 0 : 1);
