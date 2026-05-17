import CapabilityDocPage from "@/components/site/capability-doc"
import { getCapabilityPage } from "@/lib/capability-pages"

export default function NetworkingPage() {
  return <CapabilityDocPage content={getCapabilityPage("/networking")} />
}
