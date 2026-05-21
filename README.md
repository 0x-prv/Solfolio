# Solfolio 🌐

AI-powered Web3 identity and on-chain portfolio platform for Solana, now upgraded with an **agentic engineering layer** for autonomous portfolio analysis and on-chain execution planning.

## What’s new for the Agentic Engineering Grant

- **Agent Ops Panel**: autonomous wallet analysis with risk/health scoring
- **Action Queue**: AI-generated prioritized actions for improving portfolio posture
- **On-chain Task Queue**: executable-style operational tasks (simulation, guardrails, reminders)
- **Connection-safe RPC flow**: all wallet reads now respect the active wallet adapter connection
- **Typed dashboard data model**: improved reliability and production maintainability

## Core Features

- Wallet Connection (Phantom, Backpack, Solflare)
- SOL + SPL token holdings and allocation visualization
- NFT gallery
- Transaction activity feed with Solscan links
- Grind Score (on-chain reputation signal)
- **Agentic insights + autonomous action planning**

## Agentic Architecture

### 1) Data Collection Layer
- Pulls balances, token accounts, and latest transactions from Solana RPC.

### 2) Agent Reasoning Layer
- `lib/agentEngine.ts` transforms holdings into normalized asset allocations.
- Computes:
  - concentration risk
  - volatility-adjusted risk score
  - portfolio health score
- Emits recommended autonomous actions and an on-chain task queue.

### 3) Operator UI Layer
- `AgentOpsPanel` surfaces model outputs with production-friendly structure:
  - risk alerts
  - prioritized action cards
  - chain task queue

## Quick Start

```bash
npm install --legacy-peer-deps
npm run dev
```

Open http://localhost:3000

## Environment

- `NEXT_PUBLIC_RPC_URL` (recommended)
- `NEXT_PUBLIC_HELIUS_API_KEY` (optional)
- `NEXT_PUBLIC_BIRDEYE_API_KEY` (optional)

## Production Readiness Notes

- Wallet RPC calls use the active wallet connection context for consistency.
- Strictly typed dashboard state for safer refactors and fewer runtime errors.
- Agent layer is deterministic and auditable (clear rules, explicit outputs).

## Grant Submission Reference

See `docs/AGENTIC_ENGINEERING_GRANT.md` for grant-focused implementation notes.
