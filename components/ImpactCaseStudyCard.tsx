type ImpactCaseStudyCardProps = {
  title: string
  description: string
  keyResults: readonly string[]
  /** Stable id for heading + aria */
  anchorId: string
}

export default function ImpactCaseStudyCard({
  title,
  description,
  keyResults,
  anchorId,
}: ImpactCaseStudyCardProps) {
  const headingId = `${anchorId}-heading`
  return (
    <article
      className="glassmorphism p-6 md:p-8 rounded-xl border border-teal-400/25 h-full flex flex-col"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="text-xl md:text-2xl font-bold text-teal-400 mb-3">
        {title}
      </h2>
      <p className="text-sm md:text-base text-gray-300 mb-6 flex-1 leading-relaxed">{description}</p>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-3">Key results</h3>
        <ul className="space-y-3 list-none pl-0">
          {keyResults.map((line) => (
            <li key={line} className="text-sm md:text-base text-gray-300 leading-snug">
              <strong className="font-semibold text-gray-100">{line}</strong>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
