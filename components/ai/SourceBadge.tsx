interface SourceBadgeProps {
  source: string;
  timestamp: string;
}

export function SourceBadge({ source, timestamp }: SourceBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
      <span className="px-2 py-1 rounded-full" style={{ background: "rgba(148,163,184,0.12)" }}>{source}</span>
      <span>{new Date(timestamp).toLocaleString()}</span>
    </div>
  );
}
