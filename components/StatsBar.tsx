'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function runCounter(el: Element, target: number, suffix: string, delay: number, duration = 1800) {
  setTimeout(() => {
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      el.textContent = `${Math.round(easeOutCubic(progress) * target)}${suffix}`
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, delay)
}

const STATS = [
  {
    num: 5, suffix: '×', integer: true,
    label: 'More Google Reviews',
    body: 'Automated review rewards get you 5× more Google reviews, boosting local SEO and building trust with new customers.',
  },
  {
    num: 60, suffix: '%', integer: true,
    label: 'More Visits',
    body: 'Loyalty programs increase visit frequency, helping businesses maintain steadier customer flow and revenue.',
  },
  {
    num: 3, suffix: '×', integer: true,
    label: 'More Spend',
    body: 'Customers enrolled in digital loyalty programs spend 2–3× more on average, with higher basket values and repeat purchases.',
  },
  {
    num: 25, suffix: '%', integer: true,
    label: 'Higher Retention',
    body: 'Businesses with loyalty programs see retention rates improve by up to 25%, significantly increasing customer lifetime value.',
  },
]

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)

  // Fade-in via GSAP
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.from('.sb-eyebrow', {
      opacity: 0, y: 10, duration: 0.5, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true },
    })
    gsap.from('.sb-col', {
      opacity: 0, y: 32, duration: 0.75,
      stagger: 0.11, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 84%', once: true },
    })
  }, { scope: ref })

  // Counters via IntersectionObserver — unaffected by pinned sections above
  useEffect(() => {
    if (!ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        STATS.forEach((stat, i) => {
          const el = ref.current?.querySelector(`.sb-num-${i}`)
          if (!el) return
          runCounter(el, stat.num, stat.suffix, i * 120)
        })
      },
      { threshold: 0.35 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ background: '#14271C', padding: '80px 6vw 88px' }}>

      {/* Eyebrow */}
      <p
        className="sb-eyebrow"
        style={{
          fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#B0894F',
          maxWidth: 1200, margin: '0 auto 56px',
        }}
      >
        The ROI of loyalty programs
      </p>

      {/* Grid */}
      <div className="sb-grid" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="sb-col"
            style={{
              paddingLeft: i === 0 ? 0 : 'clamp(24px, 3.5vw, 52px)',
              borderLeft: i === 0 ? 'none' : '1px solid rgba(244,241,233,0.08)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Big number */}
            <div
              className={`sb-num-${i} font-serif`}
              style={{
                fontSize: 'clamp(48px, 6vw, 80px)',
                fontWeight: 400, lineHeight: 1,
                letterSpacing: '-0.03em',
                color: '#B0894F',
              }}
            >
              {stat.num}{stat.suffix}
            </div>

            {/* Label */}
            <p style={{
              fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
              fontSize: 14, fontWeight: 700,
              letterSpacing: '0.01em',
              color: '#F4F1E9',
              margin: '16px 0 10px',
            }}>
              {stat.label}
            </p>

            {/* Divider */}
            <div style={{ width: 24, height: 1, background: 'rgba(244,241,233,0.2)', marginBottom: 14 }} />

            {/* Body */}
            <p style={{
              fontSize: 13, fontWeight: 400,
              lineHeight: 1.7, color: 'rgba(244,241,233,0.45)',
              maxWidth: '28ch',
            }}>
              {stat.body}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .sb-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 900px) {
          .sb-grid { grid-template-columns: repeat(2, 1fr); gap: 56px 0; }
          .sb-col:nth-child(3) { border-left: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 480px) {
          .sb-grid { grid-template-columns: 1fr; gap: 0; }
          .sb-col { border-left: none !important; padding-left: 0 !important; padding-top: 40px; border-top: 1px solid rgba(244,241,233,0.08); }
          .sb-col:first-child { padding-top: 0; border-top: none; }
        }
      `}</style>
    </div>
  )
}
