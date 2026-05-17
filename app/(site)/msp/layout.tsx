import type { Metadata } from "next"

import ArticleJsonLd from "@/components/ArticleJsonLd"
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd"
import { buildRouteMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildRouteMetadata("/msp")

export default function MspLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd capability={{ path: "/msp", label: "MSP & procurement" }} />
      <ArticleJsonLd page="/msp" />
      {children}
    </>
  )
}
