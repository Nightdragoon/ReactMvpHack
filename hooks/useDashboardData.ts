import { useState, useEffect } from "react";
import { fetchDashboardMetrics } from "@/lib/api/dashboardFetcher";
import { DashboardMetrics } from "@/types";

export function useDashboardData() {
    const [data, setData] = useState<DashboardMetrics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            try {
                setLoading(true);
                const result = await fetchDashboardMetrics();
                if (isMounted) {
                    setData(result);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err as Error);
                    setData(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    return { data, loading, error };
}
