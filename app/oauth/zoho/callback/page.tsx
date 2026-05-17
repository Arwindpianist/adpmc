import { headers } from "next/headers"
import Link from "next/link"

import { exchangeZohoAuthorizationCode, listZohoCalendars } from "@/lib/zoho-oauth-setup"
import { getZohoOAuthRedirectUri, ZOHO_CALENDAR_OAUTH_SCOPES } from "@/lib/zoho-oauth-scopes"

type ZohoCallbackPageProps = {
  searchParams: Promise<{
    code?: string
    error?: string
    location?: string
    "accounts-server"?: string
  }>
}

export default async function ZohoOAuthCallbackPage({ searchParams }: ZohoCallbackPageProps) {
  const params = await searchParams
  const headersList = await headers()
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host") ?? "localhost:3000"
  const protocol = headersList.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https")
  const origin = `${protocol}://${host}`
  const redirectUri = getZohoOAuthRedirectUri(origin)

  if (params.error) {
    return (
      <SetupShell title="Zoho authorization failed">
        <p className="text-sm text-red-300/90">Error: {params.error}</p>
        <p className="text-sm text-[#c9b8e8]/80">
          Try the authorize link again from the Zoho API Console, or use a Self Client to generate tokens.
        </p>
      </SetupShell>
    )
  }

  const code = params.code?.trim()

  if (!code) {
    return (
      <SetupShell title="Missing authorization code">
        <p className="text-sm text-[#c9b8e8]/80">
          No <code className="text-dracula-purple">code</code> query parameter was received. Start from the Zoho
          authorize URL, not this page directly.
        </p>
      </SetupShell>
    )
  }

  try {
    const tokens = await exchangeZohoAuthorizationCode(code, redirectUri)
    const calendars = await listZohoCalendars(tokens.access_token)
    const defaultCalendar = calendars.find((c) => c.isdefault) ?? calendars[0]

    return (
      <SetupShell title="Zoho Calendar connected">
        <p className="text-sm text-[#c9b8e8]/90">
          Copy these into <code className="text-dracula-purple">.env.local</code>, restart{" "}
          <code className="text-dracula-purple">npm run dev</code>, then test{" "}
          <Link href="/book-call" className="text-dracula-purple hover:text-dracula-pink">
            /book-call
          </Link>
          .
        </p>

        <EnvBlock label="ZOHO_REFRESH_TOKEN" value={tokens.refresh_token} />
        {defaultCalendar?.uid ? (
          <EnvBlock label="ZOHO_CALENDAR_UID" value={defaultCalendar.uid} />
        ) : (
          <p className="text-sm text-amber-200/90">No calendars returned. Set ZOHO_CALENDAR_UID manually from Zoho Calendar.</p>
        )}

        {calendars.length > 0 ? (
          <div className="surface-card-soft rounded-2xl p-4 text-sm">
            <p className="mb-2 font-medium text-zinc-50">Available calendars</p>
            <ul className="space-y-2 text-[#c9b8e8]/90">
              {calendars.map((calendar) => (
                <li key={calendar.uid ?? calendar.name}>
                  <span className="font-mono text-dracula-purple">{calendar.uid ?? "—"}</span>
                  {calendar.name ? ` · ${calendar.name}` : null}
                  {calendar.isdefault ? " (default)" : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="text-xs text-[#c9b8e8]/60">
          Redirect URI used: <span className="font-mono">{redirectUri}</span>
          {params.location ? ` · DC hint: ${params.location}` : null}
        </p>

        <p className="text-xs text-[#c9b8e8]/60">
          This page is for one-time setup. Remove or restrict access in production after you have saved the refresh
          token.
        </p>
      </SetupShell>
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Token exchange failed."

    return (
      <SetupShell title="Token exchange failed">
        <p className="text-sm text-red-300/90">{message}</p>
        <div className="surface-card-soft space-y-2 rounded-2xl p-4 text-sm text-[#c9b8e8]/90">
          <p>Checklist:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <code className="text-dracula-purple">ZOHO_CLIENT_ID</code> and{" "}
              <code className="text-dracula-purple">ZOHO_CLIENT_SECRET</code> are set in .env.local
            </li>
            <li>
              Redirect URI in Zoho console matches exactly: <span className="font-mono">{redirectUri}</span>
            </li>
            <li>Authorize URL included <span className="font-mono">access_type=offline</span></li>
            <li>Authorization code is fresh (single use, expires quickly)</li>
          </ul>
        </div>
        <p className="text-sm text-[#c9b8e8]/80">
          Raw code from your URL (if you need to retry manually):{" "}
          <code className="break-all text-dracula-purple">{code}</code>
        </p>
      </SetupShell>
    )
  }
}

function SetupShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="site-shell flex min-h-screen items-center justify-center px-4 py-16">
      <div className="surface-card w-full max-w-2xl space-y-5 rounded-[2rem] p-8 sm:p-10">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-50">{title}</h1>
        {children}
      </div>
    </main>
  )
}

function EnvBlock({ label, value }: { label: string; value: string }) {
  const line = `${label}=${value}`

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-dracula-purple/80">{label}</p>
      <pre className="theme-scrollbar overflow-x-auto rounded-2xl border border-[rgba(189,147,249,0.15)] bg-[#050208] p-4 text-xs leading-relaxed text-[#e9ddff]">
        {line}
      </pre>
    </div>
  )
}
