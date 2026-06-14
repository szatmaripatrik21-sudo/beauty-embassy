import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const TARGET = process.env.URL || 'http://localhost:4188/'
const OUT = dirname(fileURLToPath(import.meta.url))
const browser = await chromium.launch()

// 1) Mobile 390px — full-bleed hero, overflow check, sticky-bar clearance
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true })
  const page = await ctx.newPage()
  await page.goto(TARGET, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    bodyW: document.body.scrollWidth,
  }))
  console.log('mobile 390 overflow:', JSON.stringify(overflow), overflow.scrollW <= overflow.clientW ? 'OK no x-overflow' : 'X-OVERFLOW!')
  await page.screenshot({ path: `${OUT}/p4_mobile_390.png` })
  // scroll a touch to confirm hero→services
  await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 0.95)))
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/p4_mobile_390_scrolled.png` })
  await ctx.close()
}

// 2) Reduced-motion desktop fallback
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 820 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto(TARGET, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `${OUT}/p4_reduced_desktop.png` })
  await ctx.close()
}
await browser.close()
console.log('phase4 shots done')
