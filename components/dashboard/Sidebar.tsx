import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  Activity,
} from "lucide-react";

export function Sidebar() {
  const routes = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/dashboard/products", icon: ShoppingCart },
    { name: "Inventory", href: "/dashboard/inventory", icon: Package },
    { name: "Employees", href: "/dashboard/employees", icon: Users },
    { name: "Cashbox", href: "/dashboard/cashbox", icon: DollarSign },
    { name: "Burn Rate", href: "/dashboard/burnrate", icon: Activity },
  ];

  return (
    <aside className="w-64 border-r bg-muted/40 hidden md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span className="">SAI Copilot</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <route.icon className="h-4 w-4" />
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
