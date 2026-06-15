import Image from "next/image"
import { ArrowUpRight, Cpu, Factory, Layers3, ShieldCheck } from "lucide-react"

import { BentoCell, BentoGrid } from "@/components/bento"
import MagneticButton from "@/components/MagneticButton"
import TransitionLink from "@/components/TransitionLink"
import TypographicReveal from "@/components/TypographicReveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { inHouseProducts } from "@/lib/product-urls"
import {
  companyEstablishedDisplay,
  companyHeadquartersDisplay,
  companyRegistrationDisplay,
} from "@/lib/site-seo"

const heroLines = ["High-velocity software factory.", "Multi-tenant B2B and B2C platforms, hardened end to end."]

/** Live-site-aligned readouts for the control-plane column (MSP catalogue, TicketOS, OEM programs). */
const controlPlaneReadouts = [
  { label: "MSP coverage", value: "Managed IT, monitoring, lifecycle" },
  { label: inHouseProducts.ticketos.shortName, value: "Live portal, contracts, portals" },
  { label: inHouseProducts.condoclean.shortName, value: "Field cleaning accountability" },
  { label: inHouseProducts.quickklinik.shortName, value: "Clinic queue and OTC flow" },
  { label: inHouseProducts.myceliumlink.shortName, value: "Decentralized data layer" },
  { label: "Software factory", value: "Next.js, Supabase, Prisma stack" },
] as const

const buildPillars = [
  {
    icon: <Cpu className="h-5 w-5 text-dracula-purple" />,
    label: "Tenant posture",
    value:
      "Strict instance isolation and tenant scoping across Supabase policies, Prisma boundaries, and application guards so each organization keeps cryptographic separation where required.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-dracula-purple" />,
    label: "White-label plane",
    value:
      "Provisioned custom domains, injected brand assets, and per-tenant CSS theme overrides so client portals and operator consoles ship under the right identity without parallel codebases.",
  },
  {
    icon: <Layers3 className="h-5 w-5 text-dracula-purple" />,
    label: "Velocity core",
    value: `Next.js, TypeScript, Supabase, and Prisma: one stack for rapid delivery, headquartered in ${companyHeadquartersDisplay}, established ${companyEstablishedDisplay}.`,
  },
] as const

