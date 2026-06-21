'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Plus, Minus } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const H2_WORDS = 'Questions we get asked a lot.'.split(' ')

const FAQS = [
  {
    q: 'Do my customers need to download an app?',
    a: 'No. That\'s the whole point. Customers scan a QR code and the loyalty card is added directly to Apple Wallet or Google Wallet. Nothing to download, nothing to create an account for.',
  },
  {
    q: 'Which phones does it work on?',
    a: 'Any iPhone (iOS 6+) with Apple Wallet, and any Android phone (Android 5+) with Google Wallet. That covers virtually every smartphone your customers carry.',
  },
  {
    q: 'How long does it take to get set up?',
    a: 'Under 5 minutes. You log in, set your reward (e.g. "buy 9, get the 10th free"), upload your logo, and we generate your QR code. Your first customer can scan it the same day.',
  },
  {
    q: 'How do I add stamps at the counter?',
    a: 'Your staff open the OnUsClub dashboard on any phone, tablet, or computer and scan the barcode on the customer\'s wallet card. One tap adds the stamp and the card updates instantly.',
  },
  {
    q: 'What happens after the 3-month intro period?',
    a: 'After your first 3 months at €18/month, your plan continues at €30/month. You can switch to the yearly plan (€300/year) any time to lock in the lower rate. We\'ll remind you before anything changes.',
  },
  {
    q: 'Can I cancel at any time?',
    a: 'Yes. Monthly plans can be cancelled at any time with no penalty. Yearly plans are billed annually — if you cancel mid-year you keep access until the end of your billing period.',
  },
  {
    q: 'Can I use OnUsClub across multiple locations?',
    a: 'The current plan covers one location. Multi-location support is on our roadmap. Reach out and we\'ll let you know as soon as it\'s available.',
  },
  {
    q: 'Who owns my customer data?',
    a: 'You do, always. Every customer who joins your loyalty program is yours. You can export your full customer list at any time. We never sell or share your data with third parties.',
  },
]

export default function FAQ() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      defaults: { ease: 'power3.out' },
    })
      .from('.faq-eyebrow', { opacity: 0, y: 10, duration: 0.45 })
      .from('.faq-word',    { yPercent: 115, duration: 0.7, stagger: 0.055 }, '-=0.2')
      .from('.faq-lead',   { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
      .from('.faq-item',   { opacity: 0, y: 20, duration: 0.55, stagger: 0.07 }, '-=0.25')
  }, { scope: ref })

  return (
    <section
      ref={ref}
      id="faq"
      style={{ background: '#F4F1E9', padding: '100px 6vw' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p className="faq-eyebrow" style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#B0894F', marginBottom: 20,
          }}>
            FAQ
          </p>

          <h2 style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 'clamp(32px, 4.5vw, 60px)',
            fontWeight: 900, letterSpacing: '-0.03em',
            lineHeight: 1.05, textTransform: 'uppercase',
            color: '#14271C', margin: '0 auto 20px',
          }}>
            {H2_WORDS.map((word, i) => (
              <span key={i} style={{
                display: 'inline-block', overflow: 'hidden',
                verticalAlign: 'bottom', paddingBottom: '0.06em',
                marginBottom: '-0.04em',
                marginRight: i < H2_WORDS.length - 1 ? '0.28em' : 0,
              }}>
                <span className="faq-word" style={{ display: 'inline-block' }}>{word}</span>
              </span>
            ))}
          </h2>

          <p className="faq-lead" style={{
            fontSize: 15, color: '#6e7860',
            lineHeight: 1.75, marginBottom: 16,
          }}>
            Still have questions?
          </p>

          <a href="#demo" style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
            color: '#B0894F', textDecoration: 'none',
            textTransform: 'uppercase',
          }}>
            Talk to us →
          </a>
        </div>

        {/* ── Accordion ───────────────────────────────────────────── */}
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  className="faq-item"
                  style={{
                    borderBottom: '1px solid rgba(20,39,28,0.1)',
                    borderLeft: isOpen ? '2px solid #B0894F' : '2px solid transparent',
                    paddingLeft: isOpen ? 20 : 0,
                    transition: 'border-color 0.25s ease, padding-left 0.25s ease',
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 20,
                      padding: '24px 0',
                      background: 'none', border: 'none',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
                      fontSize: 15, fontWeight: isOpen ? 700 : 500,
                      color: isOpen ? '#14271C' : '#6e7860',
                      lineHeight: 1.45,
                      transition: 'color 0.2s ease, font-weight 0.2s ease',
                    }}>
                      {faq.q}
                    </span>

                    <span style={{
                      flexShrink: 0, width: 30, height: 30,
                      border: `1px solid ${isOpen ? '#B0894F' : 'rgba(20,39,28,0.15)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'border-color 0.2s ease',
                    }}>
                      {isOpen
                        ? <Minus size={13} color="#B0894F" />
                        : <Plus size={13} color="rgba(20,39,28,0.4)" />
                      }
                    </span>
                  </button>

                  <div style={{
                    maxHeight: isOpen ? 400 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                  }}>
                    <p style={{
                      fontSize: 14, color: '#6e7860',
                      lineHeight: 1.8, paddingBottom: 24, maxWidth: 520,
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

      </div>

    </section>
  )
}
