export interface DashboardMetrics {
    cashAvailable: number;
    monthlyBurnRate: number;
    grossMargin: number;
    expenseGrowth: number;
    incomeGrowth: number;
}

export interface RiskScoreInputs {
    runway: number;
    cashTrend: number;
    margin: number;
    growthBalance: number;
}

export interface RiskGaugeProps {
    score: number; // 0 - 100
}

export interface RiskScoreProps {
    data: DashboardMetrics;
}

export interface RunwayCardProps {
    cashAvailable: number;
    monthlyBurnRate: number;
}

export interface SmartAlertsProps {
    data: DashboardMetrics;
}

export interface SimulatorProps {
    data: DashboardMetrics;
}

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    activo: number;
}

export interface InventoryItem {
    id: string;
    producto_id: number;
    sku: string;
    stock: number;
    status: "In Stock" | "Low Stock" | "Out of Stock";
    lastReorder: string;
    productName?: string;
}