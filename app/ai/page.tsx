"use client";

 codex/finalize-multi-page-structure-for-solfolio-qc3u1r
import { useEffect, useState } from "react";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { AgentSummary } from "@/components/ai/AgentSummary";
import { TrendCard } from "@/components/ai/TrendCard";
import { getSolanaIntelligenceSnapshot } from "@/lib/ai/solanaIntelligenceService";
import { SolanaIntelligenceSnapshot, TrendCategory } from "@/lib/ai/types";

const categories: TrendCategory[] = [
  "Solana News",
  "Trending Projects",
  "New NFT / Collection Activity",
  "Token / DeFi Trends",
  "Risk Alerts",
];

export default function AIPage() {
  const [data, setData] = useState<SolanaIntelligenceSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getSolanaIntelligenceSnapshot();
        if (mounted) setData(result);
      } catch (e) {
        if (mounted) setError(e instanceof Error ? e.message : "Failed to load intelligence data.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { AIInsightsPanel } from "@/components/portfolio/AIInsightsPanel";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { usePortfolioData } from "@/hooks/portfolio/usePortfolioData";

export default function AIPage() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const { solBalance, tokens, transactions, loading } = usePortfolioData(publicKey, connected, connection);
premium-dashboard-redesign

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
 codex/finalize-multi-page-structure-for-solfolio-qc3u1r
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-36 pb-14">
        <h1 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>Solana Intelligence Agent</h1>
        <p className="mt-2 text-sm sm:text-base" style={{ color: "var(--color-text-secondary)" }}>
          Autonomous market intelligence across ecosystem trends, projects, NFTs, DeFi flows, and risk posture.
        </p>

        <div className="mt-6 space-y-5">
          {loading && (
            <>
              <div className="card p-6 animate-pulse" style={{ height: 140 }} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="card animate-pulse" style={{ height: 260 }} />)}</div>
            </>
          )}

          {!loading && error && <div className="card p-5" style={{ borderColor: "rgba(239,68,68,0.45)", color: "#fca5a5" }}>Error loading Solana intelligence: {error}</div>}

          {!loading && !error && data && (
            <>
              <AgentSummary summary={data.todaySummary} generatedAt={data.generatedAt} sourceMode={data.sourceMode} />

              {categories.map((category) => {
                const items = data.trends.filter((trend) => trend.category === category);
                return (
                  <section key={category}>
                    <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-syne)" }}>{category}</h2>
                    {items.length === 0 ? (
                      <div className="card p-4 text-sm" style={{ color: "var(--color-text-secondary)" }}>No signals available in this category yet.</div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {items.map((trend) => (
                          <TrendCard key={trend.id} trend={trend} />
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </>
          )}
        </div>

      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-14">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>AI Portfolio Intelligence</h1>
        <p className="mt-2 mb-5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Wallet summary, risk insights, portfolio recommendations, and AI-generated insights.
        </p>
        <AIInsightsPanel loading={loading} totalUSD={tokens.reduce((a,t)=>a+t.usdValue,0)+solBalance*155} solBalance={solBalance} tokens={tokens} transactions={transactions} />
 premium-dashboard-redesign
      </section>
    </main>
  );
}
