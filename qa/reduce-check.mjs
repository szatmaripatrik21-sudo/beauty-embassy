import { chromium } from 'playwright';

// Test with reduced-motion ON to see if that's what the phone sees
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true, hasTouch: true,
  reducedMotion: 'reduce', // simulate iOS "Reduce Motion" ON
});
const page = await ctx.newPage();
await page.goto('http://localhost:5200');
await page.waitForTimeout(200);

const result = await page.evaluate(() => {
  const h1 = document.querySelector('main h1');
  const eyebrow = document.querySelector('main .eyebrow');
  return {
    h1Opacity: h1 ? getComputedStyle(h1).opacity : null,
    eyebrowOpacity: eyebrow ? getComputedStyle(eyebrow).opacity : null,
    prefersReduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };
});
console.log('With reducedMotion:reduce →', result);
await ctx.close();
await browser.close();
