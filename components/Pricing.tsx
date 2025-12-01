"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

const serviceOptions = [
  { id: "msp", label: "Managed IT Services (MSP)" },
  { id: "hardware", label: "IT Hardware Sales" },
  { id: "software", label: "Software Solutions" },
  { id: "music", label: "Music Production Solutions" },
  { id: "consulting", label: "IT/Construction Consulting" },
]

const Pricing = () => {
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
    <section id="pricing" className="py-40">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Get a Custom Quote</h2>
        <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
          Tell us about your project and we'll provide a customized solution tailored to your needs.
        </p>
        <div className="max-w-2xl mx-auto glassmorphism p-8 rounded-lg">
          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <CheckCircle2 size={64} className="mx-auto mb-4 text-green-500" />
              <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
              <p className="text-gray-300 mb-6">
                Your request has been submitted successfully. Our team will review your inquiry and get back to you within 24 hours.
              </p>
              <p className="text-sm text-gray-400 mb-4">
                What happens next?
              </p>
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
                      <span className="text-gray-300">{service.label}</span>
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
                {isSubmitting ? "Sending..." : "Request Quote"}
              </Button>
              
              {submitStatus === "error" && (
                <p className="text-red-500 text-center">Failed to send message. Please try again or contact us directly.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Pricing