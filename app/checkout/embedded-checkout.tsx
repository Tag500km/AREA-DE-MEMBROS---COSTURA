"use client"

import { useCallback } from "react"
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js"
import { getStripe } from "@/lib/stripe-client"

export function CheckoutEmbedded() {
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout/session", { method: "POST" })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error ?? "Failed to create checkout session")
    }
    const { client_secret } = await res.json()
    return client_secret as string
  }, [])

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider
        stripe={getStripe()}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
