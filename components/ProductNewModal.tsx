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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Loader2 } from "lucide-react";
import { fetchPostProducto } from "@/lib/api/fetcher";

interface ProductNewModalProps {
  onSuccess: () => void;
}

export function ProductNewModal({ onSuccess }: ProductNewModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    activo: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetchPostProducto(
        Number(formData.precio),
        formData.nombre,
        formData.activo ? 1 : 0,
      );
      if (response.IsSuccess) {
        setOpen(false);
        setFormData({ nombre: "", precio: "", activo: true });
        onSuccess();
      } else {
        alert(response.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("An error occurred while creating product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-sm gap-2">
          <Plus className="h-4 w-4" />
          New product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-neutral-900 dark:text-neutral-50">
              New Product
            </DialogTitle>
            <DialogDescription className="text-neutral-500 dark:text-neutral-400">
              Enter the details for your new product ebook.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label
                htmlFor="nombre"
                className="text-neutral-700 dark:text-neutral-300"
              >
                Name
              </Label>
              <Input
                id="nombre"
                placeholder="Product name"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                required
                className="border-neutral-200 dark:border-neutral-800 focus:ring-emerald-500"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="precio"
                className="text-neutral-700 dark:text-neutral-300"
              >
                Price
              </Label>
              <Input
                id="precio"
                type="number"
                placeholder="0.00"
                value={formData.precio}
                onChange={(e) =>
                  setFormData({ ...formData, precio: e.target.value })
                }
                required
                className="border-neutral-200 dark:border-neutral-800 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="activo"
                checked={formData.activo}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, activo: checked as boolean })
                }
              />
              <Label
                htmlFor="activo"
                className="text-neutral-700 dark:text-neutral-300"
              >
                Active / Published
              </Label>
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
                  Creating...
                </>
              ) : (
                "Create Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
