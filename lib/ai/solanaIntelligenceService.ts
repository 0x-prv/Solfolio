import { SolanaIntelligenceSnapshot } from "@/lib/ai/types";

// TODO: Integrate real sources:
// - Solana RSS/news feeds
// - Birdeye trending tokens API
// - Jupiter token/price APIs
// - Helius wallet/NFT activity APIs
// - CryptoPanic (or equivalent) crypto news APIs

async function fetchLiveSolanaIntelligence(): Promise<SolanaIntelligenceSnapshot | null> {
  // TODO: Replace with real data fetch orchestration.
  return null;
}

function buildDemoSnapshot(): SolanaIntelligenceSnapshot {
  const now = new Date().toISOString();
  return {
    generatedAt: now,
    sourceMode: "demo",
    todaySummary:
      "Demo mode: Solana activity appears mixed with selective momentum in DeFi and NFTs. Use this as UI preview data until live sources are connected.",
    trends: [
      {
        id: "news-1",
        category: "Solana News",
        title: "Ecosystem sentiment monitor shows stable developer attention",
        summary: "Signal model indicates sustained discussion volume across core Solana ecosystem topics.",
        whyItMatters: "Steady attention can support project liquidity and user retention over the medium term.",
        source: "Demo Source / Aggregator Placeholder",
        timestamp: now,
      },
      {
        id: "project-1",
        category: "Trending Projects",
        title: "Early-stage project watchlist shows concentrated engagement",
        summary: "A small set of projects dominate community interactions in the current sample window.",
        whyItMatters: "Concentration can indicate conviction, but also raises rotation risk if narratives change quickly.",
        source: "Demo Source / Project Radar",
        timestamp: now,
      },
      {
        id: "nft-1",
        category: "New NFT / Collection Activity",
        title: "NFT mint chatter rising around new collections",
        summary: "Collection launch mentions are increasing in demo activity stream snapshots.",
        whyItMatters: "Rising mint interest can pull SOL liquidity and influence short-term wallet behavior.",
        source: "Demo Source / NFT Watch",
        timestamp: now,
      },
      {
        id: "defi-1",
        category: "Token / DeFi Trends",
        title: "DeFi rotation signals favor liquid staking and stable pools",
        summary: "Sample trend distribution suggests preference for lower-volatility DeFi positioning.",
        whyItMatters: "Defensive allocation trends may imply risk-off sentiment despite pockets of upside.",
        source: "Demo Source / DeFi Pulse",
        timestamp: now,
      },
      {
        id: "risk-1",
        category: "Risk Alerts",
        title: "Narrative concentration alert",
        summary: "Multiple trend buckets are being driven by a narrow theme cluster in this demo snapshot.",
        whyItMatters: "Narrative crowding can amplify drawdowns if market attention rotates suddenly.",
        source: "Demo Source / Risk Engine",
        timestamp: now,
      },
    ],
  };
}

export async function getSolanaIntelligenceSnapshot(): Promise<SolanaIntelligenceSnapshot> {
  const live = await fetchLiveSolanaIntelligence();
  return live ?? buildDemoSnapshot();
}
