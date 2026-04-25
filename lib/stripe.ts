import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY env var")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
})

export const PRICES = {
  main: process.env.STRIPE_PRICE_MAIN ?? "",
  upsell1: process.env.STRIPE_PRICE_UPSELL_1 ?? "",
  upsell2: process.env.STRIPE_PRICE_UPSELL_2 ?? "",
  upsell3: process.env.STRIPE_PRICE_UPSELL_3 ?? "",
} as const

export type UpsellKey = "upsell1" | "upsell2" | "upsell3"

export function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
}
