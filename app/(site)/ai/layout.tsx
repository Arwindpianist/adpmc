import type { Metadata } from "next"

import ArticleJsonLd from "@/components/ArticleJsonLd"
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd"
import { buildRouteMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildRouteMetadata("/ai")

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd capability={{ path: "/ai", label: "GenAI & Model-as-a-Service" }} />
      <ArticleJsonLd page="/ai" />
      {children}
    </>
  )
}
