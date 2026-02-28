import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md px-4 lg:px-6 z-20 transition-colors">
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 md:hidden border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      <div className="w-full flex-1 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-emerald-500">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>

          <span className="text-neutral-300 dark:text-neutral-700 mx-1 sm:mx-2 hidden sm:inline-block">
            |
          </span>
          <span className="font-medium tracking-tight whitespace-nowrap hidden lg:inline-block uppercase text-sm text-neutral-600 dark:text-neutral-400">
            Dashboard Operativo Para Agritech
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold pointer-events-auto mr-4 hidden md:flex">
          <div className="flex items-center gap-1.5 cursor-pointer text-emerald-600 dark:text-emerald-400">
            <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span>CEO</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer">
            <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span>COO</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer">
            <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <span>CFO</span>
          </div>
        </div>
      </div>
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-xl border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md"
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">CEO</p>
              <p className="text-xs leading-none text-neutral-500">
                ceo@startup.inc
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-800" />
          <DropdownMenuItem className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-800" />
          <DropdownMenuItem className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900">
            <Link href="/" className="w-full">
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
