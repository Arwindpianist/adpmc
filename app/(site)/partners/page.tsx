import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { SectionIntro } from "@/components/site/section-intro"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  getAlphabeticalPartnerIndex,
  partnerAuthorizationPrograms,
  partnerEcosystemGroups,
  partnerEcosystemPartnerCount,
} from "@/lib/partner-ecosystem"

const alphabeticalIndex = getAlphabeticalPartnerIndex()

export default function PartnersPage() {
  return (
    <div className="px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
      <div className="mx-auto w-full max-w-7xl space-y-12">
        <section className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10">
          <SectionIntro
            eyebrow="Partners and ecosystem"
            title="Trusted vendors, modern platforms, and delivery systems we actually build with."
            description={`Browse ${partnerEcosystemPartnerCount} partners and platforms across authorized programs, infrastructure, cloud, surveillance, in-house products, and creative technology. We select the right stack for your constraint — then integrate it cleanly.`}
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild>
              <Link href="/contact">
                Ask about vendor fit
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/services">Operational capabilities hub</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#partner-index">Jump to full index</Link>
            </Button>
          </div>
        </section>

        <section className="surface-card-soft rounded-[2rem] px-6 py-7 sm:px-8" aria-labelledby="authorized-programs-heading">
          <h2 id="authorized-programs-heading" className="text-xl font-semibold tracking-[-0.03em] text-heading sm:text-2xl">
            Certified and authorized programs
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
            Formal designations for procurement review. Additional vendors below are integrated where programs, warranties,
            or architecture fit — not as a forced single-vendor stack.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {partnerAuthorizationPrograms.map((program) => (
              <Badge
                key={program}
                className="border-[rgba(189,147,249,0.25)] bg-dracula-purple/10 normal-case tracking-[0.06em] text-dracula-purple"
              >
                {program}
              </Badge>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2" aria-labelledby="partner-groups-heading">
          <h2 id="partner-groups-heading" className="sr-only">
            Partner groups by category
          </h2>
          {partnerEcosystemGroups.map((group) => (
            <article key={group.id} className="surface-card-soft rounded-[2rem] p-6">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-heading sm:text-2xl">{group.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{group.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} variant="secondary" className="normal-case tracking-[0.08em]">
                    {item}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section
          id="partner-index"
          className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8 scroll-mt-28"
          aria-labelledby="complete-index-heading"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Complete index</p>
              <h2 id="complete-index-heading" className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-heading sm:text-3xl">
                All {partnerEcosystemPartnerCount} partners and platforms
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                Alphabetical reference of every vendor, platform, and in-house product listed on this page. For lane-specific
                alignment, see MSP, networking, security, platforms, GenAI, or creative capability pages.
              </p>
            </div>
            <p className="text-sm font-medium text-dracula-purple/90">
              {partnerEcosystemGroups.length} categories
            </p>
          </div>
          <ul className="mt-8 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
            {alphabeticalIndex.map((name) => (
              <li key={name} className="mb-2 break-inside-avoid text-sm text-zinc-200">
                {name}
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <p className="section-kicker">How we use partnerships</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl">
                Partnerships are a delivery accelerant, not a sales script.
              </h2>
              <p className="mt-4 text-base leading-8 text-zinc-400">
                We use partner programs to improve sourcing, support, and architecture quality. We do not treat them as a
                reason to over-prescribe one vendor when the work calls for a different mix.
              </p>
            </div>
            <div className="grid gap-4">
              <article className="surface-card-soft rounded-[2rem] p-6">
                <p className="text-sm text-zinc-500">Procurement model</p>
                <p className="mt-3 text-lg font-medium text-white">Authorized where it matters, flexible where it helps.</p>
              </article>
              <article className="surface-card-soft rounded-[2rem] p-6">
                <p className="text-sm text-zinc-500">Delivery model</p>
                <p className="mt-3 text-lg font-medium text-white">
                  Software, systems, and support aligned under one execution path.
                </p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
