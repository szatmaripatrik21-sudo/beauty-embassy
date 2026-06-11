import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, CalendarHeart } from 'lucide-react'
import { brand } from '@/data/salonData'

/**
 * Fixed Reserve / Call bar — mobile only.
 *
 * Hidden while the mobile hero ([data-mobile-hero]) is on screen, because the
 * hero already carries the primary CTA — showing the bar there just duplicates
 * it. Once the hero scrolls out of view the bar fades/slides up.
 *
 * Only the Home route ('/') has a mobile hero, so visibility is derived from the
 * route: on every other page the bar is always visible. On Home it stays hidden
 * until an IntersectionObserver reports the hero has scrolled off-screen — no
 * synchronous setState in the effect, so no cascading-render lint violation.
 */
export default function MobileStickyBar() {
  const { pathname } = useLocation()
  const hasHero = pathname === '/'
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    if (!hasHero) return
    const hero = document.querySelector('[data-mobile-hero]')
    if (!hero) return
    const io = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [hasHero, pathname])

  const visible = !hasHero || pastHero

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-ivory/12 bg-ink/90 backdrop-blur-md transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-2 gap-2.5 px-4 py-2.5">
        <Link
          to={brand.bookingHref}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-champagne font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-transform duration-150 ease-out active:scale-[0.98] active:bg-champagne-press"
        >
          <CalendarHeart className="h-4 w-4" />
          Foglalás
        </Link>
        <a
          href={brand.phoneHref}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-ivory/25 font-body text-xs font-medium uppercase tracking-luxe-sm text-ivory transition-transform duration-150 ease-out active:scale-[0.98]"
        >
          <Phone className="h-4 w-4" />
          Hívás
        </a>
      </div>
    </div>
  )
}
