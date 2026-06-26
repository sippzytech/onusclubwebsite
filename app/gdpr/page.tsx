import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'GDPR — Your Data Rights — OnUsClub',
  description: 'Understand your rights under the General Data Protection Regulation (GDPR) when using OnUsClub loyalty programmes.',
}

const RIGHTS = [
  {
    icon: '01',
    title: 'Right of Access',
    body: 'You can request a copy of all personal data we hold about you. We will provide this in a readable format within 30 days of your request.',
  },
  {
    icon: '02',
    title: 'Right to Rectification',
    body: 'If any of the data we hold about you is inaccurate or incomplete, you can ask us to correct it at any time.',
  },
  {
    icon: '03',
    title: 'Right to Erasure',
    body: 'You can request that we delete your personal data — the "right to be forgotten". We will comply unless we are required to retain it by law (e.g. financial records).',
  },
  {
    icon: '04',
    title: 'Right to Restriction',
    body: 'You can ask us to pause processing of your data while a dispute is resolved, or where you believe the processing is unlawful.',
  },
  {
    icon: '05',
    title: 'Right to Data Portability',
    body: 'You can request your data in a structured, commonly used, machine-readable format and have it transferred to another controller.',
  },
  {
    icon: '06',
    title: 'Right to Object',
    body: 'You can object to processing based on legitimate interests or for direct marketing purposes. Where you object to direct marketing, we will stop immediately.',
  },
  {
    icon: '07',
    title: 'Right to Withdraw Consent',
    body: 'Where processing is based on your consent (e.g. newsletters, birthday offers), you may withdraw consent at any time by contacting us or using the unsubscribe link in emails.',
  },
  {
    icon: '08',
    title: 'Right to Lodge a Complaint',
    body: 'If you believe we have processed your data unlawfully, you have the right to lodge a complaint with the Dutch Data Protection Authority: Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
  },
]

const FAQ = [
  {
    q: 'Who is the data controller?',
    a: 'OnUsClub B.V., incorporated in the Netherlands, is the data controller for personal data collected through our platform. For consumer loyalty data, the relevant merchant may also act as a joint controller.',
  },
  {
    q: 'What data does OnUsClub collect about consumers?',
    a: 'When you use an OnUsClub loyalty pass, we may collect your name, email address, phone number, date of birth (if you opt in to birthday rewards), and your stamp/reward history. See our Privacy Policy for full details.',
  },
  {
    q: 'Why does OnUsClub collect date of birth?',
    a: 'Date of birth is only collected if you explicitly opt in to receive birthday rewards from a merchant. It is used solely to trigger a birthday reward notification. You can withdraw consent at any time.',
  },
  {
    q: 'How does OnUsClub use Google Wallet data?',
    a: 'We use the Google Pay Passes API to provision and update loyalty passes on your device. Your name and email are shared with Google to create the pass. We do not receive any payment data from Google Wallet.',
  },
  {
    q: 'How long is my data kept?',
    a: 'Consumer loyalty data is retained for the duration of the programme plus 12 months. You can request deletion at any time by emailing privacy@onusclub.com.',
  },
  {
    q: 'Is my data sold to third parties?',
    a: 'No. OnUsClub does not sell personal data to any third party. Data is shared only with the merchant whose programme you participate in and with our sub-processors (e.g. Google, Stripe) as necessary to operate the service.',
  },
]

