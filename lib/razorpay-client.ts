"use client"

export type RazorpayCheckoutPrefill = {
  name?: string
  email?: string
  contact?: string
}

export type RazorpayCheckoutInput = {
  keyId: string
  orderId: string
  amount: number
  currency: string
  title: string
  description: string
  callbackUrl: string
  prefill?: RazorpayCheckoutPrefill
}

type RazorpayConstructor = new (options: Record<string, unknown>) => { open: () => void }

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor
  }
}

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js"

let scriptPromise: Promise<void> | null = null

export function loadRazorpayCheckoutScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay checkout is only available in the browser."))
  }

  if (window.Razorpay) {
    return Promise.resolve()
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${RAZORPAY_SCRIPT_SRC}"]`)

      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true })
        existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay checkout.")), {
          once: true,
        })
        return
      }

      const script = document.createElement("script")
      script.src = RAZORPAY_SCRIPT_SRC
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error("Failed to load Razorpay checkout."))
      document.body.appendChild(script)
    })
  }

  return scriptPromise
}

export async function openRazorpayCheckout(input: RazorpayCheckoutInput): Promise<void> {
  await loadRazorpayCheckoutScript()

  if (!window.Razorpay) {
    throw new Error("Razorpay checkout is unavailable.")
  }

  const checkout = new window.Razorpay({
    key: input.keyId,
    amount: input.amount,
    currency: input.currency,
    name: input.title,
    description: input.description,
    order_id: input.orderId,
    callback_url: input.callbackUrl,
    prefill: input.prefill,
    theme: {
      color: "#bd93f9",
      backdrop_color: "rgba(5, 2, 8, 0.92)",
    },
    modal: {
      backdropclose: false,
      confirm_close: true,
    },
  })

  checkout.open()
}
