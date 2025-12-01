"use client"

import { useState } from "react"
import { Download, Mail, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

const LeadMagnets = () => {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    // In a real implementation, this would connect to your email service
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }, 1000)
  }

  const magnets = [
    {
      icon: <Calendar size={32} />,
      title: "Free Consultation",
      description: "Schedule a 30-minute consultation to discuss your IT needs",
      cta: "Schedule Now",
      action: () => {
        const element = document.getElementById("pricing")
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    },
    {
      icon: <FileText size={32} />,
      title: "Hardware Catalog",
      description: "Download our latest catalog of new and refurbished IT equipment",
      cta: "Download Catalog",
      action: () => {
        // In a real implementation, this would download a PDF
        window.open("#", "_blank")
      }
    },
    {
      icon: <Download size={32} />,
      title: "MSP Services Guide",
      description: "Learn about our comprehensive managed service provider solutions",
      cta: "Get Guide",
      action: () => {
        // In a real implementation, this would download a guide
        window.open("#", "_blank")
      }
    },
  ]

  return (
    <section className="py-20 glassmorphism">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-4">Get Started Today</h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Take advantage of our free resources and consultations to find the perfect solution for your business.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {magnets.map((magnet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glassmorphism p-6 rounded-lg border border-teal-400/30 hover:border-teal-400/50 transition-all"
            >
              <div className="text-teal-400 mb-4">{magnet.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{magnet.title}</h3>
              <p className="text-gray-300 mb-4 text-sm">{magnet.description}</p>
              <Button
                onClick={magnet.action}
                className="btn-secondary w-full"
              >
                {magnet.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-md mx-auto glassmorphism p-6 rounded-lg border border-teal-400/30">
          <div className="flex items-center justify-center mb-4">
            <Mail size={32} className="text-teal-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center">Stay Updated</h3>
          <p className="text-gray-300 text-sm text-center mb-4">
            Subscribe to our newsletter for the latest IT solutions, hardware deals, and industry insights.
          </p>
          {submitted ? (
            <p className="text-green-500 text-center text-sm">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-white border-opacity-50 text-white placeholder-gray-400 flex-1"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="btn-primary bg-teal-500 hover:bg-teal-600"
              >
                {submitting ? "..." : "Subscribe"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default LeadMagnets

