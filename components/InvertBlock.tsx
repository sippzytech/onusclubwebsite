'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ParallaxFeatureSection, FeatureSectionData } from '@/components/ui/parallax-scroll-feature-section'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const H2_WORDS = 'Four things that set us apart.'.split(' ')

const SECTIONS: FeatureSectionData[] = [
  {
    num: '01',
    title: 'Joins in one tap',
    sub: 'No app to download. Apple & Google Wallet.',
    description: 'Customer scans your QR code at the counter. One tap adds the branded card directly to their wallet. The card lives on their lock screen, always visible.',
    imageUrl: '/mockup_1.png',
    reverse: false,
  },
  {
    num: '02',
    title: 'Earns at the counter',
    sub: 'Counter-simple scanning. No training needed.',
    description: 'Staff opens the scanner on any phone or tablet. Customer shows their wallet card to be scanned. Stamp added instantly, card updates in real time.',
    imageUrl: '/mockup_2.png',
    reverse: true,
  },
  {
    num: '03',
    title: 'Comes back automatically',
    sub: 'Push notifications. Birthday rewards. Geo alerts.',
    description: 'Wallet nudges customers before they forget. Birthday and anniversary rewards run on autopilot. Location alerts fire when regulars walk nearby.',
    imageUrl: '/mockup_3.png',
    reverse: false,
  },
  {
    num: '04',
    title: 'Pays off, measurably',
    sub: 'You own your list. Real analytics. Real results.',
    description: 'Track active members and repeat visit rates. See which rewards drive customers back. Export your full customer list any time.',
    imageUrl: '/mockup_4.png',
    reverse: true,
  },
]

export default function InvertBlock() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.timeline({
        scrollTrigger: { trigger: '.why-header', start: 'top 82%', once: true },
        defaults: { ease: 'power3.out' },
      })
        .from('.why-eyebrow', { opacity: 0, y: 8, duration: 0.4 })
        .from('.rev-word',   { yPercent: 110, duration: 0.65, stagger: 0.05 }, '-=0.15')
        .from('.why-lead',   { opacity: 0, y: 12, duration: 0.5 }, '-=0.3')
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      id="compare"
      style={{ padding: '80px 0 0', background: 'var(--color-bone-white)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="why-header" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <Eyebrow className="why-eyebrow">Why OnUsClub</Eyebrow>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(30px, 4vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--color-deep-coal)',
              marginTop: 14,
              fontWeight: 400,
            }}
          >
            {H2_WORDS.map((word, i) => (
              <span
                key={i}
                className="word-clip"
                style={i < H2_WORDS.length - 1 ? { marginRight: '0.28em' } : undefined}
              >
                <span className="rev-word">{word}</span>
              </span>
            ))}
          </h2>
          <p className="why-lead" style={{ marginTop: 16, fontSize: 16, color: 'var(--color-stone)', lineHeight: 1.65 }}>
            Four things that turn a first-time visitor into someone who keeps coming back.
          </p>
        </div>
      </div>

      <ParallaxFeatureSection sections={SECTIONS} />
    </section>
  )
}
