import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:5173'
const browser = await chromium.launch()

for (const [vp, width] of [['desktop', 1280], ['tablet', 820], ['mobile', 390]]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  // Scroll the whole page once so lazy imgs + scroll-reveal settle
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1200)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)
  // Find the gallery section by its heading text
  const handle = await page.evaluateHandle(() => {
    const h = [...document.querySelectorAll('h2')].find((e) =>
      e.textContent?.includes('Pillanatok a szalonból'),
    )
    return h?.closest('section') ?? null
  })
  const el = handle.asElement()
  if (el) {
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)
    await el.screenshot({ path: `qa/gx_${vp}.png` })
    console.log(`shot ${vp}`)
  } else {
    console.log(`gallery section NOT FOUND @ ${vp}`)
  }
  await ctx.close()
}

await browser.close()
console.log('done')
