import { Link } from 'react-router-dom'
import { Phone, CalendarHeart } from 'lucide-react'
import { brand } from '@/data/salonData'

/** Fixed Reserve / Call bar — mobile only. */
export default function MobileStickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ivory/12 bg-ink/90 backdrop-blur-md md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-2 gap-2 p-3">
        <Link
          to={brand.bookingHref}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne py-3.5 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink"
        >
          <CalendarHeart className="h-4 w-4" />
          Foglalás
        </Link>
        <a
          href={brand.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/25 py-3.5 font-body text-xs font-medium uppercase tracking-luxe-sm text-ivory"
        >
          <Phone className="h-4 w-4" />
          Hívás
        </a>
      </div>
    </div>
  )
}
