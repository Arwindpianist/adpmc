"use client"

import type { ReactNode } from "react"
import dynamic from "next/dynamic"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Server, ShoppingCart, Code, Music, Wrench, Building2, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { servicesEngagementSteps } from "@/lib/site-seo"

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black z-0" />,
  }
)

type ServiceBlock = {
  icon: ReactNode
  title: string
  techStack: readonly string[]
  description: ReactNode
  features: string[]
  benefits: string
}

const services: ServiceBlock[] = [
  {
    icon: <Server size={48} />,
    title: "Managed IT Services (MSP)",
    techStack: ["Extreme Networks", "Aruba", "Cisco", "Huawei", "TicketOS", "Supabase"],
    description: (
      <>
        Comprehensive managed service provider solutions to keep your IT infrastructure running smoothly. Our enterprise
        networking and security deployments lean on an{" "}
        <Link href="/partners" className="text-teal-400 hover:text-teal-300 underline">
          authorized partner ecosystem
        </Link>{" "}
        and delivery playbooks refined across{" "}
        <Link href="/projects" className="text-teal-400 hover:text-teal-300 underline">
          real-world projects
        </Link>
        .
      </>
    ),
    features: [
      "24/7 network monitoring and management",
      "Proactive maintenance and updates",
      "Cloud services and migration",
      "Cybersecurity and threat protection",
      "Help desk and technical support",
      "Backup and disaster recovery",
      "IT infrastructure planning and optimization",
    ],
    benefits:
      "Reduce IT costs, improve uptime, and focus on your core business while we handle your technology needs.",
  },
  {
    icon: <ShoppingCart size={48} />,
    title: "IT Hardware Sales",
    techStack: ["Cisco", "HPE", "Dell", "Axis", "Hikvision", "Ubiquiti"],
    description: (
      <>
        New and refurbished IT hardware from leading manufacturers at competitive prices, sourced through{" "}
        <Link href="/partners" className="text-teal-400 hover:text-teal-300 underline">
          strategic vendor partnerships
        </Link>{" "}
        so warranties and SKUs stay authentic. See representative outcomes alongside our{" "}
        <Link href="/projects" className="text-teal-400 hover:text-teal-300 underline">
          project portfolio
        </Link>
        .
      </>
    ),
    features: [
      "Networking equipment (switches, routers, access points)",
      "Servers and storage solutions",
      "Enterprise-grade workstations",
      "Security appliances and firewalls",
      "Wireless infrastructure",
      "Cabling and accessories",
      "Warranty and support options",
    ],
    benefits:
      "Access to both new and refurbished equipment means you can find the perfect balance between performance and budget.",
  },
  {
    icon: <Code size={48} />,
    title: "Software Solutions",
    techStack: ["Next.js", "TypeScript", "Python", "Supabase", "Prisma", "Vercel", "PostgreSQL"],
    description: (
      <>
        Custom software development and enterprise applications tailored to your business needs. Explore live builds and
        repositories on our{" "}
        <Link href="/projects" className="text-teal-400 hover:text-teal-300 underline">
          Projects
        </Link>{" "}
        page, and learn how platforms like TicketOS fit next to your stack via{" "}
        <Link href="/partners" className="text-teal-400 hover:text-teal-300 underline">
          Partners
        </Link>
        .
      </>
    ),
    features: [
      "Custom web applications",
      "Enterprise software development",
      "Cloud-native solutions",
      "System integrations",
      "API development",
      "Database design and optimization",
      "Legacy system modernization",
    ],
    benefits:
      "Solutions designed specifically for your workflows, improving efficiency and reducing operational costs.",
  },
  {
    icon: <Music size={48} />,
    title: "Music Production Solutions",
    techStack: ["Pro Tools", "Logic Pro", "Ableton", "Dante", "Waves", "iZotope"],
    description: (
      <>
        Professional music production services and audio technology consulting. When engagements include studio or
        workflow tooling, we align hardware and software choices with the same integration rigor as our broader{" "}
        <Link href="/about" className="text-teal-400 hover:text-teal-300 underline">
          MSP and integration practice
        </Link>
        .
      </>
    ),
    features: [
      "Music production and composition",
      "Audio engineering and mixing",
      "Studio setup and configuration",
      "Music technology consulting",
      "Audio software integration",
      "Hardware recommendations",
      "Production workflow optimization",
    ],
    benefits: "Professional-grade music production services for artists, studios, and content creators.",
  },
  {
    icon: <Wrench size={48} />,
    title: "IT Consulting",
    techStack: ["ITIL", "Zero Trust", "Microsoft 365", "AWS", "Azure", "Cisco"],
    description: (
      <>
        Expert IT consulting for infrastructure planning, technology strategy, and digital transformation. We ground
        roadmaps in your operational reality and our{" "}
        <Link href="/partners" className="text-teal-400 hover:text-teal-300 underline">
          partner-aligned
        </Link>{" "}
        sourcing model, then validate execution paths against{" "}
        <Link href="/projects" className="text-teal-400 hover:text-teal-300 underline">
          prior deployments
        </Link>
        .
      </>
    ),
    features: [
      "IT infrastructure assessment",
      "Technology strategy and planning",
      "Digital transformation consulting",
      "Enterprise architecture design",
      "Security audits and compliance",
      "Cost optimization analysis",
      "Vendor selection and management",
    ],
    benefits:
      "Strategic guidance to align your technology investments with business goals and maximize ROI.",
  },
  {
    icon: <Building2 size={48} />,
    title: "Construction IT",
    techStack: ["Meraki", "Ubiquiti", "Microsoft 365", "Axis", "Fortinet", "5G / LTE"],
    description: (
      <>
        Specialized IT solutions for construction projects including site connectivity and project management systems—
        the same class of field and WAN challenges reflected in our broader{" "}
        <Link href="/projects" className="text-teal-400 hover:text-teal-300 underline">
          project history
        </Link>
        , with hardware and platforms sourced through{" "}
        <Link href="/partners" className="text-teal-400 hover:text-teal-300 underline">
          authorized partners
        </Link>
        .
      </>
    ),
    features: [
      "Construction site network setup",
      "Project management software integration",
      "Mobile device management for field teams",
      "Cloud-based collaboration tools",
      "Site connectivity solutions",
      "Construction technology consulting",
      "Integration with construction software platforms",
    ],
    benefits:
      "Technology solutions designed specifically for the unique challenges of construction projects.",
  },
]

