import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const TARGET = process.env.URL || 'http://localhost:4188/'
const OUT = dirname(fileURLToPath(import.meta.url))
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, isMobile: true })
const page = await ctx.newPage()
await page.goto(TARGET, { waitUntil: 'networkidle' })
await page.waitForTimeout(1600)
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(300)

const m = await page.evaluate(() => {
  const sec = document.querySelector('main section, section')
  const r = (el) => el ? (({ top, bottom, height, left, right }) => ({ top: Math.round(top), bottom: Math.round(bottom), h: Math.round(height), left: Math.round(left), right: Math.round(right) }))(el.getBoundingClientRect()) : null
  const h1 = sec.querySelector('h1')
  const sub = sec.querySelector('p')
  const pill = sec.querySelector('a[href="/book"], a[href^="/book"]')
  const link = sec.querySelector('a[href="#kezelesek"]')
  const trust = [...sec.querySelectorAll('p')].pop()
  const wordmark = document.querySelector('header a[href="/"]')
  const wmVisible = wordmark ? wordmark.getClientRects().length > 0 && getComputedStyle(wordmark).display !== 'none' : false
  const bar = document.querySelector('.fixed.bottom-0, [class*="fixed"][class*="bottom-0"]')
  const innerH = window.innerHeight
  const gap = (a, b) => Math.round(b.top - a.bottom)
  const H1 = r(h1), SUB = r(sub), PILL = r(pill), LINK = r(link), TRUST = r(trust), BAR = r(bar)
  return {
    innerH, fiftySvh: Math.round(innerH * 0.5),
    wordmarkVisible: wmVisible,
    H1top: H1.top, H1belowMid: H1.top >= innerH * 0.5,
    gaps: { h1_sub: gap(H1, SUB), sub_pill: gap(SUB, PILL), pill_link: gap(PILL, LINK), link_trust: gap(LINK, TRUST) },
    pillH: PILL.h, linkH: LINK.h,
    barTop: BAR ? BAR.top : null, barH: BAR ? BAR.h : null,
    trustBottom: TRUST.bottom,
    textToBarGap: BAR ? Math.round(BAR.top - TRUST.bottom) : null,
    subLines: Math.round(SUB.h / (15 * 1.5)),
    h1Lines: Math.round(H1.h / (Math.min(0.11 * 393, 52) * 1.02)),
  }
})
console.log(JSON.stringify(m, null, 2))
await page.screenshot({ path: `${OUT}/proof_393.png` })
await ctx.close()
await browser.close()
console.log('proof_393.png saved')
