import { Link } from 'react-router-dom'
import Seo from '@/components/site/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Az oldal nem található" description="A keresett oldal nem található." path="/" />
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <p className="eyebrow">404 hiba</p>
        <h1 className="mt-4 font-display text-[clamp(3rem,10vw,6rem)] font-light leading-none text-ivory">
          Nem találjuk ezt az oldalt
        </h1>
        <p className="mt-5 max-w-md font-body text-base text-ivory-dim">
          Lehet, hogy az oldal átköltözött, vagy a hivatkozás hiányos. Engedd, hogy visszakísérjünk a Rezidenciára.
        </p>
        <Link
          to="/"
          className="mt-9 inline-flex rounded-full bg-champagne px-8 py-3.5 font-body text-xs font-medium uppercase tracking-luxe-sm text-ink transition-colors hover:bg-champagne-light"
        >
          Vissza a főoldalra
        </Link>
      </section>
    </>
  )
}
