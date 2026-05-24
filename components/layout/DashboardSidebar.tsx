"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/", label: "Portfolio" },
  { href: "/wallet", label: "Wallet" },
  { href: "/ai", label: "AI Agent" },
  { href: "/settings", label: "Settings" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar glass">
      <div className="sidebar-brand">
        <Image src="/solfoliologo.png" alt="Solfolio" width={152} height={42} priority />
        <p className="sidebar-subtitle">AI Agent Portfolio Command</p>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="sidebar-link" data-active={pathname === link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-foot card">
        <p>Operator posture</p>
        <strong>Stable</strong>
        <span>All portfolio systems nominal</span>
      </div>
    </aside>
  );
}
