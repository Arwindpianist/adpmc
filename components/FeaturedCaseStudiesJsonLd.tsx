import { getFeaturedCaseStudiesItemListJsonLd } from "@/lib/site-seo"

export default function FeaturedCaseStudiesJsonLd() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- ItemList JSON-LD for portfolio cases
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getFeaturedCaseStudiesItemListJsonLd()) }}
    />
  )
}
