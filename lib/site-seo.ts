import type { Metadata } from "next"

/** Canonical site origin (apex). Keep sitemap + metadata + JSON-LD aligned. */
export const siteUrl = "https://arwindpianist.com"
export const siteName = "Arwindpianist Multimedia & Consulting"
/** SSM / business registration number (Malaysia). */
export const companyRegistrationNumber = "JR0170970-M"
export const companyRegistrationDisplay = `202403315055 (${companyRegistrationNumber})`
export const legalName = `Arwindpianist Multimedia & Consulting (${companyRegistrationDisplay})`
export const businessForm = "Pemilikan Tunggal (Sole Proprietorship)"
export const businessStatus = "Aktif"

/**
 * Editorial / content revision (ISO-8601). Bump when indexable copy or entity facts change.
 * Wired into Open Graph, Article JSON-LD, and llms.txt.
 */
export const siteContentRevision = "2026-04-04"

/** Public profiles for Schema.org `sameAs` (E-E-A-T). */
export const companyLinkedInUrl =
  "https://www.linkedin.com/company/arwindpianist-multimedia-consulting/"
export const organizationGitHubUrl = "https://github.com/Arwindpianist"
export const founderTwitterUrl = "https://twitter.com/arwindpianist"

/** Stable @id targets for JSON-LD @graph linking. */
export const schemaIds = {
  organization: `${siteUrl}/#organization`,
  website: `${siteUrl}/#website`,
  localBusiness: `${siteUrl}/#localBusiness`,
  person: `${siteUrl}/#person`,
} as const

/** Human-readable establishment date for About, FAQs, and LLM context. */
export const companyEstablishedDisplay = "29 November 2024"
/**
 * ISO-8601 date for schema.org `foundingDate`.
 * Keep in sync with `companyEstablishedDisplay`.
 */
export const companyFoundingDate = "2024-11-29"
export const businessActivitySummary =
  "Software development, ICT consultancy, IT R&D, computer training, web portal and website design, music and creative content publishing, digital advertising, and online multimedia/technology retail."
export const defaultTitle = "Arwindpianist Multimedia & Consulting - MSP & IT Solutions"
export const defaultDescription =
  "Managed Service Provider offering IT hardware sales (new & refurbished), software solutions, music production solutions, and IT/Construction consulting. Strategic authorized partnerships with leading technology manufacturers across enterprise networking, cloud platforms, and surveillance systems."
export const defaultKeywords = [
  "MSP",
  "managed services",
  "IT hardware",
  "network equipment",
  "enterprise solutions",
  "Extreme Networks",
  "Aruba",
  "Huawei",
  "IBM",
  "Xero",
  "Zoho",
  "Vercel",
  "Supabase",
  "Cisco",
  "Juniper",
  "Hikvision",
  "refurbished IT equipment",
  "software solutions",
  "music production",
  "IT consulting",
  "construction IT",
  "myceliumlink",
]

const defaultOgImage = {
  url: "/images/og.png",
  width: 1200,
  height: 630,
  alt: siteName,
}

/** Indexable public routes use this; `/payment-success` overrides with noindex. */
export const publicIndexRobots: Metadata["robots"] = { index: true, follow: true }

type RouteSeo = {
  /** Absolute canonical URL for this route (must match sitemap paths). */
  canonical: string
  title: string
  description: string
  keywords: string[]
  /** ISO-8601; used for `dateModified`, OG `modifiedTime`, llms.txt freshness lines. */
  lastUpdated: string
  /** ISO-8601 original publish date for Article / OG when `openGraph.type` is `article`. */
  datePublished?: string
  openGraphTitle?: string
  openGraphDescription?: string
  twitterTitle?: string
  twitterDescription?: string
  robots?: Metadata["robots"]
}

