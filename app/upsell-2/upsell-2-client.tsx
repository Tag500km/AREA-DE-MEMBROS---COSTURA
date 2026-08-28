"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"
import { OneClickButtons } from "@/components/one-click-buttons"

const C = {
  burgundy: "#7B1538",
  burgundyDark: "#4D0F25",
  gold: "#D4AF37",
  goldDark: "#A8821B",
  cream: "#F8E9CF",
  creamWarm: "#FAF3E8",
  bg: "#FBF8F2",
  text: "#3A2418",
  text2: "#7A6B5C",
  green: "#21C55D",
  yellow: "#FCD34D",
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
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
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(30px)",
        transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function StickyBars() {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const s = () => setShow(window.scrollY < 200)
    window.addEventListener("scroll", s, { passive: true })
    return () => window.removeEventListener("scroll", s)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className="text-center font-semibold overflow-hidden"
        style={{
          background: C.green,
          color: "white",
          fontSize: "12px",
          padding: show ? "10px 12px" : "0",
          height: show ? "auto" : "0",
          transition: "all 300ms",
        }}
      >
        ✅ Your order is confirmed! But wait — read this before you leave this page...
      </div>
      <div
        className="text-center font-bold uppercase"
        style={{
          background: C.yellow,
          color: "#92400E",
          borderTop: `2px solid ${C.gold}`,
          borderBottom: `2px solid ${C.gold}`,
          fontSize: "11px",
          padding: "8px 12px",
          letterSpacing: "1px",
        }}
      >
        ⚠️ THIS IS A ONE-TIME OFFER · Once you leave, this price is gone forever
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative">
      <div
        className="relative min-h-[80vh] md:min-h-[90vh] flex items-end bg-cover bg-center"
        style={{ backgroundImage: "url(/upsell-2/hero-background.webp)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.5) 50%, rgba(0,0,0,.1) 100%)",
          }}
        />
        <div className="relative z-10 w-full max-w-3xl mx-auto md:mx-0 md:ml-12 px-6 py-16 md:py-24">
          <FadeIn>
            <p
              className="font-semibold uppercase"
              style={{ color: "rgba(255,255,255,0.9)", fontSize: "10px", letterSpacing: "2px" }}
            >
              EXCLUSIVE ADD-ON FOR LIVING OFF GOURMET POPCORN STUDENTS
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            <h1
              className="mt-4 font-bold leading-tight text-white"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}
            >
              You Now Know How To Make Gourmet Popcorn.
              <br />
              Here&apos;s How To Turn It Into{" "}
              <span style={{ color: C.gold }}>$2,000, $5,000, or $10,000 A Month</span> — Right
              From Your Kitchen.
            </h1>
          </FadeIn>
          <FadeIn delay={240}>
            <p
              className="mt-6 max-w-xl leading-relaxed"
              style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px" }}
            >
              Introducing <strong>Cash Flow Academy</strong> — the complete business system my
              students use to build real monthly income from home. Without a commercial kitchen,
              without hiring anyone, and without guessing what to charge, where to sell, or how
              to package your product.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function Bridge() {
  return (
    <FadeIn>
      <div className="max-w-5xl mx-auto py-16 md:py-20 px-6">
        <div
          className="flex flex-col lg:flex-row items-center gap-10 rounded-2xl p-6 lg:p-10 shadow-md"
          style={{ background: "white", border: `1px solid ${C.burgundy}40` }}
        >
          <div className="lg:w-2/5 w-full">
            <img
              src="/upsell-2/expert-carmela.webp"
              alt="Carmela Vega"
              loading="lazy"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
          <div
            className="lg:w-3/5 leading-[1.8] space-y-4"
            style={{ color: C.text, fontSize: "17px" }}
          >
            <p>Hi — it&apos;s Carmela.</p>
            <p>
              First of all, congratulations. You just did something 97% of women who land on my
              website never do — you actually bought in. I&apos;m genuinely proud of you.
            </p>
            <p>
              But before you dive into the recipes, I need to tell you something I wish someone
              had told me when I was standing exactly where you&apos;re standing right now.
            </p>
            <p className="font-bold text-xl" style={{ color: C.burgundy }}>
              Having the recipes is only the first step.
            </p>
            <p>
              The other 80% — the part that decides whether this becomes real monthly income or
              just an expensive hobby sitting in a folder — isn&apos;t taught inside the course
              you just bought.
            </p>
            <p>
              And I built something new specifically to hand you that missing 80%. Stay with me
              for 3 minutes.
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

const WALLS = [
  {
    n: 1,
    t: "How much should I charge for this?",
    b: "You'll stare at the bag and have no idea if $6, $12, or $18 is the right number. You'll price too low and work for free. Or too high and scare people off. I stayed stuck in that pricing confusion for eight months when I started.",
  },
  {
    n: 2,
    t: "Why does my packaging look amateur?",
    b: "You'll compare your pouches to the ones on Instagram and feel sick. The popcorn tastes incredible. The bag looks like a school bake sale. Packaging is the entire first impression — get it wrong, and everything else gets 50% less effective.",
  },
  {
    n: 3,
    t: "Where do I find real customers?",
    b: "Your cousin buys one. Your neighbor buys one. Your mom buys five. Then... silence. Instagram? Etsy? DoorDash? Farmer's market? Every option feels overwhelming, and none come with a playbook.",
  },
  {
    n: 4,
    t: "Why is my income all over the place?",
    b: "One Saturday you sell 30 bags. Then three weeks of silence. No consistency, no planning, no growth. That's how this stays a hobby forever instead of becoming the real income you're actually here for.",
  },
]

function Walls() {
  return (
    <FadeIn>
      <section className="py-16 md:py-20 px-6" style={{ background: C.creamWarm }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-lg leading-[1.8] space-y-4 mb-10" style={{ color: C.text }}>
            <p>
              After you close this page, you&apos;ll make your first batch and it&apos;ll be
              beautiful. You&apos;ll take a photo, show your sister, maybe post it on Instagram.
            </p>
            <p>For about 48 hours, you&apos;ll feel like you cracked the code.</p>
            <p>Then you&apos;ll hit four walls. Let me tell you about them now, so you&apos;re ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WALLS.map((w) => (
              <div
                key={w.n}
                className="rounded-lg p-7 shadow-sm"
                style={{ background: "white", borderLeft: `4px solid ${C.gold}` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🧱</span>
                  <span className="font-bold" style={{ color: C.burgundy, fontSize: "13px" }}>
                    Wall #{w.n}
                  </span>
                </div>
                <p
                  className="italic mb-3"
                  style={{
                    color: C.burgundy,
                    fontSize: "18px",
                    fontFamily: "var(--font-playfair)",
                  }}
                >
                  &ldquo;{w.t}&rdquo;
                </p>
                <p className="leading-relaxed" style={{ color: C.text, fontSize: "15px" }}>
                  {w.b}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 leading-[1.8]" style={{ color: C.text, fontSize: "17px" }}>
            If you don&apos;t solve these four walls, the recipes just sit in a folder. And six
            months from now, you&apos;ll be exactly where you started — frustrated, because
            you&apos;ll know it was possible.
          </p>
        </div>
      </section>
    </FadeIn>
  )
}

function Paradigm() {
  return (
    <FadeIn>
      <section className="py-20 md:py-24 px-6" style={{ background: C.burgundy }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="font-semibold uppercase mb-6"
            style={{ color: C.gold, fontSize: "13px", letterSpacing: "2.5px" }}
          >
            THE REAL TRUTH
          </p>
          <h2
            className="font-bold text-white leading-tight mb-8"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            The difference between women making $200 a month and women making $5,000 a month is
            NOT the recipes.
          </h2>
          <div className="space-y-4 leading-[1.8]" style={{ color: C.cream, fontSize: "17px" }}>
            <p>
              It&apos;s not the flavors. It&apos;s not the ingredients. It&apos;s not even how
              good the popcorn tastes.
            </p>
            <p>
              I&apos;ve watched women with average recipes build $8,000/month businesses. And
              women with incredible recipes never get past $300/month.
            </p>
          </div>
          <div
            className="my-10 py-8"
            style={{
              borderTop: `1px solid ${C.gold}66`,
              borderBottom: `1px solid ${C.gold}66`,
            }}
          >
            <p
              className="italic"
              style={{
                color: C.gold,
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontFamily: "var(--font-playfair)",
              }}
            >
              The business system around the popcorn.
            </p>
          </div>
          <div className="space-y-4 leading-[1.8]" style={{ color: C.cream, fontSize: "17px" }}>
            <p>Same popcorn. Same kitchen. Same hours. Completely different income.</p>
            <p>
              The women making real money treat this as a business. The ones stuck at $200/month
              treat it like a hobby. That&apos;s exactly why I built what I&apos;m about to show
              you.
            </p>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

function ProductStory() {
  return (
    <FadeIn>
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3">
            <p
              className="uppercase font-semibold mb-6"
              style={{ color: C.burgundy, fontSize: "12px", letterSpacing: "2px" }}
            >
              A QUICK STORY FROM CARMELA
            </p>
            <div className="leading-[1.8] space-y-4" style={{ color: C.text, fontSize: "17px" }}>
              <p>
                <span
                  className="float-left mr-3 mt-1 leading-none"
                  style={{
                    color: C.burgundy,
                    fontSize: "60px",
                    fontFamily: "var(--font-playfair)",
                  }}
                >
                  T
                </span>
                wo years ago, I was exactly where you are. I had the recipes. I had the
                technique. And I was making <strong>$180 a month.</strong>
              </p>
              <p>
                I remember sitting at my kitchen table one Sunday night with a pile of receipts,
                realizing I was actually <em>losing</em> about $40 every week because I had no
                idea how to price my products.
              </p>
              <p>
                Then I made a decision. I stopped focusing on the recipes and started focusing on
                the <em>business</em>. New packaging. New pricing formula. An Instagram system. A
                subscription box. An Etsy shop. A seasonal calendar.
              </p>
              <p className="font-bold text-xl" style={{ color: C.burgundy }}>
                Within 90 days, I was making $4,200 a month. Same kitchen. Same popcorn.
              </p>
              <p>I wrote every system down and turned it into what I&apos;m handing you right now:</p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <img
              src="/upsell-2/income-growth-chart.webp"
              alt="90-Day Accelerated Income Growth"
              loading="lazy"
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

function ProductReveal() {
  return (
    <FadeIn>
      <section
        className="py-16 md:py-20 px-6 text-center"
        style={{ background: `linear-gradient(90deg, ${C.burgundy}, ${C.burgundyDark})` }}
      >
        <p
          className="uppercase mb-4"
          style={{ color: C.gold, fontSize: "14px", letterSpacing: "3px" }}
        >
          Introducing:
        </p>
        <h2
          className="italic text-white font-black leading-tight"
          style={{
            fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
            fontFamily: "var(--font-playfair)",
          }}
        >
          Cash Flow Academy
        </h2>
        <p
          className="italic max-w-2xl mx-auto mt-4 leading-relaxed"
          style={{ color: C.cream, fontSize: "20px" }}
        >
          The Complete Business System to Turn Your Gourmet Popcorn Into Real Monthly Income —
          From Your Own Kitchen.
        </p>
      </section>
    </FadeIn>
  )
}

const PILLARS = [
  {
    t: "Brand Identity That Actually Sells",
    b: "Create a brand name, color palette, and logo that make your popcorn look like it came from a boutique shop in Manhattan. Free tools, zero design experience.",
  },
  {
    t: "Packaging That Sells Itself",
    b: "The exact pouches, boxes, and jars I use, where to buy them in the US, and how to design professional labels. One student doubled her order size just by switching packaging.",
  },
  {
    t: "Legal Nutritional Labels in 30 Minutes",
    b: "Calculate nutritional facts with free tools, which allergens you're legally required to list, and the exact FDA-compliant phrases your labels need.",
  },
  {
    t: "The Pricing Formula That Prints Money",
    b: "The only formula you need to calculate real cost, ideal markup per sales channel, and the psychological pricing that makes gift boxes fly.",
  },
  {
    t: "The Instagram & TikTok Sales Machine",
    b: "Exact content that sells popcorn (ASMR, transformation, before/after), bio that converts, and DM script to turn 'just curious' messages into paid orders.",
  },
  {
    t: "Dominating Etsy as a Cottage Food Seller",
    b: "Full walkthrough of setting up your Etsy shop, optimizing listings for SEO, and photos that make buyers hit 'add to cart.' 96M active buyers searching now.",
  },
  {
    t: "Monthly Subscriptions = Monthly Rent Paid",
    b: "Turn one-time buyers into recurring subscribers who pay you every month on autopilot. Exact Shopify setup + retention strategy for 6+ month subs.",
  },
  {
    t: "Getting Into Delivery Apps (DoorDash, Uber Eats, Grubhub)",
    b: "Gourmet popcorn is a dry snack — it lives in a category with almost zero competition. Get listed and pull first orders within 30 days.",
  },
  {
    t: "The Seasonal Sales Playbook",
    b: "Full 12-month calendar of US holidays with the exact flavors and campaigns I use to turn every season into a massive sales spike.",
  },
]

function Pillars() {
  return (
    <FadeIn>
      <section className="py-20 md:py-24 px-6" style={{ background: C.bg }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-bold text-center mb-4"
            style={{
              color: C.burgundy,
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontFamily: "var(--font-playfair)",
            }}
          >
            What&apos;s Inside Cash Flow Academy
          </h2>
          <p
            className="text-center max-w-2xl mx-auto mb-10"
            style={{ color: C.text2, fontSize: "17px" }}
          >
            I walk you through the 9 exact pillars I used to go from &ldquo;hobby&rdquo; to
            &ldquo;real business from my kitchen.&rdquo;
          </p>
          <img
            src="/upsell-2/dashboard-mockup.webp"
            alt="Cash Flow Academy members dashboard"
            loading="lazy"
            className="w-full rounded-lg border shadow-sm mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p, i) => (
              <div
                key={p.t}
                className="rounded-[20px] p-7 shadow-sm hover:-translate-y-1 transition-transform"
                style={{ background: "white", borderTop: `4px solid ${C.gold}` }}
              >
                <span
                  className="font-bold uppercase"
                  style={{ color: C.goldDark, fontSize: "11px", letterSpacing: "1.5px" }}
                >
                  Pillar {i + 1}
                </span>
                <h3
                  className="mt-2 mb-3"
                  style={{
                    color: C.burgundy,
                    fontSize: "20px",
                    fontFamily: "var(--font-playfair)",
                  }}
                >
                  {p.t}
                </h3>
                <p className="leading-relaxed" style={{ color: C.text, fontSize: "15px" }}>
                  {p.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

function StarBenefit() {
  const items = [
    "Enter your ingredients and packaging once",
    "The app calculates your real cost per unit instantly",
    "Tells you exactly what to charge on every channel",
    "Tracks every sale and shows profit margin in real time",
    "Warns you when your prices are too low",
  ]
  return (
    <FadeIn>
      <section
        className="py-20 md:py-24 px-6"
        style={{
          background: `linear-gradient(135deg, ${C.burgundyDark} 0%, #5A0F29 100%)`,
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p
              className="uppercase font-bold mb-4"
              style={{ color: C.gold, fontSize: "13px", letterSpacing: "2px" }}
            >
              ⭐ EXCLUSIVE BONUS — NOT SOLD ANYWHERE ELSE
            </p>
            <h2
              className="font-bold text-white leading-tight mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
            >
              The Automatic Cash Flow App
            </h2>
            <p
              className="italic mb-6"
              style={{
                color: C.gold,
                fontSize: "20px",
                fontFamily: "var(--font-playfair)",
              }}
            >
              Remember Wall #1? &ldquo;How much should I charge?&rdquo;
            </p>
            <p className="leading-relaxed mb-6" style={{ color: C.cream, fontSize: "17px" }}>
              I&apos;m handing you a{" "}
              <strong className="text-white">live, working financial app</strong> that does every
              calculation for you. Automatically. In real time.
            </p>
            <ul className="space-y-3 mb-6">
              {items.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-1 shrink-0" style={{ color: C.green }} />
                  <span className="text-white" style={{ fontSize: "16px" }}>
                    {i}
                  </span>
                </li>
              ))}
            </ul>
            <div
              className="rounded-xl p-5 mb-6"
              style={{
                borderLeft: `4px solid ${C.gold}`,
                background: "rgba(250,243,232,0.08)",
              }}
            >
              <p className="leading-relaxed" style={{ color: C.cream, fontSize: "15px" }}>
                <strong className="text-white">Imagine this:</strong> Saturday morning you finish
                a batch, orders come in, you tap &ldquo;new order&rdquo; in the app. By Sunday
                night, the app shows you exactly how much you made, how much it cost, and how
                much is pure profit.
              </p>
            </div>
            <p
              className="italic"
              style={{
                color: C.gold,
                fontSize: "17px",
                fontFamily: "var(--font-playfair)",
              }}
            >
              This alone is worth more than the entire price of Cash Flow Academy — and
              you&apos;re getting it free when you join today.
            </p>
          </div>
          <div className="flex justify-center">
            <div
              className="relative rounded-[2.5rem] p-2 max-w-[280px]"
              style={{
                border: "6px solid rgba(255,255,255,0.15)",
                background: "rgba(0,0,0,0.4)",
                boxShadow:
                  "0 0 40px 10px rgba(196,160,100,0.25), 0 0 80px 20px rgba(196,160,100,0.1)",
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 rounded-b-2xl z-10"
                style={{ background: "rgba(0,0,0,0.6)" }}
              />
              <img
                src="/upsell-2/hero-mockup.webp"
                alt="Cash Flow App"
                loading="lazy"
                className="w-full rounded-[2rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

function Testimonials() {
  const imgs = [1, 2, 3, 4, 5, 6]
  return (
    <section className="py-20 md:py-24 px-6" style={{ background: C.bg }}>
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <h2
            className="font-bold text-center mb-3"
            style={{
              color: C.burgundy,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontFamily: "var(--font-playfair)",
            }}
          >
            Real Women. Real Kitchens. Real Income.
          </h2>
          <p
            className="text-center mb-10"
            style={{ color: C.text2, fontSize: "17px" }}
          >
            Don&apos;t just take my word for it. Here&apos;s what my students are saying:
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {imgs.map((i) => (
            <FadeIn key={i} delay={i * 60}>
              <img
                src={`/upsell-2/testimonial-${i}.webp`}
                alt={`Testimonial ${i}`}
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-sm border"
                style={{ borderColor: `${C.burgundy}20` }}
              />
            </FadeIn>
          ))}
        </div>
        <p
          className="font-bold text-center mt-10"
          style={{ color: C.text, fontSize: "17px" }}
        >
          Over 1,500 students have already gone through my programs.
        </p>
      </div>
    </section>
  )
}

const BONUSES = [
  {
    n: 1,
    t: "The 50-Post Instagram Swipe File",
    d: "Fifty ready-to-post Instagram captions and content ideas for gourmet popcorn. Copy, paste, post. Never wonder what to write again.",
    v: "$27",
    img: "/upsell-2/bonus-1-mockup.webp",
  },
  {
    n: 2,
    t: "The Canva Label Template Pack",
    d: "My full library of editable label designs in Canva. Professional packaging in 10 minutes instead of $200 on a designer.",
    v: "$37",
    img: "/upsell-2/bonus-2-mockup.webp",
  },
  {
    n: 3,
    t: "The Seasonal Campaign Calendar",
    d: "Complete 12-month calendar with every major US holiday, the exact flavors that sell best, and pre-made promo templates.",
    v: "$17",
    img: "/upsell-2/bonus-3-mockup.webp",
  },
]

function Bonuses() {
  return (
    <FadeIn>
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-bold text-center mb-10"
            style={{
              color: C.burgundy,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontFamily: "var(--font-playfair)",
            }}
          >
            Plus 3 Free Bonuses When You Join Today
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BONUSES.map((b) => (
              <div
                key={b.n}
                className="rounded-[20px] p-8 text-center"
                style={{
                  background: C.creamWarm,
                  border: `2px dashed ${C.gold}`,
                }}
              >
                <span className="text-4xl mb-3 block">🎁</span>
                <span
                  className="font-bold uppercase"
                  style={{ color: C.goldDark, fontSize: "11px", letterSpacing: "1.5px" }}
                >
                  BONUS #{b.n}
                </span>
                <h3
                  className="mt-2 mb-4"
                  style={{
                    color: C.burgundy,
                    fontSize: "20px",
                    fontFamily: "var(--font-playfair)",
                  }}
                >
                  {b.t}
                </h3>
                <img
                  src={b.img}
                  alt={b.t}
                  loading="lazy"
                  className="w-full aspect-square object-contain rounded-lg mb-4"
                  style={{ border: `1px solid ${C.burgundy}30` }}
                />
                <p
                  className="leading-relaxed mb-4"
                  style={{ color: C.text, fontSize: "15px" }}
                >
                  {b.d}
                </p>
                <p style={{ fontSize: "14px" }}>
                  <span className="line-through opacity-60 font-bold">{b.v}</span>
                  {" — "}
                  <span className="font-bold" style={{ color: C.burgundy }}>
                    Yours FREE
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

const STACK = [
  { i: "✅", n: "Cash Flow Academy — Complete Business System (9 Pillars)", v: "$147" },
  { i: "⭐", n: "The Automatic Cash Flow App", v: "$87" },
  { i: "🎁", n: "BONUS #1 — 50 Instagram Posts Swipe File", v: "$27" },
  { i: "🎁", n: "BONUS #2 — Canva Label Templates", v: "$37" },
  { i: "🎁", n: "BONUS #3 — Seasonal Campaign Calendar", v: "$17" },
]

function ValueStackAndCta() {
  return (
    <FadeIn>
      <section className="py-20 md:py-24 px-6" style={{ background: C.bg }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="font-bold text-center mb-10"
            style={{
              color: C.burgundy,
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontFamily: "var(--font-playfair)",
            }}
          >
            Here&apos;s Everything You&apos;re Getting Today:
          </h2>
          <div
            className="rounded-lg shadow-lg overflow-hidden"
            style={{ background: "white" }}
          >
            {STACK.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4"
                style={{
                  borderBottom: i < STACK.length - 1 ? "1px solid #eee" : "none",
                }}
              >
                <span style={{ color: C.text, fontSize: "15px" }}>
                  <span className="mr-2">{s.i}</span>
                  {s.n}
                </span>
                <span
                  className="font-bold line-through opacity-60 ml-4 shrink-0"
                  style={{ color: C.text2 }}
                >
                  {s.v}
                </span>
              </div>
            ))}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ background: C.creamWarm }}
            >
              <span className="font-bold" style={{ color: C.text, fontSize: "15px" }}>
                TOTAL REAL VALUE
              </span>
              <span
                className="font-black line-through"
                style={{ color: C.text, fontSize: "18px" }}
              >
                $315
              </span>
            </div>
          </div>

          <div className="text-center mt-12">
            <p
              className="uppercase font-semibold mb-2"
              style={{ color: C.text2, fontSize: "13px", letterSpacing: "2px" }}
            >
              YOUR PRICE TODAY
            </p>
            <p
              className="font-black leading-none"
              style={{ color: C.green, fontSize: "clamp(4rem, 8vw, 7rem)" }}
            >
              $37
            </p>
            <p className="mt-2" style={{ color: C.text2, fontSize: "16px" }}>
              Save $278 — 88% off the total value
            </p>
            <p className="mt-6" style={{ color: C.text, fontSize: "17px" }}>
              That&apos;s less than what you&apos;d spend on one weekend of wasted ingredients
              trying to figure this out on your own.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Suspense fallback={null}>
              <OneClickButtons
                upsell="upsell2"
                nextPath="/upsell-3"
                acceptLabel="Yes! Add Cash Flow Academy for $37"
                declineLabel="No thanks, I'll pass on this bonus"
              />
            </Suspense>
            <p style={{ color: C.text2, fontSize: "13px" }}>
              🔒 One-time payment · Instant access · Lifetime updates · 7-day guarantee
            </p>
            <img
              src="/upsell-2/payment-methods.webp"
              alt="Accepted payment methods"
              loading="lazy"
              className="h-10 object-contain mt-2"
            />
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

function Guarantee() {
  return (
    <FadeIn>
      <section className="py-16 md:py-20 px-6" style={{ background: C.creamWarm }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src="/upsell-2/guarantee-badge.webp"
              alt="7-Day Money-Back Guarantee"
              loading="lazy"
              className="w-52 h-52 object-contain"
            />
          </div>
          <div className="md:col-span-2">
            <h2
              className="font-bold mb-2"
              style={{
                color: C.burgundy,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontFamily: "var(--font-playfair)",
              }}
            >
              Your Risk Is Exactly Zero.
            </h2>
            <h3
              className="font-bold text-2xl mb-4"
              style={{ color: C.burgundy, fontFamily: "var(--font-playfair)" }}
            >
              7-Day Unconditional Money-Back Guarantee
            </h3>
            <div className="leading-[1.8] space-y-3" style={{ color: C.text, fontSize: "17px" }}>
              <p>
                Join today, go through every pillar, try the app. If within 7 days it&apos;s not
                what you expected — for any reason, or no reason at all — just send me one email.
                I&apos;ll refund every single penny. No forms, no questions, no hassle.
              </p>
              <p className="font-bold">
                You either build a real business from your kitchen — or you get every dollar
                back.
              </p>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}

function Footer() {
  return (
    <footer className="py-10 px-6 text-center" style={{ background: "#3D1C00" }}>
      <div className="space-y-2" style={{ color: C.gold, fontSize: "13px" }}>
        <p>Living Off Gourmet Popcorn</p>
        <p>501 Silverside Rd # 50, Wilmington, DE 19809, United States</p>
        <p className="mt-3 opacity-80">© 2026 All rights reserved.</p>
      </div>
    </footer>
  )
}

export function Upsell2Client() {
  return (
    <div style={{ background: C.bg, color: C.text }}>
      <StickyBars />
      <div style={{ height: "72px" }} />
      <Hero />
      <Bridge />
      <Walls />
      <Paradigm />
      <ProductStory />
      <ProductReveal />
      <Pillars />
      <StarBenefit />
      <Testimonials />
      <Bonuses />
      <ValueStackAndCta />
      <Guarantee />
      <Footer />
    </div>
  )
}
