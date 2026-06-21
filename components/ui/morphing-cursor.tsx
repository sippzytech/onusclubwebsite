"use client"

import type React from "react"
import { useRef, useState, useCallback, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MagneticTextProps {
  text: string
  hoverText?: string
  className?: string
  circleColor?: string
  revealTextColor?: string
  circleSize?: number
}

export function MagneticText({
  text,
  hoverText,
  className,
  circleColor = "#F4F1E9",
  revealTextColor = "#0d1c13",
  circleSize = 160,
}: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const innerTextRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.14)
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.14)

      if (circleRef.current) {
        circleRef.current.style.transform =
          `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`
      }
      if (innerTextRef.current) {
        innerTextRef.current.style.transform =
          `translate(${-currentPos.current.x}px, ${-currentPos.current.y}px)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    mousePos.current = { x: e.clientX - r.left, y: e.clientY - r.top }
  }, [])

  const onEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    mousePos.current = { x, y }
    currentPos.current = { x, y }
    setIsHovered(true)
  }, [])

  const onLeave = useCallback(() => setIsHovered(false), [])

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        "relative flex items-center justify-end cursor-none select-none w-full",
        className
      )}
    >
      {/* Base text — inherits all typography from parent */}
      <span style={{ fontSize: "inherit", fontWeight: "inherit", letterSpacing: "inherit", lineHeight: "inherit" }}>
        {text}
      </span>

      {/* Morphing circle */}
      <div
        ref={circleRef}
        className="absolute top-0 left-0 pointer-events-none rounded-full overflow-hidden"
        style={{
          width: isHovered ? circleSize : 0,
          height: isHovered ? circleSize : 0,
          backgroundColor: circleColor,
          transition: "width 0.45s cubic-bezier(0.33,1,0.68,1), height 0.45s cubic-bezier(0.33,1,0.68,1)",
          willChange: "transform, width, height",
        }}
      >
        {/* Counter-translated text layer — always aligned with base text */}
        <div
          ref={innerTextRef}
          className="absolute flex items-center justify-end"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            top: "50%",
            left: "50%",
            willChange: "transform",
          }}
        >
          <span
            style={{
              fontSize: "inherit",
              fontWeight: "inherit",
              letterSpacing: "inherit",
              lineHeight: "inherit",
              color: revealTextColor,
              whiteSpace: "nowrap",
            }}
          >
            {hoverText ?? text}
          </span>
        </div>
      </div>
    </div>
  )
}
