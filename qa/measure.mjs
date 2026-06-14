import { chromium } from 'playwright'

const TARGET = process.env.URL || 'http://localhost:4188/'

// ---- WCAG helpers -----------------------------------------------------------
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
const ratio = (a, b) => { const L1 = lum(a), L2 = lum(b); const hi = Math.max(L1, L2), lo = Math.min(L1, L2); return (hi + 0.05) / (lo + 0.05) }
const blend = (fg, bg, a) => fg.map((c, i) => Math.round(a * c + (1 - a) * bg[i]))

const ESPRESSO = [38, 31, 27]   // --ivory / --text-hi
const GOLD = [135, 101, 40]     // --gold

const browser = await chromium.launch()
for (const [name, vp] of [['wide', { width: 1800, height: 1000 }], ['desktop', { width: 1440, height: 820 }]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(TARGET, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1400)

  // bounding boxes of the hero text elements (scrollY 0)
  const rects = await page.evaluate(() => {
    const sec = document.querySelector('main section, section')
    const q = (sel, pred) => [...sec.querySelectorAll(sel)].find(pred || (() => true))
    const eyebrow = q('p.eyebrow')
    const h1 = q('h1')
    const sub = q('p', (p) => /Magas szint/.test(p.textContent))
    const r = (el) => { const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height } }
    const h1b = r(h1)
    return {
      eyebrow: r(eyebrow),
      h1_top: { ...h1b, h: h1b.h / 2 },                       // "Beauty" line
      h1_bottom: { x: h1b.x, y: h1b.y + h1b.h / 2, w: h1b.w, h: h1b.h / 2 }, // "Embassy" over chair
      subline: r(sub),
    }
  })

  // hide the text + hint layers (z-20); keep the scrim (z-10) visible
  await page.evaluate(() => {
    document.querySelectorAll('[class*="z-20"]').forEach((e) => (e.style.visibility = 'hidden'))
  })
  await page.waitForTimeout(150)
  const shot = (await page.screenshot()).toString('base64')

  // sample average bg color per rect in a throwaway canvas page
  const p2 = await browser.newPage()
  const samples = await p2.evaluate(async ({ shot, rects }) => {
    const img = new Image()
    await new Promise((res) => { img.onload = res; img.src = 'data:image/png;base64,' + shot })
    const cv = document.createElement('canvas'); cv.width = img.width; cv.height = img.height
    const cx = cv.getContext('2d'); cx.drawImage(img, 0, 0)
    const avg = (rc) => {
      const x = Math.max(0, Math.round(rc.x)), y = Math.max(0, Math.round(rc.y))
      const w = Math.max(1, Math.round(rc.w)), h = Math.max(1, Math.round(rc.h))
      const d = cx.getImageData(x, y, w, h).data
      let r = 0, g = 0, b = 0, n = 0
      for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; n++ }
      return [Math.round(r / n), Math.round(g / n), Math.round(b / n)]
    }
    const out = {}; for (const k in rects) out[k] = avg(rects[k]); return out
  }, { shot, rects })
  await p2.close()

  console.log(`\n===== ${name} (${vp.width}×${vp.height}) — bg sampled WITH ≤20% scrim, text hidden =====`)
  const row = (label, bg, fg, a, note) => {
    const eff = a < 1 ? blend(fg, bg, a) : fg
    const cr = ratio(eff, bg)
    console.log(
      `${label.padEnd(22)} bg=rgb(${bg.join(',')})  ${cr.toFixed(2)}:1  ${cr >= 4.5 ? 'PASS' : cr >= 3 ? 'AA-large' : 'FAIL'}  ${note}`
    )
  }
  row('eyebrow DARK@0.92', samples.eyebrow, ESPRESSO, 0.92, '(chosen)')
  row('eyebrow GOLD', samples.eyebrow, GOLD, 1, '(alt)')
  row('H1 "Beauty"', samples.h1_top, ESPRESSO, 1, '')
  row('H1 "Embassy"/chair', samples.h1_bottom, ESPRESSO, 1, '(worst case)')
  row('subline DARK@0.85', samples.subline, ESPRESSO, 0.85, '(chosen)')
  row('subline DARK@1.00', samples.subline, ESPRESSO, 1.0, '(fallback)')
  await ctx.close()
}
await browser.close()
