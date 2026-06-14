import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:5173'
const WIDTHS = [360, 375, 390, 414, 430]
const routes = [
  ['home', '/'],
  ['signature', '/treatments/signature-rituals'],
  ['treatments', '/treatments'],
  ['about', '/about'],
  ['gallery', '/gallery'],
  ['contact', '/contact'],
  ['book', '/book'],
]

const browser = await chromium.launch()

// ── Overflow audit + homepage height (the "dramatically shorter" metric) ───
console.log('--- overflow audit + page heights @ each width ---')
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 850 } })
  const page = await ctx.newPage()
  for (const [name, path] of routes) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)
    const { sw, cw, sh } = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
      sh: document.body.scrollHeight,
    }))
    const flag = sw > cw + 1 ? `OVERFLOW +${sw - cw}px` : 'ok'
    const tag = name === 'home' ? ` homeHeight=${sh}px (${(sh / 850).toFixed(1)} viewports)` : ''
    console.log(`  ${width}  ${name.padEnd(11)} sw=${sw} cw=${cw}  ${flag}${tag}`)
  }
  await ctx.close()
}

// ── Full-page shots @ 390 ──────────────────────────────────────────────────
const ctx = await browser.newContext({ viewport: { width: 390, height: 850 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
for (const [name, path] of [['home', '/'], ['signature', '/treatments/signature-rituals']]) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(900)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
  await page.screenshot({ path: `qa/rf_${name}.png`, fullPage: true })
  console.log(`shot rf_${name}`)
}

// ── Deep-link test: /treatments#body should land on the Test & Masszázs block ─
await page.goto(BASE + '/treatments#body', { waitUntil: 'networkidle' })
await page.waitForTimeout(900)
const landed = await page.evaluate(() => {
  const el = document.getElementById('body')
  if (!el) return 'NO #body element'
  const top = el.getBoundingClientRect().top
  return `#body rect.top=${Math.round(top)}px (≈0–120 = landed under sticky nav)`
})
console.log('deep-link /treatments#body →', landed)
await page.screenshot({ path: 'qa/rf_treatments_deeplink.png' })
console.log('shot rf_treatments_deeplink')

await ctx.close()
await browser.close()
console.log('done')
