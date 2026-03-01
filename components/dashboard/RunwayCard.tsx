import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { RunwayCardProps } from "@/types";
import { useEffect , useState } from "react";
import { fetchGetRunway } from "@/lib/api/fetcher";



export function RunwayCard({
  cashAvailable,
  monthlyBurnRate,
}: RunwayCardProps) {

  const [runway, setRunway] = useState(0);
  const [ganancias , setGanancias] = useState(0);
  const [perdidas , setPerdidas] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGetRunway();
        setRunway(data.runway);
        setGanancias(data.ganancias_mes_totales);
        setPerdidas(data.perdida_mes_totales);
      } catch (error) {
        console.error("Error fetching runway data:", error);
      }    };
    fetchData();
  }, []);
  // Si no hay burnRate real (0), no podemos calcular el runway matemáticamente.
  // Protegemos contra división por cero.
  const isDataEmpty = cashAvailable === 0 && monthlyBurnRate === 0;

  const runwayMonths = isDataEmpty ? 0 : cashAvailable / (monthlyBurnRate || 1);
  const runwayFormatted = isDataEmpty ? "-" : runwayMonths.toFixed(1);
  const runwayPercentage = (runway / 6) * 100
    ? 0
    : Math.min(100, Math.max(0, (runwayMonths / 6) * 100)); // Cap at 6 months for UI bar

  return (
    <Card className="shadow-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm transition-colors relative overflow-hidden group">
      {/* Decorative effect */}
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Copy className="w-24 h-24 text-emerald-500" />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold uppercase tracking-wide text-neutral-900 dark:text-neutral-50 transition-colors">
          Runway
        </CardTitle>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors">
          (Proyección de Runway)
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extrabold tracking-tighter">
              {runwayFormatted}
            </span>
            <span className="text-xl font-medium text-muted-foreground">
              Meses
            </span>
          </div>

          <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400 border-l-2 border-emerald-500/20 pl-3 transition-colors">
            <p className="flex justify-between">
              <span>Cash Disponible:</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-50">
                {ganancias}k MXN
              </span>
            </p>
            <p className="flex justify-between">
              <span>Burn Rate Mensual:</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-50">
                {perdidas}k MXN
              </span>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 uppercase rounded-full text-emerald-600 dark:text-emerald-400">
                    Línea de Tiempo
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-emerald-600 dark:text-emerald-400">
                    {runway} Meses
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-sm bg-neutral-200 dark:bg-neutral-800">
                <div
                  style={{ width: `${runwayPercentage}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 strip-pattern transition-all duration-1000 ease-out"
                ></div>
              </div>
              <div className="flex justify-between text-xs text-neutral-500 px-1">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6+</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
