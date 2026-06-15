/** Certified reseller / authorized program designations (E-E-A-T, trust signals). */
export const partnerAuthorizationPrograms = [
  "Authorized Extreme Networks Partner",
  "Authorized Aruba Partner",
  "Authorized Huawei Partner",
  "IBM Registered Partner",
  "Claude Authorized Reseller",
  "Authorized Xero Partner",
] as const

export type PartnerEcosystemGroup = {
  id: string
  title: string
  description: string
  items: readonly string[]
}

/** Full partner and vendor catalogue for /partners and structured references. */
export const partnerEcosystemGroups: readonly PartnerEcosystemGroup[] = [
  {
    id: "authorized",
    title: "Authorized programs",
    description:
      "Formal partner programs that support sourcing integrity, warranty paths, deployment confidence, and long-term support.",
    items: [
      "Extreme Networks",
      "Aruba",
      "Huawei",
      "IBM Registered Partner",
      "Claude Authorized Reseller",
      "Xero",
      "Zoho",
      "Razorpay Curlec",
    ],
  },
  {
    id: "networking",
    title: "Networking and infrastructure",
    description:
      "Switching, routing, wireless, unified communications, and site connectivity for MSP and systems integration programs.",
    items: [
      "Cisco",
      "Dell",
      "Grandstream",
      "HPE",
      "Juniper",
      "MikroTik",
      "Peplink",
      "Ruckus Networks",
      "TP-Link Omada",
      "Ubiquiti",
    ],
  },
  {
    id: "cloud",
    title: "Cloud and product delivery",
    description:
      "Hyperscale, edge, container, database, and delivery platforms that power portals, integrations, and software factory programs.",
    items: [
      "AWS",
      "Cloudflare",
      "Docker",
      "Microsoft Azure",
      "PlanetScale",
      "PostgreSQL",
      "Prisma",
      "Proxmox",
      "Red Hat",
      "Redis",
      "Supabase",
      "TrueNAS",
      "Vercel",
    ],
  },
  {
    id: "security",
    title: "Security and networks",
    description:
      "Next-generation firewalls, zero-trust frameworks, and unified security posture from perimeter to endpoint.",
    items: ["Check Point", "Fortinet", "Palo Alto Networks", "Sangfor Technologies", "Sophos"],
  },
  {
    id: "data",
    title: "Data and infrastructure",
    description: "Event streaming and data-plane platforms for real-time enterprise architectures.",
    items: ["Confluent"],
  },
  {
    id: "genai",
    title: "GenAI and data",
    description:
      "Commercial and open-model deployment hubs, vector stores, and RAG infrastructure for transformation programs.",
    items: ["Hugging Face", "OpenAI", "Pinecone", "Qdrant"],
  },
  {
    id: "surveillance",
    title: "Field, surveillance, and access",
    description:
      "IP video, VMS platforms, biometrics, smart credentials, and electronic locking for enterprise and smart-facility sites.",
    items: [
      "Axis",
      "Dahua",
      "Fingertec",
      "Genetec",
      "Hanwha Vision",
      "HID Global",
      "Hikvision",
      "Milestone Systems",
      "Nx Witness",
      "Salto Systems",
      "Suprema",
      "Uniview",
      "Vivotek",
    ],
  },
  {
    id: "fintech",
    title: "FinTech and ERP",
    description:
      "Billing, subscriptions, commerce, and modular ERP/CRM automation for high-volume and multi-channel operations.",
    items: ["Odoo", "Shopify Plus", "Stripe"],
  },
  {
    id: "automation",
    title: "Enterprise automation",
    description: "Visual workflow modeling and middleware integration for cross-system enterprise automation.",
    items: ["Make"],
  },
  {
    id: "in-house",
    title: "In-house platforms",
    description:
      "Proprietary products developed and operated by Arwindpianist Multimedia & Consulting, with live surfaces for evaluation.",
    items: ["TicketOS", "CondoClean (AssetLink)", "QuickKlinik", "MyceliumLink"],
  },
  {
    id: "creative",
    title: "Creative and audio technology",
    description:
      "Studio interfaces, DSP modeling, virtual instrumentation, and production tooling when creative infrastructure is in scope.",
    items: ["Ableton", "Behringer", "Focusrite", "Native Instruments", "Universal Audio"],
  },
] as const

/** Homepage bento preview — three customer-facing lanes (subset of the full catalogue). */
export const homePartnerEcosystemGroups: readonly PartnerEcosystemGroup[] = [
  {
    id: "home-infrastructure",
    title: "Infrastructure and networking",
    description: "Enterprise switching, routing, wireless, UC, and site connectivity under authorized programs.",
    items: [
      "Extreme Networks",
      "Aruba",
      "Huawei",
      "Cisco",
      "Grandstream",
      "Ruckus Networks",
      "Juniper",
      "Ubiquiti",
      "Palo Alto Networks",
    ],
  },
  {
    id: "home-cloud",
    title: "Cloud and product delivery",
    description: "Hyperscale, edge, data, GenAI, and authorized resale for procurement-led buyers.",
    items: [
      "Microsoft Azure",
      "AWS",
      "Cloudflare",
      "Docker",
      "OpenAI",
      "Vercel",
      "Supabase",
      "IBM Registered Partner",
      "Claude Authorized Reseller",
    ],
  },
  {
    id: "home-surveillance",
    title: "Field and surveillance systems",
    description: "VMS, access control, biometrics, and analytics-driven IP video for enterprise sites.",
    items: [
      "Hikvision",
      "Axis",
      "Genetec",
      "Milestone Systems",
      "HID Global",
      "Hanwha Vision",
      "Vivotek",
      "Suprema",
    ],
  },
] as const

/** Deduplicated partner names for the complete index (alphabetical). */
export function getAlphabeticalPartnerIndex(): string[] {
  const names = new Set<string>()
  for (const group of partnerEcosystemGroups) {
    for (const item of group.items) {
      names.add(item)
    }
  }
  return [...names].sort((a, b) => a.localeCompare(b, "en"))
}

export const partnerEcosystemPartnerCount = getAlphabeticalPartnerIndex().length
