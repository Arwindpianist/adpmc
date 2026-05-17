"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { CalendarClock, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  CALL_BOOKING_AMOUNT_LABEL,
  CALL_BOOKING_TIMEZONE_LABEL,
  CALL_BOOKING_TITLE,
} from "@/lib/call-booking"
import { openRazorpayCheckout } from "@/lib/razorpay-client"
import type { AvailabilitySlot } from "@/lib/zoho-calendar"
import { cn } from "@/lib/utils"

function todayIsoDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export default function BookCallForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [agenda, setAgenda] = useState("")
  const [selectedDate, setSelectedDate] = useState(todayIsoDate())
  const [selectedTime, setSelectedTime] = useState("")
  const [slots, setSlots] = useState<AvailabilitySlot[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const loadSlots = useCallback(async (date: string) => {
    setSlotsLoading(true)
    setSlotsError(null)
    setSelectedTime("")

    try {
      const response = await fetch(`/api/zoho/availability?date=${encodeURIComponent(date)}`)
      const data = await response.json()

      if (!response.ok) {
        const hint = typeof data.hint === "string" ? ` ${data.hint}` : ""
        throw new Error(`${data.error || "Unable to load availability."}${hint}`)
      }

      setSlots(Array.isArray(data.slots) ? data.slots : [])
    } catch (error: unknown) {
      setSlots([])
      setSlotsError(error instanceof Error ? error.message : "Unable to load availability.")
    } finally {
      setSlotsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSlots(selectedDate)
  }, [loadSlots, selectedDate])

  const selectedSlot = useMemo(
    () => slots.find((slot) => slot.time === selectedTime) ?? null,
    [selectedTime, slots]
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    if (!selectedSlot) {
      setFormError("Please choose an available timeslot.")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/razorpay/create-call-booking-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          selectedDate,
          selectedTime: selectedSlot.time,
          agenda,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout.")
      }

      await openRazorpayCheckout({
        keyId: data.keyId,
        orderId: data.orderId,
        amount: data.amount,
        currency: data.currency,
        title: data.title,
        description: data.description,
        callbackUrl: data.callbackUrl,
        prefill: { name, email, contact: phone },
      })
    } catch (error: unknown) {
      setFormError(error instanceof Error ? error.message : "Unable to start checkout.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="surface-card theme-scrollbar space-y-6 rounded-[2rem] p-6 sm:p-8">
      <div className="space-y-2">
        <p className="section-kicker">Schedule</p>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-50">{CALL_BOOKING_TITLE}</h2>
        <p className="text-sm leading-relaxed text-[#c9b8e8]/90">
          Pick a slot in {CALL_BOOKING_TIMEZONE_LABEL}, share your agenda, then complete secure payment (
          {CALL_BOOKING_AMOUNT_LABEL}) via Razorpay Curlec.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-[#c9b8e8]/80">Date</span>
          <Input
            type="date"
            required
            min={todayIsoDate()}
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </label>
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="text-[#c9b8e8]/80">Available times ({CALL_BOOKING_TIMEZONE_LABEL})</span>
          <div className="theme-scrollbar max-h-48 overflow-y-auto rounded-2xl border border-[rgba(189,147,249,0.15)] bg-[#050208]/80 p-3">
            {slotsLoading ? (
              <div className="flex items-center gap-2 text-sm text-[#c9b8e8]/70">
                <Loader2 className="h-4 w-4 animate-spin text-dracula-purple" />
                Loading slots...
              </div>
            ) : null}

            {!slotsLoading && slotsError ? (
              <p className="text-sm text-red-300/90">{slotsError}</p>
            ) : null}

            {!slotsLoading && !slotsError && slots.length === 0 ? (
              <p className="text-sm text-[#c9b8e8]/70">No open slots on this date. Try another day.</p>
            ) : null}

            {!slotsLoading && !slotsError && slots.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {slots.map((slot) => (
                  <button
                    key={`${slot.date}-${slot.time}`}
                    type="button"
                    onClick={() => setSelectedTime(slot.time)}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-left text-sm transition",
                      selectedTime === slot.time
                        ? "border-[rgba(189,147,249,0.45)] bg-[rgba(189,147,249,0.12)] text-zinc-50"
                        : "border-[rgba(189,147,249,0.12)] text-[#c9b8e8]/90 hover:border-[rgba(189,147,249,0.35)]"
                    )}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="text-[#c9b8e8]/80">Name</span>
          <Input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
        </label>
        <label className="space-y-2 text-sm">
          <span className="text-[#c9b8e8]/80">Email</span>
          <Input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </label>
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="text-[#c9b8e8]/80">Phone (WhatsApp preferred)</span>
          <Input
            required
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="tel"
          />
        </label>
        <label className="space-y-2 text-sm sm:col-span-2">
          <span className="text-[#c9b8e8]/80">Agenda</span>
          <Textarea
            required
            value={agenda}
            onChange={(event) => setAgenda(event.target.value)}
            placeholder="What should we prepare for? Scope, systems, timeline, constraints."
          />
        </label>
      </div>

      {formError ? <p className="text-sm text-red-300/90">{formError}</p> : null}

      <Button type="submit" size="lg" className="w-full justify-center gap-2" disabled={submitting || slotsLoading}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Opening checkout...
          </>
        ) : (
          <>
            <CalendarClock className="h-4 w-4" />
            Pay {CALL_BOOKING_AMOUNT_LABEL} and confirm slot
          </>
        )}
      </Button>
    </form>
  )
}
