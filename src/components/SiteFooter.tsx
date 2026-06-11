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
    <footer className="section-pad border-t border-ivory/12 bg-surface px-5 sm:px-8 [padding-bottom:calc(var(--section-y)+4.75rem+env(safe-area-inset-bottom))] md:[padding-bottom:var(--section-y)]">
      <div className="mx-auto grid max-w-6xl gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr]">
        {/* Brand + primary CTA */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="font-display text-3xl tracking-luxe-sm text-ivory">
            {brand.name}
          </Link>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ivory-dim">
            {brand.shortPitch}
          </p>
          <Link
            to={brand.bookingHref}
            className="mt-7 flex min-h-[48px] w-full items-center justify-center rounded-full bg-champagne px-7 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-[transform,background-color] duration-150 ease-out hover:bg-champagne-light active:scale-[0.98] sm:inline-flex sm:w-auto"
          >
            Időpontfoglalás
          </Link>
        </div>

        {/* Contact — most useful, surfaced before nav on mobile */}
        <div className="order-1 sm:order-none lg:order-last">
          <p className="font-body text-xs uppercase tracking-luxe-sm text-stone">Látogasd meg a Rezidenciát</p>
          <ul className="mt-5 space-y-1 font-body text-sm text-ivory-dim">
            <li>
              <a href={brand.mapsHref} className="-mx-2 flex min-h-[44px] items-center gap-3 rounded-md px-2 transition-colors hover:text-champagne">
                <MapPin className="h-4 w-4 shrink-0 text-champagne" />
                {brand.address}
              </a>
            </li>
            <li className="-mx-2 flex min-h-[44px] items-center gap-3 px-2">
              <Clock className="h-4 w-4 shrink-0 text-champagne" />
              {brand.hoursShort}
            </li>
            <li>
              <a href={brand.phoneHref} className="-mx-2 flex min-h-[44px] items-center gap-3 rounded-md px-2 transition-colors hover:text-champagne">
                <Phone className="h-4 w-4 shrink-0 text-champagne" />
                {brand.phone}
              </a>
            </li>
            <li>
              <a href={brand.emailHref} className="-mx-2 flex min-h-[44px] items-center gap-3 rounded-md px-2 transition-colors hover:text-champagne">
                <Mail className="h-4 w-4 shrink-0 text-champagne" />
                {brand.email}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition-colors hover:border-champagne/60 hover:text-champagne"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/15 text-ivory-dim transition-colors hover:border-champagne/60 hover:text-champagne"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Nav links */}
        <div className="order-2 sm:order-none">
          <p className="font-body text-xs uppercase tracking-luxe-sm text-stone">Oldalak</p>
          <ul className="mt-3">
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="-mx-2 flex min-h-[44px] items-center rounded-md px-2 font-body text-sm text-ivory-dim transition-colors hover:text-champagne"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-ivory/10 pt-7 sm:flex-row sm:items-center">
        <p className="font-body text-xs text-stone">
          © {new Date().getFullYear()} {brand.name}. Bemutató demó oldal.
        </p>
        <p className="font-body text-xs text-stone">Gondos kézzel készült Budapesten</p>
      </div>
    </footer>
  )
}
