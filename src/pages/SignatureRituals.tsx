import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Seo from '@/components/site/Seo'
import PageHeader from '@/components/site/PageHeader'
import { signatureServices, brand } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

function bookLink(serviceName: string) {
  return `${brand.bookingHref}?service=${encodeURIComponent(serviceName)}`
}

/**
 * Dedicated home for the full Signature Rituals list — moved off the homepage.
 * One flagship per discipline, with price, duration and description. Data comes
 * straight from `signatureServices` (the signature-flagged services), so nothing
 * is duplicated by hand.
 */
export default function SignatureRituals() {
  return (
    <>
      <Seo
        title="Signature rituálék"
        description="A Beauty Embassy kiemelt kezelései — minden szakterület egy-egy zászlóshajója, időtartammal, árral és leírással."
        path="/kezelesek/signature-ritualek"
      />
      <PageHeader
        eyebrow="A ház kiemeltjei"
        title="Signature rituálék"
        intro="Minden szakterületünk egy-egy zászlóshajója — a kezelések, amelyekről ismernek minket. Mind konzultációval indul."
        image="facial"
      />

      <section className="section-pad bg-ink px-5 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <ul>
            {signatureServices.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease, delay: (i % 2) * 0.06 }}
                className="border-t border-ivory/12 py-7 last:border-b sm:py-9"
              >
                <p className="font-body text-xs uppercase tracking-luxe-sm text-champagne">
                  {s.category}
                </p>
                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2 className="font-display text-2xl font-light leading-snug text-ivory sm:text-3xl">
                    {s.name}
                  </h2>
                  <span className="font-display text-xl text-champagne">{s.price}</span>
                </div>
                <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-ivory-dim sm:text-base">
                  {s.blurb}
                </p>
                <div className="mt-4 flex items-center gap-5">
                  <span className="font-body text-xs uppercase tracking-luxe-sm text-stone">
                    {s.duration}
                  </span>
                  <Link
                    to={bookLink(s.name)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-champagne/40 px-5 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:bg-champagne hover:text-ink"
                  >
                    Foglalás
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-12 flex justify-center">
            <Link
              to="/kezelesek"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ivory/25 px-7 font-body text-xs font-medium uppercase tracking-luxe-sm text-ivory transition-colors hover:border-champagne/70 hover:text-champagne"
            >
              Összes kezelés
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
