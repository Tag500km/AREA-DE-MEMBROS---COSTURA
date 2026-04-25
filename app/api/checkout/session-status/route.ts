// TODO Part 2: fetch a Checkout Session by id and return its status +
// the customer_id (used by the upsell pages to charge one-click).
// GET /api/checkout/session-status?session_id=cs_test_...

import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    { error: "not implemented" },
    { status: 501 },
  )
}
