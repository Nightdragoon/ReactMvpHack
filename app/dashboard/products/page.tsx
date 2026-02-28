"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, LayoutGrid, List as ListIcon } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="flex flex-col h-full w-full transition-colors relative z-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Products
        </h2>
        <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-sm gap-2">
          <Plus className="h-4 w-4" />
          New ebook
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <TabsList className="bg-transparent h-auto p-0 space-x-6">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white/60 dark:data-[state=active]:bg-neutral-800/60 dark:data-[state=active]:text-neutral-50 data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm backdrop-blur-sm text-neutral-500 dark:text-neutral-400 rounded-md px-3 py-1.5 font-medium transition-all"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="published"
              className="data-[state=active]:bg-white/60 dark:data-[state=active]:bg-neutral-800/60 dark:data-[state=active]:text-neutral-50 data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm backdrop-blur-sm text-neutral-500 dark:text-neutral-400 rounded-md px-3 py-1.5 font-medium transition-all"
            >
              Published
            </TabsTrigger>
            <TabsTrigger
              value="draft"
              className="data-[state=active]:bg-white/60 dark:data-[state=active]:bg-neutral-800/60 dark:data-[state=active]:text-neutral-50 data-[state=active]:text-neutral-900 data-[state=active]:shadow-sm backdrop-blur-sm text-neutral-500 dark:text-neutral-400 rounded-md px-3 py-1.5 font-medium transition-all"
            >
              Draft
            </TabsTrigger>
          </TabsList>

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

        {true ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse flex space-x-4">
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
        ) : (
          <>
            <TabsContent value="all" className="mt-0 outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
            </TabsContent>

            <TabsContent value="published" className="mt-0 outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
            </TabsContent>

            <TabsContent value="draft" className="mt-0 outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}
