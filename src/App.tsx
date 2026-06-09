import { Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import Header from '@/components/site/Header'
import SiteFooter from '@/components/SiteFooter'
import MobileStickyBar from '@/components/MobileStickyBar'
import ScrollToTop from '@/components/site/ScrollToTop'
import Home from '@/pages/Home'
import Treatments from '@/pages/Treatments'
import About from '@/pages/About'
import Gallery from '@/pages/Gallery'
import Contact from '@/pages/Contact'
import Book from '@/pages/Book'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <ScrollToTop />
      <div id="top" className="flex min-h-screen flex-col bg-ink">
        <Header />
        {/* pb-28 (112px) clears the ~80px sticky bar on mobile; zero on desktop */}
        <main className="flex-1 pb-28 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book" element={<Book />} />
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
