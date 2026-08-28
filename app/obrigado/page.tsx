import Link from "next/link"
import { CheckCircle2, Mail, Sparkles } from "lucide-react"

export const metadata = {
  title: "Thank you for your order! · ROUNDpops",
}

export default function ObrigadoPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{ background: "linear-gradient(180deg, #FBF8F2 0%, #F5ECDC 100%)" }}
    >
      <div className="w-full max-w-2xl text-center">
        <div
          className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "#DCFCE7" }}
        >
          <CheckCircle2 className="h-12 w-12" style={{ color: "#21C55D" }} />
        </div>

        <h1
          className="mb-4 font-bold"
          style={{
            color: "#3A2418",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontFamily: "var(--font-playfair)",
          }}
        >
          Your Order Is Complete!
        </h1>

        <p
          className="mx-auto mb-10 max-w-xl leading-relaxed"
          style={{ color: "#7A6B5C", fontSize: "18px" }}
        >
          Thank you for trusting us. Every product you purchased today is already
          being prepared and will be delivered to your email in the next few
          minutes.
        </p>

        <div
          className="mx-auto mb-8 max-w-xl rounded-2xl border p-6 md:p-8 text-left shadow-sm"
          style={{ background: "white", borderColor: "#E5D9C4" }}
        >
          <h2
            className="mb-4 flex items-center gap-2 font-semibold"
            style={{ color: "#7B1538", fontSize: "18px" }}
          >
            <Sparkles className="h-5 w-5" style={{ color: "#D4AF37" }} />
            What happens next
          </h2>
          <ul className="space-y-3" style={{ color: "#3A2418", fontSize: "15px" }}>
            <li className="flex items-start gap-3">
              <Mail
                className="h-5 w-5 mt-0.5 shrink-0"
                style={{ color: "#7B1538" }}
              />
              <span>
                Check your inbox — your access links arrive within a few minutes
                at the email used at checkout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full shrink-0 text-xs font-bold text-white"
                style={{ background: "#7B1538" }}
              >
                !
              </span>
              <span>
                Don&apos;t forget to check your <strong>spam</strong> and{" "}
                <strong>promotions</strong> folder if you don&apos;t see it in a
                couple of minutes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles
                className="h-5 w-5 mt-0.5 shrink-0"
                style={{ color: "#D4AF37" }}
              />
              <span>
                Any bonuses and upsells you added are included in the same email
                as separate access links.
              </span>
            </li>
          </ul>
        </div>

        <p
          className="mx-auto mb-8 max-w-xl"
          style={{ color: "#7A6B5C", fontSize: "14px" }}
        >
          Need help? Reply to your order confirmation email and our team will
          personally take care of you.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
          style={{ background: "#7B1538" }}
        >
          Back to home
        </Link>

        <p className="mt-10 text-xs" style={{ color: "#7A6B5C" }}>
          🔒 Payment securely processed by Stripe.
        </p>
      </div>
    </main>
  )
}
