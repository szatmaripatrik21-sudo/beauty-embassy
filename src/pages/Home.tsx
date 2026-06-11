import Seo from '@/components/site/Seo'
import BeautyHero from '@/components/BeautyHero'
import SalonAtmosphere from '@/components/SalonAtmosphere'
import TreatmentCategories from '@/components/TreatmentCategories'
import HowItWorks from '@/components/HowItWorks'
import BrandStory from '@/components/BrandStory'
import GalleryShowcase from '@/components/GalleryShowcase'
import Testimonials from '@/components/Testimonials'
import GiftCardStrip from '@/components/GiftCardStrip'
import FinalCTA from '@/components/FinalCTA'
import { brand } from '@/data/salonData'

/**
 * Compact, image-led landing page — one idea per viewport. The full service
 * list lives on /kezelesek (+ /kezelesek/signature-ritualek), the full story
 * and team on /rolunk, the full gallery on /galeria. The homepage only guides.
 */
export default function Home() {
  return (
    <>
      <Seo title={brand.name} description={brand.shortPitch} path="/" localBusiness />
      <BeautyHero />
      {/* Feel the room first */}
      <SalonAtmosphere />
      {/* Choose a direction (compact nav, no listing) */}
      <TreatmentCategories />
      {/* How booking works — tight 3-step band */}
      <HowItWorks />
      {/* A few strong tiles → /galeria */}
      <GalleryShowcase />
      {/* One-line story → /rolunk */}
      <BrandStory compact />
      {/* Two featured quotes */}
      <Testimonials compact />
      {/* Gift card + Instagram, one compact strip */}
      <GiftCardStrip />
      {/* Single strong close */}
      <FinalCTA />
    </>
  )
}
