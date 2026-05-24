"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import {
  fetchSolanaIntelFeed,
  SolanaIntelFeed,
  SolanaIntelItem,
  IntelCategory,
} from "@/lib/ai/solanaIntelService";

const CATEGORY_LABELS: Record<IntelCategory, string> = {
  news: "News",
  trends: "Trends",
  projects: "Projects",
  nft: "NFT Activity",
  defi: "DeFi & Tokens",
  risk: "Risk Alerts",
};

const CATEGORY_ACCENTS: Record<IntelCategory, string> = {
  news: "from-cyan-400/40 to-blue-500/40",
  trends: "from-fuchsia-400/40 to-violet-500/40",
  projects: "from-emerald-400/40 to-teal-500/40",
  nft: "from-pink-400/40 to-rose-500/40",
  defi: "from-amber-400/40 to-orange-500/40",
  risk: "from-red-400/40 to-red-600/40",
};

function formatUpdatedAt(feed: SolanaIntelFeed): string {
  if (!feed.lastUpdated) return "No live feed configured yet";
  return new Date(feed.lastUpdated).toLocaleString();
}

function IntelCard({ item }: { item: SolanaIntelItem }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition hover:border-white/20">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex rounded-full bg-gradient-to-r ${CATEGORY_ACCENTS[item.category]} px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white`}
        >
          {CATEGORY_LABELS[item.category]}
        </span>
        {item.severity ? (
          <span className="text-xs font-medium text-red-300">Risk: {item.severity}</span>
        ) : null}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
      <p className="mt-2 text-sm leading-6" style={{ color: "var(--color-text-secondary)" }}>
        {item.summary}
      </p>
      {(item.sourceName || item.publishedAt) && (
        <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
          {item.sourceName ? <span>{item.sourceName}</span> : null}
          {item.sourceName && item.publishedAt ? <span>•</span> : null}
          {item.publishedAt ? <span>{new Date(item.publishedAt).toLocaleString()}</span> : null}
        </div>
      )}
      {item.sourceUrl ? (
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex text-sm font-medium text-cyan-300 hover:text-cyan-200"
        >
          Open source
        </a>
      ) : null}
    </article>
  );
}

export default function AIPage() {
  const [feed, setFeed] = useState<SolanaIntelFeed | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadIntel = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSolanaIntelFeed();
      setFeed(data);
    } catch {
      setError("Unable to load AI Agent intelligence feed right now.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadIntel();
  }, [loadIntel]);

  const grouped = useMemo(() => {
    const categories: IntelCategory[] = ["news", "trends", "projects", "nft", "defi", "risk"];
    return categories.map((category) => ({
      category,
      items: feed?.items.filter((item) => item.category === category) ?? [],
    }));
  }, [feed]);

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-32 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-black/40 p-8 shadow-[0_30px_120px_rgba(8,8,20,0.45)] backdrop-blur-xl sm:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/90">Solfolio AI Agent</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-syne)" }}>
            AI Agent Command Center
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 sm:text-base" style={{ color: "var(--color-text-secondary)" }}>
            Monitor Solana market news, ecosystem momentum, NFT activity, DeFi/token trends, and protocol risk alerts in one premium intelligence surface.
          </p>
          <p className="mt-3 text-xs text-white/50">Status: {feed ? formatUpdatedAt(feed) : "Initializing"}</p>
        </div>

        {isLoading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
            ))}
          </div>
        ) : null}

        {!isLoading && error ? (
          <div className="mt-8 rounded-2xl border border-red-400/30 bg-red-950/30 p-6">
            <p className="text-sm text-red-200">{error}</p>
            <button
              onClick={() => void loadIntel()}
              className="mt-4 rounded-lg border border-red-300/30 px-4 py-2 text-sm font-medium text-red-100 transition hover:bg-red-500/20"
            >
              Retry
            </button>
          </div>
        ) : null}

        {!isLoading && !error && feed && feed.items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-8 backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white">Feed not connected yet</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              The intelligence service is ready, but no live data provider is configured. Connect production APIs in
              <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-xs text-cyan-200">lib/ai/solanaIntelService.ts</code>
              to start streaming verified Solana updates.
            </p>
          </div>
        ) : null}

        {!isLoading && !error && (feed?.items.length ?? 0) > 0 ? (
          <div className="mt-8 space-y-8">
            {grouped.map(({ category, items }) =>
              items.length ? (
                <div key={category}>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">
                    {CATEGORY_LABELS[category]}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                      <IntelCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        ) : null}
      </section>
    </main>
  );
}
