'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Eyebrow } from '@/components/ui/Eyebrow'
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
    a: 'Your staff open the OnUsClub dashboard on any phone, tablet, or computer and scan the barcode on the customer\'s wallet card. One tap adds the stamp and the card updates on the customer\'s phone instantly.',
  },
  {
    q: 'What happens after the 3-month intro period?',
    a: 'After your first 3 months at €18/month, your plan continues at €30/month. You can switch to the yearly plan (€300/year) any time to lock in the lower rate. We\'ll remind you before anything changes.',
  },
  {
    q: 'Can I cancel at any time?',
    a: 'Yes. Monthly plans can be cancelled at any time with no penalty. Yearly plans are billed annually. If you cancel mid-year we don\'t offer refunds, but you keep access until the end of your billing period.',
  },
  {
    q: 'Can I use OnUsClub across multiple locations?',
    a: 'The current plan covers one location. Multi-location support is on our roadmap. Reach out and we\'ll let you know as soon as it\'s available.',
  },
  {
    q: 'Who owns my customer data?',
    a: 'You do, always. Every customer who joins your loyalty program is yours, not ours. You can export your full customer list at any time. We never sell or share your data with third parties.',
  },
]

export default function FAQ() {
  const containerRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 78%', once: true },
        defaults: { ease: 'power3.out' },
      })

      tl.from('.faq-eyebrow', { opacity: 0, y: 8, duration: 0.4 })
        .from('.rev-word',    { yPercent: 110, duration: 0.65, stagger: 0.05 }, '-=0.15')
        .from('.faq-item',   { opacity: 0, y: 20, duration: 0.5, stagger: 0.07 }, '-=0.3')
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      id="faq"
      style={{ padding: '100px 0', background: 'var(--color-bone-white)', borderTop: '1px solid var(--color-cloud)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="faq-grid">

          {/* Left: heading */}
          <div style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
            <Eyebrow className="faq-eyebrow">FAQ</Eyebrow>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
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
            <p style={{ marginTop: 18, fontSize: 15, color: 'var(--color-stone)', lineHeight: 1.6, maxWidth: 320 }}>
              Still have questions? <a href="#demo" style={{ color: '#B0894F', textDecoration: 'none', fontWeight: 500 }}>Send us a message →</a>
            </p>
          </div>

          {/* Right: accordion */}
          <div>
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  className="faq-item"
                  style={{
                    borderBottom: '1px solid var(--color-cloud)',
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                      padding: '22px 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: isOpen ? '#B0894F' : 'var(--color-deep-coal)',
                        lineHeight: 1.4,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {faq.q}
                    </span>
                    <span
                      style={{
                        flexShrink: 0,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: isOpen ? '#B0894F' : 'var(--color-cloud)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s ease',
                      }}
                    >
                      {isOpen
                        ? <Minus size={14} color="#F4F1E9" />
                        : <Plus size={14} color="var(--color-stone)" />
                      }
                    </span>
                  </button>

                  <div
                    style={{
                      maxHeight: isOpen ? 400 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease',
                    }}
                  >
                    <p
                      style={{
                        fontSize: 15,
                        color: 'var(--color-stone)',
                        lineHeight: 1.72,
                        paddingBottom: 22,
                        maxWidth: 560,
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      <style>{`
        .faq-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 820px) {
          .faq-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .faq-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </section>
  )
}
