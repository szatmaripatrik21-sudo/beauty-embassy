import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Number of lines to clamp to on mobile before "read more". */
  lines?: 2 | 3 | 4
  className?: string
  moreLabel?: string
  lessLabel?: string
}

const CLAMP: Record<number, string> = {
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
}

/**
 * Progressive disclosure for long copy on mobile.
 *
 * Mobile: clamps to `lines`, revealing a "Tovább" toggle ONLY when the content
 * actually overflows. Desktop (≥sm): always fully expanded, no toggle — so this
 * never changes the desktop reading experience.
 */
export default function ReadMore({
  children,
  lines = 3,
  className = '',
  moreLabel = 'Tovább',
  lessLabel = 'Kevesebb',
}: Props) {
  const [open, setOpen] = useState(false)
  const [overflowing, setOverflowing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Measure against the clamped state. Skip while open (content is fixed, so
  // once we know it overflows we keep the toggle available to collapse again).
  useEffect(() => {
    const el = ref.current
    if (!el || open) return
    const check = () => setOverflowing(el.scrollHeight - 1 > el.clientHeight)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => ro.disconnect()
  }, [children, open])

  const clamp = CLAMP[lines] ?? CLAMP[3]

  return (
    <div className={className}>
      <div ref={ref} className={open ? '' : `${clamp} sm:line-clamp-none`}>
        {children}
      </div>
      {overflowing && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-2 inline-flex min-h-[36px] items-center font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:text-champagne-light active:text-champagne-press sm:hidden"
        >
          {open ? lessLabel : moreLabel}
        </button>
      )}
    </div>
  )
}
