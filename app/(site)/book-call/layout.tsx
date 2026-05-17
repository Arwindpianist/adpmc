import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildRouteMetadata("/book-call")

export default function BookCallLayout({ children }: { children: React.ReactNode }) {
  return children
}
