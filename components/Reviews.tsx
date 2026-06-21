'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { TimelineContent } from '@/components/ui/timeline-animation'

const revealVariants = {
  visible: (i: number) => ({
    y: 0, opacity: 1, filter: 'blur(0px)',
    transition: { delay: i * 0.12, duration: 0.5 },
  }),
  hidden: { filter: 'blur(6px)', y: 24, opacity: 0 },
}

const REVIEWS = [
  {
    q: 'We saw a 40% jump in repeat visits within the first month. Customers actually pull out their phone and show the card — it feels premium.',
    name: 'Sophie van den Berg',
    role: 'Owner, Bloom Coffee',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  },
  {
    q: 'Setup took me four minutes. My regulars were scanning it before I even finished my coffee.',
    name: 'Daan Visser',
    role: 'Owner, Visser Barbers',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    q: "No more paper cards getting lost. My clients have their stamp card next to their bank card. That is exactly where I want to be.",
    name: 'Amara Osei',
    role: 'Owner, Glow Salon',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
  },
  {
    q: "The wallet push notifications are the killer feature. Customers who haven't visited in two weeks get a nudge and they come back.",
    name: 'Lars Hendriks',
    role: 'Manager, IronHouse Gym',
    img: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=200&h=200&fit=crop&crop=face',
  },
  {
    q: 'Our patients comment on how smooth it is. One scan, card in wallet, done. No app, no confusion.',
    name: 'Dr. Noor Khalil',
    role: 'Principal, Khalil Dental',
    img: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=200&h=200&fit=crop&crop=face',
  },
  {
    q: "I tried two other loyalty apps before OnUsClub. Nothing comes close to the simplicity. My staff needed zero training.",
    name: 'Marco de Wit',
    role: 'Owner, Verde Juice Bar',
    img: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=200&h=200&fit=crop&crop=face',
  },
]

// Card colour themes per position
const THEMES = [
  { bg: '#14271C', text: '#F4F1E9', sub: 'rgba(244,241,233,0.45)', border: 'none' },
  { bg: '#F4F1E9', text: '#14271C', sub: 'rgba(20,39,28,0.45)',    border: '1px solid rgba(20,39,28,0.12)' },
  { bg: '#B0894F', text: '#14271C', sub: 'rgba(20,39,28,0.55)',    border: 'none' },
  { bg: '#14271C', text: '#F4F1E9', sub: 'rgba(244,241,233,0.45)', border: 'none' },
  { bg: '#F4F1E9', text: '#14271C', sub: 'rgba(20,39,28,0.45)',    border: '1px solid rgba(20,39,28,0.12)' },
  { bg: '#B0894F', text: '#14271C', sub: 'rgba(20,39,28,0.55)',    border: 'none' },
]

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section ref={sectionRef} id="reviews" style={{ background: '#F4F1E9', padding: '100px 6vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <TimelineContent as="p" animationNum={0} timelineRef={sectionRef}
            className="font-[var(--font-lato)]"
            style={{
              fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#B0894F', marginBottom: 20,
            } as React.CSSProperties}
          >
            What businesses say
          </TimelineContent>

          <TimelineContent as="h2" animationNum={1} timelineRef={sectionRef}
            style={{
              fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
              fontSize: 'clamp(32px, 4.5vw, 60px)',
              fontWeight: 900, letterSpacing: '-0.03em',
              lineHeight: 1.05, textTransform: 'uppercase',
              color: '#14271C', margin: '0 auto 20px',
            } as React.CSSProperties}
          >
            Real results from real businesses.
          </TimelineContent>

          <TimelineContent as="p" animationNum={2} timelineRef={sectionRef}
            style={{
              fontSize: 15, color: '#6e7860',
              lineHeight: 1.75, maxWidth: 420, margin: '0 auto',
            } as React.CSSProperties}
          >
            Local businesses across the Netherlands share what changed after switching to wallet loyalty.
          </TimelineContent>
        </div>

        {/* ── Bento grid ──────────────────────────────────────────── */}
        <div className="rev-grid">
          {/* Column 1 */}
          <div className="rev-col">
            <ReviewCard review={REVIEWS[0]} theme={THEMES[0]} animNum={0} sectionRef={sectionRef} large />
            <ReviewCard review={REVIEWS[1]} theme={THEMES[1]} animNum={1} sectionRef={sectionRef} />
          </div>

          {/* Column 2 */}
          <div className="rev-col">
            <ReviewCard review={REVIEWS[2]} theme={THEMES[2]} animNum={2} sectionRef={sectionRef} />
            <ReviewCard review={REVIEWS[3]} theme={THEMES[3]} animNum={3} sectionRef={sectionRef} />
          </div>

          {/* Column 3 */}
          <div className="rev-col">
            <ReviewCard review={REVIEWS[4]} theme={THEMES[4]} animNum={4} sectionRef={sectionRef} />
            <ReviewCard review={REVIEWS[5]} theme={THEMES[5]} animNum={5} sectionRef={sectionRef} large />
          </div>
        </div>

      </div>

      <style>{`
        .rev-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: start;
        }
        .rev-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (max-width: 860px) {
          .rev-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

function ReviewCard({
  review, theme, animNum, sectionRef, large = false,
}: {
  review: typeof REVIEWS[0]
  theme: typeof THEMES[0]
  animNum: number
  sectionRef: React.RefObject<HTMLElement | null>
  large?: boolean
}) {
  return (
    <TimelineContent
      animationNum={animNum}
      customVariants={revealVariants}
      timelineRef={sectionRef}
      style={{
        background: theme.bg,
        border: theme.border || 'none',
        borderRadius: 0,
        padding: large ? 'clamp(28px, 3vw, 40px)' : 'clamp(24px, 2.5vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: large ? 260 : 200,
      } as React.CSSProperties}
    >
      {/* Quote */}
      <p style={{
        fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
        fontSize: large ? 15 : 14,
        lineHeight: 1.72,
        color: theme.text,
        flex: 1,
        marginBottom: 24,
      }}>
        "{review.q}"
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif',
            fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 2,
          }}>
            {review.name}
          </p>
          <p style={{ fontSize: 12, color: theme.sub }}>
            {review.role}
          </p>
        </div>
        <Image
          src={review.img}
          alt={review.name}
          width={48}
          height={48}
          style={{ borderRadius: 0, objectFit: 'cover', width: 48, height: 48, flexShrink: 0 }}
        />
      </div>
    </TimelineContent>
  )
}
