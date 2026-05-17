import Link from "next/link"
import { Clock3, ShieldCheck, Sparkles, TrendingUp } from "lucide-react"

import { BentoCell, BentoGrid } from "@/components/bento"
import { SectionIntro } from "@/components/site/section-intro"
import { Badge } from "@/components/ui/badge"
import { companyEstablishedDisplay, companyHeadquartersDisplay, companyRegistrationDisplay } from "@/lib/site-seo"

/** Verifiable facts with internal sources (E-E-A-T / citation-ready). */
const verifiableFacts = [
  {
    fact: "SSM registration",
    detail: companyRegistrationDisplay,
    sourceHref: "/about",
    sourceLabel: "About (company vitals)",
  },
  {
    fact: "Established",
    detail: companyEstablishedDisplay,
    sourceHref: "/about",
    sourceLabel: "About",
  },
  {
    fact: "Headquarters",
    detail: companyHeadquartersDisplay,
    sourceHref: "/about",
    sourceLabel: "About",
  },
  {
    fact: "MSP support posture",
    detail:
      "24/7 monitoring and response are offered within defined managed service agreements (scope varies by SOW).",
    sourceHref: "/services",
    sourceLabel: "Services",
  },
] as const

const partnerAuthorizations = [
  "Authorized Extreme Networks Partner",
  "Authorized Aruba Partner",
  "Authorized Huawei Partner",
  "Authorized IBM Partner",
  "Authorized Xero Partner",
] as const

const advantages = [
  {
    icon: <ShieldCheck className="h-5 w-5 text-dracula-purple" />,
    title: "Verified sourcing",
    description:
      "Partner-backed procurement, warranties, and integration context instead of generic reseller guesswork.",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-dracula-purple" />,
    title: "Modern delivery",
    description: "App Router, TypeScript, Supabase, Prisma, and cloud infrastructure shaped into practical systems.",
  },
  {
    icon: <Clock3 className="h-5 w-5 text-dracula-purple" />,
    title: "Operational continuity",
    description: "Architecture, deployment, and ongoing managed support live inside one operating model.",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-dracula-purple" />,
    title: "Higher leverage",
    description: "Teams get one partner for systems, software, support, and decision-making discipline.",
  },
] as const

export default function TrustSignals() {
  return (
    <section className="min-w-0 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="trust-signals-heading">
      <div className="mx-auto w-full max-w-7xl min-w-0 space-y-8 lg:space-y-10">
        <div id="trust-signals-heading">
          <SectionIntro
            eyebrow="Proof over posturing"
            title="Facts, source paths, and partnerships your team can actually verify."
            description="We deliberately publish machine-readable business facts, route-level metadata, and partner-backed delivery context instead of vague growth claims."
          />
        </div>
        <BentoGrid>
            <BentoCell colClassName="col-span-full lg:col-span-8">
              <div className="min-w-0 overflow-hidden">
                <div className="grid grid-cols-1 gap-2 border-b border-[rgba(189,147,249,0.12)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-dracula-purple/80 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,0.7fr)]">
                  <span>Fact</span>
                  <span className="hidden sm:block">Detail</span>
                  <span className="hidden sm:block">Source</span>
                </div>
                <div className="divide-y divide-[rgba(189,147,249,0.1)]">
                  {verifiableFacts.map((row) => (
                    <div
                      key={row.fact}
                      className="grid grid-cols-1 gap-3 px-5 py-4 text-sm sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,0.7fr)] sm:items-start"
                    >
                      <div className="font-medium text-zinc-50">{row.fact}</div>
                      <div className="min-w-0 leading-relaxed text-[#c9b8e8]/90">{row.detail}</div>
                      <Link
                        href={row.sourceHref}
                        className="inline-flex min-h-11 items-center text-sm text-dracula-purple transition hover:text-dracula-pink sm:min-h-0"
                      >
                        {row.sourceLabel}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCell>

            <BentoCell colClassName="col-span-full lg:col-span-4">
              <div className="flex h-full flex-col p-6 sm:p-8">
                <p className="section-kicker">Authorized programs</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {partnerAuthorizations.map((cert) => (
                    <Badge
                      key={cert}
                      className="border-[rgba(189,147,249,0.2)] bg-dracula-purple/10 normal-case tracking-[0.06em] text-dracula-purple"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </BentoCell>

            {advantages.map((advantage) => (
              <BentoCell key={advantage.title} colClassName="col-span-full sm:col-span-full lg:col-span-3">
                <div className="flex h-full flex-col p-6 sm:p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(189,147,249,0.2)] bg-[#050208] text-white">
                    {advantage.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-zinc-50 sm:text-xl">{advantage.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#c9b8e8]/90">{advantage.description}</p>
                </div>
              </BentoCell>
            ))}

            <BentoCell colClassName="col-span-full lg:col-span-12">
              <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
                <div>
                  <p className="section-kicker">Entity details</p>
                  <p className="mt-3 text-sm text-[#c9b8e8]/80">Registration</p>
                  <p className="mt-1 text-base font-medium text-zinc-50">{companyRegistrationDisplay}</p>
                </div>
                <div>
                  <p className="mt-8 text-sm text-[#c9b8e8]/80 sm:mt-3">Established</p>
                  <p className="mt-1 text-base font-medium text-zinc-50">{companyEstablishedDisplay}</p>
                </div>
              </div>
            </BentoCell>
        </BentoGrid>
      </div>
    </section>
  )
}
