import { useEffect, useState } from 'react'

/**
 * Returns true when the viewport is at/below `breakpoint` (default 768px).
 *
 * Uses a lazy initializer so the correct value is available on the VERY FIRST
 * render — no `useEffect` delay, no desktop-first flash on mobile.
 * The effect only registers the `change` listener for resize events.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches
      : false
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const update = () => setIsMobile(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [breakpoint])

  return isMobile
}
