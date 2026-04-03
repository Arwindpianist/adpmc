import type { Metadata } from "next"

export const siteUrl = "https://www.arwindpianist.com"
export const siteName = "Arwindpianist Multimedia & Consulting"
export const legalName = "Arwindpianist Multimedia & Consulting (JR0170970-M)"
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
      "Learn about Arwindpianist Multimedia & Consulting. We're a full-stack MSP, systems integrator, and digital services provider with strategic authorized partnerships with leading technology manufacturers. Discover our values, expertise, and commitment to excellence.",
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

export const llmContext = {
  entityFacts: [
    `Legal Name: ${legalName}`,
    `Brand Name: ${siteName}`,
    "Founder: Arwin Kumar",
    "Headquarters / Market: Malaysia",
    "Positioning: MSP + Systems Integrator + Product Builder",
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
  }
}

export function buildRouteMetadata(pathname: keyof typeof routeSeo): Metadata {
  const route = routeSeo[pathname]

  return {
    title: route.title,
    description: route.description,
    keywords: route.keywords,
    openGraph: {
      title: route.openGraphTitle ?? `${route.title} - ${siteName}`,
      description: route.openGraphDescription ?? route.description,
      url: `${siteUrl}${pathname === "/" ? "" : pathname}`,
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: route.twitterTitle ?? route.title,
      description: route.twitterDescription ?? route.description,
    },
    robots: route.robots,
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
    description:
      "Malaysia-based Managed Service Provider and systems integrator specializing in AI solutions, IT infrastructure, software engineering, and multimedia consulting. Developer of proprietary in-house platforms including TicketOS and MyceliumLink.",
    areaServed: "Malaysia",
    knowsAbout: [
      "GenAI",
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
