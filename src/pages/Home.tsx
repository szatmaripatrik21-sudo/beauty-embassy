import Seo from '@/components/site/Seo'
import BeautyHero from '@/components/BeautyHero'
import SignatureTreatments from '@/components/SignatureTreatments'
import HowItWorks from '@/components/HowItWorks'
import BrandStory from '@/components/BrandStory'
import GalleryGrid from '@/components/GalleryGrid'
import Testimonials from '@/components/Testimonials'
import GiftCardStrip from '@/components/GiftCardStrip'
import TeamPreview from '@/components/TeamPreview'
import FinalCTA from '@/components/FinalCTA'
import { brand, galleryKeys } from '@/data/salonData'

export default function Home() {
  return (
    <>
      <Seo
        title={brand.name}
        description={brand.shortPitch}
        path="/"
        localBusiness
      />
      <BeautyHero />
      <SignatureTreatments />
      <HowItWorks />
      <BrandStory />
      <GalleryGrid keys={galleryKeys.slice(0, 6)} showCta />
      <Testimonials />
      <GiftCardStrip />
      <TeamPreview />
      <FinalCTA />
    </>
  )
}
