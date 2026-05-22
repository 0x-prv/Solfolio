import { Connection, PublicKey } from "@solana/web3.js";
import { getRecentTransactions, getSolBalance, getTokenAccounts } from "@/lib/solana";
import { KNOWN_TOKENS } from "@/lib/portfolio/constants";
import { EnrichedToken, PortfolioSnapshot } from "@/lib/portfolio/types";

export async function fetchPortfolioSnapshot(publicKey: PublicKey, connection: Connection): Promise<PortfolioSnapshot> {
  const [solBalance, tokenAccounts, transactions] = await Promise.all([
    getSolBalance(publicKey, connection),
    getTokenAccounts(publicKey, connection),
    getRecentTransactions(publicKey, 8, connection),
  ]);

  const tokens: EnrichedToken[] = tokenAccounts
    .map((t) => {
      const meta = KNOWN_TOKENS[t.mint];
      return {
        ...t,
        name: meta?.name || "Unknown Token",
        symbol: meta?.symbol || t.mint.slice(0, 4),
        price: meta?.price || 0,
        color: meta?.color || "#6366f1",
        usdValue: t.amount * (meta?.price || 0),
      };
    })
    .sort((a, b) => b.usdValue - a.usdValue);

  return { solBalance, tokens, transactions };
}
