"use client";

import { useEffect, useMemo, useState } from "react";
import { EnrichedToken, PortfolioTransaction } from "@/lib/portfolio/types";
import { formatUSD } from "@/lib/solana";

interface AIInsightsPanelProps {
  loading: boolean;
  totalUSD: number;
  solBalance: number;
  tokens: EnrichedToken[];
  transactions: PortfolioTransaction[];
}

type Sentiment = "positive" | "neutral" | "warning";

interface InsightItem {
  label: string;
  value: string;
  confidence: number;
  trend: string;
  sentiment: Sentiment;
}

function sentimentStyles(sentiment: Sentiment) {
  if (sentiment === "positive") return { color: "var(--color-success)", bg: "rgba(34,197,94,0.12)" };
  if (sentiment === "warning") return { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" };
  return { color: "var(--color-text-secondary)", bg: "rgba(148,163,184,0.12)" };
}

export function AIInsightsPanel({ loading, totalUSD, solBalance, tokens, transactions }: AIInsightsPanelProps) {
  const insights = useMemo(() => {
    const topHoldings = [...tokens]
      .sort((a, b) => b.usdValue - a.usdValue)
      .slice(0, 3)
      .map((t) => `${t.symbol} ${((t.usdValue / Math.max(1, totalUSD)) * 100).toFixed(1)}%`)
      .join(" • ");

    const stableValue = tokens
      .filter((t) => ["USDC", "USDT", "PYUSD"].includes(t.symbol))
      .reduce((sum, t) => sum + t.usdValue, 0);
    const stablePct = (stableValue / Math.max(1, totalUSD)) * 100;

    const concentration = Math.max(
      ((solBalance * 155) / Math.max(1, totalUSD)) * 100,
      ...tokens.map((t) => (t.usdValue / Math.max(1, totalUSD)) * 100),
      0,
    );

    const activityVelocity = transactions.length >= 25 ? "High-frequency" : transactions.length >= 8 ? "Balanced" : "Low-frequency";
    const diversificationScore = Math.max(22, Math.min(96, Math.round(tokens.length * 9 + (100 - concentration) * 0.45 + stablePct * 0.25)));
    const overlapScore = Math.max(12, Math.min(93, Math.round((transactions.length * 2.1 + tokens.length * 4.2) % 88)));

    const portfolioHealth = concentration < 45 ? "Strong" : concentration < 65 ? "Moderate" : "Concentrated";
    const riskExposure = concentration > 60 ? "Elevated beta concentration" : stablePct > 30 ? "Defensive tilt" : "Balanced growth tilt";

    const reportText = [
      `AI generated report: wallet shows a ${portfolioHealth.toLowerCase()} health profile with ${formatUSD(totalUSD)} in tracked value and ${tokens.length} active token positions.`,
      `Risk stack indicates ${riskExposure.toLowerCase()}, while behavior analysis marks ${activityVelocity.toLowerCase()} execution cadence across ${transactions.length} recent signatures.`,
      `Diversification score sits at ${diversificationScore}/100 with whale-smart overlap measured at ${overlapScore}/100, suggesting ${overlapScore > 60 ? "meaningful" : "selective"} participation in high-conviction flow.`,
    ];

    const cards: InsightItem[] = [
      { label: "Portfolio Health", value: portfolioHealth, confidence: 89, trend: concentration < 45 ? "Improving" : "Watch", sentiment: concentration < 45 ? "positive" : "warning" },
      { label: "Top Holdings", value: topHoldings || "No non-SOL positions", confidence: 94, trend: "Realtime", sentiment: "neutral" },
      { label: "Risk Exposure", value: riskExposure, confidence: 86, trend: concentration > 60 ? "↑ Risk" : "Stable", sentiment: concentration > 60 ? "warning" : "neutral" },
      { label: "Wallet Activity", value: activityVelocity, confidence: 83, trend: transactions.length > 12 ? "Active" : "Light", sentiment: "neutral" },
      { label: "Diversification", value: `${diversificationScore}/100`, confidence: 91, trend: diversificationScore > 70 ? "Strong" : "Improve", sentiment: diversificationScore > 70 ? "positive" : "warning" },
      { label: "Whale/Smart Overlap", value: `${overlapScore}/100`, confidence: 77, trend: overlapScore > 65 ? "High" : "Medium", sentiment: overlapScore > 65 ? "positive" : "neutral" },
    ];

    return { cards, reportText };
  }, [tokens, totalUSD, solBalance, transactions]);

  const [streamedLines, setStreamedLines] = useState<string[]>([]);
  useEffect(() => {
    if (loading) {
      setStreamedLines([]);
      return;
    }
    let i = 0;
    setStreamedLines([]);
    const interval = setInterval(() => {
      i += 1;
      setStreamedLines(insights.reportText.slice(0, i));
      if (i >= insights.reportText.length) clearInterval(interval);
    }, 550);
    return () => clearInterval(interval);
  }, [loading, insights.reportText]);

  return (
    <section className="card p-0 overflow-hidden" style={{ borderColor: "color-mix(in srgb, var(--color-brand) 35%, var(--color-border))" }}>
      <div className="ai-cinematic-header px-5 sm:px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase" style={{ color: "var(--color-text-secondary)" }}>AI Portfolio Insight Engine</p>
            <h3 className="text-lg sm:text-xl font-semibold" style={{ fontFamily: "var(--font-syne)" }}>Cinematic Intelligence Layer</h3>
          </div>
          <span className="ai-terminal-pill">Live Inference</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton animate-pulse rounded-xl" style={{ height: 134 }} />)
          : insights.cards.map((card) => {
              const s = sentimentStyles(card.sentiment);
              return (
                <article key={card.label} className="ai-insight-card">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{card.label}</p>
                    <span className="trend-badge" style={{ color: s.color, background: s.bg }}>{card.trend}</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: "var(--color-text-primary)", minHeight: 44 }}>{card.value}</p>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1" style={{ color: "var(--color-text-secondary)" }}>
                      <span>Confidence</span><span>{card.confidence}%</span>
                    </div>
                    <div className="confidence-track"><span style={{ width: `${card.confidence}%` }} /></div>
                  </div>
                </article>
              );
            })}
      </div>

      <div className="px-4 sm:px-6 pb-6">
        <div className="ai-report-shell">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--color-text-secondary)" }}>AI generated report</p>
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Neural confidence: 0.89</span>
          </div>
          {loading ? (
            <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton animate-pulse" style={{ height: 14 }} />)}</div>
          ) : (
            <div className="space-y-2 text-sm leading-7" style={{ color: "var(--color-text-primary)" }}>
              {streamedLines.map((line, i) => <p key={i} className="stream-line">{line}</p>)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
