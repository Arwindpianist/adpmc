import { ArrowUpRight } from "lucide-react"

import { BentoCell, BentoGrid } from "@/components/bento"
import MagneticButton from "@/components/MagneticButton"
import TransitionLink from "@/components/TransitionLink"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="min-w-0 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <BentoGrid>
            <BentoCell colClassName="col-span-full lg:col-span-8">
              <div className="flex h-full flex-col justify-center p-6 sm:p-8 lg:p-10">
                <p className="section-kicker">Mobilization</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-zinc-50 sm:text-4xl lg:text-5xl">
                  Architected programs, provisioned infrastructure, deployed control planes.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#c9b8e8]/90 sm:text-lg">
                  Submit a mobilization brief for MaaS, networking, security integration, or managed operations. We
                  respond with staged delivery, integrity checkpoints, and documentation sized for procurement review.
                </p>
              </div>
            </BentoCell>
            <BentoCell colClassName="col-span-full lg:col-span-4">
              <div className="flex h-full min-h-[11rem] flex-col justify-center gap-3 p-6 sm:p-8 lg:p-10">
                <MagneticButton className="w-full sm:w-auto">
                  <Button asChild size="lg" className="w-full min-h-11 sm:w-auto">
                    <TransitionLink href="/contact">
                      Request mobilization
                      <ArrowUpRight className="h-4 w-4" />
                    </TransitionLink>
                  </Button>
                </MagneticButton>
                <Button asChild size="lg" variant="secondary" className="w-full min-h-11 sm:w-auto">
                  <TransitionLink
                    href="/services"
                    title="Operational capabilities"
                    aria-label="Operational capabilities: systems integration and MSP disciplines"
                  >
                    Operational capabilities
                  </TransitionLink>
                </Button>
              </div>
            </BentoCell>
        </BentoGrid>
      </div>
    </section>
  )
}
