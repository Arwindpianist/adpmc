import CapabilityDocPage from "@/components/site/capability-doc"
import { getCapabilityPage } from "@/lib/capability-pages"

export default function CreativePage() {
  return <CapabilityDocPage content={getCapabilityPage("/creative")} />
}
