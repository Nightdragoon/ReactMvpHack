"use client";

import { motion } from "framer-motion";
import { Users, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface RecentTransactionsProps {
  transactions: any[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="md:col-span-3 xl:col-span-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md flex flex-col">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="recent-sales" className="border-b-0">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex flex-1 items-center gap-2">
              <Activity className="w-5 h-5 text-teal-500" />
              <span className="text-lg font-semibold cursor-pointer">
                Últimas Ventas
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className="flex-1 overflow-y-auto max-h-[50vh] lg:max-h-[60vh] pt-0">
              <div className="space-y-4">
                {transactions.length > 0 ? (
                  transactions.map((tx, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={`tx-${tx.id}-${idx}`}
                      className="flex justify-between items-center bg-white/40 dark:bg-neutral-800/40 p-3 rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/80 transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 truncate w-32">
                          {tx.productoInfo?.nombre ||
                            `Prod #${tx.idf_producto}`}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {tx.empleadoInfo?.nombre_completo ||
                            `Emp #${tx.idf_empleado}`}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          ${tx.productoInfo?.precio?.toLocaleString() || "0"}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {tx.dia?.substring(5) || "N/A"}
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground text-center py-8">
                    No hay ventas registradas
                  </div>
                )}
              </div>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
