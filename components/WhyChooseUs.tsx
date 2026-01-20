"use client"

import { Network, Handshake, Code2, Layers, Zap, Target } from "lucide-react"
import { motion } from "framer-motion"

const reasons = [
  {
    icon: <Network size={32} />,
    title: "Strong Industry Connections",
    description: "Strategic authorized partnerships with leading technology manufacturers across networking, cloud platforms, surveillance systems, and creative technology. This means better pricing, faster delivery, and access to the latest products and technologies.",
    highlight: "Authorized Partner Status"
  },
  {
    icon: <Handshake size={32} />,
    title: "Trusted Brand Partnerships",
    description: "Our authorized partner status with major brands ensures you receive genuine products, manufacturer warranties, and expert technical support directly from the source.",
    highlight: "Genuine Products & Support"
  },
  {
    icon: <Code2 size={32} />,
    title: "Technical Expertise",
    description: "Deep technical knowledge across networking, infrastructure, software development, and cloud solutions. Our team stays current with the latest technologies and best practices.",
    highlight: "Certified Professionals"
  },
  {
    icon: <Layers size={32} />,
    title: "Comprehensive Solutions",
    description: "From hardware procurement to managed services, custom software development, and consulting - we provide end-to-end solutions so you don't need multiple vendors.",
    highlight: "One-Stop Solution"
  },
  {
    icon: <Zap size={32} />,
    title: "Cost-Effective Options",
    description: "Access to both new and refurbished equipment means you can find the perfect balance between performance and budget. Flexible service packages tailored to your needs.",
    highlight: "Flexible Pricing"
  },
  {
    icon: <Target size={32} />,
    title: "Focused on Your Success",
    description: "We take the time to understand your business, goals, and challenges. Every solution is customized to deliver real value and measurable results for your organization.",
    highlight: "Results-Driven Approach"
  },
]

const WhyChooseUs = () => {
  return (
    <section className="py-20 glassmorphism">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-4">Why Choose Arwindpianist Multimedia & Consulting?</h2>
        <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          We combine industry-leading partnerships, technical expertise, and a commitment to your success to deliver IT solutions that drive real business value.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glassmorphism p-4 md:p-6 rounded-lg border border-teal-400/20 hover:border-teal-400/50 transition-all hover:scale-105"
            >
              <div className="text-teal-400 mb-4">{reason.icon}</div>
              <div className="inline-block px-3 py-1 bg-teal-400/20 text-teal-400 text-xs font-semibold rounded-full mb-3">
                {reason.highlight}
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3">{reason.title}</h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-base md:text-lg text-gray-300 mb-6">
            Ready to experience the difference? Let's discuss how we can help your business thrive.
          </p>
          <a
            href="#pricing"
            className="btn-primary inline-block text-sm md:text-base px-4 md:px-8 py-2 md:py-3"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("pricing")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Get Started Today
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs

