import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'
import { brand } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

// lucide v1 has no brand icons — inline Instagram glyph (matches SiteFooter).
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/**
 * Compact dual-tile strip: gift card CTA + Instagram follow nudge.
 * Sits between Testimonials and TeamPreview on the home page.
 */
export default function GiftCardStrip() {
  return (
    <section className="bg-surface px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2">
        {/* Gift card tile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col justify-between rounded-md border border-champagne/25 bg-ink-3 p-8"
        >
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-champagne/10 text-champagne">
              <Gift className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-light leading-snug text-ivory">
              Ajándékkártya — egy csendesen nagyvonalú gesztus
            </h3>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-ivory-dim">
              Bármilyen értékben vagy adott kezelésre. A Beauty Embassy ajándékkártyát e-mailben rendelheted — általában 24 órán belül elkészítjük.
            </p>
          </div>
          <a
            href={brand.emailHref}
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-champagne px-7 py-3 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-colors hover:bg-champagne-light"
          >
            Ajándékkártyát kérek
          </a>
        </motion.div>

        {/* Instagram tile */}
        <motion.a
          href={brand.instagram}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="group flex flex-col justify-between rounded-md border border-ivory/12 bg-ink-3 p-8 transition-colors hover:border-champagne/30"
        >
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition-colors group-hover:border-champagne/40 group-hover:text-champagne">
              <InstagramIcon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-light leading-snug text-ivory">
              Kövess minket Instagramon
            </h3>
            <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-ivory-dim">
              Napi munkák, kezelési eredmények és egy pillantás a Rezidencia hangulatába — a legőszintébb portfóliónk.
            </p>
          </div>
          <p className="mt-8 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors group-hover:text-champagne-light">
            @beautyembassy →
          </p>
        </motion.a>
      </div>
    </section>
  )
}
