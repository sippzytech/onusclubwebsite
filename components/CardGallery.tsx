'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CircularGallery } from '@/components/ui/circular-gallery-2'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const H2_WORDS = 'Customize your card for your business.'.split(' ')

const CARDS = [
  { image: '/01-cafe.png',    text: 'Café' },
  { image: '/02-barber.png',  text: 'Barber' },
  { image: '/03-bakery.png',  text: 'Bakery' },
  { image: '/04-gym.png',     text: 'Gym' },
  { image: '/05-salon.png',   text: 'Salon' },
  { image: '/06-pizza.png',   text: 'Pizza' },
  { image: '/07-juice.png',   text: 'Juice Bar' },
  { image: '/08-florist.png', text: 'Florist' },
  { image: '/09-nails.png',   text: 'Nails' },
  { image: '/10-gelato.png',  text: 'Gelato' },
]

export default function CardGallery() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      defaults: { ease: 'power3.out' },
    })
      .from('.cg-eyebrow', { opacity: 0, y: 10, duration: 0.45 })
      .from('.cg-word',    { yPercent: 115, duration: 0.7, stagger: 0.055 }, '-=0.2')
      .from('.cg-lead',   { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
      .from('.cg-canvas', { opacity: 0, duration: 0.6 }, '-=0.2')
  }, { scope: ref })

  return (
    <section ref={ref} style={{ background: '#F4F1E9', paddingTop: 'clamp(48px, 7vw, 96px)', paddingBottom: 0, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw', marginBottom: 64, textAlign: 'center' }}>

        <p className="cg-eyebrow" style={{
          fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#B0894F', marginBottom: 20,
        }}>
          For every business
        </p>

        <h2 style={{
          fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
          fontSize: 'clamp(32px, 4.5vw, 60px)',
          fontWeight: 900, letterSpacing: '-0.03em',
          lineHeight: 1.05, textTransform: 'uppercase',
          color: '#14271C', margin: '0 auto 20px',
        }}>
          {H2_WORDS.map((word, i) => (
            <span key={i} style={{
              display: 'inline-block', overflow: 'hidden',
              verticalAlign: 'bottom', paddingBottom: '0.06em',
              marginBottom: '-0.04em',
              marginRight: i < H2_WORDS.length - 1 ? '0.28em' : 0,
            }}>
              <span className="cg-word" style={{ display: 'inline-block' }}>{word}</span>
            </span>
          ))}
        </h2>

        <p className="cg-lead" style={{
          fontSize: 15, lineHeight: 1.75,
          color: '#6e7860', maxWidth: 480, margin: '0 auto',
        }}>
          Every card is fully branded to your business — your logo, your colours, your name. Launch in minutes, not weeks.
        </p>
      </div>

      {/* Gallery canvas */}
      <div className="cg-canvas cg-canvas-wrap" style={{ width: '100%' }}>
        <CircularGallery
          items={CARDS}
          bend={2}
          borderRadius={0.04}
          scrollSpeed={2}
          scrollEase={0.04}
        />
      </div>

      <style>{`
        .cg-canvas-wrap { height: 600px; }
        @media (max-width: 700px) { .cg-canvas-wrap { height: 360px; } }
      `}</style>
    </section>
  )
}
