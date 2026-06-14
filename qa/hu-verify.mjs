import { chromium } from 'playwright'

const BASE = process.env.BASE || 'http://localhost:5173'
const routes = [
  ['home', '/'],
  ['kezelesek', '/kezelesek'],
  ['signature', '/kezelesek/signature-ritualek'],
  ['rolunk', '/rolunk'],
  ['galeria', '/galeria'],
  ['kapcsolat', '/kapcsolat'],
  ['foglalas', '/foglalas'],
]
const OLD = ['/treatments', '/about', '/gallery', '/contact', '/book']

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } })
const page = await ctx.newPage()

console.log('--- route render check ---')
const leaks = new Set()
for (const [name, path] of routes) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(300)
  const info = await page.evaluate((oldSlugs) => {
    const h = document.querySelector('h1, h2')
    const hrefs = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'))
    const leaked = hrefs.filter((href) => oldSlugs.some((s) => href === s || href.startsWith(s + '#') || href.startsWith(s + '/')))
    return { title: document.title, heading: h ? h.textContent.trim().slice(0, 40) : '(none)', leaked }
  }, OLD)
  info.leaked.forEach((l) => leaks.add(l))
  const is404 = /404|nem találha/i.test(info.heading)
  console.log(`  ${path.padEnd(34)} ${is404 ? 'NOT-FOUND!' : 'ok'}  h="${info.heading}"`)
}

console.log('\n--- deep link /kezelesek#body ---')
await page.goto(BASE + '/kezelesek#body', { waitUntil: 'networkidle' })
await page.waitForTimeout(900)
const landed = await page.evaluate(() => {
  const el = document.getElementById('body')
  return el ? `#body rect.top=${Math.round(el.getBoundingClientRect().top)}px` : 'NO #body'
})
console.log(' ', landed)

console.log('\n--- leaked old English-slug links across all routes ---')
console.log(leaks.size === 0 ? '  none ✓' : '  ' + [...leaks].join(', '))

await ctx.close()
await browser.close()
console.log('done')
