"use client";
import { useConnection } from "@solana/wallet-adapter-react";
import { Navbar } from "@/components/layout/Navbar";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";

export default function SettingsPage() {
  const { connection } = useConnection();
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-36 pb-14">
        <div className="card p-6 sm:p-8 space-y-5">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>Application Settings</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card p-4"><p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>App preferences</p><p className="mt-1">Notifications, analytics refresh, and smart alerts are enabled.</p></div>
            <div className="card p-4"><p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Theme / display</p><p className="mt-1">Premium Dark · Comfortable spacing</p></div>
            <div className="card p-4"><p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>RPC / network status</p><p className="mt-1 text-sm break-all">{connection.rpcEndpoint}</p></div>
            <div className="card p-4"><p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>Basic app info</p><p className="mt-1 text-sm">Solfolio v1 · AI powered Solana portfolio intelligence platform.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
