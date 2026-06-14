import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const TARGET = process.env.URL || 'http://localhost:4173/'
const OUT = dirname(fileURLToPath(import.meta.url))
mkdirSync(OUT, { recursive: true })

const views = {
  wide: { width: 1800, height: 1000 },
  desktop: { width: 1440, height: 820 },
  mobile: { width: 390, height: 844 },
}
// The clip hero is driven off global scrollY: 0 = framed opening, 400 = text
// gone, 800 = full bleed. Capture those exact px breakpoints + a handoff frame.
const stops = [0, 150, 400, 800]

const browser = await chromium.launch()
const only = process.env.VIEW
for (const [name, viewport] of Object.entries(views)) {
  if (only && only !== name) continue
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(TARGET, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)

  for (const y of stops) {
    await page.evaluate((v) => window.scrollTo(0, v), y)
    await page.waitForTimeout(650)
    await page.screenshot({ path: `${OUT}/clip_${name}_${String(y).padStart(4, '0')}.png` })
  }
  // handoff: scroll one viewport past the settle point to confirm services entry
  await page.evaluate((v) => window.scrollTo(0, v), 800 + Math.round(viewport.height * 0.6))
  await page.waitForTimeout(650)
  await page.screenshot({ path: `${OUT}/clip_${name}_next.png` })
  console.log('done', name)
  await ctx.close()
}
await browser.close()
