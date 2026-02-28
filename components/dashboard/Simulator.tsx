"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Copy, TrendingUp } from "lucide-react";
import { SimulatorProps } from "@/types";

export function Simulator({ data }: SimulatorProps) {
  const [expenseGrowth, setExpenseGrowth] = useState<number[]>([10]);
  const [salesGrowth, setSalesGrowth] = useState<number[]>([-5]);
  const [newHires, setNewHires] = useState<number[]>([30]); // montos en k

  const initialCash = data.cashAvailable;
  const initialBurn = data.monthlyBurnRate;

  const isDataEmpty = initialCash === 0 && initialBurn === 0;

  // Extremely basic simulation math just for visual demonstration
  const simulatedBurn =
    initialBurn === 0
      ? 0
      : initialBurn * (1 + expenseGrowth[0] / 100) -
        initialBurn * (salesGrowth[0] / 100) +
        newHires[0] * 1000;

  const simulatedRunway = isDataEmpty ? 0 : initialCash / (simulatedBurn || 1);

  // Base risk 50, modify based on runway. < 3 months is critical (>80)
  let simulatedRisk = 50;
  if (isDataEmpty) {
    simulatedRisk = 0;
  } else if (simulatedRunway < 3) {
    simulatedRisk = 85 + (3 - simulatedRunway) * 5;
  } else if (simulatedRunway < 6) {
    simulatedRisk = 65 + (6 - simulatedRunway) * 5;
  } else {
    simulatedRisk = 30;
  }

  // Clamp risk
  simulatedRisk = Math.min(100, Math.max(0, simulatedRisk));

  return (
    <Card className="shadow-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm transition-colors h-full flex flex-col relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Copy className="w-32 h-32 text-emerald-500" />
      </div>

      <CardHeader className="pb-4 border-b border-neutral-200/50 dark:border-neutral-800/50">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold uppercase tracking-tight text-neutral-900 dark:text-neutral-50 transition-colors">
            Simulador What If
            <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-xs text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 align-middle">
              C
            </span>
          </CardTitle>
        </div>
        <CardDescription className="text-neutral-600 dark:text-neutral-400 transition-colors">
          Ajusta variables para ver impacto en tiempo real.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-6 pt-6">
        <div className="flex flex-col gap-6 w-full md:pr-4">
          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>+% Gasto ({expenseGrowth[0]}%)</span>
            </div>
            <Slider
              value={expenseGrowth}
              onValueChange={setExpenseGrowth}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>-% Ventas ({salesGrowth[0]}%)</span>
            </div>
            <Slider
              value={salesGrowth}
              onValueChange={setSalesGrowth}
              max={0}
              min={-50}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Nueva Contratación ({newHires[0]}k MXN)</span>
            </div>
            <Slider
              value={newHires}
              onValueChange={setNewHires}
              max={200}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
          <div className="bg-neutral-100/50 dark:bg-neutral-800/50 rounded-xl p-4 relative overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-inner">
            <div className="absolute right-[-10px] top-[-10px] opacity-10">
              <TrendingUp className="w-24 h-24 text-emerald-500" />
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4 transition-colors">
              Recalculado en Tiempo Real
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-end border-b border-neutral-200 dark:border-neutral-800 pb-2 transition-colors">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Burn Rate
                </span>
                <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
                  {isDataEmpty ? "-" : `${(simulatedBurn / 1000).toFixed(0)}k`}{" "}
                  MXN
                </span>
              </div>
              <div className="flex justify-between items-end border-b border-neutral-200 dark:border-neutral-800 pb-2 transition-colors">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Runway Projectado
                </span>
                <span
                  className={`text-lg font-bold ${isDataEmpty ? "text-neutral-900 dark:text-neutral-50" : simulatedRunway < 4 ? "text-red-500" : "text-neutral-900 dark:text-neutral-50"}`}
                >
                  {isDataEmpty ? "-" : simulatedRunway.toFixed(1)} meses
                </span>
              </div>
              <div className="flex justify-between items-end mt-2 pt-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Risk Score
                </span>
                <span
                  className={`text-xl font-black ${isDataEmpty ? "text-neutral-900 dark:text-neutral-50" : simulatedRisk > 80 ? "text-red-500" : simulatedRisk > 60 ? "text-orange-500" : "text-emerald-500"}`}
                >
                  {isDataEmpty ? "-" : simulatedRisk.toFixed(0)}{" "}
                  <span className="text-sm font-normal uppercase">
                    {isDataEmpty
                      ? "Sin Datos"
                      : simulatedRisk > 80
                        ? "Crítico"
                        : simulatedRisk > 60
                          ? "Alto"
                          : "Moderado"}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
