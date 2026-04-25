import { Suspense } from "react"
import { OneClickButtons } from "@/components/one-click-buttons"

// TODO Part 4: clone visuals from
// https://github.com/joaojvstrafego-boop/sweetacademy
//   - VSL (Panda Video 23171b9a-07a9-493c-a7e2-a247b3ad21ea)
//   - Reveal after 5min30s with burgundy/gold theme
// The one-click yes/no logic is already wired through <OneClickButtons />.

export default function Upsell3Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold">Sweet Academy</h1>
        <p className="mt-2 text-muted-foreground line-through">$679 value</p>
        <p className="text-4xl font-bold text-primary">$97</p>
        <p className="mt-2 text-sm text-muted-foreground">
          7 complete dessert courses · Instant access
        </p>

        <div className="mt-8">
          <Suspense fallback={null}>
            <OneClickButtons
              upsell="upsell3"
              nextPath="/obrigado"
              acceptLabel="Yes! Add for $97"
            />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
