import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const BASE = process.env.URL || 'http://localhost:4188/'
const OUT = dirname(fileURLToPath(import.meta.url))
const browser = await chromium.launch()

// 1) Mobile hero — new honest trust line
{
  const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, isMobile: true })
  const p = await ctx.newPage()
  await p.goto(BASE, { waitUntil: 'networkidle' }); await p.waitForTimeout(1300)
  await p.screenshot({ path: `${OUT}/truth_mobile_hero.png` })
  await ctx.close()
}
// 2) Testimonials (desktop) — scroll it into view
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  const p = await ctx.newPage()
  await p.goto(BASE, { waitUntil: 'networkidle' }); await p.waitForTimeout(1300)
  await p.evaluate(() => { const h = [...document.querySelectorAll('h2')].find(e => /visszajárnak/i.test(e.textContent)); h && h.scrollIntoView({ block: 'start' }) })
  await p.waitForTimeout(700)
  await p.screenshot({ path: `${OUT}/truth_testimonials.png` })
  // 3) About stats
  await p.goto(BASE + 'about', { waitUntil: 'networkidle' }); await p.waitForTimeout(1200)
  await p.evaluate(() => { const el = [...document.querySelectorAll('*')].find(e => e.children.length >= 4 && /Alapítva/.test(e.textContent) && /Szakterület/.test(e.textContent)); el && el.scrollIntoView({ block: 'center' }) })
  await p.waitForTimeout(600)
  await p.screenshot({ path: `${OUT}/truth_about_stats.png` })
  await ctx.close()
}
await browser.close()
console.log('truthshots done')
