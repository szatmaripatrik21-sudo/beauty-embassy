import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import Seo from '@/components/site/Seo'
import PageHeader from '@/components/site/PageHeader'
import Faq from '@/components/Faq'
import { brand, hours } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

export default function Contact() {
  return (
    <>
      <Seo
        title="Kapcsolat & Nyitvatartás"
        description={`Látogass el a Beauty Embassybe: ${brand.address}. Nyitvatartás, megközelítés, telefon és e-mail a Rezidenciához.`}
        path="/contact"
      />
      <PageHeader
        eyebrow="Látogasd meg a Rezidenciát"
        title="Találj ránk, hívj minket, gyere be"
        intro="Az Andrássy úton vagyunk, két percre az Operától. Foglalj előre — ha a naptár engedi, az érkezőket is szívesen fogadjuk."
      />

      <section className="bg-ink px-5 pb-8 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="eyebrow">Lépj kapcsolatba</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05] text-ivory">
              A concierge a segítségedre van
            </h2>
            <ul className="mt-8 space-y-6 font-body text-ivory-dim">
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-champagne" />
                <div>
                  <p className="text-xs uppercase tracking-luxe-sm text-stone">Cím</p>
                  <a href={brand.mapsHref} className="mt-1 block text-base text-ivory transition-colors hover:text-champagne">
                    {brand.addressLines[0]}
                    <br />
                    {brand.addressLines[1]}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-champagne" />
                <div>
                  <p className="text-xs uppercase tracking-luxe-sm text-stone">Telefon</p>
                  <a href={brand.phoneHref} className="mt-1 block text-base text-ivory transition-colors hover:text-champagne">
                    {brand.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-champagne" />
                <div>
                  <p className="text-xs uppercase tracking-luxe-sm text-stone">E-mail</p>
                  <a href={brand.emailHref} className="mt-1 block text-base text-ivory transition-colors hover:text-champagne">
                    {brand.email}
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="rounded-md border border-ivory/12 bg-surface p-7 sm:p-9"
          >
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-champagne" />
              <p className="eyebrow">Nyitvatartás</p>
            </div>
            <ul className="mt-6 divide-y divide-ivory/10">
              {hours.map((h) => {
                const closed = h.value === 'Zárva'
                return (
                  <li key={h.day} className="flex items-center justify-between py-3.5">
                    <span className="font-body text-sm text-ivory">{h.day}</span>
                    <span
                      className={`font-body text-sm ${closed ? 'text-stone/60 line-through' : 'text-ivory-dim'}`}
                    >
                      {h.value}
                    </span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-6 font-body text-xs leading-relaxed text-stone">
              Ünnepnapokon a nyitvatartás eltérhet. Menyasszonyi és csoportos foglalások egyeztetés után ezeken az időpontokon kívül is megoldhatók.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-ink px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-md border border-ivory/12">
          <iframe
            title={`Térkép a ${brand.name} felé`}
            src="https://www.openstreetmap.org/export/embed.html?bbox=19.0612%2C47.5028%2C19.0712%2C47.5078&layer=mapnik&marker=47.5053%2C19.0662"
            loading="lazy"
            className="h-[360px] w-full grayscale-[0.2]"
            style={{ border: 0 }}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad border-t border-ivory/12 bg-surface px-5 sm:px-8">
        <div className="mb-12 text-center">
          <p className="eyebrow">Hasznos tudnivalók</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.02] text-ivory">
            Gyakori kérdések
          </h2>
        </div>
        <Faq />
      </section>
    </>
  )
}
