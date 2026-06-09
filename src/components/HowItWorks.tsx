import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { brand } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    num: '01',
    title: 'Foglalj online',
    body: 'Küldj be egy kérést — válaszd ki a kezelést és a kívánt időpontot. Egy perc, semmi regisztráció.',
  },
  {
    num: '02',
    title: 'Concierge visszaigazol',
    body: 'Néhány órán belül megkeresünk telefonon vagy e-mailben, és személyesen megerősítjük az időpontot.',
  },
  {
    num: '03',
    title: 'Érkezz és pihenj',
    body: 'Minden alkalom konzultációval indul. A többi a mi dolgunk — csak engedd el magad.',
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
          className="mb-14 text-center"
        >
          <p className="eyebrow">Hogyan működik?</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-light leading-[1.04] text-ivory">
            Három lépés, semmi stressz
          </h2>
        </motion.header>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className="relative"
            >
              <span className="font-display text-5xl font-light text-champagne/30">{step.num}</span>
              <h3 className="mt-3 font-display text-2xl font-light text-ivory">{step.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ivory-dim">{step.body}</p>
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
