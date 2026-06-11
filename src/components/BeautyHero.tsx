import { useEffect, useState } from 'react'
import {
  MotionConfig,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { hero, img, images } from '@/data/salonData'
import { useIsMobile } from '@/hooks/useIsMobile'

const EASE = [0.22, 1, 0.36, 1] as const

/* ================================================================
   BeautyHero

   Routing:
     mobile  (≤767px)        → BeautyHeroMobile     (clean vertical flow)
     desktop + reduce-motion → BeautyHeroFullBleed  (editorial full-bleed)
     desktop / tablet        → BeautyHeroDesktop    (clip-expand to full bleed)

   PHASE 2 — clip-expand hero.
   The center photo OPENS as a large framed editorial image (8% inset, 24px
   radius) that fills the frame — never a "small box in a void". On scroll it
   settles into full bleed over the first ~800px (clip 8%→0, radius 24→0, the
   image itself zooms 1.15→1.0). The headline/CTA live on a SEPARATE layer in
   dark ink (never clipped, never gold-on-image) and fade out faster than the
   image expands (gone by ~400px) so the full-bleed moment is clean.

   Driven off the global window scrollY (hero is the first section on Home), per
   the proven SmoothScrollHero pattern. Every useTransform maps the full range
   incl. a tail stop so faded/settled values can't drift back (see the framer
   scroll gotchas note).
   ================================================================ */

// Scroll distance (px) over which the framed photo settles to full bleed.
const SETTLE = 800
// Text is gone well before the image finishes expanding.
const TEXT_FADE = 400
// Scroll hint disappears almost as soon as you start scrolling.
const HINT_FADE = 140

const loadItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

/* ── desktop: clip-expand anchor image + dark-ink text layer ── */

function BeautyHeroDesktop() {
  const lenis = useLenis()
  const { scrollY } = useScroll()

  // Drop will-change once the hero has settled (past SETTLE) so the GPU layers
  // are released after the animation; it returns if you scroll back up to replay.
  const [settled, setSettled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setSettled(v > SETTLE))

  // Framed photo → full bleed. Tail stop (SETTLE+1) locks the settled state.
  const inset = useTransform(scrollY, [0, SETTLE, SETTLE + 1], [8, 0, 0])
  const radius = useTransform(scrollY, [0, SETTLE, SETTLE + 1], [24, 0, 0])
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius}px)`
  const imgScale = useTransform(scrollY, [0, SETTLE, SETTLE + 1], [1.15, 1, 1])

  // Text layer fades up-and-out faster than the image expands.
  const textOpacity = useTransform(scrollY, [0, TEXT_FADE, TEXT_FADE + 1], [1, 0, 0])
  const textY = useTransform(scrollY, [0, TEXT_FADE, TEXT_FADE + 1], [0, -40, -40])

  // Scroll hint fades on the very first scroll.
  const hintOpacity = useTransform(scrollY, [0, HINT_FADE, HINT_FADE + 1], [1, 0, 0])

  const goToServices = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('kezelesek')
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -72 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full bg-ink" style={{ height: `calc(${SETTLE}px + 100vh)` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* IMAGE LAYER — clipped frame that settles to full bleed */}
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ clipPath, willChange: settled ? 'auto' : 'clip-path' }}
        >
          <motion.img
            src={img('heroMain')}
            alt={images.heroMain.alt}
            fetchPriority="high"
            style={{ scale: imgScale, willChange: settled ? 'auto' : 'transform' }}
            className="img-grade h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* SCRIM — soft, feathered cream glow behind the text block only (≤20%
            peak, radial so there is no hard rectangle, fully transparent by ~78%
            radius). A gentle assist only — legibility is carried by the dark-ink
            text itself, not by washing the photo. */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(62% 72% at 22% 66%, rgb(var(--bg) / 0.20) 0%, rgb(var(--bg) / 0.12) 50%, rgb(var(--bg) / 0) 80%)',
          }}
        />

        {/* TEXT LAYER — separate, dark ink, never clipped */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, willChange: settled ? 'auto' : 'transform, opacity' }}
          className="absolute inset-0 z-20 flex items-end"
        >
          <div className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 sm:pb-28">
            <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }} className="max-w-xl">
              {/* dark ink (not gold) — gold fails AA over this photo; .eyebrow
                  still supplies the 0.42em letterspacing. inline color guarantees
                  it overrides the component-layer gold. */}
              <motion.p variants={loadItem} className="eyebrow" style={{ color: 'rgb(var(--ivory) / 0.92)' }}>
                {hero.eyebrow}
              </motion.p>
              <motion.h1
                variants={loadItem}
                className="mt-4 font-display text-[clamp(3.5rem,9vw,6.5rem)] font-light leading-[0.92] text-ivory"
              >
                {hero.title}
              </motion.h1>
              <motion.p
                variants={loadItem}
                className="mt-5 max-w-md font-body text-base leading-relaxed text-ivory sm:text-lg"
              >
                {hero.subheading}
              </motion.p>
              <motion.div variants={loadItem} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  to={hero.primaryCta.to}
                  className="inline-flex items-center justify-center rounded-full bg-champagne px-8 py-3.5 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink shadow-[0_0_0_2px_transparent] transition-all duration-[var(--dur-fast)] hover:bg-champagne-light hover:shadow-[0_0_0_2px_rgb(var(--gold)/0.35)] active:bg-champagne-press"
                >
                  {hero.primaryCta.label}
                </Link>
                <a
                  href="#kezelesek"
                  onClick={goToServices}
                  className="group inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-luxe-sm text-ivory transition-colors hover:text-champagne"
                >
                  Kezelések megtekintése
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* SCROLL HINT — bottom-left: thin vertical line + microcopy, fades on scroll */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-7 left-5 z-20 flex flex-col items-center gap-3 sm:left-8"
        >
          <span className="relative block h-12 w-px overflow-hidden bg-ivory/40">
            <motion.span
              className="absolute left-0 top-0 block h-4 w-px bg-ivory"
              animate={{ y: [-16, 48] }}
              transition={{ duration: 1.9, ease: 'easeInOut', repeat: Infinity }}
            />
          </span>
          <span className="font-body text-[0.6rem] uppercase tracking-luxe-sm text-ivory/75">
            Görgess
          </span>
        </motion.div>

        {/* bottom cream blend — softens the seam into the cream services section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
          style={{ background: 'linear-gradient(to bottom, rgb(var(--bg) / 0), rgb(var(--bg)))' }}
        />
      </div>
    </section>
  )
}

/* ── desktop reduced-motion: bright full-bleed editorial ── */

function BeautyHeroFullBleed({ reduce }: { reduce: boolean }) {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }

  return (
    <section id="hero" className="grain relative flex min-h-[100svh] w-full flex-col justify-end overflow-hidden bg-ink">
      <motion.img
        src={img('heroMain')}
        alt={images.heroMain.alt}
        fetchPriority="high"
        className="img-grade absolute inset-0 h-full w-full object-cover object-[50%_70%]"
        initial={reduce ? undefined : { scale: 1.0 }}
        animate={reduce ? undefined : { scale: 1 }}
        transition={reduce ? undefined : { duration: 16, ease: 'easeOut' }}
        style={{ willChange: 'transform' }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
      <div className="scrim-bottom pointer-events-none absolute inset-0 z-[1]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 sm:pb-20"
      >
        <div className="max-w-2xl">
          <motion.p variants={item} className="eyebrow" style={{ color: 'rgb(var(--ivory) / 0.92)' }}>{hero.eyebrow}</motion.p>
          <motion.h1 variants={item} className="mt-4 font-display text-[clamp(4rem,16vw,7rem)] font-light leading-[0.9] text-ivory">
            {hero.title}
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-md font-body text-base leading-relaxed text-ivory">
            {hero.subheading}
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={hero.primaryCta.to}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-8 py-3.5 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-colors duration-[var(--dur-fast)] hover:bg-champagne-light active:bg-champagne-press"
            >
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={hero.secondaryCta.to}
              className="inline-flex items-center justify-center rounded-full border border-ivory/30 px-8 py-3.5 font-body text-xs font-medium uppercase tracking-luxe-sm text-ivory backdrop-blur-[2px] transition-colors duration-[var(--dur-fast)] hover:border-champagne/70 hover:text-champagne"
            >
              {hero.secondaryCta.label}
            </Link>
          </motion.div>
          <motion.p variants={item} className="mt-7 font-body text-[0.7rem] uppercase tracking-luxe-sm text-stone">
            {hero.trust}
          </motion.p>
        </div>
      </motion.div>
    </section>
  )
}

/* ── mobile (≤767px): clean vertical stacked layout ── */

function BeautyHeroMobile({ reduce }: { reduce: boolean }) {
  // `ready` flips to true after one frame so elements paint at opacity:0 before
  // FM starts the transition. StrictMode-safe.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(id)
  }, [])

  const lenis = useLenis()
  const goToServices = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('kezelesek')
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -64 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  // Opacity fade is WCAG-safe even under reduce-motion; reduce only drops the
  // y-shift and shortens the duration. MotionConfig reducedMotion="never" keeps
  // the (safe) fade from being stripped when the OS has Reduce Motion on.
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y: 24 }
  const shown = { opacity: 1, y: 0 }
  const t = (delay: number) =>
    reduce ? { duration: 0.45, delay: 0 } : { duration: 0.8, ease: EASE, delay }

  return (
    <MotionConfig reducedMotion="never">
      {/* <768px hero — VERTICAL SPLIT (no overlay).
          Top: the reception photo, fully visible, fading seamlessly into the
          page bg. Bottom: text block on solid cream with full contrast. The
          sticky FOGLALÁS/HÍVÁS bar watches [data-mobile-hero] and stays hidden
          while this section is on screen (the primary pill below is the hero CTA). */}
      <section data-mobile-hero className="relative w-full bg-ink">
        {/* IMAGE BLOCK — landscape photo into a portrait frame: height is the
            constraining dimension, so the FULL vertical composition (brass
            chandelier → "Beauty Embassy" wall signage → reception desk) stays in
            frame and only the far left/right edges trim. */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: 'clamp(380px, 53vh, 600px)' }}
        >
          <img
            src={img('heroMain')}
            alt={images.heroMain.alt}
            fetchPriority="high"
            className="img-grade h-full w-full object-cover object-center"
          />
          {/* Bottom edge melts into the page background. Fades to rgb(var(--bg))
              — the exact cream the content block sits on — so the seam vanishes.
              (Codebase pattern uses an overlay div rather than a literal ::after.) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 73%, rgb(var(--bg)) 100%)' }}
          />
        </div>

        {/* CONTENT BLOCK — solid cream, full contrast. No image, no scrim. */}
        <div className="-mt-px px-5 pb-9 pt-3">
          {/* One line by design — whitespace-nowrap forbids an accidental wrap.
              At 360px the clamp resolves to ~2.48rem (11vw), above the ~2.2rem
              legibility floor, and "Beauty Embassy" fits the 320px content width.
              If Phase 3 shows it touching the edge, switch to a DELIBERATE stack
              (Beauty<br/>Embassy, ~3rem, leading ~0.97) — never a natural wrap. */}
          <motion.h1
            initial={hidden} animate={ready ? shown : hidden} transition={t(0)}
            className="whitespace-nowrap font-display text-[clamp(2.4rem,11.5vw,3.8rem)] font-light leading-[1.0] text-ivory"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={hidden} animate={ready ? shown : hidden} transition={t(0.08)}
            className="mt-3 max-w-[34ch] font-body text-[15px] leading-[1.55] text-ivory-dim"
          >
            {hero.subheading}
          </motion.p>

          {/* primary pill — full width minus side padding; sticky bar is the
              persistent converter once you scroll past this section */}
          <motion.div initial={hidden} animate={ready ? shown : hidden} transition={t(0.16)} className="mt-6">
            <Link
              to={hero.primaryCta.to}
              className="flex h-[54px] w-full items-center justify-center rounded-full bg-champagne px-8 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink active:bg-champagne-press"
            >
              {hero.primaryCta.label}
            </Link>
            <a
              href="#kezelesek"
              onClick={goToServices}
              className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-1.5 whitespace-nowrap font-body text-[0.7rem] uppercase tracking-luxe-sm text-ivory/80"
            >
              Kezelések megtekintése
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          <motion.p
            initial={hidden} animate={ready ? shown : hidden} transition={t(0.24)}
            className="mt-5 text-center font-body text-[13px] leading-snug text-stone"
          >
            {hero.trust}
          </motion.p>
        </div>
      </section>
    </MotionConfig>
  )
}

/* ── entry ── */

export default function BeautyHero() {
  const reduce = useReducedMotion()
  const isMobile = useIsMobile(768)

  if (isMobile) return <BeautyHeroMobile reduce={!!reduce} />
  if (reduce) return <BeautyHeroFullBleed reduce={true} />
  return <BeautyHeroDesktop />
}
