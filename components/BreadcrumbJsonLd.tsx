import { getBreadcrumbJsonLd } from "@/lib/site-seo"

type BreadcrumbPage = "about" | "services" | "projects"

export default function BreadcrumbJsonLd({ page }: { page: BreadcrumbPage }) {
  const schema = getBreadcrumbJsonLd(page)
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- BreadcrumbList JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
