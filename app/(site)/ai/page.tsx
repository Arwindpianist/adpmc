import CapabilityDocPage from "@/components/site/capability-doc"
import { getCapabilityPage } from "@/lib/capability-pages"

export default function AiPage() {
  return <CapabilityDocPage content={getCapabilityPage("/ai")} />
}
