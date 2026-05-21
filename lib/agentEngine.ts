export interface PortfolioAsset {
  symbol: string;
  usdValue: number;
  allocationPct: number;
  volatilityBand: "low" | "medium" | "high";
}

export interface AgentAction {
  title: string;
  reason: string;
  priority: "high" | "medium" | "low";
  impact: string;
}

export interface AgentReport {
  riskScore: number;
  healthScore: number;
  concentrationWarnings: string[];
  actions: AgentAction[];
  onChainTasks: string[];
}

export function generateAgentReport(assets: PortfolioAsset[], txCount: number): AgentReport {
  const concentrationWarnings = assets
    .filter((asset) => asset.allocationPct >= 45)
    .map((asset) => `${asset.symbol} is ${asset.allocationPct.toFixed(1)}% of portfolio.`);

  const volatilityPenalty = assets.reduce((sum, asset) => {
    if (asset.volatilityBand === "high") return sum + asset.allocationPct * 0.5;
    if (asset.volatilityBand === "medium") return sum + asset.allocationPct * 0.2;
    return sum;
  }, 0);

  const activityScore = Math.min(100, txCount * 4);
  const concentrationPenalty = concentrationWarnings.length * 12;
  const riskScore = Math.min(100, Math.round(volatilityPenalty + concentrationPenalty));
  const healthScore = Math.max(0, Math.min(100, Math.round(70 + activityScore * 0.25 - riskScore * 0.5)));

  const actions: AgentAction[] = [
    {
      title: "Rebalance top-heavy positions",
      reason: concentrationWarnings.length ? "Detected concentration risk in one or more assets." : "Keep allocations in healthy bands proactively.",
      priority: concentrationWarnings.length ? "high" : "medium",
      impact: "Lower drawdown risk during volatility spikes.",
    },
    {
      title: "Schedule periodic DCA into stable assets",
      reason: "Smooths entry and reduces timing risk.",
      priority: "medium",
      impact: "Improves consistency of average portfolio quality.",
    },
    {
      title: "Enable wallet safety policy",
      reason: "Guard against suspicious approval and drain patterns.",
      priority: "high",
      impact: "Reduces exploit exposure.",
    },
  ];

  const onChainTasks = [
    "Simulate rebalance transaction bundle before submit.",
    "Set per-transaction SOL spend guardrail.",
    "Create monthly health-check transaction reminder memo.",
  ];

  return { riskScore, healthScore, concentrationWarnings, actions, onChainTasks };
}
