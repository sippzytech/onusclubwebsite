"use client"
import { motion, useInView } from "motion/react"
import { useRef, type ElementType, type RefObject, type CSSProperties } from "react"

interface TimelineContentProps {
  as?: ElementType
  animationNum?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customVariants?: any
  timelineRef?: RefObject<Element | null>
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}

export function TimelineContent({
  as = 'div',
  animationNum = 0,
  customVariants,
  timelineRef,
  children,
  className,
  style,
}: TimelineContentProps) {
  const ownRef = useRef<Element>(null)
  const watchRef = (timelineRef ?? ownRef) as RefObject<Element>
  const isInView = useInView(watchRef, { once: true, margin: '-5% 0px' })

  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
    }),
  }

  const variants = customVariants ?? defaultVariants
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = (motion as any)[as as string] ?? motion.div

  return (
    <MotionTag
      ref={ownRef}
      className={className}
      style={style}
      variants={variants}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </MotionTag>
  )
}
