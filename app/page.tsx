"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, Shield, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-neutral-950 overflow-hidden">
              <Image
                src="/icon.svg"
                alt="SAI Icon"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">copilot</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white dark:text-neutral-950 hover:bg-emerald-400 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-200 via-neutral-50 to-neutral-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-950 transition-colors"></div>

          <div className="relative mx-auto max-w-7xl px-6 text-center z-10">
            <div className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 px-3 py-1 text-sm text-neutral-600 dark:text-neutral-300 mb-8 backdrop-blur-sm transition-colors">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              SAI-copilot is now in Early Access
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-400 sm:text-7xl lg:text-8xl pb-4 transition-colors">
              Operational Intelligence for Startups.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 sm:text-xl leading-relaxed transition-colors">
              Stop guessing your runway. We aggregate your financial data to
              detect risks, simulate scenarios, and give you total control over
              your burn rate.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="group flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 text-sm font-medium text-white dark:text-neutral-950 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950 transition-all w-full sm:w-auto"
              >
                Start using SAI-copilot
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#features"
                className="flex h-12 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-transparent px-8 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-800 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950 transition-all w-full sm:w-auto"
              >
                View Features
              </Link>
            </div>
          </div>

          {/* Decorative Glow */}
          <div className="absolute left-1/2 top-0 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent blur-3xl rounded-full"></div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-24 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 relative transition-colors"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl transition-colors">
                Everything you need to scale with certainty.
              </h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-400 transition-colors">
                A unified dashboard that acts as your financial copilot,
                alerting you before problems arise.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-8 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-50 transition-colors">
                  Predictive Alerts
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors">
                  Get notified of runway deterioration or budget anomalies
                  before they become critical issues.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-8 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform overflow-hidden">
                  <Image
                    src="/icon.svg"
                    alt="SAI Icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-50 transition-colors">
                  What-If Scenarios
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors">
                  Simulate the impact of new hires, budget cuts, or missed sales
                  targets instantly on your dashboard.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-8 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-800 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-neutral-50 transition-colors">
                  Total Consolidation
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors">
                  Finally, one place for banks, accounting, and operational
                  data. Clean, secure, and always up-to-date.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 transition-colors"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl mb-6 transition-colors">
              Ready to take control of your startup?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto transition-colors">
              Join the growing number of founders using SAI to extend their
              runway and make better operational decisions.
            </p>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-500 px-8 text-sm font-medium text-white dark:text-neutral-950 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-neutral-100 dark:focus:ring-offset-neutral-900 transition-all"
            >
              Get Started for Free
            </Link>

            <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-500 transition-colors">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />{" "}
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />{" "}
                Setup in 2 minutes
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />{" "}
                Cancel anytime
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 py-12 transition-colors">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/icon.svg"
              alt="SAI Icon"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="font-semibold text-neutral-900 dark:text-neutral-300 transition-colors">
              copilot
            </span>
          </div>
          <p className="text-sm text-neutral-500 transition-colors">
            © {new Date().getFullYear()} SAI Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-neutral-500 transition-colors">
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
