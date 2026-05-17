import Link from "next/link"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"

import { SectionIntro } from "@/components/site/section-intro"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  businessActivitySummary,
  businessForm,
  businessStatus,
  companyEstablishedDisplay,
  companyHeadquartersDisplay,
  companyRegistrationDisplay,
  legalName,
} from "@/lib/site-seo"

const principles = [
  "Vendor-neutral architecture decisions with partner-backed execution when warranties and OEM coverage dominate outcomes.",
  "Disciplined handoffs between procurement, systems integration, engineering, and managed operations.",
  "Application stacks architected on Next.js, TypeScript, Supabase, and Prisma where control planes must be defensible.",
  "Operational pragmatism for grant-scale programs, distributed sites, and mission-critical uptime targets.",
] as const

const capabilityColumns = [
  {
    title: "Generative AI & platforms",
    items: [
      "Model-as-a-Service packaging and inference governance",
      "AssetLink ICT inventory integrity",
      "TicketOS procurement and contract control",
      "Next.js / Supabase / Prisma delivery surfaces",
    ],
  },
  {
    title: "Networking & systems",
    items: [
      "Multi-WAN, SD-WAN, and cellular bonding programs",
      "Ubuntu Server, Docker, and LVM operations",
      "VMware / Hyper-V hybrid migrations",
      "Lifecycle procurement under authorized programs",
    ],
  },
  {
    title: "Security & field deployment",
    items: [
      "Genetec / Axis-class VMS integration posture",
      "Fingertec-class biometric access workflows",
      "Distributed site and construction-field connectivity",
      "Hardened handover documentation for operations",
    ],
  },
] as const

export default function AboutPage() {
  return (
    <div className="px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
      <div className="mx-auto w-full max-w-7xl space-y-12">
        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10">
            <SectionIntro
              eyebrow="Entity & posture"
              title="Systems integrator and MSP: engineered excellence from bare metal to MaaS."
              description={`${legalName} is headquartered in ${companyHeadquartersDisplay}. We architect, provision, deploy, and harden mission-critical infrastructure, GenAI and MaaS programs, and internal platforms for agencies, GLCs, and procurement-led enterprises.`}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge className="normal-case tracking-[0.08em]">Established {companyEstablishedDisplay}</Badge>
              <Badge variant="secondary" className="normal-case tracking-[0.08em]">
                {businessForm}
              </Badge>
              <Badge variant="secondary" className="normal-case tracking-[0.08em]">
                Status: {businessStatus}
              </Badge>
            </div>
          </div>
          <div className="surface-card-soft rounded-[2.5rem] p-6 sm:p-8">
            <p className="section-kicker">Company profile</p>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-zinc-500">Registration</dt>
                <dd className="mt-2 text-base font-medium text-white">{companyRegistrationDisplay}</dd>
              </div>
              <div>
                <dt className="text-sm text-zinc-500">Headquarters</dt>
                <dd className="mt-2 text-base font-medium text-white">{companyHeadquartersDisplay}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm text-zinc-500">Registered activities</dt>
                <dd className="mt-2 text-sm leading-7 text-zinc-400">{businessActivitySummary}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((principle, index) => (
            <article key={principle} className="surface-card-soft rounded-[2rem] p-6">
              <p className="text-sm text-zinc-500">0{index + 1}</p>
              <p className="mt-5 text-base leading-7 text-zinc-300">{principle}</p>
            </article>
          ))}
        </section>

        <section className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8">
          <SectionIntro
            eyebrow="Capability map"
            title="Operational capabilities across software, infrastructure, and security."
            description="We operate where architecture decisions spill into procurement, staged deployment, and long-term managed operations - underwritten by deployment speed, system integrity, and scalable architecture."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {capabilityColumns.map((column) => (
              <article key={column.title} className="surface-card-soft rounded-[2rem] p-6">
                <h2 className="text-xl font-semibold text-heading">{column.title}</h2>
                <ul className="mt-5 space-y-3">
                  {column.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-7 text-zinc-400">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-zinc-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker">Mobilization</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl">
                Engage one SI/MSP chain of custody early: strategy, sourcing, deployment, and operations stay aligned.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/contact">
                  Contact us
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/services">Operational capabilities</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
