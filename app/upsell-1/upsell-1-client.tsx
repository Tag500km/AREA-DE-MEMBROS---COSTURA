"use client"

import { Suspense, useEffect, useState } from "react"
import { OneClickButtons } from "@/components/one-click-buttons"

const REVEAL_DELAY_MS = 3 * 60 * 1000 + 15 * 1000 // 3 min 15 sec
const COUNTDOWN_SECONDS = 15 * 60 // 15 min

function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("Processing your order...")

  useEffect(() => {
    const total = 180_000 // 3 min
    const start = Date.now()
    const id = setInterval(() => {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / total, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = eased * 100
      if (next >= 99.5) {
        setProgress(100)
        setMessage("✅ Order confirmed!")
        clearInterval(id)
        return
      }
      setProgress(next)
      if (next > 80) setMessage("Finalizing your access...")
      else if (next > 50) setMessage("Almost done! Don't leave this page...")
      else if (next > 25) setMessage("Preparing your access...")
    }, 200)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="sticky top-0 z-50 w-full"
      style={{ background: "hsl(340 30% 90%)" }}
    >
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2.5">
        <div
          className="h-2 flex-1 overflow-hidden rounded-full"
          style={{ background: "hsl(340 30% 85%)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: "hsl(340 65% 55%)",
            }}
          />
        </div>
        <span
          className="whitespace-nowrap text-xs font-medium"
          style={{ color: "hsl(340 10% 45%)" }}
        >
          {message}
        </span>
      </div>
    </div>
  )
}

function VideoSection() {
  return (
    <div style={{ position: "relative", paddingTop: "133.3333%" }}>
      <iframe
        src="https://player-vz-91fc766a-ee2.tv.pandavideo.com.br/embed/?v=0884a955-0586-4ced-9f84-dc09f77b6b2f"
        style={{ border: "none", position: "absolute", top: 0, left: 0 }}
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
        allowFullScreen
        width="100%"
        height="100%"
        title="Watch this video"
      />
    </div>
  )
}

function UpsellOffer() {
  const [visible, setVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), REVEAL_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => {
      setTimeLeft((p) => (p <= 0 ? 0 : p - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [visible])

  if (!visible) return null

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div
      className="w-full rounded-2xl border p-6 shadow-sm md:p-8"
      style={{
        background: "white",
        borderColor: "hsl(30 20% 88%)",
        animation: "fadeIn 600ms ease-out",
      }}
    >
      <div className="mb-5 text-center">
        <div
          className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
          style={{
            background: "hsl(0 84% 60% / 0.1)",
            color: "hsl(0 84% 60%)",
          }}
        >
          <span className="animate-pulse">🔥</span>
          <span>EXCLUSIVE OFFER — VALID ONLY NOW</span>
        </div>
        <p className="text-sm" style={{ color: "hsl(340 10% 45%)" }}>
          This discount is exclusive for ebook buyers. If you leave this page,
          the discount is gone forever.
        </p>
        <p
          className="mt-2 text-xs font-medium"
          style={{ color: "hsl(340 10% 45%)" }}
        >
          ⚡ Valid only for those who completed the ebook today, {today}
        </p>
      </div>

      <div className="mb-6 flex justify-center gap-2">
        <div
          className="min-w-[60px] rounded-lg px-4 py-2 text-center"
          style={{ background: "hsl(340 20% 15%)", color: "white" }}
        >
          <span className="text-2xl font-bold">
            {String(minutes).padStart(2, "0")}
          </span>
          <p className="text-[10px] uppercase tracking-wide opacity-70">min</p>
        </div>
        <span
          className="self-center text-2xl font-bold"
          style={{ color: "hsl(340 20% 15%)" }}
        >
          :
        </span>
        <div
          className="min-w-[60px] rounded-lg px-4 py-2 text-center"
          style={{ background: "hsl(340 20% 15%)", color: "white" }}
        >
          <span className="text-2xl font-bold">
            {String(seconds).padStart(2, "0")}
          </span>
          <p className="text-[10px] uppercase tracking-wide opacity-70">sec</p>
        </div>
      </div>

      <div
        className="mb-6 rounded-xl border p-4 text-center"
        style={{
          background: "hsl(15 70% 60% / 0.1)",
          borderColor: "hsl(30 20% 88%)",
        }}
      >
        <p className="mb-1 text-sm font-semibold">🛒 Think about it...</p>
        <p className="text-sm" style={{ color: "hsl(340 10% 45%)" }}>
          A single pack of premium corn, chocolate, and professional packaging
          easily costs over <span className="font-bold">$40</span>. If you miss
          the caramel point just once, that entire investment goes straight
          into the trash.
        </p>
        <p className="mt-2 text-sm" style={{ color: "hsl(340 10% 45%)" }}>
          Why risk it? For only{" "}
          <span className="font-bold" style={{ color: "hsl(340 65% 55%)" }}>
            $37
          </span>
          , our video lessons guarantee you skip the trial-and-error phase.
          Stop wasting ingredients and{" "}
          <span className="font-semibold">start seeing profits from day one</span>.
        </p>
      </div>

      <div className="mb-6 text-center">
        <p
          className="text-sm line-through"
          style={{ color: "hsl(340 10% 45%)" }}
        >
          From $197.00
        </p>
        <p
          className="text-4xl font-bold"
          style={{ color: "hsl(340 65% 55%)" }}
        >
          $37.00
        </p>
        <p className="mt-1 text-xs" style={{ color: "hsl(340 10% 45%)" }}>
          One-time payment · Instant access
        </p>
      </div>

      <Suspense fallback={null}>
        <OneClickButtons
          upsell="upsell1"
          nextPath="/upsell-2"
          acceptLabel="Yes! Add for $37"
        />
      </Suspense>
    </div>
  )
}

export function Upsell1Client() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "hsl(30 30% 97%)",
        color: "hsl(340 20% 15%)",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      `}</style>

      <ProgressBar />

      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            Thank you for your order! ❤️
          </h1>
          <p
            className="mt-1 text-lg md:text-xl"
            style={{ color: "hsl(340 10% 45%)" }}
          >
            Your purchase is being processed. Please don&apos;t close this page.
          </p>
        </div>

        <div
          className="mb-8 w-full rounded-2xl border p-6 shadow-sm md:p-8"
          style={{ background: "white", borderColor: "hsl(30 20% 88%)" }}
        >
          <div className="mb-5 flex items-center gap-2">
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold"
              style={{ background: "hsl(340 65% 55%)", color: "white" }}
            >
              1
            </span>
            <h2 className="text-lg font-semibold">
              Step 1: Watch this short video
            </h2>
          </div>

          <VideoSection />

          <p
            className="mt-4 text-center text-sm"
            style={{ color: "hsl(340 10% 45%)" }}
          >
            ⏳ While your order is being prepared, watch this important
            message...
          </p>
        </div>

        <div className="mb-8 w-full">
          <UpsellOffer />
        </div>

        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "hsl(340 10% 45%)" }}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>Secure checkout · 100% protected</span>
        </div>
      </main>
    </div>
  )
}
