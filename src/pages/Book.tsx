import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Clock, Phone, CalendarCheck, ShieldCheck, Gift } from 'lucide-react'
import Seo from '@/components/site/Seo'
import PageHeader from '@/components/site/PageHeader'
import { brand, serviceCategories, hours } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

const fieldClass =
  'mt-2 w-full rounded-md border border-ivory/20 bg-ink-3 px-4 py-3 font-body text-sm text-ivory placeholder:text-stone/70 outline-none transition-colors focus:border-champagne focus:ring-1 focus:ring-champagne'
const labelClass = 'block font-body text-xs uppercase tracking-luxe-sm text-stone'

export default function Book() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [searchParams] = useSearchParams()
  const preselectedService = searchParams.get('service') ?? ''

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Demo only — no backend. Capture the name for the confirmation message.
    const data = new FormData(e.currentTarget)
    setName(String(data.get('name') || 'Vendég'))
    setSubmitted(true)
  }

  return (
    <>
      <Seo
        title="Időpontfoglalás"
        description="Foglald le az időpontod a Beauty Embassyben. Válassz kezelést és kívánt időpontot, és concierge-ünk visszaigazolja."
        path="/foglalas"
      />
      <PageHeader
        eyebrow="Concierge foglalás"
        title="Foglald le az időpontod"
        intro="Küldd el a kívánt kezelést és időpontot. Concierge-ünk minden kérést személyesen igazol vissza — általában néhány órán belül."
      />

      <section className="bg-ink px-5 pb-4 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Form / confirmation */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="rounded-md border border-champagne/30 bg-surface p-8 sm:p-12"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-champagne text-ink">
                  <Check className="h-7 w-7" />
                </span>
                <h2 className="mt-6 font-display text-3xl font-light text-ivory sm:text-4xl">
                  Köszönjük, {name}!
                </h2>
                <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ivory-dim">
                  A kérésed megérkezett a concierge-hez. Hamarosan visszaigazoljuk az időpontodat
                  telefonon vagy e-mailben. Ha bármi sürgős, hívj minket:{' '}
                  <a href={brand.phoneHref} className="text-champagne hover:underline">
                    {brand.phone}
                  </a>
                  .
                </p>
                <p className="mt-6 font-body text-xs uppercase tracking-luxe-sm text-stone">
                  Ez egy demó — valós időpont nem került lefoglalásra.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex rounded-full border border-ivory/25 px-7 py-3 font-body text-xs font-medium uppercase tracking-luxe-sm text-ivory transition-colors hover:border-champagne/70 hover:text-champagne"
                >
                  Új kérés küldése
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Teljes név
                    </label>
                    <input id="name" name="name" required autoComplete="name" className={fieldClass} placeholder="Kovács Anna" />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Telefon
                    </label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" className={fieldClass} placeholder="+36 …" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    E-mail
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@example.com" />
                </div>

                <div>
                  <label htmlFor="service" className={labelClass}>
                    Kezelés
                  </label>
                  <select id="service" name="service" required defaultValue={preselectedService} className={fieldClass}>
                    <option value="" disabled>
                      Válassz kezelést…
                    </option>
                    {serviceCategories.map((cat) => (
                      <optgroup key={cat.id} label={cat.label}>
                        {cat.services.map((s) => (
                          <option key={s.name} value={s.name}>
                            {s.name} · {s.price}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="Nem tudom — kérek tanácsot">Nem tudom — kérek tanácsot</option>
                  </select>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date" className={labelClass}>
                      Kívánt dátum
                    </label>
                    <input id="date" name="date" type="date" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="time" className={labelClass}>
                      Kívánt időpont
                    </label>
                    <select id="time" name="time" defaultValue="" className={fieldClass}>
                      <option value="">Mindegy</option>
                      <option>Délelőtt (9–12)</option>
                      <option>Délután (12–16)</option>
                      <option>Este (16–20)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className={labelClass}>
                    Van valami, amit tudnunk kell? <span className="normal-case tracking-normal text-stone/70">(opcionális)</span>
                  </label>
                  <textarea id="notes" name="notes" rows={4} className={fieldClass} placeholder="Allergiák, alkalom, kihez szeretnél jönni…" />
                </div>

                <div className="space-y-4">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-champagne px-8 py-4 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-colors hover:bg-champagne-light active:bg-champagne-press sm:w-auto"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    Időpont kérése
                  </button>
                  {/* Trust signals */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <p className="flex items-center gap-1.5 font-body text-xs text-stone">
                      <ShieldCheck className="h-3.5 w-3.5 text-champagne" />
                      Ingyenes konzultáció minden alkalommal
                    </p>
                    <p className="flex items-center gap-1.5 font-body text-xs text-stone">
                      <ShieldCheck className="h-3.5 w-3.5 text-champagne" />
                      24 órás lemondási lehetőség
                    </p>
                  </div>
                  <p className="font-body text-xs leading-relaxed text-stone/80">
                    Concierge-ünk általában néhány órán belül visszaigazol — telefonon vagy e-mailben. Nem kell előre fizetni.
                  </p>
                </div>
              </motion.form>
            )}
          </div>

          {/* Aside */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-md border border-ivory/12 bg-surface p-7">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-champagne" />
                <p className="eyebrow">Inkább telefonálnál?</p>
              </div>
              <a
                href={brand.phoneHref}
                className="mt-4 block font-display text-2xl text-ivory transition-colors hover:text-champagne"
              >
                {brand.phone}
              </a>
              <p className="mt-2 font-body text-sm text-ivory-dim">{brand.address}</p>
            </div>

            <div className="rounded-md border border-ivory/12 bg-surface p-7">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-champagne" />
                <p className="eyebrow">Nyitvatartás</p>
              </div>
              <ul className="mt-4 divide-y divide-ivory/10">
                {hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between py-2.5">
                    <span className="font-body text-sm text-ivory">{h.day}</span>
                    <span className="font-body text-sm text-ivory-dim">{h.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gift card callout */}
            <div className="rounded-md border border-champagne/25 bg-surface p-7">
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-champagne" />
                <p className="eyebrow">Ajándékkártya</p>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-ivory-dim">
                Egy Beauty Embassy ajándékkártya — bármilyen értékben vagy adott kezelésre — az egyik legszebb ajándék, amit adhatsz.
              </p>
              <a
                href={brand.emailHref}
                className="mt-4 inline-flex items-center gap-1.5 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:text-champagne-light"
              >
                Megrendelem e-mailben
              </a>
            </div>
          </motion.aside>
        </div>
      </section>

      <div className="h-16" />
    </>
  )
}
