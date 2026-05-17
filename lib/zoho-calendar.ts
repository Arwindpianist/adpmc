import {
  CALL_BOOKING_DURATION,
  CALL_BOOKING_SLOT_MINUTES,
  CALL_BOOKING_TIMEZONE,
  CALL_BOOKING_TIMEZONE_LABEL,
  CALL_BOOKING_TITLE,
  CALL_BOOKING_WORKING_HOURS,
} from "@/lib/call-booking"
import { isInvalidOAuthScopeError, ZOHO_CALENDAR_OAUTH_SCOPES } from "@/lib/zoho-oauth-scopes"

const DEFAULT_ZOHO_ACCOUNTS_BASE_URL = "https://accounts.zoho.com"
const DEFAULT_ZOHO_CALENDAR_API_BASE_URL = "https://calendar.zoho.com/api/v1"
const MALAYSIA_OFFSET_MINUTES = 8 * 60

type ZohoConfig = {
  accountsBaseUrl: string
  calendarApiBaseUrl: string
  clientId: string
  clientSecret: string
  refreshToken: string
  calendarUid: string
  calendarEmail: string
}

type ZohoFreeBusyResponse = {
  freebusy?: Array<{
    startTime?: string
    endTime?: string
    fbtype?: string
  }>
}

type ZohoCreateEventResponse = {
  events?: Array<{
    id?: string
    uid?: string
    viewEventURL?: string
  }>
}

export type AvailabilitySlot = {
  date: string
  time: string
  label: string
  startUtc: string
  endUtc: string
}

type CreateCalendarEventInput = {
  customerName: string
  customerEmail: string
  customerPhone: string
  agenda: string
  bookingDate: string
  bookingTime: string
  slotStartUtc: string
  slotEndUtc: string
}

let accessTokenCache:
  | {
      token: string
      expiresAt: number
    }
  | null = null

function getZohoConfig(): ZohoConfig | null {
  const clientId = process.env.ZOHO_CLIENT_ID?.trim()
  const clientSecret = process.env.ZOHO_CLIENT_SECRET?.trim()
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN?.trim()
  const calendarUid = process.env.ZOHO_CALENDAR_UID?.trim()
  const calendarEmail = process.env.ZOHO_CALENDAR_EMAIL?.trim()

  if (!clientId || !clientSecret || !refreshToken || !calendarUid || !calendarEmail) {
    return null
  }

  return {
    accountsBaseUrl: process.env.ZOHO_ACCOUNTS_BASE_URL?.trim() || DEFAULT_ZOHO_ACCOUNTS_BASE_URL,
    calendarApiBaseUrl:
      process.env.ZOHO_CALENDAR_API_BASE_URL?.trim() || DEFAULT_ZOHO_CALENDAR_API_BASE_URL,
    clientId,
    clientSecret,
    refreshToken,
    calendarUid,
    calendarEmail,
  }
}

export function hasZohoCalendarConfig() {
  return getZohoConfig() !== null
}

function parseDateParts(date: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)

  if (!match) {
    throw new Error("Invalid booking date.")
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  }
}

function parseTimeParts(time: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(time)

  if (!match) {
    throw new Error("Invalid booking time.")
  }

  return {
    hours: Number(match[1]),
    minutes: Number(match[2]),
  }
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}

function toMalaysiaUtcDate(date: string, time: string) {
  const { year, month, day } = parseDateParts(date)
  const { hours, minutes } = parseTimeParts(time)
  const utcMinutes = hours * 60 + minutes - MALAYSIA_OFFSET_MINUTES

  return new Date(Date.UTC(year, month - 1, day, 0, utcMinutes, 0))
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000)
}

function formatZohoLocalRangeBoundary(date: string, time: string) {
  const { year, month, day } = parseDateParts(date)
  const { hours, minutes } = parseTimeParts(time)

  return `${year}${pad(month)}${pad(day)}T${pad(hours)}${pad(minutes)}00`
}

