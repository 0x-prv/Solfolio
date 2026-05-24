import Link from "next/link";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";

const features = [
  { title: "Operator Cockpit", desc: "Mission-control dashboard for portfolio exposure, on-chain behavior, and AI agent actions." },
  { title: "AI Agent Command", desc: "From macro sentiment to token-level risk, get actionable AI Agent guidance." },
  { title: "Wallet Control", desc: "Monitor wallet status, copy/export addresses, explorer links, and RPC health." },
  { title: "Unified Design", desc: "Landing, dashboard, wallet, agent, and settings share one premium tactile system." },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-36 pb-20">
        <div className="landing-hero">
          <p className="text-xs tracking-[0.28em] uppercase text-violet-200/80">Solfolio · AI Agent System</p>
          <h1 className="text-4xl sm:text-6xl font-bold mt-4 leading-tight">Cinematic Solana portfolio command center for serious Web3 operators.</h1>
          <p className="mt-5 max-w-3xl text-sm sm:text-base text-white/75 leading-7">
            Solfolio combines portfolio intelligence, wallet operations, and AI Agent orchestration into one premium dark workspace with tactile glass surfaces.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/dashboard" className="btn-primary">Open Dashboard</Link>
            <Link href="/ai" className="btn-ghost">AI Agent Command Center</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-9">
          {features.map((f) => (
            <article key={f.title} className="card p-6">
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="text-sm mt-3 text-white/70 leading-6">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
