import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const TARGET = process.env.URL || 'http://localhost:4188/'
const OUT = dirname(fileURLToPath(import.meta.url))
const browser = await chromium.launch()

for (const [name, vp] of [['wide', { width: 1800, height: 1000 }], ['desktop', { width: 1440, height: 820 }]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.goto(TARGET, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1400)
  // bottom-left quadrant where the headline + CTAs live
  await page.screenshot({
    path: `${OUT}/crop_${name}.png`,
    clip: { x: 0, y: Math.round(vp.height * 0.42), width: Math.round(vp.width * 0.62), height: Math.round(vp.height * 0.58) },
  })
  await ctx.close()
}
await browser.close()
console.log('cropped')
