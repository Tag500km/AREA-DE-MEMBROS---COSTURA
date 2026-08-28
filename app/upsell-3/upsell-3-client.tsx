"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { Lock, Zap, ShieldCheck } from "lucide-react"
import { OneClickButtons } from "@/components/one-click-buttons"

const C = {
  burgundy: "#5A0F29",
  burgundyDeep: "#3D0A1D",
  cream: "#F8E9CF",
  beige: "#C9B998",
  gold: "#D4AF37",
  goldLight: "#E5C657",
}

const REVEAL_DELAY_MS = 5 * 60 * 1000 + 30 * 1000 // 5 min 30 sec
const PROGRESS_MS = 3 * 60 * 1000 // 3 min

const COURSES = [
  {
    img: "/upsell-3/course-01-popcorn.jpg",
    title: "Gourmet Popcorn Mastery",
    desc: "You already have this one ✓",
    owned: true,
  },
  {
    img: "/upsell-3/course-02-chocolate.jpg",
    title: "Chocolate Making",
    desc: "Truffles, bonbons & bark",
  },
  {
    img: "/upsell-3/course-03-charcuterie.jpg",
    title: "Charcuterie & Grazing",
    desc: "The hottest US food niche",
  },
  {
    img: "/upsell-3/course-04-sourdough.jpg",
    title: "Sourdough & Artisan Breads",
    desc: "Premium handcrafted",
  },
  {
    img: "/upsell-3/course-05-cookies.jpg",
    title: "Cookie Decorating",
    desc: "The Etsy goldmine",
  },
  {
    img: "/upsell-3/course-06-macarons.jpg",
    title: "French Macarons",
    desc: "The holy grail of baking",
  },
  {
    img: "/upsell-3/course-07-cake.jpg",
    title: "Cake & Buttercream Artistry",
    desc: "Every birthday. Every order.",
  },
  {
    img: "/upsell-3/course-08-gelato.jpg",
    title: "Ice Cream & Gelato",
    desc: "The perfect popcorn pairing",
  },
]

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true)
          obs.disconnect()
        }
      },
      { rootMargin: "-60px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateY(40px)",
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto w-40 ${className}`}
      style={{
        height: "1px",
        background: `linear-gradient(to right, transparent, ${C.gold} 20%, ${C.gold} 80%, transparent)`,
      }}
    />
  )
}

function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const [msg, setMsg] = useState("Processing your Cash Flow Academy access...")
  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / PROGRESS_MS, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const p = eased * 100
      if (p >= 99.5) {
        setProgress(100)
        setMsg("✅ Access confirmed!")
        clearInterval(id)
        return
      }
      setProgress(p)
      if (p > 80) setMsg("Finalizing your access...")
      else if (p > 50) setMsg("Almost ready! Please stay on this page...")
      else if (p > 25) setMsg("Preparing your program...")
    }, 200)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="sticky top-0 z-50 w-full" style={{ background: C.burgundyDeep }}>
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2.5">
        <div
          className="h-2 flex-1 overflow-hidden rounded-full"
          style={{ background: "rgba(212,175,55,0.2)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: C.gold,
            }}
          />
        </div>
        <span
          className="whitespace-nowrap text-xs font-medium"
          style={{ color: C.cream }}
        >
          {msg}
        </span>
      </div>
    </div>
  )
}

function VslHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-10 pb-16 md:pt-16 md:pb-20">
      <div className="mx-auto max-w-5xl text-center">
        <FadeIn>
          <h1
            className="mt-2 font-semibold leading-tight"
            style={{
              color: C.cream,
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontFamily: "var(--font-playfair)",
            }}
          >
            Before You Start{" "}
            <em className="italic" style={{ color: C.goldLight }}>
              Your Recipes
            </em>
            …
            <br />
            <span className="block mt-3">Watch This 2-Minute Message</span>
          </h1>
          <GoldDivider className="mt-8" />
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mx-auto mt-10 w-full max-w-[900px]">
            <div
              className="relative overflow-hidden rounded-xl"
              style={{
                border: `1px solid ${C.gold}66`,
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                paddingTop: "133.3333%",
              }}
            >
              <iframe
                src="https://player-vz-91fc766a-ee2.tv.pandavideo.com.br/embed/?v=23171b9a-07a9-493c-a7e2-a247b3ad21ea"
                style={{ border: "none", position: "absolute", top: 0, left: 0 }}
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                allowFullScreen
                width="100%"
                height="100%"
                title="Sweet Academy VSL"
              />
            </div>
          </div>
        </FadeIn>

        <p
          className="mt-8 uppercase animate-pulse"
          style={{
            color: C.gold,
            fontSize: "12px",
            letterSpacing: "3px",
          }}
        >
          ↓ Full Details Below ↓
        </p>
      </div>
    </section>
  )
}

function WaitingSection() {
  return (
    <section className="px-6 py-16 md:py-20" style={{ background: C.burgundyDeep }}>
      <div className="mx-auto max-w-3xl text-center">
        <p
          className="uppercase animate-pulse"
          style={{
            color: C.gold,
            fontSize: "13px",
            letterSpacing: "3px",
          }}
        >
          ↑ Watch the full video above ↑
        </p>
        <p
          className="mt-6 italic"
          style={{
            color: C.cream,
            fontSize: "20px",
            fontFamily: "var(--font-playfair)",
          }}
        >
          Your exclusive offer will be revealed at the end of the message.
        </p>
        <GoldDivider className="mt-8" />
      </div>
    </section>
  )
}

function ProblemSection() {
  const quotes = [
    "Do you make gourmet brownies too?",
    "What about dessert cups?",
    "Any little sweets for my baby shower?",
  ]
  return (
    <section className="px-6 py-20 md:py-24" style={{ background: C.burgundyDeep }}>
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <h2
            className="text-center italic"
            style={{
              color: C.cream,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontFamily: "var(--font-playfair)",
            }}
          >
            Your Customers Are Already Asking…
          </h2>
          <GoldDivider className="mt-8" />
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <FadeIn key={q} delay={i * 100}>
              <figure
                className="relative rounded-lg p-8 text-center"
                style={{
                  border: `1px solid ${C.gold}33`,
                  background: "rgba(90,15,41,0.4)",
                }}
              >
                <span
                  className="absolute -top-4 left-6 leading-none"
                  style={{
                    color: `${C.gold}cc`,
                    fontSize: "60px",
                    fontFamily: "var(--font-playfair)",
                  }}
                >
                  &ldquo;
                </span>
                <blockquote
                  className="italic"
                  style={{
                    color: C.cream,
                    fontSize: "20px",
                    fontFamily: "var(--font-playfair)",
                  }}
                >
                  {q}
                </blockquote>
              </figure>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={400}>
          <p
            className="mt-14 text-center italic"
            style={{
              color: C.cream,
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontFamily: "var(--font-playfair)",
            }}
          >
            Every{" "}
            <span style={{ color: C.goldLight }}>&lsquo;no&rsquo;</span> is money walking out
            the door.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

function IntroducingSection() {
  return (
    <section className="px-6 py-20 md:py-24" style={{ background: C.burgundy }}>
      <div className="mx-auto max-w-6xl text-center">
        <FadeIn>
          <p
            className="uppercase"
            style={{ color: C.gold, fontSize: "13px", letterSpacing: "3px" }}
          >
            Introducing
          </p>
          <h2
            className="mt-6 font-bold leading-none"
            style={{
              background: `linear-gradient(180deg, ${C.goldLight}, ${C.gold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              letterSpacing: "-1px",
              fontFamily: "var(--font-playfair)",
            }}
          >
            SWEET ACADEMY
          </h2>
          <GoldDivider className="mt-6" />
          <p
            className="mx-auto mt-8 max-w-2xl italic"
            style={{
              color: C.cream,
              fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)",
              fontFamily: "var(--font-playfair)",
            }}
          >
            Seven complete courses. Seven dessert categories.
            <br />
            One complete arsenal to triple your ticket size.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div
            className="mt-14 overflow-hidden rounded-xl"
            style={{
              border: `1px solid ${C.gold}55`,
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src="/upsell-3/hero-sweet-academy.jpg"
              alt="All Sweet Academy desserts together"
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function CoursesGrid() {
  return (
    <section className="px-6 pb-20" style={{ background: C.burgundy }}>
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center">
            <h2
              className="font-semibold"
              style={{
                color: C.cream,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontFamily: "var(--font-playfair)",
              }}
            >
              What&apos;s Inside The Academy
            </h2>
            <GoldDivider className="mt-6" />
            <p
              className="mt-6 uppercase"
              style={{
                color: C.gold,
                fontSize: "12px",
                letterSpacing: "2.5px",
              }}
            >
              Seven Masterclasses · Taught by Industry Partners
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {COURSES.map((c, i) => (
            <FadeIn key={c.title} delay={i * 60}>
              <div
                className="group relative overflow-hidden rounded-lg transition-all duration-500 hover:-translate-y-1"
                style={{
                  border: `1px solid ${C.gold}33`,
                  background: C.burgundyDeep,
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${C.burgundyDeep} 0%, ${C.burgundyDeep}80 40%, transparent 100%)`,
                    }}
                  />
                  {c.owned && (
                    <span
                      className="absolute right-3 top-3 rounded-full px-3 py-1 uppercase"
                      style={{
                        background: "rgba(61,10,29,0.85)",
                        border: `1px solid ${C.gold}99`,
                        color: C.gold,
                        fontSize: "10px",
                        letterSpacing: "1px",
                      }}
                    >
                      Included ✓
                    </span>
                  )}
                </div>
                <div className="p-4 text-left md:text-center">
                  <h3
                    className="leading-tight"
                    style={{
                      color: C.goldLight,
                      fontSize: "16px",
                      fontFamily: "var(--font-playfair)",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="mt-1 italic md:hidden"
                    style={{
                      color: C.beige,
                      fontSize: "13px",
                      fontFamily: "var(--font-playfair)",
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueStack() {
  return (
    <section className="px-6 py-20 md:py-24" style={{ background: C.burgundyDeep }}>
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <h2
            className="text-center font-semibold"
            style={{
              color: C.cream,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontFamily: "var(--font-playfair)",
            }}
          >
            What This Would Normally Cost
          </h2>
          <GoldDivider className="mt-6" />
        </FadeIn>

        <FadeIn delay={150}>
          <ul
            className="mt-10 divide-y"
            style={{ borderColor: `${C.gold}33` }}
          >
            {COURSES.map((c) => (
              <li
                key={c.title}
                className="flex items-center justify-between py-4"
                style={{ borderTop: `1px solid ${C.gold}22` }}
              >
                <span style={{ color: C.cream, fontSize: "17px" }}>{c.title}</span>
                <span
                  className="line-through"
                  style={{ color: `${C.cream}80`, fontSize: "17px" }}
                >
                  $97
                </span>
              </li>
            ))}
            <li
              className="flex items-center justify-between py-5 mt-2"
              style={{ borderTop: `1px solid ${C.gold}66` }}
            >
              <span
                className="font-semibold"
                style={{ color: C.gold, fontSize: "22px", fontFamily: "var(--font-playfair)" }}
              >
                TOTAL VALUE
              </span>
              <span
                className="font-semibold"
                style={{ color: C.gold, fontSize: "22px", fontFamily: "var(--font-playfair)" }}
              >
                $679
              </span>
            </li>
          </ul>
        </FadeIn>

        <FadeIn delay={250}>
          <div className="mt-16 text-center">
            <div
              className="mx-auto mb-8 max-w-xl rounded-lg p-4"
              style={{
                border: `1px solid ${C.gold}66`,
                background: "rgba(90,15,41,0.6)",
              }}
            >
              <p
                className="uppercase"
                style={{ color: C.gold, fontSize: "12px", letterSpacing: "2px" }}
              >
                ⚠️ OFFER VALID ONLY FOR GOURMET POPCORN MASTERY PURCHASERS
              </p>
              <p
                className="mt-1 italic"
                style={{
                  color: C.cream,
                  fontSize: "14px",
                  fontFamily: "var(--font-playfair)",
                }}
              >
                Exclusive for today&apos;s ebook customers
              </p>
            </div>
            <p
              className="uppercase"
              style={{ color: C.beige, fontSize: "12px", letterSpacing: "2.5px" }}
            >
              Today, on this page only:
            </p>
            <p
              className="mt-4 font-bold leading-none"
              style={{
                background: `linear-gradient(180deg, ${C.goldLight}, ${C.gold})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "clamp(4rem, 12vw, 8rem)",
                fontFamily: "var(--font-playfair)",
              }}
            >
              $97
            </p>
            <p className="mt-2" style={{ color: C.cream, fontSize: "14px" }}>
              One-time payment · All 7 courses · Instant access
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function Urgency() {
  return (
    <section
      className="relative px-6 py-16 md:py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(90,15,41,0.85), rgba(90,15,41,0.85)), url(/upsell-3/urgency-bg-texture.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <FadeIn>
        <div
          className="mx-auto max-w-2xl rounded-lg p-8 md:p-12 text-center"
          style={{
            border: `1px solid ${C.gold}66`,
            background: "rgba(61,10,29,0.75)",
          }}
        >
          <p
            className="uppercase"
            style={{ color: C.gold, fontSize: "12px", letterSpacing: "3px" }}
          >
            Important
          </p>
          <h2
            className="mt-6 italic leading-tight"
            style={{
              color: C.cream,
              fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)",
              fontFamily: "var(--font-playfair)",
            }}
          >
            This offer disappears the moment you leave this page.
          </h2>
          <GoldDivider className="mt-8" />
          <p className="mt-8 leading-relaxed" style={{ color: `${C.cream}e0`, fontSize: "16px" }}>
            If you close this window and come back later, each course returns to its full price
            of{" "}
            <span style={{ color: C.goldLight, fontWeight: 500 }}>$97 individually</span>. This
            one-time bundle pricing exists only because you just enrolled in Gourmet Popcorn
            Mastery. It will not be offered again.
          </p>
        </div>
      </FadeIn>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="px-6 py-20 md:py-24" style={{ background: C.burgundy }}>
      <FadeIn>
        <div className="mx-auto max-w-xl text-center flex flex-col items-center">
          <Suspense fallback={null}>
            <OneClickButtons
              upsell="upsell3"
              nextPath="/obrigado"
              acceptLabel="Yes! Add Sweet Academy for $97"
              declineLabel="No thanks, I'll pass on this"
            />
          </Suspense>
          <div
            className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            style={{ color: C.beige }}
          >
            <span className="flex items-center gap-2" style={{ fontSize: "12px" }}>
              <Lock className="h-4 w-4" style={{ color: C.gold }} /> Secure
            </span>
            <span className="flex items-center gap-2" style={{ fontSize: "12px" }}>
              <Zap className="h-4 w-4" style={{ color: C.gold }} /> Instant Access
            </span>
            <span className="flex items-center gap-2" style={{ fontSize: "12px" }}>
              <ShieldCheck className="h-4 w-4" style={{ color: C.gold }} /> 30-Day Guarantee
            </span>
          </div>
          <p
            className="mt-6 italic"
            style={{
              color: C.cream,
              fontSize: "16px",
              fontFamily: "var(--font-playfair)",
            }}
          >
            One click. 2 minutes to full access.
          </p>
        </div>
      </FadeIn>
    </section>
  )
}

function GuaranteeSection() {
  return (
    <section className="px-6 py-20 md:py-24" style={{ background: C.burgundyDeep }}>
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <FadeIn>
          <div className="flex justify-center">
            <img
              src="/upsell-3/guarantee-seal.png"
              alt="30 days satisfaction guarantee"
              loading="lazy"
              className="w-64 md:w-80"
              style={{ filter: "drop-shadow(0 10px 30px rgba(212,175,55,0.3))" }}
            />
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div>
            <h2
              className="font-semibold"
              style={{
                color: C.cream,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontFamily: "var(--font-playfair)",
              }}
            >
              Zero Risk.{" "}
              <em className="italic" style={{ color: C.goldLight }}>
                All On Me.
              </em>
            </h2>
            <div
              className="mt-6 w-40"
              style={{
                height: "1px",
                background: `linear-gradient(to right, ${C.gold} 0%, ${C.gold} 80%, transparent)`,
              }}
            />
            <p
              className="mt-6 italic"
              style={{
                color: C.cream,
                fontSize: "18px",
                fontFamily: "var(--font-playfair)",
                lineHeight: 1.7,
              }}
            >
              Enroll today. Test it for 30 full days. Apply it to a real order. If it doesn&apos;t
              feel like the best investment you&apos;ve made in your business, send me one email
              and I&apos;ll refund every penny. No questions. No forms. No friction. The risk is
              entirely on my shoulders.
            </p>
            <p
              className="mt-8 text-right"
              style={{
                color: C.gold,
                fontSize: "32px",
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
              }}
            >
              — Carmela
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function FinalReinforcement() {
  return (
    <section className="px-6 py-20 md:py-24" style={{ background: C.burgundy }}>
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center flex flex-col items-center">
          <h2
            className="font-semibold"
            style={{
              color: C.cream,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontFamily: "var(--font-playfair)",
            }}
          >
            Your Academy Is{" "}
            <em className="italic" style={{ color: C.goldLight }}>
              Waiting.
            </em>
          </h2>
          <GoldDivider className="mt-6" />
          <p
            className="mt-10 mx-auto max-w-xl italic"
            style={{
              color: C.cream,
              fontSize: "20px",
              fontFamily: "var(--font-playfair)",
              lineHeight: 1.6,
            }}
          >
            Next time a customer asks{" "}
            <span style={{ color: C.goldLight }}>&lsquo;do you make brownies too?&rsquo;</span> —
            you&apos;ll want the answer to be <em>yes</em>.
          </p>
        </div>
      </FadeIn>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-12 text-center" style={{ background: C.burgundyDeep }}>
      <p
        className="font-semibold"
        style={{
          color: C.gold,
          fontSize: "22px",
          fontFamily: "var(--font-playfair)",
        }}
      >
        Sweet Academy
      </p>
      <div
        className="mx-auto mt-6 w-24"
        style={{ height: "1px", background: `${C.gold}80` }}
      />
      <p className="mt-6" style={{ color: C.beige, fontSize: "12px" }}>
        © Sweet Academy · A Cash Flow Academy Program
      </p>
    </footer>
  )
}

export function Upsell3Client() {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), REVEAL_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      style={{
        background: C.burgundy,
        color: C.cream,
        minHeight: "100vh",
      }}
    >
      <ProgressBar />
      <VslHero />
      {!revealed && <WaitingSection />}
      <div
        style={{
          opacity: revealed ? 1 : 0,
          transition: "opacity 700ms",
          height: revealed ? "auto" : 0,
          overflow: revealed ? "visible" : "hidden",
          pointerEvents: revealed ? "auto" : "none",
        }}
        aria-hidden={!revealed}
      >
        <ProblemSection />
        <IntroducingSection />
        <CoursesGrid />
        <ValueStack />
        <Urgency />
        <CtaSection />
        <GuaranteeSection />
        <FinalReinforcement />
        <Footer />
      </div>
    </div>
  )
}
