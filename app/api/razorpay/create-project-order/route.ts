import { NextRequest, NextResponse } from "next/server"

import {
  PROJECT_ACCESS_DESCRIPTION,
  PROJECT_ACCESS_PRODUCT_TYPE,
  PROJECT_ACCESS_TITLE,
  getProjectAccessAmount,
  getProjectAccessCurrency,
} from "@/lib/project-access"
import {
  buildCallbackUrl,
  createRazorpayOrder,
  getRazorpayCredentials,
} from "@/lib/razorpay-server"

function buildReceiptId(): string {
  return `repo-${Date.now().toString(36)}`.slice(0, 40)
}

export async function POST(request: NextRequest) {
  try {
    const credentials = getRazorpayCredentials()

    if (!credentials) {
      return NextResponse.json(
        { error: "Razorpay Curlec is not configured yet." },
        { status: 500 }
      )
    }

    const amount = getProjectAccessAmount()
    const currency = getProjectAccessCurrency()
    const origin = request.headers.get("origin") ?? new URL(request.url).origin
    const callbackUrl = buildCallbackUrl(origin)

    const order = await createRazorpayOrder({
      amount,
      currency,
      receipt: buildReceiptId(),
      notes: {
        product_type: PROJECT_ACCESS_PRODUCT_TYPE,
      },
      keyId: credentials.keyId,
      keySecret: credentials.keySecret,
    })

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: credentials.publishableKeyId,
      callbackUrl,
      title: PROJECT_ACCESS_TITLE,
      description: PROJECT_ACCESS_DESCRIPTION,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create project access order."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export const runtime = "nodejs"
