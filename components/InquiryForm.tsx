"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

import MagneticButton from "@/components/MagneticButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const serviceOptions = [
  { id: "msp", label: "MSP operations & monitoring" },
  { id: "procurement", label: "Authorized procurement & lifecycle" },
  { id: "networking", label: "Enterprise networking (multi-WAN / SD-WAN)" },
  { id: "security", label: "Security, VMS & access control integration" },
  { id: "maas", label: "Generative AI & MaaS deployment" },
  { id: "sysadmin", label: "Ubuntu / Docker / hybrid-cloud administration" },
  { id: "platforms", label: "TicketOS, CondoClean, QuickKlinik and custom software" },
  { id: "creative", label: "Creative and audio technology" },
] as const

type InquiryFormProps = {
  submitLabel?: string
  className?: string
}

export default function InquiryForm({
  submitLabel = "Submit mobilization brief",
  className,
}: InquiryFormProps) {
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [services, setServices] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const toggleService = (serviceId: string) => {
    setServices((current) =>
      current.includes(serviceId)
        ? current.filter((service) => service !== serviceId)
        : [...current, serviceId]
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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

      if (!response.ok) {
        throw new Error("Failed to submit inquiry")
      }

      setSubmitStatus("success")
      setName("")
      setCompany("")
      setEmail("")
      setPhone("")
      setMessage("")
      setServices([])
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <div className={cn("surface-card rounded-[2rem] p-8 text-center", className)}>
        <CheckCircle2 className="mx-auto h-14 w-14 text-dracula-purple" />
        <div className="mt-5 space-y-3">
          <h3 className="text-2xl font-semibold text-zinc-50">Inquiry received</h3>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#c9b8e8]/90 sm:text-base">
            We&apos;ll review your brief, shape the right engagement path, and get back to you with a focused response.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("surface-card rounded-[2rem] p-6 sm:p-8", className)}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Company or team"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
        <Input
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-medium text-zinc-50">What are you looking for?</legend>
        <div className="flex flex-wrap gap-3">
          {serviceOptions.map((service) => {
            const active = services.includes(service.id)

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleService(service.id)}
                className={cn(
                  "min-h-11 rounded-full border px-4 py-2.5 text-left text-sm transition-[border-color,background-color] duration-150",
                  active
                    ? "border-[rgba(189,147,249,0.45)] bg-dracula-purple/15 text-dracula-purple shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    : "border-[rgba(189,147,249,0.15)] bg-[#050208] text-[#e9ddff] hover:border-[rgba(189,147,249,0.35)]"
                )}
              >
                {service.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        <Textarea
          placeholder="Share your goals, constraints, timeline, and what success should look like."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-[#c9b8e8]/75">
          Responses typically land within one business day.
        </p>
        <MagneticButton>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : submitLabel}
          </Button>
        </MagneticButton>
      </div>

      {submitStatus === "error" ? (
        <p className="mt-4 text-sm text-red-300">
          We couldn&apos;t send the form just now. Please try again or email hello@arwindpianist.com.
        </p>
      ) : null}
    </form>
  )
}
