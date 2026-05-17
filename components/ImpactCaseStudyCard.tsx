type ImpactCaseStudyCardProps = {
  title: string
  description: string
  keyResults: readonly string[]
  /** Stable id for heading + aria + fragment links */
  anchorId: string
  metricsContext: string
  sourceUrl: string
}

export default function ImpactCaseStudyCard({
  title,
  description,
  keyResults,
  anchorId,
  metricsContext,
  sourceUrl,
}: ImpactCaseStudyCardProps) {
  const headingId = `${anchorId}-heading`
  return (
    <article
      id={anchorId}
      className="surface-card-soft flex h-full scroll-mt-24 flex-col rounded-[2rem] p-6 sm:p-8"
      aria-labelledby={headingId}
    >
      <p className="section-kicker">Impact story</p>
      <h3 id={headingId} className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-heading sm:text-3xl">
        {title}
      </h3>
      <p className="mb-6 mt-4 flex-1 text-sm leading-7 text-zinc-400 sm:text-base">{description}</p>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">Success metrics</h4>
        <ul className="space-y-3 list-none pl-0">
          {keyResults.map((line) => (
            <li key={line} className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-zinc-200 sm:text-base">
              <strong className="font-semibold text-white">{line}</strong>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-white/8 pt-5 text-xs leading-6 text-zinc-500">
          <span className="font-medium text-zinc-400">Context: </span>
          {metricsContext}{" "}
          <a href={sourceUrl} className="break-all text-zinc-300 underline underline-offset-2 transition hover:text-white">
            Reference
          </a>
          .
        </p>
      </div>
    </article>
  )
}
