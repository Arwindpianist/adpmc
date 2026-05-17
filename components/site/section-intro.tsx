import { cn } from "@/lib/utils"

type SectionIntroProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionIntroProps) {
  return (
    <div className={cn("space-y-4", align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] text-zinc-50 sm:text-4xl lg:text-5xl">{title}</h2>
        {description ? (
          <p className="max-w-3xl text-base leading-relaxed text-[#c9b8e8]/90 sm:text-lg">{description}</p>
        ) : null}
      </div>
    </div>
  )
}
