"use client"

import * as React from "react"
import Image from "next/image"
import { Send, Mail, MapPin, Globe, MessageSquare } from "lucide-react"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

const SOCIAL = [
  { icon: MessageSquare, label: "Instagram",  href: "#", tip: "Follow us on Instagram" },
  { icon: Globe,         label: "Website",    href: "#", tip: "Visit our website" },
  { icon: Mail,          label: "Email",      href: "mailto:hello@onusclub.com", tip: "Email us" },
]

const NAV = [
  { label: "How it works", href: "#how" },
  { label: "Features",     href: "#features" },
  { label: "Pricing",      href: "#pricing" },
  { label: "FAQ",          href: "#faq" },
  { label: "Book a demo",  href: "#demo" },
]

const LEGAL = [
  { label: "Privacy Policy",  href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "GDPR",            href: "#" },
]

export function FooterSection() {
  const [email, setEmail] = React.useState("")
  const [sent, setSent] = React.useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) return
    setSent(true)
    setEmail("")
  }

  return (
    <footer style={{
      background: '#F4F1E9',
      borderTop: '1px solid rgba(20,39,28,0.08)',
      color: '#14271C',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 6vw 0' }}>

        {/* ── 4-column grid ─────────────────────────────────────── */}
        <div className="fs-grid">

          {/* 1. Newsletter */}
          <div style={{ position: 'relative' }}>
            {/* Gold glow blob */}
            <div style={{
              position: 'absolute', right: -16, top: 0,
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(176,137,79,0.12)', filter: 'blur(24px)',
              pointerEvents: 'none',
            }} />

            <Image
              src="/new_logo.png"
              alt="OnUsClub"
              width={80}
              height={80}
              style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 18 }}
            />

            <h2 style={{
              fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
              fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 900,
              letterSpacing: '-0.02em', color: '#14271C',
              marginBottom: 10, lineHeight: 1.2,
            }}>
              Stay in the loop.
            </h2>
            <p style={{ fontSize: 13, color: '#6e7860', lineHeight: 1.7, marginBottom: 20 }}>
              Get product updates and loyalty tips for local businesses.
            </p>

            {sent ? (
              <p style={{ fontSize: 13, color: '#B0894F', fontWeight: 600 }}>Thanks — you're in. ✓</p>
            ) : (
              <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '11px 48px 11px 14px',
                    background: 'rgba(20,39,28,0.04)',
                    border: '1px solid rgba(20,39,28,0.15)',
                    borderRadius: 0, color: '#14271C',
                    fontSize: 13, fontFamily: 'inherit',
                    outline: 'none',
                  }}
                  className="fs-input"
                />
                <button type="submit" style={{
                  position: 'absolute', right: 8, top: '50%',
                  transform: 'translateY(-50%)',
                  width: 30, height: 30,
                  background: '#B0894F', border: 'none',
                  borderRadius: 0, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }} className="fs-send">
                  <Send size={13} color="#14271C" />
                </button>
              </form>
            )}
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#B0894F', marginBottom: 20,
            }}>
              Quick Links
            </h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NAV.map(link => (
                <a key={link.label} href={link.href} className="fs-link" style={{
                  fontSize: 13, color: '#6e7860',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* 3. Contact */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#B0894F', marginBottom: 20,
            }}>
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Mail size={13} color="#B0894F" strokeWidth={1.5} />
                <a href="mailto:hello@onusclub.com" className="fs-link" style={{
                  fontSize: 13, color: '#6e7860', textDecoration: 'none',
                }}>
                  hello@onusclub.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MapPin size={13} color="#B0894F" strokeWidth={1.5} />
                <span style={{ fontSize: 13, color: '#6e7860' }}>Netherlands</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#B0894F', animation: 'fs-pulse 2s ease-in-out infinite',
                }} />
                <span style={{ fontSize: 12, color: 'rgba(20,39,28,0.35)' }}>
                  Available for demos
                </span>
              </div>
            </div>
          </div>

          {/* 4. Follow */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#B0894F', marginBottom: 20,
            }}>
              Follow Us
            </h3>
            <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
              <TooltipProvider>
                {SOCIAL.map(({ icon: Icon, label, href, tip }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <a href={href} aria-label={label} className="fs-icon" style={{
                        width: 36, height: 36, display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        border: '1px solid rgba(20,39,28,0.15)',
                        color: 'rgba(20,39,28,0.4)',
                        textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
                      }}>
                        <Icon size={15} strokeWidth={1.5} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent style={{
                      background: '#14271C', color: '#F4F1E9',
                      border: 'none', fontSize: 12, fontWeight: 600,
                    }}>
                      {tip}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>

            <p style={{ fontSize: 12, color: 'rgba(20,39,28,0.4)', lineHeight: 1.65 }}>
              Built for cafés, salons, barbers, gyms & more. Starting in the Netherlands.
            </p>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div style={{
          marginTop: 56, paddingTop: 28, paddingBottom: 40,
          borderTop: '1px solid rgba(20,39,28,0.08)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <p style={{ fontSize: 12, color: 'rgba(20,39,28,0.35)' }}>
            © {new Date().getFullYear()} OnUsClub. All rights reserved. Made in the Netherlands.
          </p>
          <nav style={{ display: 'flex', gap: 20 }}>
            {LEGAL.map(link => (
              <a key={link.label} href={link.href} className="fs-link" style={{
                fontSize: 12, color: 'rgba(20,39,28,0.4)', textDecoration: 'none',
              }}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <style>{`
        .fs-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.9fr 0.9fr;
          gap: clamp(32px, 5vw, 64px);
        }
        .fs-link:hover { color: #B0894F !important; }
        .fs-icon:hover { border-color: #B0894F !important; color: #B0894F !important; }
        .fs-input::placeholder { color: rgba(20,39,28,0.35); }
        .fs-send:hover { background: #d4a96a !important; }
        .fs-input:focus { border-color: rgba(176,137,79,0.5) !important; }
        @keyframes fs-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 900px) {
          .fs-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 540px) {
          .fs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  )
}
