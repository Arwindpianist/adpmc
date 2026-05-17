import { ArrowUpRight, Boxes, Building2, Cpu, HeartPulse, LayoutGrid, Network, Palette, Ticket } from "lucide-react"

import { BentoCell, BentoGrid } from "@/components/bento"
import TransitionLink from "@/components/TransitionLink"
import { Badge } from "@/components/ui/badge"
import { SectionIntro } from "@/components/site/section-intro"
import { inHouseProducts } from "@/lib/product-urls"

const linkClassName =
  "inline-flex min-h-11 items-center gap-2 text-sm font-medium text-dracula-purple transition hover:text-dracula-pink"

const features = [
  {
    icon: <Boxes className="h-6 w-6 text-dracula-purple" />,
    title: "Multi-tenant architecture",
    description:
      "Single hardened codebase powers isolated, secure instances for thousands of organizations. High-availability patterns with strict tenant scoping and defensible data boundaries from day one.",
    href: "/platforms",
    linkLabel: "Platforms and software factory",
    colClassName: "col-span-full lg:col-span-6",
    tags: ["Instance isolation", "Tenant scoping", "High-availability"],
  },
  {
    icon: <Palette className="h-6 w-6 text-dracula-purple" />,
    title: "White-label readiness",
    description:
      "Dynamic branding is provisioned out of the box: custom domains, logo injection, and organization-specific CSS theme overrides so each tenant ships under its own brand without forking the stack.",
    href: "/platforms",
    linkLabel: "Review white-label posture",
    colClassName: "col-span-full lg:col-span-6",
    tags: ["Custom domains", "Theme overrides", "Brand injection"],
  },
  {
    icon: <Cpu className="h-6 w-6 text-dracula-purple" />,
    title: "High-velocity shipping",
    description:
      "We standardize on Next.js, Supabase, and Prisma to move from concept to production-ready enterprise surfaces with disciplined migrations, typed contracts, and observability hooks suited to regulated buyers.",
    href: "/platforms",
    linkLabel: "Review delivery stack",
    colClassName: "col-span-full lg:col-span-4",
    tags: ["Next.js", "Supabase", "Prisma"],
  },
  {
    icon: <LayoutGrid className="h-6 w-6 text-dracula-purple" />,
    title: "B2B and B2C versatility",
    description:
      "We bridge complex enterprise back-office tools and high-performance consumer web and mobile experiences: one architectural spine, multiple surfaces, each hardened for its audience and threat model.",
    href: "/platforms",
    linkLabel: "B2B and B2C surfaces",
    colClassName: "col-span-full lg:col-span-4",
    tags: ["B2B control planes", "B2C performance", "Unified spine"],
  },
  {
    icon: <Ticket className="h-6 w-6 text-dracula-purple" />,
    title: inHouseProducts.ticketos.name,
    description:
      "Multi-tenant ticket and contract management with scope-aware tracking and white-labeled client portals. Live portal available for evaluation.",
    href: `/platforms#${inHouseProducts.ticketos.anchorId}`,
    linkLabel: "TicketOS deep dive",
    colClassName: "col-span-full lg:col-span-4",
    tags: ["Contracts", "Client portals", "Live portal"],
  },
  {
    icon: <Building2 className="h-6 w-6 text-dracula-purple" />,
    title: inHouseProducts.condoclean.displayName,
    description:
      "Cleaning accountability for residences and operators: QR and GPS verified check-ins, per-task records, and live supervisor visibility. Public surface at condoclean.arwindpianist.com.",
    href: `/platforms#${inHouseProducts.condoclean.anchorId}`,
    linkLabel: "CondoClean deep dive",
    colClassName: "col-span-full lg:col-span-4",
    tags: ["Field ops", "CondoClean", "AssetLink"],
  },
  {
    icon: <Network className="h-6 w-6 text-dracula-purple" />,
    title: inHouseProducts.myceliumlink.name,
    description:
      "Decentralized data layer with encrypted shards and node programs for datacenter partners. Explore the live narrative at myceliumlink.com.",
    href: `/platforms#${inHouseProducts.myceliumlink.anchorId}`,
    linkLabel: "MyceliumLink deep dive",
    colClassName: "col-span-full lg:col-span-4",
    tags: ["Distributed storage", "Nodes"],
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-dracula-purple" />,
    title: inHouseProducts.quickklinik.name,
    description:
      "Outpatient operations for clinics and group practices: appointments, live queue, OTC, and inventory in one tenant-safe flow.",
    href: `/platforms#${inHouseProducts.quickklinik.anchorId}`,
    linkLabel: "QuickKlinik deep dive",
    colClassName: "col-span-full lg:col-span-4",
    tags: ["Healthcare", "Queue", "Multi-tenant"],
  },
] as const

export default function Features() {
  return (
    <section className="min-w-0 px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="features-heading">
      <div className="mx-auto w-full max-w-7xl min-w-0 space-y-8 lg:space-y-10">
        <SectionIntro
          eyebrow="Software product DNA"
          title="Multi-tenant, white-labeled B2B and B2C applications, architected for speed."
          description="Each tile documents a provisioned capability or in-house flagship with a live product surface you can evaluate before mobilization."
        />
        <BentoGrid>
          {features.map((feature, index) => (
            <BentoCell key={feature.title} colClassName={feature.colClassName}>
              <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-6 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(189,147,249,0.2)] bg-black text-white">
                    {feature.icon}
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-dracula-purple/60" aria-hidden />
                </div>
                <div className="min-h-0 space-y-3">
                  <h3
                    id={index === 0 ? "features-heading" : undefined}
                    className="text-xl font-semibold tracking-[-0.02em] text-zinc-50 sm:text-2xl"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#c9b8e8]/90 sm:text-base">{feature.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {feature.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="border-[rgba(189,147,249,0.2)] bg-dracula-purple/10 normal-case tracking-[0.06em] text-dracula-purple"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="min-h-11">
                  <TransitionLink href={feature.href} className={linkClassName}>
                    {feature.linkLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </TransitionLink>
                </div>
              </div>
            </BentoCell>
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
