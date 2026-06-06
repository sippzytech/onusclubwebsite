export default function TrustStrip() {
  return (
    <div
      style={{
        borderTop: '1px solid var(--color-cloud)',
        borderBottom: '1px solid var(--color-cloud)',
        padding: '22px 0',
        background: 'var(--color-bone-white)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px 40px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-stone)',
          }}
        >
          One platform for
        </span>
        <span
          className="font-serif"
          style={{
            fontSize: 17,
            color: 'var(--color-deep-coal)',
            letterSpacing: '-0.01em',
          }}
        >
          Cafés · Salons · Barbers · Dentists · Gyms · Bakeries
        </span>
      </div>
    </div>
  )
}
