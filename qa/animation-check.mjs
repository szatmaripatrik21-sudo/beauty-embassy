/**
 * Verifies mobile hero elements START at opacity 0 (animation is actually running)
 * and reach opacity 1 after animation completes. Also checks desktop hero is unchanged.
 */
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

// ── Mobile: hero elements should start at opacity 0 ──
const mobileCtx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2, isMobile: true, hasTouch: true,
});
const mob = await mobileCtx.newPage();
await mob.goto('http://localhost:5200');

// Grab opacity of hero elements immediately on load (before animations complete)
const initialOpacities = await mob.evaluate(() => {
  const eyebrow = document.querySelector('section p.eyebrow');
  const h1 = document.querySelector('section h1');
  return {
    eyebrow: eyebrow ? parseFloat(getComputedStyle(eyebrow).opacity) : null,
    h1: h1 ? parseFloat(getComputedStyle(h1).opacity) : null,
  };
});
console.log('Mobile initial opacities (expect < 1):', initialOpacities);

// After animations complete
await mob.waitForTimeout(1500);
const finalOpacities = await mob.evaluate(() => {
  const eyebrow = document.querySelector('section p.eyebrow');
  const h1 = document.querySelector('section h1');
  return {
    eyebrow: eyebrow ? parseFloat(getComputedStyle(eyebrow).opacity) : null,
    h1: h1 ? parseFloat(getComputedStyle(h1).opacity) : null,
  };
});
console.log('Mobile final opacities (expect 1):', finalOpacities);

// Horizontal overflow
const overflow = await mob.evaluate(() =>
  document.documentElement.scrollWidth > window.innerWidth
);
console.log('Mobile horizontal overflow:', overflow);
await mobileCtx.close();

// ── Desktop: confirm clip-path hero still renders ──
const deskCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const desk = await deskCtx.newPage();
await desk.goto('http://localhost:5200', { waitUntil: 'networkidle' });
await desk.waitForTimeout(500);
const desktopHeroType = await desk.evaluate(() => {
  const sticky = document.querySelector('.sticky');
  return sticky ? 'has sticky CenterImage (desktop hero)' : 'no sticky — unexpected';
});
console.log('Desktop hero:', desktopHeroType);
await deskCtx.close();

await browser.close();
