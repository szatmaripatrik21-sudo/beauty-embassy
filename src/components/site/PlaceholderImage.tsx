import { images, img, type ImageKey } from '@/data/salonData'

type Props = {
  imageKey: ImageKey
  /** Aspect-ratio utility class, e.g. "aspect-[16/10]". */
  ratio?: string
  className?: string
}

/**
 * Soft-focus, atmospheric image treatment. Renders the demo photo with a
 * deliberate dreamy blur and a warm champagne wash so it reads as an
 * intentional editorial mood image — not a "waiting for a real photo" slot.
 * The blur also keeps the underlying demo photo from being clearly legible.
 * To show photos sharp later, drop the blur in the inline `filter` below.
 */
export default function PlaceholderImage({
  imageKey,
  ratio = 'aspect-[16/10]',
  className = '',
}: Props) {
  const subject = images[imageKey].alt

  return (
    <figure
      className={`group relative w-full overflow-hidden rounded-md ring-1 ring-champagne/20 ${ratio} ${className}`}
    >
      <img
        src={img(imageKey)}
        alt={subject}
        loading="lazy"
        // Blur lives in the same inline `filter` as the grade — the `.img-grade`
        // class sets `filter` too, so a Tailwind blur-* class would be overridden.
        // scale up so the soft focus doesn't expose hard edges.
        className="absolute inset-0 h-full w-full scale-110 object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.16]"
        style={{ filter: 'blur(22px) saturate(1.02) brightness(1.04)' }}
      />

      {/* Warm champagne wash — gives the soft image a branded, finished glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-champagne/15 via-transparent to-ink/15"
      />
      {/* Gentle vignette for depth so it feels art-directed, not flat */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 70px 8px rgba(38,31,27,0.18)',
        }}
      />
    </figure>
  )
}
