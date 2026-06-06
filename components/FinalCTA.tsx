'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Eyebrow } from '@/components/ui/Eyebrow'

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
  name: string
  business: string
  email: string
  phone: string
  type: string
  message: string
}

const EMPTY: Fields = { name: '', business: '', email: '', phone: '', type: '', message: '' }

function SuccessState() {
  return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div
        style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(176,137,79,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}
      >
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
          <path d="M2 10l6.5 6.5L22 2" stroke="#B0894F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3
        className="font-serif"
        style={{ fontSize: 26, fontWeight: 400, letterSpacing: '-0.015em', color: 'var(--color-deep-coal)', marginBottom: 12 }}
      >
        Request received.
      </h3>
      <p style={{ fontSize: 15, color: 'var(--color-stone)', lineHeight: 1.6, maxWidth: 320, margin: '0 auto' }}>
        We&apos;ll be in touch within one business day to book your demo slot.
      </p>
    </div>
  )
}

export default function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [submitted, setSubmitted] = useState(false)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tl = gsap.timeline({
        scrollTrigger: { trigger: containerRef.current, start: 'top 78%', once: true },
        defaults: { ease: 'power3.out' },
      })

      tl.from('.demo-eyebrow', { opacity: 0, y: 8, duration: 0.4 })
        .from('.rev-word',     { yPercent: 110, duration: 0.65, stagger: 0.05 }, '-=0.15')
        .from('.demo-body',    { opacity: 0, y: 14, duration: 0.55 }, '-=0.3')
        .from('.demo-trust li', { opacity: 0, x: -14, duration: 0.4, stagger: 0.1 }, '-=0.25')
        .from('.demo-form-card', { opacity: 0, x: 36, duration: 0.75 }, '-=0.6')
    },
    { scope: containerRef },
  )

  function validate() {
    const e: Partial<Fields> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.business.trim()) e.business = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.type) e.type = 'Please select a type'
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
    <section
      ref={containerRef}
      id="demo"
      style={{ padding: '100px 0', background: 'var(--color-deep-coal)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="demo-grid">

          {/* ── Left copy ─────────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Eyebrow className="demo-eyebrow" style={{ color: 'rgba(244,241,233,0.5)' }}>
              Book a demo
            </Eyebrow>

            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                lineHeight: 1.08,
                letterSpacing: '-0.022em',
                color: 'var(--color-bone-white)',
                marginTop: 16,
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

            <p
              className="demo-body"
              style={{
                fontSize: 16,
                lineHeight: 1.72,
                color: 'rgba(244,241,233,0.65)',
                marginTop: 20,
                maxWidth: 400,
              }}
            >
              We&apos;ll set up a live wallet loyalty card for your business so you see exactly what your customers will. No obligation, no hard sell.
            </p>

            <ul className="demo-trust" style={{ listStyle: 'none', padding: 0, margin: '36px 0 0' }}>
              {TRUST.map(t => (
                <li
                  key={t}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}
                >
                  <span
                    style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: 'rgba(176,137,79,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l2.5 2.5L9 1" stroke="#B0894F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ fontSize: 15, color: 'rgba(244,241,233,0.68)' }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right form ────────────────────────────────────────────── */}
          <div
            className="demo-form-card"
            style={{
              background: 'var(--color-bone-white)',
              borderRadius: 20,
              padding: '40px 36px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.28)',
            }}
          >
            {submitted ? <SuccessState /> : (
              <form onSubmit={handleSubmit} noValidate>
                <p
                  className="font-serif"
                  style={{ fontSize: 22, fontWeight: 400, letterSpacing: '-0.015em', color: 'var(--color-deep-coal)', marginBottom: 28 }}
                >
                  Request a demo
                </p>

                {/* Row: name + business */}
                <div className="demo-row">
                  <Field label="Your name" error={errors.name}>
                    <input
                      className="demo-input"
                      type="text"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={set('name')}
                      style={inputStyle(!!errors.name)}
                    />
                  </Field>
                  <Field label="Business name" error={errors.business}>
                    <input
                      className="demo-input"
                      type="text"
                      placeholder="Café Bloom"
                      value={form.business}
                      onChange={set('business')}
                      style={inputStyle(!!errors.business)}
                    />
                  </Field>
                </div>

                {/* Row: email + phone */}
                <div className="demo-row">
                  <Field label="Email address" error={errors.email}>
                    <input
                      className="demo-input"
                      type="email"
                      placeholder="jane@cafbloom.nl"
                      value={form.email}
                      onChange={set('email')}
                      style={inputStyle(!!errors.email)}
                    />
                  </Field>
                  <Field label="Phone number" hint="Optional">
                    <input
                      className="demo-input"
                      type="tel"
                      placeholder="+31 6 12345678"
                      value={form.phone}
                      onChange={set('phone')}
                      style={inputStyle(false)}
                    />
                  </Field>
                </div>

                {/* Business type */}
                <Field label="Type of business" error={errors.type}>
                  <select
                    className="demo-input"
                    value={form.type}
                    onChange={set('type')}
                    style={{ ...inputStyle(!!errors.type), color: form.type ? 'var(--color-deep-coal)' : 'var(--color-fog)' }}
                  >
                    <option value="" disabled>Select your business type</option>
                    {BUSINESS_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>

                {/* Message */}
                <Field label="Anything you'd like us to know?" hint="Optional">
                  <textarea
                    className="demo-input"
                    rows={3}
                    placeholder="Number of locations, questions, special requests…"
                    value={form.message}
                    onChange={set('message')}
                    style={{ ...inputStyle(false), resize: 'vertical', minHeight: 80 }}
                  />
                </Field>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    marginTop: 8,
                    padding: '14px 24px',
                    background: 'var(--color-deep-coal)',
                    color: 'var(--color-bone-white)',
                    border: 'none',
                    borderRadius: 10,
                    fontSize: 15,
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease, transform 0.15s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#B0894F' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-deep-coal)' }}
                >
                  Book my demo →
                </button>

                <p style={{ fontSize: 12, color: 'var(--color-fog)', textAlign: 'center', marginTop: 14 }}>
                  We respond within one business day.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>

      <style>{`
        .demo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .demo-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .demo-input:focus {
          outline: none;
          border-color: #B0894F !important;
          box-shadow: 0 0 0 3px rgba(176,137,79,0.15);
        }
        @media (max-width: 900px) {
          .demo-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 560px) {
          .demo-row { grid-template-columns: 1fr; }
          .demo-form-card { padding: 28px 20px !important; }
        }
      `}</style>
    </section>
  )
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '11px 14px',
    border: `1px solid ${hasError ? '#c0392b' : 'var(--color-ash-gray)'}`,
    borderRadius: 10,
    fontSize: 14.5,
    color: 'var(--color-deep-coal)',
    background: '#fff',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  }
}

function Field({
  label, hint, error, children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-deep-coal)', letterSpacing: '0.01em' }}>
          {label}
        </label>
        {hint && !error && (
          <span style={{ fontSize: 12, color: 'var(--color-fog)' }}>{hint}</span>
        )}
        {error && (
          <span style={{ fontSize: 12, color: '#c0392b' }}>{error}</span>
        )}
      </div>
      {children}
    </div>
  )
}
