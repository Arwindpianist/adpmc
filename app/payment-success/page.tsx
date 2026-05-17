"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"

import { markProjectAccessPaidFromRedirect } from "@/lib/payment"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const status = searchParams.get("status")
  const [view, setView] = useState<"loading" | "success" | "error">("loading")

  useEffect(() => {
    if (status === "success") {
      markProjectAccessPaidFromRedirect()
      setView("success")
      const timer = window.setTimeout(() => {
        router.push("/projects")
      }, 2500)
      return () => window.clearTimeout(timer)
    }

    if (status === "failed" || status === "error") {
      setView("error")
      return
    }

    setView("error")
  }, [router, status])

  return (
    <main className="site-shell flex min-h-screen items-center justify-center px-4 py-16">
      <div className="surface-card w-full max-w-xl rounded-[2rem] p-8 text-center sm:p-10">
        {view === "loading" ? (
          <>
            <Loader2 className="mx-auto h-14 w-14 animate-spin text-dracula-purple" />
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-heading">Verifying payment</h1>
            <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">
              Please wait while we confirm access to the repository catalog.
            </p>
          </>
        ) : null}

        {view === "success" ? (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-300" />
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-heading">Access unlocked</h1>
            <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">
              Payment was verified successfully. You will be redirected to the projects page shortly.
            </p>
            <Link
              href="/projects"
              className="mt-8 inline-flex rounded-full border border-[rgba(189,147,249,0.15)] bg-[rgba(189,147,249,0.08)] px-5 py-3 text-sm font-medium text-white transition hover:border-[rgba(189,147,249,0.35)]"
            >
              Go to projects now
            </Link>
          </>
        ) : null}

        {view === "error" ? (
          <>
            <XCircle className="mx-auto h-14 w-14 text-red-300" />
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-heading">Verification failed</h1>
            <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">
              We could not confirm the payment. If you have already paid, contact us and we will verify it manually.
            </p>
            <Link
              href="/projects"
              className="mt-8 inline-flex rounded-full border border-[rgba(189,147,249,0.15)] bg-[rgba(189,147,249,0.08)] px-5 py-3 text-sm font-medium text-white transition hover:border-[rgba(189,147,249,0.35)]"
            >
              Back to projects
            </Link>
          </>
        ) : null}
      </div>
    </main>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="site-shell flex min-h-screen items-center justify-center px-4 py-16">
          <div className="surface-card w-full max-w-xl rounded-[2rem] p-8 text-center sm:p-10">
            <Loader2 className="mx-auto h-14 w-14 animate-spin text-dracula-purple" />
            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-heading">Loading</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">Preparing verification details...</p>
          </div>
        </main>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  )
}
