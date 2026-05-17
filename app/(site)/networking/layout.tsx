import type { Metadata } from "next"

import ArticleJsonLd from "@/components/ArticleJsonLd"
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd"
import { buildRouteMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildRouteMetadata("/networking")

export default function NetworkingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd capability={{ path: "/networking", label: "Networking & field systems" }} />
      <ArticleJsonLd page="/networking" />
      {children}
    </>
  )
}
