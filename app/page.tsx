import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { FeatureGrid, StatsBar } from "@/components/portfolio/FeatureGrid";

export default function HomePage() {
  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <AnimatedBackground />
      <Navbar />

      <div style={{ position: "relative", zIndex: 10 }}>
        <HeroSection />
        <StatsBar />
        <FeatureGrid />

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            background: "var(--bg-secondary)",
            padding: "40px 24px",
            marginTop: "80px",
          }}
        >
          <div
            className="max-w-7xl mx-auto px-6"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="/solfoliologo.png" alt="Solfolio Logo" style={{ width: "120px", height: "auto" }} />
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--color-brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L13 5.5V10.5L8 14L3 10.5V5.5L8 2Z" fill="hsl(230, 40%, 6%)" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-primary)",
                }}
              >
                Sol<span style={{ color: "var(--color-brand)" }}>folio</span>
              </span>
            </div>

            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>
              Built on Solana · Powered by AI
            </p>

            <div style={{ display: "flex", gap: "24px" }}>
              <a href="https://github.com" style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", textDecoration: "none", transition: "color 0.2s ease" }}>GitHub</a>
              <a href="https://twitter.com" style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", textDecoration: "none", transition: "color 0.2s ease" }}>Twitter</a>
              <a href="https://discord.com" style={{ color: "var(--text-muted)", fontSize: "var(--text-xs)", textDecoration: "none", transition: "color 0.2s ease" }}>Discord</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}