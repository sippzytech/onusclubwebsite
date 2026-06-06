"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

gsap.registerPlugin(MotionPathPlugin)

export interface GalleryImageData {
  title: string
  url: string
}

interface ImageGalleryProps {
  images: GalleryImageData[]
  onActiveChange?: (index: number) => void
  autoplayInterval?: number
}

export function ImageGallery({ images, onActiveChange, autoplayInterval = 4000 }: ImageGalleryProps) {
  const [opened, setOpened] = useState(0)
  const [inPlace, setInPlace] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const onClick = (index: number) => {
    if (!disabled) setOpened(index)
  }

  const onInPlace = useCallback((index: number) => {
    setInPlace(index)
    onActiveChange?.(index)
  }, [onActiveChange])

  const next = useCallback(() => {
    setOpened(c => (c + 1) % images.length)
  }, [images.length])

  const prev = useCallback(() => {
    setOpened(c => (c - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => setDisabled(true), [opened])
  useEffect(() => setDisabled(false), [inPlace])

  useEffect(() => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current)
    autoplayTimer.current = setInterval(next, autoplayInterval)
    return () => { if (autoplayTimer.current) clearInterval(autoplayTimer.current) }
  }, [opened, next, autoplayInterval])

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Gallery frame */}
      <div
        style={{
          position: 'relative',
          width: 'min(80vmin, 500px)',
          height: 'min(80vmin, 500px)',
          overflow: 'hidden',
          borderRadius: 20,
          boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.1)',
          flexShrink: 0,
        }}
      >
        {images.map((image, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: inPlace === i ? i : images.length + 1,
            }}
          >
            <GalleryImage
              total={images.length}
              id={i}
              url={image.url}
              title={image.title}
              open={opened === i}
              inPlace={inPlace === i}
              onInPlace={onInPlace}
            />
          </div>
        ))}
        {/* Clickable dots overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 100, pointerEvents: 'none' }}>
          <Tabs images={images} onSelect={onClick} />
        </div>
      </div>

      {/* Prev */}
      <button
        onClick={prev}
        disabled={disabled}
        aria-label="Previous"
        style={{
          position: 'absolute',
          left: -52,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 101,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, background 0.2s ease',
          outline: 'none',
          opacity: disabled ? 0.4 : 1,
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={next}
        disabled={disabled}
        aria-label="Next"
        style={{
          position: 'absolute',
          right: -52,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 101,
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, background 0.2s ease',
          outline: 'none',
          opacity: disabled ? 0.4 : 1,
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}

/* ── GalleryImage ─────────────────────────────────────────────────── */

interface GalleryImageProps {
  url: string
  title: string
  open: boolean
  inPlace: boolean
  id: number
  onInPlace: (id: number) => void
  total: number
}

function GalleryImage({ url, open, inPlace, id, onInPlace, total }: GalleryImageProps) {
  const [firstLoad, setLoaded] = useState(true)
  const clip = useRef<SVGCircleElement>(null)

  const gap = 10
  const r0 = 7
  const width = 400
  const height = 400
  const bigSize = r0 * 700
  const defaults = { transformOrigin: 'center center' }

  const posSmall   = () => ({ cx: width / 2 - (total * (r0 * 2 + gap) - gap) / 2 + id * (r0 * 2 + gap), cy: height - 30, r: r0 })
  const posAbove   = () => ({ ...posSmall(), cy: height / 2, r: r0 * 2 })
  const posCenter  = () => ({ cx: width / 2, cy: height / 2, r: r0 * 7 })
  const posEnd     = () => ({ cx: width / 2 - bigSize, cy: height / 2, r: bigSize })
  const posStart   = () => ({ cx: width / 2 + bigSize, cy: height / 2, r: bigSize })

  useEffect(() => {
    setLoaded(false)
    if (!clip.current) return
    const fd = firstLoad ? 0 : 0.4
    const ud = firstLoad ? 0 : 0.2
    const bd = firstLoad ? 0.01 : 1

    if (open) {
      gsap.timeline()
        .set(clip.current,  { ...defaults, ...posSmall() })
        .to(clip.current,   { ...defaults, ...posCenter(), duration: ud, ease: 'power3.inOut' })
        .to(clip.current,   { ...defaults, ...posEnd(),    duration: fd, ease: 'power4.in', onComplete: () => onInPlace(id) })
    } else {
      gsap.timeline({ overwrite: true })
        .set(clip.current, { ...defaults, ...posStart() })
        .to(clip.current,  { ...defaults, ...posCenter(), delay: fd + ud, duration: fd, ease: 'power4.out' })
        .to(clip.current,  {
          ...defaults,
          motionPath: { path: [posAbove(), posSmall()], curviness: 1 },
          duration: bd,
          ease: 'bounce.out',
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <clipPath id={`${id}_circle`}>
          <circle cx="0" cy="0" r={r0} ref={clip} />
        </clipPath>
        <clipPath id={`${id}_square`}>
          <rect width={width} height={height} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}${inPlace ? '_square' : '_circle'})`}>
        <image width={width} height={height} href={url} style={{ pointerEvents: 'none' }} />
      </g>
    </svg>
  )
}

/* ── Tabs (dot navigation) ────────────────────────────────────────── */

function Tabs({ images, onSelect }: { images: GalleryImageData[]; onSelect: (i: number) => void }) {
  const gap = 10
  const r0 = 7
  const width = 400
  const height = 400
  const x = (i: number) => width / 2 - (images.length * (r0 * 2 + gap) - gap) / 2 + i * (r0 * 2 + gap)
  const y = () => height - 30

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%' }}
    >
      {images.map((image, i) => (
        <g key={i} style={{ pointerEvents: 'auto' }}>
          <defs>
            <clipPath id={`tab_${i}_clip`}>
              <circle cx={x(i)} cy={y()} r={r0} />
            </clipPath>
          </defs>
          <image
            x={x(i) - r0} y={y() - r0}
            width={r0 * 2} height={r0 * 2}
            href={image.url}
            clipPath={`url(#tab_${i}_clip)`}
            style={{ pointerEvents: 'none' }}
            preserveAspectRatio="xMidYMid slice"
          />
          <circle
            onClick={() => onSelect(i)}
            style={{ cursor: 'pointer', fill: 'rgba(255,255,255,0)', stroke: 'rgba(255,255,255,0.7)', strokeWidth: 2 }}
            cx={x(i)} cy={y()} r={r0 + 2}
          />
        </g>
      ))}
    </svg>
  )
}
