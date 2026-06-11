import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const
const DEFAULT_VISIBLE = 2

/**
 * Compact mode (home): two featured quotes only, with a "További vélemények"
 * reveal for the rest — never a tall wall of cards. Non-compact shows all.
 */
export default function Testimonials({ compact = false }: { compact?: boolean }) {
  const [showAll, setShowAll] = useState(false)
  const limited = compact && !showAll
  const cards = limited ? testimonials.slice(0, DEFAULT_VISIBLE) : testimonials
  const hasHidden = limited && testimonials.length > DEFAULT_VISIBLE

  return (
    <section className="section-pad bg-surface px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14">
          <div className="flex items-center gap-1 text-champagne">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="eyebrow">Vendégeink mondják</p>
          <h2 className="font-display text-[clamp(1.9rem,4.5vw,3.6rem)] font-light leading-[1.05] text-ivory">
            Amiért visszajárnak hozzánk
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {cards.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease, delay: (i % 2) * 0.1 }}
              className="flex flex-col justify-between rounded-md border border-ivory/10 bg-ink-3 p-6 shadow-[var(--shadow-card)] sm:p-7"
            >
              <div>
                <div className="mb-4 flex items-center gap-0.5 text-champagne">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="font-display text-xl font-light italic leading-snug text-ivory sm:text-2xl">
                  “{t.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-ivory/10 pt-5 sm:mt-8">
                <p className="font-body text-sm font-medium text-ivory">{t.name}</p>
                <p className="mt-0.5 font-body text-xs uppercase tracking-luxe-sm text-stone">
                  {t.detail}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {hasHidden && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex min-h-[44px] items-center rounded-full border border-champagne/40 px-7 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:bg-champagne hover:text-ink"
            >
              További vélemények
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
