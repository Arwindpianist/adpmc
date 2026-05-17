import CapabilityDocPage from "@/components/site/capability-doc"
import { getCapabilityPage } from "@/lib/capability-pages"

export default function MspPage() {
  return <CapabilityDocPage content={getCapabilityPage("/msp")} />
}
