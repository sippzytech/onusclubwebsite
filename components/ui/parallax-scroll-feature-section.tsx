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

  const opacity   = useTransform(scrollYProgress, [0, 0.65], [0, 1])
  const clipPath  = useTransform(scrollYProgress, [0, 0.65], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
  const y         = useTransform(scrollYProgress, [0, 1], [-40, 0])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(48px, 7vw, 100px)',
        flexDirection: section.reverse ? 'row-reverse' : 'row',
        padding: '60px 24px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
      className="feat-row"
    >
      {/* Copy */}
      <motion.div style={{ y }} className="feat-copy">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span
            className="font-serif"
            style={{
              fontSize: 15,
              color: '#B0894F',
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}
          >
            {section.num}
          </span>
          <div style={{ width: 32, height: 1, background: 'rgba(176,137,79,0.5)' }} />
        </div>

        <h3
          className="font-serif"
          style={{
            fontSize: 'clamp(36px, 4.5vw, 58px)',
            lineHeight: 1.08,
            letterSpacing: '-0.022em',
            fontWeight: 400,
            color: 'var(--color-deep-coal)',
            maxWidth: 420,
            marginBottom: 14,
          }}
        >
          {section.title}
        </h3>

        <p
          style={{
            fontSize: 14,
            color: '#B0894F',
            fontWeight: 600,
            letterSpacing: '0.01em',
            marginBottom: 20,
          }}
        >
          {section.sub}
        </p>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.72,
            color: 'var(--color-stone)',
            maxWidth: 440,
          }}
        >
          {section.description}
        </p>
      </motion.div>

      {/* Image */}
      <motion.div
        style={{ opacity, clipPath }}
        className="feat-img-wrap"
      >
        <div
          style={{
            position: 'relative',
            width: 'clamp(500px, 58vw, 860px)',
            height: 'clamp(500px, 58vw, 860px)',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.12)',
            background: '#f5f2eb',
          }}
        >
          <Image
            src={section.imageUrl}
            alt={section.title}
            fill
            sizes="(max-width: 900px) 95vw, 860px"
            style={{ objectFit: 'contain', padding: 16 }}
          />
        </div>
      </motion.div>
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
