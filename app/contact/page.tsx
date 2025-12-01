"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black z-0" />,
  }
)

const serviceOptions = [
  { id: "msp", label: "Managed IT Services (MSP)" },
  { id: "hardware", label: "IT Hardware Sales" },
  { id: "software", label: "Software Solutions" },
  { id: "music", label: "Music Production Solutions" },
  { id: "consulting", label: "IT/Construction Consulting" },
]

export default function ContactPage() {
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [services, setServices] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleServiceToggle = (serviceId: string) => {
    setServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData()
    formData.append("name", name)
    formData.append("company", company)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("services", services.join(", "))
    formData.append("message", message)

    try {
      const response = await fetch("https://formspree.io/f/xnnjkdvn", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitStatus("success")
        setName("")
        setCompany("")
        setEmail("")
        setPhone("")
        setMessage("")
        setServices([])
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Get in touch with us to discuss your IT needs. We're here to help you find the perfect solution.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <div className="glassmorphism p-6 rounded-lg mb-6">
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail size={24} className="text-teal-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a href="mailto:info@arwindpianist.com" className="text-gray-300 hover:text-teal-400 transition">
                          info@arwindpianist.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone size={24} className="text-teal-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a href="tel:+60123456789" className="text-gray-300 hover:text-teal-400 transition">
                          +60 12-345 6789
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin size={24} className="text-teal-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-gray-300">
                          Malaysia<br />
                          Serving clients nationwide
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glassmorphism p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                  <div className="space-y-2 text-gray-300">
                    <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                    <p><strong>Saturday:</strong> 10:00 AM - 2:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                    <p className="text-sm text-teal-400 mt-4">24/7 Emergency Support Available</p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="glassmorphism p-8 rounded-lg">
                  {submitStatus === "success" ? (
                    <div className="text-center py-8">
                      <CheckCircle2 size={64} className="mx-auto mb-4 text-green-500" />
                      <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                      <p className="text-gray-300 mb-6">
                        Your message has been sent successfully. Our team will review your inquiry and get back to you within 24 hours.
                      </p>
                      <p className="text-sm text-gray-400 mb-4">What happens next?</p>
                      <ul className="text-left text-gray-300 space-y-2 max-w-md mx-auto">
                        <li>• We'll review your requirements</li>
                        <li>• Prepare a customized quote</li>
                        <li>• Schedule a consultation call if needed</li>
                        <li>• Send you detailed proposal</li>
                      </ul>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="text"
                          placeholder="Your Name *"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="bg-transparent border-white border-opacity-50 text-white placeholder-gray-400"
                        />
                        <Input
                          type="text"
                          placeholder="Company Name"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="bg-transparent border-white border-opacity-50 text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="email"
                          placeholder="Your Email *"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-transparent border-white border-opacity-50 text-white placeholder-gray-400"
                        />
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-transparent border-white border-opacity-50 text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-3 text-gray-300">
                          Services of Interest (Select all that apply)
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {serviceOptions.map((service) => (
                            <label
                              key={service.id}
                              className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={services.includes(service.id)}
                                onChange={() => handleServiceToggle(service.id)}
                                className="w-4 h-4 text-teal-400 bg-transparent border-white/50 rounded focus:ring-teal-400"
                              />
                              <span className="text-gray-300 text-sm">{service.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <Textarea
                        placeholder="Tell us about your project, requirements, timeline, and any specific needs... *"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={6}
                        className="bg-transparent border-white border-opacity-50 text-white placeholder-gray-400"
                      />
                      
                      <Button type="submit" className="btn-primary border-teal-400 border w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                      
                      {submitStatus === "error" && (
                        <p className="text-red-500 text-center">Failed to send message. Please try again or contact us directly.</p>
                      )}
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

