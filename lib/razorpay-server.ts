const RAZORPAY_API_BASE = "https://api.razorpay.com/v1"

export type RazorpayCredentials = {
  keyId: string
  keySecret: string
  publishableKeyId: string
}

export function getRazorpayCredentials(): RazorpayCredentials | null {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim()
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim()
  const publishableKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim()

  if (!keyId || !keySecret || !publishableKeyId) {
    return null
  }

  return { keyId, keySecret, publishableKeyId }
}

export function getBasicAuthHeader(keyId: string, keySecret: string): string {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`
}

export function buildCallbackUrl(origin: string): string {
  return `${origin}/api/razorpay/callback`
}

export async function createRazorpayOrder(input: {
  amount: number
  currency: string
  receipt: string
  notes: Record<string, string>
  keyId: string
  keySecret: string
}): Promise<{ id: string; amount: number; currency: string }> {
  const orderResponse = await fetch(`${RAZORPAY_API_BASE}/orders`, {
    method: "POST",
    headers: {
      Authorization: getBasicAuthHeader(input.keyId, input.keySecret),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amount,
      currency: input.currency,
      receipt: input.receipt,
      notes: input.notes,
    }),
    cache: "no-store",
  })

  if (!orderResponse.ok) {
    const errorText = await orderResponse.text()
    throw new Error(errorText || "Unable to create Razorpay Curlec order.")
  }

  const order = await orderResponse.json()
  return {
    id: order.id as string,
    amount: order.amount as number,
    currency: order.currency as string,
  }
}

export async function fetchRazorpayOrder(orderId: string, keyId: string, keySecret: string) {
  const response = await fetch(`${RAZORPAY_API_BASE}/orders/${encodeURIComponent(orderId)}`, {
    headers: {
      Authorization: getBasicAuthHeader(keyId, keySecret),
      Accept: "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Unable to retrieve the Razorpay Curlec order.")
  }

  return response.json()
}
