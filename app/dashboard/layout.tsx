import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors relative overflow-hidden">
      {/* Decorative Glow similar to landing page */}
      <div className="absolute left-1/2 top-0 -z-10 h-200 w-200 -translate-x-1/2 -translate-y-1/2 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-neutral-200 via-neutral-50 to-neutral-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-950 transition-colors pointer-events-none"></div>

      <Sidebar />
      <div className="flex flex-col relative z-10 w-full overflow-hidden">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
