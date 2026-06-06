import Link from 'next/link'
import { ReactNode, CSSProperties } from 'react'

type Variant = 'fill' | 'ink' | 'outline' | 'outline-dark'

interface ButtonProps {
  variant?: Variant
  href?: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

const base: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontFamily: 'var(--font-inter-var), ui-sans-serif, system-ui, sans-serif',
  fontSize: 15,
  fontWeight: 500,
  borderRadius: 999,
  padding: '11px 22px',
  cursor: 'pointer',
  textDecoration: 'none',
  border: '1px solid transparent',
  transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
  lineHeight: 1,
  whiteSpace: 'nowrap',
}

const styles: Record<Variant, CSSProperties> = {
  fill: {
    background: '#B0894F',
    color: '#14271C',
    borderColor: 'transparent',
  },
  ink: {
    background: '#B0894F',
    color: '#14271C',
    borderColor: 'transparent',
    padding: '13px 26px',
  },
  outline: {
    background: 'transparent',
    color: 'var(--color-deep-coal)',
    borderColor: 'var(--color-fog)',
  },
  'outline-dark': {
    background: 'transparent',
    color: 'var(--color-bone-white)',
    borderColor: 'rgba(244,241,233,0.45)',
  },
}

export function Button({ variant = 'fill', href, children, onClick }: ButtonProps) {
  const style: CSSProperties = { ...base, ...styles[variant] }

  if (href) {
    return (
      <Link href={href} style={style}>
        {children}
      </Link>
    )
  }
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  )
}
