"use client";

import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { fetchPortfolioSnapshot } from "@/lib/portfolio/service";
import { PortfolioSnapshot } from "@/lib/portfolio/types";

const EMPTY_SNAPSHOT: PortfolioSnapshot = { solBalance: 0, tokens: [], transactions: [] };

export function usePortfolioData(publicKey: PublicKey | null, connected: boolean, connection: Connection) {
  const [snapshot, setSnapshot] = useState<PortfolioSnapshot>(EMPTY_SNAPSHOT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connected) {
      setSnapshot(EMPTY_SNAPSHOT);
      setLoading(false);
      return;
    }
    if (!publicKey) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const nextSnapshot = await fetchPortfolioSnapshot(publicKey, connection);
        setSnapshot(nextSnapshot);
      } catch (err) {
        console.error(err);
        setError("Failed to load wallet data. Try again or check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [publicKey, connected, connection]);

  return { ...snapshot, loading, error };
}
