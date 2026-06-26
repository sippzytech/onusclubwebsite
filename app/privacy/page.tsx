import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Privacy Policy — OnUsClub',
  description: 'Learn how OnUsClub collects, uses, and protects your personal data, including data stored in Google Wallet and Apple Wallet loyalty passes.',
}

const SECTIONS = [
  {
    id: 'intro',
    title: '1. Introduction',
    content: `OnUsClub B.V. ("OnUsClub", "we", "us", or "our") operates a digital loyalty platform that enables merchants to issue and manage stamp-card loyalty programmes via Apple Wallet and Google Wallet. This Privacy Policy explains what personal data we collect, why we collect it, how we use it, and your rights under the General Data Protection Regulation (GDPR) and other applicable laws.

By using OnUsClub — whether as a merchant or as a consumer redeeming a loyalty pass — you agree to the practices described in this policy.`,
  },
  {
    id: 'who',
    title: '2. Who We Are',
    content: `OnUsClub B.V. is the data controller for personal data processed through our platform.

Contact details:
Email: privacy@onusclub.com
Address: Netherlands
For data-related enquiries please use: privacy@onusclub.com`,
  },
  {
    id: 'what',
    title: '3. Data We Collect',
    content: `We may collect and process the following categories of personal data:

**From consumers (loyalty card holders):**
- Full name
- Email address
- Phone number (where provided for pass delivery)
- Date of birth / birthday (where provided for birthday rewards)
- Pass redemption history (stamps earned, rewards claimed)
- Device type (iOS / Android) inferred from Wallet pass interactions
- Approximate location at time of stamp (only where merchant enables geo-fencing notifications)

**From merchants (business owners):**
- Name and job title
- Business email address
- Business name, address, and category
- Payment and billing details (processed by our payment processor; we do not store raw card numbers)
- Dashboard activity logs

**Automatically collected data:**
- IP address
- Browser type and version
- Pages visited and time spent
- Referral source
- Cookies and similar tracking technologies (see Section 9)`,
  },
  {
    id: 'why',
    title: '4. Why We Collect Your Data',
    content: `We process personal data for the following purposes and on the following legal bases under GDPR:

| Purpose | Legal Basis |
|---|---|
| Issuing and updating loyalty passes in Apple Wallet and Google Wallet | Performance of contract |
| Sending push notifications when stamps are added or rewards are available | Legitimate interest / consent |
| Enabling merchants to manage their loyalty programme | Performance of contract |
| Birthday rewards and personalised offers | Consent |
| Fraud prevention and platform security | Legitimate interest |
| Compliance with legal obligations (e.g. tax, accounting) | Legal obligation |
| Analytics to improve our service | Legitimate interest |
| Marketing communications (newsletter, product updates) | Consent |`,
  },
  {
    id: 'google-wallet',
    title: '5. Google Wallet & Apple Wallet',
    content: `OnUsClub integrates with Google Wallet and Apple Wallet to deliver digital loyalty passes to consumers. By adding an OnUsClub loyalty pass to your Wallet:

- Your name and email address are shared with Google or Apple to provision the pass on your device.
- Pass metadata (stamp count, reward status, business branding) is stored by OnUsClub and synced to your Wallet application.
- When a merchant stamps your card, the pass updates in real time via Google Pay Passes API or Apple PassKit.
- Google and Apple each have their own privacy policies governing data stored within their Wallet applications. We encourage you to review the Google Privacy Policy and Apple Privacy Policy.

We only pass the minimum data necessary to provision and update your loyalty card. We do not receive your payment card details from Google Wallet or Apple Wallet.`,
  },
  {
    id: 'sharing',
    title: '6. Who We Share Data With',
    content: `We share personal data only where necessary:

**Merchants:** Consumer stamp and reward history is visible to the merchant whose loyalty programme you participate in. Merchants must comply with this Privacy Policy and our Merchant Terms of Service when handling consumer data.

**Third-party processors:** We use carefully selected sub-processors including:
- Google LLC — Google Wallet Passes API, Google Analytics, Firebase
- Apple Inc. — Apple PassKit / Wallet
- Stripe — payment processing (merchants)
- Vercel — hosting and infrastructure
- Resend / SendGrid — transactional email

**Legal requirements:** We may disclose data to competent authorities where required by law, court order, or to protect the rights, property, or safety of OnUsClub, our users, or the public.

We do not sell personal data to third parties.`,
  },
  {
    id: 'retention',
    title: '7. Data Retention',
    content: `We retain personal data for as long as necessary to fulfil the purposes described in this policy:

- Consumer loyalty pass data: for the duration of the loyalty programme plus 12 months after the pass is deleted or the merchant closes their account.
- Merchant account data: for the duration of the contract plus 7 years for financial / tax records.
- Marketing consent records: until you withdraw consent plus 3 years.
- Server and security logs: 90 days.

When data is no longer required, it is securely deleted or anonymised.`,
  },
  {
    id: 'rights',
    title: '8. Your Rights (GDPR)',
    content: `If you are located in the European Economic Area (EEA) or the United Kingdom, you have the following rights:

- **Right of access** — request a copy of the personal data we hold about you.
- **Right to rectification** — request correction of inaccurate data.
- **Right to erasure** — request deletion of your data ("right to be forgotten").
- **Right to restriction** — request that we limit how we process your data.
- **Right to data portability** — receive your data in a structured, machine-readable format.
- **Right to object** — object to processing based on legitimate interests or for direct marketing.
- **Right to withdraw consent** — where processing is based on consent, you may withdraw at any time.

To exercise any of these rights, contact us at privacy@onusclub.com. We will respond within 30 days. You also have the right to lodge a complaint with your national data protection authority (in the Netherlands: Autoriteit Persoonsgegevens — autoriteitpersoonsgegevens.nl).`,
  },
  {
    id: 'cookies',
    title: '9. Cookies',
    content: `Our website uses cookies and similar technologies. We use:

- **Strictly necessary cookies** — required for the website to function (session management, security).
- **Analytics cookies** — to understand how visitors use our site (Google Analytics). These are only set with your consent.
- **Marketing cookies** — to measure the effectiveness of advertising campaigns. Only set with your consent.

You can manage cookie preferences via the cookie banner on our website or through your browser settings. Disabling analytics or marketing cookies will not affect your ability to use the loyalty platform.`,
  },
  {
    id: 'security',
    title: '10. Security',
    content: `We implement appropriate technical and organisational measures to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorised disclosure, or access. These measures include:

- Encryption in transit (TLS 1.2+) and at rest
- Access controls and role-based permissions
- Regular security assessments
- Incident response procedures

In the event of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will notify you without undue delay as required by GDPR Article 34.`,
  },
  {
    id: 'children',
    title: '11. Children',
    content: `OnUsClub is not directed at children under the age of 16. We do not knowingly collect personal data from children under 16. If you believe we have inadvertently collected such data, please contact us at privacy@onusclub.com and we will delete it promptly.`,
  },
  {
    id: 'changes',
    title: '12. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email (if you have provided one) or by displaying a prominent notice on our website at least 14 days before the change takes effect. The "last updated" date at the top of this page will always reflect the most recent version.`,
  },
  {
    id: 'contact',
    title: '13. Contact Us',
    content: `For any privacy-related questions, requests, or complaints:

Email: privacy@onusclub.com
General contact: hello@onusclub.com
Address: Netherlands

We aim to respond to all requests within 30 days.`,
  },
]

