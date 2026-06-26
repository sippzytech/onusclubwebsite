"use client"

import React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const STAGGER = 0.04

export default function TextRoll({
  children,
  className,
  center = false,
}: {
  children: string
  className?: string
  center?: boolean
}) {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block", className)}
      style={{ lineHeight: 1, overflow: 'hidden' }}
    >
      {/* Top row — slides up on hover */}
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i
          return (
            <motion.span
              key={i}
              initial={{ y: 0 }}
              variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
              transition={{ ease: "easeInOut", delay, duration: 0.4 }}
              className="inline-block"
            >
              {l === " " ? " " : l}
            </motion.span>
          )
        })}
      </div>

      {/* Bottom row — hidden below until hover; explicit initial keeps it in SSR HTML */}
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i
          return (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
              transition={{ ease: "easeInOut", delay, duration: 0.4 }}
              className="inline-block"
            >
              {l === " " ? " " : l}
            </motion.span>
          )
        })}
      </div>
    </motion.span>
  )
}
