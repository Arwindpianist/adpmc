"use client"

import { Shield, Award, Users, Clock, CheckCircle2, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { icon: <Users size={32} />, value: "100+", label: "Satisfied Clients" },
  { icon: <Award size={32} />, value: "500+", label: "Projects Completed" },
  { icon: <Clock size={32} />, value: "24/7", label: "Support Available" },
  { icon: <TrendingUp size={32} />, value: "99%", label: "Client Retention" },
]

const certifications = [
  "Authorized Extreme Networks Partner",
  "Authorized Aruba Partner",
  "Authorized Huawei Partner",
  "Authorized IBM Partner",
  "Certified MSP Provider",
  "ISO Compliant Services",
]

const advantages = [
  {
    icon: <Shield size={24} />,
    title: "Industry-Leading Partnerships",
    description: "Direct relationships with Extreme Networks, Aruba, Huawei, and IBM ensure access to latest technology and competitive pricing."
  },
  {
    icon: <Award size={24} />,
    title: "Proven Track Record",
    description: "Years of experience delivering successful IT solutions across various industries and project scales."
  },
  {
    icon: <Users size={24} />,
    title: "Expert Team",
    description: "Skilled professionals with deep expertise in networking, infrastructure, software development, and consulting."
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: "Comprehensive Solutions",
    description: "One-stop shop for all your IT needs - from hardware procurement to managed services and custom software."
  },
  {
    icon: <Clock size={24} />,
    title: "Responsive Support",
    description: "24/7 support and rapid response times to keep your business running smoothly."
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Cost-Effective Options",
    description: "Access to both new and refurbished equipment, flexible service packages, and transparent pricing."
  },
]

const TrustSignals = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Statistics */}
        <div className="mb-16">
          <h2 className="section-title mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glassmorphism p-6 rounded-lg text-center border border-teal-400/20"
              >
                <div className="text-teal-400 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2 text-teal-400">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications & Partnerships */}
        <div className="mb-16">
          <h2 className="section-title mb-8">Certifications & Authorizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glassmorphism p-4 rounded-lg border border-teal-400/30 flex items-center gap-3"
              >
                <CheckCircle2 size={20} className="text-teal-400 flex-shrink-0" />
                <span className="text-gray-300">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Competitive Advantages */}
        <div>
          <h2 className="section-title mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glassmorphism p-6 rounded-lg border border-teal-400/20 hover:border-teal-400/40 transition-all"
              >
                <div className="text-teal-400 mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                <p className="text-gray-300 text-sm">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSignals

