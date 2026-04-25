// TODO Part 3: charge an upsell off_session using the card saved
// during the master checkout.
//
// Body: { session_id: string, upsell: "upsell1" | "upsell2" | "upsell3" }
//
// Steps:
//   1. retrieve Checkout Session (expand: ['payment_intent.payment_method'])
//   2. read customer + payment_method ids from it
//   3. fetch the Price object for the requested upsell to get amount/currency
//   4. create PaymentIntent { customer, payment_method, off_session: true,
//      confirm: true, amount, currency } and return { id, status }

import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    { error: "not implemented" },
    { status: 501 },
  )
}