function formatZohoUtc(date: Date) {
  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
  ].join("") + `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
}

function parseZohoUtc(value: string) {
  const zuluMatch = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(value)

  if (zuluMatch) {
    return new Date(
      Date.UTC(
        Number(zuluMatch[1]),
        Number(zuluMatch[2]) - 1,
        Number(zuluMatch[3]),
        Number(zuluMatch[4]),
        Number(zuluMatch[5]),
        Number(zuluMatch[6])
      )
    )
  }

  const basicMatch = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/.exec(value)

  if (basicMatch) {
    return new Date(
      Date.UTC(
        Number(basicMatch[1]),
        Number(basicMatch[2]) - 1,
        Number(basicMatch[3]),
        Number(basicMatch[4]),
        Number(basicMatch[5]),
        Number(basicMatch[6])
      )
    )
  }

  throw new Error(`Invalid Zoho datetime: ${value}`)
}

function parseZohoBusyTime(value: string): Date | null {
  try {
    return parseZohoUtc(value)
  } catch {
    return null
  }
}

function toTimeLabel(time: string) {
  const { hours, minutes } = parseTimeParts(time)
  const suffix = hours >= 12 ? "PM" : "AM"
  const hour12 = hours % 12 || 12

  return `${hour12}:${pad(minutes)} ${suffix}`
}

function getMalaysiaDayOfWeek(date: string) {
  const { year, month, day } = parseDateParts(date)
  // Use midday MYT so getUTCDay() matches the calendar date in Malaysia (midnight MYT is still previous UTC day).
  return new Date(`${year}-${pad(month)}-${pad(day)}T12:00:00+08:00`).getUTCDay()
}

function getWorkingWindows(date: string) {
  return CALL_BOOKING_WORKING_HOURS[getMalaysiaDayOfWeek(date) as keyof typeof CALL_BOOKING_WORKING_HOURS] || []
}

async function getZohoAccessToken(config: ZohoConfig) {
  if (accessTokenCache && accessTokenCache.expiresAt > Date.now() + 60_000) {
    return accessTokenCache.token
  }

  const tokenUrl = new URL("/oauth/v2/token", config.accountsBaseUrl)
  tokenUrl.searchParams.set("refresh_token", config.refreshToken)
  tokenUrl.searchParams.set("grant_type", "refresh_token")
  tokenUrl.searchParams.set("client_id", config.clientId)
  tokenUrl.searchParams.set("client_secret", config.clientSecret)

  const response = await fetch(tokenUrl.toString(), {
    method: "POST",
    cache: "no-store",
  })

  const data = await response.json()

  if (!response.ok) {
    const zohoError =
      typeof data === "object" && data && "error" in data
        ? String((data as { error?: string }).error)
        : JSON.stringify(data)
    throw new Error(`Unable to refresh Zoho access token: ${zohoError}`)
  }

  if (!data.access_token) {
    throw new Error("Zoho access token was not returned.")
  }

  const expiresInSeconds = Number(data.expires_in_sec ?? data.expires_in ?? 3600)
  accessTokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + expiresInSeconds * 1000,
  }

  return data.access_token as string
}

function buildZohoApiUrl(baseUrl: string, pathWithQuery: string): string {
  const base = baseUrl.replace(/\/$/, "")
  const relative = pathWithQuery.replace(/^\//, "")
  return `${base}/${relative}`
}

function formatZohoApiError(status: number, body: string): string {
  const trimmed = body.trim()

  if (trimmed.startsWith("<") || trimmed.includes("<html")) {
    return `Zoho Calendar returned HTML instead of JSON (${status}). Check that ZOHO_CALENDAR_API_BASE_URL is https://calendar.zoho.com/api/v1 and that OAuth scopes include ZohoCalendar.freebusy.ALL.`
  }

  if (isInvalidOAuthScopeError(trimmed)) {
    return `Your Zoho refresh token is missing Calendar API scopes. Visit /oauth/zoho to re-authorize with: ${ZOHO_CALENDAR_OAUTH_SCOPES}`
  }

  const scopeHint =
    status === 401 || status === 403
      ? ` Re-authorize at /oauth/zoho with scopes: ${ZOHO_CALENDAR_OAUTH_SCOPES}`
      : ""

  return (trimmed || `Zoho Calendar request failed (${status}).`) + scopeHint
}

async function zohoRequest<T>(pathWithQuery: string, init?: RequestInit) {
  const config = getZohoConfig()

  if (!config) {
    throw new Error("Zoho Calendar is not configured.")
  }

  const accessToken = await getZohoAccessToken(config)
  const url = buildZohoApiUrl(config.calendarApiBaseUrl, pathWithQuery)
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  })

  const responseText = await response.text()

  if (!response.ok) {
    throw new Error(formatZohoApiError(response.status, responseText))
  }

  try {
    return JSON.parse(responseText) as T
  } catch {
    throw new Error(formatZohoApiError(response.status, responseText))
  }
}

