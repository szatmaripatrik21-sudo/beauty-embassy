import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const TARGET = process.env.URL || 'http://localhost:5174/'
const OUT = dirname(fileURLToPath(import.meta.url))
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()

async function shoot(name, width, height, scrolls) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
  })
  const page = await ctx.newPage()
  await page.goto(TARGET, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1800) // let hero entrance + images settle
  for (const y of scrolls) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(900)
    await page.screenshot({ path: `${OUT}/${name}_${y}.png` })
  }
  await ctx.close()
}

await shoot('mobile', 390, 844, [0, 900, 1900, 3000])
await shoot('desktop', 1280, 800, [0, 1100, 2400])

await browser.close()
console.log('done')
