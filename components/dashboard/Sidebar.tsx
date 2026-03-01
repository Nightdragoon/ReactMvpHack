"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  DollarSign,
  Activity,
  ChevronDown,
  Settings,
  ChevronLeft,
  UserCircle,
  LogOut,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  // Estado para los menús colapsables
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "Analíticas y Métricas": true,
    "Gestión Operativa": true,
    "Configuración General": false,
  });

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }));
  };

  const menuGroups = [
    {
      title: "Analíticas y Métricas",
      icon: Activity,
      count: "3 elementos",
      routes: [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Caja", href: "/dashboard/cashbox", icon: DollarSign },
        { name: "Burn Rate", href: "/dashboard/burnrate", icon: Activity },
      ],
    },
    {
      title: "Gestión Operativa",
      icon: Users,
      count: "2 elementos",
      routes: [
        { name: "Productos", href: "/dashboard/products", icon: ShoppingCart },
        { name: "Empleados", href: "/dashboard/employees", icon: Users },
      ],
    },
  ];

  return (
    <aside className="w-full h-full border-r border-neutral-200/50 dark:border-neutral-800/50 bg-gradient-to-b from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-950 hidden md:flex flex-col z-20 transition-all duration-300">
      {/* Header / Logo Section */}
      <div className="flex h-20 items-center justify-between border-b border-neutral-200/50 dark:border-neutral-800/50 px-6 shrink-0">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-neutral-950 shadow-lg shadow-emerald-500/20 overflow-hidden shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/icon.svg"
              alt="SAI Icon"
              width={35}
              height={35}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              COPILOT
            </span>
          </div>
        </Link>
        <button className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
        <div className="flex flex-col gap-6">
          {menuGroups.map((group) => {
            const isOpen = openGroups[group.title];
            const hasActiveRoute = group.routes.some(
              (r) => pathname === r.href,
            );

            return (
              <div key={group.title} className="flex flex-col">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-colors group/header"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                        hasActiveRoute
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                          : "bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-500 group-hover/header:text-neutral-900 dark:group-hover/header:text-neutral-200"
                      }`}
                    >
                      <group.icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span
                        className={`text-sm font-semibold transition-colors ${
                          hasActiveRoute
                            ? "text-neutral-900 dark:text-neutral-100"
                            : "text-neutral-700 dark:text-neutral-300 group-hover/header:text-neutral-900 dark:group-hover/header:text-neutral-100"
                        }`}
                      >
                        {group.title}
                      </span>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">
                        {group.count}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Group Items */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-2"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-1 pl-6 ml-4 border-l border-neutral-300 dark:border-neutral-700/80 my-1 relative py-1">
                      {group.routes.map((route) => {
                        const isActive = pathname === route.href;

                        return (
                          <Link
                            key={route.href}
                            href={route.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group/link ${
                              isActive
                                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
                                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                            }`}
                          >
                            {/* Horizontal connecting line */}
                            <div
                              className={`absolute -left-[24px] top-1/2 w-[24px] border-t transition-colors ${
                                isActive
                                  ? "border-emerald-500 dark:border-emerald-500"
                                  : "border-neutral-300 dark:border-neutral-700/80 group-hover/link:border-neutral-400 dark:group-hover/link:border-neutral-500"
                              }`}
                            />

                            {/* Active pill indicator on the left border */}
                            {isActive && (
                              <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 h-full w-[2px] bg-emerald-500 rounded-full" />
                            )}

                            <route.icon
                              className={`h-4 w-4 transition-transform ${
                                isActive
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-neutral-500 group-hover/link:text-emerald-500"
                              }`}
                            />
                            {route.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Configuration Group */}
          <div className="flex flex-col">
            <button
              onClick={() => toggleGroup("Configuración General")}
              className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-colors group/header"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                    pathname.includes("settings")
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      : "bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-500 group-hover/header:text-neutral-900 dark:group-hover/header:text-neutral-200"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      pathname.includes("settings")
                        ? "text-neutral-900 dark:text-neutral-100"
                        : "text-neutral-700 dark:text-neutral-300 group-hover/header:text-neutral-900 dark:group-hover/header:text-neutral-100"
                    }`}
                  >
                    Configuración General
                  </span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">
                    2 elementos
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${
                  openGroups["Configuración General"] ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                openGroups["Configuración General"]
                  ? "grid-rows-[1fr] opacity-100 mt-2"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-1 pl-6 ml-4 border-l border-neutral-300 dark:border-neutral-700/80 my-1 relative py-1">
                  <Link
                    href="/dashboard/settings/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all duration-200 relative group/link"
                  >
                    <div className="absolute -left-[24px] top-1/2 w-[24px] border-t border-neutral-300 dark:border-neutral-700/80 group-hover/link:border-neutral-400 dark:group-hover/link:border-neutral-500 transition-colors" />
                    <UserCircle className="h-4 w-4 text-neutral-500 group-hover/link:text-emerald-500" />
                    Mi Perfil
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-all duration-200 relative group/link"
                  >
                    <div className="absolute -left-[24px] top-1/2 w-[24px] border-t border-neutral-300 dark:border-neutral-700/80 group-hover/link:border-neutral-400 dark:group-hover/link:border-neutral-500 transition-colors" />
                    <Settings className="h-4 w-4 text-neutral-500 group-hover/link:text-emerald-500" />
                    Ajustes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-neutral-200/50 dark:border-neutral-800/50 mt-auto shrink-0">
        <Link
          href="/dashboard/profile"
          className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 transition-colors group cursor-pointer"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center border border-emerald-200 dark:border-emerald-800/50 shrink-0">
              <UserCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                Admin User
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                admin@copilot.com
              </span>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <LogOut className="h-4 w-4 text-red-500/80 hover:text-red-500 shrink-0" />
          </div>
        </Link>
      </div>
    </aside>
  );
}
