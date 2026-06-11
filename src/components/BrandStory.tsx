import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { story, img } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

export default function BrandStory({
  showCta = true,
  compact = false,
}: {
  showCta?: boolean
  /** Home: one short line + metric + link. Full multi-paragraph story is /rolunk. */
  compact?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [first, ...rest] = story.body
  const hasMore = rest.length > 0
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
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] text-ivory sm:leading-[1.02]">
            {story.title}
          </h2>

          {compact ? (
            /* Home: one short line; the full story lives on /rolunk. */
            <p className="mt-6 max-w-md font-body text-[0.95rem] leading-relaxed text-ivory-dim sm:text-base">
              {story.short}
            </p>
          ) : (
            <>
              {/* First paragraph always visible — one clear message on mobile. */}
              <p className="mt-6 max-w-lg font-body text-[0.95rem] leading-relaxed text-ivory-dim sm:text-base">
                {first}
              </p>

              {/* Remaining paragraphs collapse behind "Tovább" on mobile; on ≥sm
                  they're always shown, so desktop reads exactly as before. */}
              {hasMore && (
                <>
                  <div className={`${open ? 'block' : 'hidden'} sm:block`}>
                    {rest.map((p) => (
                      <p
                        key={p}
                        className="mt-5 max-w-lg font-body text-[0.95rem] leading-relaxed text-ivory-dim sm:text-base"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  {!open && (
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="mt-3 inline-flex min-h-[36px] items-center font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:text-champagne-light sm:hidden"
                    >
                      Tovább olvasom
                    </button>
                  )}
                </>
              )}
            </>
          )}
          <div className="mt-10 flex items-baseline gap-4 border-t border-ivory/12 pt-8">
            <span className="font-display text-5xl text-champagne">{story.stat.value}</span>
            <span className="font-body text-sm uppercase tracking-luxe-sm text-ivory-dim">
              {story.stat.label}
            </span>
          </div>
          {showCta && (
            <Link
              to="/rolunk"
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
          className={`relative ${compact ? 'hidden lg:block' : ''}`}
        >
          <div className="overflow-hidden rounded-md ring-1 ring-ivory/10">
            <img
              src={img('makeup')}
              alt="A Beauty Embassy Rezidencia meleg, elegáns részlete"
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
