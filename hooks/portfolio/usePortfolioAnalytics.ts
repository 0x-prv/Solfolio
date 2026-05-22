"use client";

import { useMemo } from "react";
import { computePortfolioAnalytics } from "@/lib/portfolio/analytics";
import { EnrichedToken, PortfolioTransaction } from "@/lib/portfolio/types";

export function usePortfolioAnalytics(solBalance: number, tokens: EnrichedToken[], transactions: PortfolioTransaction[]) {
  return useMemo(() => computePortfolioAnalytics({ solBalance, tokens, transactions }), [solBalance, tokens, transactions]);
}
