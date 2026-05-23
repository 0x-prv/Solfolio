"use client";

import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { AIInsightsPanel } from "@/components/portfolio/AIInsightsPanel";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { usePortfolioData } from "@/hooks/portfolio/usePortfolioData";

export default function AIPage() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const { solBalance, tokens, transactions, loading } = usePortfolioData(publicKey, connected, connection);

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-14">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>AI Portfolio Intelligence</h1>
        <p className="mt-2 mb-5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Wallet summary, risk insights, portfolio recommendations, and AI-generated insights.
        </p>
        <AIInsightsPanel loading={loading} totalUSD={tokens.reduce((a,t)=>a+t.usdValue,0)+solBalance*155} solBalance={solBalance} tokens={tokens} transactions={transactions} />
      </section>
    </main>
  );
}
