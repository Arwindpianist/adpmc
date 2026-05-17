"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { bentoItemVariants } from "./bento-motion"

type BentoCellProps = {
  children: ReactNode
  /** Tailwind column span classes, e.g. `col-span-full lg:col-span-8` */
  colClassName: string
  className?: string
  cardClassName?: string
}

/**
 * One bento tile: grid placement on the outer motion wrapper, inner Card uses CSS Grid rows for stable stacking.
 */
export function BentoCell({ children, colClassName, className, cardClassName }: BentoCellProps) {
  return (
    <motion.div
      variants={bentoItemVariants}
      style={{ transform: "translateZ(0)" }}
      className={cn("min-w-0 will-change-[opacity,transform]", colClassName, className)}
    >
      <Card
        className={cn(
          "dracula-bento-card grid h-full min-h-0 min-w-0 grid-rows-1 rounded-2xl shadow-none backdrop-blur-xl",
          cardClassName
        )}
      >
        <div className="min-h-0 min-w-0">{children}</div>
      </Card>
    </motion.div>
  )
}
