import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { galleryKeys, images, img } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

// Four strong tiles only — the full grid + work categories live on /galeria.
const tiles = galleryKeys.slice(0, 4)

export default function GalleryShowcase() {
  return (
    <section className="section-pad bg-ink px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end sm:gap-4"
        >
          <div>
            <p className="eyebrow">Galéria</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.04] text-ivory sm:mt-4 sm:leading-[1.02]">
              Pillanatok a szalonból
            </h2>
          </div>
          <Link
            to="/galeria"
            className="group inline-flex min-h-[44px] items-center gap-2 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:text-champagne-light"
          >
            Galéria megtekintése
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4">
          {tiles.map((key, i) => (
            <motion.figure
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease, delay: (i % 4) * 0.06 }}
              className="group overflow-hidden rounded-lg ring-1 ring-ivory/10"
            >
              <img
                src={img(key)}
                alt={images[key].alt}
                loading="lazy"
                className={`${
                  key === 'nails' ? 'img-grade-blur' : 'img-grade'
                } aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105`}
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
