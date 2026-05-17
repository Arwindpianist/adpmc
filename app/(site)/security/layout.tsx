import type { Metadata } from "next"

import ArticleJsonLd from "@/components/ArticleJsonLd"
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd"
import { buildRouteMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildRouteMetadata("/security")

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd capability={{ path: "/security", label: "Security & surveillance integration" }} />
      <ArticleJsonLd page="/security" />
      {children}
    </>
  )
}
