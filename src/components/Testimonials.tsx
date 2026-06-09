import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

export default function Testimonials() {
  return (
    <section className="section-pad bg-surface px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-1 text-champagne">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="eyebrow">5.0 · Vendégeink értékelése</p>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light text-ivory">
            Amiért visszajárnak hozzánk
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className="flex flex-col justify-between rounded-md border border-ivory/10 bg-ink-3 p-7 shadow-[var(--shadow-card)]"
            >
              <div>
                <div className="mb-4 flex items-center gap-0.5 text-champagne">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="font-display text-2xl font-light italic leading-snug text-ivory">
                  “{t.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-8 border-t border-ivory/10 pt-5">
                <p className="font-body text-sm font-medium text-ivory">{t.name}</p>
                <p className="mt-0.5 font-body text-xs uppercase tracking-luxe-sm text-stone">
                  {t.detail}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Aggregate trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-2 text-center"
        >
          <p className="font-body text-xs uppercase tracking-luxe-sm text-stone">
            Több mint 600 visszaigazolt értékelés — Google &amp; közvetlenül
          </p>
        </motion.div>
      </div>
    </section>
  )
}
