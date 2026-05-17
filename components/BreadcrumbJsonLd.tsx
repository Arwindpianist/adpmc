import {
  getBreadcrumbJsonLd,
  getBreadcrumbTrailJsonLd,
  getCapabilityBreadcrumbTrail,
  type BreadcrumbPageKey,
} from "@/lib/site-seo"

type BreadcrumbProps =
  | { page: BreadcrumbPageKey; capability?: never }
  | { capability: { path: string; label: string }; page?: never }

export default function BreadcrumbJsonLd(props: BreadcrumbProps) {
  const schema =
    "capability" in props
      ? getBreadcrumbTrailJsonLd(getCapabilityBreadcrumbTrail(props.capability.path, props.capability.label))
      : getBreadcrumbJsonLd(props.page)

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- BreadcrumbList JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
