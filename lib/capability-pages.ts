import type { FaqItem } from "@/lib/site-seo"
import { routeSeo } from "@/lib/site-seo"
import { inHouseProducts } from "@/lib/product-urls"

export type CapabilityPath = "/msp" | "/platforms" | "/networking" | "/security" | "/ai" | "/creative"

export type CapabilityOffering = {
  title: string
  description: string
  tags?: readonly string[]
}

export type CapabilityFlagship = {
  id: string
  title: string
  description: string
  url: string
  tags: readonly string[]
  legacyAnchorId?: string
}

export type CapabilityDeepSection = {
  id: string
  title: string
  body: string
}

export type CapabilityRelatedRoute = {
  href: CapabilityPath | "/services"
  label: string
}

export type CapabilityPageContent = {
  path: CapabilityPath
  inquiryServiceId: string
  eyebrow: string
  heroIntro: string
  offerings: readonly CapabilityOffering[]
  outcomes: readonly string[]
  stack?: readonly string[]
  flagships?: readonly CapabilityFlagship[]
  deepSections?: readonly CapabilityDeepSection[]
  partners: readonly string[]
  relatedRoutes: readonly CapabilityRelatedRoute[]
  faqItems: readonly FaqItem[]
  caseStudyAnchors?: readonly string[]
}

const hubLink: CapabilityRelatedRoute = { href: "/services", label: "Operational capabilities hub" }

const platformFlagships: CapabilityFlagship[] = [
  {
    id: inHouseProducts.ticketos.anchorId,
    title: inHouseProducts.ticketos.name,
    description:
      "Multi-tenant ticket and contract management with scope-aware tracking, audit-ready workflows, and fully white-labeled client portals. The live portal is where operators and clients engage day to day.",
    url: inHouseProducts.ticketos.url,
    tags: ["Contracts", "Client portals", "Tenant scoping"],
  },
  {
    id: inHouseProducts.condoclean.anchorId,
    title: inHouseProducts.condoclean.displayName,
    description:
      "Cleaning accountability for JMBs, MCs, managers, and operators: QR and GPS verified check-ins, per-task records, and live supervisor visibility across shared facilities. Built on the AssetLink-Clean engine for field integrity at scale.",
    url: inHouseProducts.condoclean.url,
    tags: ["Field ops", "GPS / QR", "Manager visibility"],
    legacyAnchorId: inHouseProducts.condoclean.legacyAnchorId,
  },
  {
    id: inHouseProducts.myceliumlink.anchorId,
    title: inHouseProducts.myceliumlink.name,
    description:
      "Decentralized data layer: encrypted shards, proof-of-storage style integrity, and node programs that help datacenters monetize idle capacity without surrendering sovereignty.",
    url: inHouseProducts.myceliumlink.url,
    tags: ["Distributed storage", "Encryption", "Node mesh"],
  },
  {
    id: inHouseProducts.quickklinik.anchorId,
    title: inHouseProducts.quickklinik.name,
    description:
      "Outpatient operations for clinics and group practices: appointments, live queue, OTC and inventory in one tenant-safe flow so reception, clinical, and dispensary teams share one picture.",
    url: inHouseProducts.quickklinik.url,
    tags: ["Healthcare", "Queue", "Multi-tenant"],
  },
]

