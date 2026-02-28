"use client";

import { columns, InventoryTablaItem } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchGetAllInventarios } from "@/lib/api/fetcher";

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryTablaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const response = await fetchGetAllInventarios();
        if (response?.IsSuccess && response?.data) {
          // iteramos en la tabla message, id y cantidad
          const mappedData: InventoryTablaItem[] = response.data.map(
            (item: { id: number; cantidad: number }) => ({
              id: item.id,
              cantidad: item.cantidad,
              // message: response.message,
            }),
          );
          setInventory(mappedData);
        }
      } catch (error) {
        console.error("Error al obtener inventario:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, []);

  return (
    <div className="flex flex-col h-full w-full transition-colors relative z-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
            <Package className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            Inventory Management
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Track and manage your product stock levels across all locations.
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-sm gap-2 rounded-xl">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="pt-2">
        {loading ? (
          <div className="flex justify-center items-center py-12 text-sm text-neutral-500 dark:text-neutral-400">
            Cargando inventario...
          </div>
        ) : (
          <DataTable columns={columns} data={inventory} />
        )}
      </div>
    </div>
  );
}
