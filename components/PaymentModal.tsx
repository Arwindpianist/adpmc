"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { LockKeyhole, Sparkles, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { startProjectAccessCheckout } from "@/lib/payment"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const priceLabel = process.env.NEXT_PUBLIC_PROJECT_ACCESS_AMOUNT_LABEL?.trim() || "Paid access"

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handlePurchase = async () => {
    setLoading(true)

    try {
      await startProjectAccessCheckout()
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred. Please try again."
      alert(message)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="popover-surface relative w-full max-w-lg rounded-[2rem] p-6 sm:p-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(189,147,249,0.15)] text-[#c9b8e8]/70 transition hover:border-[rgba(189,147,249,0.35)] hover:text-zinc-50"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>

              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(189,147,249,0.15)] text-dracula-purple">
                <LockKeyhole className="h-6 w-6" />
              </div>

              <div className="mt-6 space-y-3">
                <p className="section-kicker">Repository access</p>
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-heading">Unlock source code access</h2>
                <p className="text-sm leading-7 text-zinc-400 sm:text-base">
                  Purchase one secure access path for current and future repository listings referenced from Case
                  Studies in Infrastructure.
                </p>
              </div>

              <div className="mt-6 space-y-3 rounded-[1.75rem] border border-[rgba(189,147,249,0.12)] bg-[#050208]/60 p-5">
                {[
                  "Full repository visibility for available code listings",
                  "Permanent access after successful payment verification",
                  "Source browsing without exposing repository URLs directly in the UI",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-7 text-zinc-300">
                    <Sparkles className="mt-1 h-4 w-4 text-dracula-purple" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button type="button" size="lg" onClick={handlePurchase} disabled={loading}>
                  {loading ? "Processing..." : `Purchase access (${priceLabel})`}
                </Button>
                <p className="text-center text-xs text-[#c9b8e8]/60">Secure payment powered by Razorpay Curlec.</p>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}
