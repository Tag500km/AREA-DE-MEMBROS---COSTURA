// TODO Part 4: clone Living Off Gourmet Popcorn upsell from
// https://github.com/joaojvstrafego-boop/uproundpops
//   - ProgressBar (3 min fake-process bar)
//   - VideoSection (Panda Video 0884a955-0586-4ced-9f84-dc09f77b6b2f)
//   - Offer reveal after 3min15s with countdown
//   - Replace the Hotmart widget with one-click Stripe button (yes/no).

export default function Upsell1Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Upsell 1 — $37</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Living Off Gourmet Popcorn (Part 4).
        </p>
      </div>
    </main>
  )
}
