/**
 * Screenshot Capture Script
 *
 * Captures screenshots from the live Outdoor Renovations site
 * and saves them to public/screenshots/ for use in the showcase.
 *
 * Usage: node scripts/capture-screenshots.mjs
 */

import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "..", "public", "screenshots");

const BASE_URL = "https://outdoor-renovations.vercel.app";

const DESKTOP_VIEWPORT = { width: 1440, height: 900 };
const MOBILE_VIEWPORT = { width: 390, height: 844 };

const screenshots = [
  // Desktop screenshots
  {
    name: "homepage-hero.png",
    url: BASE_URL,
    viewport: DESKTOP_VIEWPORT,
    waitFor: 2000,
  },
  {
    name: "homepage-services.png",
    url: BASE_URL,
    viewport: DESKTOP_VIEWPORT,
    scrollTo: 900,
    waitFor: 2000,
  },
  {
    name: "homepage-reviews.png",
    url: BASE_URL,
    viewport: DESKTOP_VIEWPORT,
    scrollTo: 1500,
    waitFor: 2000,
  },
  {
    name: "homepage-about.png",
    url: BASE_URL,
    viewport: DESKTOP_VIEWPORT,
    scrollTo: 2800,
    waitFor: 2000,
  },
  {
    name: "homepage-contact-cta.png",
    url: BASE_URL,
    viewport: DESKTOP_VIEWPORT,
    scrollTo: 1800,
    waitFor: 2000,
  },
  {
    name: "service-detail.png",
    url: `${BASE_URL}/services/landscape-design`,
    viewport: DESKTOP_VIEWPORT,
    waitFor: 2000,
  },
  {
    name: "contact-page.png",
    url: `${BASE_URL}/contact`,
    viewport: DESKTOP_VIEWPORT,
    waitFor: 2000,
  },
  // Mobile screenshots
  {
    name: "mobile-homepage.png",
    url: BASE_URL,
    viewport: MOBILE_VIEWPORT,
    waitFor: 2000,
  },
  {
    name: "mobile-services.png",
    url: BASE_URL,
    viewport: MOBILE_VIEWPORT,
    scrollTo: 700,
    waitFor: 2000,
  },
  {
    name: "mobile-service-detail.png",
    url: `${BASE_URL}/services/landscape-design`,
    viewport: MOBILE_VIEWPORT,
    waitFor: 2000,
  },
];

async function captureScreenshots() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const shot of screenshots) {
    console.log(`Capturing: ${shot.name}`);
    const page = await browser.newPage();
    await page.setViewport(shot.viewport);

    try {
      await page.goto(shot.url, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise((r) => setTimeout(r, shot.waitFor || 1000));

      if (shot.scrollTo) {
        await page.evaluate((y) => window.scrollTo(0, y), shot.scrollTo);
        await new Promise((r) => setTimeout(r, 500));
      }

      await page.screenshot({
        path: join(OUTPUT_DIR, shot.name),
        type: "png",
      });

      console.log(`  ✓ Saved ${shot.name}`);
    } catch (err) {
      console.error(`  ✗ Failed: ${shot.name}`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("\nDone! Screenshots saved to public/screenshots/");
}

captureScreenshots().catch(console.error);
