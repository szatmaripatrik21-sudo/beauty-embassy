import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react'
import Seo from '@/components/site/Seo'
import PageHeader from '@/components/site/PageHeader'
import PlaceholderImage from '@/components/site/PlaceholderImage'
import { useIsMobile } from '@/hooks/useIsMobile'
import { serviceCategories, brand, type Service, type ServiceCategory } from '@/data/salonData'

function bookLink(serviceName: string) {
  return `${brand.bookingHref}?service=${encodeURIComponent(serviceName)}`
}

const ease = [0.22, 1, 0.36, 1] as const

function SignatureBadge() {
  return (
    <span className="rounded-full border border-champagne/40 px-2.5 py-0.5 font-body text-[0.6rem] uppercase tracking-luxe-sm text-champagne">
      Kiemelt
    </span>
  )
}

/* ── MOBILE: accordion row — essentials visible, detail + CTA on expand ── */
function ServiceRow({ service }: { service: Service }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="border-b border-ivory/12">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-4 text-left"
      >
        <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-display text-lg font-light leading-snug text-ivory">
            {service.name}
          </span>
          {service.signature && <SignatureBadge />}
        </span>
        <span className="flex items-center gap-2.5 justify-self-end">
          <span className="font-display text-base text-champagne">{service.price}</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-stone transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </span>
        <span className="col-span-2 -mt-0.5 font-body text-[0.7rem] uppercase tracking-luxe-sm text-stone">
          {service.duration}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              <p className="font-body text-sm leading-relaxed text-ivory-dim">{service.blurb}</p>
              <Link
                to={bookLink(service.name)}
                className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-champagne px-6 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-[transform,background-color] duration-150 ease-out hover:bg-champagne-light active:scale-[0.98]"
              >
                Foglalás
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

function CategoryBlockMobile({ category, index }: { category: ServiceCategory; index: number }) {
  return (
    <section id={category.id} className="scroll-mt-28 border-t border-ivory/12 px-5 py-12">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="eyebrow">{`0${index + 1}`}</p>
          <h2 className="mt-2 font-display text-[clamp(1.8rem,7vw,2.4rem)] font-light leading-[1.05] text-ivory">
            {category.title}
          </h2>
          <p className="mt-3 font-body text-sm leading-relaxed text-ivory-dim">{category.intro}</p>
          <div className="mt-6">
            <PlaceholderImage imageKey={category.image} ratio="aspect-[16/9]" />
          </div>
        </motion.div>
        <ul className="mt-7 border-t border-ivory/12">
          {category.services.map((s) => (
            <ServiceRow key={s.name} service={s} />
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ── DESKTOP: unchanged editorial 2-column layout ── */
function CategoryBlockDesktop({ category, index }: { category: ServiceCategory; index: number }) {
  const flip = index % 2 === 1
  return (
    <section id={category.id} className="scroll-mt-28 border-t border-ivory/12 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Intro + image */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease }}
          className={`lg:sticky lg:top-28 lg:self-start ${flip ? 'lg:order-2' : ''}`}
        >
          <p className="eyebrow">{`0${index + 1}`}</p>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-light leading-[1.02] text-ivory">
            {category.title}
          </h2>
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-ivory-dim">
            {category.intro}
          </p>
          <div className="mt-8">
            <PlaceholderImage imageKey={category.image} ratio="aspect-[16/10]" />
          </div>
        </motion.div>

        {/* Service list */}
        <div className={flip ? 'lg:order-1' : ''}>
          <ul>
            {category.services.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                className="group border-b border-ivory/12 first:border-t"
              >
                <div className="py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="flex items-center gap-3 font-display text-2xl font-light text-ivory">
                      {s.name}
                      {s.signature && <SignatureBadge />}
                    </h3>
                    <span className="font-display text-xl text-champagne">{s.price}</span>
                  </div>
                  <div className="mt-1.5 flex items-start justify-between gap-6">
                    <p className="max-w-lg font-body text-sm text-ivory-dim/80">{s.blurb}</p>
                    <span className="shrink-0 font-body text-xs uppercase tracking-luxe-sm text-stone">
                      {s.duration}
                    </span>
                  </div>
                  <Link
                    to={bookLink(s.name)}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-champagne/40 px-5 py-2 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:bg-champagne hover:text-ink"
                  >
                    Foglalás
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function Treatments() {
  const isMobile = useIsMobile(768)
  return (
    <>
      <Seo
        title="Kezelések & Árak"
        description="A teljes Beauty Embassy kínálat — arckezelések, haj, smink, pillák, szemöldök, test és körmök, időtartammal és árakkal."
        path="/kezelesek"
      />
      <PageHeader
        eyebrow="A Dosszié"
        title="Kezelések & Árak"
        intro="Minden alkalom konzultációval kezdődik, így minden kezelés rád szabott. Az árak kiindulási értékek — nagyköveted az időpontodon erősíti meg a pontos összeget."
        image="products"
      />

      {/* Sticky category nav */}
      <nav className="sticky top-[57px] z-30 border-y border-ivory/12 bg-ink/85 backdrop-blur-md sm:top-[65px]">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-2.5 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            to="/kezelesek/signature-ritualek"
            className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border border-champagne/50 bg-champagne/10 px-4 font-body text-xs uppercase tracking-luxe-sm text-champagne transition-colors hover:bg-champagne hover:text-ink"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Signature
          </Link>
          {serviceCategories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="inline-flex min-h-[40px] shrink-0 items-center rounded-full border border-ivory/15 px-4 font-body text-xs uppercase tracking-luxe-sm text-ivory-dim transition-colors hover:border-champagne/60 hover:text-champagne"
            >
              {c.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="bg-ink">
        {serviceCategories.map((category, i) =>
          isMobile ? (
            <CategoryBlockMobile key={category.id} category={category} index={i} />
          ) : (
            <CategoryBlockDesktop key={category.id} category={category} index={i} />
          )
        )}
      </div>

      {/* Closing CTA */}
      <section className="section-pad border-t border-ivory/12 bg-surface px-5 text-center sm:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">Nem tudod, hol kezdd?</p>
          <h2 className="mt-3 font-display text-[clamp(1.85rem,5vw,3.6rem)] font-light leading-[1.04] text-ivory">
            Hagyd, hogy concierge-ünk segítsen
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-[0.95rem] leading-relaxed text-ivory-dim sm:text-base">
            Mondd el a céljaidat, és ajánljuk a megfelelő kezelést — vagy összeállítunk belőlük egy fél napot a Rezidencián.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={brand.bookingHref}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-champagne px-8 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-[transform,background-color] duration-150 ease-out hover:bg-champagne-light active:scale-[0.98] sm:w-auto"
            >
              Időpontfoglalás
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={brand.phoneHref}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-ivory/25 px-8 font-body text-xs font-medium uppercase tracking-luxe-sm text-ivory transition-colors hover:border-champagne/70 hover:text-champagne sm:w-auto"
            >
              Hívás: {brand.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
