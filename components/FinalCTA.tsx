'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const H2_WORDS = 'See it live in ten minutes.'.split(' ')

const BUSINESS_TYPES = [
  'Café / Coffee shop',
  'Restaurant / Bar',
  'Salon / Barber',
  'Gym / Fitness studio',
  'Dental practice',
  'Retail shop',
  'Other',
]

const TRUST = [
  '10-minute call, no commitment',
  'Live wallet card set up during the demo',
  'Works on any iPhone or Android',
]

type Fields = {
  name: string; business: string; email: string
  phone: string; type: string; message: string
}

const EMPTY: Fields = { name: '', business: '', email: '', phone: '', type: '', message: '' }

function SuccessState() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <div style={{
        width: 52, height: 52,
        border: '1px solid #B0894F',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px',
      }}>
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path d="M1.5 8l5.5 5.5L18.5 1.5" stroke="#B0894F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
        fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em',
        textTransform: 'uppercase', color: '#14271C', marginBottom: 12,
      }}>
        Request received.
      </h3>
      <p style={{ fontSize: 14, color: '#6e7860', lineHeight: 1.7, maxWidth: 300, margin: '0 auto' }}>
        We'll be in touch within one business day to book your demo slot.
      </p>
    </div>
  )
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%', padding: '12px 14px',
    border: `1px solid ${hasError ? '#c0392b' : 'rgba(20,39,28,0.15)'}`,
    borderRadius: 0, fontSize: 14,
    color: '#14271C', background: 'transparent',
    fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  }
}

function Field({ label, hint, error, children }: {
  label: string; hint?: string; error?: string; children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
        <label style={{
          fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#14271C',
        }}>
          {label}
        </label>
        {hint && !error && <span style={{ fontSize: 11, color: '#6e7860' }}>{hint}</span>}
        {error && <span style={{ fontSize: 11, color: '#c0392b' }}>{error}</span>}
      </div>
      {children}
    </div>
  )
}

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [submitted, setSubmitted] = useState(false)

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      defaults: { ease: 'power3.out' },
    })
      .from('.cta-eyebrow',  { opacity: 0, y: 10, duration: 0.45 })
      .from('.cta-word',     { yPercent: 115, duration: 0.7, stagger: 0.055 }, '-=0.2')
      .from('.cta-lead',    { opacity: 0, y: 14, duration: 0.5 }, '-=0.3')
      .from('.cta-trust li', { opacity: 0, x: -12, duration: 0.4, stagger: 0.1 }, '-=0.25')
      .from('.cta-form',    { opacity: 0, x: 40, duration: 0.75 }, '-=0.55')
  }, { scope: ref })

  function validate() {
    const e: Partial<Fields> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.business.trim()) e.business = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.type) e.type = 'Select a type'
    return e
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitted(true)
  }

  function set(field: keyof Fields) {
    return (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [field]: ev.target.value }))
      setErrors(e => ({ ...e, [field]: undefined }))
    }
  }

  return (
    <section ref={ref} id="demo" style={{ background: '#0d1c13', padding: '100px 6vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="cta-grid">

          {/* ── Left copy ─────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p className="cta-eyebrow" style={{
              fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#B0894F', marginBottom: 20,
            }}>
              Book a demo
            </p>

            <h2 style={{
              fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
              fontSize: 'clamp(32px, 4.5vw, 60px)',
              fontWeight: 900, letterSpacing: '-0.03em',
              lineHeight: 1.05, textTransform: 'uppercase',
              color: '#F4F1E9', marginBottom: 20,
            }}>
              {H2_WORDS.map((word, i) => (
                <span key={i} style={{
                  display: 'inline-block', overflow: 'hidden',
                  verticalAlign: 'bottom', paddingBottom: '0.06em',
                  marginBottom: '-0.04em',
                  marginRight: i < H2_WORDS.length - 1 ? '0.28em' : 0,
                }}>
                  <span className="cta-word" style={{ display: 'inline-block' }}>{word}</span>
                </span>
              ))}
            </h2>

            <p className="cta-lead" style={{
              fontSize: 15, lineHeight: 1.75,
              color: 'rgba(244,241,233,0.5)', maxWidth: 400, marginBottom: 40,
            }}>
              We'll set up a live wallet loyalty card for your business so you see exactly what your customers will. No obligation, no hard sell.
            </p>

            <ul className="cta-trust" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {TRUST.map(t => (
                <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <span style={{
                    width: 20, height: 20, flexShrink: 0,
                    border: '1px solid #B0894F',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5l2.2 2.2L8 1" stroke="#B0894F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 14, color: 'rgba(244,241,233,0.55)' }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right form ────────────────────────────────────────── */}
          <div className="cta-form" style={{
            background: '#F4F1E9',
            padding: 'clamp(28px, 4vw, 48px)',
          }}>
            {submitted ? <SuccessState /> : (
              <form onSubmit={handleSubmit} noValidate>
                <p style={{
                  fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: '#B0894F', marginBottom: 28,
                }}>
                  Request a demo
                </p>

                <div className="cta-row">
                  <Field label="Your name" error={errors.name}>
                    <input type="text" placeholder="Jane Smith" value={form.name} onChange={set('name')} style={inputStyle(!!errors.name)} className="cta-input" />
                  </Field>
                  <Field label="Business name" error={errors.business}>
                    <input type="text" placeholder="Café Bloom" value={form.business} onChange={set('business')} style={inputStyle(!!errors.business)} className="cta-input" />
                  </Field>
                </div>

                <div className="cta-row">
                  <Field label="Email address" error={errors.email}>
                    <input type="email" placeholder="jane@cafebloom.nl" value={form.email} onChange={set('email')} style={inputStyle(!!errors.email)} className="cta-input" />
                  </Field>
                  <Field label="Phone" hint="Optional">
                    <input type="tel" placeholder="+31 6 12345678" value={form.phone} onChange={set('phone')} style={inputStyle(false)} className="cta-input" />
                  </Field>
                </div>

                <Field label="Type of business" error={errors.type}>
                  <select value={form.type} onChange={set('type')} className="cta-input"
                    style={{ ...inputStyle(!!errors.type), color: form.type ? '#14271C' : '#6e7860' }}>
                    <option value="" disabled>Select your business type</option>
                    {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>

                <Field label="Anything to know?" hint="Optional">
                  <textarea rows={3} placeholder="Number of locations, questions…" value={form.message} onChange={set('message')}
                    className="cta-input" style={{ ...inputStyle(false), resize: 'vertical', minHeight: 80 }} />
                </Field>

                <button type="submit" className="cta-submit">
                  Book my demo →
                </button>

                <p style={{ fontSize: 12, color: '#6e7860', textAlign: 'center', marginTop: 14 }}>
                  We respond within one business day.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>

      <style>{`
        .cta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 7vw, 100px);
          align-items: center;
        }
        .cta-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .cta-input:focus {
          outline: none;
          border-color: #B0894F !important;
          box-shadow: 0 0 0 3px rgba(176,137,79,0.12);
        }
        .cta-submit {
          width: 100%;
          margin-top: 8px;
          padding: 14px 24px;
          background: #14271C;
          color: #F4F1E9;
          border: none;
          border-radius: 0;
          font-family: var(--font-lato), ui-sans-serif, system-ui, sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .cta-submit:hover { background: #B0894F; color: #14271C; }
        @media (max-width: 900px) {
          .cta-grid { grid-template-columns: 1fr; gap: 56px; }
        }
        @media (max-width: 560px) {
          .cta-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
