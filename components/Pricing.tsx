'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Check } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const H2_WORDS = 'Simple, per location.'.split(' ')

const POINTS = [
  'One flat monthly price',
  'No per-customer fees',
  'Cancel any time',
  'Free onboarding & setup',
]

export default function Pricing() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%', once: true },
        defaults: { ease: 'power3.out' },
      })

      tl.from('.pricing-eyebrow', { opacity: 0, y: 8, duration: 0.4 })
        .from('.rev-word', { yPercent: 110, duration: 0.6, stagger: 0.06 }, '-=0.15')
        .from('.pricing-card', { y: 40, scale: 0.97, opacity: 0, duration: 0.75 }, '-=0.3')
        .from('.price-point', { x: -22, opacity: 0, duration: 0.45, stagger: 0.09, ease: 'power2.out' }, '-=0.5')
        .from('.pricing-cta', { scale: 0.85, opacity: 0, duration: 0.55, ease: 'back.out(1.8)' }, '-=0.15')
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="pricing"
      style={{ padding: '96px 0', background: 'var(--color-deep-coal)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <Eyebrow
            className="pricing-eyebrow"
            style={{ color: 'rgba(244,241,233,0.5)' }}
          >
            Pricing
          </Eyebrow>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(30px, 4vw, 48px)',
              lineHeight: 1.12,
              letterSpacing: '-0.018em',
              color: 'var(--color-bone-white)',
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
        </div>

        {/* Pricing card */}
        <div
          className="pricing-card"
          style={{
            maxWidth: 520,
            margin: '48px auto 0',
            background: 'rgba(244,241,233,0.05)',
            border: '1px solid rgba(244,241,233,0.14)',
            borderRadius: 22,
            padding: '44px 44px 40px',
            textAlign: 'center',
          }}
        >
          {/* Gold accent line */}
          <div
            style={{
              width: 40,
              height: 3,
              background: '#B0894F',
              borderRadius: 99,
              margin: '0 auto 28px',
            }}
          />

          <p
            className="font-serif"
            style={{
              fontSize: 15,
              color: 'rgba(244,241,233,0.55)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            Per location
          </p>
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(48px, 6vw, 72px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: 'var(--color-bone-white)',
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            Custom
          </p>
          <p style={{ fontSize: 14, color: 'rgba(244,241,233,0.45)', marginBottom: 32 }}>
            Priced for your business — no surprises
          </p>

          {/* Feature list */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              marginBottom: 36,
              textAlign: 'left',
            }}
          >
            {POINTS.map((point) => (
              <div
                key={point}
                className="price-point"
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    background: 'rgba(176,137,79,0.18)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={12} strokeWidth={2.5} style={{ color: '#B0894F' }} />
                </span>
                <span style={{ fontSize: 15, color: 'rgba(244,241,233,0.82)' }}>{point}</span>
              </div>
            ))}
          </div>

          <div className="pricing-cta">
            <Button variant="ink" href="#demo">
              Get pricing for your business
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
