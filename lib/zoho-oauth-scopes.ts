/** Scopes required for /book-call (list calendars, free/busy, create events). */
export const ZOHO_CALENDAR_OAUTH_SCOPES = [
  "ZohoCalendar.calendar.ALL",
  "ZohoCalendar.freebusy.ALL",
  "ZohoCalendar.event.CREATE",
].join(",")

export function getZohoAccountsBaseUrl(): string {
  return process.env.ZOHO_ACCOUNTS_BASE_URL?.trim() || "https://accounts.zoho.com"
}

export function getZohoOAuthRedirectUri(origin: string): string {
  return `${origin.replace(/\/$/, "")}/oauth/zoho/callback`
}

export function buildZohoAuthorizeUrl(origin: string): string | null {
  const clientId = process.env.ZOHO_CLIENT_ID?.trim()

  if (!clientId) {
    return null
  }

  const url = new URL("/oauth/v2/auth", getZohoAccountsBaseUrl())
  url.searchParams.set("scope", ZOHO_CALENDAR_OAUTH_SCOPES)
  url.searchParams.set("client_id", clientId)
  url.searchParams.set("response_type", "code")
  url.searchParams.set("access_type", "offline")
  url.searchParams.set("redirect_uri", getZohoOAuthRedirectUri(origin))
  url.searchParams.set("prompt", "consent")

  return url.toString()
}

export function isInvalidOAuthScopeError(message: string): boolean {
  return /INVALID_OAUTHSCOPE|Invalid OAuth scope/i.test(message)
}
