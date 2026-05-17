import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "gpu-layer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[transform,background-color,color,border-color,box-shadow,opacity] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.985] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "min-h-11 border border-[rgba(189,147,249,0.2)] bg-dracula-purple text-primary-foreground shadow-[0_20px_60px_rgba(189,147,249,0.35)] hover:bg-[#d4b5ff] hover:shadow-[0_24px_72px_rgba(189,147,249,0.45)]",
        destructive:
          "min-h-11 bg-destructive text-destructive-foreground shadow-[0_16px_40px_rgba(128,24,24,0.32)] hover:bg-destructive/90",
        outline:
          "min-h-11 border border-[rgba(189,147,249,0.15)] bg-[#0a0a0a] text-zinc-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-[border-color] duration-150 hover:border-[rgba(189,147,249,0.45)] hover:bg-[#0f0f0f]",
        secondary:
          "min-h-11 border border-[rgba(189,147,249,0.15)] bg-[#0a0a0a] text-[#e9ddff] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-[border-color] duration-150 hover:border-[rgba(189,147,249,0.4)] hover:bg-[#0f0f0f]",
        ghost: "min-h-11 text-foreground hover:bg-dracula-purple/10 hover:text-dracula-purple",
        link: "min-h-11 text-dracula-purple underline-offset-4 hover:text-dracula-pink hover:underline",
      },
      size: {
        default: "h-11 min-h-11 px-5",
        sm: "h-11 min-h-11 px-4 text-xs",
        lg: "h-12 min-h-12 px-6 text-sm",
        icon: "h-11 min-h-11 w-11 min-w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
