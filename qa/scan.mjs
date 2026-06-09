import { chromium } from 'playwright'
const BASE = process.env.BASE || 'http://localhost:4174'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
// total height
const H = await page.evaluate(() => document.body.scrollHeight)
const stops = [2150, 2900, 3650, 4400, 5150, 5900]
let n = 0
for (const y of stops) {
  if (y > H) break
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await page.waitForTimeout(700)
  await page.screenshot({ path: `qa/be_scan_${n}.png` })
  n++
}
console.log('height', H, 'shots', n)
await ctx.close()
await browser.close()
