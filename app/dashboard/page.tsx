import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardContent } from "@/components/portfolio/DashboardContent";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <AnimatedBackground />
      <div className="relative z-10 dashboard-layout">
        <DashboardSidebar />
        <section className="dashboard-main">
          <DashboardContent />
        </section>
      </div>
    </main>
  );
}
