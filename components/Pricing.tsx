'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

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
  'Customer data export, always yours',
]

export default function Pricing() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      defaults: { ease: 'power3.out' },
    })
      .from('.pr-eyebrow', { opacity: 0, y: 10, duration: 0.45 })
      .from('.pr-word',    { yPercent: 115, duration: 0.7, stagger: 0.055 }, '-=0.2')
      .from('.pr-lead',   { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
      .from('.pr-card',   { opacity: 0, y: 48, duration: 0.7, stagger: 0.15 }, '-=0.2')
      .from('.pr-feat li', { opacity: 0, x: -8, duration: 0.35, stagger: 0.04 }, '-=0.4')
  }, { scope: ref })

  return (
    <section ref={ref} id="pricing" style={{ background: '#14271C', padding: '100px 6vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="pr-eyebrow" style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#B0894F', marginBottom: 20,
          }}>
            Pricing
          </p>

          <h2 style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 'clamp(32px, 4.5vw, 60px)',
            fontWeight: 900, letterSpacing: '-0.03em',
            lineHeight: 1.05, textTransform: 'uppercase',
            color: '#F4F1E9', margin: '0 auto 20px',
          }}>
            {H2_WORDS.map((word, i) => (
              <span key={i} style={{
                display: 'inline-block', overflow: 'hidden',
                verticalAlign: 'bottom', paddingBottom: '0.06em',
                marginBottom: '-0.04em',
                marginRight: i < H2_WORDS.length - 1 ? '0.28em' : 0,
              }}>
                <span className="pr-word" style={{ display: 'inline-block' }}>{word}</span>
              </span>
            ))}
          </h2>

          <p className="pr-lead" style={{
            fontSize: 15, color: 'rgba(244,241,233,0.5)',
            lineHeight: 1.75, maxWidth: 400, margin: '0 auto',
          }}>
            No setup fees. No per-customer charges. Cancel any time.
          </p>
        </div>

        {/* ── Cards ───────────────────────────────────────────────── */}
        <div className="pr-grid">

          {/* Monthly — ghost card */}
          <div className="pr-card" style={{
            borderRadius: 20,
            border: '1px solid rgba(244,241,233,0.12)',
            padding: 'clamp(28px, 3.5vw, 44px)',
            display: 'flex', flexDirection: 'column',
          }}>
            <span style={{
              display: 'inline-block', alignSelf: 'flex-start',
              background: 'rgba(176,137,79,0.15)', color: '#B0894F',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', borderRadius: 999,
              padding: '5px 14px', marginBottom: 28,
            }}>
              Intro offer
            </span>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
              <span className="font-serif" style={{
                fontSize: 'clamp(44px, 5vw, 64px)', fontWeight: 400,
                letterSpacing: '-0.03em', color: '#F4F1E9', lineHeight: 1,
              }}>€18</span>
              <span style={{ fontSize: 14, color: 'rgba(244,241,233,0.4)' }}>/month</span>
            </div>

            <p style={{ fontSize: 13, color: 'rgba(244,241,233,0.4)', marginBottom: 4 }}>
              First 3 months, then <strong style={{ color: 'rgba(244,241,233,0.7)' }}>€30/month</strong>
            </p>

            <div style={{ height: 1, background: 'rgba(244,241,233,0.08)', margin: '28px 0' }} />

            <ul className="pr-feat" style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', flex: 1 }}>
              {FEATURES.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 13 }}>
                  <Check size={14} style={{ color: '#B0894F', flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 14, color: 'rgba(244,241,233,0.5)', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline-dark" href="#demo">Start with monthly</Button>
          </div>

          {/* Annual — bone-white featured card */}
          <div className="pr-card" style={{
            borderRadius: 20,
            background: '#F4F1E9',
            padding: 'clamp(28px, 3.5vw, 44px)',
            display: 'flex', flexDirection: 'column',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
          }}>
            {/* Gold top bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#B0894F' }} />

            <span style={{
              display: 'inline-block', alignSelf: 'flex-start',
              background: '#B0894F', color: '#14271C',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', borderRadius: 999,
              padding: '5px 14px', marginBottom: 28,
            }}>
              Best value
            </span>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
              <span className="font-serif" style={{
                fontSize: 'clamp(44px, 5vw, 64px)', fontWeight: 400,
                letterSpacing: '-0.03em', color: '#14271C', lineHeight: 1,
              }}>€25</span>
              <span style={{ fontSize: 14, color: '#6e7860' }}>/month</span>
            </div>

            <p style={{ fontSize: 13, color: '#6e7860', marginBottom: 4 }}>
              Billed as €300/year —{' '}
              <strong style={{ color: '#B0894F' }}>save €60</strong> vs monthly
            </p>

            <div style={{ height: 1, background: 'rgba(20,39,28,0.1)', margin: '28px 0' }} />

            <ul className="pr-feat" style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', flex: 1 }}>
              {FEATURES.map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 13 }}>
                  <Check size={14} style={{ color: '#B0894F', flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 14, color: '#6e7860', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>

            <Button variant="ink" href="#demo">Start yearly — €25/month</Button>
          </div>

        </div>

        <p style={{
          textAlign: 'center', marginTop: 40,
          fontSize: 13, color: 'rgba(244,241,233,0.35)',
        }}>
          All plans include a free onboarding call.{' '}
          <a href="#demo" style={{ color: '#B0894F', textDecoration: 'none', fontWeight: 600 }}>
            Questions? Talk to us →
          </a>
        </p>

      </div>

      <style>{`
        .pr-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          max-width: 880px;
          margin: 0 auto;
        }
        @media (max-width: 680px) {
          .pr-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
