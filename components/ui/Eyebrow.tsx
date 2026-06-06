import { CSSProperties, ReactNode } from 'react'

export function Eyebrow({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <p
      className={`text-[12px] font-medium tracking-[0.14em] uppercase ${className}`}
      style={{ color: 'var(--color-stone)', ...style }}
    >
      {children}
    </p>
  )
}
