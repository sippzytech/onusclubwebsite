'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  SmartphoneNfc,
  CreditCard,
  FolderOpen,
  Bell,
  ScanLine,
  BarChart3,
  Gift,
  MapPin,
  Palette,
} from 'lucide-react'
import { FEATURES } from '@/lib/content'
import { Eyebrow } from '@/components/ui/Eyebrow'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const ICONS = [SmartphoneNfc, CreditCard, FolderOpen, Bell, ScanLine, BarChart3, Gift, MapPin, Palette]
const H2_WORDS = 'Loyalty that does the heavy lifting.'.split(' ')

export default function Features() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 78%', once: true },
        defaults: { ease: 'power3.out' },
      })

      tl.from('.feat-eyebrow', { opacity: 0, y: 8, duration: 0.4 })
        .from('.rev-word', { yPercent: 110, duration: 0.6, stagger: 0.05 }, '-=0.15')
        .from('.feat-cell', { y: 36, scale: 0.97, opacity: 0, duration: 0.7, stagger: 0.07 }, '-=0.2')
        .from('.feat-icon', {
          scale: 0.25, opacity: 0, rotation: -20,
          duration: 0.48, stagger: 0.07, ease: 'back.out(2)',
        }, '-=0.55')
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="features"
      style={{ padding: '96px 0', background: 'var(--color-deep-coal)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Head */}
        <div style={{ maxWidth: 640, marginBottom: 56 }}>
          <Eyebrow className="feat-eyebrow" style={{ color: 'rgba(244,241,233,0.5)' }}>
            Why OnUsClub
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

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            border: '1px solid rgba(244,241,233,0.1)',
            borderRadius: 18,
            overflow: 'hidden',
          }}
        >
          {FEATURES.map((feat, i) => {
            const Icon = ICONS[i]
            const cols = 3
            const remainder = FEATURES.length % cols || cols
            const lastRowStart = FEATURES.length - remainder
            const isLastInRow = (i + 1) % cols === 0
            const isInLastRow = i >= lastRowStart

            return (
              <div
                key={feat.h}
                className="feat-cell"
                style={{
                  padding: '36px 30px',
                  borderRight: isLastInRow ? 'none' : '1px solid rgba(244,241,233,0.1)',
                  borderBottom: isInLastRow ? 'none' : '1px solid rgba(244,241,233,0.1)',
                  transition: 'background 0.15s ease',
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  e.currentTarget.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(176,137,79,0.13) 0%, transparent 65%)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = ''
                }}
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="feat-icon"
                  style={{ color: 'var(--color-bone-white)', marginBottom: 20, display: 'block' }}
                />
                <h3
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(18px, 2vw, 22px)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.015em',
                    marginBottom: 10,
                    fontWeight: 400,
                    color: 'var(--color-bone-white)',
                  }}
                >
                  {feat.h}
                </h3>
                <p style={{ fontSize: 14.5, color: 'rgba(244,241,233,0.62)', lineHeight: 1.6 }}>
                  {feat.p}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          #features > div > div:last-child { grid-template-columns: 1fr !important; }
          .feat-cell {
            border-right: none !important;
            border-bottom: 1px solid rgba(244,241,233,0.1) !important;
          }
          .feat-cell:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  )
}