export default function GDPRPage() {
  return (
    <div style={{ background: '#F4F1E9', minHeight: '100vh', color: '#14271C' }}>
      {/* Nav */}
      <nav style={{
        borderBottom: '1px solid rgba(20,39,28,0.08)',
        background: '#F4F1E9',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image src="/new_logo.png" alt="OnUsClub" width={40} height={40} style={{ width: 40, height: 40, objectFit: 'contain' }} priority />
          </Link>
          <Link href="/" style={{
            fontSize: 13, fontWeight: 600, color: '#14271C',
            textDecoration: 'none', letterSpacing: '0.04em',
          }}>
            ← Back to home
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '72px 6vw 120px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{
            fontFamily: 'var(--font-lato), sans-serif',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#B0894F', marginBottom: 16,
          }}>
            Legal · EU / Netherlands
          </p>
          <h1 style={{
            fontFamily: 'var(--font-lato), sans-serif',
            fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900,
            letterSpacing: '-0.03em', textTransform: 'uppercase',
            color: '#14271C', lineHeight: 1.05, margin: '0 0 20px',
          }}>
            Your Data Rights
          </h1>
          <p style={{
            fontSize: 16, lineHeight: 1.75, color: 'rgba(20,39,28,0.6)',
            maxWidth: 520, margin: '0 auto 8px',
          }}>
            Under the General Data Protection Regulation (GDPR), you have clear rights over your personal data. Here is what they mean in plain language.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(20,39,28,0.4)' }}>Last updated: 26 June 2025</p>
        </div>

        {/* Rights grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 2, marginBottom: 80,
        }}>
          {RIGHTS.map(right => (
            <div key={right.icon} style={{
              background: 'rgba(20,39,28,0.03)',
              border: '1px solid rgba(20,39,28,0.08)',
              padding: '28px 28px 32px',
            }}>
              <span style={{
                fontFamily: 'var(--font-lato), sans-serif',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: '#B0894F', display: 'block', marginBottom: 12,
              }}>
                {right.icon}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-lato), sans-serif',
                fontSize: 15, fontWeight: 900, letterSpacing: '-0.01em',
                textTransform: 'uppercase', color: '#14271C', marginBottom: 12,
              }}>
                {right.title}
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(20,39,28,0.65)', margin: 0 }}>
                {right.body}
              </p>
            </div>
          ))}
        </div>

        {/* How to exercise */}
        <div style={{
          background: '#14271C', color: '#F4F1E9',
          padding: '40px 40px 44px',
          marginBottom: 80,
        }}>
          <p style={{
            fontFamily: 'var(--font-lato), sans-serif',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#B0894F', marginBottom: 16,
          }}>
            Exercise Your Rights
          </p>
          <h2 style={{
            fontFamily: 'var(--font-lato), sans-serif',
            fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900,
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: '#F4F1E9', marginBottom: 16,
          }}>
            Contact Us About Your Data
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(244,241,233,0.7)', marginBottom: 28, maxWidth: 520 }}>
            To make a data request — access, erasure, portability, or any other right listed above — email us with your name and the email address associated with your loyalty pass or merchant account.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            <a
              href="mailto:privacy@onusclub.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#B0894F', color: '#14271C',
                fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', textDecoration: 'none',
                padding: '12px 22px',
              }}
            >
              privacy@onusclub.com
            </a>
            <span style={{ fontSize: 13, color: 'rgba(244,241,233,0.45)' }}>
              We respond within 30 days
            </span>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <p style={{
            fontFamily: 'var(--font-lato), sans-serif',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#B0894F', marginBottom: 32, textAlign: 'center',
          }}>
            Frequently Asked Questions
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQ.map((item, i) => (
              <div key={i} style={{
                borderTop: '1px solid rgba(20,39,28,0.08)',
                padding: '28px 0',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-lato), sans-serif',
                  fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em',
                  color: '#14271C', marginBottom: 10,
                }}>
                  {item.q}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.78, color: 'rgba(20,39,28,0.65)', margin: 0 }}>
                  {item.a}
                </p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(20,39,28,0.08)' }} />
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ borderTop: '1px solid rgba(20,39,28,0.08)', marginTop: 80, paddingTop: 40, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/privacy" style={{ fontSize: 13, color: '#6e7860', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy →</Link>
          <Link href="/terms" style={{ fontSize: 13, color: '#6e7860', textDecoration: 'none', fontWeight: 500 }}>Terms of Service →</Link>
          <Link href="/" style={{ fontSize: 13, color: '#6e7860', textDecoration: 'none', fontWeight: 500 }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
