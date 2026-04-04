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
      className="glassmorphism p-6 md:p-8 rounded-xl border border-teal-400/25 h-full flex flex-col scroll-mt-24"
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="text-xl md:text-2xl font-bold text-teal-400 mb-3">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-300 mb-6 flex-1 leading-relaxed">{description}</p>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Success metrics</h4>
        <ul className="space-y-3 list-none pl-0">
          {keyResults.map((line) => (
            <li key={line} className="text-sm md:text-base text-gray-300 leading-snug">
              <strong className="font-semibold text-gray-100">{line}</strong>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-gray-500 leading-relaxed border-t border-white/[0.06] pt-4">
          <span className="font-medium text-gray-400">Context: </span>
          {metricsContext}{" "}
          <a href={sourceUrl} className="text-teal-400 hover:text-teal-300 underline underline-offset-2 break-all">
            Reference
          </a>
          .
        </p>
      </div>
    </article>
  )
}
