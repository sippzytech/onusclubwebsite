import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import MarqueeStrip from '@/components/MarqueeStrip'
import CardGallery from '@/components/CardGallery'
import HowItWorks from '@/components/HowItWorks'
import Retention from '@/components/Retention'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
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
      {/*
        <Reviews /> is removed until there are real customers to quote.

        It carried six named testimonials — Sophie van den Berg of Bloom
        Coffee, Daan Visser of Visser Barbers and four more — with Unsplash
        photographs of real, identifiable strangers, under a heading that read
        "Real results from real businesses." None of them exist. Every
        merchant on the platform today is test data.

        That is a misleading commercial practice under the EU Unfair
        Commercial Practices Directive, a Google APIs Terms of Service problem
        on the exact page whose OAuth brand verification keeps failing, and it
        attributes real people's faces to invented names.

        The component is left in the tree deliberately: restore this line the
        day there are real quotes, with real names, given with permission.
      */}
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
