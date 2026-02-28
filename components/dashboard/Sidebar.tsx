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
    <aside className="w-64 border-r border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md hidden md:block z-20 transition-colors">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b border-neutral-200/50 dark:border-neutral-800/50 px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-neutral-950 overflow-hidden">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="object-contain"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              copilot
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-neutral-600 dark:text-neutral-400 transition-all hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 group"
              >
                <route.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
