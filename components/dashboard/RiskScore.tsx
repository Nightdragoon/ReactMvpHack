import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  TrendingUp,
  Percent,
  BarChartHorizontal,
} from "lucide-react";
import { RiskGauge } from "./RiskGauge";
import { useRiskScore } from "@/hooks/useRiskScore";
import { RiskScoreProps } from "@/types";
import { useMemo } from "react";

export function RiskScore({ data }: RiskScoreProps) {
  const isDataEmpty = data.cashAvailable === 0 && data.monthlyBurnRate === 0;

  const score = useRiskScore({
    runway: isDataEmpty ? 0 : data.cashAvailable / (data.monthlyBurnRate || 1),
    cashTrend: isDataEmpty ? 0 : -data.expenseGrowth, // Assuming cashTrend should also be 0 if data is empty
    margin: isDataEmpty ? 0 : data.grossMargin,
    growthBalance: isDataEmpty ? 0 : data.incomeGrowth - data.expenseGrowth,
  });

  const riskZoneText = useMemo(() => {
    if (isDataEmpty) return "Esperando Datos";
    if (score <= 30) return "Riesgo Bajo";
    if (score <= 60) return "Riesgo Medio";
    if (score <= 80) return "Riesgo Alto";
    return "Riesgo Crítico";
  }, [score, isDataEmpty]);

  return (
    <Card className="shadow-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm transition-colors h-full flex flex-col">
      <CardHeader className="pb-0 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight uppercase text-neutral-900 dark:text-neutral-50">
          Startup Risk Score
        </CardTitle>
        <span className="text-lg font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
          Datos simulados, pendientes de implementar
        </span>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col items-center justify-center pt-6 pb-2 gap-6 w-full">
        {/* Gauge UI integrated from Apache ECharts */}
        <RiskGauge score={isDataEmpty ? 0 : score} />

        <div className="text-center space-y-1">
          <div className="text-xl font-bold uppercase tracking-tight text-neutral-900 dark:text-neutral-100">
            {riskZoneText}
          </div>
          <div className="mx-auto h-0.5 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
        </div>

        {/* Metric Cards (Bottom Grid) */}
        <div className="grid grid-cols-4 gap-2 w-full mt-4 border-t border-neutral-200 dark:border-neutral-800 pt-6 transition-colors">
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 text-center gap-1">
            <PieChart className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
              Runway
            </span>
            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              {isDataEmpty
                ? "-"
                : data.cashAvailable / (data.monthlyBurnRate || 1) < 2
                  ? "Crítico"
                  : "Sano"}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 text-center gap-1">
            <TrendingUp className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
              Tendencia
              <br />
              de flujo
            </span>
            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              {isDataEmpty ? "-" : `${-data.expenseGrowth}%`}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 text-center gap-1">
            <Percent className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
              Margen
            </span>
            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              {isDataEmpty ? "-" : `${Number(data.grossMargin).toFixed(2)}%`}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 text-center gap-1">
            <BarChartHorizontal className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
              Balance
              <br />
              Crecimiento
            </span>
            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              {isDataEmpty ? "-" : `${Number(data.incomeGrowth - data.expenseGrowth).toFixed(2)}%`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
