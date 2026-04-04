import { getBreadcrumbJsonLd, type BreadcrumbPageKey } from "@/lib/site-seo"

export default function BreadcrumbJsonLd({ page }: { page: BreadcrumbPageKey }) {
  const schema = getBreadcrumbJsonLd(page)
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- BreadcrumbList JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
