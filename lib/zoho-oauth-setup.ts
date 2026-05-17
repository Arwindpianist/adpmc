import { getZohoAccountsBaseUrl, getZohoOAuthRedirectUri, ZOHO_CALENDAR_OAUTH_SCOPES } from "@/lib/zoho-oauth-scopes"

const DEFAULT_CALENDAR_API_BASE = "https://calendar.zoho.com/api/v1"

export { getZohoAccountsBaseUrl, getZohoOAuthRedirectUri }

export function getZohoCalendarApiBaseUrl(): string {
  return process.env.ZOHO_CALENDAR_API_BASE_URL?.trim() || DEFAULT_CALENDAR_API_BASE
}

type TokenExchangeResult = {
  refresh_token: string
  access_token: string
  expires_in?: number
  api_domain?: string
  token_type?: string
}

export async function exchangeZohoAuthorizationCode(
  code: string,
  redirectUri: string
): Promise<TokenExchangeResult> {
  const clientId = process.env.ZOHO_CLIENT_ID?.trim()
  const clientSecret = process.env.ZOHO_CLIENT_SECRET?.trim()

  if (!clientId || !clientSecret) {
    throw new Error("ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET must be set in .env.local before exchanging the code.")
  }

  const tokenUrl = new URL("/oauth/v2/token", getZohoAccountsBaseUrl())
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    code,
    scope: ZOHO_CALENDAR_OAUTH_SCOPES,
  })

  const response = await fetch(tokenUrl.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    cache: "no-store",
  })

  const data = await response.json()

  if (!response.ok) {
    const message =
      typeof data === "object" && data && "error" in data
        ? String((data as { error?: string }).error)
        : JSON.stringify(data)
    throw new Error(message || "Zoho token exchange failed.")
  }

  if (!data.refresh_token || !data.access_token) {
    throw new Error(
      "Zoho did not return a refresh_token. Re-run authorization with access_type=offline in the authorize URL."
    )
  }

  return data as TokenExchangeResult
}

export type ZohoCalendarListItem = {
  uid?: string
  name?: string
  isdefault?: boolean
}

function buildZohoCalendarApiUrl(pathWithQuery: string): string {
  const base = getZohoCalendarApiBaseUrl().replace(/\/$/, "")
  const relative = pathWithQuery.replace(/^\//, "")
  return `${base}/${relative}`
}

export async function listZohoCalendars(accessToken: string): Promise<ZohoCalendarListItem[]> {
  const response = await fetch(buildZohoCalendarApiUrl("calendars"), {
    headers: {
      Accept: "application/json",
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
    cache: "no-store",
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(typeof data === "object" ? JSON.stringify(data) : "Unable to list calendars.")
  }

  const calendars = (data as { calendars?: ZohoCalendarListItem[] }).calendars
  return Array.isArray(calendars) ? calendars : []
}
