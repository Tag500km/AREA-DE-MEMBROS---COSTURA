// TODO Part 2: ROUNDpops master checkout (Stripe Embedded).
// This is the master page the customer lands on after clicking the
// sales-page CTA. The Stripe-embedded form will be mounted here.

export default function CheckoutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">ROUNDpops checkout</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Embedded Stripe form goes here (Part 2).
        </p>
      </div>
    </main>
  )
}
