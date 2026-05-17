import CapabilityDocPage from "@/components/site/capability-doc"
import { getCapabilityPage } from "@/lib/capability-pages"

export default function SecurityPage() {
  return <CapabilityDocPage content={getCapabilityPage("/security")} />
}
