"use client"

import type React from "react"
import { motion } from "framer-motion"

export function ShimmerText({
  children,
  delay = 0,
}: {
  children: string
  delay?: number
}) {
  return (
    /*
     * Outer span: inline-block so overflow:hidden clips correctly,
     * position:relative so the absolute shimmer layer is contained inside it.
     */
    <span style={{ position: 'relative', display: 'inline-block', overflow: 'hidden' }}>

      {/* Base text — always visible, inherits all h1 styles */}
      {children}

      {/*
       * Shimmer layer: same text, same size (inset:0), but filled with a
       * transparent→white→transparent gradient via background-clip:text.
       * Translates from -110% to +110% so the gleam sweeps left → right
       * and is hidden by overflow:hidden when outside the span bounds.
       */}
      <motion.span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          WebkitTextFillColor: 'transparent',
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 10%, rgba(255,255,255,0.92) 50%, rgba(255,255,255,0) 90%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          whiteSpace: 'nowrap',
        } as React.CSSProperties}
        initial={{ x: '-110%' }}
        animate={{ x: '110%' }}
        transition={{
          duration: 1.3,
          delay,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 3.5,
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default ShimmerText
