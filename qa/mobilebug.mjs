import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const TARGET = process.env.URL || 'http://localhost:4188/'
const OUT = dirname(fileURLToPath(import.meta.url))
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, isMobile: true })
const page = await ctx.newPage()
await page.goto(TARGET, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)

const boxes = await page.evaluate(() => {
  const pick = (el) => el ? (({ x, y, width, height, top, bottom }) => ({ x: Math.round(x), top: Math.round(top), bottom: Math.round(bottom), h: Math.round(height) }))(el.getBoundingClientRect()) : null
  const nav = document.querySelector('header a')
  const hero = document.querySelector('main section, section')
  const eyebrow = hero?.querySelector('.eyebrow')
  const h1 = hero?.querySelector('h1')
  return {
    innerH: window.innerHeight,
    nav: pick(nav),
    heroH: pick(hero)?.h,
    eyebrow: pick(eyebrow),
    h1: pick(h1),
  }
})
console.log(JSON.stringify(boxes, null, 2))
await page.screenshot({ path: `${OUT}/bug_393_current.png` })
await ctx.close()
await browser.close()
console.log('captured bug_393_current.png')
