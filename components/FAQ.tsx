import Link from "next/link"
import type { FaqItem } from "@/lib/site-seo"
import { faqAnswerPlainText, siteUrl } from "@/lib/site-seo"

type FAQProps = {
  items: FaqItem[]
  /** Anchor id for deep links, e.g. #faq */
  id?: string
  heading?: string
  /** Path for JSON-LD @id (e.g. "/#faq" or "/services#faq") */
  jsonLdPath?: string
}

function FaqAnswerBody({ item }: { item: FaqItem }) {
  return (
    <>
      {item.answer.map((piece, i) =>
        typeof piece === "string" ? (
          <span key={i}>{piece}</span>
        ) : (
          <Link
            key={i}
            href={piece.href}
            className="text-teal-400 hover:text-teal-300 underline underline-offset-2"
          >
            {piece.label}
          </Link>
        )
      )}
    </>
  )
}

export default function FAQ({
  items,
  id = "faq",
  heading = "Frequently asked questions",
  jsonLdPath = "/#faq",
}: FAQProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}${jsonLdPath}`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqAnswerPlainText(item),
      },
    })),
  }

  const jsonLdString = JSON.stringify(faqJsonLd)

  return (
    <section
      id={id}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"
      aria-labelledby={`${id}-heading`}
    >
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- required for FAQPage JSON-LD per product spec
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
      <h2
        id={`${id}-heading`}
        className="text-2xl md:text-4xl font-bold text-center mb-10 md:mb-12"
      >
        {heading}
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item) => (
          <details key={item.question} className="faq-neumorphic group overflow-hidden">
            <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <h3 className="text-base md:text-lg font-semibold text-gray-100 text-left pr-2 leading-snug">
                {item.question}
              </h3>
              <span
                className="text-teal-400 text-xl leading-none shrink-0 group-open:rotate-45 transition-transform"
                aria-hidden
              >
                +
              </span>
            </summary>
            <div className="px-5 pb-5 pt-0 text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/[0.06]">
              <p className="pt-4">
                <FaqAnswerBody item={item} />
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
