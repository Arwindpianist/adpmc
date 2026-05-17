"use client"

import { openRazorpayCheckout } from "@/lib/razorpay-client"

export function setPaymentStatus(paid: boolean) {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "github_access_paid",
      JSON.stringify({
        paid,
        timestamp: Date.now(),
      })
    )

    document.cookie = `github_access_paid=${paid}; path=/; max-age=${paid ? 31536000 : 0}; SameSite=Lax`
  }
}

export function getPaymentStatus(): boolean {
  if (typeof window === "undefined") return false

  try {
    const stored = localStorage.getItem("github_access_paid")
    if (!stored) return false

    const data = JSON.parse(stored) as { paid?: boolean }
    return data.paid === true
  } catch {
    return false
  }
}

export async function startProjectAccessCheckout(): Promise<void> {
  const response = await fetch("/api/razorpay/create-project-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to create checkout order.")
  }

  await openRazorpayCheckout({
    keyId: data.keyId,
    orderId: data.orderId,
    amount: data.amount,
    currency: data.currency,
    title: data.title,
    description: data.description,
    callbackUrl: data.callbackUrl,
  })
}

export function markProjectAccessPaidFromRedirect() {
  setPaymentStatus(true)

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("storage"))
  }
}
