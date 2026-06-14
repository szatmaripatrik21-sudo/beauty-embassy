import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const TARGET = process.env.URL || 'http://localhost:4188/'
const OUT = dirname(fileURLToPath(import.meta.url))

const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
const ratio = (a, b) => { const hi = Math.max(lum(a), lum(b)), lo = Math.min(lum(a), lum(b)); return (hi + 0.05) / (lo + 0.05) }
const ESPRESSO = [38, 31, 27]

const browser = await chromium.launch()
for (const [w, h] of [[393, 852], [360, 800]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: true })
  const page = await ctx.newPage()
  await page.goto(TARGET, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1400)

  // ---- element geometry + tap targets ----
  const geo = await page.evaluate(() => {
    const sec = document.querySelector('main section, section')
    const navPill = document.querySelector('header a[href="/book"], header a[href*="book"]')
    const navWord = document.querySelector('header a')
    const h1 = sec.querySelector('h1')
    const sub = sec.querySelector('p')
    const pill = sec.querySelector('a[href="/book"], a[href*="/book"]')
    const link = sec.querySelector('a[href="#kezelesek"]')
    const trust = [...sec.querySelectorAll('p')].pop()
    const eyebrow = sec.querySelector('.eyebrow')
    const r = (el) => el ? (({ top, bottom, height, width }) => ({ top: Math.round(top), bottom: Math.round(bottom), h: Math.round(height), w: Math.round(width) }))(el.getBoundingClientRect()) : null
    return {
      innerH: window.innerHeight,
      navPillVisible: !!(navPill && navPill.offsetParent !== null),
      eyebrowPresent: !!eyebrow,
      navWord: r(navWord), h1: r(h1), sub: r(sub), pill: r(pill), link: r(link), trust: r(trust),
    }
  })

  // ---- bg sampling behind H1 + subline (hide text, keep gradient) ----
  const rects = await page.evaluate(() => {
    const sec = document.querySelector('main section, section')
    const r = (el) => { const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height } }
    return { h1: r(sec.querySelector('h1')), sub: r(sec.querySelector('p')) }
  })
  await page.evaluate(() => document.querySelectorAll('[class*="z-10"]').forEach((e) => (e.style.visibility = 'hidden')))
  await page.waitForTimeout(120)
  const shot = (await page.screenshot()).toString('base64')
  const p2 = await browser.newPage()
  const bg = await p2.evaluate(async ({ shot, rects }) => {
    const img = new Image(); await new Promise((res) => { img.onload = res; img.src = 'data:image/png;base64,' + shot })
    const cv = document.createElement('canvas'); cv.width = img.width; cv.height = img.height
    const cx = cv.getContext('2d'); cx.drawImage(img, 0, 0)
    const avg = (rc) => { const d = cx.getImageData(Math.max(0, rc.x | 0), Math.max(0, rc.y | 0), Math.max(1, rc.w | 0), Math.max(1, rc.h | 0)).data; let r = 0, g = 0, b = 0, n = 0; for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; n++ } return [Math.round(r / n), Math.round(g / n), Math.round(b / n)] }
    return { h1: avg(rects.h1), sub: avg(rects.sub) }
  }, { shot, rects })
  await p2.close()
  await page.evaluate(() => document.querySelectorAll('[class*="z-10"]').forEach((e) => (e.style.visibility = '')))

  const top25 = Math.round(geo.innerH * 0.25)
  console.log(`\n===== ${w}×${h} =====`)
  console.log(`nav booking pill visible: ${geo.navPillVisible}  | eyebrow present: ${geo.eyebrowPresent}`)
  console.log(`top 25% = ${top25}px ; H1 top = ${geo.h1.top}px  → ${geo.h1.top >= top25 ? 'OK clear' : 'INTRUDES'}`)
  console.log(`H1 lines≈${Math.round(geo.h1.h / (0.98 * (w < 380 ? 47 : 51)))}  pill h=${geo.pill.h} (${geo.pill.h >= 44 ? 'tap OK' : 'TAP SMALL'})  link h=${geo.link.h} (${geo.link.h >= 44 ? 'tap OK' : 'TAP SMALL'})`)
  console.log(`contrast H1 ${ratio(ESPRESSO, bg.h1).toFixed(2)}:1 (bg ${bg.h1})  subline ${ratio(ESPRESSO, bg.sub).toFixed(2)}:1 (bg ${bg.sub})`)

  // ---- screenshots: 0, 50%, services ----
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/mv_${w}_0.png` })
  await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 0.5))); await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/mv_${w}_50.png` })
  await page.evaluate(() => { const el = document.getElementById('kezelesek'); el && window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 8) }); await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/mv_${w}_services.png` })
  await ctx.close()
}
await browser.close()
console.log('\nmobileverify done')
