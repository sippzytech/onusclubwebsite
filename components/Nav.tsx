'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS } from '@/lib/content'
import { Button } from '@/components/ui/Button'
import { X, Menu } from 'lucide-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 0.3s ease, border-color 0.3s ease',
          borderBottom: scrolled
            ? '1px solid var(--color-cloud)'
            : '1px solid transparent',
          background: scrolled ? 'var(--color-bone-white)' : 'transparent',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <Image
              src="/new_logo.png"
              alt="OnUsClub"
              width={48}
              height={48}
              style={{ width: 48, height: 48, objectFit: 'contain' }}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div
            className="nav-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 30,
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: scrolled
                    ? 'var(--color-graphite-ink)'
                    : 'rgba(244,241,233,0.82)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLAnchorElement).style.color = scrolled
                    ? 'var(--color-obsidian)'
                    : 'var(--color-bone-white)'
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLAnchorElement).style.color = scrolled
                    ? 'var(--color-graphite-ink)'
                    : 'rgba(244,241,233,0.82)'
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div
            className="nav-cta"
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <Button variant="fill" href="#demo">
              Book a demo
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: scrolled
                ? 'var(--color-deep-coal)'
                : 'var(--color-bone-white)',
              padding: 4,
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile slide-down panel */}
        {menuOpen && (
          <div
            style={{
              background: 'var(--color-bone-white)',
              borderTop: '1px solid var(--color-cloud)',
              padding: '16px 24px 24px',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--color-graphite-ink)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--color-cloud)',
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ marginTop: 20 }}>
              <Button variant="fill" href="#demo">
                Book a demo
              </Button>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 860px) {
          .nav-links, .nav-cta { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  )
}
