"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

import { cn } from "@/lib/utils"

import { bentoContainerVariants } from "./bento-motion"

type BentoGridProps = {
  children: ReactNode
  className?: string
}

/**
 * Bento shell: CSS Grid only, single column and auto rows on small screens, 12 columns on large.
 * Staggered in-view reveals use GPU-friendly opacity and translate only (see bento-motion).
 */
export function BentoGrid({ children, className }: BentoGridProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <motion.div
      ref={ref}
      className={cn(
        "grid w-full min-w-0 grid-cols-1 auto-rows-min grid-flow-row content-start items-stretch gap-4 lg:grid-cols-12 lg:gap-6",
        className
      )}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={bentoContainerVariants}
    >
      {children}
    </motion.div>
  )
}