export default function ServicesClient({ faq }: { faq: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col relative">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      <div className="relative z-10">
        <Header />

        <section className="pt-32 pb-16" aria-labelledby="services-page-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 id="services-page-heading" className="text-4xl md:text-5xl font-bold mb-4">
                Our Services
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive IT solutions tailored to your business needs. From managed services to custom software,
                we&apos;ve got you covered. Explore how each line of business connects to our{" "}
                <Link href="/projects" className="text-teal-400 hover:text-teal-300 underline">
                  projects
                </Link>{" "}
                and{" "}
                <Link href="/partners" className="text-teal-400 hover:text-teal-300 underline">
                  partners
                </Link>
                .
              </p>
            </motion.div>

            <section
              id="how-we-engage"
              className="glassmorphism p-8 rounded-lg mb-16 max-w-3xl mx-auto border border-teal-400/20"
              aria-labelledby="how-we-engage-heading"
            >
              <h2 id="how-we-engage-heading" className="text-2xl md:text-3xl font-bold mb-4 text-center">
                How do we engage from first contact to managed operations?
              </h2>
              <p className="text-gray-400 text-sm text-center mb-8 max-w-2xl mx-auto">
                A typical delivery path—mirrored in HowTo structured data for this page.
              </p>
              <ol className="space-y-6 list-decimal list-inside text-gray-300 text-sm md:text-base">
                {servicesEngagementSteps.map((step) => (
                  <li key={step.name} className="leading-relaxed pl-1">
                    <strong className="text-teal-400">{step.name}.</strong> {step.text}
                  </li>
                ))}
              </ol>
            </section>

            <div className="space-y-16">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glassmorphism p-8 rounded-lg"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className="text-teal-400 mb-4">{service.icon}</div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">{service.title}</h2>
                      <p className="text-gray-300 mb-4">{service.description}</p>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">
                        Technologies used
                      </p>
                      <ul
                        className="flex flex-wrap gap-2 mb-4 list-none p-0"
                        aria-label={`Technologies used for ${service.title}`}
                      >
                        {service.techStack.map((tag) => (
                          <li key={tag}>
                            <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                              {tag}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-teal-400/10 border border-teal-400/30 rounded-lg p-4">
                        <p className="text-sm text-gray-300">
                          <strong className="text-teal-400">Key Benefit:</strong> {service.benefits}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-4 text-teal-400">What We Offer:</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle2 size={20} className="text-teal-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              aria-label="Knowledge base"
            >
              {faq}
            </motion.div>

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
                  Let&apos;s discuss how our services can help your business succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn-primary" aria-label="Contact us about IT services">
                    Contact Us
                  </Link>
                  <Link href="/contact" className="btn-secondary" aria-label="Get a quote for managed IT and software services">
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
