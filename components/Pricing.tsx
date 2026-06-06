'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const H2_WORDS = 'One plan. Everything included.'.split(' ')

const FEATURES = [
  'Unlimited loyalty card members',
  'Apple & Google Wallet passes',
  'Custom-branded card design',
  'Staff scanner dashboard',
  'Real-time stamp updates',
  'Wallet push notifications',
  'Birthday & anniversary rewards',
  'Nearby location alerts',
  'Repeat-visit analytics',
  'Customer data export — always yours',
]

export default function Pricing() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 78%', once: true },
        defaults: { ease: 'power3.out' },
      })

      tl.from('.price-eyebrow', { opacity: 0, y: 8, duration: 0.4 })
        .from('.rev-word',      { yPercent: 110, duration: 0.65, stagger: 0.05 }, '-=0.15')
        .from('.price-lead',    { opacity: 0, y: 12, duration: 0.5 }, '-=0.3')
        .from('.price-card',    { opacity: 0, y: 40, scale: 0.97, duration: 0.7, stagger: 0.12 }, '-=0.3')
        .from('.price-feat li', { opacity: 0, x: -10, duration: 0.35, stagger: 0.05 }, '-=0.4')
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      id="pricing"
      style={{ padding: '100px 0', background: 'var(--color-deep-coal)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
          <Eyebrow className="price-eyebrow" style={{ color: 'rgba(244,241,233,0.5)' }}>
            Pricing
          </Eyebrow>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(30px, 4vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
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
          <p className="price-lead" style={{ marginTop: 16, fontSize: 16, color: 'rgba(244,241,233,0.6)', lineHeight: 1.6 }}>
            No setup fees. No per-customer charges. Cancel any time.
          </p>
        </div>

        {/* Cards */}
        <div className="price-grid">

          {/* Monthly */}
          <div
            className="price-card"
            style={{
              background: 'rgba(244,241,233,0.05)',
              border: '1px solid rgba(244,241,233,0.1)',
              borderRadius: 20,
              padding: '36px 32px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(176,137,79,0.2)',
                color: '#B0894F',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: 999,
                padding: '5px 14px',
                marginBottom: 24,
              }}
            >
              Intro offer
            </div>

            <div style={{ marginBottom: 8 }}>
              <span
                className="font-serif"
                style={{ fontSize: 52, fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--color-bone-white)', lineHeight: 1 }}
              >
                €18
              </span>
              <span style={{ fontSize: 15, color: 'rgba(244,241,233,0.5)', marginLeft: 6 }}>/month</span>
            </div>

            <p style={{ fontSize: 14, color: 'rgba(244,241,233,0.55)', marginBottom: 6 }}>
              First 3 months — then <strong style={{ color: 'rgba(244,241,233,0.8)' }}>€30/month</strong>
            </p>

            <div style={{ height: 1, background: 'rgba(244,241,233,0.1)', margin: '28px 0' }} />

            <ul className="price-feat" style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
              {FEATURES.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <Check size={15} style={{ color: '#B0894F', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: 'rgba(244,241,233,0.72)', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline-dark" href="#demo">
              Start with monthly
            </Button>
          </div>

          {/* Yearly — featured */}
          <div
            className="price-card"
            style={{
              background: 'var(--color-bone-white)',
              borderRadius: 20,
              padding: '36px 32px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#B0894F' }} />

            <div
              style={{
                display: 'inline-block',
                background: '#B0894F',
                color: '#F4F1E9',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: 999,
                padding: '5px 14px',
                marginBottom: 24,
              }}
            >
              Best value
            </div>

            <div style={{ marginBottom: 8 }}>
              <span
                className="font-serif"
                style={{ fontSize: 52, fontWeight: 400, letterSpacing: '-0.03em', color: 'var(--color-deep-coal)', lineHeight: 1 }}
              >
                €300
              </span>
              <span style={{ fontSize: 15, color: 'var(--color-stone)', marginLeft: 6 }}>/year</span>
            </div>

            <p style={{ fontSize: 14, color: 'var(--color-stone)', marginBottom: 6 }}>
              €25/month — <strong style={{ color: '#B0894F' }}>save €60</strong> vs monthly
            </p>

            <div style={{ height: 1, background: 'var(--color-ash-gray)', margin: '28px 0' }} />

            <ul className="price-feat" style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
              {FEATURES.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <Check size={15} style={{ color: '#B0894F', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 14, color: 'var(--color-stone)', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>

            <Button variant="ink" href="#demo">
              Start yearly — save €60
            </Button>
          </div>

        </div>

        <p style={{ textAlign: 'center', marginTop: 40, fontSize: 13, color: 'rgba(244,241,233,0.4)' }}>
          All plans include a free onboarding call.{' '}
          <a href="#demo" style={{ color: '#B0894F', textDecoration: 'none' }}>Questions? Talk to us →</a>
        </p>

      </div>

      <style>{`
        .price-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          max-width: 860px;
          margin: 0 auto;
        }
        @media (max-width: 700px) {
          .price-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
