"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

type UpsellKey = "upsell1" | "upsell2" | "upsell3"

type Props = {
  upsell: UpsellKey
  /** Where to go after the customer interacts (yes or no). */
  nextPath: string
  /** Label for the accept button. */
  acceptLabel?: string
  /** Label for the decline link. */
  declineLabel?: string
}

export function OneClickButtons({
  upsell,
  nextPath,
  acceptLabel = "Yes! Add to my order",
  declineLabel = "No thanks, continue without this",
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [state, setState] = useState<"idle" | "charging" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  function buildNextHref() {
    if (!sessionId) return nextPath
    const sep = nextPath.includes("?") ? "&" : "?"
    return `${nextPath}${sep}session_id=${encodeURIComponent(sessionId)}`
  }

  async function handleAccept() {
    if (!sessionId) {
      setState("error")
      setErrorMsg("Missing session_id in URL.")
      return
    }
    setState("charging")
    setErrorMsg(null)

    try {
      const res = await fetch("/api/upsell/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, upsell }),
      })
      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        setState("error")
        setErrorMsg(body.error ?? "Payment failed. Please try again.")
        return
      }

      router.push(buildNextHref())
    } catch (err) {
      setState("error")
      setErrorMsg(err instanceof Error ? err.message : "Network error.")
    }
  }

  function handleDecline() {
    router.push(buildNextHref())
  }

  const charging = state === "charging"

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        type="button"
        onClick={handleAccept}
        disabled={charging}
        className="w-full max-w-md rounded-lg bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {charging ? "Processing..." : acceptLabel}
      </button>

      <button
        type="button"
        onClick={handleDecline}
        disabled={charging}
        className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
      >
        {declineLabel}
      </button>

      {state === "error" && errorMsg && (
        <p className="text-sm text-destructive text-center max-w-md">
          {errorMsg}
        </p>
      )}
    </div>
  )
}
