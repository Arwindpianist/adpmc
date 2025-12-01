"use client"

import { useState } from "react"
import { Mail, Calendar, Video, MapPin, Clock } from "lucide-react"
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

  const bookingUrl = "https://zbooking.us/rK7sS"
  
  const scheduleConsultation = () => {
    window.open(bookingUrl, "_blank")
  }

  return (
    <section className="py-20 glassmorphism">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-4">Get Started Today</h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Schedule a free 30-minute consultation to discuss your IT needs and discover how we can help your business succeed.
        </p>

        {/* Free Consultation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="glassmorphism p-6 md:p-8 rounded-2xl border-2 border-teal-400/50 relative overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/10 via-transparent to-cyan-400/10" />
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-teal-400/20 flex items-center justify-center">
                  <Calendar size={32} className="text-teal-400" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Free 30-Minute Consultation</h3>
              <p className="text-gray-300 text-lg mb-4 max-w-2xl mx-auto">
                Book a consultation to discuss your IT needs, whether it's managed services, hardware solutions, software development, or strategic consulting.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Video size={18} className="text-teal-400" />
                  <span className="text-sm">Virtual or Physical</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock size={18} className="text-teal-400" />
                  <span className="text-sm">30 Minutes</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin size={18} className="text-teal-400" />
                  <span className="text-sm">Flexible Location</span>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mb-4"
              >
                <Button
                  onClick={scheduleConsultation}
                  className="btn-primary text-lg px-8 py-4"
                >
                  Open Booking Calendar
                </Button>
              </motion.div>
              <p className="text-sm text-gray-400">
                Or schedule directly below
              </p>
            </div>
          </div>

          {/* Zoho Bookings Embed */}
          <div className="glassmorphism rounded-xl overflow-hidden border border-teal-400/30">
            <iframe
              width="100%"
              height="750px"
              src="https://arwindpianistmultimediaconsulting.zohobookings.com/portal-embed#/arwindpianistmultimediaconsulting"
              frameBorder="0"
              allowFullScreen
              className="w-full"
              title="Schedule Consultation"
            />
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto glassmorphism p-6 rounded-lg border border-teal-400/30"
        >
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
        </motion.div>
      </div>
    </section>
  )
}

export default LeadMagnets

