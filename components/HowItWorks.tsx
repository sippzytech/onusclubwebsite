'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { STEPS } from '@/lib/content'
import { Eyebrow } from '@/components/ui/Eyebrow'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STEP_IMAGES = ['/step_1.png', '/step_2.png', '/step_3.png', '/step_4.png']
const H2_WORDS = 'The whole loyalty journey. Made effortless.'.split(' ')

export default function HowItWorks() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const c = containerRef.current!

      // ── Header reveal ────────────────────────────────────────────────────
      gsap.timeline({
        scrollTrigger: { trigger: c.querySelector('.how-header'), start: 'top 82%', once: true },
        defaults: { ease: 'power3.out' },
      })
        .from('.how-eyebrow', { opacity: 0, y: 8, duration: 0.4 })
        .from('.rev-word',    { yPercent: 110, duration: 0.65, stagger: 0.05 }, '-=0.15')
        .from('.how-lead',    { opacity: 0, y: 14, duration: 0.55 }, '-=0.3')

      // ── Horizontal scroll (desktop only) ─────────────────────────────────
      if (window.innerWidth <= 860) return

      const pin   = c.querySelector('.how-pin') as HTMLElement
      const track = c.querySelector('.how-track') as HTMLElement
      if (!pin || !track) return

      const dist = () => track.scrollWidth - pin.offsetWidth

      gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          pin: true,
          scrub: 1.2,
          end: () => '+=' + dist(),
          invalidateOnRefresh: true,
          },
      })
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      id="how"
      style={{ background: 'var(--color-bone-white)' }}
    >
      {/* ── Section header ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 24px 64px' }}>
        <div className="how-header" style={{ maxWidth: 640 }}>
          <Eyebrow className="how-eyebrow">How it works</Eyebrow>
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
          <p className="how-lead" style={{ marginTop: 16, fontSize: 16, color: 'var(--color-stone)' }}>
            No hardware to buy, no app for your customers to install. If your staff can scan a QR code, you can run OnUsClub.
          </p>
        </div>
      </div>

      {/* ── Desktop: pinned horizontal track ──────────────────────────── */}
      <div
        className="how-pin"
        style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}
      >
        {/* Scrolling track */}
        <div
          className="how-track"
          style={{ display: 'flex', height: '100%', willChange: 'transform' }}
        >
          {STEPS.map((step, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={step.num}
                style={{
                  flex: '0 0 100vw',
                  width: '100vw',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Inner grid */}
                <div
                  style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '110px 80px 40px',
                    height: '100%',
                    display: 'grid',
                    gridTemplateColumns: isEven ? '0.9fr 1.1fr' : '1.1fr 0.9fr',
                    gap: 60,
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {/* Photo */}
                  <div
                    style={{
                      order: isEven ? 2 : 1,
                      position: 'relative',
                      height: 'calc(100vh - 130px)',
                      borderRadius: 22,
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-xl)',
                    }}
                  >
                    <Image
                      src={STEP_IMAGES[i]}
                      alt={step.h}
                      fill
                      sizes="55vw"
                      style={{ objectFit: 'cover' }}
                      priority={i === 0}
                    />
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0, height: 4,
                        background: 'linear-gradient(90deg, #B0894F 0%, rgba(176,137,79,0.2) 65%, transparent 100%)',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      order: isEven ? 1 : 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                      <span
                        style={{
                          background: '#B0894F', color: '#F4F1E9',
                          fontSize: 10, fontWeight: 700, letterSpacing: '0.13em',
                          padding: '5px 14px', borderRadius: 999,
                          textTransform: 'uppercase', flexShrink: 0,
                        }}
                      >
                        Step {step.num}
                      </span>
                      <span
                        style={{
                          width: 48, height: 1,
                          background: 'linear-gradient(90deg, rgba(176,137,79,0.5), transparent)',
                        }}
                      />
                    </div>

                    <h3
                      className="font-serif"
                      style={{
                        fontSize: 'clamp(28px, 3.5vw, 46px)',
                        lineHeight: 1.1,
                        letterSpacing: '-0.022em',
                        marginBottom: 20,
                        fontWeight: 400,
                        color: 'var(--color-deep-coal)',
                      }}
                    >
                      {step.h}
                    </h3>

                    <p
                      style={{
                        fontSize: 16,
                        color: 'var(--color-stone)',
                        lineHeight: 1.72,
                        maxWidth: 400,
                      }}
                    >
                      {step.p}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 40 }}>
                      <span style={{ width: 28, height: 1, background: 'var(--color-ash-gray)' }} />
                      <span className="font-serif" style={{ fontSize: 12, color: 'var(--color-fog)', letterSpacing: '0.08em' }}>
                        {step.num} / 0{STEPS.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* ── Mobile: vertical stacked ───────────────────────────────────── */}
      <div className="how-mobile" style={{ padding: '0 24px 80px' }}>
        {STEPS.map((step, i) => (
          <div key={step.num} style={{ marginBottom: 60 }}>
            <div style={{ position: 'relative', height: 280, borderRadius: 18, overflow: 'hidden', marginBottom: 24, boxShadow: 'var(--shadow-lg)' }}>
              <Image src={STEP_IMAGES[i]} alt={step.h} fill sizes="100vw" style={{ objectFit: 'cover' }} />
              <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #B0894F, transparent)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ background: '#B0894F', color: '#F4F1E9', fontSize: 10, fontWeight: 700, letterSpacing: '0.13em', padding: '4px 12px', borderRadius: 999, textTransform: 'uppercase' }}>
                Step {step.num}
              </span>
            </div>
            <h3 className="font-serif" style={{ fontSize: 26, lineHeight: 1.15, letterSpacing: '-0.018em', marginBottom: 12, fontWeight: 400, color: 'var(--color-deep-coal)' }}>
              {step.h}
            </h3>
            <p style={{ fontSize: 15, color: 'var(--color-stone)', lineHeight: 1.68 }}>
              {step.p}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .how-mobile { display: none; }
        @media (max-width: 860px) {
          .how-pin    { display: none !important; }
          .how-mobile { display: block; }
        }
      `}</style>
    </section>
  )
}
