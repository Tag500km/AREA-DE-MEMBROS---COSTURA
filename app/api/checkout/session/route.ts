// TODO Part 2: create a Stripe Embedded Checkout Session.
// Will return { client_secret } so the frontend mounts <EmbeddedCheckout />.
// Key flags to remember:
//   - ui_mode: "embedded"
//   - mode: "payment"
//   - customer_creation: "always"
//   - payment_intent_data.setup_future_usage: "off_session"  (saves card for one-click upsells)
//   - return_url: ${APP_URL}/upsell-1?session_id={CHECKOUT_SESSION_ID}

import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    { error: "not implemented" },
    { status: 501 },
  )
}
