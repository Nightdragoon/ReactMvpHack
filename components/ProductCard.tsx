import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductCard() {
  return (
    <Card className="overflow-hidden shadow-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm transition-all hover:shadow-md flex flex-col justify-between group relative w-full h-full min-h-[300px]">
      <CardHeader className="p-0 bg-neutral-100/50 dark:bg-neutral-800/50 border-b border-neutral-100 dark:border-neutral-800/50 min-h-[160px]">
        <div className="relative w-full aspect-4/3 p-4 flex items-center justify-center">
          {/* Image Placeholder */}
        </div>
      </CardHeader>

      <CardContent className="p-5 flex-1">
        <Badge
          variant="secondary"
          className="mb-3 bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 border-transparent font-medium"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
          {/* Status Placeholder */}
        </Badge>
        <CardTitle className="text-lg font-bold leading-tight text-neutral-900 dark:text-neutral-50 line-clamp-2 mb-2 h-10">
          {/* Title Placeholder */}
        </CardTitle>
      </CardContent>

      <CardFooter className="p-5 grid grid-cols-3 gap-2 text-sm border-t border-neutral-100 dark:border-neutral-800/50 mt-auto items-end pb-4 pt-4">
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 font-medium">
            Price
          </p>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200">
            {/* Price Placeholder */} -
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 font-medium">
            Sales
          </p>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200">
            {/* Sales Placeholder */} -
          </p>
        </div>
        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1 font-medium">
            Revenue
          </p>
          <p className="font-semibold text-neutral-800 dark:text-neutral-200">
            {/* Revenue Placeholder */} -
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
