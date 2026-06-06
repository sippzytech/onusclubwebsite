interface WalletPassProps {
  merchant: string
  label: string
  title: string
  filled: number
  total: number
  footnote: string
}

const QR_PATTERN = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0]

const CoffeeCup = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d1c13" strokeWidth="1.8">
    <path d="M4 8h11v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" />
    <path d="M15 9h2a2 2 0 0 1 0 4h-2" />
    <path d="M7 3v2M10 3v2" />
  </svg>
)

export function WalletPass({ merchant, label, title, filled, total, footnote }: WalletPassProps) {
  const rows = Math.ceil(total / 5)

  return (
    <div
      style={{
        width: 320,
        background: 'var(--color-deep-coal)',
        borderRadius: 20,
        padding: '22px 22px 20px',
        color: 'var(--color-bone-white)',
        boxShadow: 'var(--shadow-xl)',
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          paddingBottom: 18,
          borderBottom: '1px solid rgba(244,241,233,0.12)',
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 999,
            background: 'var(--color-bone-white)',
            color: 'var(--color-obsidian)',
            display: 'grid',
            placeItems: 'center',
            fontFamily: 'var(--font-fraunces), ui-serif, Georgia, serif',
            fontWeight: 600,
            fontSize: 15,
            flexShrink: 0,
          }}
        >
          O
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.02em' }}>OnUsClub</div>
        <div
          style={{
            marginLeft: 'auto',
            fontSize: 11,
            color: 'rgba(244,241,233,0.55)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          {merchant}
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          marginTop: 18,
          marginBottom: 4,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(244,241,233,0.55)',
        }}
      >
        {label}
      </div>

      {/* Serif title */}
      <div
        style={{
          fontFamily: 'var(--font-fraunces), ui-serif, Georgia, serif',
          fontSize: 26,
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>

      {/* Stamp grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 10,
          margin: '20px 0 8px',
        }}
      >
        {Array.from({ length: rows * 5 }).map((_, i) => {
          const isFilled = i < filled
          return (
            <div
              key={i}
              className="stamp-dot"
              style={{
                aspectRatio: '1',
                borderRadius: 999,
                border: isFilled
                  ? '1px solid var(--color-bone-white)'
                  : '1px solid rgba(244,241,233,0.28)',
                background: isFilled ? 'var(--color-bone-white)' : 'transparent',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {isFilled && <CoffeeCup />}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 16,
        }}
      >
        <span style={{ fontSize: 12, color: 'rgba(244,241,233,0.7)' }}>{footnote}</span>

        {/* CSS faux-QR */}
        <div
          aria-hidden="true"
          style={{
            width: 46,
            height: 46,
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, 1fr)',
            gap: 2,
          }}
        >
          {QR_PATTERN.map((on, i) => (
            <span
              key={i}
              style={{
                borderRadius: 1,
                background: on
                  ? 'var(--color-bone-white)'
                  : 'rgba(244,241,233,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
