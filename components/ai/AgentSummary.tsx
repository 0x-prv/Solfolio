interface AgentSummaryProps {
  summary: string;
  generatedAt: string;
  sourceMode: "demo" | "live";
}

export function AgentSummary({ summary, generatedAt, sourceMode }: AgentSummaryProps) {
  return (
    <section className="card p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>Today on Solana</h2>
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: sourceMode === "demo" ? "rgba(245,158,11,0.16)" : "rgba(34,197,94,0.16)", color: sourceMode === "demo" ? "#fbbf24" : "#86efac" }}>
          {sourceMode === "demo" ? "Demo / Sample Data" : "Live Data"}
        </span>
      </div>
      <p className="mt-3 text-sm sm:text-base" style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{summary}</p>
      <p className="mt-3 text-xs" style={{ color: "var(--color-text-muted)" }}>Generated: {new Date(generatedAt).toLocaleString()}</p>
    </section>
  );
}
