import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

import { buildZohoAuthorizeUrl, ZOHO_CALENDAR_OAUTH_SCOPES } from "@/lib/zoho-oauth-scopes"

type ZohoAuthorizePageProps = {
  searchParams: Promise<{ go?: string }>
}

export default async function ZohoAuthorizePage({ searchParams }: ZohoAuthorizePageProps) {
  const params = await searchParams
  const headersList = await headers()
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host") ?? "localhost:3000"
  const protocol = headersList.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https")
  const origin = `${protocol}://${host}`
  const authorizeUrl = buildZohoAuthorizeUrl(origin)

  if (params.go === "1" && authorizeUrl) {
    redirect(authorizeUrl)
  }

  return (
    <main className="site-shell flex min-h-screen items-center justify-center px-4 py-16">
      <div className="surface-card w-full max-w-2xl space-y-5 rounded-[2rem] p-8 sm:p-10">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-zinc-50">Connect Zoho Calendar</h1>
        <p className="text-sm leading-relaxed text-[#c9b8e8]/90">
          Your current token is missing required scopes (often only calendar access was granted). Re-authorize once
          with all scopes below, then paste the new <code className="text-dracula-purple">ZOHO_REFRESH_TOKEN</code>{" "}
          into <code className="text-dracula-purple">.env.local</code>.
        </p>
        <pre className="theme-scrollbar overflow-x-auto rounded-2xl border border-[rgba(189,147,249,0.15)] bg-[#050208] p-4 text-xs text-[#e9ddff]">
          {ZOHO_CALENDAR_OAUTH_SCOPES}
        </pre>
        {authorizeUrl ? (
          <Link
            href="/oauth/zoho?go=1"
            className="inline-flex rounded-full border border-[rgba(189,147,249,0.35)] bg-[rgba(189,147,249,0.12)] px-5 py-3 text-sm font-medium text-zinc-50 transition hover:border-[rgba(189,147,249,0.55)]"
          >
            Re-authorize with Zoho (consent screen)
          </Link>
        ) : (
          <p className="text-sm text-red-300/90">Set ZOHO_CLIENT_ID in .env.local first.</p>
        )}
        <p className="text-xs text-[#c9b8e8]/60">
          After approval you will land on <code>/oauth/zoho/callback</code> with a new refresh token. Restart{" "}
          <code>npm run dev</code>, then open <Link href="/book-call" className="text-dracula-purple">/book-call</Link>.
        </p>
      </div>
    </main>
  )
}
