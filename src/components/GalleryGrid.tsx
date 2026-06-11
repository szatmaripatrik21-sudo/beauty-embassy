import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { galleryKeys, images, img, type ImageKey } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

// Editorial, deliberately uneven grid spans (repeats to fit any length).
const spanPattern = [
  'sm:col-span-2 sm:row-span-2',
  'sm:col-span-1',
  'sm:col-span-1',
  'sm:col-span-1',
  'sm:col-span-1',
  'sm:col-span-2',
]

type GalleryGridProps = {
  keys?: ImageKey[]
  showHeader?: boolean
  showCta?: boolean
}

export default function GalleryGrid({
  keys = galleryKeys,
  showHeader = true,
  showCta = false,
}: GalleryGridProps) {
  return (
    <section className="section-pad bg-ink px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {showHeader && (
          <div className="mb-10 flex flex-col items-start justify-between gap-3 sm:mb-14 sm:flex-row sm:items-end sm:gap-4">
            <div>
              <p className="eyebrow">Galéria</p>
              <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.04] text-ivory sm:mt-4 sm:leading-[1.02]">
                Munkáink közelről
              </h2>
            </div>
            <p className="max-w-xs font-body text-sm text-ivory-dim">
              Bőr, haj és smink — bepillantás a Rezidencia legutóbbi átalakulásaiba.
            </p>
          </div>
        )}

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[220px]">
          {keys.map((key, i) => (
            <motion.figure
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease, delay: (i % 3) * 0.06 }}
              className={`group relative overflow-hidden rounded-md ring-1 ring-ivory/10 ${
                spanPattern[i % spanPattern.length]
              }`}
            >
              <img
                src={img(key)}
                alt={images[key].alt}
                loading="lazy"
                className={`${
                  key === 'nails' ? 'img-grade-blur' : 'img-grade'
                } h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.figure>
          ))}
        </div>

        {showCta && (
          <div className="mt-12 flex justify-center">
            <Link
              to="/galeria"
              className="inline-flex items-center gap-2 rounded-full border border-champagne/40 px-7 py-3 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:bg-champagne hover:text-ink"
            >
              Teljes galéria
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
