import { DashboardMetrics } from "@/types";
import { fetchGetRunway } from "./fetcher";

export const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
    try {
        // Llamamos al fetch principal
        const response = await fetchGetRunway();

        // Retornamos mapeando las propiedades (con fallback a lo que teníamos
        // por si el backend no devuelve exactamente las mismas llaves)
        return {
            cashAvailable: response?.cashAvailable ?? response?.caja ?? 12000,
            monthlyBurnRate: response?.monthlyBurnRate ?? response?.burnrate ?? response?.burn_rate ?? 28000,
            grossMargin: response?.grossMargin ?? response?.margen ?? response?.gross_margin ?? 12.4,
            expenseGrowth: response?.expenseGrowth ?? response?.crecimiento_gastos ?? 18.7,
            incomeGrowth: response?.incomeGrowth ?? response?.crecimiento_ingresos ?? -4.5,
        };
    } catch (error) {
        console.error("Error al obtener las métricas del dashboard:", error);

        // Retornamos los valores por defecto si el backend falla
        return {
            cashAvailable: 12000,       // Muy poco efectivo
            monthlyBurnRate: 28000,     // Gasto mensual muy alto
            grossMargin: 12.4,          // Margen extremadamente bajo
            expenseGrowth: 18.7,        // Gastos creciendo rápido
            incomeGrowth: -4.5,         // Ingresos cayendo
        };
    }
};
