"use client"

import { useEffect, useState, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

import { cn } from "@/lib/utils"

type MagneticButtonProps = {
  children: ReactNode
  className?: string
  intensity?: number
}

const mq = "(min-width: 768px)"

export default function MagneticButton({
  children,
  className,
  intensity = 18,
}: MagneticButtonProps) {
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const m = window.matchMedia(mq)
    const apply = () => setDesktop(m.matches)
    apply()
    m.addEventListener("change", apply)
    return () => m.removeEventListener("change", apply)
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)

  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 1 })
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 1 })
  const springScale = useSpring(scale, { stiffness: 300, damping: 30, mass: 1 })

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!desktop) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const offsetX = event.clientX - bounds.left - bounds.width / 2
    const offsetY = event.clientY - bounds.top - bounds.height / 2

    x.set((offsetX / bounds.width) * intensity)
    y.set((offsetY / bounds.height) * intensity)
    scale.set(1.02)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
    scale.set(1)
  }

  if (!desktop) {
    return <div className={cn("inline-flex", className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn("inline-flex will-change-transform [transform:translate3d(0,0,0)]", className)}
      style={{ x: springX, y: springY, scale: springScale }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </motion.div>
  )
}
