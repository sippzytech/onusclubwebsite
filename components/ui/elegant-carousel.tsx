'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
}

interface Props {
  slides: SlideData[];
}

export default function ElegantCarousel({ slides }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % slides.length);
  }, [currentIndex, goToSlide, slides.length]);

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, goToSlide, slides.length]);

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(goNext, SLIDE_DURATION);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove  = (e: React.TouchEvent) => { touchEndX.current  = e.targetTouches[0].clientX; };
  const handleTouchEnd   = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) diff > 0 ? goNext() : goPrev();
  };

  const slide = slides[currentIndex];
  const t = isTransitioning;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', background: 'var(--color-bone-white)' }}
    >
      {/* Background accent wash */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse at 70% 50%, ${slide.accent}18 0%, transparent 70%)`,
        transition: 'background 0.8s ease',
      }} />

      {/* Inner layout */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center',
        minHeight: '100vh',
        maxWidth: 1400, margin: '0 auto',
        padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px) 100px',
        gap: 'clamp(40px, 6vw, 100px)',
      }} className="ec-inner">

        {/* Left: Text */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: 480 }}>

            {/* Counter */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32,
              opacity: t ? 0 : 1, transform: t ? 'translateY(-10px)' : 'translateY(0)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}>
              <span style={{ display: 'block', width: 40, height: 1, background: 'currentColor', opacity: 0.25 }} />
              <span style={{ fontSize: 12, letterSpacing: '0.15em', opacity: 0.45, fontVariantNumeric: 'tabular-nums' }}>
                {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif" style={{
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 400, lineHeight: 1.05,
              letterSpacing: '-0.022em',
              color: 'var(--color-deep-coal)',
              marginBottom: 14,
              opacity: t ? 0 : 1, transform: t ? 'translateY(-14px)' : 'translateY(0)',
              transition: 'opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s',
            }}>
              {slide.title}
            </h2>

            {/* Subtitle */}
            <p style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: slide.accent, marginBottom: 22,
              opacity: t ? 0 : 1, transform: t ? 'translateY(-10px)' : 'translateY(0)',
              transition: 'opacity 0.35s ease 0.08s, transform 0.35s ease 0.08s',
            }}>
              {slide.subtitle}
            </p>

            {/* Description */}
            <p style={{
              fontSize: 15, lineHeight: 1.75,
              color: 'var(--color-stone)', marginBottom: 48, maxWidth: 380,
              opacity: t ? 0 : 1, transform: t ? 'translateY(-8px)' : 'translateY(0)',
              transition: 'opacity 0.35s ease 0.12s, transform 0.35s ease 0.12s',
            }}>
              {slide.description}
            </p>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[{ label: 'Previous', fn: goPrev, d: 'M19 12H5M12 19l-7-7 7-7' }, { label: 'Next', fn: goNext, d: 'M5 12h14M12 5l7 7-7 7' }].map(({ label, fn, d }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={label}
                  style={{
                    width: 48, height: 48, borderRadius: '50%',
                    border: '1px solid rgba(0,0,0,0.14)',
                    background: 'transparent', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                    color: 'var(--color-deep-coal)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={d} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div style={{ flex: 1.2, position: 'relative', height: 'clamp(420px, 68vh, 720px)' }}>
          <div style={{
            width: '100%', height: '100%', overflow: 'hidden',
            opacity: t ? 0 : 1, transform: t ? 'scale(1.02)' : 'scale(1)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            borderRadius: 4,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.imageUrl}
              alt={slide.title}
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#f5f2eb' }}
            />
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `linear-gradient(135deg, ${slide.accent}22 0%, transparent 50%)`,
            }} />
          </div>

          {/* Decorative corners */}
          {[
            { top: -8, left: -8, borderTop: `1.5px solid ${slide.accent}`, borderLeft: `1.5px solid ${slide.accent}` },
            { bottom: -8, right: -8, borderBottom: `1.5px solid ${slide.accent}`, borderRight: `1.5px solid ${slide.accent}` },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 32, height: 32, transition: 'border-color 0.6s ease', ...s }} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ec-inner { flex-direction: column-reverse !important; align-items: stretch !important; }
        }
      `}</style>
    </div>
  );
}
