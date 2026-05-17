import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "gpu-layer flex h-12 min-h-11 w-full rounded-2xl border border-[rgba(189,147,249,0.15)] bg-[#0a0a0a] px-4 py-3 text-sm text-zinc-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_32px_rgba(189,147,249,0.06)] backdrop-blur-xl transition-[border-color,box-shadow] duration-150 placeholder:text-[#c9b8e8]/70 focus-visible:border-[rgba(189,147,249,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dracula-purple/40 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
