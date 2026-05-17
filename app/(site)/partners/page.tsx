import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { SectionIntro } from "@/components/site/section-intro"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const groups = [
  {
    title: "Authorized partnerships",
    description: "Programs that support sourcing integrity, deployment confidence, and long-term support.",
    items: ["Extreme Networks", "Aruba", "Huawei", "IBM", "Xero", "Zoho", "Razorpay Curlec"],
  },
  {
    title: "Infrastructure vendors",
    description: "Networking, connectivity, surveillance, and site systems used across broader integration programs.",
    items: ["Cisco", "Juniper", "MikroTik", "Ubiquiti", "TP-Link Omada", "Axis", "Hikvision", "Fortinet"],
  },
  {
    title: "Product and cloud stack",
    description: "Platforms that power internal tooling, portals, and software delivery workflows.",
    items: ["Vercel", "Supabase", "Prisma", "PostgreSQL", "MyceliumLink", "TicketOS"],
  },
] as const

export default function PartnersPage() {
  return (
    <div className="px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
      <div className="mx-auto w-full max-w-7xl space-y-12">
        <section className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8 sm:py-10">
          <SectionIntro
            eyebrow="Partners and ecosystem"
            title="Trusted vendors, modern platforms, and delivery systems we actually build with."
            description="The goal is not to force a single stack. It’s to select the right stack for the operating constraint, then integrate it cleanly."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/contact">
                Ask about vendor fit
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/services">Operational capabilities hub</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {groups.map((group) => (
            <article key={group.title} className="surface-card-soft rounded-[2rem] p-6">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-heading">{group.title}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{group.description}</p>
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

        <section className="surface-card rounded-[2.5rem] px-6 py-8 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <p className="section-kicker">How we use partnerships</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl">
                Partnerships are a delivery accelerant, not a sales script.
              </h2>
              <p className="mt-4 text-base leading-8 text-zinc-400">
                We use partner programs to improve sourcing, support, and architecture quality. We do not treat them as
                a reason to over-prescribe one vendor when the work calls for a different mix.
              </p>
            </div>
            <div className="grid gap-4">
              <article className="surface-card-soft rounded-[2rem] p-6">
                <p className="text-sm text-zinc-500">Procurement model</p>
                <p className="mt-3 text-lg font-medium text-white">Authorized where it matters, flexible where it helps.</p>
              </article>
              <article className="surface-card-soft rounded-[2rem] p-6">
                <p className="text-sm text-zinc-500">Delivery model</p>
                <p className="mt-3 text-lg font-medium text-white">Software, systems, and support aligned under one execution path.</p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
