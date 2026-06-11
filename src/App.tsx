import { Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import Header from '@/components/site/Header'
import SiteFooter from '@/components/SiteFooter'
import MobileStickyBar from '@/components/MobileStickyBar'
import ScrollToTop from '@/components/site/ScrollToTop'
import Home from '@/pages/Home'
import Treatments from '@/pages/Treatments'
import SignatureRituals from '@/pages/SignatureRituals'
import About from '@/pages/About'
import Gallery from '@/pages/Gallery'
import Contact from '@/pages/Contact'
import Book from '@/pages/Book'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 }}>
      <ScrollToTop />
      <div id="top" className="flex min-h-screen flex-col bg-ink">
        <Header />
        {/* Sticky-bar clearance is handled on the footer (the last element),
            not here — main's padding never protected the footer, which sits
            outside it. See SiteFooter's mobile bottom padding. */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kezelesek" element={<Treatments />} />
            <Route path="/kezelesek/signature-ritualek" element={<SignatureRituals />} />
            <Route path="/rolunk" element={<About />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/kapcsolat" element={<Contact />} />
            <Route path="/foglalas" element={<Book />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
        <MobileStickyBar />
      </div>
    </ReactLenis>
  )
}

export default App
