"use client"

import { useEffect, useState, type CSSProperties, type HTMLAttributes, type PointerEvent, type ReactNode } from "react"

import { cn } from "@/lib/utils"

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

const mq = "(min-width: 768px)"

export default function SpotlightCard({
  children,
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: SpotlightCardProps) {
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const m = window.matchMedia(mq)
    const apply = () => setDesktop(m.matches)
    apply()
    m.addEventListener("change", apply)
    return () => m.removeEventListener("change", apply)
  }, [])

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!desktop) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    event.currentTarget.style.setProperty("--spotlight-x", `${x}px`)
    event.currentTarget.style.setProperty("--spotlight-y", `${y}px`)

    onPointerMove?.(event)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (!desktop) return
    event.currentTarget.style.setProperty("--spotlight-x", "50%")
    event.currentTarget.style.setProperty("--spotlight-y", "50%")

    onPointerLeave?.(event)
  }

  return (
    <div
      {...props}
      onPointerMove={desktop ? handlePointerMove : undefined}
      onPointerLeave={desktop ? handlePointerLeave : undefined}
      className={cn("spotlight-card", className)}
      style={
        {
          "--spotlight-x": "50%",
          "--spotlight-y": "50%",
          ...(props.style ?? {}),
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}
