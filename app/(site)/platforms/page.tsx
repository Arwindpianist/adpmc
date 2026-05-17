import CapabilityDocPage from "@/components/site/capability-doc"
import { getCapabilityPage } from "@/lib/capability-pages"

export default function PlatformsPage() {
  return <CapabilityDocPage content={getCapabilityPage("/platforms")} />
}
