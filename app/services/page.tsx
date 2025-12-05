"use client"

import dynamic from "next/dynamic"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Server, ShoppingCart, Code, Music, Wrench, Building2, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black z-0" />,
  }
)

const services = [
  {
    icon: <Server size={48} />,
    title: "Managed IT Services (MSP)",
    description: "Comprehensive managed service provider solutions to keep your IT infrastructure running smoothly.",
    features: [
      "24/7 network monitoring and management",
      "Proactive maintenance and updates",
      "Cloud services and migration",
      "Cybersecurity and threat protection",
      "Help desk and technical support",
      "Backup and disaster recovery",
      "IT infrastructure planning and optimization"
    ],
    benefits: "Reduce IT costs, improve uptime, and focus on your core business while we handle your technology needs."
  },
  {
    icon: <ShoppingCart size={48} />,
    title: "IT Hardware Sales",
    description: "New and refurbished IT hardware from leading manufacturers at competitive prices.",
    features: [
      "Networking equipment (switches, routers, access points)",
      "Servers and storage solutions",
      "Enterprise-grade workstations",
      "Security appliances and firewalls",
      "Wireless infrastructure",
      "Cabling and accessories",
      "Warranty and support options"
    ],
    benefits: "Access to both new and refurbished equipment means you can find the perfect balance between performance and budget."
  },
  {
    icon: <Code size={48} />,
    title: "Software Solutions",
    description: "Custom software development and enterprise applications tailored to your business needs.",
    features: [
      "Custom web applications",
      "Enterprise software development",
      "Cloud-native solutions",
      "System integrations",
      "API development",
      "Database design and optimization",
      "Legacy system modernization"
    ],
    benefits: "Solutions designed specifically for your workflows, improving efficiency and reducing operational costs."
  },
  {
    icon: <Music size={48} />,
    title: "Music Production Solutions",
    description: "Professional music production services and audio technology consulting.",
    features: [
      "Music production and composition",
      "Audio engineering and mixing",
      "Studio setup and configuration",
      "Music technology consulting",
      "Audio software integration",
      "Hardware recommendations",
      "Production workflow optimization"
    ],
    benefits: "Professional-grade music production services for artists, studios, and content creators."
  },
  {
    icon: <Wrench size={48} />,
    title: "IT Consulting",
    description: "Expert IT consulting services for infrastructure planning, technology strategy, and digital transformation.",
    features: [
      "IT infrastructure assessment",
      "Technology strategy and planning",
      "Digital transformation consulting",
      "Enterprise architecture design",
      "Security audits and compliance",
      "Cost optimization analysis",
      "Vendor selection and management"
    ],
    benefits: "Strategic guidance to align your technology investments with business goals and maximize ROI."
  },
  {
    icon: <Building2 size={48} />,
    title: "Construction IT",
    description: "Specialized IT solutions for construction projects including site connectivity and project management systems.",
    features: [
      "Construction site network setup",
      "Project management software integration",
      "Mobile device management for field teams",
      "Cloud-based collaboration tools",
      "Site connectivity solutions",
      "Construction technology consulting",
      "Integration with construction software platforms"
    ],
    benefits: "Technology solutions designed specifically for the unique challenges of construction projects."
  },
]

export default function ServicesPage() {
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
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive IT solutions tailored to your business needs. From managed services to custom software, we've got you covered.
              </p>
            </motion.div>

            <div className="space-y-16">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glassmorphism p-8 rounded-lg"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className="text-teal-400 mb-4">{service.icon}</div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h2>
                      <p className="text-gray-300 mb-4">{service.description}</p>
                      <div className="bg-teal-400/10 border border-teal-400/30 rounded-lg p-4">
                        <p className="text-sm text-gray-300"><strong className="text-teal-400">Key Benefit:</strong> {service.benefits}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-4 text-teal-400">What We Offer:</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle2 size={20} className="text-teal-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="glassmorphism p-8 rounded-lg max-w-2xl mx-auto border-2 border-teal-400/50">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-gray-300 mb-6">
                  Let's discuss how our services can help your business succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn-primary">
                    Contact Us
                  </Link>
                  <Link href="#pricing" className="btn-secondary">
                    Get a Quote
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

