import { chromium } from 'playwright'
const BASE = process.env.BASE || 'http://localhost:5173'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()

// Homepage: capture sequential viewports so each section is readable.
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
const positions = [0, 820, 1640, 2460, 3280, 4100, 4920, 5740, 6560]
for (let i = 0; i < positions.length; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), positions[i])
  await page.waitForTimeout(550)
  await page.screenshot({ path: `qa/fx_home_${String(i).padStart(2, '0')}.png` })
}
console.log('home viewports shot')

// Signature page top
await page.goto(BASE + '/treatments/signature-rituals', { waitUntil: 'networkidle' })
await page.waitForTimeout(600)
await page.screenshot({ path: 'qa/fx_signature_top.png' })
console.log('signature top shot')

await ctx.close()
await browser.close()
console.log('done')
