"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Pricing = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
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
        setEmail("")
        setMessage("")
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
        <div className="max-w-md mx-auto glassmorphism p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-transparent border-white border-opacity-50 text-white placeholder-gray-400"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent border-white border-opacity-50 text-white placeholder-gray-400"
            />
            <Textarea
              placeholder="Tell us about your project"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="bg-transparent border-white border-opacity-50 text-white placeholder-gray-400"
            />
            <Button type="submit" className="btn-primary border-teal-400 border w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Request Quote"}
            </Button>
            {submitStatus === "success" && (
              <p className="text-green-500 text-center">Message sent successfully!</p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Pricing