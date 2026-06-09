/**
 * Captures hero + services at 375, 390, 412, 768 (mobile) and 1440 (desktop).
 * Each at two scroll positions: top (hero) and ~hero-bottom (services start).
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));

const viewports = [
  { label: '375', w: 375, h: 812,  mobile: true  },
  { label: '390', w: 390, h: 844,  mobile: true  },
  { label: '412', w: 412, h: 915,  mobile: true  },
  { label: '768', w: 768, h: 1024, mobile: true  },
  { label: '1440', w: 1440, h: 900, mobile: false },
];

const browser = await chromium.launch({ headless: true });

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    deviceScaleFactor: vp.mobile ? 2 : 1,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5200', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // hero top
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(200);
  await page.screenshot({ path: join(__dir, `vp-${vp.label}-hero.png`), fullPage: false });

  // services (scroll past hero)
  const scrollTo = vp.mobile ? 900 : 2200;
  await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), scrollTo);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(__dir, `vp-${vp.label}-services.png`), fullPage: false });

  await ctx.close();
  console.log(`done ${vp.label}`);
}

// horizontal overflow check at 375
const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true });
const page = await ctx.newPage();
await page.goto('http://localhost:5200', { waitUntil: 'networkidle' });
const overflow = await page.evaluate(() =>
  document.documentElement.scrollWidth > window.innerWidth
);
console.log(`375px horizontal overflow: ${overflow}`);
await ctx.close();

await browser.close();
