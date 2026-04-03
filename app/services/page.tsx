import FAQ from "@/components/FAQ"
import { servicesFaqItems } from "@/lib/site-seo"
import ServicesClient from "./ServicesClient"

export default function ServicesPage() {
  return (
    <ServicesClient
      faq={<FAQ items={servicesFaqItems} jsonLdPath="/services#faq" />}
    />
  )
}
