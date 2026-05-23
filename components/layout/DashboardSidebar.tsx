"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ai", label: "AI" },
  { href: "/wallet", label: "Wallet" },
  { href: "/settings", label: "Settings" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="dashboard-sidebar glass">
      <div className="sidebar-brand">
        <Image src="/solfoliologo.png" alt="Solfolio" width={152} height={42} priority />
        <p className="sidebar-subtitle">AI Solana Intelligence</p>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="sidebar-link" data-active={pathname === link.href}>{link.label}</Link>
        ))}
      </nav>
    </aside>
  );
}
