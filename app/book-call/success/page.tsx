import Link from "next/link"
import { AlertCircle, CheckCircle2, MessageCircle, RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CALL_BOOKING_TITLE, CALL_BOOKING_WHATSAPP_URL } from "@/lib/call-booking"

type BookCallSuccessPageProps = {
  searchParams: Promise<{
    status?: string
    manual?: string
  }>
}

export default async function BookCallSuccessPage({
  searchParams,
}: BookCallSuccessPageProps) {
  const params = await searchParams
  const status = params.status ?? "failed"
  const manualFollowUp = params.manual === "1"
  const isSuccess = status === "success"

  return (
    <main className="site-shell flex min-h-screen items-center justify-center px-4 py-16">
      <div className="surface-card w-full max-w-2xl rounded-[2rem] p-8 text-center sm:p-10">
        {isSuccess ? (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-300" />
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl">
              Booking confirmed
            </h1>
            <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">
              Your {CALL_BOOKING_TITLE.toLowerCase()} has been recorded and our team will follow up with the next
              details.
            </p>

            <div className="surface-card-soft mx-auto mt-6 max-w-xl rounded-[1.75rem] p-5 text-left">
              <p className="text-sm font-medium text-white">
                {manualFollowUp ? "Manual follow-up required" : "Booking received"}
              </p>
              <p className="mt-2 text-sm leading-7 text-zinc-400">
                {manualFollowUp
                  ? "Your payment was successful, but the selected calendar slot still needs direct confirmation. Message us on WhatsApp and we&apos;ll lock it in manually."
                  : "The selected slot is recorded. We&apos;ll confirm the call details directly and keep the handoff simple."}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <a href={CALL_BOOKING_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Continue on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/">Back to home</Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <AlertCircle className="mx-auto h-14 w-14 text-red-300" />
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl">
              Booking not confirmed
            </h1>
            <p className="mt-3 text-sm leading-7 text-zinc-400 sm:text-base">
              We couldn&apos;t confirm payment for the {CALL_BOOKING_TITLE.toLowerCase()}, so no slot has been booked yet.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/#pricing">
                  <RefreshCcw className="h-4 w-4" />
                  Try again
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
