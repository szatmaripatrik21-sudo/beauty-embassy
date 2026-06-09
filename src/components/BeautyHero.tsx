import { useEffect, useRef, useState } from 'react'
import {
  MotionConfig,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { hero, img, images } from '@/data/salonData'
import { useIsMobile } from '@/hooks/useIsMobile'

const EASE = [0.22, 1, 0.36, 1] as const

/* ================================================================
   BeautyHero

   Routing:
     mobile (≤767px)          → BeautyHeroMobile   (clean vertical flow)
     desktop + reduce-motion   → BeautyHeroFullBleed (editorial full-bleed)
     desktop                   → BeautyHeroDesktop   (pinned clip-expand collage)
   ================================================================ */

// Scroll distance (px) the sticky center image stays pinned while it expands.
const SECTION_HEIGHT = 1500

/* ── desktop: sticky clip-expand anchor image ── */

function CenterImage() {
  const { scrollY } = useScroll()

  const clip1 = useTransform(scrollY, [0, SECTION_HEIGHT], [20, 7.5])
  const clip2 = useTransform(scrollY, [0, SECTION_HEIGHT], [80, 92.5])
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`

  const imgOpacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0])

  // Title dissolves up & out early so it never fights the imagery.
  const titleOpacity = useTransform(scrollY, [0, 380], [1, 0])
  const titleY = useTransform(scrollY, [0, 380], [0, -60])

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      {/* the clipped photo */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath, opacity: imgOpacity, willChange: 'clip-path, opacity', background: 'rgb(var(--bg))' }}
      >
        <img
          src={img('heroMain')}
          alt={images.heroMain.alt}
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* title overlay — NOT clipped (separate layer) */}
      <motion.div
        style={{ opacity: titleOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
      >
        <motion.div style={{ y: titleY }} className="relative flex flex-col items-center text-center">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-[clamp(4rem,12vw,9rem)] font-light leading-[0.9] text-champagne-gradient">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ivory-dim">
            {hero.subheading}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ── desktop: parallax image column ── */

type ParallaxImgProps = {
  className: string
  alt: string
  src: string
  start: number
  end: number
}

function ParallaxImg({ className, alt, src, start, end }: ParallaxImgProps) {
  const ref = useRef<HTMLImageElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  })

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85])
  const y = useTransform(scrollYProgress, [0, 1], [start, end])
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      style={{ transform, opacity, willChange: 'transform, opacity' }}
      className={`img-grade rounded-md object-cover shadow-[var(--shadow-card)] ring-1 ring-ivory/10 ${className}`}
    />
  )
}

function ParallaxImages() {
  return (
    <div className="relative z-10 mx-auto max-w-5xl px-4 pt-[220px] pb-24">
      <ParallaxImg src={img('hair')} alt={images.hair.alt} start={-200} end={200} className="w-1/3" />
      <ParallaxImg src={img('facial')} alt={images.facial.alt} start={200} end={-250} className="mx-auto w-2/3" />
      <ParallaxImg src={img('makeup')} alt={images.makeup.alt} start={-200} end={200} className="ml-auto w-1/3" />
    </div>
  )
}

function BeautyHeroDesktop() {
  return (
    <section
      className="relative w-full overflow-x-clip bg-ink"
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
    >
      <CenterImage />
      <ParallaxImages />
      {/* blend into the cream of the next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-96"
        style={{ background: 'linear-gradient(to bottom, rgb(var(--bg) / 0), rgb(var(--bg)))' }}
      />
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
          <motion.p variants={item} className="eyebrow">{hero.eyebrow}</motion.p>
          <motion.h1 variants={item} className="mt-4 font-display text-[clamp(4rem,16vw,7rem)] font-light leading-[0.9] text-champagne-gradient">
            {hero.title}
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-md font-body text-base leading-relaxed text-ivory-dim">
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
  // `ready` flips to true after one frame, guaranteeing elements are painted at
  // opacity:0 before FM starts the transition. StrictMode-safe: cleanup cancels
  // the first timer, the real mount's timer fires and sets ready=true.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(id)
  }, [])

  // Both paths animate — simple opacity fade is WCAG-safe even with
  // prefers-reduced-motion (no vestibular-triggering motion involved).
  // Reduced-motion: fast opacity-only fade (no y shift, 0.45s).
  // Full motion: slower fade + upward slide, staggered.
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, y: 32 }
  const shown  = { opacity: 1, y: 0 }
  const t = (delay: number) =>
    reduce
      ? { duration: 0.45, delay: 0 }
      : { duration: 0.9, ease: EASE, delay }

  // MotionConfig reducedMotion="never" prevents FM from skipping all animations
  // when the OS has "Reduce Motion" on. Our `reduce` prop still controls style:
  // no y-shift and faster duration for those users — opacity fade is WCAG-safe.
  return (
    <MotionConfig reducedMotion="never">
    <section className="relative w-full overflow-hidden bg-ink px-5 pb-10 pt-20">
      {/* 1. Eyebrow */}
      <motion.p
        initial={hidden} animate={ready ? shown : hidden} transition={t(0)}
        className="eyebrow"
      >
        {hero.eyebrow}
      </motion.p>

      {/* 2. Title */}
      <motion.h1
        initial={hidden} animate={ready ? shown : hidden} transition={t(0.1)}
        className="mt-3 font-display text-[clamp(3.5rem,17vw,5.5rem)] font-light leading-[0.9] text-champagne-gradient"
      >
        {hero.title}
      </motion.h1>

      {/* 3. Hero salon image — full width, stable aspect-ratio */}
      <motion.div
        initial={hidden} animate={ready ? shown : hidden} transition={t(0.2)}
        className="mt-6 w-full overflow-hidden rounded-md"
        style={{ aspectRatio: '4 / 5' }}
      >
        <img
          src={img('heroMain')}
          alt={images.heroMain.alt}
          fetchPriority="high"
          className="img-grade h-full w-full object-cover object-[50%_30%]"
        />
      </motion.div>

      {/* 4. Body copy */}
      <motion.p
        initial={hidden} animate={ready ? shown : hidden} transition={t(0.3)}
        className="mt-5 font-body text-sm leading-relaxed text-ivory-dim"
      >
        {hero.subheading}
      </motion.p>

      <motion.p
        initial={hidden} animate={ready ? shown : hidden} transition={t(0.38)}
        className="mt-3 font-body text-[0.7rem] uppercase tracking-luxe-sm text-stone"
      >
        {hero.trust}
      </motion.p>

      {/* Accent pair — below the fold; whileInView is fine here */}
      <div className="mt-7 grid grid-cols-2 gap-3">
        <motion.div
          initial={hidden}
          whileInView={shown} viewport={{ once: true, amount: 0.15 }} transition={t(0)}
          className="overflow-hidden rounded-md"
          style={{ aspectRatio: '2 / 3' }}
        >
          <img src={img('hair')} alt={images.hair.alt} loading="lazy"
            className="img-grade h-full w-full object-cover" />
        </motion.div>
        <motion.div
          initial={hidden}
          whileInView={shown} viewport={{ once: true, amount: 0.15 }} transition={t(0.12)}
          className="overflow-hidden rounded-md"
          style={{ aspectRatio: '2 / 3' }}
        >
          <img src={img('makeup')} alt={images.makeup.alt} loading="lazy"
            className="img-grade h-full w-full object-cover" />
        </motion.div>
      </div>
    </section>
    </MotionConfig>
  )
}

/* ── entry ── */

export default function BeautyHero() {
  const reduce = useReducedMotion()
  const isMobile = useIsMobile()

  if (isMobile) return <BeautyHeroMobile reduce={!!reduce} />
  if (reduce) return <BeautyHeroFullBleed reduce={true} />
  return <BeautyHeroDesktop />
}
