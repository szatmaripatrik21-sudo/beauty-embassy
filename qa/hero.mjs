import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const TARGET = process.env.URL || 'http://localhost:5173/'
const OUT = dirname(fileURLToPath(import.meta.url))
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 820 }, deviceScaleFactor: 1.5 })
const page = await ctx.newPage()
await page.goto(TARGET, { waitUntil: 'networkidle' })
await page.waitForTimeout(2200)

// hero wrapper = 1500px + 100vh. Sample the expand + parallax, then sections.
const stops = [0, 450, 1000, 1500, 2050, 2700, 3500, 4600, 5800, 7000]
for (const y of stops) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `${OUT}/b_${String(y).padStart(4, '0')}.png` })
  console.log('shot', y)
}
await browser.close()
console.log('done')
