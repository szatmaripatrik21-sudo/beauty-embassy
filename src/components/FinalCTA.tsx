import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { brand, img } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

export default function FinalCTA() {
  return (
    <section className="section-pad relative overflow-hidden px-5 sm:px-8">
      <img
        src={img('skincare')}
        alt=""
        aria-hidden
        loading="lazy"
        className="img-grade absolute inset-0 h-full w-full object-cover"
      />
      {/* AA scrim: flat tint + radial vignette so the headline stays legible */}
      <div className="scrim-flat absolute inset-0" />
      <div className="scrim-radial pointer-events-none absolute inset-0" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease }}
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <p className="eyebrow">Vár az időpontod</p>
        <h2 className="mt-5 font-display text-[clamp(2.8rem,7vw,6rem)] font-light leading-[0.96] text-ivory">
          Készen állsz a ragyogásra?
        </h2>
        <p className="mt-6 max-w-md font-body text-base text-ivory-dim">
          Foglalj online egy perc alatt, vagy hívd a Rezidenciát — concierge-ünk megtalálja a tökéletes időpontot.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            to={brand.bookingHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-9 py-4 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-colors duration-[var(--dur-fast)] hover:bg-champagne-light active:bg-champagne-press"
          >
            Időpontfoglalás
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={brand.phoneHref}
            className="inline-flex items-center justify-center rounded-full border border-ivory/25 px-9 py-4 font-body text-xs font-medium uppercase tracking-luxe-sm text-ivory transition-colors hover:border-champagne/70 hover:text-champagne"
          >
            Hívás: {brand.phone}
          </a>
        </div>
        {/* Risk reversal micro-copy */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <p className="flex items-center gap-1.5 font-body text-xs text-ivory/60">
            <ShieldCheck className="h-3.5 w-3.5 text-champagne/70" />
            Ingyenes konzultáció minden kezeléshez
          </p>
          <p className="flex items-center gap-1.5 font-body text-xs text-ivory/60">
            <ShieldCheck className="h-3.5 w-3.5 text-champagne/70" />
            24 órás lemondási lehetőség
          </p>
          <p className="flex items-center gap-1.5 font-body text-xs text-ivory/60">
            <ShieldCheck className="h-3.5 w-3.5 text-champagne/70" />
            Nem kell előre fizetni
          </p>
        </div>
      </motion.div>
    </section>
  )
}
