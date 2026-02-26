"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, ArrowRight, Github, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-center items-center relative overflow-hidden selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-200 via-neutral-50 to-neutral-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-950 -z-10 transition-colors"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-3xl -z-10 opacity-50 mix-blend-multiply dark:mix-blend-screen"></div>

      <div className="w-full max-w-md px-6 z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8 relative">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white dark:text-neutral-950 transition-transform group-hover:scale-105">
              <Zap className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              SAI
            </span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-colors">
          {/* Subtle gradient border effect */}
          <div className="absolute inset-0 border border-neutral-900/5 dark:border-white/5 rounded-3xl pointer-events-none transition-colors"></div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight transition-colors">
              Welcome back
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 transition-colors">
              Log in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-xs font-medium text-neutral-500 dark:text-neutral-400 px-1 transition-colors"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 bg-white/50 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all ring-offset-white dark:ring-offset-neutral-950"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between px-1">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-neutral-500 dark:text-neutral-400 transition-colors"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-medium text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full h-12 bg-white/50 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 text-neutral-900 dark:text-neutral-50 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all ring-offset-white dark:ring-offset-neutral-950"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-neutral-950 font-medium rounded-xl mt-6 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white dark:text-neutral-950" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800 transition-colors"></div>
            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium uppercase tracking-wider transition-colors">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800 transition-colors"></div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              className="flex-1 h-11 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </button>
            <button
              type="button"
              className="flex-1 h-11 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-500 dark:text-neutral-500 mt-8 transition-colors">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium transition-colors"
          >
            Request early access
          </Link>
        </p>
      </div>
    </div>
  );
}
