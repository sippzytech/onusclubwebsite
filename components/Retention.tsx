'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const H2_WORDS = 'Turn one-time visitors into loyal regulars.'.split(' ')

const WITHOUT = [10, 16, 21, 25, 27, 29]
const WITH    = [10, 28, 46, 61, 72, 80]
const XLABELS = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6']

// Chart coordinate helpers
const CX = (i: number) => 64 + i * 92
const CY = (pct: number) => 248 - (pct / 100) * 220

// Smooth cubic bezier path — horizontal tangents at each point
function curvePath(pts: [number, number][], closeToBottom?: boolean): string {
  if (!pts.length) return ''
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const mx = x0 + (x1 - x0) * 0.5
    d += ` C ${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`
  }
  if (closeToBottom) {
    const last = pts[pts.length - 1]
    d += ` L ${last[0]} 248 L ${pts[0][0]} 248 Z`
  }
  return d
}

const withPts    = WITH.map((v, i): [number, number]    => [CX(i), CY(v)])
const withoutPts = WITHOUT.map((v, i): [number, number] => [CX(i), CY(v)])

export default function Retention() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 76%', once: true },
        defaults: { ease: 'power3.out' },
      })

      tl.from('.ret-eyebrow', { opacity: 0, y: 8, duration: 0.4 })
        .from('.rev-word',    { yPercent: 110, duration: 0.65, stagger: 0.05 }, '-=0.15')
        .from('.ret-body',    { opacity: 0, y: 14, duration: 0.55 }, '-=0.3')
        .from('.ret-cta',     { opacity: 0, y: 12, duration: 0.45 }, '-=0.2')
        // Chart draws left → right
        .to('.ret-clip-rect', {
          attr: { width: 510 },
          duration: 1.9,
          ease: 'power2.inOut',
        }, '-=0.3')
        // End-of-line labels pop in
        .from('.ret-end-lbl', { opacity: 0, x: 8, duration: 0.4, stagger: 0.14 }, '-=0.5')
        .from('.ret-legend',  { opacity: 0, y: 6, duration: 0.35 }, '-=0.35')
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      id="retention"
      style={{
        padding: '100px 0',
        background: 'var(--color-cloud)',
        borderTop: '1px solid var(--color-ash-gray)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="ret-grid">

          {/* ── Copy ───────────────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Eyebrow className="ret-eyebrow">Customer retention</Eyebrow>

            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                lineHeight: 1.12,
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

            <p
              className="ret-body"
              style={{
                fontSize: 16,
                lineHeight: 1.74,
                color: 'var(--color-stone)',
                marginTop: 20,
                maxWidth: 400,
              }}
            >
              Most customers forget to come back — not because they didn&apos;t enjoy it, but because
              nothing nudged them. With OnUsClub, loyal regulars grow nearly 3× faster. By month
              six, businesses on OnUsClub have almost three times as many repeat customers as those
              running no loyalty program at all.
            </p>

            <div className="ret-cta" style={{ marginTop: 36 }}>
              <Button variant="ink" href="#demo">Book a demo</Button>
            </div>
          </div>

          {/* ── Chart ──────────────────────────────────────────────────── */}
          <div>
            {/* Legend */}
            <div
              className="ret-legend"
              style={{
                display: 'flex',
                gap: 24,
                marginBottom: 18,
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
              }}
            >
              {[
                { color: '#B0894F', label: 'With OnUsClub' },
                { color: 'var(--color-ash-gray)', label: 'Without OnUsClub' },
              ].map(({ color, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ display: 'block', width: 24, height: 3, background: color, borderRadius: 2 }} />
                  <span style={{ fontSize: 12, color: 'var(--color-stone)', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>

            {/* SVG area chart */}
            <svg
              viewBox="0 0 590 278"
              style={{ width: '100%', overflow: 'visible' }}
              aria-label="Customer retention comparison chart"
            >
              <defs>
                <clipPath id="ret-chart-clip">
                  <rect className="ret-clip-rect" x="0" y="0" width="0" height="278" />
                </clipPath>
                <linearGradient id="ret-fill-with" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B0894F" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#B0894F" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="ret-fill-without" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6e7860" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#6e7860" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Y-axis grid lines + labels */}
              {[0, 25, 50, 75, 100].map(val => {
                const y = CY(val)
                return (
                  <g key={val}>
                    <line
                      x1="64" y1={y} x2="524" y2={y}
                      stroke="var(--color-ash-gray)"
                      strokeWidth="1"
                      strokeDasharray={val === 0 ? 'none' : '4 4'}
                    />
                    <text
                      x="54" y={y + 4}
                      textAnchor="end"
                      fontSize="11"
                      fill="var(--color-fog)"
                    >
                      {val}%
                    </text>
                  </g>
                )
              })}

              {/* X-axis visit labels */}
              {XLABELS.map((label, i) => (
                <text
                  key={i}
                  x={CX(i)} y="265"
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--color-stone)"
                >
                  {label}
                </text>
              ))}

              {/* Clipped chart paths */}
              <g clipPath="url(#ret-chart-clip)">
                {/* Without: area then line */}
                <path d={curvePath(withoutPts, true)} fill="url(#ret-fill-without)" />
                <path
                  d={curvePath(withoutPts)}
                  fill="none"
                  stroke="var(--color-ash-gray)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* With: area then line */}
                <path d={curvePath(withPts, true)} fill="url(#ret-fill-with)" />
                <path
                  d={curvePath(withPts)}
                  fill="none"
                  stroke="#B0894F"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Dots */}
                {WITH.map((v, i) => (
                  <circle key={i} cx={CX(i)} cy={CY(v)} r="4" fill="#B0894F" />
                ))}
                {WITHOUT.map((v, i) => (
                  <circle key={i} cx={CX(i)} cy={CY(v)} r="3.5" fill="var(--color-ash-gray)" />
                ))}
              </g>

              {/* End-of-line labels (outside clip, animate in separately) */}
              <text
                className="ret-end-lbl"
                x="532" y={CY(WITH[5]) + 4}
                fontSize="12"
                fontWeight="700"
                fill="#B0894F"
              >
                {WITH[5]}%
              </text>
              <text
                className="ret-end-lbl"
                x="532" y={CY(WITHOUT[5]) + 4}
                fontSize="12"
                fontWeight="600"
                fill="var(--color-stone)"
              >
                {WITHOUT[5]}%
              </text>
            </svg>
          </div>

        </div>
      </div>

      <style>{`
        .ret-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 820px) {
          .ret-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  )
}
