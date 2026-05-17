import BookCallForm from "@/components/BookCallForm"
import { SectionIntro } from "@/components/site/section-intro"
import TransitionLink from "@/components/TransitionLink"
import { CALL_BOOKING_AMOUNT_LABEL, CALL_BOOKING_DURATION } from "@/lib/call-booking"

export default function BookCallPage() {
  return (
    <div className="px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-32">
          <SectionIntro
            eyebrow="Consultation"
            title="Book a paid discovery call."
            description="Reserve a focused working session with our SI and MSP team. Slots respect Malaysia time and your live calendar availability."
          />
          <div className="surface-card-soft space-y-3 rounded-[2rem] p-6 text-sm leading-relaxed text-[#c9b8e8]/90">
            <p>
              <span className="font-medium text-zinc-50">Duration:</span> {CALL_BOOKING_DURATION}
            </p>
            <p>
              <span className="font-medium text-zinc-50">Fee:</span> {CALL_BOOKING_AMOUNT_LABEL} (paid upfront via
              Razorpay Curlec)
            </p>
            <p>
              Prefer email instead? Use the{" "}
              <TransitionLink href="/contact" className="text-dracula-purple hover:text-dracula-pink">
                contact form
              </TransitionLink>{" "}
              for async mobilization briefs.
            </p>
          </div>
        </div>

        <BookCallForm />
      </div>
    </div>
  )
}
