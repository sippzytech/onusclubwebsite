import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import StatsBar from '@/components/StatsBar'
import Retention from '@/components/Retention'
import Features from '@/components/Features'
import InvertBlock from '@/components/InvertBlock'
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
      <StatsBar />
      <Retention />
      <Features />
      <InvertBlock />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
