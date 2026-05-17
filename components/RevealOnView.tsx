"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

type RevealOnViewProps = {
  children: ReactNode
  className?: string
  delayMs?: number
  once?: boolean
}

export default function RevealOnView({
  children,
  className,
  delayMs = 0,
  once = true,
}: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn("reveal-on-view", isVisible && "is-visible", className)}
    >
      {children}
    </div>
  )
}
