import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:5173'
const routes = [
  ['home', '/'],
  ['treatments', '/treatments'],
  ['about', '/about'],
  ['gallery', '/gallery'],
  ['contact', '/contact'],
  ['book', '/book'],
]
const WIDTHS = [360, 375, 390, 414, 430]

const browser = await chromium.launch()

// ── 1. Horizontal-overflow audit across all target widths ──────────────────
console.log('--- overflow audit (scrollW > clientW means horizontal scroll) ---')
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 850 } })
  const page = await ctx.newPage()
  for (const [name, path] of routes) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' })
    await page.waitForTimeout(300)
    const { sw, cw } = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
    }))
    const flag = sw > cw + 1 ? `  <<< OVERFLOW +${sw - cw}px` : 'ok'
    console.log(`  ${width}  ${name.padEnd(11)} sw=${sw} cw=${cw}  ${flag}`)
  }
  await ctx.close()
}

// ── 2. Full-page shots at 390 (primary) ────────────────────────────────────
const ctx = await browser.newContext({ viewport: { width: 390, height: 850 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()
for (const [name, path] of routes) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(900)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
  await page.screenshot({ path: `qa/mf_${name}.png`, fullPage: true })
  console.log(`shot mf_${name}`)
}

// ── 3. Mobile menu overlay (open) on home ──────────────────────────────────
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(300)
await page.click('button[aria-label="Menü megnyitása"]')
await page.waitForTimeout(500)
await page.screenshot({ path: 'qa/mf_menu_open.png' })
console.log('shot mf_menu_open')

// ── 4. Testimonials expanded (after "show more") ───────────────────────────
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
const moreBtn = page.getByRole('button', { name: 'További vélemények' })
await moreBtn.scrollIntoViewIfNeeded()
await page.waitForTimeout(400)
await moreBtn.click()
await page.waitForTimeout(500)
await page.screenshot({ path: 'qa/mf_testimonials_expanded.png' })
console.log('shot mf_testimonials_expanded')

await ctx.close()
await browser.close()
console.log('done')
