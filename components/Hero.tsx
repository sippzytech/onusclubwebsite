'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import TextRoll from '@/components/ui/text-roll'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section style={{
      visibility: mounted ? 'visible' : 'hidden',
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Desktop: photo. Mobile: hidden via CSS */}
      <Image
        src="/new_hero.jpg"
        alt=""
        fill
        priority
        className="hero-bg-image"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />

      {/* Desktop overlay */}
      <div aria-hidden="true" className="hero-overlay" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(9,16,12,0.65) 0%, rgba(9,16,12,0.4) 45%, rgba(9,16,12,0) 70%)',
      }} />

      {/* Mobile gradient background */}
      <div aria-hidden="true" className="hero-mobile-bg" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #0d3320 0%, #14271C 40%, #0a1f12 70%, #061409 100%)',
        display: 'none',
      }} />

      <div className="hero-wrap">

        <div className="hero-grid">
          <h1 className="hero-h1">
            <TextRoll>ONE</TextRoll>
            <TextRoll>PLATFORM</TextRoll>
            <TextRoll>ANY</TextRoll>
            <TextRoll>BUSINESS</TextRoll>
            <TextRoll>REPEAT</TextRoll>
            <TextRoll>CUSTOMERS.</TextRoll>
          </h1>
          <div />
        </div>

        <div className="hero-bottom">
          <p className="bottom-left">Simple to launch, automatic to run.</p>
        </div>

      </div>

      <style jsx>{`
        .hero-wrap {
          position: relative; z-index: 2;
          height: 100%;
          display: flex; flex-direction: column;
          padding: 0 6vw;
        }

        .hero-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 48px;
          padding-top: 80px;
          animation: fadeUp 0.8s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }

        .hero-h1 {
          font-family: var(--font-lato), ui-sans-serif, system-ui, sans-serif;
          font-size: clamp(58px, 9vw, 100px);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #F4F1E9;
          text-transform: uppercase;
          text-align: right;
          margin: 0;
          /* Each TextRoll is display:block with lineHeight:1.
             Negative margin tightens rows back to the original 0.93 feel. */
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* pull rows together to match original tight line-height */
        .hero-h1 :global(> span) {
          margin-bottom: -0.07em;
        }
        .hero-h1 :global(> span:last-child) {
          margin-bottom: 0;
        }

        .hero-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0 28px;
          border-top: 1px solid rgba(244,241,233,0.1);
          animation: fadeUp 0.6s 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }
        .bottom-left {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #F4F1E9; margin: 0; line-height: 1.6;
          text-align: right; width: 100%;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-grid, .hero-bottom { animation: none; }
        }

        @media (max-width: 860px) {
          .hero-wrap { padding-top: 64px; }
          .hero-grid {
            flex: 1;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            padding-top: 0; gap: 0;
          }
          .hero-grid > div:last-child { display: none; }
          .hero-h1 { font-size: clamp(32px, 9vw, 52px); text-align: center; align-items: center; }
          .bottom-left { text-align: center; }
          .hero-bg-image { display: none !important; }
          .hero-overlay { display: none !important; }
          .hero-mobile-bg { display: block !important; }
        }
      `}</style>
    </section>
  )
}
