import { Suspense } from "react"
import { OneClickButtons } from "@/components/one-click-buttons"

// TODO Part 4: clone visuals from
// https://github.com/joaojvstrafego-boop/kitchen-profit-coach
//   - Sticky banners + hero + 4 walls + 9 pillars + bonuses + value stack
// The one-click yes/no logic is already wired through <OneClickButtons />.

export default function Upsell2Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold">Cash Flow Academy</h1>
        <p className="mt-2 text-muted-foreground line-through">$315 value</p>
        <p className="text-4xl font-bold text-primary">$37</p>
        <p className="mt-2 text-sm text-muted-foreground">
          One-time payment · Instant access
        </p>

        <div className="mt-8">
          <Suspense fallback={null}>
            <OneClickButtons
              upsell="upsell2"
              nextPath="/upsell-3"
              acceptLabel="Yes! Add for $37"
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
