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