import { NextResponse } from "next/server"
import { stripe, PRICES, type UpsellKey } from "@/lib/stripe"

const UPSELL_KEYS: readonly UpsellKey[] = ["upsell1", "upsell2", "upsell3"]

function isUpsellKey(value: unknown): value is UpsellKey {
  return typeof value === "string" && (UPSELL_KEYS as readonly string[]).includes(value)
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const sessionId = body?.session_id
  const upsell = body?.upsell

  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 })
  }
  if (!isUpsellKey(upsell)) {
    return NextResponse.json({ error: "Invalid upsell key" }, { status: 400 })
  }

  const priceId = PRICES[upsell]
  if (!priceId) {
    return NextResponse.json(
      { error: `Stripe price for ${upsell} is not configured` },
      { status: 500 },
    )
  }

  // 1. retrieve master Checkout Session to find the customer + saved card
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.payment_method"],
  })

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id
  if (!customerId) {
    return NextResponse.json(
      { error: "Master session has no customer" },
      { status: 400 },
    )
  }

  const paymentIntent =
    typeof session.payment_intent === "string" ? null : session.payment_intent
  const pmFromSession = paymentIntent?.payment_method
  let paymentMethodId =
    typeof pmFromSession === "string" ? pmFromSession : pmFromSession?.id ?? null

  // fallback: pull the customer's default card
  if (!paymentMethodId) {
    const list = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
      limit: 1,
    })
    paymentMethodId = list.data[0]?.id ?? null
  }
  if (!paymentMethodId) {
    return NextResponse.json(
      { error: "No saved payment method found for this customer" },
      { status: 400 },
    )
  }

  // 2. fetch upsell price (amount + currency)
  const price = await stripe.prices.retrieve(priceId)
  if (!price.unit_amount || !price.currency) {
    return NextResponse.json(
      { error: "Upsell price is misconfigured" },
      { status: 500 },
    )
  }

  // 3. charge off_session
  try {
    const intent = await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: price.currency,
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      metadata: {
        upsell,
        master_session_id: sessionId,
      },
    })

    return NextResponse.json({
      id: intent.id,
      status: intent.status,
      amount: intent.amount,
      currency: intent.currency,
    })
  } catch (err) {
    // off_session can fail with authentication_required (3DS).
    // Surface the error so the client can fall back to /upsell-N/confirm with a redirect to Stripe.
    if (err instanceof Error && "code" in err) {
      const code = (err as { code?: string }).code
      return NextResponse.json(
        { error: err.message, code },
        { status: 402 },
      )
    }
    throw err
  }
}
