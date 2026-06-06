'use client'

const ITEMS = [
  'Digital loyalty',
  'Apple Wallet',
  'Google Wallet',
  'No app to download',
  'Stamp cards',
  'WhatsApp re-engagement',
  'Real-time analytics',
  'Zero plastic cards',
  'Netherlands-first',
  'Customer data you own',
]

const doubled = [...ITEMS, ...ITEMS]

export default function MarqueeStrip() {
  return (
    <div
      style={{
        background: '#0d1c13',
        borderBottom: '1px solid rgba(244,241,233,0.07)',
        overflow: 'hidden',
        padding: '13px 0',
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span style={{ color: '#B0894F', margin: '0 14px', fontSize: 10 }}>◆</span>
            <span
              style={{
                color: 'rgba(244,241,233,0.52)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.11em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee-scroll 30s linear infinite;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
