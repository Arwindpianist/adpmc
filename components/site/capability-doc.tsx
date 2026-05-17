import Link from "next/link"
import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react"

import FAQ from "@/components/FAQ"
import ImpactCaseStudyCard from "@/components/ImpactCaseStudyCard"
import { SectionIntro } from "@/components/site/section-intro"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CapabilityPageContent } from "@/lib/capability-pages"
import { featuredImpactCaseStudies } from "@/lib/site-seo"

type CapabilityDocProps = {
  content: CapabilityPageContent & { title: string; description: string }
}

export default function CapabilityDocPage({ content }: CapabilityDocProps) {
  const caseStudies =
    content.caseStudyAnchors
      ?.map((id) => featuredImpactCaseStudies.find((s) => s.anchorId === id))
      .filter((s): s is (typeof featuredImpactCaseStudies)[number] => Boolean(s)) ?? []

  const heroDescription = `${content.description} ${content.heroIntro}`

  return (
    <div className="px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
      <div className="mx-auto w-full max-w-7xl space-y-12">
        <section className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10">
          <SectionIntro eyebrow={content.eyebrow} title={content.title} description={heroDescription} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">
                Request mobilization
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/services">Operational capabilities hub</Link>
            </Button>
          </div>
        </section>
        <section className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8">
          <SectionIntro
            eyebrow="Service lines"
            title="What we provision in this lane."
            description="Each offering maps to how we mobilize on the ground: scoped, documented, and aligned to procurement and operations."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.offerings.map((offering) => (
              <article key={offering.title} className="surface-card-soft rounded-[2rem] p-6">
                <h2 className="text-xl font-semibold tracking-[-0.03em] text-heading">{offering.title}</h2>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{offering.description}</p>
                {offering.tags && offering.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {offering.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="normal-case tracking-[0.08em]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8">
          <p className="section-kicker">Provisioned outcomes</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {content.outcomes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-7 text-zinc-400">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-dracula-purple" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {content.stack && content.stack.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-[rgba(189,147,249,0.12)] pt-8">
              {content.stack.map((item) => (
                <Badge key={item} variant="secondary" className="normal-case tracking-[0.08em]">
                  {item}
                </Badge>
              ))}
            </div>
          ) : null}
        </section>

        {content.flagships && content.flagships.length > 0 ? (
          <section className="space-y-6">
            <SectionIntro
              eyebrow="In-house platforms"
              title="Live products you can evaluate today."
              description="Each flagship is built and operated by Arwindpianist. Open the live surface for procurement and technical review."
            />
            <div className="grid gap-4 md:grid-cols-2">
              {content.flagships.map((flagship) => (
                <article
                  key={flagship.id}
                  id={flagship.id}
                  className="surface-card scroll-mt-24 rounded-[2rem] p-6 sm:p-8"
                >
                  {flagship.legacyAnchorId ? (
                    <span id={flagship.legacyAnchorId} className="sr-only" aria-hidden />
                  ) : null}
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-heading">{flagship.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-400">{flagship.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {flagship.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="normal-case tracking-[0.08em]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button asChild variant="secondary" size="sm">
                      <a href={flagship.url} target="_blank" rel="noopener noreferrer">
                        Visit live product
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/contact">Request mobilization</Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {content.deepSections && content.deepSections.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {content.deepSections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="surface-card-soft scroll-mt-24 rounded-[2rem] p-6 sm:p-8"
              >
                <h2 className="text-xl font-semibold text-heading">{section.title}</h2>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{section.body}</p>
              </article>
            ))}
          </div>
        ) : null}

        <section className="surface-card-soft rounded-[2.5rem] px-6 py-8 sm:px-8">
          <p className="section-kicker">Partner alignment</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">
            Authorized where it matters, flexible where it helps. Programs we commonly align in this lane:
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {content.partners.map((partner) => (
              <Badge key={partner} variant="secondary" className="normal-case tracking-[0.08em]">
                {partner}
              </Badge>
            ))}
          </div>
        </section>

        <section className="surface-card-soft rounded-[2.5rem] px-6 py-8 sm:px-8">
          <p className="section-kicker">Related capabilities</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {content.relatedRoutes.map((route) => (
              <Button key={route.href} asChild variant="secondary" size="sm">
                <Link href={route.href}>{route.label}</Link>
              </Button>
            ))}
          </div>
        </section>

        {caseStudies.length > 0 ? (
          <section className="space-y-6">
            <SectionIntro
              eyebrow="Case study evidence"
              title="Quantified outcomes from deployed programs."
              description="Figures describe program design targets and operational telemetry from referenced engagements, not independently audited third-party statistics."
            />
            <div className="grid gap-4 lg:grid-cols-2">
              {caseStudies.map((study) => (
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
          </section>
        ) : null}

        <FAQ
          items={content.faqItems}
          jsonLdPath={`${content.path}#knowledge-base`}
          heading="Lane knowledge base"
          id="knowledge-base"
        />

        <section className="surface-card-soft rounded-[2.5rem] px-6 py-8 sm:px-8">
          <p className="section-kicker">Evidence and partners</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">
            Validate OEM alignment on the partners page. Review published delivery evidence under Case Studies in
            Infrastructure.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="secondary">
              <Link href="/partners">
                Partner index
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/projects" title="Case Studies in Infrastructure">
                Case studies
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
