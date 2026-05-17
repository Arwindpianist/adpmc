"use client"

import { motion } from "framer-motion"

type TypographicRevealProps = {
  lines: string[]
  className?: string
}

const lineVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(12px)" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      delay: 0.16 * index,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function TypographicReveal({ lines, className }: TypographicRevealProps) {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <div key={line} className="overflow-hidden">
          <motion.span
            custom={index}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="text-balance block"
          >
            {line}
          </motion.span>
        </div>
      ))}
    </div>
  )
}
