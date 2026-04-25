import { CheckoutEmbedded } from "./embedded-checkout"

export const metadata = {
  title: "Checkout · ROUNDpops",
  description: "Complete your ROUNDpops order.",
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Complete your order
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Secure payment processed by Stripe.
          </p>
        </header>

        <CheckoutEmbedded />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          🔒 Your payment information is encrypted and never stored on our
          servers.
        </p>
      </div>
    </main>
  )
}
