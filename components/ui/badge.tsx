import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors",
  {
    variants: {
      variant: {
        default: "border-[rgba(189,147,249,0.2)] bg-dracula-purple/12 text-dracula-purple",
        secondary: "border-[rgba(189,147,249,0.15)] bg-transparent text-[#c9b8e8]",
        success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { badgeVariants }
