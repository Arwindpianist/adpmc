import { NextRequest, NextResponse } from "next/server"
import { CALL_BOOKING_TIMEZONE, CALL_BOOKING_SLOT_MINUTES } from "@/lib/call-booking"
import { isInvalidOAuthScopeError } from "@/lib/zoho-oauth-scopes"
import { getAvailableCallSlots, hasZohoCalendarConfig } from "@/lib/zoho-calendar"

export async function GET(request: NextRequest) {
  try {
    if (!hasZohoCalendarConfig()) {
      return NextResponse.json(
        { error: "Zoho Calendar is not configured yet." },
        { status: 500 }
      )
    }

    const date = request.nextUrl.searchParams.get("date")?.trim() ?? ""

    if (!date) {
      return NextResponse.json(
        { error: "Booking date is required." },
        { status: 400 }
      )
    }

    const slots = await getAvailableCallSlots(date)

    return NextResponse.json({
      date,
      timezone: CALL_BOOKING_TIMEZONE,
      slotDurationMinutes: CALL_BOOKING_SLOT_MINUTES,
      slots,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to fetch Zoho availability."
    console.error("[zoho/availability]", message)

    return NextResponse.json(
      {
        error: message,
        hint: isInvalidOAuthScopeError(message)
          ? "Visit http://localhost:3000/oauth/zoho to re-authorize with free/busy scope, then update ZOHO_REFRESH_TOKEN."
          : process.env.NODE_ENV === "development"
            ? "Visit /oauth/zoho if scopes are missing."
            : undefined,
      },
      { status: 500 }
    )
  }
}

export const runtime = "nodejs"
