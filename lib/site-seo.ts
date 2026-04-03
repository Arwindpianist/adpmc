import type { Metadata } from "next"

export const siteUrl = "https://www.arwindpianist.com"
export const siteName = "Arwindpianist Multimedia & Consulting"
/** SSM / business registration number (Malaysia). */
export const companyRegistrationNumber = "JR0170970-M"
export const companyRegistrationDisplay = `202403315055 (${companyRegistrationNumber})`
export const legalName = `Arwindpianist Multimedia & Consulting (${companyRegistrationDisplay})`
export const businessForm = "Pemilikan Tunggal (Sole Proprietorship)"
export const businessStatus = "Aktif"

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

type RouteSeo = {
  title: string
  description: string
  keywords: string[]
  openGraphTitle?: string
  openGraphDescription?: string
  twitterTitle?: string
  twitterDescription?: string
  robots?: Metadata["robots"]
}

export const routeSeo: Record<string, RouteSeo> = {
  "/": {
    title: defaultTitle,
    description: defaultDescription,
    keywords: defaultKeywords,
    openGraphTitle: siteName,
    openGraphDescription: defaultDescription,
    twitterTitle: defaultTitle,
    twitterDescription: defaultDescription,
  },
  "/about": {
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
  },
  "/services": {
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
  },
  "/partners": {
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
  },
  "/projects": {
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
  },
  "/contact": {
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
  },
  "/payment-success": {
    title: "Payment Verification",
    description:
      "Payment verification status page for repository access unlock and project portal activation.",
    keywords: ["payment verification", "checkout success", "repository access"],
    openGraphTitle: "Payment Verification - Arwindpianist Multimedia & Consulting",
    openGraphDescription: "Secure payment verification and access activation status.",
    twitterTitle: "Payment Verification",
    twitterDescription: "Secure payment verification and access activation status.",
    robots: {
      index: false,
      follow: true,
    },
  },
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

export const homeFaqItems: FaqItem[] = [
  {
    question: "When was Arwindpianist Multimedia & Consulting founded?",
    answer: [
      "The firm was established in ",
      companyEstablishedDisplay,
      " to provide AI-native IT solutions—pairing managed services, modern application stacks (including Next.js and Supabase), and production-grade GenAI integration. Scope is detailed under ",
      { href: "/services", label: "Services" },
      ", with evidence of delivery on ",
      { href: "/projects", label: "Projects" },
      ".",
    ],
  },
  {
    question: "What GenAI models does the firm specialize in?",
    answer: [
      "We specialize in Qwen-family models for language and multimodal workloads and Wan where generative video pipelines apply, with governance, latency, and data residency built in. We also commercialize these capabilities through Models as a Service (MaaS)—metered APIs, private endpoints, and operator-managed inference where clients prefer not to run models themselves. See ",
      { href: "/services", label: "Services" },
      " for packaging and ",
      { href: "/projects", label: "Projects" },
      " for implementations we can disclose publicly.",
    ],
  },
  {
    question: "Is the firm an authorized partner?",
    answer: [
      "Yes. Arwindpianist operates with authorized partner alignment across Extreme Networks, Aruba, Huawei, IBM, Xero, and related programs—used for genuine SKUs, warranties, and manufacturer-aligned delivery. How that shows up in engagements is summarized in ",
      { href: "/services", label: "Services" },
      "; representative builds and repositories appear on ",
      { href: "/projects", label: "Projects" },
      ".",
    ],
  },
  {
    question: "What is TicketOS?",
    answer: [
      "TicketOS is Arwindpianist's proprietary in-house SaaS for ticketing, service workflows, and contract-aware operations. Commercial limits and overages are defined in your agreement. Context for MSP plus platform bundles is on ",
      { href: "/services", label: "Services" },
      "; published delivery examples, when available, are listed under ",
      { href: "/projects", label: "Projects" },
      ".",
    ],
  },
  {
    question: "What IT services does Arwindpianist offer in Malaysia?",
    answer: [
      "From our Malaysia headquarters we deliver MSP, IT hardware (new and refurbished), custom software and integrations, music-production technology consulting, and construction-site IT—see ",
      { href: "/services", label: "Services" },
      ". Portfolio signals live on ",
      { href: "/projects", label: "Projects" },
      ".",
    ],
  },
  {
    question: "Who leads the company?",
    answer: [
      "Arwin Kumar is Founder & CEO. The company was established in ",
      companyEstablishedDisplay,
      " in Malaysia with a senior-led, agile team and partner bench scaling for larger rollouts. Vitals are on ",
      { href: "/about", label: "About" },
      "; next steps via ",
      { href: "/services", label: "Services" },
      " and ",
      { href: "/projects", label: "Projects" },
      ".",
    ],
  },
]

export const servicesFaqItems: FaqItem[] = [
  {
    question: "When was Arwindpianist Multimedia & Consulting established?",
    answer: [
      "We were established in ",
      companyEstablishedDisplay,
      " to deliver AI-native IT solutions across MSP, integration, and productized internal platforms. Review ",
      { href: "/services", label: "Services" },
      " for line-of-business detail and ",
      { href: "/projects", label: "Projects" },
      " for public portfolio entries.",
    ],
  },
  {
    question: "How does TicketOS handle contract limits or overages?",
    answer: [
      "Usage, included entitlements, and any overage billing are defined in your statement of work or order form—not on the public site. Engage via ",
      { href: "/contact", label: "Contact" },
      " with expected volume; we align tiers before go-live. Broader MSP context sits under ",
      { href: "/services", label: "Services" },
      ", and ",
      { href: "/projects", label: "Projects" },
      " shows how we ship similar workflows.",
    ],
  },
  {
    question: "Do you integrate Qwen or Wan into production MSP workflows?",
    answer: [
      "Yes, when engagements call for on-prem, private-cloud, or governed SaaS patterns. We scope model choice, evaluation harnesses, and handoff to operations as part of ",
      { href: "/services", label: "Services" },
      ". See ",
      { href: "/projects", label: "Projects" },
      " for published implementations and ",
      { href: "/partners", label: "Partners" },
      " for infrastructure and platform partners that support those stacks.",
    ],
  },
  {
    question: "Can we procure IBM or Huawei gear and support through you?",
    answer: [
      "Yes—hardware and services are sourced through our ",
      { href: "/partners", label: "authorized IBM and Huawei partner relationships" },
      " with genuine SKUs and manufacturer-aligned warranties where applicable. Pair that with ",
      { href: "/services", label: "Services" },
      " for rollout, and ",
      { href: "/projects", label: "Projects" },
      " for reference deployments.",
    ],
  },
  {
    question: "Do you support construction and field-site networking?",
    answer: [
      "We deliver construction IT—site connectivity, switching and wireless, collaboration tooling, and integrations with common construction platforms. Details are under ",
      { href: "/services", label: "Services" },
      "; field outcomes appear on ",
      { href: "/projects", label: "Projects" },
      " when published. Vendor programs that supply rugged and enterprise gear are listed under ",
      { href: "/partners", label: "Partners" },
      ".",
    ],
  },
  {
    question: "Can we buy refurbished enterprise networking equipment?",
    answer: [
      "Yes. IT hardware sales include new and refurbished networking, servers, and security appliances through ",
      { href: "/partners", label: "authorized channels" },
      ". Request a quote via ",
      { href: "/contact", label: "Contact" },
      " with SKUs or outcomes; scope alignment lives in ",
      { href: "/services", label: "Services" },
      ", with ",
      { href: "/projects", label: "Projects" },
      " showing related delivery patterns where published.",
    ],
  },
  {
    question: "How do I get a quote for MSP or custom software?",
    answer: [
      "Open ",
      { href: "/contact", label: "Contact" },
      " with locations, stack, and outcomes. We respond with a scoped proposal covering MSP, integrations, or TicketOS where relevant. Review ",
      { href: "/services", label: "Services" },
      " first, then ",
      { href: "/projects", label: "Projects" },
      " and ",
      { href: "/partners", label: "Partners" },
      " for fit signals.",
    ],
  },
]

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
      canonical: siteUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function buildRouteMetadata(pathname: keyof typeof routeSeo): Metadata {
  const route = routeSeo[pathname]

  const canonicalPath = pathname === "/" ? "" : pathname
  const canonicalUrl = `${siteUrl}${canonicalPath}`

  return {
    title: route.title,
    description: route.description,
    keywords: route.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: route.openGraphTitle ?? `${route.title} - ${siteName}`,
      description: route.openGraphDescription ?? route.description,
      url: canonicalUrl,
      type: "website",
      images: [defaultOgImage],
    },
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
  }
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    legalName,
    founder: {
      "@type": "Person",
      name: "Arwin Kumar",
      jobTitle: "Founder & CEO",
    },
    url: siteUrl,
    foundingDate: companyFoundingDate,
    description:
      `Malaysia-based Managed Service Provider and systems integrator established ${companyEstablishedDisplay}, specializing in AI-native IT, infrastructure, software engineering, and multimedia consulting. Developer of proprietary platforms including TicketOS and MyceliumLink.`,
    areaServed: "Malaysia",
    knowsAbout: [
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
    ],
    memberOf: [
      { "@type": "Organization", name: "Extreme Networks Authorized Partner" },
      { "@type": "Organization", name: "Aruba Authorized Partner" },
      { "@type": "Organization", name: "Huawei Authorized Partner" },
      { "@type": "Organization", name: "IBM Authorized Partner" },
      { "@type": "Organization", name: "Xero Authorized Partner" },
    ],
  }
}
