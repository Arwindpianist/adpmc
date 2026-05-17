import InquiryForm from "@/components/InquiryForm"
import { SectionIntro } from "@/components/site/section-intro"

const contactChannels = [
  {
    label: "Email",
    value: "hello@arwindpianist.com",
    href: "mailto:hello@arwindpianist.com",
  },
  {
    label: "Phone",
    value: "+60 11-1481 5030",
    href: "tel:+601114815030",
  },
] as const

export default function ContactPage() {
  return (
    <div className="px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-32">
          <SectionIntro
            eyebrow="Contact"
            title="Start with the problem, not the proposal."
            description="Share the operating bottleneck, the product idea, or the infrastructure brief. We’ll respond with the next useful move."
          />
          <div className="surface-card-soft rounded-[2rem] p-6">
            <p className="section-kicker">Direct channels</p>
            <div className="mt-5 space-y-4">
              {contactChannels.map((channel) => (
                <div key={channel.label}>
                  <p className="text-sm text-zinc-500">{channel.label}</p>
                  <a href={channel.href} className="mt-2 inline-block text-base font-medium text-white transition hover:text-zinc-300">
                    {channel.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="surface-card-soft rounded-[2rem] p-6">
            <p className="section-kicker">Book a call</p>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Need a live discovery session? Reserve a paid 30-minute slot with calendar availability and Razorpay Curlec
              checkout.
            </p>
            <a
              href="/book-call"
              className="mt-4 inline-flex text-sm font-medium text-dracula-purple transition hover:text-dracula-pink"
            >
              Schedule consultation
            </a>
          </div>
          <div className="surface-card-soft rounded-[2rem] p-6">
            <p className="section-kicker">Typical responses</p>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              New inquiries usually receive a first response within one business day. Complex scopes may follow with a
              discovery call or a tighter written brief before proposal.
            </p>
          </div>
        </div>

        <InquiryForm submitLabel="Send inquiry" />
      </div>
    </div>
  )
}
