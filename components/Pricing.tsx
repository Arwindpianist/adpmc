import InquiryForm from "@/components/InquiryForm"
import { BentoCell, BentoGrid } from "@/components/bento"
import { SectionIntro } from "@/components/site/section-intro"

export default function Pricing() {
  return (
    <section id="pricing" className="min-w-0 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="pricing-heading">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <BentoGrid>
            <BentoCell colClassName="col-span-full lg:col-span-4">
              <div className="p-6 sm:p-8 lg:sticky lg:top-28">
                <div id="pricing-heading">
                  <SectionIntro
                    eyebrow="Engagement start"
                    title="Tell us what needs to change."
                    description="Whether you need a managed service partner, a product team, or a systems integration brief, we’ll shape the fastest useful next step."
                  />
                </div>
              </div>
            </BentoCell>
            <BentoCell colClassName="col-span-full lg:col-span-8">
              <div className="p-6 pt-0 sm:p-8 sm:pt-0 lg:pt-8">
                <InquiryForm submitLabel="Send project brief" />
              </div>
            </BentoCell>
        </BentoGrid>
      </div>
    </section>
  )
}
