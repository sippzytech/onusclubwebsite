import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MarqueeStrip from '@/components/MarqueeStrip'
import CardGallery from '@/components/CardGallery'
import HowItWorks from '@/components/HowItWorks'
import Retention from '@/components/Retention'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Reviews from '@/components/Reviews'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <Retention />
      <MarqueeStrip />
      <CardGallery />
      <Features />
      <Pricing />
      <Reviews />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
