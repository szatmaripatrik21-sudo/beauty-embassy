import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { treatmentNav } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Compact treatment NAVIGATION (not a service listing). Each card is just a
 * category title + a 3–5 word descriptor + an arrow, deep-linking into the
 * Treatments page. Plus a Signature Rituals teaser and one "Összes kezelés"
 * link. No prices, durations, or descriptions — those live on detail pages.
 */
export default function TreatmentCategories() {
  return (
    <section className="section-pad bg-surface px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4"
        >
          <div>
            <p className="eyebrow">Kezelések</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.04] text-ivory sm:mt-4 sm:leading-[1.02]">
              Hol kezdjük?
            </h2>
          </div>
          <Link
            to="/kezelesek"
            className="group inline-flex min-h-[44px] items-center gap-2 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:text-champagne-light"
          >
            Összes kezelés
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <div className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {treatmentNav.map((cat, i) => (
            <motion.div
              key={cat.to}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease, delay: (i % 3) * 0.06 }}
            >
              <Link
                to={cat.to}
                className="group flex min-h-[5.5rem] items-center justify-between gap-4 rounded-lg border border-ivory/12 bg-ink-3 px-6 py-5 transition-colors hover:border-champagne/40"
              >
                <span className="min-w-0">
                  <span className="block font-display text-xl font-light leading-snug text-ivory transition-colors group-hover:text-champagne">
                    {cat.label}
                  </span>
                  <span className="mt-1 block font-body text-[0.7rem] uppercase tracking-luxe-sm text-stone">
                    {cat.descriptor}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-stone transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-champagne" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Signature Rituals teaser — a single highlighted link, not the list. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="mt-3"
        >
          <Link
            to="/kezelesek/signature-ritualek"
            className="group flex items-center justify-between gap-4 rounded-lg border border-champagne/30 bg-ink-3 px-6 py-5 transition-colors hover:border-champagne/60"
          >
            <span className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-champagne/12 text-champagne">
                <Sparkles className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-xl font-light leading-snug text-ivory">
                  Signature rituálék
                </span>
                <span className="mt-1 block font-body text-[0.7rem] uppercase tracking-luxe-sm text-stone">
                  A ház kiemelt kezelései
                </span>
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-champagne transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
