'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Check, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const H2_WORDS = '14 days free. Then just.'.split(' ')

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
  const priceNumRef = useRef<HTMLSpanElement>(null)
  const savingsBadgeRef = useRef<HTMLDivElement>(null)
  const [yearly, setYearly] = useState(false)
  const animating = useRef(false)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      defaults: { ease: 'power3.out' },
    })
      .from('.pr-eyebrow', { opacity: 0, y: 10, duration: 0.45 })
      .from('.pr-word',    { yPercent: 115, duration: 0.7, stagger: 0.055 }, '-=0.2')
      .from('.pr-card',   { opacity: 0, y: 60, duration: 0.8 }, '-=0.3')
      .from('.pr-feat-item', { opacity: 0, x: -12, duration: 0.35, stagger: 0.04 }, '-=0.5')
  }, { scope: ref })

  const animatePrice = useCallback((toYearly: boolean) => {
    if (animating.current) return
    animating.current = true

    const from = toYearly ? 30 : 25
    const to   = toYearly ? 25 : 30
    const el   = priceNumRef.current
    const badge = savingsBadgeRef.current
    if (!el) { setYearly(toYearly); animating.current = false; return }

    // Count animation
    const obj = { val: from }
    gsap.to(obj, {
      val: to,
      duration: toYearly ? 0.9 : 0.5,
      ease: toYearly ? 'power2.inOut' : 'power1.in',
      onUpdate() {
        el.textContent = `${Math.round(obj.val)}`
      },
      onComplete() {
        setYearly(toYearly)
        animating.current = false
      },
    })

    // Shake/bounce the price on drop
    if (toYearly) {
      gsap.timeline()
        .to(el, { scale: 1.12, duration: 0.18, ease: 'power2.out' })
        .to(el, { scale: 1, duration: 0.55, ease: 'elastic.out(1.2, 0.5)' })

      if (badge) {
        gsap.fromTo(badge,
          { opacity: 0, scale: 0.7, y: 8 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(2)', delay: 0.4 }
        )
      }
    } else {
      if (badge) gsap.to(badge, { opacity: 0, scale: 0.8, duration: 0.2 })
    }
  }, [])

  return (
    <section ref={ref} id="pricing" style={{ background: '#0d1c13', padding: '110px 6vw', overflow: 'hidden', position: 'relative' }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(176,137,79,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="pr-eyebrow" style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#B0894F', marginBottom: 20,
          }}>
            Pricing
          </p>
          <h2 style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 900, letterSpacing: '-0.03em',
            lineHeight: 1.05, textTransform: 'uppercase',
            color: '#F4F1E9', margin: '0 auto',
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
        </div>

        {/* ── Card + aside layout ──────────────────────────────────── */}
        <div className="pr-layout">

          {/* LEFT — price card */}
          <div className="pr-card" style={{
            background: '#F4F1E9',
            position: 'relative', overflow: 'hidden',
            padding: 'clamp(36px, 4.5vw, 56px)',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 48px 120px rgba(0,0,0,0.5)',
          }}>
            {/* Gold top bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #B0894F, #d4a96a, #B0894F)' }} />

            {/* Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
              <span style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
                color: !yearly ? '#14271C' : 'rgba(20,39,28,0.35)',
                transition: 'color 0.25s', textTransform: 'uppercase',
              }}>Monthly</span>

              <button
                onClick={() => animatePrice(!yearly)}
                style={{
                  position: 'relative', width: 48, height: 26, flexShrink: 0,
                  background: yearly ? '#14271C' : 'rgba(20,39,28,0.15)',
                  border: 'none', borderRadius: 999,
                  cursor: 'pointer', transition: 'background 0.25s',
                }}
                aria-label="Toggle billing period"
              >
                <span style={{
                  position: 'absolute', top: 4,
                  left: yearly ? 26 : 4,
                  width: 18, height: 18,
                  background: yearly ? '#B0894F' : '#F4F1E9',
                  borderRadius: '50%',
                  transition: 'left 0.28s cubic-bezier(0.4,0,0.2,1), background 0.25s',
                  display: 'block',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                }} />
              </button>

              <span style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
                color: yearly ? '#14271C' : 'rgba(20,39,28,0.35)',
                transition: 'color 0.25s', textTransform: 'uppercase',
              }}>Yearly</span>
            </div>

            {/* Big price */}
            <div style={{ marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                <span style={{
                  fontSize: 24, fontWeight: 900, color: '#B0894F',
                  lineHeight: 1, marginTop: 12,
                  fontFamily: 'var(--font-lato), sans-serif',
                }}>€</span>
                <span
                  ref={priceNumRef}
                  style={{
                    fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
                    fontSize: 'clamp(72px, 10vw, 112px)', fontWeight: 900,
                    letterSpacing: '-0.05em', color: '#14271C', lineHeight: 0.88,
                    display: 'inline-block',
                  }}
                >
                  {yearly ? '25' : '30'}
                </span>
              </div>
              <p style={{ fontSize: 14, color: '#6e7860', marginTop: 10 }}>
                per month{yearly ? ', billed €300/year' : ', billed monthly'}
              </p>
            </div>

            {/* Savings badge */}
            <div
              ref={savingsBadgeRef}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: '#14271C', padding: '7px 14px',
                marginTop: 16, marginBottom: 32,
                opacity: yearly ? 1 : 0,
                alignSelf: 'flex-start',
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: '#B0894F', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                You save €60/year
              </span>
            </div>

            {!yearly && <div style={{ height: 32 }} />}

            <div style={{ height: 1, background: 'rgba(20,39,28,0.1)', marginBottom: 32 }} />

            {/* CTA */}
            <a
              href="#demo"
              className="pr-cta"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: '#14271C', color: '#F4F1E9',
                padding: '16px 22px',
                textDecoration: 'none',
                fontFamily: 'var(--font-lato), sans-serif',
                fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#B0894F')}
              onMouseLeave={e => (e.currentTarget.style.background = '#14271C')}
            >
              <span>Start 14-day free trial</span>
              <ArrowRight size={16} />
            </a>

            <p style={{ fontSize: 12, color: 'rgba(20,39,28,0.4)', marginTop: 14, textAlign: 'center' }}>
              No card required to start
            </p>
          </div>

          {/* RIGHT — features */}
          <div className="pr-features-col">
            <p style={{
              fontFamily: 'var(--font-lato), sans-serif',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#B0894F', marginBottom: 24,
            }}>
              Everything included
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px' }}>
              {FEATURES.map(f => (
                <li key={f} className="pr-feat-item" style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  paddingBottom: 16, marginBottom: 16,
                  borderBottom: '1px solid rgba(244,241,233,0.06)',
                }}>
                  <span style={{
                    width: 18, height: 18, flexShrink: 0, marginTop: 1,
                    background: '#B0894F',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Check size={10} color="#14271C" strokeWidth={3} />
                  </span>
                  <span style={{ fontSize: 14, color: 'rgba(244,241,233,0.65)', lineHeight: 1.55 }}>{f}</span>
                </li>
              ))}
            </ul>

            <div style={{
              border: '1px solid rgba(176,137,79,0.25)',
              padding: '20px 24px',
            }}>
              <p style={{ fontSize: 13, color: 'rgba(244,241,233,0.5)', lineHeight: 1.7, margin: 0 }}>
                All plans include a free onboarding call with our team.{' '}
                <a href="#demo" style={{ color: '#B0894F', textDecoration: 'none', fontWeight: 600 }}>
                  Questions? Talk to us →
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .pr-layout {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: start;
        }
        @media (max-width: 860px) {
          .pr-layout { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
          .pr-features-col { display: none; }
        }
      `}</style>
    </section>
  )
}
