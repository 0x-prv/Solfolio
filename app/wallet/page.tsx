"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Navbar } from "@/components/layout/Navbar";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";

export default function WalletPage() {
  const { publicKey, connected, disconnect } = useWallet();
  const { connection } = useConnection();
  const address = publicKey?.toBase58() || "Not connected";
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-36 pb-14">
        <div className="card p-6 sm:p-8 space-y-5">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>Wallet Management</h1>
          <div><p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Connected wallet address</p><p className="mono mt-1 break-all">{address}</p></div>
          <div className="flex flex-wrap gap-3">
            <button className="btn-ghost" onClick={() => navigator.clipboard.writeText(address)} disabled={!connected}>Copy address</button>
            <a className="btn-ghost" href={connected ? `https://solscan.io/account/${address}` : "#"} target="_blank">View on Explorer</a>
            <button className="btn-primary" onClick={() => disconnect()} disabled={!connected}>Disconnect Wallet</button>
          </div>
          <div className="card p-4"><p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Network / RPC status</p><p className="mt-1 text-sm">Endpoint: {connection.rpcEndpoint}</p></div>
        </div>
      </section>
    </main>
  );
}
