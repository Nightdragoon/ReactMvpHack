"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package } from "lucide-react";
import ReactECharts from "echarts-for-react";

interface SalesChartProps {
  hasData: boolean;
  chartOption: any;
}

export function SalesChart({ hasData, chartOption }: SalesChartProps) {
  return (
    <Card className="md:col-span-4 xl:col-span-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Flujo de Transacciones
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0 pb-4">
        {hasData ? (
          <ReactECharts
            option={chartOption}
            style={{ height: "300px", width: "100%" }}
            opts={{ renderer: "svg" }}
            className="echarts-transparent"
          />
        ) : (
          <div className="flex h-[300px] flex-col items-center justify-center text-muted-foreground">
            <Package className="w-8 h-8 mb-2 opacity-30" />
            No hay datos para mostrar
          </div>
        )}
      </CardContent>
    </Card>
  );
}
