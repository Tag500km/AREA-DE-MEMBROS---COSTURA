import { NextResponse } from "next/server"
import { stripe, PRICES, getAppUrl } from "@/lib/stripe"

export async function POST() {
  if (!PRICES.main) {
    return NextResponse.json(
      { error: "STRIPE_PRICE_MAIN is not set" },
      { status: 500 },
    )
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    mode: "payment",
    line_items: [{ price: PRICES.main, quantity: 1 }],
    customer_creation: "always",
    payment_intent_data: {
      setup_future_usage: "off_session",
    },
    return_url: `${getAppUrl()}/upsell-1?session_id={CHECKOUT_SESSION_ID}`,
  })

  return NextResponse.json({ client_secret: session.client_secret })
}
