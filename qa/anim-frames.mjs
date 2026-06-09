/**
 * Takes screenshots at t=0, t=200ms, t=800ms to see if FM animations
 * actually produce visible frames. Also checks if rAF fires in headless.
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dir = dirname(fileURLToPath(import.meta.url));

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2, isMobile: true, hasTouch: true,
  reducedMotion: 'no-preference', // explicitly disable reduced-motion in test
});
const page = await ctx.newPage();
await page.goto('http://localhost:5200');

// t=0: right after DOM ready
await page.screenshot({ path: join(__dir, 'anim-t0.png') });

// t=300ms
await page.waitForTimeout(300);
await page.screenshot({ path: join(__dir, 'anim-t300.png') });

// t=900ms (animations should be complete)
await page.waitForTimeout(600);
await page.screenshot({ path: join(__dir, 'anim-t900.png') });

const opAt900 = await page.evaluate(() => {
  const el = document.querySelector('section h1');
  return el ? parseFloat(getComputedStyle(el).opacity) : null;
});
console.log('h1 opacity at 900ms:', opAt900);

// Does rAF fire?
const rafFires = await page.evaluate(() =>
  new Promise(resolve => requestAnimationFrame(() => resolve(true)))
);
console.log('rAF fires in headless:', rafFires);

await ctx.close();
await browser.close();
