import Seo from '@/components/site/Seo'
import PageHeader from '@/components/site/PageHeader'
import GalleryGrid from '@/components/GalleryGrid'
import FinalCTA from '@/components/FinalCTA'

export default function Gallery() {
  return (
    <>
      <Seo
        title="Galéria"
        description="Bepillantás a Beauty Embassybe — legutóbbi bőr-, haj- és sminkmunkák, valamint maga a Rezidencia."
        path="/galeria"
      />
      <PageHeader
        eyebrow="Galéria"
        title="A munka, a terek, a fény"
        intro="Összefüggő válogatás a legutóbbi átalakulásokból és az Andrássy úti Rezidencia nyugodt belső tereiből."
        image="detail"
      />
      <GalleryGrid showHeader={false} />
      <FinalCTA />
    </>
  )
}
