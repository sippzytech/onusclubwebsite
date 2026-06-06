'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STATS = [
  { pre: '<', num: 5, suffix: ' min', decimal: false, label: 'Setup time, no hardware needed' },
  { pre: '', num: 0, suffix: ' apps', decimal: false, label: 'Nothing for your customers to download' },
  { pre: '', num: 1, suffix: ' tap', decimal: false, label: 'To add the card to Apple or Google Wallet' },
  { pre: '', num: 100, suffix: '%', decimal: false, label: 'Your customer data, always in your hands' },
]

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.from('.stat-block', {
      opacity: 0,
      y: 32,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 86%', once: true },
    })

    STATS.forEach((stat, i) => {
      if (stat.num === 0) return
      const el = ref.current?.querySelector(`.stat-val-${i}`) as HTMLElement | null
      if (!el) return
      const obj = { n: 0 }
      gsap.to(obj, {
        n: stat.num,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 86%', once: true },
        onUpdate() {
          const display = stat.decimal ? obj.n.toFixed(1) : Math.round(obj.n)
          el.textContent = `${stat.pre}${display}${stat.suffix}`
        },
      })
    })
  }, { scope: ref })

  return (
    <div
      ref={ref}
      style={{
        background: 'var(--color-bone-white)',
        borderBottom: '1px solid var(--color-cloud)',
        padding: '72px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px 24px',
        }}
        className="stats-inner"
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="stat-block"
            style={{ textAlign: 'center' }}
          >
            <div
              className={`stat-val-${i} font-serif`}
              style={{
                fontSize: 'clamp(44px, 5.5vw, 68px)',
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: '#B0894F',
              }}
            >
              {stat.pre}0{stat.suffix}
            </div>
            <div
              style={{
                fontSize: 13,
                color: 'var(--color-stone)',
                fontWeight: 500,
                marginTop: 10,
                letterSpacing: '0.01em',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-inner { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
