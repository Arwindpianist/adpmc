import CallToAction from "@/components/CallToAction"
import FAQ from "@/components/FAQ"
import Features from "@/components/Features"
import Hero from "@/components/Hero"
import Partnerships from "@/components/Partnerships"
import Pricing from "@/components/Pricing"
import TrustSignals from "@/components/TrustSignals"
import { homeFaqItems } from "@/lib/site-seo"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <TrustSignals />
      <Partnerships />
      <Pricing />
      <FAQ items={homeFaqItems} jsonLdPath="/#knowledge-base" heading="Knowledge base" id="knowledge-base" />
      <CallToAction />
    </>
  )
}
