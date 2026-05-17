import type { Metadata } from "next"

import ArticleJsonLd from "@/components/ArticleJsonLd"
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd"
import { buildRouteMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildRouteMetadata("/platforms")

export default function PlatformsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd capability={{ path: "/platforms", label: "Platforms & software factory" }} />
      <ArticleJsonLd page="/platforms" />
      {children}
    </>
  )
}
