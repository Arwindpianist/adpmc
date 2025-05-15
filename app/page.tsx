"use client"
import dynamic from "next/dynamic"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Footer from "@/components/Footer"
import { motion } from "framer-motion"

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black z-0" />
  }
)

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.5, ease: "easeOut" }
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Hero />
        </motion.div>
        <Footer />
      </div>
    </main>
  )
}