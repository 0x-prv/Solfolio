import { TrendItem } from "@/lib/ai/types";
import { SourceBadge } from "@/components/ai/SourceBadge";

export function TrendCard({ trend }: { trend: TrendItem }) {
  return (
    <article className="card p-5">
      <p className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--color-text-secondary)" }}>{trend.category}</p>
      <h3 className="mt-2 text-base font-semibold" style={{ fontFamily: "var(--font-syne)" }}>{trend.title}</h3>
      <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{trend.summary}</p>
      <div className="mt-3 p-3 rounded-lg" style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.28)" }}>
        <p className="text-xs uppercase tracking-[0.15em]" style={{ color: "#c4b5fd" }}>Why this matters</p>
        <p className="text-sm mt-1" style={{ color: "var(--color-text-primary)" }}>{trend.whyItMatters}</p>
      </div>
      <div className="mt-4">
        <SourceBadge source={trend.source} timestamp={trend.timestamp} />
      </div>
    </article>
  );
}
