import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import FAQ from "@/components/FAQ"
import { SectionIntro } from "@/components/site/section-intro"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { servicesEngagementSteps, servicesFaqItems } from "@/lib/site-seo"

const capabilityGroups = [
  {
    title: "MSP & procurement",
    description:
      "Managed IT services, monitored operations, and authorized or refurbished hardware sourcing under OEM-aligned programs.",
    href: "/msp",
    stack: ["Extreme", "Aruba", "Cisco", "Huawei", "TicketOS"],
  },
  {
    title: "Platforms & software factory",
    description:
      "Multi-tenant, white-labeled B2B and B2C applications: TicketOS, CondoClean (AssetLink), MyceliumLink, QuickKlinik, and custom control planes on Next.js, Supabase, and Prisma.",
    href: "/platforms",
    stack: ["TicketOS", "CondoClean", "QuickKlinik", "Next.js", "Supabase", "Prisma"],
  },
  {
    title: "Networking & field systems",
    description:
      "Multi-WAN and SD-WAN programs, site and construction IT, and distributed connectivity with hardened handover.",
    href: "/networking",
    stack: ["Peplink-class", "Meraki", "Ubiquiti", "5G / LTE", "Axis"],
  },
  {
    title: "Security & surveillance integration",
    description:
      "IP CCTV, VMS-class integration, access control workflows, and documentation sized for procurement and audit.",
    href: "/security",
    stack: ["Axis", "Genetec-class", "Hikvision", "Fingertec-class", "Fortinet"],
  },
  {
    title: "GenAI & Model-as-a-Service",
    description:
      "Inference governance, residency-aware deployment, and MaaS packaging when GPU fleet ownership is not the constraint.",
    href: "/ai",
    stack: ["MaaS", "GenAI", "Inference", "PostgreSQL"],
  },
  {
    title: "Creative and audio technology",
    description:
      "Music production, studio infrastructure, and Dante-class networked audio for production teams, with optional MSP bundling.",
    href: "/creative",
    stack: ["Dante", "Pro Tools", "Ableton", "Studio IT"],
  },
] as const

export default function ServicesPage() {
  return (
    <>
      <div className="px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto w-full max-w-7xl space-y-12">
          <section className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10">
            <SectionIntro
              eyebrow="Operational capabilities hub"
              title="Six dedicated lanes. One SI and MSP chain of custody."
              description="Each group has its own page with scope, stack tags, and mobilization paths. Use this hub to compare lanes or jump directly into the discipline that matches your brief."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/contact">
                  Request mobilization
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link
                  href="/projects"
                  title="Case Studies in Infrastructure"
                  aria-label="Case Studies in Infrastructure"
                >
                  Case studies
                </Link>
              </Button>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {capabilityGroups.map((group) => (
              <article key={group.href} className="surface-card-soft flex flex-col rounded-[2rem] p-6">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-heading">{group.title}</h2>
                <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">{group.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.stack.map((item) => (
                    <Badge key={item} variant="secondary" className="normal-case tracking-[0.08em]">
                      {item}
                    </Badge>
                  ))}
                </div>
                <Button asChild variant="secondary" className="mt-6 w-fit">
                  <Link href={group.href}>
                    Open dedicated page
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </article>
            ))}
          </section>

          <section className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8">
            <SectionIntro
              eyebrow="How we engage"
              title="From mobilization brief to hardened handover."
              description="Software, networking, and security integrations follow the same chain of custody so procurement, engineering, and operations see one coordinated deployment."
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-4">
              {servicesEngagementSteps.map((step, index) => (
                <article key={step.name} className="surface-card-soft rounded-[2rem] p-5">
                  <p className="text-sm text-zinc-500">0{index + 1}</p>
                  <h3 className="mt-4 text-lg font-semibold text-heading">{step.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{step.text}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <FAQ
        items={servicesFaqItems}
        jsonLdPath="/services#knowledge-base"
        heading="Knowledge base"
        id="knowledge-base"
      />

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="surface-card mx-auto flex w-full max-w-7xl flex-col gap-6 rounded-[2.5rem] px-6 py-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker">Delivery fit</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl">
              Select the engagement shape that matches your constraint.
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-400">
              We scope platform delivery, MSP coverage, mixed hardware and systems programs, or grant-scale field
              mobilization. Each lane has explicit integrity checkpoints and operational transfer criteria.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/contact">
              Submit mobilization brief
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
