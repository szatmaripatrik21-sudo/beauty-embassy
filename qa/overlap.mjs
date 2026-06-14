import { chromium } from 'playwright'

const TARGET = process.env.URL || 'http://localhost:4188/'
const browser = await chromium.launch()

// Fixed desktop width, three window HEIGHTS per the brief.
const heights = [800, 1080, 1440]

for (const H of heights) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: H }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(TARGET, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  // Document-space positions (stable; read at scrollY 0).
  const geo = await page.evaluate(() => {
    const hero = document.querySelector('main section, section')
    const eyebrow = [...document.querySelectorAll('#kezelesek .eyebrow, #kezelesek p')]
      .find((p) => /Signature ritu/i.test(p.textContent))
    const heroH = hero.getBoundingClientRect().height
    const ey = eyebrow.getBoundingClientRect().top + window.scrollY
    return { heroH, eyebrowDocY: ey }
  })

  const vh = H
  // Hero image is full-bleed (settle complete) at scrollY = 800 (SETTLE).
  const settleDone = 800
  // Eyebrow's top edge crosses the viewport BOTTOM (first pixel enters):
  const eyebrowEnters = Math.round(geo.eyebrowDocY - vh)
  // Eyebrow 80px into view (its whileInView reveal threshold, margin -80px):
  const eyebrowReveals = Math.round(geo.eyebrowDocY - vh + 80)

  // Verify live: scroll to the "enters" point, read the eyebrow rect + how much
  // of the hero section is still on screen.
  const probe = async (y) => {
    await page.evaluate((v) => window.scrollTo(0, v), y)
    await page.waitForTimeout(450)
    return page.evaluate(() => {
      const hero = document.querySelector('main section, section')
      const eyebrow = [...document.querySelectorAll('#kezelesek p')].find((p) => /Signature ritu/i.test(p.textContent))
      const hb = hero.getBoundingClientRect()
      const eb = eyebrow.getBoundingClientRect()
      return {
        heroBottomFromTop: Math.round(hb.bottom),       // px from viewport top to hero's bottom edge
        eyebrowTopFromTop: Math.round(eb.top),          // px from viewport top to eyebrow
        innerH: window.innerHeight,
      }
    })
  }

  const atEnter = await probe(eyebrowEnters)
  const atReveal = await probe(eyebrowReveals)

  console.log(`\n===== window 1440×${H} =====`)
  console.log(`hero section height : ${Math.round(geo.heroH)}px   (= 800 + ${H}vh)`)
  console.log(`image full-bleed at : scrollY ${settleDone}px`)
  console.log(`eyebrow enters view : scrollY ${eyebrowEnters}px  (bottom edge)`)
  console.log(`eyebrow reveal trig : scrollY ${eyebrowReveals}px  (80px in)`)
  console.log(`gap settle→enter    : ${eyebrowEnters - settleDone}px  = ${(((eyebrowEnters - settleDone) / vh) * 100).toFixed(1)}% of viewport`)
  console.log(`@enter  → hero bottom ${atEnter.heroBottomFromTop}px from top, eyebrow at ${atEnter.eyebrowTopFromTop}px (vh ${atEnter.innerH})`)
  console.log(`@reveal → hero bottom ${atReveal.heroBottomFromTop}px from top, eyebrow at ${atReveal.eyebrowTopFromTop}px`)
  await ctx.close()
}
await browser.close()
