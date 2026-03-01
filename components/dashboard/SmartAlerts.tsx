import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  TrendingDown,
  Activity,
  CheckCircle,
  Info,
} from "lucide-react";
import { SmartAlertsProps } from "@/types";

export function SmartAlerts({ data }: SmartAlertsProps) {
  const runway = data.cashAvailable / (data.monthlyBurnRate || 1);
  const isDataEmpty = data.cashAvailable === 0 && data.monthlyBurnRate === 0;

  // Lógica de diagnóstico para Runway (Tiempo de vida de la empresa)
  const getRunwayAlert = () => {
    if (isDataEmpty) {
      return {
        color:
          "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
        title: "1. Supervivencia (Runway)",
        icon: <Info className="h-4 w-4" />,
        text: "Esperando datos para calcular tu tiempo de supervivencia.",
      };
    }
    if (runway <= 3) {
      return {
        border: "border-red-200 dark:border-red-900/50",
        bgClasses: "bg-red-50/50 dark:bg-red-900/10",
        color: "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400",
        title: "1. Peligro Crítico de Efectivo",
        icon: <AlertTriangle className="h-4 w-4" />,
        text: `Solo tienes fondos para ${runway.toFixed(1)} meses. Considera recortar gastos no esenciales urgentemente.`,
      };
    }
    if (runway <= 6) {
      return {
        border: "border-orange-200 dark:border-orange-900/50",
        bgClasses: "bg-orange-50/50 dark:bg-orange-900/10",
        color:
          "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400",
        title: "1. Flujo de Caja Ajustado",
        icon: <TrendingDown className="h-4 w-4" />,
        text: `Tienes fondos para ${runway.toFixed(1)} meses. Vigila el ritmo al que gastas tu capital.`,
      };
    }
    return {
      bgClasses: "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50",
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
      title: "1. Supervivencia Saludable",
      icon: <CheckCircle className="h-4 w-4" />,
      text: `Excelente. Tienes un buen colchón financiero (${runway.toFixed(1)} meses de operaciones).`,
    };
  };

  // Lógica de diagnóstico para Margen Bruto
  const getMarginAlert = () => {
    if (isDataEmpty) {
      return {
        color:
          "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
        title: "2. Salud del Margen",
        icon: <Info className="h-4 w-4" />,
        text: "Carga tus ventas y costos para analizar la rentabilidad.",
      };
    }
    if (data.grossMargin < 20) {
      return {
        border: "border-red-200 dark:border-red-900/50",
        bgClasses: "bg-red-50/50 dark:bg-red-900/10",
        color: "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400",
        title: "2. Margen de Ganancia Débil",
        icon: <AlertTriangle className="h-4 w-4" />,
        text: `Tu rentabilidad es muy baja (${data.grossMargin}%). Debes subir precios o bajar el costo de tus productos.`,
      };
    }
    if (data.grossMargin <= 40) {
      return {
        bgClasses: "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50",
        color:
          "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
        title: "2. Ganancia Estable",
        icon: <Activity className="h-4 w-4" />,
        text: `Tienes un margen del ${data.grossMargin}%. Es aceptable, pero hay margen de mejora en tus costos.`,
      };
    }
    return {
      bgClasses: "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50",
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
      title: "2. Rentabilidad Óptima",
      icon: <CheckCircle className="h-4 w-4" />,
      text: `¡Tu modelo es muy rentable! Un margen del ${data.grossMargin}% es indicativo de un buen negocio.`,
    };
  };

  // Lógica comparativa Crecimiento vs Gastos
  const getGrowthAlert = () => {
    if (isDataEmpty) {
      return {
        color:
          "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
        title: "3. Ritmo de Crecimiento",
        icon: <Info className="h-4 w-4" />,
        text: "Necesitamos tu histórico para comparar cómo creces vs cómo gastas.",
      };
    }
    const diff = data.expenseGrowth - data.incomeGrowth;
    if (diff > 0) {
      return {
        border: "border-orange-200 dark:border-orange-900/50",
        bgClasses: "bg-orange-50/50 dark:bg-orange-900/10",
        color:
          "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400",
        title: "3. Gastos Acelerados",
        icon: <TrendingDown className="h-4 w-4" />,
        text: `Tus gastos aumentan un ${diff.toFixed(1)}% más rápido que tus ingresos. Cuidado con descapitalizarte.`,
      };
    }
    return {
      bgClasses: "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50",
      color:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
      title: "3. Crecimiento Sostenible",
      icon: <CheckCircle className="h-4 w-4" />,
      text: `Muy bien. Tus ingresos están creciendo a mejor ritmo que tus gastos mensuales.`,
    };
  };

  const alert1 = getRunwayAlert();
  const alert2 = getMarginAlert();
  const alert3 = getGrowthAlert();

  return (
    <Card className="shadow-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm transition-colors">
      <CardHeader className="pb-3 border-b border-neutral-200/50 dark:border-neutral-800/50">
        <CardTitle className="flex items-center gap-2 text-lg font-bold tracking-tight uppercase text-neutral-900 dark:text-neutral-50">
          Alertas Automáticas
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-[10px] text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
            A
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 px-2">
        <ul className="space-y-4 px-2 pb-2">
          {/* Alerta 1 */}
          <li
            className={`flex gap-3 items-start rounded-xl p-3 backdrop-blur-sm transition-colors ${alert1.border ? "border " + alert1.border : ""} ${alert1.bgClasses}`}
          >
            <div
              className={`rounded-full p-1.5 mt-0.5 shrink-0 ${alert1.color}`}
            >
              {alert1.icon}
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold leading-none text-neutral-900 dark:text-neutral-50">
                {alert1.title}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-tight">
                {alert1.text}
              </p>
            </div>
          </li>

          {/* Alerta 2 */}
          <li
            className={`flex gap-3 items-start rounded-xl p-3 backdrop-blur-sm transition-colors ${alert2.border ? "border " + alert2.border : ""} ${alert2.bgClasses}`}
          >
            <div
              className={`rounded-full p-1.5 mt-0.5 shrink-0 ${alert2.color}`}
            >
              {alert2.icon}
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold leading-none text-neutral-900 dark:text-neutral-50">
                {alert2.title}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-tight">
                {alert2.text}
              </p>
            </div>
          </li>

          {/* Alerta 3 */}
          <li
            className={`flex gap-3 items-start rounded-xl p-3 backdrop-blur-sm transition-colors ${alert3.border ? "border " + alert3.border : ""} ${alert3.bgClasses}`}
          >
            <div
              className={`rounded-full p-1.5 mt-0.5 shrink-0 ${alert3.color}`}
            >
              {alert3.icon}
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold leading-none text-neutral-900 dark:text-neutral-50">
                {alert3.title}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-tight">
                {alert3.text}
              </p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
