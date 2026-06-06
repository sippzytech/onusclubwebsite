'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CARD_TYPES } from '@/lib/content'
import { Eyebrow } from '@/components/ui/Eyebrow'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const H2_WORDS = "Start with stamps. Grow when you're ready.".split(' ')

export default function CardTypes() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 78%', once: true },
        defaults: { ease: 'power3.out' },
      })

      tl.from('.cards-eyebrow', { opacity: 0, y: 8, duration: 0.4 })
        .from('.rev-word', { yPercent: 110, duration: 0.65, stagger: 0.05 }, '-=0.15')
        .from('.cards-lead', { opacity: 0, y: 12, duration: 0.5 }, '-=0.3')
        .from('.ctype-card', { y: 44, scale: 0.95, opacity: 0, duration: 0.75, stagger: 0.1 }, '-=0.25')
        .from('.ctype-tag', { scale: 0.7, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' }, '-=0.55')
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="cards"
      style={{ padding: '96px 0', background: 'var(--color-cloud)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: 640, marginBottom: 56 }}>
          <Eyebrow className="cards-eyebrow">Card types</Eyebrow>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(30px, 4vw, 48px)',
              lineHeight: 1.12,
              letterSpacing: '-0.018em',
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
          <p className="cards-lead" style={{ marginTop: 16, fontSize: 16, color: 'var(--color-stone)' }}>
            Launch with the one mechanic every business understands, then add more as your program matures.
          </p>
        </div>

        <div className="ctypes-grid" style={{ perspective: '1200px' }}>
          {CARD_TYPES.map((card) => {
            const isLead = card.lead

            return (
              <div
                key={card.h}
                className="ctype-card"
                style={{
                  padding: '36px 30px',
                  borderRadius: 18,
                  position: 'relative',
                  overflow: 'hidden',
                  background: isLead ? 'var(--color-deep-coal)' : 'var(--color-bone-white)',
                  boxShadow: isLead ? 'var(--shadow-xl)' : 'var(--shadow-lg)',
                  border: isLead ? 'none' : '1px solid var(--color-ash-gray)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  cursor: 'default',
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
                  const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
                  gsap.to(e.currentTarget, {
                    rotateY: x * 10,
                    rotateX: -y * 7,
                    scale: 1.04,
                    duration: 0.35,
                    ease: 'power2.out',
                  })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.9,
                    ease: 'elastic.out(1, 0.4)',
                  })
                }}
              >
                {/* Gold top accent for lead card */}
                {isLead && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      height: 3,
                      background: '#B0894F',
                    }}
                  />
                )}

                <span
                  className="ctype-tag"
                  style={{
                    display: 'inline-block',
                    background: isLead ? 'rgba(176,137,79,0.25)' : 'var(--color-cloud)',
                    color: isLead ? '#B0894F' : 'var(--color-slate)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    borderRadius: 999,
                    padding: '4px 12px',
                    marginBottom: 20,
                  }}
                >
                  {card.tag}
                </span>

                <h3
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(22px, 2.4vw, 28px)',
                    lineHeight: 1.18,
                    letterSpacing: '-0.018em',
                    marginBottom: 12,
                    fontWeight: 400,
                    color: isLead ? 'var(--color-bone-white)' : 'var(--color-deep-coal)',
                  }}
                >
                  {card.h}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: isLead ? 'rgba(244,241,233,0.68)' : 'var(--color-stone)',
                  }}
                >
                  {card.p}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .ctypes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 820px) {
          .ctypes-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