export default function PrivacyPolicy() {
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

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '72px 6vw 120px' }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <p style={{
            fontFamily: 'var(--font-lato), sans-serif',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#B0894F', marginBottom: 16,
          }}>
            Legal
          </p>
          <h1 style={{
            fontFamily: 'var(--font-lato), sans-serif',
            fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900,
            letterSpacing: '-0.03em', textTransform: 'uppercase',
            color: '#14271C', lineHeight: 1.05, margin: '0 0 20px',
          }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(20,39,28,0.5)', lineHeight: 1.6 }}>
            Last updated: 26 June 2025
          </p>
          <div style={{ borderTop: '1px solid rgba(20,39,28,0.1)', marginTop: 32 }} />
        </div>

        {/* Table of contents */}
        <div style={{
          background: 'rgba(20,39,28,0.04)',
          border: '1px solid rgba(20,39,28,0.08)',
          padding: '24px 28px', marginBottom: 56,
        }}>
          <p style={{
            fontFamily: 'var(--font-lato), sans-serif',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#B0894F', marginBottom: 14,
          }}>
            Contents
          </p>
          <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {SECTIONS.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="legal-toc-link">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
          {SECTIONS.map(section => (
            <div key={section.id} id={section.id}>
              <h2 style={{
                fontFamily: 'var(--font-lato), sans-serif',
                fontSize: 18, fontWeight: 900, letterSpacing: '-0.01em',
                textTransform: 'uppercase', color: '#14271C', marginBottom: 20,
              }}>
                {section.title}
              </h2>
              <div style={{
                fontSize: 15, lineHeight: 1.82, color: 'rgba(20,39,28,0.75)',
                whiteSpace: 'pre-wrap',
              }}>
                {section.content.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <strong key={i} style={{ display: 'block', color: '#14271C', fontWeight: 700, marginTop: 16, marginBottom: 4 }}>{line.replace(/\*\*/g, '')}</strong>
                  }
                  if (line.startsWith('- ')) {
                    return <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
                      <span style={{ color: '#B0894F', flexShrink: 0 }}>—</span>
                      <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong style="color:#14271C;font-weight:700">$1</strong>') }} />
                    </div>
                  }
                  if (line.startsWith('| ')) return null
                  if (line === '') return <div key={i} style={{ height: 12 }} />
                  return <p key={i} style={{ margin: '0 0 8px' }}>{line}</p>
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div style={{ borderTop: '1px solid rgba(20,39,28,0.08)', marginTop: 80, paddingTop: 40, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/terms" style={{ fontSize: 13, color: '#6e7860', textDecoration: 'none', fontWeight: 500 }}>Terms of Service →</Link>
          <Link href="/gdpr" style={{ fontSize: 13, color: '#6e7860', textDecoration: 'none', fontWeight: 500 }}>GDPR Rights →</Link>
          <Link href="/" style={{ fontSize: 13, color: '#6e7860', textDecoration: 'none', fontWeight: 500 }}>← Back to Home</Link>
        </div>
      </div>
      <style>{`
        .legal-toc-link { font-size: 13px; color: #6e7860; text-decoration: none; transition: color 0.2s; }
        .legal-toc-link:hover { color: #B0894F; }
      `}</style>
    </div>
  )
}
