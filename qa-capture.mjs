import { chromium } from 'playwright'

// Usage: node qa-capture.mjs <prefix>   e.g. node qa-capture.mjs before
const prefix = process.argv[2] || 'shot'
const PORT = process.argv[3] || '5173'
const URL = `http://localhost:${PORT}`
const QA = 'C:/Users/szatm/Documents/beautysalon/qa'

const routes = [
  { path: '/', name: 'home' },
  { path: '/treatments', name: 'treatments' },
  { path: '/about', name: 'about' },
  { path: '/gallery', name: 'gallery' },
  { path: '/contact', name: 'contact' },
  { path: '/book', name: 'book' },
]

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
const page = await ctx.newPage()

for (const r of routes) {
  await page.goto(URL + r.path, { waitUntil: 'load' })
  // reveal all in-view animations: scroll through, then back to top
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms))
    const h = document.body.scrollHeight
    for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await sleep(60) }
    window.scrollTo(0, 0)
    await sleep(150)
  })
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${QA}/${prefix}_${r.name}.png`, fullPage: true })
  console.log('saved', `${prefix}_${r.name}`)
}

await browser.close()
console.log('DONE')
