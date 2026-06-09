import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { featuredServices, brand } from '@/data/salonData'

function bookLink(serviceName: string) {
  return `${brand.bookingHref}?service=${encodeURIComponent(serviceName)}`
}

const ease = [0.22, 1, 0.36, 1] as const

export default function SignatureTreatments() {
  return (
    <section className="section-pad relative bg-ink px-5 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="mb-16 flex flex-col items-start gap-4 sm:mb-20"
        >
          <p className="eyebrow">Signature rituálék</p>
          <h2 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-light leading-[0.95] text-ivory">
            Kezelések, amelyekről ismernek minket
          </h2>
        </motion.header>

        <ul>
          {featuredServices.map((s, i) => (
            <motion.li
              key={s.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="group border-t border-ivory/12 last:border-b"
            >
              <Link
                to={bookLink(s.name)}
                className="grid grid-cols-1 gap-4 py-7 transition-colors sm:grid-cols-[1.4fr_auto_auto_auto] sm:items-center sm:gap-8 sm:py-8"
              >
                <div>
                  <h3 className="font-display text-3xl font-light text-ivory transition-colors group-hover:text-champagne sm:text-4xl">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 max-w-md font-body text-sm text-ivory-dim/80">
                    {s.blurb}
                  </p>
                </div>
                <span className="font-body text-xs uppercase tracking-luxe-sm text-stone sm:text-right">
                  {s.duration}
                </span>
                <span className="font-display text-2xl text-champagne sm:text-right">
                  {s.price}
                </span>
                <span className="inline-flex items-center gap-1.5 font-body text-xs font-medium uppercase tracking-luxe-sm text-ivory transition-colors group-hover:text-champagne">
                  Foglalás
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-sm text-ivory-dim">
            Több mint 40 kezelés: bőr, haj, smink, pillák, test és körmök.
          </p>
          <Link
            to="/treatments"
            className="inline-flex items-center gap-2 rounded-full border border-champagne/40 px-7 py-3 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:bg-champagne hover:text-ink"
          >
            Összes kezelés
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
