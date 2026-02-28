import { fetcTest } from "@/lib/api/fetcher";
import React, { useEffect } from "react";

export const TestDash = () => {
  useEffect(() => {
    console.log("TestDash montado, llamando a fetcTest...");
    fetcTest();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
      <p className="text-muted-foreground">Ruta principal del Dashboard</p>
    </div>
  );
};
