import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Terms of Service — OnUsClub',
  description: 'The legal terms governing use of the OnUsClub digital loyalty platform by merchants and consumers.',
}

const SECTIONS = [
  {
    id: 'intro',
    title: '1. Introduction & Acceptance',
    content: `These Terms of Service ("Terms") form a legally binding agreement between you and OnUsClub B.V. ("OnUsClub", "we", "us", "our"), a company incorporated in the Netherlands, governing your use of the OnUsClub platform, website (onusclub.com), and all related services (collectively, the "Service").

By registering as a merchant, adding a loyalty pass to your wallet, or otherwise using the Service, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.

If you are using the Service on behalf of a business, you represent and warrant that you have authority to bind that business to these Terms.

We reserve the right to update these Terms at any time. Continued use of the Service after notification of changes constitutes acceptance of the revised Terms.`,
  },
  {
    id: 'service',
    title: '2. Description of Service',
    content: `OnUsClub provides a digital loyalty programme platform that allows:

- Merchants to create, customise, and manage digital stamp-card loyalty programmes.
- Consumers to receive, store, and redeem digital loyalty passes in Apple Wallet and Google Wallet.

The Service integrates with the Google Pay Passes API and Apple PassKit to provision loyalty passes on consumer devices. OnUsClub is not affiliated with Google LLC or Apple Inc., and those companies' own terms apply to the use of their Wallet applications.`,
  },
  {
    id: 'merchant',
    title: '3. Merchant Accounts',
    content: `**Eligibility:** To create a merchant account, you must be at least 18 years old and operate a legitimate business. We reserve the right to decline or terminate accounts at our discretion.

**Account security:** You are responsible for maintaining the confidentiality of your login credentials. You must notify us immediately at support@onusclub.com if you suspect unauthorised access to your account.

**Accurate information:** You agree to provide accurate, current, and complete information when registering and to keep your account details up to date. Providing false information may result in immediate account termination.

**Permitted use:** Your merchant account and the OnUsClub Service may only be used for lawful business purposes in connection with a genuine loyalty programme for your customers. You may not resell, sub-license, or otherwise commercialise the Service without our prior written consent.`,
  },
  {
    id: 'consumer',
    title: '4. Consumer Loyalty Passes',
    content: `When you add an OnUsClub loyalty pass to Apple Wallet or Google Wallet:

- The pass is issued by OnUsClub on behalf of the relevant merchant.
- Stamps are added by the merchant at their discretion. OnUsClub does not guarantee that any specific number of stamps will be awarded.
- Rewards are defined by the merchant and may be subject to availability, expiry, or other conditions set by the merchant.
- OnUsClub is not responsible for the quality, availability, or fulfilment of rewards offered by merchants.
- Passes may be updated or revoked by the merchant or by OnUsClub if the merchant's account is suspended or terminated.

Loyalty passes have no monetary value and are not transferable.`,
  },
  {
    id: 'fees',
    title: '5. Fees & Payment',
    content: `**Subscription plans:** Merchant access to OnUsClub is provided on a subscription basis. Current pricing is available at onusclub.com/pricing.

**Billing:** Subscription fees are billed in advance, monthly or annually depending on your chosen plan. Payment is processed via our third-party payment processor (Stripe).

**Taxes:** Prices are exclusive of VAT or other applicable taxes unless stated otherwise. You are responsible for any applicable taxes in your jurisdiction.

**Refunds:** Subscription fees are generally non-refundable. If you believe you have been charged in error, contact us at support@onusclub.com within 14 days of the charge.

**Non-payment:** Failure to pay fees may result in suspension or termination of your account. We will provide reasonable notice before suspending access.`,
  },
  {
    id: 'ip',
    title: '6. Intellectual Property',
    content: `**Our IP:** OnUsClub and its licensors retain all intellectual property rights in the Service, including but not limited to software, design, trademarks, and content we create. These Terms do not grant you any ownership rights in the Service.

**Your IP:** You retain ownership of all content you upload to OnUsClub, including your business logo, name, and branding materials. By uploading content, you grant OnUsClub a non-exclusive, royalty-free licence to use that content solely to operate and deliver the Service.

**Feedback:** Any feedback, suggestions, or ideas you provide regarding the Service may be used by OnUsClub without restriction or compensation.`,
  },
  {
    id: 'prohibited',
    title: '7. Prohibited Uses',
    content: `You agree not to:

- Use the Service for any unlawful purpose or in violation of any applicable regulations.
- Issue fraudulent stamps or manipulate loyalty programmes to deceive consumers.
- Attempt to gain unauthorised access to any part of the Service or another user's account.
- Introduce malware, viruses, or any other harmful code into the Service.
- Scrape, crawl, or extract data from the Service without prior written consent.
- Use the Service to send unsolicited communications (spam).
- Impersonate OnUsClub, another merchant, or any third party.
- Reverse-engineer, decompile, or disassemble any part of the Service.

Violation of these prohibitions may result in immediate suspension or termination of your account and may expose you to legal liability.`,
  },
  {
    id: 'privacy',
    title: '8. Data & Privacy',
    content: `Your use of the Service is governed by our Privacy Policy, which is incorporated into these Terms by reference. As a merchant, you are responsible for ensuring that your collection and use of consumer data through the Service complies with applicable data protection laws, including the GDPR.

By using the Service, you acknowledge that:

- You have a valid legal basis for collecting consumer data via loyalty programmes.
- You will not use consumer data obtained through OnUsClub for purposes incompatible with the loyalty programme.
- You will maintain your own privacy policy informing your customers about how their data is used.

OnUsClub acts as a data processor on behalf of merchants for consumer loyalty data, under the terms set out in our Data Processing Agreement (DPA), available on request.`,
  },
  {
    id: 'liability',
    title: '9. Disclaimer & Limitation of Liability',
    content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

ONUSCLUB DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.

TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, ONUSCLUB'S TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO ONUSCLUB IN THE 12 MONTHS PRECEDING THE CLAIM.

IN NO EVENT SHALL ONUSCLUB BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL.

Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above may not apply to you.`,
  },
  {
    id: 'termination',
    title: '10. Termination',
    content: `**By you:** You may cancel your merchant subscription at any time through your account dashboard. Access to the Service continues until the end of your current billing period.

**By us:** We may suspend or terminate your access to the Service immediately if you breach these Terms, fail to pay fees, or if we are required to do so by law. We will endeavour to give reasonable notice where possible.

**Effect of termination:** Upon termination, your right to use the Service ceases immediately. We will retain your data for the period described in our Privacy Policy and then delete it. You may request a data export before termination by contacting support@onusclub.com.

Consumer loyalty passes issued before termination may remain in consumers' Wallets but will no longer be updated.`,
  },
  {
    id: 'governing',
    title: '11. Governing Law & Disputes',
    content: `These Terms are governed by the laws of the Netherlands. Any disputes arising out of or in connection with these Terms or the Service shall first be attempted to be resolved through good-faith negotiation.

If a dispute cannot be resolved through negotiation within 30 days, it shall be submitted to the exclusive jurisdiction of the courts of Amsterdam, the Netherlands, unless consumer protection laws in your country of residence provide otherwise.

Nothing in these Terms affects your rights as a consumer under applicable mandatory consumer protection laws.`,
  },
  {
    id: 'misc',
    title: '12. Miscellaneous',
    content: `**Entire agreement:** These Terms, together with the Privacy Policy and any applicable Data Processing Agreement, constitute the entire agreement between you and OnUsClub regarding the Service.

**Severability:** If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.

**No waiver:** Failure by OnUsClub to enforce any provision of these Terms shall not constitute a waiver of our right to enforce it in the future.

**Assignment:** You may not assign or transfer your rights under these Terms without our prior written consent. OnUsClub may assign its rights and obligations without restriction.

**Force majeure:** OnUsClub is not liable for any failure or delay in performance caused by events beyond our reasonable control.

**Contact:** For questions about these Terms, contact us at support@onusclub.com.`,
  },
]

export default function TermsOfService() {
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
            Terms of Service
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
              <div style={{ fontSize: 15, lineHeight: 1.82, color: 'rgba(20,39,28,0.75)' }}>
                {section.content.split('\n').map((line, i) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <strong key={i} style={{ display: 'block', color: '#14271C', fontWeight: 700, marginTop: 16, marginBottom: 4 }}>{line.replace(/\*\*/g, '')}</strong>
                  }
                  if (line.startsWith('- ')) {
                    return <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                      <span style={{ color: '#B0894F', flexShrink: 0, marginTop: 2 }}>—</span>
                      <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong style="color:#14271C;font-weight:700">$1</strong>') }} />
                    </div>
                  }
                  if (line === '') return <div key={i} style={{ height: 12 }} />
                  return <p key={i} style={{ margin: '0 0 8px' }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#14271C;font-weight:700">$1</strong>') }} />
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div style={{ borderTop: '1px solid rgba(20,39,28,0.08)', marginTop: 80, paddingTop: 40, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/privacy" style={{ fontSize: 13, color: '#6e7860', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy →</Link>
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