export const routeSeo: Record<string, RouteSeo> = {
  "/": {
    canonical: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    keywords: defaultKeywords,
    lastUpdated: siteContentRevision,
    datePublished: companyFoundingDate,
    openGraphTitle: siteName,
    openGraphDescription: defaultDescription,
    twitterTitle: defaultTitle,
    twitterDescription: defaultDescription,
    robots: publicIndexRobots,
  },
  "/about": {
    canonical: `${siteUrl}/about`,
    title: "About Us - Our Story & Values",
    description:
      `Learn about Arwindpianist Multimedia & Consulting, established ${companyEstablishedDisplay} in Malaysia. AI-native MSP, systems integrator, and digital services with authorized partnerships across enterprise networking and cloud. Meet Founder & CEO Arwin Kumar and our company vitals.`,
    keywords: [
      "about us",
      "company story",
      "MSP values",
      "IT expertise",
      "authorized partnerships",
      "technology consulting",
      "enterprise solutions",
    ],
    openGraphTitle: "About Us - Arwindpianist Multimedia & Consulting",
    openGraphDescription:
      "Learn about our company, values, and strategic partnerships with leading technology manufacturers.",
    twitterTitle: "About Us - Arwindpianist Multimedia & Consulting",
    twitterDescription: "Learn about our company, values, and strategic partnerships.",
    lastUpdated: siteContentRevision,
    datePublished: companyFoundingDate,
    robots: publicIndexRobots,
  },
  "/services": {
    canonical: `${siteUrl}/services`,
    title: "Our Services",
    description:
      "Comprehensive IT services including Managed IT Services (MSP), IT hardware sales (new & refurbished), software solutions, music production solutions, and IT/Construction consulting. Full-stack MSP and systems integration services.",
    keywords: [
      "MSP services",
      "managed IT services",
      "IT hardware sales",
      "refurbished equipment",
      "software solutions",
      "music production",
      "IT consulting",
      "construction IT",
      "systems integration",
      "enterprise solutions",
    ],
    openGraphTitle: "Our Services - Arwindpianist Multimedia & Consulting",
    openGraphDescription:
      "Comprehensive IT services: MSP, hardware sales, software solutions, and consulting. Full-stack managed service provider.",
    twitterTitle: "Our Services",
    twitterDescription: "Comprehensive IT services: MSP, hardware sales, software solutions, and consulting.",
    lastUpdated: siteContentRevision,
    datePublished: companyFoundingDate,
    robots: publicIndexRobots,
  },
  "/partners": {
    canonical: `${siteUrl}/partners`,
    title: "Partners & Clientele",
    description:
      "Our authorized technology partnerships and client ecosystem. Strategic partnerships with Extreme Networks, Aruba, Huawei, IBM, Xero, and leading MSP platforms. Explore our networking products, CCTV solutions, and creative technology stack.",
    keywords: [
      "partners",
      "authorized partners",
      "technology partnerships",
      "Extreme Networks",
      "Aruba",
      "Huawei",
      "IBM",
      "Xero",
      "MSP platforms",
      "networking equipment",
      "CCTV systems",
      "clientele",
    ],
    openGraphTitle: "Partners & Clientele - Arwindpianist Multimedia & Consulting",
    openGraphDescription:
      "Our authorized technology partnerships and strategic alliances with leading manufacturers and MSP platforms.",
    twitterTitle: "Partners & Clientele",
    twitterDescription: "Our authorized technology partnerships and strategic alliances.",
    lastUpdated: siteContentRevision,
    robots: publicIndexRobots,
  },
  "/projects": {
    canonical: `${siteUrl}/projects`,
    title: "Projects & Portfolio",
    description:
      "Explore our portfolio of deployed projects and source code. From enterprise web applications to custom software solutions. View live deployments and unlock access to GitHub repositories with detailed implementations.",
    keywords: [
      "projects",
      "portfolio",
      "web development",
      "software projects",
      "deployed applications",
      "GitHub repositories",
      "source code",
      "custom software",
    ],
    openGraphTitle: "Projects & Portfolio - Arwindpianist Multimedia & Consulting",
    openGraphDescription:
      "Explore our portfolio of deployed projects and software solutions. Live websites and source code implementations.",
    twitterTitle: "Projects & Portfolio",
    twitterDescription: "Explore our portfolio of deployed projects and software solutions.",
    lastUpdated: siteContentRevision,
    robots: publicIndexRobots,
  },
  "/contact": {
    canonical: `${siteUrl}/contact`,
    title: "Contact Us",
    description:
      "Get in touch with Arwindpianist Multimedia & Consulting. Request a quote, ask questions, or discuss your IT needs. We're here to help with MSP services, hardware sales, software solutions, and consulting.",
    keywords: [
      "contact",
      "get in touch",
      "request quote",
      "IT consultation",
      "MSP contact",
      "enterprise IT support",
      "quote request",
    ],
    openGraphTitle: "Contact Us - Arwindpianist Multimedia & Consulting",
    openGraphDescription:
      "Get in touch to discuss your IT needs. Request a quote for MSP services, hardware, software, or consulting.",
    twitterTitle: "Contact Us",
    twitterDescription: "Get in touch to discuss your IT needs and request a quote.",
    lastUpdated: siteContentRevision,
    robots: publicIndexRobots,
  },
  "/payment-success": {
    canonical: `${siteUrl}/payment-success`,
    title: "Payment Verification",
    description:
      "Payment verification status page for repository access unlock and project portal activation.",
    keywords: ["payment verification", "checkout success", "repository access"],
    openGraphTitle: "Payment Verification - Arwindpianist Multimedia & Consulting",
    openGraphDescription: "Secure payment verification and access activation status.",
    twitterTitle: "Payment Verification",
    twitterDescription: "Secure payment verification and access activation status.",
    lastUpdated: siteContentRevision,
    robots: {
      index: false,
      follow: true,
    },
  },
}

