"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Pricing = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", { name, email, message })
    // Reset form fields
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <section id="pricing" className="py-20">
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
            <Button type="submit" className="btn-primary w-full">
              Request Quote
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Pricing

