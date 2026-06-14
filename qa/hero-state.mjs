import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:5230/', { waitUntil: 'networkidle' })
await page.waitForTimeout(900)

const shots = [
  { y: 0,   name: 'hs-0'   },
  { y: 400, name: 'hs-400' },
  { y: 800, name: 'hs-800' },
]
for (const s of shots) {
  await page.evaluate((y) => window.scrollTo(0, y), s.y)
  await page.waitForTimeout(500)
  const info = await page.evaluate(() => {
    const layer = document.querySelector('section .sticky [style*="clip-path"], section .sticky .absolute')
    const clipEl = [...document.querySelectorAll('section .sticky *')].find(el => getComputedStyle(el).clipPath !== 'none')
    return {
      scrollY: Math.round(window.scrollY),
      clip: clipEl ? getComputedStyle(clipEl).clipPath : 'NONE',
    }
  })
  console.log(s.name, '→ scrollY', info.scrollY, '| clip:', info.clip)
  await page.screenshot({ path: `qa/${s.name}.png` })
}
await browser.close()
console.log('done')
