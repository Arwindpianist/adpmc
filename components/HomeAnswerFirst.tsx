import Link from "next/link"
import {
  businessActivitySummary,
  companyEstablishedDisplay,
  companyRegistrationDisplay,
  defaultDescription,
  legalName,
  siteName,
} from "@/lib/site-seo"

/**
 * Server-rendered answer-first block for home: entity, intent, and navigation hooks
 * before client-heavy marketing sections.
 */
export default function HomeAnswerFirst() {
  return (
    <section
      className="relative z-10 border-b border-white/[0.08] bg-black/40 backdrop-blur-sm"
      aria-labelledby="answer-first-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 max-w-4xl">
        <h2 id="answer-first-heading" className="sr-only">
          Who is Arwindpianist Multimedia &amp; Consulting and what do they offer?
        </h2>
        <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-4">
          <strong className="text-white font-semibold">{siteName}</strong> ({legalName}) is a Malaysia-based{" "}
          <strong className="text-teal-400 font-medium">managed service provider (MSP)</strong>,{" "}
          <strong className="text-teal-400 font-medium">systems integrator</strong>, and builder of in-house platforms
          including TicketOS and MyceliumLink. Established {companyEstablishedDisplay}. {defaultDescription}
        </p>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
          What you should know first
        </h3>
        <ul className="list-disc list-inside text-sm md:text-base text-gray-300 space-y-1.5 mb-4">
          <li>
            <strong className="text-gray-200">Registration:</strong> {companyRegistrationDisplay} (Malaysia).
          </li>
          <li>
            <strong className="text-gray-200">Core activities:</strong> {businessActivitySummary}
          </li>
          <li>
            <strong className="text-gray-200">Next steps:</strong> explore{" "}
            <Link href="/services" className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
              services
            </Link>
            ,{" "}
            <Link href="/partners" className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
              partners
            </Link>
            , and{" "}
            <Link href="/contact" className="text-teal-400 hover:text-teal-300 underline underline-offset-2">
              contact
            </Link>
            .
          </li>
        </ul>
      </div>
    </section>
  )
}
