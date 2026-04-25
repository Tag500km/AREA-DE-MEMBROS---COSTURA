import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing session_id" },
      { status: 400 },
    )
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.payment_method"],
  })

  const paymentIntent =
    typeof session.payment_intent === "string" ? null : session.payment_intent

  const paymentMethod = paymentIntent?.payment_method
  const paymentMethodId =
    typeof paymentMethod === "string" ? paymentMethod : paymentMethod?.id ?? null

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id ?? null

  return NextResponse.json({
    status: session.status,
    payment_status: session.payment_status,
    customer_id: customerId,
    payment_method_id: paymentMethodId,
    customer_email: session.customer_details?.email ?? null,
  })
}
