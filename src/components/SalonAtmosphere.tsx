import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { salonAtmosphere } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Sits immediately after the hero: a single cinematic interior shot + one
 * heading + one sentence + a short checklist. Image-led, minimal copy — the
 * "feel the room first" beat. Uses an existing local interior photo only.
 */
export default function SalonAtmosphere() {
  return (
    <section className="bg-ink px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease }}
          className="overflow-hidden rounded-lg ring-1 ring-ivory/10"
        >
          <img
            src={salonAtmosphere.src}
            alt={salonAtmosphere.alt}
            loading="lazy"
            className="img-grade aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
          />
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mt-8 sm:mt-12 sm:flex sm:items-end sm:justify-between sm:gap-12"
        >
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-light leading-[1.04] text-ivory">
              Nyugodt tér, precíz kezelések.
            </h2>
            <p className="mt-4 max-w-md font-body text-[0.95rem] leading-relaxed text-ivory-dim sm:text-base">
              Diszkrét budapesti rezidencia bőr-, haj-, smink- és testkezelésekhez.
            </p>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 sm:mt-0 sm:shrink-0 sm:flex-col sm:gap-3">
            {salonAtmosphere.trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2.5 font-body text-sm text-ivory">
                <Check className="h-4 w-4 shrink-0 text-champagne" strokeWidth={2.5} />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
