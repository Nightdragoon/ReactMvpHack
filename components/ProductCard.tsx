import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react"
import { fetchPostCaja  } from "@/lib/api/fetcher";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  activo: number;
  stock?: number;
}

import { InventoryEditModal } from "./InventoryEditModal";

interface ProductCardProps {
  product: Product;
  onUpdate?: () => void;
}

export function ProductCard({ product, onUpdate }: ProductCardProps) {
  const isPublished = product.activo === 1;

  const comprarProducto = async () => {
     const response = await fetchPostCaja(product.id, 7); // Assuming quantity is 1 for purchase
     if (response.IsSuccess) {
      alert("Producto comprado exitosamente");
      if (onUpdate) onUpdate(); // Refresh product data after purchase
     } else {
      
      alert(response.message || "Failed to purchase product");
     }
  } 

  return (
    <Card className="overflow-hidden shadow-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm transition-all hover:shadow-md flex flex-col justify-between group relative w-full h-full min-h-[300px]">
      <CardHeader className="p-0 bg-neutral-100/50 dark:bg-neutral-800/50 border-b border-neutral-100 dark:border-neutral-800/50 min-h-[160px]">
        <div className="relative w-full aspect-4/3 p-4 flex items-center justify-center">
         <Button variant="ghost" className="h-24 w-24 bg-emerald-100 dark:bg-emerald-900/30 " onClick={comprarProducto}>
          <ShoppingCart size={80} className="text-white" />
        </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 flex-1">
        <Badge
          variant="secondary"
          className={`mb-3 ${
            isPublished
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
              : "bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400"
          } hover:bg-opacity-80 border-transparent font-medium`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isPublished ? "bg-emerald-500" : "bg-slate-400"
            } mr-1.5`}
          ></span>
          {isPublished ? "Published" : "Draft"}
        </Badge>
        <CardTitle className="text-lg font-bold leading-tight text-neutral-900 dark:text-neutral-50 line-clamp-2 mb-2 h-10">
          {product.nombre}
        </CardTitle>
      </CardContent>

      <CardFooter className="p-5 grid grid-cols-3 gap-2 text-sm border-t border-neutral-100 dark:border-neutral-800/50 mt-auto items-end pb-4 pt-4">
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 font-medium">
            Price
          </p>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200">
            ${product.precio.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 font-medium">
            Inventario
          </p>
          <div className="flex items-center justify-center">
            <span
              className={`font-semibold ${
                (product.stock ?? 0) > 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-500"
              }`}
            >
              {product.stock ?? 0}
            </span>
            {onUpdate && (
              <InventoryEditModal product={product} onSuccess={onUpdate} />
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 font-medium">
            ID
          </p>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200">
            #{product.id}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
