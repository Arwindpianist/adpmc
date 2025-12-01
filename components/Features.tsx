"use client"

import { Music, Server, ShoppingCart, Code, Wrench, Building2 } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: <Server size={40} />,
    title: "Managed IT Services",
    description: "Comprehensive managed service provider solutions including network management, cloud services, cybersecurity, and 24/7 IT support for businesses of all sizes.",
  },
  {
    icon: <ShoppingCart size={40} />,
    title: "IT Hardware Sales",
    description: "New and refurbished IT hardware including networking equipment, servers, storage solutions, and enterprise-grade devices from leading manufacturers.",
  },
  {
    icon: <Code size={40} />,
    title: "Software Solutions",
    description: "Custom software development, enterprise applications, cloud solutions, and system integrations tailored to your business requirements.",
  },
  {
    icon: <Music size={40} />,
    title: "Music Production Solutions",
    description: "Professional music production services, audio engineering, studio setup, and music technology consulting for artists and studios.",
  },
  {
    icon: <Wrench size={40} />,
    title: "IT Consulting",
    description: "Expert IT consulting services for infrastructure planning, technology strategy, digital transformation, and enterprise architecture.",
  },
  {
    icon: <Building2 size={40} />,
    title: "Construction IT",
    description: "Specialized IT solutions for construction projects including project management systems, site connectivity, and construction technology integration.",
  },
]

const brandPartners = [
  { name: "Extreme Networks", description: "Authorized Partner" },
  { name: "Aruba", description: "Authorized Partner" },
  { name: "Huawei", description: "Authorized Partner" },
  { name: "IBM", description: "Authorized Partner" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-40 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glassmorphism p-6 rounded-xl card-hover group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 via-teal-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-teal-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-teal-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Brand Partnerships Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="section-title mb-8">Authorized Brand Partnerships</h2>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
            We maintain strong partnerships with leading technology manufacturers, ensuring access to the latest products, competitive pricing, and expert support.
          </p>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {brandPartners.map((partner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glassmorphism p-6 rounded-xl text-center card-hover border border-teal-400/30 hover:border-teal-400/60 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2 text-teal-400">{partner.name}</h3>
                <p className="text-sm text-gray-400">{partner.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features

