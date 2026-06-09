import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { story, img } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

export default function BrandStory({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="section-pad relative overflow-hidden bg-surface px-5 sm:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="eyebrow">{story.eyebrow}</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.02] text-ivory">
            {story.title}
          </h2>
          {story.body.map((p) => (
            <p key={p} className="mt-6 max-w-lg font-body text-base leading-relaxed text-ivory-dim">
              {p}
            </p>
          ))}
          <div className="mt-10 flex items-baseline gap-4 border-t border-ivory/12 pt-8">
            <span className="font-display text-5xl text-champagne">{story.stat.value}</span>
            <span className="font-body text-sm uppercase tracking-luxe-sm text-ivory-dim">
              {story.stat.label}
            </span>
          </div>
          {showCta && (
            <Link
              to="/about"
              className="mt-9 inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:text-champagne-light"
            >
              Történetünk & csapatunk
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
          className="relative"
        >
          <div className="overflow-hidden rounded-md ring-1 ring-ivory/10">
            <img
              src={img('interior')}
              alt="A Beauty Embassy Rezidencia meleg, minimalista belső tere"
              loading="lazy"
              className="img-grade aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden w-40 overflow-hidden rounded-md ring-1 ring-ivory/15 sm:block">
            <img
              src={img('towels')}
              alt="Puha törölközők és virágok a kezelőben"
              loading="lazy"
              className="img-grade aspect-square w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