export default function Hero() {
  return (
    <section className="min-w-0 px-4 pb-20 pt-10 sm:px-6 sm:pb-24 lg:px-8 lg:pt-14" aria-labelledby="hero-heading">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <BentoGrid>
          <BentoCell colClassName="col-span-full lg:col-span-7">
            <div className="grid h-full min-h-0 grid-rows-1 p-6 sm:p-8 lg:p-10">
              <div className="flex min-h-0 flex-col">
                <Badge className="w-fit gap-2 border-dracula-purple/25 bg-dracula-purple/10 px-4 py-2 normal-case tracking-[0.12em] text-dracula-purple">
                  <Factory className="h-3.5 w-3.5" />
                  Software factory and enterprise systems integrator
                </Badge>
                <div className="mt-8 max-w-5xl space-y-6">
                  <div className="beam-text">
                    <h1
                      id="hero-heading"
                      className="text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-zinc-50 sm:text-5xl lg:text-6xl"
                    >
                      <TypographicReveal lines={[...heroLines]} />
                    </h1>
                  </div>
                  <p className="max-w-2xl text-base leading-relaxed text-[#c9b8e8]/90 sm:text-lg">
                    Arwindpianist Multimedia and Consulting operates as a high-velocity software factory and enterprise
                    systems integrator. We deliver managed IT and MSP programs, new and refurbished IT hardware, custom
                    software and integration, proprietary TicketOS, CondoClean (AssetLink), QuickKlinik, and MyceliumLink
                    flagships with live surfaces, plus construction
                    and site IT, plus                     creative and audio technology when the engagement requires it, aligned with the live MSP, hardware,
                    software, and field programs we operate in Malaysia. We also architect multi-tenant, white-labeled B2B and
                    B2C applications on a hardened Next.js, Supabase, and Prisma spine, with authorized partnerships
                    across networking, surveillance, cloud, and security suppliers so procurement and operations receive
                    OEM-backed delivery from {companyHeadquartersDisplay}.
                  </p>
                </div>
                <div className="mt-10 flex min-h-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <MagneticButton>
                    <Button asChild size="lg" className="cta-beam-once min-h-11 min-w-52 justify-between">
                      <TransitionLink href="/contact">
                        Request mobilization
                        <ArrowUpRight className="h-4 w-4" />
                      </TransitionLink>
                    </Button>
                  </MagneticButton>
                  <Button asChild size="lg" variant="secondary" className="min-h-11 min-w-52 justify-between">
                    <TransitionLink
                      href="/projects"
                      title="Case Studies in Infrastructure"
                      aria-label="Case Studies in Infrastructure"
                    >
                      Infrastructure case studies
                      <ArrowUpRight className="h-4 w-4" />
                    </TransitionLink>
                  </Button>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4">
                  {buildPillars.map((pillar) => (
                    <div
                      key={pillar.label}
                      className="grid grid-rows-[auto_auto_1fr] gap-0 rounded-2xl border border-[rgba(189,147,249,0.15)] bg-black p-4 transition-[border-color] duration-150 hover:border-[rgba(189,147,249,0.45)]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(189,147,249,0.2)] bg-black text-zinc-50">
                        {pillar.icon}
                      </div>
                      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-dracula-purple/80">{pillar.label}</p>
                      <p className="mt-2 text-sm font-semibold leading-snug text-zinc-50 sm:text-base">{pillar.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BentoCell>

          <BentoCell colClassName="col-span-full lg:col-span-5">
            <div className="grid h-full min-h-0 grid-rows-1 p-5 sm:p-6">
              <div className="flex min-h-0 flex-col">
                <div className="relative min-w-0 overflow-hidden rounded-2xl border border-[rgba(189,147,249,0.12)] bg-black p-3">
                  <div className="overflow-hidden rounded-xl border border-[rgba(189,147,249,0.1)] bg-[linear-gradient(180deg,rgba(189,147,249,0.06),transparent_40%),#000000] p-2">
                    <Image
                      src="/obsidian-hardware.svg"
                      alt="Control-plane interface visualization"
                      width={1600}
                      height={1200}
                      priority
                      sizes="(min-width: 1024px) 38vw, 92vw"
                      className="gpu-layer h-auto w-full max-w-full rounded-lg"
                    />
                  </div>
                </div>
                <div
                  className="mt-4 grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3"
                  aria-label="Live posture readout aligned to published MSP and integration catalogue"
                >
                  {controlPlaneReadouts.map((row) => (
                    <div
                      key={row.label}
                      className="rounded-xl border border-[rgba(189,147,249,0.12)] bg-[linear-gradient(145deg,rgba(189,147,249,0.07),transparent_55%)] px-3 py-2.5"
                    >
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-dracula-purple/85">
                        {row.label}
                      </p>
                      <p className="mt-1.5 text-xs font-medium leading-snug text-zinc-200">{row.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 border-t border-[rgba(189,147,249,0.1)] pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.18em] text-dracula-purple/80">Control plane</p>
                    <p className="mt-2 text-lg font-semibold leading-snug text-zinc-50 sm:text-xl">
                      Rack-grade clarity for what is deployed, what is monitored under MSP agreements, and what sits
                      under change control across hardware, SaaS, and field systems.
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                      Registration {companyRegistrationDisplay}. Established {companyEstablishedDisplay}. Hero visual is
                      LCP prioritized for fast first paint.
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                    <span className="inline-flex w-fit rounded-full border border-[rgba(189,147,249,0.22)] bg-black px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-dracula-purple">
                      Live catalogue
                    </span>
                    <TransitionLink
                      href="/partners#partner-index"
                      className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-dracula-purple transition hover:text-dracula-pink"
                    >
                      Full partner index
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </TransitionLink>
                  </div>
                </div>
              </div>
            </div>
          </BentoCell>

          <BentoCell colClassName="col-span-full lg:col-span-8">
            <div className="grid h-full min-h-0 grid-rows-1 p-6 sm:p-8">
              <div className="flex min-h-0 flex-col justify-between">
                <div>
                  <p className="section-kicker">Product and integration spine</p>
                  <p className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-zinc-50 sm:text-3xl">
                    Multi-tenant applications first: TicketOS, CondoClean (AssetLink), QuickKlinik, and MyceliumLink,
                    provisioned beside MaaS,
                    networking, and security programs under one SI and MSP chain of custody.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#c9b8e8]/90 sm:text-base">
                    We optimize for deployment speed, enforce system integrity in production, and document scalable
                    architecture so procurement, engineering, and operations share one technical truth from first commit
                    through field handover.
                  </p>
                </div>
              </div>
            </div>
          </BentoCell>

          <BentoCell colClassName="col-span-full lg:col-span-4">
            <div className="grid h-full min-h-0 grid-rows-1 p-6 sm:p-8">
              <div className="flex min-h-0 flex-col">
                <p className="section-kicker">Delivery objectives</p>
                <div className="mt-6 grid grid-cols-1 gap-0">
                  <div className="grid grid-cols-[1fr_auto] items-end gap-4 border-b border-[rgba(189,147,249,0.12)] pb-4">
                    <span className="text-sm text-[#c9b8e8]/80">Deployment speed</span>
                    <span className="text-base font-semibold text-dracula-purple">Mobilized</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-end gap-4 border-b border-[rgba(189,147,249,0.12)] py-4">
                    <span className="text-sm text-[#c9b8e8]/80">System integrity</span>
                    <span className="text-base font-semibold text-dracula-purple">Hardened</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-end gap-4 pt-4">
                    <span className="text-sm text-[#c9b8e8]/80">Scalable architecture</span>
                    <span className="text-base font-semibold text-dracula-purple">Provisioned</span>
                  </div>
                </div>
              </div>
            </div>
          </BentoCell>
        </BentoGrid>
      </div>
    </section>
  )
}
