'use client'

import Marquee from '@/components/ui/text-marque'

export default function MarqueeStrip() {
  return (
    <section style={{
      background: '#F4F1E9',
      paddingTop: '48px',
      paddingBottom: '48px',
      overflow: 'hidden',
      borderTop: '1px solid rgba(20,39,28,0.07)',
      borderBottom: '1px solid rgba(20,39,28,0.07)',
    }}>
      <Marquee
        delay={300}
        baseVelocity={0.6}
        scrollDependent={true}
        clasname="font-black tracking-[-0.04em] leading-none uppercase text-[#14271C] text-[clamp(40px,5.5vw,88px)] select-none"
      >
        THE LOYALTY PLATFORM FOR LOCAL BUSINESSES &nbsp;·&nbsp; BUILT FOR CAFÉS · SALONS · BARBERS · DENTISTS · GYMS &nbsp;·&nbsp;
      </Marquee>
    </section>
  )
}
