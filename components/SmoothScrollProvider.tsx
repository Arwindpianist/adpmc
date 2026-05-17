"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"

const mq = "(min-width: 768px)"

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return

    let lenis: Lenis | null = null

    const start = () => {
      if (!window.matchMedia(mq).matches) {
        lenis?.destroy()
        lenis = null
        return
      }
      if (lenis) return
      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.085,
      })
    }

    const m = window.matchMedia(mq)
    start()
    m.addEventListener("change", start)

    return () => {
      m.removeEventListener("change", start)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return <>{children}</>
}
