"use client";

import Link from "next/link";
import { useState } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

interface WalletButtonProps {
  className?: string;
  variant?: "primary" | "ghost";
}

export function WalletButton({ className = "", variant = "primary" }: WalletButtonProps) {
  const { setVisible } = useWalletModal();
  const { connected, publicKey, disconnect, connecting } = useWallet();
  const [open, setOpen] = useState(false);

  const fullAddress = publicKey?.toBase58();
  const shortAddress = fullAddress ? `${fullAddress.slice(0, 4)}...${fullAddress.slice(-4)}` : null;

  if (connecting) return <button className={`btn-${variant} opacity-70 cursor-wait ${className}`} disabled>Connecting...</button>;

  if (connected && shortAddress && fullAddress) {
    return (
      <div className="relative">
        <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-brand-500/20 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
          <span className="text-brand-300 font-mono text-xs">{shortAddress}</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-52 card p-2 z-50">
            <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-white/5" onClick={() => navigator.clipboard.writeText(fullAddress)}>
              Copy address
            </button>
            <Link href="/wallet" className="block px-3 py-2 text-sm rounded-md hover:bg-white/5" onClick={() => setOpen(false)}>
              View wallet page
            </Link>
            <button className="w-full text-left px-3 py-2 text-sm rounded-md text-red-300 hover:bg-red-500/10" onClick={() => { setOpen(false); disconnect(); }}>
              Disconnect wallet
            </button>
          </div>
        )}
      </div>
    );
  }

  return <button onClick={() => setVisible(true)} className={`btn-${variant} ${className}`}>Connect Wallet</button>;
}
