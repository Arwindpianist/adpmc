import Link from "next/link"
import type { FaqItem } from "@/lib/site-seo"
import { faqAnswerPlainText, siteUrl } from "@/lib/site-seo"
import { SectionIntro } from "@/components/site/section-intro"

type FAQProps = {
  items: readonly FaqItem[]
  /** Anchor id for deep links, e.g. #knowledge-base */
  id?: string
  heading?: string
  /** Path for JSON-LD @id (e.g. "/#knowledge-base" or "/services#knowledge-base") */
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
            className="text-dracula-purple underline underline-offset-2 transition hover:text-dracula-pink"
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
  id = "knowledge-base",
  heading = "Knowledge base",
  jsonLdPath = "/#knowledge-base",
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
    <section id={id} className="min-w-0 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto w-full min-w-0 max-w-7xl">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- required for FAQPage JSON-LD per product spec
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
        <div id={`${id}-heading`}>
          <SectionIntro
            eyebrow="Knowledge base"
            title={heading}
            description="Answers to the positioning, delivery, and vendor strategy questions that come up most often."
            align="center"
          />
        </div>
        <div className="mx-auto mt-10 max-w-4xl space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-[1.75rem] border border-[rgba(189,147,249,0.15)] bg-[#0a0a0a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition-[border-color] duration-150 hover:border-[rgba(189,147,249,0.35)]"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center px-5 py-4 [&::-webkit-details-marker]:hidden sm:px-6 sm:py-5">
                <div className="flex w-full items-center justify-between gap-4">
                  <h3 className="pr-2 text-base font-semibold leading-snug text-zinc-50 sm:text-lg">{item.question}</h3>
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(189,147,249,0.2)] bg-[#050208] text-lg text-dracula-purple transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </div>
              </summary>
              <div className="border-t border-[rgba(189,147,249,0.12)] px-5 pb-5 pt-0 text-sm leading-relaxed text-[#c9b8e8]/90 sm:px-6 sm:text-base">
                <p className="pt-5">
                  <FaqAnswerBody item={item} />
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
