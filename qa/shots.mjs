import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:4173'
const routes = [
  ['home', '/'],
  ['treatments', '/treatments'],
  ['about', '/about'],
  ['gallery', '/gallery'],
  ['contact', '/contact'],
  ['book', '/book'],
]

const browser = await chromium.launch()

for (const [vp, width] of [['desktop', 1280], ['mobile', 390]]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  for (const [name, path] of routes) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' })
    // let scroll-reveal animations settle / lazy imgs load
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(900)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(400)
    await page.screenshot({ path: `qa/be_${vp}_${name}.png`, fullPage: true })
    console.log(`shot ${vp} ${name}`)
  }
  await ctx.close()
}

await browser.close()
console.log('done')