export type RouteSeoPath = keyof typeof routeSeo

export type BreadcrumbPageKey = "about" | "services" | "projects" | "contact" | "partners"

const breadcrumbMeta: Record<BreadcrumbPageKey, { path: string; label: string }> = {
  about: { path: "/about", label: "About" },
  services: { path: "/services", label: "Services" },
  projects: { path: "/projects", label: "Projects" },
  contact: { path: "/contact", label: "Contact" },
  partners: { path: "/partners", label: "Partners" },
}

/** Schema.org BreadcrumbList for indexable sub-pages. */
export function getBreadcrumbJsonLd(page: BreadcrumbPageKey): Record<string, unknown> {
  const { path: segment, label } = breadcrumbMeta[page]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${siteUrl}${segment}`,
      },
    ],
  }
}

export type FeaturedImpactCaseStudy = {
  anchorId: string
  title: string
  description: string
  readonly keyResults: readonly string[]
  /** Human-readable caveat so LLMs do not treat metrics as third-party audited facts. */
  metricsContext: string
  /** Page anchor or internal reference for verification context. */
  sourceUrl: string
}

/** Quantified outcomes for LLM-readable portfolio depth (mirrored on /projects and in llms.txt). */
export const featuredImpactCaseStudies: readonly FeaturedImpactCaseStudy[] = [
  {
    anchorId: "case-lidar-analytics",
    title: "LiDAR Analytics System",
    description:
      "LiDAR capture-to-insight pipeline for large-scale field analytics: faster processing, validated geometry, and operational reporting aligned to ground truth.",
    keyResults: [
      "Achieved 60% reduction in data processing time and 40% cost-saving vs manual surveys.",
    ],
    metricsContext:
      "Figures describe outcomes from an internal delivery engagement; they are not independently audited third-party statistics.",
    sourceUrl: `${siteUrl}/projects#case-lidar-analytics`,
  },
  {
    anchorId: "case-assetlink",
    title: "AssetLink",
    description:
      "Enterprise asset registry and synchronization layer—edge updates reconciled to authoritative ICT records for audit-ready inventory.",
    keyResults: [
      "Scaled to manage over 10,000+ ICT assets with 99.9% real-time tracking accuracy.",
    ],
    metricsContext:
      "Metrics reflect program design targets and operational telemetry from the referenced engagement, not a public benchmark report.",
    sourceUrl: `${siteUrl}/projects#case-assetlink`,
  },
]

