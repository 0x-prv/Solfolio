"use client";

import { AgentReport } from "@/lib/agentEngine";

interface AgentOpsPanelProps {
  report: AgentReport;
  loading: boolean;
}

export function AgentOpsPanel({ report, loading }: AgentOpsPanelProps) {
  return (
    <div className="card" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "var(--text-sm)" }}>Agent Ops</span>
        <span style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>Autonomous strategy engine</span>
      </div>

      <div style={{ padding: 20, display: "grid", gap: 14 }}>
        {loading ? (
          <div className="skeleton" style={{ height: 180 }} />
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div className="tag-muted">Risk Score: <strong>{report.riskScore}</strong></div>
              <div className="tag-muted">Health Score: <strong>{report.healthScore}</strong></div>
            </div>

            {report.concentrationWarnings.length > 0 && (
              <div>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: 6 }}>Detected Risks</p>
                {report.concentrationWarnings.map((warning) => (
                  <p key={warning} style={{ fontSize: "var(--text-xs)", color: "var(--color-danger)", marginBottom: 4 }}>• {warning}</p>
                ))}
              </div>
            )}

            <div>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: 6 }}>Agent Actions</p>
              {report.actions.map((action) => (
                <div key={action.title} style={{ padding: 10, border: "1px solid var(--color-border)", borderRadius: 10, marginBottom: 8 }}>
                  <p style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>{action.title}</p>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>{action.reason}</p>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: 6 }}>On-chain Task Queue</p>
              {report.onChainTasks.map((task) => (
                <p key={task} style={{ fontSize: "var(--text-xs)", marginBottom: 4 }}>• {task}</p>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
