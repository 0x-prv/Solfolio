import Link from "next/link";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";

const features = [
  { title: "Portfolio Tracking", desc: "Live Solana wallet valuation, holdings composition, and activity updates." },
  { title: "AI Insights", desc: "Actionable intelligence on concentration, behavior, and balance strategy." },
  { title: "Wallet Intelligence", desc: "Address-level visibility with explorer controls and transaction context." },
  { title: "Risk Overview", desc: "Clear risk posture summary with practical portfolio recommendations." },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-40 pb-20">
        <div className="card p-8 sm:p-12" style={{ background: "linear-gradient(145deg, rgba(13,17,42,0.94), rgba(12,11,32,0.9))" }}>
          <p className="text-xs tracking-[0.22em] uppercase" style={{ color: "var(--color-text-secondary)" }}>Solfolio</p>
          <h1 className="text-3xl sm:text-5xl font-bold mt-3" style={{ fontFamily: "var(--font-syne)", lineHeight: 1.08 }}>
            AI Powered Solana Portfolio Intelligence for serious Web3 operators.
          </h1>
          <p className="mt-4 max-w-3xl text-sm sm:text-base" style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
            Solfolio unifies wallet analytics, real-time holdings, and AI-driven risk interpretation into one premium SaaS interface built for portfolio clarity.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href="/dashboard" className="btn-primary">Enter Dashboard</Link>
            <Link href="/ai" className="btn-ghost">View AI Insights</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          {features.map((f) => (
            <article key={f.title} className="card p-5">
              <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--font-syne)" }}>{f.title}</h3>
              <p className="text-sm mt-2" style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{f.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
