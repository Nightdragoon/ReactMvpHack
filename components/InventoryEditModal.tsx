"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Loader2 } from "lucide-react";
import { fetchUpdateInventario } from "@/lib/api/fetcher";

interface Product {
  id: number;
  nombre: string;
  precio: number;
  activo: number;
  stock?: number;
}

interface InventoryEditModalProps {
  product: Product;
  onSuccess: () => void;
}

export function InventoryEditModal({
  product,
  onSuccess,
}: InventoryEditModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cantidad, setCantidad] = useState(product.stock?.toString() || "0");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const cantidadValue = Number(cantidad) || 0;
      // We use post to update or create the inventory. Since the user said
      // "con el id de product y id_product de inventario" and we know fetchUpdateInventario
      // takes id_producto and cantidad, we will use that.
      const response = await fetchUpdateInventario(product.id, cantidadValue);

      if (response.IsSuccess || response.message) {
        setOpen(false);
        onSuccess();
      } else {
        alert(response.message || "Failed to update inventory");
      }
    } catch (error) {
      console.error("Error updating inventory:", error);
      alert("An error occurred while updating inventory");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 ml-1 text-neutral-500 hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <Edit2 className="h-4 w-4" />
          <span className="sr-only">Edit Inventory</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-neutral-900 dark:text-neutral-50">
              Update Inventory
            </DialogTitle>
            <DialogDescription className="text-neutral-500 dark:text-neutral-400">
              Set the new inventory level for{" "}
              <strong className="text-neutral-700 dark:text-neutral-300">
                {product.nombre}
              </strong>
              .
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label
                htmlFor="cantidad"
                className="text-neutral-700 dark:text-neutral-300"
              >
                Stock Quantity
              </Label>
              <Input
                id="cantidad"
                type="number"
                placeholder="0"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                min="0"
                required
                className="border-neutral-200 dark:border-neutral-800 focus:ring-emerald-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Inventory"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
