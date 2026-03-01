"use client";

import { useEffect, useState, useMemo } from "react";
import {
  fetchGetAllCaja,
  fetchGetAllProductos,
  fetchGetAllEmpleados,
} from "@/lib/api/fetcher";
import { CashboxKPIs } from "@/components/dashboard/cashbox/CashboxKPIs";
import { SalesChart } from "@/components/dashboard/cashbox/SalesChart";
import { RecentTransactions } from "@/components/dashboard/cashbox/RecentTransactions";

export default function CashboxPage() {
  const [ventas, setVentas] = useState<any[]>([]);
  const [productos, setProductos] = useState<any[]>([]);
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [resCaja, resProd, resEmp] = await Promise.all([
          fetchGetAllCaja().catch(() => ({ data: [] })),
          fetchGetAllProductos().catch(() => ({ data: [] })),
          fetchGetAllEmpleados().catch(() => ({ data: [] })),
        ]);

        // Handle variations in response format safely
        const cajaData = resCaja?.data || resCaja || [];
        const prodData = resProd?.data || resProd || [];
        const empData = resEmp?.data || resEmp || [];

        console.log("Datos de Caja:", cajaData);
        console.log("Datos de Productos:", prodData);
        console.log("Datos de Empleados:", empData);

        setVentas(Array.isArray(cajaData) ? cajaData : []);
        setProductos(Array.isArray(prodData) ? prodData : []);
        setEmpleados(Array.isArray(empData) ? empData : []);
      } catch (error) {
        console.error("Error loading cashbox data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Compute enriched data
  const { stats, chartOption, recentTx } = useMemo(() => {
    if (!ventas.length) {
      return {
        stats: { total: 0, revenue: 0, uniqueEmp: 0 },
        chartOption: {},
        recentTx: [],
      };
    }

    const prodMap = new Map();
    productos.forEach((p) => prodMap.set(p.id, p));

    const empMap = new Map();
    empleados.forEach((e) => empMap.set(e.id, e));

    let revenue = 0;
    const empSet = new Set();
    const salesByDate: Record<string, number> = {};

    const enrichedVentas = ventas
      .map((v) => {
        const prod = prodMap.get(v.idf_producto);
        const precio = prod?.precio || 0;
        revenue += precio;
        empSet.add(v.idf_empleado);

        const fecha = v.dia || "Desconocido";
        salesByDate[fecha] = (salesByDate[fecha] || 0) + 1;

        return {
          ...v,
          productoInfo: prod,
          empleadoInfo: empMap.get(v.idf_empleado),
        };
      })
      .sort((a, b) => b.id - a.id); // Descending id for recent tx

    const dates = Object.keys(salesByDate).sort();
    const counts = dates.map((d) => salesByDate[d]);

    const chartOpt = {
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        textStyle: { color: "#fff" },
        borderWidth: 0,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: dates,
        axisLine: { lineStyle: { color: "#888" } },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: "#333", type: "dashed" } },
        axisLine: { lineStyle: { color: "#888" } },
      },
      series: [
        {
          name: "Ventas",
          type: "line",
          smooth: true,
          data: counts,
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(16, 185, 129, 0.5)", // Emerald 500
                },
                {
                  offset: 1,
                  color: "rgba(16, 185, 129, 0.0)",
                },
              ],
            },
          },
          itemStyle: {
            color: "#10b981", // Emerald 500
          },
          lineStyle: {
            width: 3,
            shadowColor: "rgba(16,185,129, 0.3)",
            shadowBlur: 10,
          },
        },
      ],
    };

    return {
      stats: {
        total: ventas.length,
        revenue,
        uniqueEmp: empleados.length,
      },
      chartOption: chartOpt,
      recentTx: enrichedVentas.slice(0, 10), // top 10 recent
    };
  }, [ventas, productos, empleados]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-2 h-full min-h-[500px] z-10 transition-colors">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Cargando caja...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent">
            Control de Ventas
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitorea el flujo de ventas, ingresos y rendimiento en tiempo real.
          </p>
        </div>
      </div>

      <CashboxKPIs stats={stats} />

      <div className="grid gap-6 md:grid-cols-7 xl:grid-cols-10">
        <SalesChart hasData={ventas.length > 0} chartOption={chartOption} />
        <RecentTransactions transactions={recentTx} />
      </div>
    </div>
  );
}
