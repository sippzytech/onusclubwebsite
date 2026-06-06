'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export interface FeatureSectionData {
  num: string
  title: string
  sub: string
  description: string
  imageUrl: string
  reverse: boolean
}

interface Props {
  sections: FeatureSectionData[]
}

function SectionItem({ section }: { section: FeatureSectionData }) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  })

  const opacity  = useTransform(scrollYProgress, [0, 0.65], [0, 1])
  const clipPath = useTransform(scrollYProgress, [0, 0.65], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
  const y        = useTransform(scrollYProgress, [0, 1], [-40, 0])

  return (
    <div ref={ref} className={`feat-row ${section.reverse ? 'feat-row--reverse' : ''}`}>
      {/* Copy */}
      <motion.div style={{ y }} className="feat-copy">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span
            className="font-serif"
            style={{ fontSize: 15, color: '#B0894F', fontWeight: 600, letterSpacing: '0.08em' }}
          >
            {section.num}
          </span>
          <div style={{ width: 32, height: 1, background: 'rgba(176,137,79,0.5)' }} />
        </div>

        <h3
          className="font-serif"
          style={{
            fontSize: 'clamp(30px, 4.5vw, 58px)',
            lineHeight: 1.08,
            letterSpacing: '-0.022em',
            fontWeight: 400,
            color: 'var(--color-deep-coal)',
            marginBottom: 14,
          }}
        >
          {section.title}
        </h3>

        <p style={{ fontSize: 14, color: '#B0894F', fontWeight: 600, letterSpacing: '0.01em', marginBottom: 20 }}>
          {section.sub}
        </p>

        <p style={{ fontSize: 16, lineHeight: 1.72, color: 'var(--color-stone)' }}>
          {section.description}
        </p>
      </motion.div>

      {/* Image */}
      <motion.div style={{ opacity, clipPath }} className="feat-img-wrap">
        <div className="feat-img-box">
          <Image
            src={section.imageUrl}
            alt={section.title}
            fill
            sizes="(max-width: 700px) 92vw, (max-width: 1100px) 55vw, 700px"
            style={{ objectFit: 'contain', padding: 16 }}
          />
        </div>
      </motion.div>

      <style>{`
        .feat-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(32px, 6vw, 100px);
          flex-direction: row;
          padding: 60px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .feat-row--reverse {
          flex-direction: row-reverse;
        }
        .feat-copy {
          flex: 1 1 340px;
          min-width: 0;
        }
        .feat-img-wrap {
          flex: 1 1 420px;
          min-width: 0;
        }
        .feat-img-box {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-width: 700px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.12);
          background: #f5f2eb;
        }
        @media (max-width: 700px) {
          .feat-row,
          .feat-row--reverse {
            flex-direction: column !important;
            padding: 40px 20px;
            gap: 28px;
          }
          .feat-copy {
            flex: none;
            width: 100%;
          }
          .feat-img-wrap {
            flex: none;
            width: 100%;
          }
          .feat-img-box {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export function ParallaxFeatureSection({ sections }: Props) {
  return (
    <div style={{ paddingTop: 40 }}>
      {sections.map((section, i) => (
        <SectionItem key={i} section={section} />
      ))}
    </div>
  )
}
