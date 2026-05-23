export type IntelCategory = "news" | "trends" | "projects" | "nft" | "defi" | "risk";

export interface SolanaIntelItem {
  id: string;
  title: string;
  summary: string;
  category: IntelCategory;
  sourceName?: string;
  sourceUrl?: string;
  publishedAt?: string;
  severity?: "low" | "medium" | "high";
}

export interface SolanaIntelFeed {
  lastUpdated: string | null;
  items: SolanaIntelItem[];
}

/**
 * Service-layer placeholder.
 * Replace with real API integration (Helius, Birdeye, Sanctum, custom backend, etc.).
 */
export async function fetchSolanaIntelFeed(): Promise<SolanaIntelFeed> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    lastUpdated: null,
    items: [],
  };
}