const pages: Record<CapabilityPath, CapabilityPageContent> = {
  "/msp": {
    path: "/msp",
    inquiryServiceId: "msp",
    eyebrow: "Operational lane",
    heroIntro:
      "Managed service provider coverage and procurement under one chain of custody: monitored operations, authorized and refurbished hardware, lifecycle planning, and systems administration sized for agencies, GLCs, and procurement-led enterprises in Malaysia.",
    offerings: [
      {
        title: "Managed IT services",
        description:
          "24/7 monitoring posture, cloud and identity stewardship, cybersecurity baselines, and ticketed change control within written scopes of work.",
        tags: ["Monitoring", "Cloud", "Cybersecurity"],
      },
      {
        title: "IT hardware procurement",
        description:
          "New and refurbished enterprise SKUs across compute, switching, wireless, and field gear with warranty-forward documentation.",
        tags: ["Authorized", "Refurbished", "Lifecycle"],
      },
      {
        title: "Systems administration",
        description:
          "Ubuntu Server, Docker, LVM discipline, and VMware or Hyper-V hybrid migrations executed as repeatable runbooks.",
        tags: ["Ubuntu", "Docker", "VMware / Hyper-V"],
      },
      {
        title: "IT consulting and advisory",
        description:
          "Architecture, vendor-neutral sourcing, and transformation guidance grounded in how your team actually operates.",
        tags: ["ITIL", "Zero Trust", "Vendor-neutral"],
      },
      {
        title: "Service delivery alignment",
        description:
          "TicketOS integration when ticketing, contracts, and client portals must stay aligned to MSP delivery and billing truth.",
        tags: ["TicketOS"],
      },
    ],
    outcomes: [
      "MSP operating cadence with monitored baselines, ticketed change control, and defined response windows under written scopes of work.",
      "Authorized and refurbished procurement paths with warranty-forward documentation for procurement review.",
      "Lifecycle planning that pairs refresh cycles with vendor programs so opex stays predictable.",
      "Single chain of custody from quote to rack or closet install, including staging checklists and operational handover.",
      "Optional pairing with in-house platforms when service delivery and contracts must share one system of record.",
    ],
    stack: ["Extreme Networks", "Aruba", "Cisco", "Huawei", "Dell", "HPE", "Fortinet", "TicketOS"],
    partners: ["Extreme Networks", "Aruba", "Huawei", "IBM", "Xero", "Cisco", "Dell", "HPE"],
    relatedRoutes: [
      hubLink,
      { href: "/platforms", label: "Platforms and software factory" },
      { href: "/networking", label: "Networking and field systems" },
    ],
    faqItems: [
      {
        question: "How does MSP coverage improve opex predictability?",
        answer: [
          "Predictability comes from fewer unplanned events: monitored baselines, disciplined change windows, and lifecycle procurement replace emergency spend spikes. Review scope under ",
          { href: "/msp", label: "MSP and procurement" },
          " and validate OEM alignment on ",
          { href: "/partners", label: "Partners" },
          ".",
        ],
      },
      {
        question: "Do you supply both new and refurbished hardware?",
        answer: [
          "Yes. We provision authorized new equipment and audited refurbished paths when budget and lead time demand flexibility, always with documentation suitable for warranty and audit. See ",
          { href: "/msp", label: "MSP and procurement" },
          " for the procurement model.",
        ],
      },
    ],
  },
  "/platforms": {
    path: "/platforms",
    inquiryServiceId: "platforms",
    eyebrow: "Operational lane",
    heroIntro:
      "High-velocity software factory delivery: multi-tenant, white-labeled B2B and B2C applications on Next.js, Supabase, and Prisma, plus in-house flagships TicketOS, CondoClean (AssetLink), MyceliumLink, and QuickKlinik with live product surfaces you can evaluate today.",
    offerings: [
      {
        title: "Multi-tenant architecture",
        description:
          "Instance isolation and strict tenant scoping across application, data, and policy layers for thousands of organizations from one hardened codebase.",
        tags: ["Tenant scoping", "Isolation"],
      },
      {
        title: "White-label readiness",
        description:
          "Custom domains, logo injection, and per-tenant CSS theme overrides so each client ships under its own brand without forking repositories.",
        tags: ["Branding", "Custom domains"],
      },
      {
        title: "Custom software factory",
        description:
          "Portals, internal systems, and integrations on Next.js, TypeScript, Supabase, and Prisma with typed contracts and observability hooks.",
        tags: ["Next.js", "Supabase", "Prisma"],
      },
      {
        title: "B2B and B2C surfaces",
        description:
          "Operator consoles and consumer-grade performance from one architectural spine, hardened per audience and threat model.",
        tags: ["B2B", "B2C"],
      },
    ],
    outcomes: [
      "Strict instance isolation and tenant scoping from first commit through production operations.",
      "White-label readiness provisioned out of the box: domains, brand injection, and theme overrides per organization.",
      "High-velocity shipping with migrations discipline, typed contracts, and audit-friendly change history.",
      "In-house flagships deployed and operated by Arwindpianist, with live URLs for procurement and technical review.",
      "Integration with MSP and networking programs when platforms must sit on hardened infrastructure.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Prisma", "Vercel", "PostgreSQL"],
    flagships: platformFlagships,
    partners: ["Vercel", "Supabase", "Prisma", "PostgreSQL"],
    relatedRoutes: [
      hubLink,
      { href: "/msp", label: "MSP and procurement" },
      { href: "/ai", label: "GenAI and MaaS" },
    ],
    caseStudyAnchors: ["case-assetlink"],
    faqItems: [
      {
        question: "What are the ROI benefits of implementing TicketOS for contract management?",
        answer: [
          "TicketOS reduces revenue leakage and rework: entitlements and burn-down are visible at intake, so scope is adjudicated before work is executed. Review packaging on ",
          { href: "/platforms", label: "Platforms and software factory" },
          " and visit the live portal at ",
          { href: "/platforms#ticketos", label: "TicketOS" },
          ".",
        ],
      },
      {
        question: "How does CondoClean differ from generic facility apps?",
        answer: [
          "CondoClean (AssetLink) targets residence bodies and cleaning operators with QR and GPS verified check-ins, per-task proof, and live manager visibility. Explore the live product via ",
          { href: "/platforms#condoclean", label: "CondoClean" },
          " on the platforms page.",
        ],
      },
      {
        question: "Can QuickKlinik scale from one clinic to many sites?",
        answer: [
          "QuickKlinik is architected for tenant-safe outpatient workflows: appointments, queue, OTC, and inventory in one flow. See ",
          { href: "/platforms#quickklinik", label: "QuickKlinik" },
          " for the live marketing surface and mobilization via ",
          { href: "/contact", label: "Contact" },
          ".",
        ],
      },
    ],
  },
  "/networking": {
    path: "/networking",
    inquiryServiceId: "networking",
    eyebrow: "Operational lane",
    heroIntro:
      "Enterprise networking and field systems integration: multi-WAN and SD-WAN programs, campus and branch switching, construction and site IT, and hybrid cloud connectivity with hardened handover documentation.",
    offerings: [
      {
        title: "Enterprise switching and routing",
        description:
          "Campus and branch programs across Cisco, Juniper, MikroTik, Ubiquiti, TP-Link Omada, Ruckus, and allied vendors.",
        tags: ["Cisco", "Juniper", "Ubiquiti"],
      },
      {
        title: "SD-WAN and multi-WAN",
        description:
          "Path selection, failover discipline, and throughput policies aligned to uptime targets for distributed organizations.",
        tags: ["SD-WAN", "Multi-WAN"],
      },
      {
        title: "Cellular bonding and transport diversity",
        description:
          "Peplink-class bonding patterns for sites where fiber is late or redundant paths are mandatory.",
        tags: ["Peplink-class", "5G / LTE"],
      },
      {
        title: "Construction and site IT",
        description:
          "Temporary links, site cabins, and secure handover when the project office becomes production.",
        tags: ["Field IT", "Site connectivity"],
      },
      {
        title: "Hybrid cloud connectivity",
        description:
          "Landing zones, identity, and network guardrails that tie on-prem and cloud workloads to one operating model.",
        tags: ["Azure", "AWS"],
      },
    ],
    outcomes: [
      "High-availability WAN architectures with rehearsed failover and documented path selection.",
      "Field and construction programs with staging checklists and operational transfer criteria.",
      "Wireless and switching integration with BOM traceability suitable for engineering turnover.",
      "Architecture advisory grounded in routing, identity, and hybrid constraints rather than generic roadmaps.",
      "Coordination with security integration when surveillance uplinks share the same physical plant.",
    ],
    stack: ["Peplink-class", "Cisco", "Meraki", "Ubiquiti", "Juniper", "5G / LTE", "Azure", "AWS"],
    deepSections: [
      {
        id: "authorized-networking",
        title: "Authorized networking programs",
        body: "We align delivery with Extreme Networks, Aruba, and Huawei authorized programs where warranties, support, and OEM coverage dominate procurement outcomes.",
      },
    ],
    partners: ["Extreme Networks", "Aruba", "Huawei", "Cisco", "Juniper", "MikroTik", "Ubiquiti"],
    relatedRoutes: [
      hubLink,
      { href: "/security", label: "Security and surveillance" },
      { href: "/msp", label: "MSP and procurement" },
    ],
    faqItems: [
      {
        question: "Do you support construction sites with temporary connectivity?",
        answer: [
          "Yes. We provision site cabins, temporary links, and handover packages when project offices must become production networks. Scope is under ",
          { href: "/networking", label: "Networking and field systems" },
          ".",
        ],
      },
      {
        question: "How do you approach SD-WAN vendor selection?",
        answer: [
          "We document residency, latency, exit cost, and operational skill depth first, then align Peplink-class, Meraki, or carrier programs to those constraints. See ",
          { href: "/partners", label: "Partners" },
          " for OEM context.",
        ],
      },
    ],
  },
  "/security": {
    path: "/security",
    inquiryServiceId: "security",
    eyebrow: "Operational lane",
    heroIntro:
      "Security and surveillance integration for enterprise and GLC sites: IP CCTV supply and design, VMS-class operator workflows, access control, and surveillance network segmentation with procurement-ready documentation.",
    offerings: [
      {
        title: "IP CCTV design and integration",
        description:
          "Cameras, recorders, and storage architecture across Hikvision, Dahua, Axis, Hanwha, Uniview, and allied manufacturers.",
        tags: ["IP CCTV", "NVR"],
      },
      {
        title: "VMS-class operations",
        description:
          "Genetec and Axis-class ecosystems integrated for operator workflows, storage, and manufacturer-backed support.",
        tags: ["Genetec-class", "Axis"],
      },
      {
        title: "Access control",
        description:
          "Fingertec-class biometric and turnstile workflows where workforce compliance and audit trails matter.",
        tags: ["Access control", "Biometric"],
      },
      {
        title: "Surveillance network design",
        description:
          "Segmentation, uplink planning, and hardened handover so physical security and IT share one documented truth.",
        tags: ["Segmentation", "Uplink design"],
      },
    ],
    outcomes: [
      "Tier-1 aligned camera and recorder programs with BOM traceability for procurement.",
      "VMS integration suitable for operations centers and audit review.",
      "Access control workflows documented for security operations handover.",
      "Network design that prevents surveillance traffic from destabilizing production VLANs.",
      "Maintenance transfer packages for long-run operator teams.",
    ],
    stack: ["Axis", "Genetec-class", "Hikvision", "Dahua", "Uniview", "Hanwha", "Fingertec-class", "Fortinet"],
    deepSections: [
      {
        id: "cctv-vendors",
        title: "CCTV and recorder families",
        body: "We integrate Hikvision, Dahua, Axis, Hanwha Vision, Uniview, TP-Link VIGI, and allied lines. Selection is driven by resolution, storage, VMS fit, and warranty coverage rather than a single manufacturer mandate.",
      },
    ],
    partners: ["Axis", "Hikvision", "Dahua", "Hanwha", "Fortinet"],
    relatedRoutes: [
      hubLink,
      { href: "/networking", label: "Networking and field systems" },
      { href: "/msp", label: "MSP and procurement" },
    ],
    faqItems: [
      {
        question: "Can you integrate existing cameras with a new VMS?",
        answer: [
          "We assess ONVIF compatibility, licensing, and retention requirements before cutover, then stage migration with rollback paths. Delivery scope is under ",
          { href: "/security", label: "Security and surveillance integration" },
          ".",
        ],
      },
    ],
  },
  "/ai": {
    path: "/ai",
    inquiryServiceId: "maas",
    eyebrow: "Operational lane",
    heroIntro:
      "GenAI and Model-as-a-Service programs for regulated buyers: inference governance, residency-aware deployment, metered inference when GPU fleets are not the constraint, and architecture that ties models to identity, networking, and storage already in production.",
    offerings: [
      {
        title: "Model-as-a-Service packaging",
        description:
          "Metered inference endpoints, usage guardrails, and operational monitoring when owning GPU estates is not the winning constraint.",
        tags: ["MaaS", "Inference"],
      },
      {
        title: "Residency-first deployment",
        description:
          "On-prem, private cloud, or hybrid patterns matched to PDPA-class policy and air-gapped requirements.",
        tags: ["Residency", "Private cloud"],
      },
      {
        title: "Inference governance",
        description:
          "Authentication, rate limits, audit hooks, and change control suited to GLC and agency workloads.",
        tags: ["Governance", "Audit"],
      },
      {
        title: "Model evaluation",
        description:
          "Open-weight lines such as Qwen evaluated against latency, cost, and safety criteria you define.",
        tags: ["Qwen", "Evaluation"],
      },
    ],
    outcomes: [
      "Architecture selection from data sensitivity, latency, and operating model rather than vendor slogans.",
      "Provisioned MaaS endpoints with governance hooks for production operations.",
      "Integration with platforms and identity programs so GenAI is not isolated from the rest of the stack.",
      "Documented exit and portability criteria for procurement review.",
      "Coordination with networking when inference traffic must traverse controlled paths.",
    ],
    stack: ["MaaS", "PostgreSQL vectors", "Azure OpenAI-class", "Private inference"],
    partners: ["Microsoft Azure", "AWS", "Supabase"],
    relatedRoutes: [
      hubLink,
      { href: "/platforms", label: "Platforms and software factory" },
      { href: "/msp", label: "MSP and procurement" },
    ],
    faqItems: [
      {
        question: "When should teams choose on-prem, private cloud, or MaaS for GenAI?",
        answer: [
          "Selection is architected from data sensitivity, latency, and operating model: on-prem or private cloud when residency dominates; MaaS when metered inference and deployment speed outweigh running GPU fleets internally. Read ",
          { href: "/ai", label: "GenAI and MaaS" },
          " and validate infrastructure under ",
          { href: "/partners", label: "Partners" },
          ".",
        ],
      },
    ],
  },
  "/creative": {
    path: "/creative",
    inquiryServiceId: "creative",
    eyebrow: "Operational lane",
    heroIntro:
      "Creative and audio technology for production teams: studio infrastructure, Dante-class networking, signal paths, and production IT bundled with MSP discipline when the engagement spans both creative workflow and enterprise operations.",
    offerings: [
      {
        title: "Music production services",
        description:
          "Recording, mixing, and mastering support with engineering discipline suitable for commercial and broadcast deliverables.",
        tags: ["Production", "Mixing"],
      },
      {
        title: "Studio technology",
        description:
          "Interface, monitoring, and signal chain design for rooms that must stay reliable under session pressure.",
        tags: ["Studio", "Dante"],
      },
      {
        title: "Creative technology consulting",
        description:
          "Workflow design across DAWs, control surfaces, and networked audio without treating creative gear as consumer IT.",
        tags: ["Pro Tools", "Logic", "Ableton"],
      },
      {
        title: "Production IT bundling",
        description:
          "When creative sites need the same MSP chain of custody as the rest of the enterprise, we align studio VLANs, backup, and support windows with the MSP program.",
        tags: ["MSP alignment"],
      },
    ],
    outcomes: [
      "Studio and production systems architected for repeatable sessions, not one-off heroics.",
      "Networked audio and control paths documented for operator handover.",
      "Procurement-friendly BOMs for interfaces, microphones, and processing gear.",
      "Optional integration with MSP programs when the site also runs standard enterprise IT.",
      "Clear scope boundaries: creative technology delivery, not a consumer music retail positioning.",
    ],
    stack: ["Dante", "Pro Tools", "Logic Pro", "Ableton", "Behringer", "sE Electronics"],
    partners: ["Ableton", "Behringer"],
    relatedRoutes: [
      hubLink,
      { href: "/msp", label: "MSP and procurement" },
      { href: "/platforms", label: "Platforms and software factory" },
    ],
    faqItems: [
      {
        question: "Is this a music retail or tuition business?",
        answer: [
          "No. We deliver creative technology and production infrastructure for teams that need engineered signal paths and studio reliability. Entity posture is documented on ",
          { href: "/about", label: "About" },
          ".",
        ],
      },
    ],
  },
}

export function getCapabilityPage(path: CapabilityPath): CapabilityPageContent & { title: string; description: string } {
  const seo = routeSeo[path]
  const content = pages[path]
  return {
    ...content,
    title: seo.title,
    description: seo.description,
  }
}

export const capabilityPaths = Object.keys(pages) as CapabilityPath[]
