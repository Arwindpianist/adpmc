import { createHmac, timingSafeEqual } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import {
  CALL_BOOKING_AMOUNT,
  CALL_BOOKING_AMOUNT_LABEL,
  CALL_BOOKING_CURRENCY,
  CALL_BOOKING_DURATION,
  CALL_BOOKING_FORMSPREE_ENDPOINT,
  CALL_BOOKING_PRODUCT_TYPE,
  CALL_BOOKING_TITLE,
} from "@/lib/call-booking"
import {
  PROJECT_ACCESS_PRODUCT_TYPE,
  getProjectAccessAmount,
  getProjectAccessCurrency,
} from "@/lib/project-access"
import {
  fetchRazorpayOrder,
  getRazorpayCredentials,
} from "@/lib/razorpay-server"
import { createZohoCalendarEvent, getAvailableSlotForSelection } from "@/lib/zoho-calendar"

const ACCESS_COOKIE = "github_access_paid"
const ACCESS_MAX_AGE = 60 * 60 * 24 * 365

function buildBookCallRedirectUrl(
  request: NextRequest,
  status: "success" | "failed" | "error",
  manual = false
): URL {
  const url = new URL("/book-call/success", request.url)
  url.searchParams.set("status", status)

  if (manual) {
    url.searchParams.set("manual", "1")
  }

  return url
}

function buildProjectRedirectUrl(request: NextRequest, status: "success" | "failed" | "error"): URL {
  const url = new URL("/payment-success", request.url)
  url.searchParams.set("status", status)
  return url
}

function verifySignature(orderId: string, paymentId: string, signature: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex")
  const expectedBuffer = Buffer.from(expected)
  const signatureBuffer = Buffer.from(signature)

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false
  }

  return timingSafeEqual(expectedBuffer, signatureBuffer)
}

function normalizeNotes(notes: unknown): Record<string, string> {
  if (!notes || Array.isArray(notes) || typeof notes !== "object") {
    return {}
  }

  return Object.fromEntries(
    Object.entries(notes).map(([key, value]) => [key, String(value ?? "").trim()])
  )
}

function resolveProductType(notes: Record<string, string>): string {
  return notes.product_type || notes.booking_type || ""
}

function attachAccessCookie(response: NextResponse) {
  response.cookies.set(ACCESS_COOKIE, "true", {
    path: "/",
    maxAge: ACCESS_MAX_AGE,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  })
}

async function submitBookingNotification(input: {
  customerName: string
  customerEmail: string
  customerPhone: string
  bookingDate: string
  bookingTime: string
  timezone: string
  agenda: string
  paymentId: string
  orderId: string
  zohoEventUrl?: string
}) {
  const formData = new FormData()
  formData.append("_subject", `Paid call booking: ${input.customerName}`)
  formData.append("booking_type", CALL_BOOKING_TITLE)
  formData.append("duration", CALL_BOOKING_DURATION)
  formData.append("amount", CALL_BOOKING_AMOUNT_LABEL)
  formData.append("currency", CALL_BOOKING_CURRENCY)
  formData.append("name", input.customerName)
  formData.append("email", input.customerEmail)
  formData.append("phone", input.customerPhone)
  formData.append("booking_date", input.bookingDate)
  formData.append("booking_time", input.bookingTime)
  formData.append("timezone", input.timezone)
  formData.append("razorpay_order_id", input.orderId)
  formData.append("razorpay_payment_id", input.paymentId)
  formData.append("zoho_event_url", input.zohoEventUrl ?? "")
  formData.append(
    "message",
    [
      "A paid 30-minute consultation call has been booked.",
      "",
      `Agenda: ${input.agenda}`,
      `Booked date: ${input.bookingDate}`,
      `Booked time: ${input.bookingTime}`,
      `Timezone: ${input.timezone}`,
      `Payment amount: ${CALL_BOOKING_AMOUNT_LABEL}`,
      `Order ID: ${input.orderId}`,
      `Payment ID: ${input.paymentId}`,
      input.zohoEventUrl ? `Zoho event: ${input.zohoEventUrl}` : "Zoho event: unavailable",
    ].join("\n")
  )

  const response = await fetch(CALL_BOOKING_FORMSPREE_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Unable to forward the booking notification.")
  }
}

