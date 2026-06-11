import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { brand } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    num: '01',
    title: 'Foglalj online',
    body: 'Válaszd ki a kezelést és a kívánt időpontot — egy perc, regisztráció nélkül.',
  },
  {
    num: '02',
    title: 'Concierge visszaigazol',
    body: 'Néhány órán belül telefonon vagy e-mailben megerősítjük az időpontot.',
  },
  {
    num: '03',
    title: 'Érkezz és pihenj',
    body: 'Minden alkalom konzultációval indul — a többi a mi dolgunk.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-pad border-t border-ivory/10 bg-ink px-5 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="mb-12 text-center sm:mb-14"
        >
          <p className="eyebrow">Hogyan működik?</p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,4.5vw,3.2rem)] font-light leading-[1.04] text-ivory">
            Három lépés, semmi stressz
          </h2>
        </motion.header>

        {/* Mobile: vertical timeline with a connecting spine. Desktop: 3 columns
            with large faded numbers (unchanged). */}
        <div className="relative grid gap-7 sm:grid-cols-3 sm:gap-8">
          <div
            aria-hidden
            className="absolute left-[19px] top-6 bottom-6 w-px bg-ivory/12 sm:hidden"
          />
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className="relative flex items-start gap-4 sm:block"
            >
              <span className="relative z-[1] flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-champagne/30 bg-ink font-display text-base text-champagne sm:h-auto sm:w-auto sm:rounded-none sm:border-0 sm:bg-transparent sm:text-5xl sm:font-light sm:text-champagne/30">
                {step.num}
              </span>
              <div className="sm:contents">
                <h3 className="font-display text-xl font-light text-ivory sm:mt-3 sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-xs font-body text-sm leading-relaxed text-ivory-dim sm:mt-2 sm:max-w-none">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to={brand.bookingHref}
            className="inline-flex items-center gap-2 rounded-full bg-champagne px-9 py-4 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-colors hover:bg-champagne-light"
          >
            Időpontfoglalás
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
