'use client'

import { useRef, useCallback } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { HERO } from '@/lib/content'
import { WalletPass } from '@/components/WalletPass'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const WORDS = HERO.h1.split(' ')

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const passInnerRef = useRef<HTMLDivElement>(null)
  const passWrapRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!passInnerRef.current || !passWrapRef.current) return
    const rect = passWrapRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    gsap.to(passInnerRef.current, {
      rotateY: x * 11,
      rotateX: -y * 8,
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!passInnerRef.current) return
    gsap.to(passInnerRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)',
    })
  }, [])

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-eyebrow', { opacity: 0, y: 10, duration: 0.5 })
        .from('.rev-word', {
          yPercent: 115,
          duration: 0.72,
          stagger: 0.065,
        }, '-=0.2')
        .from('.hero-lead', { opacity: 0, y: 16, duration: 0.65 }, '-=0.35')
        .from('.hero-actions', { opacity: 0, y: 14, duration: 0.6 }, '-=0.45')

        .from('.hero-pass', {
          opacity: 0,
          x: 28,
          rotateY: -18,
          scale: 0.93,
          duration: 1.0,
        }, 0.3)
        .from('.stamp-dot', {
          scale: 0,
          opacity: 0,
          duration: 0.22,
          stagger: 0.055,
          ease: 'back.out(2.5)',
        }, '-=0.25')

      // Floating idle on the card
      gsap.to(passInnerRef.current, {
        y: -12,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.6,
      })

      // Scroll cue bounce
      gsap.to('.scroll-cue-inner', {
        y: 7,
        duration: 1.1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 2,
      })
    },
    { scope: containerRef }
  )

  return (
    <header
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0c1810',
        overflow: 'hidden',
      }}
    >
      {/* Background photo */}
      <Image
        src="/hero_bg.png"
        alt=""
        fill
        style={{ objectFit: 'cover', objectPosition: 'center top', opacity: 0.32 }}
        priority
      />

      {/* Ambient gradient orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      {/* Dark directional overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(115deg, rgba(10,22,14,0.94) 0%, rgba(10,22,14,0.72) 46%, rgba(10,22,14,0.38) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '120px 24px 100px',
          width: '100%',
        }}
      >
        <div className="hero-grid">
          {/* Left: copy */}
          <div style={{ maxWidth: 560 }}>
            <Eyebrow className="hero-eyebrow" style={{ color: 'rgba(244,241,233,0.6)' }}>
              {HERO.eyebrow}
            </Eyebrow>

            <h1
              className="hero-h1 font-serif"
              style={{
                fontSize: 'clamp(44px, 6.5vw, 72px)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                color: 'var(--color-bone-white)',
                margin: '20px 0 24px',
                fontWeight: 400,
              }}
            >
              {WORDS.map((word, i) => (
                <span
                key={i}
                className="word-clip"
                style={i < WORDS.length - 1 ? { marginRight: '0.28em' } : undefined}
              >
                <span className="rev-word">{word}</span>
              </span>
              ))}
            </h1>

            <p
              className="hero-lead"
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: 'rgba(244,241,233,0.78)',
                maxWidth: 460,
              }}
            >
              {HERO.lead}
            </p>

            <div
              className="hero-actions"
              style={{
                display: 'flex',
                gap: 12,
                marginTop: 36,
                flexWrap: 'wrap',
              }}
            >
              <Button variant="ink" href="#demo">Request a demo</Button>
              <Button variant="outline-dark" href="#how">See how it works</Button>
            </div>


          </div>

          {/* Right: wallet pass */}
          <div
            ref={passWrapRef}
            className="hero-pass"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Ambient glow behind card */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: 400,
                height: 400,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(176,137,79,0.22) 0%, rgba(176,137,79,0.08) 48%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <div
              ref={passInnerRef}
              style={{
                position: 'relative',
                zIndex: 1,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              <WalletPass
                merchant="Café Bloom"
                label="Coffee Club"
                title="Buy 9, get the 10th free"
                filled={7}
                total={10}
                footnote="1 more for a free coffee"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}
      >
        <div
          className="scroll-cue-inner"
          aria-hidden="true"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
            color: 'rgba(244,241,233,0.38)',
          }}
        >
          <div style={{ width: 1, height: 30, background: 'currentColor' }} />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 48px; }
        }

        /* Ambient background orbs */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          z-index: 0;
        }
        .hero-orb-1 {
          width: 660px; height: 660px;
          top: -160px; right: -100px;
          background: radial-gradient(circle, rgba(176,137,79,0.28) 0%, transparent 65%);
          animation: orb1 14s ease-in-out infinite alternate;
        }
        .hero-orb-2 {
          width: 500px; height: 500px;
          bottom: -80px; left: 22%;
          background: radial-gradient(circle, rgba(20,39,28,0.4) 0%, transparent 65%);
          animation: orb2 18s ease-in-out infinite alternate;
        }
        .hero-orb-3 {
          width: 340px; height: 340px;
          top: 38%; left: -80px;
          background: radial-gradient(circle, rgba(40,80,50,0.28) 0%, transparent 65%);
          animation: orb3 11s ease-in-out infinite alternate;
        }
        @keyframes orb1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-70px, 50px) scale(1.18); }
        }
        @keyframes orb2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(50px, -60px) scale(1.12); }
        }
        @keyframes orb3 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, -40px) scale(1.15); }
        }
      `}</style>
    </header>
  )
}
