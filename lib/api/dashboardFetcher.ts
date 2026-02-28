import { DashboardMetrics } from "@/types";

export const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
    // Retornamos 0 en todas las métricas para que el dashboard
    // inicie vacío y esté preparado para recibir datos reales del backend
    return {
        cashAvailable: 0,
        monthlyBurnRate: 0,
        grossMargin: 0,
        expenseGrowth: 0,
        incomeGrowth: 0,
    };
};
