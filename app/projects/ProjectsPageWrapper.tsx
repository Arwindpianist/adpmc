"use client"

import dynamic from "next/dynamic"
import type { ReactNode } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black z-0" />,
})

export default function ProjectsPageWrapper({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col relative">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>
      <div className="relative z-10">
        <Header />
        {children}
        <Footer />
      </div>
    </main>
  )
}
