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
import { fetchCrearEmpleados } from "@/lib/api/fetcher";

interface EmployeeNewModalProps {
  onSuccess: () => void;
}

export function EmployeeNewModal({ onSuccess }: EmployeeNewModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre_completo: "",
    login: "",
    contrasena: "",
    Rol : "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetchCrearEmpleados(
        
        formData.nombre_completo,
        formData.login,
        formData.contrasena,
        formData.Rol,
      );
      if (response.IsSuccess) {
        setOpen(false);
        setFormData({ nombre_completo: "", login: "", contrasena: "", Rol: "" });
        onSuccess();
      } else {
        alert(response.message || "Failed to create employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("An error occurred while creating employee");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-sm gap-2">
          <Plus className="h-4 w-4" />
          New Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-neutral-900 dark:text-neutral-50">
              New Employee
            </DialogTitle>
            <DialogDescription className="text-neutral-500 dark:text-neutral-400">
              Enter the details for your new employee.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label
                htmlFor="nombre_completo"
                className="text-neutral-700 dark:text-neutral-300"
              >
                Name
              </Label>
              <Input
                id="nombre_completo"
                placeholder="Employee full name"
                value={formData.nombre_completo}
                onChange={(e) =>
                  setFormData({ ...formData, nombre_completo: e.target.value })
                }
                required
                className="border-neutral-200 dark:border-neutral-800 focus:ring-emerald-500"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="login"
                className="text-neutral-700 dark:text-neutral-300"
              >
                Login
              </Label>
              <Input
                id="login"
                placeholder="Employee login"
                value={formData.login}
                onChange={(e) =>
                  setFormData({ ...formData, login: e.target.value })
                }
                required
                className="border-neutral-200 dark:border-neutral-800 focus:ring-emerald-500"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="contrasena"
                className="text-neutral-700 dark:text-neutral-300"
              >
                Password
              </Label>
              <Input
                id="contrasena"
                type="password"
                placeholder="Employee password"
                value={formData.contrasena}
                onChange={(e) =>
                  setFormData({ ...formData, contrasena: e.target.value })
                }
                required
                className="border-neutral-200 dark:border-neutral-800 focus:ring-emerald-500"
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="Rol"
                className="text-neutral-700 dark:text-neutral-300"
              >
                Role
              </Label>
              <Input
                id="Rol"
                placeholder="Employee role"
                value={formData.Rol}
                onChange={(e) =>
                  setFormData({ ...formData, Rol: e.target.value })
                }
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
