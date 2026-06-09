import { chromium } from 'playwright'
const b = await chromium.launch()
const widths = [360, 390, 768, 1024, 1280]
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } })
  const p = await ctx.newPage()
  await p.goto(process.env.URL||'http://localhost:5191/', { waitUntil: 'networkidle' })
  await p.waitForTimeout(1200)
  const r = await p.evaluate(() => ({
    docW: document.documentElement.scrollWidth,
    winW: window.innerWidth,
    h1s: document.querySelectorAll('h1').length,
    imgsNoAlt: [...document.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).length,
  }))
  const overflow = r.docW > r.winW + 1
  console.log(`w=${w}  scrollW=${r.docW}  overflow=${overflow ? 'YES ⚠' : 'no'}  h1=${r.h1s}  imgsMissingAlt=${r.imgsNoAlt}`)
  await ctx.close()
}
await b.close()
