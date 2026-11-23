"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserRound,
  ShieldCheck,
  Wallet,
  Activity,
  Bell,
  Database,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Search,
  Coins,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  Plus,
  Zap,
  HelpCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import { accountSections, featureShortcuts } from "@/utils/data";

export default function ProfilePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  const fullName = user?.full_name || (loading ? "Loading account..." : "Your Account");
  const email = user?.email || (loading ? "" : "Guest account");

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
    : null;

  const filteredSections = accountSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#FAFAFC] px-4 py-8 text-slate-900 sm:px-8 lg:px-12 lg:py-12">
      {/* Subtle Ambient Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[420px] w-[1080px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-200/35 via-fuchsia-100/25 to-indigo-100/30 blur-3xl"
      />

      {/* Expanded Container: max-w-7xl fills wide screens cleanly */}
      <div className="mx-auto w-full max-w-7xl">
        {/* Top Breadcrumb Bar */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex items-center justify-between"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full px-0 py-2 text-xs font-medium text-slate-600 transition-all hover:border-violet-200 hover:text-violet-700"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-medium text-slate-400 sm:inline">
              ProblemPulse Account Hub
            </span>
          </div>
        </motion.div>

        {/* Main 12-Column Split Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* LEFT COLUMN (4 cols): Sticky Profile Overview & Credit Meter */}
          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5 lg:sticky lg:top-8 lg:col-span-4"
          >
            {/* User Identity Card */}
            <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
              {/* Top Decorative Banner */}
              <div className="h-20 bg-linear-to-r from-violet-600 via-indigo-600 to-fuchsia-600" />

              <div className="px-6 pb-6">
                {/* Overlapping Avatar */}
                <div className="-mt-10 mb-4 flex items-end justify-between">
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-violet-600 to-indigo-700 text-2xl font-bold text-white shadow-md">
                      {user?.photo_url ? (
                        <Image
                          src={user.photo_url}
                          alt={user.full_name || "Profile"}
                          width={80}
                          height={80}
                          className="h-full w-full rounded-full object-cover"
                          priority
                        />
                      ) : (
                        initials || "PP"
                      )}
                    </div>

                    {!loading && user && (
                      <span
                        title="Authenticated Account"
                        className="absolute -right-1 bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white"
                      >
                        <CheckCircle2 size={13} />
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <Sparkles size={12} className="text-emerald-600" />
                    {loading ? "Loading..." : user ? "Active user" : "Guest"}
                  </span>
                </div>

                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  {fullName}
                </h1>

                <p className="mt-0.5 text-xs text-slate-500">
                  {email}
                  {memberSince && ` • Member since ${memberSince}`}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-slate-500">
                  Manage your personal profile, security preferences, credit
                  balance, and workspace notifications in one place.
                </p>

                <div className="mt-2 pt-4">
                  <Link
                    href="/my-account/personal-information"
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                  >
                    Edit Profile Details
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Credits & Usage Card */}
            <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-white via-violet-50/30 to-fuchsia-50/30 p-6 shadow-[0_8px_30px_rgb(95,25,197,0.03)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100/80 text-violet-700">
                    <Coins size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Credit Balance
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Renews Dec 1, 2026
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile/billing"
                  className="inline-flex items-center gap-1 rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-violet-700"
                >
                  <Plus size={13} />
                  Top Up
                </Link>
              </div>

              <div className="mt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900">
                    240
                    <span className="ml-1 text-xs font-medium text-slate-400">
                      / 500 credits left
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-violet-700">
                    48%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/70">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
                    style={{ width: "48%" }}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-violet-100/80 pt-3.5 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Zap size={12} className="text-amber-500" />
                  14 runs this month
                </span>
                <Link
                  href="/profile/activity"
                  className="font-semibold text-violet-700 hover:underline"
                >
                  View usage →
                </Link>
              </div>
            </div>

            {/* Quick Support / Docs Card */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-5 py-4">
              <div className="flex items-center gap-3">
                <HelpCircle size={18} className="text-slate-400" />
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Need help with your account?
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Contact priority support anytime
                  </p>
                </div>
              </div>
              <Link
                href="/support"
                className="text-xs font-semibold text-violet-600 hover:underline"
              >
                Support
              </Link>
            </div>
          </motion.aside>

          {/* RIGHT COLUMN (8 cols): Account Settings Grid & Tool Preferences */}
          <div className="lg:col-span-8">
            {/* Section Header + Filter Bar */}
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Account Settings
                </h2>
                <p className="text-xs text-slate-500">
                  Select a category to configure your workspace and security
                </p>
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <Search
                  size={15}
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter settings..."
                  className="w-full rounded-md border border-slate-200/90 bg-white py-2 pr-3.5 pl-9 text-xs text-slate-800 placeholder-slate-400 shadow-2xs transition-all outline-none focus:border-violet-400 focus:ring-3 focus:ring-violet-500/10"
                />
              </div>
            </div>

            {/* 2-Column Grid inside the 8-col Right Pane */}
            {filteredSections.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredSections.map((section, index) => {
                  const Icon = section.icon;

                  return (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.05 * index,
                      }}
                    >
                      <Link
                        href={section.href}
                        className={`group relative flex h-full min-h-[178px] flex-col rounded-2xl border border-slate-200/85 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${section.hoverGlow}`}
                      >
                        <div className="mb-4 flex items-center justify-between gap-2">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105 ${section.accent}`}
                          >
                            <Icon size={20} />
                          </div>

                          <div className="flex items-center gap-2">
                            {section.badge && (
                              <span
                                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${section.badgeStyle}`}
                              >
                                {section.badge}
                              </span>
                            )}
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 transition-colors group-hover:bg-violet-50 group-hover:text-violet-600">
                              <ArrowUpRight
                                size={16}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </div>
                          </div>
                        </div>

                        <h3 className="text-[15px] font-bold text-slate-900 transition-colors group-hover:text-violet-700">
                          {section.title}
                        </h3>

                        <p className="mt-1.5 text-xs leading-5 text-slate-500">
                          {section.description}
                        </p>

                        <div className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-slate-400 transition-colors group-hover:text-violet-600">
                          <span>Manage settings</span>
                          <ChevronRight
                            size={14}
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center">
                <p className="text-sm font-medium text-slate-600">
                  No settings matched "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-xs font-semibold text-violet-600 hover:underline"
                >
                  Clear filter
                </button>
              </div>
            )}

            {/* Feature-Specific Settings Section */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-6 rounded-3xl border border-violet-100/90 bg-gradient-to-br from-[#FAF8FF] via-white to-[#FAF8FF] p-6 shadow-2xs"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-white text-violet-700 shadow-2xs">
                  <SlidersHorizontal size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Tool & Analysis Preferences
                  </h3>
                  <p className="text-xs text-slate-500">
                    Customize scraping depth, filters, and defaults for
                    individual discovery engines.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {featureShortcuts.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-3.5 transition-all hover:border-violet-200 hover:bg-violet-50/40 hover:shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-violet-700">
                        {tool.name}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-600"
                      />
                    </div>
                    <p className="mt-1 text-[11px] leading-4 text-slate-500">
                      {tool.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-14 border-t border-slate-200/60 pt-6 text-center">
          <p className="text-xs font-medium tracking-wide text-slate-400">
            A better way to discover what matters —{" "}
            <span className="font-semibold text-slate-500">ProblemPulse</span>
          </p>
        </footer>
      </div>
    </main>
  );
}