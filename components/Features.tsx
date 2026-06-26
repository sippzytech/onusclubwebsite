'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  SmartphoneNfc, CreditCard, FolderOpen, Bell,
  ScanLine, BarChart3, Gift, MapPin, Palette,
} from 'lucide-react'
import { FEATURES } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ICONS = [SmartphoneNfc, CreditCard, FolderOpen, Bell, ScanLine, BarChart3, Gift, MapPin, Palette]
const H2_WORDS = 'Loyalty that does the heavy lifting.'.split(' ')

export default function Features() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      defaults: { ease: 'power3.out' },
    })
      .from('.feat-eyebrow', { opacity: 0, y: 10, duration: 0.45 })
      .from('.feat-word',    { yPercent: 115, duration: 0.7, stagger: 0.055 }, '-=0.2')
      .from('.feat-lead',   { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')

    const grid = ref.current?.querySelector('.feat-grid')
    if (!grid) return

    gsap.from('.feat-card', {
      opacity: 0, y: 40, duration: 0.65,
      stagger: { amount: 0.6, from: 'start' },
      ease: 'power3.out',
      scrollTrigger: { trigger: grid, start: 'top 84%', once: true },
    })

    gsap.from('.feat-icon-wrap', {
      scale: 0, duration: 0.45,
      stagger: { amount: 0.6, from: 'start' },
      ease: 'back.out(2.5)',
      scrollTrigger: { trigger: grid, start: 'top 84%', once: true },
    })
  }, { scope: ref })

  return (
    <section
      ref={ref}
      id="features"
      style={{ background: '#F4F1E9', padding: '100px 6vw' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Header ────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="feat-eyebrow" style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#B0894F', marginBottom: 20,
          }}>
            Why OnUsClub
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
                <span className="feat-word" style={{ display: 'inline-block' }}>{word}</span>
              </span>
            ))}
          </h2>

          <p className="feat-lead" style={{
            fontSize: 15, lineHeight: 1.75,
            color: '#6e7860', maxWidth: 440, margin: '0 auto',
          }}>
            Everything you need to turn first-time visitors into loyal regulars — without the complexity.
          </p>
        </div>

        {/* ── Grid ──────────────────────────────────────────────── */}
        <div className="feat-grid">
          {FEATURES.map((feat, i) => {
            const Icon = ICONS[i]
            return (
              <div
                key={feat.h}
                className="feat-card"
                onMouseEnter={e => {
                  gsap.to(e.currentTarget, { y: -6, boxShadow: '0 20px 48px rgba(20,39,28,0.1)', duration: 0.3, ease: 'power2.out' })
                }}
                onMouseLeave={e => {
                  gsap.to(e.currentTarget, { y: 0, boxShadow: '0 1px 0px rgba(20,39,28,0.0)', duration: 0.3, ease: 'power2.out' })
                }}
                style={{
                  background: 'transparent',
                  borderRadius: 20,
                  border: '1px solid rgba(20,39,28,0.18)',
                  padding: 'clamp(24px, 3vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  cursor: 'default',
                }}
              >
                {/* Icon circle */}
                <div
                  className="feat-icon-wrap"
                  style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: '#14271C',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} strokeWidth={1.5} color="#B0894F" />
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
                  fontSize: 'clamp(16px, 1.4vw, 19px)',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  color: '#14271C',
                  lineHeight: 1.25,
                  margin: 0,
                }}>
                  {feat.h}
                </h3>

                {/* Body */}
                <p style={{
                  fontSize: 14, color: '#6e7860',
                  lineHeight: 1.7, margin: 0,
                }}>
                  {feat.p}
                </p>
              </div>
            )
          })}
        </div>

      </div>

      <style>{`
        .feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 860px) {
          .feat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .feat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
