import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, Activity } from "lucide-react";
import { SmartAlertsProps } from "@/types";

export function SmartAlerts({ data }: SmartAlertsProps) {
  const runway = data.cashAvailable / (data.monthlyBurnRate || 1);
  const isDataEmpty = data.cashAvailable === 0 && data.monthlyBurnRate === 0;

  return (
    <Card className="shadow-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm transition-colors">
      <CardHeader className="pb-3 border-b border-neutral-200/50 dark:border-neutral-800/50">
        <CardTitle className="flex items-center gap-2 text-lg font-bold tracking-tight uppercase text-neutral-900 dark:text-neutral-50">
          3 Alertas Inteligentes
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-[10px] text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
            A
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 px-2">
        <ul className="space-y-4">
          <li className="flex gap-3 items-start border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="rounded-full bg-red-100 dark:bg-red-900/50 p-1.5 mt-0.5 shrink-0">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold leading-none flex gap-2 text-neutral-900 dark:text-neutral-50">
                1. Cash Flow Pressure Alert
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-tight">
                {isDataEmpty ? (
                  "Esperando datos de la API para evaluar presión de caja."
                ) : (
                  <>
                    Burn rate creciente. Presión de caja en{" "}
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {runway.toFixed(1)} meses
                    </span>
                    .
                  </>
                )}
              </p>
            </div>
          </li>

          <li className="flex gap-3 items-start rounded-xl p-3 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50 transition-colors">
            <div className="rounded-full bg-orange-100 dark:bg-orange-900/50 p-1.5 mt-0.5 shrink-0">
              <TrendingDown className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold leading-none text-neutral-900 dark:text-neutral-50">
                {isDataEmpty
                  ? "2. Análisis de Margen"
                  : "2. Margin Deterioration Alert"}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-tight">
                {isDataEmpty ? (
                  "Requiere datos históricos de ventas y costos."
                ) : (
                  <>
                    Margen Bruto actual:{" "}
                    <span className="font-medium text-orange-600 dark:text-orange-400">
                      {data.grossMargin}%
                    </span>
                  </>
                )}
              </p>
            </div>
          </li>

          <li className="flex gap-3 items-start rounded-xl p-3 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50 transition-colors">
            <div className="rounded-full bg-amber-100 dark:bg-amber-900/50 p-1.5 mt-0.5 shrink-0">
              <Activity className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold leading-none text-neutral-900 dark:text-neutral-50">
                {isDataEmpty
                  ? "3. Crecimiento vs Gastos"
                  : "3. Growth Imbalance Alert"}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-tight">
                {isDataEmpty ? (
                  "Registra ingresos y egresos recientes para evaluación."
                ) : data.expenseGrowth > data.incomeGrowth ? (
                  <>
                    Gastos crecen{" "}
                    <span className="font-medium text-amber-600 dark:text-amber-400">
                      {data.expenseGrowth - data.incomeGrowth}%
                    </span>{" "}
                    más rápido que ingresos.
                  </>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Crecimiento balanceado.
                  </span>
                )}
              </p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
