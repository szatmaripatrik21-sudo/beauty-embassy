import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const TARGET = process.env.URL || 'http://localhost:5173/'
const OUT = dirname(fileURLToPath(import.meta.url))
mkdirSync(OUT, { recursive: true })

const views = {
  desktop: { width: 1440, height: 820 },
  tablet: { width: 900, height: 1024 },
  mobile: { width: 390, height: 844 },
}
// Capture by PROGRESS fraction of the hero's scrollable budget, so it adapts to
// any viewport. Extra stops past 1.0 confirm the handoff into the next section.
const fracs = [0, 0.16, 0.3, 0.45, 0.6, 0.72, 0.9, 1.0]

const browser = await chromium.launch()
const only = process.env.VIEW
for (const [name, viewport] of Object.entries(views)) {
  if (only && only !== name) continue
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1.25 })
  const page = await ctx.newPage()
  await page.goto(TARGET, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1800)

  // hero wrapper = first <section>; budget = its height − viewport height
  const budget = await page.evaluate(() => {
    const s = document.querySelector('main section, section')
    return Math.max(0, (s?.offsetHeight || 0) - window.innerHeight)
  })

  for (const f of fracs) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(budget * f))
    await page.waitForTimeout(700)
    await page.screenshot({ path: `${OUT}/c_${name}_${String(Math.round(f * 100)).padStart(3, '0')}.png` })
  }
  // one stop into the next section
  await page.evaluate((y) => window.scrollTo(0, y), Math.round(budget + viewport.height * 0.7))
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${OUT}/c_${name}_next.png` })
  console.log('done', name, 'budget', budget)
  await ctx.close()
}
await browser.close()
