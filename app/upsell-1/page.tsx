import { Suspense } from "react"
import { OneClickButtons } from "@/components/one-click-buttons"

// TODO Part 4: clone visuals from
// https://github.com/joaojvstrafego-boop/uproundpops
//   - ProgressBar (3 min fake-process)
//   - VideoSection (Panda Video 0884a955-0586-4ced-9f84-dc09f77b6b2f)
//   - Offer reveal after 3min15s with countdown
// The one-click yes/no logic is already wired through <OneClickButtons />.

export default function Upsell1Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold">Living Off Gourmet Popcorn</h1>
        <p className="mt-2 text-muted-foreground line-through">From $197</p>
        <p className="text-4xl font-bold text-primary">$37</p>
        <p className="mt-2 text-sm text-muted-foreground">
          One-time payment · Instant access
        </p>

        <div className="mt-8">
          <Suspense fallback={null}>
            <OneClickButtons
              upsell="upsell1"
              nextPath="/upsell-2"
              acceptLabel="Yes! Add for $37"
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