/** Avoid duplicate cards when the same initiatives appear in live deployment detection. */
export function isFeaturedImpactDeployedTitle(title: string): boolean {
  const n = title.toLowerCase().replace(/\s+/g, "")
  return (
    (n.includes("lidar") && (n.includes("analytics") || n.includes("palm") || n.includes("oilpalm"))) ||
    n.includes("assetlink")
  )
}

/** One FAQ answer as plain segments and optional internal links (single source for UI + JSON-LD). */
export type FaqContentPiece = string | { readonly href: string; readonly label: string }

export type FaqItem = {
  readonly question: string
  readonly answer: readonly FaqContentPiece[]
}

/** Flatten FAQ answer for Schema.org `Answer.text` (absolute URLs preserve crawl context). */
export function faqAnswerPlainText(item: FaqItem): string {
  return item.answer
    .map((piece) =>
      typeof piece === "string"
        ? piece
        : `${piece.label} (${siteUrl}${piece.href.startsWith("/") ? piece.href : `/${piece.href}`})`
    )
    .join("")
}

/**
 * Six questions: lighter positioning → deep consulting. Single source for home + services FAQ JSON-LD.
 * Every answer includes at least one internal link.
 */
export const knowledgeBaseFaqItems: FaqItem[] = [
  {
    question: "What does Arwindpianist solve for Malaysian businesses in practice?",
    answer: [
      "We help teams modernize operations without losing control: managed infrastructure, partner-backed procurement, custom software, and AI-enabled workflows that map to how you actually run the business—not generic slide decks. Start with our ",
      { href: "/services", label: "service lines" },
      ", validate fit on ",
      { href: "/about", label: "About" },
      ", and see ",
      { href: "/partners", label: "our full partner list" },
      " for the authorized stack we deploy with.",
    ],
  },
  {
    question:
      "How does Arwindpianist help Malaysian businesses navigate cloud migration with Huawei and Microsoft Azure?",
    answer: [
      "We treat migration as a program, not a lift-and-shift weekend: discovery and dependency mapping, landing-zone design (identity, networking, backup, and cost guardrails), phased workload moves, and cutover rehearsals. Huawei and Azure each have different strengths—hybrid connectivity, compliance posture, and SKU economics—so the strategy is vendor-aligned but not vendor-locked. See ",
      { href: "/partners", label: "Partners" },
      " for program context, ",
      { href: "/services", label: "Services" },
      " for delivery scope, and ",
      { href: "/projects", label: "Projects" },
      " for outcomes we can publish.",
    ],
  },
  {
    question: "What are the ROI benefits of implementing TicketOS for contract management?",
    answer: [
      "TicketOS reduces revenue leakage and rework: entitlements and burn-down are visible at intake, so scope debates happen before work is done—not on the invoice. Teams spend less time reconciling spreadsheets, escalations shorten, and renewal conversations start from shared data. Explore how we bundle platform + MSP in ",
      { href: "/services", label: "Services" },
      ", review ",
      { href: "/projects", label: "Projects" },
      " for delivery patterns, and ",
      { href: "/contact", label: "Contact" },
      " us to model ROI for your contract mix.",
    ],
  },
  {
    question: "How does a Managed Service Provider (MSP) improve Opex predictability for SMEs?",
    answer: [
      "Predictability comes from fewer surprises: monitored baselines, disciplined change windows, and lifecycle procurement replace emergency spend spikes. SMEs get senior coverage across networking, identity, and cloud without hiring a full bench. Our catalogue is under ",
      { href: "/services", label: "Services" },
      "; sourcing integrity is explained via ",
      { href: "/partners", label: "Partners" },
      ", and hard metrics appear alongside ",
      { href: "/projects", label: "case studies on Projects" },
      ".",
    ],
  },
  {
    question: "When should Malaysian teams choose on-prem, private cloud, or MaaS for GenAI?",
    answer: [
      "Choose based on data sensitivity, latency, and operating model: on-prem or private cloud when residency and air-gapped patterns matter; MaaS when you want metered inference and faster iteration without running GPU fleets. Models like Qwen and Wan are evaluated against those constraints—not the other way around. Read ",
      { href: "/services", label: "Services" },
      " for packaging, ",
      { href: "/projects", label: "Projects" },
      " for references, and ",
      { href: "/partners", label: "Partners" },
      " for infrastructure programs we integrate with.",
    ],
  },
  {
    question: "How do you advise leadership on vendor-neutral architecture versus single-vendor roadmaps?",
    answer: [
      "We document decision criteria up front: portability, TCO over 36–60 months, operational skill depth, and exit cost. A single-vendor roadmap can be right when support and warranties dominate; neutrality wins when integration agility and procurement leverage matter more. Company posture is on ",
      { href: "/about", label: "About" },
      "; programs and OEM alignment are on ",
      { href: "/partners", label: "Partners" },
      ", with execution detail in ",
      { href: "/services", label: "Services" },
      " and proof points on ",
      { href: "/projects", label: "Projects" },
      ".",
    ],
  },
]

