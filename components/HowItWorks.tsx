'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import FlowArt, { FlowSection } from '@/components/ui/story-scroll'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const H2_WORDS = 'The whole loyalty journey. Made effortless.'.split(' ')

const STEPS = [
  {
    num: '01',
    label: "They scan, you're set",
    h: ['THEY', 'SCAN.'],
    p: 'A customer scans your QR code and adds their loyalty card straight to Apple or Google Wallet. One tap. Nothing to download, nothing to print.',
    img: '/step_1.png',
    alt: 'Customer scanning a QR code',
    imgRight: true,
  },
  {
    num: '02',
    label: 'The card lives in their wallet',
    h: ['LIVES IN', 'THEIR', 'WALLET.'],
    p: 'Their stamp card sits alongside boarding passes and bank cards. It updates in real time. No app launch, no refresh, no friction.',
    img: '/step_2.png',
    alt: 'Loyalty card in Apple Wallet',
    imgRight: false,
  },
  {
    num: '03',
    label: 'You scan at the counter',
    h: ['ONE', 'QUICK', 'STAMP.'],
    p: 'They show the card from their wallet. Your staff scans it and adds a stamp from a simple dashboard. Five seconds, every time.',
    img: '/step_3.png',
    alt: 'Staff scanning a wallet pass at counter',
    imgRight: true,
  },
  {
    num: '04',
    label: "The reward's on you",
    h: ['REWARD', 'EARNED.'],
    p: 'Stamps add up, the card updates itself, and a wallet notification nudges them back before they forget. The free one is on the house.',
    img: '/step_4.png',
    alt: 'Customer receiving a loyalty reward',
    imgRight: false,
  },
]

const THEMES = [
  {
    bg: '#F4F1E9', text: '#14271C',
    hr: 'rgba(20,39,28,0.1)', numColor: '#B0894F', dimText: 'rgba(20,39,28,0.38)',
  },
  {
    bg: '#14271C', text: '#F4F1E9',
    hr: 'rgba(244,241,233,0.12)', numColor: '#B0894F', dimText: 'rgba(244,241,233,0.4)',
  },
  {
    bg: '#F4F1E9', text: '#14271C',
    hr: 'rgba(20,39,28,0.1)', numColor: '#B0894F', dimText: 'rgba(20,39,28,0.38)',
  },
  {
    bg: '#B0894F', text: '#14271C',
    hr: 'rgba(20,39,28,0.15)', numColor: '#14271C', dimText: 'rgba(20,39,28,0.45)',
  },
]

export default function HowItWorks() {
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!headerRef.current) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 78%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      })
        .from('.hiw-eyebrow', { opacity: 0, y: 12, duration: 0.5 })
        .from('.hiw-word',    { yPercent: 115, duration: 0.7, stagger: 0.055 }, '-=0.2')
        .from('.hiw-lead',   { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')
    },
    { scope: headerRef },
  )

  return (
    <section id="how">
      {/* ── Section header ──────────────────────────────────────────── */}
      <div
        ref={headerRef}
        style={{
          background: '#F4F1E9',
          padding: 'clamp(56px, 7vw, 96px) clamp(16px, 6vw, 80px) clamp(40px, 6vw, 80px)',
          textAlign: 'center',
        }}
      >
        <p
          className="hiw-eyebrow"
          style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#6e7860', marginBottom: 24,
          }}
        >
          How it works
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 'clamp(36px, 5vw, 68px)',
            fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.08,
            textTransform: 'uppercase', color: '#14271C',
            margin: '0 auto 28px',
          }}
        >
          {H2_WORDS.map((word, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                paddingBottom: '0.06em',
                marginBottom: '-0.04em',
                marginRight: i < H2_WORDS.length - 1 ? '0.28em' : 0,
              }}
            >
              <span className="hiw-word" style={{ display: 'inline-block' }}>
                {word}
              </span>
            </span>
          ))}
        </h2>

        <p
          className="hiw-lead"
          style={{
            fontSize: 16, color: '#6e7860', lineHeight: 1.72,
            maxWidth: 420, margin: '0 auto',
          }}
        >
          No hardware to buy, no app for your customers to install.
          If your staff can scan a QR code, you can run OnUsClub.
        </p>
      </div>

      {/* ── FlowArt: stacked scroll panels ──────────────────────────── */}
      <FlowArt aria-label="How OnUsClub works — four steps">
        {STEPS.map((step, i) => {
          const t = THEMES[i]
          const imgCols = step.imgRight ? '1fr 0.85fr' : '0.85fr 1fr'

          return (
            <FlowSection
              key={step.num}
              aria-label={step.label}
              style={{ backgroundColor: t.bg, color: t.text }}
            >
              {/* ── Top label row ────────────────────────────────── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2vw' }}>
                <span style={{
                  fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
                  fontSize: 'clamp(10px, 0.9vw, 13px)', fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase', color: t.numColor,
                }}>
                  {step.num}
                </span>
                <span style={{ width: 32, height: 1, background: t.numColor, opacity: 0.5, flexShrink: 0 }} />
                <span style={{
                  fontSize: 'clamp(10px, 0.9vw, 13px)', fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase', color: t.dimText,
                }}>
                  {step.label}
                </span>
              </div>

              <div style={{ borderTop: `1px solid ${t.hr}` }} />

              {/* ── Main content: heading + image ─────────────────── */}
              <div className="hiw-step-grid" style={{
                display: 'grid',
                gridTemplateColumns: imgCols,
                gap: 'clamp(24px, 4vw, 64px)',
                alignItems: 'center',
                flex: 1,
              }}>
                {/* Text side */}
                <div className="hiw-step-text" style={{ order: step.imgRight ? 1 : 2 }}>
                  <h2 style={{
                    fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
                    fontSize: 'clamp(3rem, 9.5vw, 11rem)',
                    fontWeight: 900, lineHeight: 0.88,
                    letterSpacing: '-0.04em', textTransform: 'uppercase',
                    color: t.text, margin: 0,
                  }}>
                    {step.h.map((line, j) => (
                      <span key={j} style={{ display: 'block' }}>{line}</span>
                    ))}
                  </h2>

                  <div style={{ borderTop: `1px solid ${t.hr}`, margin: 'clamp(20px, 3vw, 36px) 0' }} />

                  <p style={{
                    maxWidth: '42ch',
                    fontSize: 'clamp(14px, 1.4vw, 18px)',
                    fontWeight: 400, lineHeight: 1.75,
                    color: t.text, opacity: 0.78,
                  }}>
                    {step.p}
                  </p>
                </div>

                {/* Image side */}
                <div className="hiw-step-img" style={{ order: step.imgRight ? 2 : 1 }}>
                  <div style={{
                    position: 'relative',
                    height: 'clamp(280px, 46vh, 560px)',
                    borderRadius: 0,
                    overflow: 'hidden',
                  }}>
                    <Image
                      src={step.img}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 860px) 90vw, 45vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      priority={i === 0}
                    />
                  </div>
                </div>
              </div>
            </FlowSection>
          )
        })}
      </FlowArt>

      <style>{`
        @media (max-width: 700px) {
          .hiw-step-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .hiw-step-text { order: 1 !important; }
          .hiw-step-img  { order: 2 !important; }
        }
      `}</style>
    </section>
  )
}
