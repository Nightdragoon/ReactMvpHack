"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface EmployeeTablaItem {
  id: number;
  nombre_completo: string;
  login: string;
  Rol: string;
  contrasena: string;
}

export const columns: ColumnDef<EmployeeTablaItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-neutral-300 dark:border-neutral-700 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-neutral-300 dark:border-neutral-700 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
 
  {
    accessorKey: "nombre_completo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-neutral-100 dark:hover:bg-neutral-800 -ml-4"
      >
        Nombre Completo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("nombre_completo")}</div>,
  },
  {
    accessorKey: "login",
    header: "Login",
    cell: ({ row }) => <div>{row.getValue("login")}</div>,
  },
  {
    accessorKey: "contrasena",
    header: "Contraseña",
    cell: ({ row }) => <div>{row.getValue("contrasena")}</div>,
  },
  {
    accessorKey: "Rol",
    header: "Rol",
    cell: ({ row }) => <div>{row.getValue("Rol")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-lg rounded-xl"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.id.toString())}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-800" />
            <DropdownMenuItem>Edit item</DropdownMenuItem>
            <DropdownMenuItem>Delete item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
