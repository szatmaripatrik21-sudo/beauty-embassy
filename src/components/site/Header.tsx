import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { brand, nav } from '@/data/salonData'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-ink/80 backdrop-blur-md border-b border-ivory/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link
          to="/"
          className="font-display text-2xl tracking-luxe-sm text-ivory"
          aria-label={`${brand.name} — home`}
        >
          {brand.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative font-body text-xs uppercase tracking-luxe-sm transition-colors ${
                  isActive ? 'text-ivory' : 'text-ivory-dim hover:text-ivory'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-champagne transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={brand.bookingHref}
            className="hidden rounded-full bg-champagne px-6 py-2.5 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink shadow-[0_0_0_2px_transparent] transition-all duration-[var(--dur-fast)] hover:bg-champagne-light hover:shadow-[0_0_0_2px_rgb(var(--gold)/0.35)] active:bg-champagne-press sm:inline-flex"
          >
            Időpontfoglalás
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center text-ivory md:hidden"
            aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-ivory/10 bg-ink/95 px-5 pb-6 pt-2 backdrop-blur-md md:hidden">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-b border-ivory/10 py-4 font-display text-2xl ${
                    isActive ? 'text-champagne' : 'text-ivory'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to={brand.bookingHref}
              onClick={() => setOpen(false)}
              className="mt-5 rounded-full bg-champagne py-3.5 text-center font-body text-xs font-medium uppercase tracking-luxe-sm text-ink"
            >
              Időpontfoglalás
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
