"use client";

import { RunwayCard } from "@/components/dashboard/RunwayCard";
import { SmartAlerts } from "@/components/dashboard/SmartAlerts";
import { RiskScore } from "@/components/dashboard/RiskScore";
import { Simulator } from "@/components/dashboard/Simulator";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function DashboardPage() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-2 h-full min-h-[500px] z-10 transition-colors">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Cargando el dashboard inteligente...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center p-2 h-full min-h-[500px] z-10 transition-colors">
        <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 p-6 text-center backdrop-blur-sm">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            Error al conectar con los modelos de riesgo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-2 h-full z-10 transition-colors">
      <div className="md:col-span-4 xl:col-span-3 flex flex-col gap-6">
        <RunwayCard
          monthlyBurnRate={data.monthlyBurnRate}
          cashAvailable={data.cashAvailable}
        />
        <SmartAlerts data={data} />
      </div>
      <div className="md:col-span-8 xl:col-span-6 h-full min-h-[500px]">
        <RiskScore data={data} />
      </div>
      <div className="md:col-span-12 xl:col-span-3 h-full min-h-[500px]">
        <Simulator data={data} />
      </div>
    </div>
  );
}
