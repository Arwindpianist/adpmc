import type { ReactNode } from "react"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import SmoothScrollProvider from "@/components/SmoothScrollProvider"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <div className="site-shell">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 opacity-45 [background-image:linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:200px_200px]"
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.035] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:22px_22px] mix-blend-screen"
        />
        <Header />
        <main className="min-w-0 overflow-x-hidden pb-6">{children}</main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
