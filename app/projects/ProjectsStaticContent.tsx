import ImpactCaseStudyCard from "@/components/ImpactCaseStudyCard"
import { featuredImpactCaseStudies } from "@/lib/site-seo"

/**
 * Server-rendered static portfolio narrative (MyceliumLink + impact cases) for first HTML / crawlers.
 */
export default function ProjectsStaticContent() {
  return (
    <>
      <section className="pt-32 pb-16 sm:pb-24" aria-labelledby="projects-page-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 id="projects-page-heading" className="sr-only">
            Projects &amp; Portfolio
          </h1>
          <article
            className="glassmorphism p-8 rounded-lg max-w-4xl mx-auto border-2 border-teal-400/50"
            aria-labelledby="myceliumlink-feature-heading"
          >
            <div className="text-center mb-6">
              <h2 id="myceliumlink-feature-heading" className="text-3xl md:text-4xl font-bold mb-3 text-teal-400">
                Featured Product: MyceliumLink
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                MyceliumLink is our proprietary in-house software platform for decentralized data connectivity and modern
                network solutions.
              </p>
              <a
                href="https://myceliumlink.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn-primary bg-teal-500 hover:bg-teal-600"
              >
                Explore MyceliumLink
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="pb-16 sm:pb-20" aria-labelledby="impact-case-studies-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="impact-case-studies-heading" className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Impact case studies
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {featuredImpactCaseStudies.map((study) => (
              <ImpactCaseStudyCard
                key={study.anchorId}
                anchorId={study.anchorId}
                title={study.title}
                description={study.description}
                keyResults={study.keyResults}
                metricsContext={study.metricsContext}
                sourceUrl={study.sourceUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