async function handleConsultationBooking(
  request: NextRequest,
  notes: Record<string, string>,
  paymentId: string,
  orderId: string
) {
  const bookingDate = notes.booking_date || ""
  const bookingTime = notes.booking_time || ""
  const slotStartUtc = notes.slot_start_utc || ""
  const slotEndUtc = notes.slot_end_utc || ""
  const timezone = notes.timezone || "Asia/Kuala_Lumpur"

  const selectedSlot =
    bookingDate && bookingTime ? await getAvailableSlotForSelection(bookingDate, bookingTime) : null

  let zohoEventUrl = ""

  if (
    selectedSlot &&
    selectedSlot.startUtc === slotStartUtc &&
    selectedSlot.endUtc === slotEndUtc
  ) {
    const event = await createZohoCalendarEvent({
      customerName: notes.customer_name || "Unknown customer",
      customerEmail: notes.customer_email || "",
      customerPhone: notes.customer_phone || "",
      agenda: notes.agenda || "No agenda provided.",
      bookingDate,
      bookingTime,
      slotStartUtc,
      slotEndUtc,
    })

    zohoEventUrl = event?.viewEventURL || ""
  } else {
    return NextResponse.redirect(buildBookCallRedirectUrl(request, "success", true), 303)
  }

  await submitBookingNotification({
    customerName: notes.customer_name || "Unknown customer",
    customerEmail: notes.customer_email || "",
    customerPhone: notes.customer_phone || "",
    bookingDate,
    bookingTime,
    timezone,
    agenda: notes.agenda || "No agenda provided.",
    paymentId,
    orderId,
    zohoEventUrl,
  })

  return NextResponse.redirect(buildBookCallRedirectUrl(request, "success"), 303)
}

export async function POST(request: NextRequest) {
  const credentials = getRazorpayCredentials()

  if (!credentials) {
    return NextResponse.redirect(buildBookCallRedirectUrl(request, "error", true), 303)
  }

  try {
    const formData = await request.formData()
    const paymentId = formData.get("razorpay_payment_id")?.toString().trim() ?? ""
    const orderId = formData.get("razorpay_order_id")?.toString().trim() ?? ""
    const signature = formData.get("razorpay_signature")?.toString().trim() ?? ""

    if (!paymentId || !orderId || !signature) {
      return NextResponse.redirect(buildProjectRedirectUrl(request, "failed"), 303)
    }

    const isSignatureValid = verifySignature(orderId, paymentId, signature, credentials.keySecret)

    if (!isSignatureValid) {
      return NextResponse.redirect(buildProjectRedirectUrl(request, "failed"), 303)
    }

    const order = await fetchRazorpayOrder(orderId, credentials.keyId, credentials.keySecret)
    const notes = normalizeNotes(order.notes)
    const productType = resolveProductType(notes)

    if (productType === PROJECT_ACCESS_PRODUCT_TYPE) {
      const expectedAmount = getProjectAccessAmount()
      const expectedCurrency = getProjectAccessCurrency()

      if (order.amount !== expectedAmount || order.currency !== expectedCurrency) {
        return NextResponse.redirect(buildProjectRedirectUrl(request, "failed"), 303)
      }

      const response = NextResponse.redirect(buildProjectRedirectUrl(request, "success"), 303)
      attachAccessCookie(response)
      return response
    }

    if (productType === CALL_BOOKING_PRODUCT_TYPE) {
      const isExpectedBooking =
        order.amount === CALL_BOOKING_AMOUNT && order.currency === CALL_BOOKING_CURRENCY

      if (!isExpectedBooking) {
        return NextResponse.redirect(buildBookCallRedirectUrl(request, "failed"), 303)
      }

      try {
        return await handleConsultationBooking(request, notes, paymentId, orderId)
      } catch {
        return NextResponse.redirect(buildBookCallRedirectUrl(request, "success", true), 303)
      }
    }

    return NextResponse.redirect(buildProjectRedirectUrl(request, "failed"), 303)
  } catch {
    return NextResponse.redirect(buildProjectRedirectUrl(request, "error"), 303)
  }
}

export const runtime = "nodejs"
