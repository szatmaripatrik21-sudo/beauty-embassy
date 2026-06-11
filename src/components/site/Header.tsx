import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { Menu, X, Phone } from 'lucide-react'
import { brand, nav } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: close on Escape + lock the page (Lenis + body) while open so
  // the overlay never scrolls the content behind it or shifts layout.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    lenis?.stop()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      lenis?.start()
      document.body.style.overflow = prevOverflow
    }
  }, [open, lenis])

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? 'bg-ink/80 backdrop-blur-md border-b border-ivory/10'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        {/* Wordmark hidden <768 (the hero H1 carries the brand on mobile); shown ≥md.
            While the menu is open it reappears so the overlay has a clear brand anchor. */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className={`font-display text-2xl tracking-luxe-sm text-ivory md:inline-block ${
            open ? 'inline-block' : 'hidden'
          }`}
          aria-label={`${brand.name} — főoldal`}
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
            className="hidden rounded-full bg-champagne px-6 py-2.5 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink shadow-[0_0_0_2px_transparent] transition-all duration-[var(--dur-fast)] hover:bg-champagne-light hover:shadow-[0_0_0_2px_rgb(var(--gold)/0.35)] active:bg-champagne-press md:inline-flex"
          >
            Időpontfoglalás
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ivory [filter:drop-shadow(0_1px_2px_rgba(38,31,27,0.35))] md:hidden"
            aria-label={open ? 'Menü bezárása' : 'Menü megnyitása'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile full-screen overlay menu — rendered as a SIBLING of <header>, not
        a child: the header's backdrop-blur creates a containing block that would
        trap a `fixed` descendant to the header's box. As a sibling it covers the
        full viewport. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 px-6 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-24 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease }}
                >
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex min-h-[56px] items-center border-b border-ivory/10 py-2 font-display text-[2rem] font-light leading-tight ${
                        isActive ? 'text-champagne' : 'text-ivory'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* CTAs anchored to the bottom — full-height, intentional feel. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + nav.length * 0.05, duration: 0.4, ease }}
              className="mt-auto space-y-3 pt-10"
            >
              <a
                href={brand.phoneHref}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-ivory/25 font-body text-xs font-medium uppercase tracking-luxe-sm text-ivory transition-colors active:border-champagne/70 active:text-champagne"
              >
                <Phone className="h-4 w-4" />
                {brand.phone}
              </a>
              <Link
                to={brand.bookingHref}
                onClick={() => setOpen(false)}
                className="flex min-h-[56px] items-center justify-center rounded-full bg-champagne font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-transform duration-150 ease-out active:scale-[0.98] active:bg-champagne-press"
              >
                Időpontfoglalás
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
