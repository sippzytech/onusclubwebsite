import Link from 'next/link'
import { FOOTER_LINKS } from '@/lib/content'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-cloud)',
        padding: '56px 0 40px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="foot-grid">
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div
              style={{
                fontFamily: "'Extenda', sans-serif",
                fontSize: 28,
                letterSpacing: '0.01em',
                transform: 'scaleX(1.35)',
                transformOrigin: 'left center',
                display: 'inline-block',
                color: 'var(--color-deep-coal)',
                lineHeight: 1,
              }}
            >
              OnUsClub
            </div>
            <p
              style={{
                fontSize: 14,
                color: 'var(--color-stone)',
                marginTop: 14,
                lineHeight: 1.6,
              }}
            >
              Digital loyalty that lives in your customers&apos; wallet. No app, no plastic
              — just regulars coming back.
            </p>
          </div>

          {/* Link columns */}
          <div className="foot-cols">
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <h4
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-stone)',
                    marginBottom: 16,
                    fontWeight: 500,
                    fontFamily: 'inherit',
                  }}
                >
                  {group}
                </h4>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      display: 'block',
                      fontSize: 14,
                      color: 'var(--color-graphite-ink)',
                      textDecoration: 'none',
                      marginBottom: 10,
                    }}
                    className="foot-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid var(--color-cloud)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, color: 'var(--color-stone)' }}>
            &copy; 2026 OnUsClub. Made in the Netherlands.
          </span>
          <span style={{ fontSize: 13, color: 'var(--color-stone)' }}>
            hello@onusclub.com
          </span>
        </div>
      </div>

      <style>{`
        .foot-grid {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }
        .foot-cols {
          display: flex;
          gap: 64px;
          flex-wrap: wrap;
        }
        .foot-link:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: var(--color-graphite-ink);
        }
      `}</style>
    </footer>
  )
}
