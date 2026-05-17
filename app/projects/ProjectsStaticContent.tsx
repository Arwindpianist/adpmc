import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import ImpactCaseStudyCard from "@/components/ImpactCaseStudyCard"
import { Button } from "@/components/ui/button"
import { inHouseProducts } from "@/lib/product-urls"
import { featuredImpactCaseStudies } from "@/lib/site-seo"

export default function ProjectsStaticContent() {
  return (
    <>
      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-18" aria-labelledby="projects-page-heading">
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10">
            <p className="section-kicker">Case Studies in Infrastructure</p>
            <h1
              id="projects-page-heading"
              className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-heading sm:text-5xl lg:text-6xl"
            >
              Evidence of deployed systems: live endpoints, product control planes, and source-backed delivery.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
              This page combines published case studies, automated live-deployment detection, and gated repository
              access so technical and procurement stakeholders can review outcomes and implementation depth.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild>
                <Link href={inHouseProducts.myceliumlink.url} target="_blank" rel="noopener noreferrer">
                  Explore MyceliumLink
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/platforms">In-house platforms</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/contact">Discuss a similar build</Link>
              </Button>
            </div>
          </div>

          <div className="surface-card-soft rounded-[2.5rem] p-6 sm:p-8">
            <p className="section-kicker">Featured product</p>
            <h2 className="mt-4 text-2xl font-semibold text-heading sm:text-3xl">MyceliumLink</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
              Our in-house platform for decentralized data connectivity and modern network-oriented workflows, designed
              to bring software structure to messy operational environments.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8" aria-labelledby="impact-case-studies-heading">
        <div className="mx-auto w-full max-w-7xl">
          <h2
            id="impact-case-studies-heading"
            className="text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl"
          >
            Impact case studies
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
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
