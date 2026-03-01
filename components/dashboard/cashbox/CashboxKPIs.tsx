"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CashboxKPIsProps {
  stats: {
    total: number;
    revenue: number;
    uniqueEmp: number;
  };
}

export function CashboxKPIs({ stats }: CashboxKPIsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md shadow-sm xl:shadow-lg transition-all hover:bg-white/80 dark:hover:bg-neutral-900/80 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign className="w-24 h-24 text-emerald-500" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Ingresos Estimados
            </CardTitle>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 flex items-baseline gap-1">
              ${stats.revenue.toLocaleString()}{" "}
              <span className="text-sm font-normal text-muted-foreground mr-1">
                MXN
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md shadow-sm xl:shadow-lg transition-all hover:bg-white/80 dark:hover:bg-neutral-900/80 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShoppingCart className="w-24 h-24 text-emerald-500" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Total Ventas
            </CardTitle>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
              <ShoppingCart className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 flex items-baseline gap-1">
              {stats.total}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                tickets
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md shadow-sm xl:shadow-lg transition-all hover:bg-white/80 dark:hover:bg-neutral-900/80 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users className="w-24 h-24 text-teal-500" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Empleados Activos
            </CardTitle>
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
              <Users className="h-4 w-4 text-teal-600 dark:text-teal-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 flex items-baseline gap-1">
              {stats.uniqueEmp}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                agentes
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-emerald-500 dark:bg-emerald-600 text-white shadow-sm xl:shadow-lg transition-all hover:bg-emerald-600 dark:hover:bg-emerald-500 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 transform">
            <TrendingUp className="w-24 h-24 text-white" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-emerald-100">
              Crecimiento Diario
            </CardTitle>
            <div className="p-2 bg-white/20 rounded-xl">
              <Activity className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold flex items-baseline gap-1">
              +14%{" "}
              <span className="text-sm font-normal text-emerald-100">
                vs ayer
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-1">
              Basado en promedio móvil
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
