import FAQ from "@/components/FAQ"
import { homeFaqItems } from "@/lib/site-seo"
import HomeClient from "./HomeClient"

export default function Home() {
  return (
    <HomeClient
      faq={
        <FAQ
          items={homeFaqItems}
          jsonLdPath="/#knowledge-base"
          heading="Knowledge base"
          id="knowledge-base"
        />
      }
    />
  )
}
