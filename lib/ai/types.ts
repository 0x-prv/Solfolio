export type TrendCategory =
  | "Solana News"
  | "Trending Projects"
  | "New NFT / Collection Activity"
  | "Token / DeFi Trends"
  | "Risk Alerts";

export interface TrendItem {
  id: string;
  category: TrendCategory;
  title: string;
  summary: string;
  whyItMatters: string;
  source: string;
  timestamp: string;
}

export interface SolanaIntelligenceSnapshot {
  generatedAt: string;
  sourceMode: "demo" | "live";
  todaySummary: string;
  trends: TrendItem[];
}
