import { getServicesHowToJsonLd } from "@/lib/site-seo"

export default function ServicesHowToJsonLd() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- HowTo JSON-LD for GEO
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getServicesHowToJsonLd()) }}
    />
  )
}
