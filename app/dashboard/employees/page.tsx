"use client";

import { columns, EmployeeTablaItem } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchGetAllEmpleados } from "@/lib/api/fetcher";
import { EmployeeNewModal } from "@/components/dialogNewEmploye";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeTablaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await fetchGetAllEmpleados();
        if (response?.IsSuccess && response?.data) {
          // iteramos en la tabla message, id y cantidad
          const mappedData: EmployeeTablaItem[] = response.data.map(
            (item: { contrasena:string , id: number , nombre_completo: string , login: string , Rol: string}) => ({
              id: item.id,
              nombre_completo: item.nombre_completo,
              login: item.login,
              Rol: item.Rol,
              contrasena: item.contrasena,
              // message: response.message,
            }),
          );
          setEmployees(mappedData);
        }
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  return (
    <div className="flex flex-col h-full w-full transition-colors relative z-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
            <Package className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            Employees Management
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Track and manage your employee information across all locations.
          </p>
        </div>
        <EmployeeNewModal onSuccess={() => {
          // Reload employees data after successful creation
          const loadEmployees = async () => {
            try {
              const response = await fetchGetAllEmpleados();
              if (response?.IsSuccess && response?.data) {
                const mappedData: EmployeeTablaItem[] = response.data.map(
                  (item: { contrasena:string , id: number , nombre_completo: string , login: string , Rol: string}) => ({
                    id: item.id,
                    nombre_completo: item.nombre_completo,
                    login: item.login,
                    Rol: item.Rol,
                    contrasena: item.contrasena,
                  }),
                );
                setEmployees(mappedData);
              }
            } catch (error) {
              console.error("Error al obtener empleados:", error);
            }
          };
          loadEmployees();
        }} />
      </div>

      <div className="pt-2">
        {loading ? (
          <div className="flex justify-center items-center py-12 text-sm text-neutral-500 dark:text-neutral-400">
            Cargando inventario...
          </div>
        ) : (
          <DataTable columns={columns} data={employees} />
        )}
      </div>
    </div>
  );
}
