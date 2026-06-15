import { ArrowRight } from "lucide-react"

import { BentoCell, BentoGrid } from "@/components/bento"
import { SectionIntro } from "@/components/site/section-intro"
import TransitionLink from "@/components/TransitionLink"

import {
  homePartnerEcosystemGroups,
  partnerEcosystemPartnerCount,
} from "@/lib/partner-ecosystem"

export default function Partnerships() {
  return (
    <section className="min-w-0 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="partnerships-heading">
      <div className="mx-auto w-full max-w-7xl min-w-0 space-y-8 lg:space-y-10">
        <div id="partnerships-heading">
          <SectionIntro
            eyebrow="Partner ecosystem"
            title="A curated stack of platforms, vendors, and operating systems."
            description={`We combine authorized sourcing with modern product tooling across ${partnerEcosystemPartnerCount}+ partners — so infrastructure programs and software delivery can live under one execution model.`}
          />
        </div>
        <BentoGrid>
            {homePartnerEcosystemGroups.map((group) => (
              <BentoCell key={group.id} colClassName="col-span-full lg:col-span-4">
                <div className="flex h-full flex-col p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-zinc-50 sm:text-2xl">{group.title}</h3>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[rgba(189,147,249,0.15)] bg-[#050208] px-4 py-2 text-sm text-[#e9ddff] transition-[border-color] duration-150 hover:border-[rgba(189,147,249,0.45)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </BentoCell>
            ))}
            <BentoCell colClassName="col-span-full lg:col-span-12">
              <div className="flex min-w-0 flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
                <div className="min-w-0 max-w-3xl">
                  <p className="section-kicker">Partnership design principle</p>
                  <p className="mt-3 text-base leading-relaxed text-[#c9b8e8]/90 sm:text-lg">
                    Use the right vendor for the right constraint, then integrate it cleanly so your team gets one calm
                    operating experience instead of five disconnected tools.
                  </p>
                </div>
                <TransitionLink
                  href="/partners"
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium text-dracula-purple transition hover:text-dracula-pink"
                >
                  Explore full partner index ({partnerEcosystemPartnerCount})
                  <ArrowRight className="h-4 w-4" />
                </TransitionLink>
              </div>
            </BentoCell>
        </BentoGrid>
      </div>
    </section>
  )
}
