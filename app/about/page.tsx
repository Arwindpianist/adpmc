"use client"

import dynamic from "next/dynamic"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Award, Users, Target, Handshake, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black z-0" />,
  }
)

const values = [
  {
    icon: <Target size={32} />,
    title: "Client-Focused",
    description: "We prioritize understanding your business needs and delivering solutions that drive real value."
  },
  {
    icon: <Award size={32} />,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from service delivery to product quality."
  },
  {
    icon: <Handshake size={32} />,
    title: "Partnership",
    description: "We build long-term relationships with our clients, becoming an extension of your team."
  },
  {
    icon: <Users size={32} />,
    title: "Expertise",
    description: "Our team brings deep technical knowledge and industry experience to every project."
  },
]

const partnerships = [
  "Extreme Networks - Authorized Partner",
  "Aruba - Authorized Partner",
  "Huawei - Authorized Partner",
  "IBM - Authorized Partner",
]

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col relative">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      <div className="relative z-10">
        <Header />
        
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Arwindpianist Multimedia & Consulting (JR0170970-M) - Your trusted partner for comprehensive IT solutions
              </p>
            </motion.div>

            {/* Company Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glassmorphism p-8 rounded-lg mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Arwindpianist Multimedia & Consulting is a leading Managed Service Provider (MSP) specializing in comprehensive IT solutions for businesses of all sizes. We combine deep technical expertise with strong industry partnerships to deliver exceptional value to our clients.
                </p>
                <p>
                  Our journey began with a vision to provide businesses with access to enterprise-grade IT solutions, whether they need managed services, hardware procurement, custom software development, or strategic consulting. We've built strong relationships with leading technology manufacturers including Extreme Networks, Aruba, Huawei, and IBM, ensuring our clients have access to the latest products and competitive pricing.
                </p>
                <p>
                  Today, we serve clients across various industries, helping them leverage technology to achieve their business goals. From small businesses to large enterprises, we provide tailored solutions that fit each client's unique needs and budget.
                </p>
              </div>
            </motion.div>

            {/* What We Do */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glassmorphism p-8 rounded-lg mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-400">Managed IT Services</h3>
                  <p>24/7 monitoring, maintenance, and support for your IT infrastructure, allowing you to focus on your core business.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-400">IT Hardware Sales</h3>
                  <p>New and refurbished networking equipment, servers, and enterprise hardware from leading manufacturers.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-400">Software Solutions</h3>
                  <p>Custom software development, enterprise applications, and system integrations tailored to your workflows.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-400">Consulting Services</h3>
                  <p>Strategic IT consulting for infrastructure planning, digital transformation, and technology optimization.</p>
                </div>
              </div>
            </motion.div>

            {/* Our Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glassmorphism p-6 rounded-lg text-center"
                  >
                    <div className="text-teal-400 mb-4 flex justify-center">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-300 text-sm">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Partnerships */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glassmorphism p-8 rounded-lg mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">Authorized Partnerships</h2>
              <p className="text-gray-300 mb-6">
                Our authorized partner status with leading technology manufacturers ensures you receive genuine products, manufacturer warranties, and expert support.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {partnerships.map((partnership, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-teal-400 flex-shrink-0" />
                    <span className="text-gray-300">{partnership}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <div className="glassmorphism p-8 rounded-lg max-w-2xl mx-auto border-2 border-teal-400/50">
                <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
                <p className="text-gray-300 mb-6">
                  Ready to see how we can help your business succeed?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn-primary">
                    Get in Touch
                  </Link>
                  <Link href="/services" className="btn-secondary">
                    View Our Services
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

