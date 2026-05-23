"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { WalletButton } from "@/components/wallet/WalletButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ai", label: "AI" },
  { href: "/wallet", label: "Wallet" },
  { href: "/settings", label: "Settings" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4">
      <div
        className="glass border rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3"
        style={{
          borderColor: "var(--color-border)",
          background:
            "radial-gradient(circle at 18% 35%, rgba(139,92,246,0.32), transparent 35%), radial-gradient(circle at 82% 40%, rgba(34,197,94,0.2), transparent 36%), rgba(10,11,30,0.84)",
        }}
      >
        <Link href="/" className="flex items-center" style={{ textDecoration: "none" }}>
          <Image
            src="/solfoliologo.png"
            alt="Solfolio Logo"
            width={170}
            height={44}
            priority
            style={{ width: "170px", height: "auto", filter: "drop-shadow(0 0 14px rgba(139,92,246,0.55))" }}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "7px 14px",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--text-sm)",
                fontWeight: 600,
                textDecoration: "none",
                color: pathname === link.href ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                background: pathname === link.href ? "var(--color-brand-light)" : "transparent",
                border: `1px solid ${pathname === link.href ? "var(--color-border-brand)" : "transparent"}`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <WalletButton variant="ghost" />
      </div>

      <nav className="lg:hidden mt-2 px-2">
        <div className="glass rounded-xl border px-2 py-2 flex items-center gap-1 overflow-x-auto" style={{ borderColor: "var(--color-border)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                whiteSpace: "nowrap",
                padding: "7px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--text-xs)",
                textDecoration: "none",
                color: pathname === link.href ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                background: pathname === link.href ? "var(--color-brand-light)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
