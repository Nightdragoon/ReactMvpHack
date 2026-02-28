import { useMemo } from "react";
import { RiskScoreInputs } from "@/types";

export function useRiskScore({
    runway,
    margin,
    growthBalance,
}: RiskScoreInputs) {
    return useMemo(() => {
        // 1. Runway Risk (Weight: 40%)
        // Si el runway es de 2 meses o menos, el riesgo es 100 (Crítico).
        // Si el runway es de 12 meses o más, el riesgo es 0 (Bajo).
        // Para valores intermedios (ej: 6 meses), el riesgo es proporcional (ej. 60).
        const runwayRisk = Math.max(0, Math.min(100, 100 - ((runway - 2) / 10) * 100));

        // 2. Margin Risk (Weight: 30%)
        // Si el margen es del 0% o negativo, el riesgo es 100 (Crítico).
        // Si el margen es mayor al 50% (0.5), el riesgo es 0 (Bajo).
        // Para valores intermedios, calculamos de manera proporcional.
        const marginRisk = Math.max(0, Math.min(100, 100 - (margin / 0.5) * 100));

        // 3. Growth Balance Risk (Weight: 30%)
        // (Ingresos vs Gastos)
        // growthBalance negativo significa que los gastos crecieron más que los ingresos
        // Si la diferencia es -50% (-0.5), el riesgo es 100.
        // Si la diferencia es +50% (+0.5), el riesgo es 0.
        const growthRisk = Math.max(0, Math.min(100, 50 - (growthBalance * 100)));

        // Calculamos el score final ponderado sumando los riesgos
        const score = (runwayRisk * 0.4) + (marginRisk * 0.3) + (growthRisk * 0.3);

        // Retorna el score final como número entero redondeado (de 0 a 100)
        return Math.round(score);
    }, [runway, margin, growthBalance]);
}