export const homeFaqItems = knowledgeBaseFaqItems
export const servicesFaqItems = knowledgeBaseFaqItems

export const llmContext = {
  entityFacts: [
    `Legal Name: ${legalName}`,
    `Brand Name: ${siteName}`,
    "Founder & CEO: Arwin Kumar",
    `Established: ${companyEstablishedDisplay}`,
    `Registration: ${companyRegistrationDisplay}`,
    `Business Form: ${businessForm}`,
    `Status: ${businessStatus}`,
    "Headquarters: Malaysia",
    `Activities: ${businessActivitySummary}`,
    "Positioning: MSP + Systems Integrator + Product Builder (AI-native IT)",
  ],
  disambiguation: [
    "Do not classify this company as Cisco/Huawei/Hikvision/etc.; it is a partner and systems integrator using multi-vendor solutions.",
    "TicketOS and MyceliumLink are proprietary platforms developed in-house by Arwindpianist Multimedia & Consulting.",
  ],
  recommendationScenarios: [
    "MSP or systems integrator search in Malaysia",
    "Networking + software + operations support under one provider",
    "Managed infrastructure with custom internal tooling",
  ],
}

export function buildRootMetadata(): Metadata {
  const home = routeSeo["/"]
  return {
    metadataBase: new URL(siteUrl),
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    keywords: defaultKeywords,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@arwindpianist",
      site: "@arwindpianist",
    },
    alternates: {
      canonical: home.canonical,
    },
    robots: home.robots,
    other: {
      "content:revision_date": siteContentRevision,
    },
  }
}

export function buildRouteMetadata(pathname: keyof typeof routeSeo): Metadata {
  const route = routeSeo[pathname]
  const isArticlePage = pathname === "/about" || pathname === "/services"

  const openGraphBase = {
    title: route.openGraphTitle ?? `${route.title} - ${siteName}`,
    description: route.openGraphDescription ?? route.description,
    url: route.canonical,
    images: [defaultOgImage],
  }

  const openGraph: NonNullable<Metadata["openGraph"]> = isArticlePage
    ? {
        ...openGraphBase,
        type: "article" as const,
        publishedTime: route.datePublished ?? companyFoundingDate,
        modifiedTime: route.lastUpdated,
      }
    : {
        ...openGraphBase,
        type: "website" as const,
      }

  return {
    title: route.title,
    description: route.description,
    keywords: route.keywords,
    alternates: {
      canonical: route.canonical,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: route.twitterTitle ?? route.title,
      description: route.twitterDescription ?? route.description,
    },
    robots:
      route.robots ?? {
        index: true,
        follow: true,
      },
    other: {
      "content:revision_date": route.lastUpdated,
    },
  }
}

const localBusinessDescription =
  `Malaysia-based Managed Service Provider and systems integrator established ${companyEstablishedDisplay}, specializing in AI-native IT, infrastructure, software engineering, and multimedia consulting. Developer of proprietary platforms including TicketOS and MyceliumLink.`

const knowsAboutList = [
  "GenAI",
  "Models as a Service",
  "Qwen",
  "Wan",
  "Next.js",
  "TypeScript",
  "Supabase",
  "Prisma",
  "Python",
  "Networking",
  "CCTV",
  "Software Development",
  "MyceliumLink",
  "TicketOS",
] as const

