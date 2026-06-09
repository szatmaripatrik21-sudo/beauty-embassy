import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true, hasTouch: true,
  reducedMotion: 'no-preference',
});
const page = await ctx.newPage();
await page.goto('http://localhost:5200');

// Check what component rendered, initial styles, and whether whileInView fired
const info = await page.evaluate(() => {
  const section = document.querySelector('main > section');
  const h1 = document.querySelector('main h1');
  const eyebrow = document.querySelector('main .eyebrow');
  const img = document.querySelector('main section img');
  return {
    sectionClass: section?.className?.slice(0, 80),
    h1Text: h1?.textContent,
    h1Style: h1 ? getComputedStyle(h1).opacity + ' / transform: ' + getComputedStyle(h1).transform : null,
    eyebrowStyle: eyebrow ? getComputedStyle(eyebrow).opacity : null,
    imgSrc: img?.getAttribute('src')?.slice(0, 50),
    bodyHasLargeSection: document.body.scrollHeight,
  };
});
console.log(JSON.stringify(info, null, 2));
await ctx.close();
await browser.close();
