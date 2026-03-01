"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List as ListIcon, RefreshCcw } from "lucide-react";
import {
  fetchGetAllProductos,
  fetchGetAllInventarios,
  
} from "@/lib/api/fetcher";
import { ProductCard, Product } from "@/components/ProductCard";
import { ProductNewModal } from "@/components/ProductNewModal";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsRes, inventoryRes] = await Promise.all([
        fetchGetAllProductos(false),
        fetchGetAllInventarios(),
      ]);

      if (productsRes.IsSuccess) {
        let mergedProducts = productsRes.data;

        if (inventoryRes.IsSuccess) {
          interface InventoryItem {
            id_producto: number;
            cantidad: number;
          }
          const inventoryMap = new Map<number, number>(
            inventoryRes.data.map((inv: InventoryItem) => [
              inv.id_producto,
              inv.cantidad,
            ]),
          );

          mergedProducts = mergedProducts.map((product: Product) => ({
            ...product,
            stock: inventoryMap.get(product.id) || 0,
          }));
        }

        setProducts(mergedProducts);
      } else {
        setError(productsRes.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Error loading products and inventory:", err);
      setError("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="flex flex-col h-full w-full transition-colors relative z-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Products
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={loadProducts}
            disabled={isLoading}
            className="border-neutral-200 dark:border-neutral-800"
          >
            <RefreshCcw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
          <ProductNewModal onSuccess={loadProducts} />
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <div className="text-neutral-500 dark:text-neutral-400 font-medium px-1">
            All ({products.length})
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
            >
              <ListIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/60 dark:bg-neutral-800/60 text-neutral-900 dark:text-neutral-50 shadow-sm backdrop-blur-sm hover:bg-white/80 dark:hover:bg-neutral-800/80"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse flex space-x-4 w-full max-w-sm">
              <div className="rounded-md bg-neutral-200 dark:bg-neutral-800 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded col-span-2"></div>
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={loadProducts}>Try Again</Button>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-neutral-500 dark:text-neutral-400 mb-4">
              No products found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 outline-none">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onUpdate={loadProducts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
