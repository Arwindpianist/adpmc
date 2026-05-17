import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/site-seo"

export const metadata: Metadata = buildRouteMetadata("/book-call/success")

export default function BookCallSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
