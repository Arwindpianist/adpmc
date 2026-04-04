import { getArticlePageJsonLd, type ArticlePageKey } from "@/lib/site-seo"

export default function ArticleJsonLd({ page }: { page: ArticlePageKey }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- Article JSON-LD for GEO
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticlePageJsonLd(page)) }}
    />
  )
}