async function fetchBusyIntervalsForDate(date: string) {
  const config = getZohoConfig()

  if (!config) {
    throw new Error("Zoho Calendar is not configured.")
  }

  const query = new URLSearchParams({
    uemail: config.calendarEmail,
    sdate: formatZohoLocalRangeBoundary(date, "00:00"),
    edate: formatZohoLocalRangeBoundary(date, "23:59"),
    ftype: "eventbased",
  })

  const data = await zohoRequest<ZohoFreeBusyResponse>(`calendars/freebusy?${query.toString()}`)

  if (!Array.isArray(data.freebusy)) {
    return []
  }

  return data.freebusy
    .filter((entry) => entry.startTime && entry.endTime && entry.fbtype !== "free")
    .map((entry) => {
      const start = parseZohoBusyTime(entry.startTime as string)
      const end = parseZohoBusyTime(entry.endTime as string)

      if (!start || !end) {
        return null
      }

      return { start, end }
    })
    .filter((entry): entry is { start: Date; end: Date } => entry !== null)
}

function slotOverlapsBusyWindow(
  slotStart: Date,
  slotEnd: Date,
  busyWindows: Array<{ start: Date; end: Date }>
) {
  return busyWindows.some((busy) => slotStart < busy.end && slotEnd > busy.start)
}

function isPastSlot(slotStart: Date) {
  return slotStart.getTime() <= Date.now()
}

export async function getAvailableCallSlots(date: string) {
  const workingWindows = getWorkingWindows(date)

  if (workingWindows.length === 0) {
    return [] as AvailabilitySlot[]
  }

  const busyWindows = await fetchBusyIntervalsForDate(date)
  const slots: AvailabilitySlot[] = []

  for (const window of workingWindows) {
    let cursor = toMalaysiaUtcDate(date, window.start)
    const windowEnd = toMalaysiaUtcDate(date, window.end)

    while (cursor.getTime() + CALL_BOOKING_SLOT_MINUTES * 60 * 1000 <= windowEnd.getTime()) {
      const slotEnd = addMinutes(cursor, CALL_BOOKING_SLOT_MINUTES)
      const localTimeHours = cursor.getUTCHours() + 8
      const localTimeMinutes = cursor.getUTCMinutes()
      const normalizedHours = ((localTimeHours % 24) + 24) % 24
      const time = `${pad(normalizedHours)}:${pad(localTimeMinutes)}`

      if (!slotOverlapsBusyWindow(cursor, slotEnd, busyWindows) && !isPastSlot(cursor)) {
        slots.push({
          date,
          time,
          label: `${toTimeLabel(time)} ${CALL_BOOKING_TIMEZONE_LABEL}`,
          startUtc: formatZohoUtc(cursor),
          endUtc: formatZohoUtc(slotEnd),
        })
      }

      cursor = slotEnd
    }
  }

  return slots
}

export async function getAvailableSlotForSelection(date: string, time: string) {
  const slots = await getAvailableCallSlots(date)
  return slots.find((slot) => slot.time === time) ?? null
}

export async function createZohoCalendarEvent(input: CreateCalendarEventInput) {
  const config = getZohoConfig()

  if (!config) {
    throw new Error("Zoho Calendar is not configured.")
  }

  const description = [
    `${CALL_BOOKING_TITLE}`,
    "",
    `Duration: ${CALL_BOOKING_DURATION}`,
    `Booked date: ${input.bookingDate}`,
    `Booked time: ${input.bookingTime} ${CALL_BOOKING_TIMEZONE_LABEL}`,
    "",
    `Name: ${input.customerName}`,
    `Email: ${input.customerEmail}`,
    `Phone: ${input.customerPhone}`,
    "",
    "Agenda:",
    input.agenda,
  ].join("\n")

  const eventdata = {
    title: `${CALL_BOOKING_TITLE} - ${input.customerName}`,
    dateandtime: {
      timezone: CALL_BOOKING_TIMEZONE,
      start: input.slotStartUtc,
      end: input.slotEndUtc,
    },
    isprivate: true,
    location: "Website booking",
    description,
  }

  const encodedEventData = encodeURIComponent(JSON.stringify(eventdata))
  const response = await zohoRequest<ZohoCreateEventResponse>(
    `calendars/${encodeURIComponent(config.calendarUid)}/events?eventdata=${encodedEventData}`,
    {
      method: "POST",
    }
  )

  return response.events?.[0] ?? null
}
