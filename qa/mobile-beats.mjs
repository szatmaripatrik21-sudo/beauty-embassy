/**
 * Captures the 4 hero beats on a 390×844 mobile viewport.
 * Beat 1: page load (scroll = 0)
 * Beat 2: anchor expanded, title fading (~400px)
 * Beat 3: collage composition (~900px)
 * Beat 4: dissolving to treatments (~1600px)
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));

const beats = [
  { name: 'beat1-title',     scroll: 0    },
  { name: 'beat2-expanding', scroll: 400  },
  { name: 'beat3-collage',   scroll: 900  },
  { name: 'beat4-dissolve',  scroll: 1600 },
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();

await page.goto('http://localhost:5200', { waitUntil: 'networkidle' });
// wait for fonts/images
await page.waitForTimeout(1200);

for (const { name, scroll } of beats) {
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), scroll);
  await page.waitForTimeout(300);
  const path = join(__dir, `${name}.png`);
  await page.screenshot({ path, fullPage: false });
  console.log(`saved ${path}`);
}

await browser.close();
