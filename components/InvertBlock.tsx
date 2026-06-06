'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Check } from 'lucide-react'
import { INVERT } from '@/lib/content'
import { Eyebrow } from '@/components/ui/Eyebrow'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function InvertBlock() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%', once: true },
        defaults: { ease: 'power3.out' },
      })

      tl.from('.invert-card', { y: 56, scale: 0.97, opacity: 0, duration: 0.8 })
        .from('.invert-eyebrow', { opacity: 0, y: 8, duration: 0.4 }, '-=0.5')
        .from('.rev-word', { yPercent: 110, duration: 0.65, stagger: 0.05 }, '-=0.2')
        .from('.invert-col-head', { opacity: 0, y: 10, duration: 0.45, stagger: 0.1 }, '-=0.3')
        .from('.check-row', {
          x: -20,
          opacity: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
        }, '-=0.3')
    },
    { scope: containerRef }
  )

  return (
    <section ref={containerRef} id="compare" style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div
          className="invert-card"
          style={{
            background: 'var(--color-obsidian)',
            borderRadius: 22,
            padding: '64px 56px',
            color: 'var(--color-bone-white)',
          }}
        >
          <Eyebrow className="invert-eyebrow" style={{ color: 'rgba(244,241,233,0.55)' }}>
            {INVERT.eyebrow}
          </Eyebrow>

          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: 1.12,
              letterSpacing: '-0.018em',
              color: 'var(--color-bone-white)',
              marginTop: 14,
              maxWidth: 640,
              fontWeight: 400,
            }}
          >
            {INVERT.h2.split(' ').map((word, i, arr) => (
              <span
                key={i}
                className="word-clip"
                style={i < arr.length - 1 ? { marginRight: '0.28em' } : undefined}
              >
                <span className="rev-word">{word}</span>
              </span>
            ))}
          </h2>

          <div className="invert-cols" style={{ marginTop: 44 }}>
            {INVERT.cols.map((col) => (
              <div key={col.h}>
                <h3
                  className="invert-col-head font-serif"
                  style={{
                    fontSize: 21,
                    lineHeight: 1.2,
                    letterSpacing: '-0.015em',
                    color: 'var(--color-bone-white)',
                    marginBottom: 14,
                    fontWeight: 400,
                  }}
                >
                  {col.h}
                </h3>
                {col.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className="check-row"
                    style={{
                      display: 'flex',
                      gap: 12,
                      padding: '12px 0',
                      borderTop: ri === 0 ? 'none' : '1px solid rgba(244,241,233,0.12)',
                    }}
                  >
                    <Check
                      size={18}
                      strokeWidth={1.8}
                      style={{ color: 'var(--color-bone-white)', flexShrink: 0, marginTop: 2 }}
                    />
                    <p style={{ fontSize: 15, color: 'rgba(244,241,233,0.82)' }}>{row}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .invert-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        @media (max-width: 820px) {
          .invert-card { padding: 44px 28px !important; }
          .invert-cols { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>
    </section>
  )
}
