import type { Metadata } from "next"
import ArticleJsonLd from "@/components/ArticleJsonLd"
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd"
import ServicesHowToJsonLd from "@/components/ServicesHowToJsonLd"
import { buildRouteMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildRouteMetadata("/services")

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd page="services" />
      <ArticleJsonLd page="/services" />
      <ServicesHowToJsonLd />
      {children}
    </>
  )
}
