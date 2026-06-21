"use client"
import React, { useEffect, useRef, useState } from "react"

interface LinkItem {
  href: string
  label: string
}

interface AnimatedFooterProps {
  leftLinks: LinkItem[]
  rightLinks: LinkItem[]
  barCount?: number
  barColor?: string
  children?: React.ReactNode
}

const AnimatedFooter: React.FC<AnimatedFooterProps> = ({
  leftLinks,
  rightLinks,
  barCount = 28,
  barColor = "#F4F1E9",
  children,
}) => {
  const waveRefs = useRef<(HTMLDivElement | null)[]>([])
  const footerRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => { if (footerRef.current) observer.unobserve(footerRef.current) }
  }, [])

  useEffect(() => {
    let t = 0
    const animate = () => {
      let offset = 0
      waveRefs.current.forEach((el, i) => {
        if (el) {
          offset += Math.max(0, 18 * Math.sin((t + i) * 0.28))
          el.style.transform = `translateY(${i + offset}px)`
        }
      })
      t += 0.1
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    if (isVisible) {
      animate()
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isVisible])

  return (
    <footer
      ref={footerRef}
      style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      {/* Slot for custom content above the link bar */}
      {children}

      {/* Link bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: 24,
        padding: '32px 6vw 20px',
      }}>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', listStyle: 'none', padding: 0, margin: 0 }}>
          {leftLinks.map((link, i) => (
            <li key={i}>
              <a href={link.href} className="footer-wave-link" style={{
                fontSize: 12, fontWeight: 500, letterSpacing: '0.06em',
                textDecoration: 'none', textTransform: 'uppercase',
                color: 'rgba(244,241,233,0.4)',
                transition: 'color 0.2s',
              }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', listStyle: 'none', padding: 0, margin: 0 }}>
          {rightLinks.map((link, i) => (
            <li key={i}>
              <a href={link.href} className="footer-wave-link" style={{
                fontSize: 12, fontWeight: 500, letterSpacing: '0.06em',
                textDecoration: 'none', textTransform: 'uppercase',
                color: 'rgba(244,241,233,0.4)',
                transition: 'color 0.2s',
              }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Wave bars */}
      <div aria-hidden="true" style={{ overflow: 'hidden', height: 180, flexShrink: 0 }}>
        <div style={{ marginTop: 0 }}>
          {Array.from({ length: barCount }).map((_, i) => (
            <div
              key={i}
              ref={el => { waveRefs.current[i] = el }}
              style={{
                height: `${i + 1}px`,
                backgroundColor: barColor,
                marginTop: '-2px',
                willChange: 'transform',
                transition: 'transform 0.1s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`.footer-wave-link:hover { color: #B0894F !important; }`}</style>
    </footer>
  )
}

export default AnimatedFooter
