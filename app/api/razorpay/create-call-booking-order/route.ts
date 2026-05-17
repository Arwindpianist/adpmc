import { NextRequest, NextResponse } from "next/server"
import {
  CALL_BOOKING_AMOUNT,
  CALL_BOOKING_CURRENCY,
  CALL_BOOKING_DESCRIPTION,
  CALL_BOOKING_PRODUCT_TYPE,
  CALL_BOOKING_TIMEZONE,
  CALL_BOOKING_TITLE,
} from "@/lib/call-booking"
import {
  buildCallbackUrl,
  createRazorpayOrder,
  getRazorpayCredentials,
} from "@/lib/razorpay-server"
import { getAvailableSlotForSelection, hasZohoCalendarConfig } from "@/lib/zoho-calendar"

type CallBookingPayload = {
  name?: string
  email?: string
  phone?: string
  selectedDate?: string
  selectedTime?: string
  agenda?: string
}

function sanitizeText(value: unknown, maxLength = 240): string {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function buildReceiptId(): string {
  return `call-${Date.now().toString(36)}`.slice(0, 40)
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

    if (!hasZohoCalendarConfig()) {
      return NextResponse.json(
        { error: "Zoho Calendar is not configured yet." },
        { status: 500 }
      )
    }

    const body = (await request.json()) as CallBookingPayload

    const name = sanitizeText(body.name, 120)
    const email = sanitizeText(body.email, 160).toLowerCase()
    const phone = sanitizeText(body.phone, 40)
    const selectedDate = sanitizeText(body.selectedDate, 40)
    const selectedTime = sanitizeText(body.selectedTime, 40)
    const agenda = sanitizeText(body.agenda, 240)

    if (!name || !email || !phone || !selectedDate || !selectedTime || !agenda) {
      return NextResponse.json(
        { error: "Please complete all required booking fields." },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    const selectedSlot = await getAvailableSlotForSelection(selectedDate, selectedTime)

    if (!selectedSlot) {
      return NextResponse.json(
        { error: "That timeslot is no longer available. Please choose another slot." },
        { status: 409 }
      )
    }

    const origin = request.headers.get("origin") ?? new URL(request.url).origin
    const callbackUrl = buildCallbackUrl(origin)

    const order = await createRazorpayOrder({
      amount: CALL_BOOKING_AMOUNT,
      currency: CALL_BOOKING_CURRENCY,
      receipt: buildReceiptId(),
      notes: {
        product_type: CALL_BOOKING_PRODUCT_TYPE,
        booking_type: CALL_BOOKING_PRODUCT_TYPE,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        booking_date: selectedDate,
        booking_time: selectedTime,
        timezone: CALL_BOOKING_TIMEZONE,
        slot_label: selectedSlot.label,
        slot_start_utc: selectedSlot.startUtc,
        slot_end_utc: selectedSlot.endUtc,
        agenda,
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
      title: CALL_BOOKING_TITLE,
      description: CALL_BOOKING_DESCRIPTION,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create call booking order."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export const runtime = "nodejs"
