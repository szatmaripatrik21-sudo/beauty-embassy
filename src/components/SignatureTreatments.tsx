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
    <section id="kezelesek" className="section-pad relative scroll-mt-20 bg-ink px-5 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className="mb-16 flex flex-col items-start gap-4 sm:mb-20"
        >
          <p className="eyebrow">Signature rituálék</p>
          <h2 className="font-display text-[clamp(2rem,6vw,5.5rem)] font-light leading-[1.0] text-ivory sm:leading-[0.95]">
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
                className="block py-5 transition-colors sm:grid sm:grid-cols-[1.4fr_auto_auto_auto] sm:items-center sm:gap-8 sm:py-8"
              >
                {/* On mobile this flex row holds name + price; on desktop it
                    becomes `contents` so its children join the 4-col grid. */}
                <div className="flex items-baseline justify-between gap-4 sm:contents">
                  <div>
                    <h3 className="font-display text-2xl font-light leading-snug text-ivory transition-colors group-hover:text-champagne sm:text-4xl">
                      {s.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-1 max-w-md font-body text-sm text-ivory-dim/80 sm:line-clamp-none">
                      {s.blurb}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-xl text-champagne sm:hidden">
                    {s.price}
                  </span>
                </div>

                {/* Desktop-only columns */}
                <span className="hidden font-body text-xs uppercase tracking-luxe-sm text-stone sm:block sm:text-right">
                  {s.duration}
                </span>
                <span className="hidden font-display text-2xl text-champagne sm:block sm:text-right">
                  {s.price}
                </span>
                <span className="hidden items-center gap-1.5 font-body text-xs font-medium uppercase tracking-luxe-sm text-ivory transition-colors group-hover:text-champagne sm:inline-flex">
                  Foglalás
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>

                {/* Mobile-only meta row: duration + affordance arrow */}
                <div className="mt-2 flex items-center justify-between sm:hidden">
                  <span className="font-body text-xs uppercase tracking-luxe-sm text-stone">
                    {s.duration}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-stone transition-colors group-hover:text-champagne" />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xs font-body text-sm text-ivory-dim">
            Több mint 40 kezelés: bőr, haj, smink, pillák, test és körmök.
          </p>
          <Link
            to="/kezelesek"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-champagne/40 px-7 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:bg-champagne hover:text-ink sm:w-auto"
          >
            Összes kezelés
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
