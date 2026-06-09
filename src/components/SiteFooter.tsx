import { Link } from 'react-router-dom'
import { MapPin, Clock, Phone, Mail } from 'lucide-react'
import { brand, nav } from '@/data/salonData'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14 9h2.5V6H14c-2 0-3.2 1.3-3.2 3.3V11H8.5v3h2.3v7h3v-7h2.3l.4-3h-2.7V9.6c0-.4.3-.6.9-.6Z" />
    </svg>
  )
}

const footerLinks = [...nav, { label: 'Időpontfoglalás', to: brand.bookingHref }]

export default function SiteFooter() {
  return (
    <footer className="section-pad border-t border-ivory/12 bg-surface px-5 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.5fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="font-display text-3xl tracking-luxe-sm text-ivory">
            {brand.name}
          </Link>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ivory-dim">
            {brand.shortPitch}
          </p>
          <Link
            to={brand.bookingHref}
            className="mt-7 inline-flex rounded-full bg-champagne px-7 py-3 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-colors hover:bg-champagne-light"
          >
            Időpontfoglalás
          </Link>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-luxe-sm text-stone">Oldalak</p>
          <ul className="mt-5 space-y-3">
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="font-body text-sm text-ivory-dim transition-colors hover:text-champagne"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-luxe-sm text-stone">Látogasd meg a Rezidenciát</p>
          <ul className="mt-5 space-y-4 font-body text-sm text-ivory-dim">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
              <a href={brand.mapsHref} className="transition-colors hover:text-champagne">
                {brand.address}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
              {brand.hoursShort}
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
              <a href={brand.phoneHref} className="transition-colors hover:text-champagne">
                {brand.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-champagne" />
              <a href={brand.emailHref} className="transition-colors hover:text-champagne">
                {brand.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition-colors hover:border-champagne/60 hover:text-champagne"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition-colors hover:border-champagne/60 hover:text-champagne"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-ivory/10 pt-7 sm:flex-row sm:items-center">
        <p className="font-body text-xs text-stone">
          © {new Date().getFullYear()} {brand.name}. Bemutató demó oldal.
        </p>
        <p className="font-body text-xs text-stone">Gondos kézzel készült Budapesten</p>
      </div>
    </footer>
  )
}
