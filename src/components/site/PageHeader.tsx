import { motion } from 'framer-motion'
import { img, type ImageKey } from '@/data/salonData'

const EASE = [0.22, 1, 0.36, 1] as const

type PageHeaderProps = {
  eyebrow: string
  title: string
  intro?: string
  image?: ImageKey
}

/**
 * Editorial page header used across inner routes. With an image it renders a
 * full-bleed, scrim-darkened band; without one, a calm cream header.
 */
export default function PageHeader({ eyebrow, title, intro, image }: PageHeaderProps) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  }

  return (
    <header
      className={`relative overflow-hidden ${
        image ? 'pt-32 pb-16 sm:pt-44 sm:pb-28' : 'pt-28 pb-10 sm:pt-40 sm:pb-16'
      }`}
    >
      {image && (
        <>
          <img
            src={img(image)}
            alt=""
            aria-hidden
            className="img-grade absolute inset-0 h-full w-full object-cover"
          />
          <div className="scrim-flat absolute inset-0" />
          <div className="scrim-radial pointer-events-none absolute inset-0" />
        </>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-4xl px-5 text-center sm:px-8"
      >
        <motion.p variants={item} className="eyebrow">
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-4 font-display text-[clamp(2.05rem,6.2vw,5.5rem)] font-light leading-[1.01] text-ivory sm:leading-[0.98]"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-md font-body text-[0.95rem] leading-relaxed text-ivory-dim sm:max-w-xl sm:text-base"
          >
            {intro}
          </motion.p>
        )}
      </motion.div>
    </header>
  )
}
