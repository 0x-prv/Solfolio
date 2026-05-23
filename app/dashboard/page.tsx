import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardContent } from "@/components/portfolio/DashboardContent";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <AnimatedBackground />
      <Navbar />
      <section className="relative z-10 pt-36 pb-12">
        <DashboardContent />
      </section>
    </main>
  );
}
