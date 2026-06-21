'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const H2_WORDS = 'Turn one-time visitors into loyal regulars.'.split(' ')

const ROI = [
  {
    num: 5, suffix: '×',
    label: 'More Google Reviews',
    body: 'Automated review rewards get you 5× more Google reviews, boosting local SEO and building trust with new customers.',
  },
  {
    num: 60, suffix: '%',
    label: 'More Visits',
    body: 'Loyalty programs increase visit frequency, helping businesses maintain steadier customer flow and revenue.',
  },
  {
    num: 3, suffix: '×',
    label: 'More Spend',
    body: 'Customers enrolled in digital loyalty programs spend 2–3× more on average, with higher basket values and repeat purchases.',
  },
  {
    num: 25, suffix: '%',
    label: 'Higher Retention',
    body: 'Businesses with loyalty programs see retention rates improve by up to 25%, significantly increasing customer lifetime value.',
  },
]

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }

function runCounter(el: Element, target: number, suffix: string, delay: number) {
  setTimeout(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1800, 1)
      el.textContent = `${Math.round(easeOutCubic(p) * target)}${suffix}`
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, delay)
}

export default function Retention() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 76%', once: true },
      defaults: { ease: 'power3.out' },
    })
      .from('.ret-eyebrow', { opacity: 0, y: 10, duration: 0.45 })
      .from('.ret-word',    { yPercent: 115, duration: 0.7, stagger: 0.055 }, '-=0.2')
      .from('.ret-lead',   { opacity: 0, y: 16, duration: 0.55 }, '-=0.3')
      .from('.roi-eyebrow', { opacity: 0, y: 10, duration: 0.4 }, '-=0.1')
      .from('.roi-col',    { opacity: 0, y: 28, duration: 0.7, stagger: 0.1 }, '-=0.2')
  }, { scope: ref })

  useEffect(() => {
    if (!ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        ROI.forEach((stat, i) => {
          const el = ref.current?.querySelector(`.roi-num-${i}`)
          if (el) runCounter(el, stat.num, stat.suffix, i * 120)
        })
      },
      { threshold: 0.2 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="retention" style={{ background: '#0d1c13', padding: '100px 6vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div style={{ marginBottom: 80, textAlign: 'center' }}>
          <p className="ret-eyebrow" style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#B0894F', marginBottom: 20,
          }}>
            Customer retention
          </p>

          <h2 style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 'clamp(32px, 4.5vw, 60px)',
            fontWeight: 900, letterSpacing: '-0.03em',
            lineHeight: 1.05, textTransform: 'uppercase',
            color: '#F4F1E9', marginBottom: 20,
            margin: '0 auto 20px',
          }}>
            {H2_WORDS.map((word, i) => (
              <span key={i} style={{
                display: 'inline-block', overflow: 'hidden',
                verticalAlign: 'bottom', paddingBottom: '0.06em',
                marginBottom: '-0.04em',
                marginRight: i < H2_WORDS.length - 1 ? '0.28em' : 0,
              }}>
                <span className="ret-word" style={{ display: 'inline-block' }}>{word}</span>
              </span>
            ))}
          </h2>

          <p className="ret-lead" style={{
            fontSize: 15, lineHeight: 1.75,
            color: 'rgba(244,241,233,0.5)',
            maxWidth: 480, margin: '0 auto',
          }}>
            Most customers forget to come back — not because they didn't enjoy it, but because nothing nudged them. With OnUsClub, loyal regulars grow nearly 3× faster.
          </p>
        </div>

        {/* ── Divider ─────────────────────────────────────────────── */}
        <div style={{ height: 1, background: 'rgba(244,241,233,0.08)', marginBottom: 72 }} />

        {/* ── ROI stats ───────────────────────────────────────────── */}
        <p className="roi-eyebrow" style={{
          fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#B0894F', marginBottom: 56,
        }}>
          The ROI of loyalty programs
        </p>

        <div className="roi-grid">
          {ROI.map((stat, i) => (
            <div
              key={i}
              className="roi-col"
              style={{
                paddingLeft: i === 0 ? 0 : 'clamp(24px, 3.5vw, 52px)',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(244,241,233,0.07)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div className={`roi-num-${i} font-serif`} style={{
                fontSize: 'clamp(48px, 6vw, 80px)',
                fontWeight: 400, lineHeight: 1,
                letterSpacing: '-0.03em', color: '#B0894F',
              }}>
                {stat.num}{stat.suffix}
              </div>

              <p style={{
                fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
                fontSize: 14, fontWeight: 700, color: '#F4F1E9',
                margin: '16px 0 10px',
              }}>
                {stat.label}
              </p>

              <div style={{ width: 24, height: 1, background: 'rgba(244,241,233,0.15)', marginBottom: 14 }} />

              <p style={{
                fontSize: 13, lineHeight: 1.7,
                color: 'rgba(244,241,233,0.4)', maxWidth: '26ch',
              }}>
                {stat.body}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .roi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 900px) {
          .roi-grid { grid-template-columns: repeat(2, 1fr); row-gap: 56px; }
          .roi-col:nth-child(3) { border-left: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 480px) {
          .roi-grid { grid-template-columns: 1fr; }
          .roi-col { border-left: none !important; padding-left: 0 !important; padding-top: 40px; border-top: 1px solid rgba(244,241,233,0.08); }
          .roi-col:first-child { padding-top: 0; border-top: none; }
        }
      `}</style>
    </section>
  )
}