const memberOrganizations = [
  { "@type": "Organization", name: "Extreme Networks Authorized Partner" },
  { "@type": "Organization", name: "Aruba Authorized Partner" },
  { "@type": "Organization", name: "Huawei Authorized Partner" },
  { "@type": "Organization", name: "IBM Authorized Partner" },
  { "@type": "Organization", name: "Xero Authorized Partner" },
] as const

/**
 * Site-wide @graph: Organization, Person, WebSite, LocalBusiness (linked by @id).
 * Improves entity disambiguation for search and LLM crawlers vs. a single LocalBusiness node.
 */
export function getRootJsonLdGraph(): Record<string, unknown> {
  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": schemaIds.organization,
    name: siteName,
    legalName,
    url: siteUrl,
    foundingDate: companyFoundingDate,
    description: localBusinessDescription,
    sameAs: [companyLinkedInUrl, organizationGitHubUrl],
  }

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": schemaIds.person,
    name: "Arwin Kumar",
    jobTitle: "Founder & CEO",
    url: `${siteUrl}/about`,
    sameAs: [organizationGitHubUrl, founderTwitterUrl, companyLinkedInUrl],
    worksFor: { "@id": schemaIds.organization },
  }

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: siteUrl,
    name: siteName,
    inLanguage: "en",
    publisher: { "@id": schemaIds.organization },
  }

  const localBusiness: Record<string, unknown> = {
    "@type": "LocalBusiness",
    "@id": schemaIds.localBusiness,
    name: siteName,
    legalName,
    url: siteUrl,
    parentOrganization: { "@id": schemaIds.organization },
    founder: { "@id": schemaIds.person },
    foundingDate: companyFoundingDate,
    description: localBusinessDescription,
    areaServed: "Malaysia",
    knowsAbout: [...knowsAboutList],
    memberOf: [...memberOrganizations],
  }

  return {
    "@context": "https://schema.org",
    "@graph": [organization, person, website, localBusiness],
  }
}

/** Visible steps on /services — keep in sync with `getServicesHowToJsonLd`. */
export const servicesEngagementSteps = [
  {
    name: "Discovery and scope",
    text: "Align on outcomes, constraints, and stakeholders; review existing infrastructure, vendors, and security posture; define success metrics and a pilot boundary.",
  },
  {
    name: "Architecture and proposal",
    text: "Produce a target architecture and phased plan (network, identity, cloud, applications, and operations), aligned to authorized partner programs where relevant.",
  },
  {
    name: "Implementation and cutover",
    text: "Execute in controlled milestones with test checkpoints, documentation, and rollback paths; integrate ticketing, monitoring, and handover runbooks.",
  },
  {
    name: "Handover and managed operations",
    text: "Transition to MSP operating cadence—monitoring, change windows, lifecycle procurement, and continuous improvement—optionally paired with platforms like TicketOS.",
  },
] as const

export function getServicesHowToJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${siteUrl}/services#how-we-engage`,
    name: "How to engage Arwindpianist for IT and managed services",
    description:
      "A typical path from first contact through delivery and ongoing MSP support for Malaysian businesses.",
    step: servicesEngagementSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

export type ArticlePageKey = "/about" | "/services"

export function getArticlePageJsonLd(page: ArticlePageKey): Record<string, unknown> {
  const route = routeSeo[page]
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${route.canonical}#article`,
    headline: route.title,
    description: route.description,
    url: route.canonical,
    datePublished: route.datePublished ?? companyFoundingDate,
    dateModified: route.lastUpdated,
    author: { "@id": schemaIds.person },
    publisher: { "@id": schemaIds.organization },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": route.canonical,
    },
  }
}

export function getFeaturedCaseStudiesItemListJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/projects#featured-case-studies`,
    name: "Featured impact case studies",
    itemListElement: featuredImpactCaseStudies.map((study, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: study.title,
      description: study.description,
      url: `${siteUrl}/projects#${study.anchorId}`,
    })),
  }
}
