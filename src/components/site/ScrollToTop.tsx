import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * On every route change: if the URL carries a #hash (e.g. a homepage category
 * card linking to /kezelesek#skin), scroll that element into view once it has
 * rendered; otherwise jump to the top. Instant jumps avoid a janky smooth-scroll
 * on navigation. `scroll-margin-top` on the targets clears the fixed header.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Defer one frame so the destination route/section is in the DOM.
      const id = hash.slice(1)
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
      })
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}
