import { brand, hours } from '@/data/salonData'

/**
 * Per-page document metadata. React 19 hoists <title>/<meta>/<link> rendered
 * anywhere in the tree into <head>, so each page simply renders <Seo …/>.
 */
type SeoProps = {
  title: string
  description: string
  /** Path beginning with "/" — used for the canonical URL. */
  path?: string
  image?: string
  /** Emit LocalBusiness schema (home page only). */
  localBusiness?: boolean
}

const SITE_URL = 'https://www.beautyembassy.hu'
const OG_IMAGE =
  'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?q=80&w=1200&auto=format&fit=crop'

// Map salonData hours to schema.org openingHours format (e.g. "Tu 09:00-19:00").
const DAY_MAP: Record<string, string> = {
  Hétfő: 'Mo',
  Kedd: 'Tu',
  Szerda: 'We',
  Csütörtök: 'Th',
  Péntek: 'Fr',
  Szombat: 'Sa',
  Vasárnap: 'Su',
}

function buildOpeningHours(): string[] {
  return hours
    .filter((h) => h.value !== 'Zárva')
    .map((h) => {
      const abbr = DAY_MAP[h.day] ?? h.day
      // "9:00 – 19:00" → "09:00-19:00"
      const times = h.value
        .replace(/\s/g, '')
        .replace('–', '-')
        .replace(/^(\d):/, '0$1:')
        .replace(/-(\d):/, '-0$1:')
      return `${abbr} ${times}`
    })
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: brand.name,
  description: brand.shortPitch,
  url: SITE_URL,
  telephone: brand.phone,
  email: brand.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: brand.addressLines[0],
    addressLocality: 'Budapest',
    postalCode: '1061',
    addressCountry: 'HU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.5053,
    longitude: 19.0662,
  },
  openingHours: buildOpeningHours(),
  priceRange: '$$',
  image: OG_IMAGE,
  sameAs: [brand.instagram, brand.facebook],
  // No aggregateRating: emitting review schema without real, on-site reviews is a
  // Google rich-results violation. Re-add only with genuine review data.
  hasMap: brand.mapsHref,
}

export default function Seo({ title, description, path = '/', image = OG_IMAGE, localBusiness = false }: SeoProps) {
  const fullTitle =
    title === brand.name ? `${brand.name} — ${brand.tagline}` : `${title} · ${brand.name}`
  const url = `${SITE_URL}${path}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={brand.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {localBusiness && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      )}
    </>
  )
}
