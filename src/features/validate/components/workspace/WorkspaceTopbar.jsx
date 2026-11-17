"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Bell,
    HelpCircle,
    Search,
    Plus,
    ChevronRight,
    Coins,
    CheckCheck,
    Sparkles,
    FileText,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLE_NOTIFICATIONS = [
    {
        id: 1,
        icon: Sparkles,
        title: "Validation report ready",
        desc: "Your latest idea report has finished generating.",
        time: "2m ago",
        unread: true,
    },
    {
        id: 2,
        icon: FileText,
        title: "New market data added",
        desc: "TAM/SAM insights were refreshed for your saved ideas.",
        time: "1h ago",
        unread: true,
    },
    {
        id: 3,
        icon: Coins,
        title: "Credits topped up",
        desc: "Your credit balance was updated successfully.",
        time: "Yesterday",
        unread: false,
    },
];

const formatSegment = (segment) =>
    segment
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

function useClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (e) => {
            if (ref.current && !ref.current.contains(e.target)) handler();
        };
        document.addEventListener("mousedown", listener);
        return () => document.removeEventListener("mousedown", listener);
    }, [ref, handler]);
}

export default function WorkspaceTopbar({
    credits,
    onTopUp,
    notifications = SAMPLE_NOTIFICATIONS,
}) {
    const pathname = usePathname();
    const router = useRouter();

    const searchRef = useRef(null);
    const notifRef = useRef(null);

    const [notifOpen, setNotifOpen] = useState(false);
    const [items, setItems] = useState(notifications);
    const [query, setQuery] = useState("");

    useClickOutside(notifRef, () => setNotifOpen(false));

    // ⌘K / Ctrl+K focuses the search box
    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                searchRef.current?.focus();
            }
            if (e.key === "Escape") setNotifOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const crumbs = useMemo(
        () => pathname.split("/").filter(Boolean).map(formatSegment),
        [pathname]
    );
    const pageTitle = crumbs[crumbs.length - 1] || "Workspace";

    const unreadCount = items.filter((n) => n.unread).length;

    const markAllRead = () =>
        setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/validate-idea?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-purple-100 bg-white/80 px-5 backdrop-blur-md sm:px-8">
            {/* Left: breadcrumb + title */}
            <div className="min-w-0">
                {/* <nav
                    aria-label="Breadcrumb"
                    className="flex items-center gap-1 text-[11px] font-medium text-slate-400"
                >
                    <span>Workspace</span>
                    {crumbs.map((crumb, i) => (
                        <span key={`${crumb}-${i}`} className="flex items-center gap-1">
                            <ChevronRight size={12} />
                            <span
                                className={
                                    i === crumbs.length - 1 ? "text-[#7138D5]" : ""
                                }
                            >
                                {crumb}
                            </span>
                        </span>
                    ))}
                </nav> */}

                <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-[#281344]">
                        {pageTitle}
                    </p>
                    <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 sm:inline-flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Live
                    </span>
                </div>
            </div>

            {/* Center: search */}
            {/* <form
                onSubmit={handleSearch}
                className="relative hidden max-w-md flex-1 md:block"
            >
                <Search
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                    ref={searchRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search ideas, reports, markets…"
                    className="h-10 w-full rounded-lg border border-purple-100 bg-purple-50/40 pl-9 pr-16 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#7138D5] focus:bg-white focus:ring-4 focus:ring-[#7138D5]/10"
                />
                {query ? (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    >
                        <X size={15} />
                    </button>
                ) : (
                    <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-purple-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
                        ⌘K
                    </kbd>
                )}
            </form> */}

            {/* Right: actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Credits chip */}
                {typeof credits === "number" && (
                    <button
                        type="button"
                        onClick={onTopUp}
                        title="Top up credits"
                        className="hidden items-center gap-1.5 rounded-lg border border-purple-100 bg-purple-50/60 px-3 py-2 text-xs font-semibold text-[#281344] transition hover:border-purple-300 hover:bg-purple-50 sm:flex"
                    >
                        <Coins size={14} className="text-[#9326D5]" />
                        {credits.toLocaleString()}
                        <span className="font-medium text-slate-500">credits</span>
                    </button>
                )}

                {/* Primary CTA */}
                {/* <Link
                    href="/validate-idea"
                    className="flex h-9 items-center gap-1.5 rounded-lg bg-linear-to-r from-[#7138D5] to-[#9326D5] px-3 text-sm font-semibold text-white shadow-md shadow-purple-500/20 transition hover:brightness-110 active:scale-[0.98]"
                >
                    <Plus size={16} strokeWidth={2.5} />
                    <span className="hidden sm:inline">New Idea</span>
                </Link> */}

                <div className="mx-1 hidden h-6 w-px bg-purple-100 sm:block" />

                {/* Help */}
                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-purple-50 hover:text-[#7138D5]"
                    aria-label="Help"
                    title="Help"
                >
                    <HelpCircle size={19} />
                </button>

                {/* Notifications */}
                <div ref={notifRef} className="relative">
                    <button
                        type="button"
                        onClick={() => setNotifOpen((p) => !p)}
                        aria-label="Notifications"
                        aria-expanded={notifOpen}
                        className={`relative flex h-9 w-9 items-center justify-center rounded-lg transition ${
                            notifOpen
                                ? "bg-purple-50 text-[#7138D5]"
                                : "text-slate-500 hover:bg-purple-50 hover:text-[#7138D5]"
                        }`}
                    >
                        <Bell size={19} />
                        {unreadCount > 0 && (
                            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF4D83] px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {notifOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                transition={{ duration: 0.16 }}
                                className="absolute right-0 top-full mt-2 w-80 origin-top-right overflow-hidden rounded-xl border border-purple-100 bg-white shadow-2xl shadow-purple-900/15"
                            >
                                <div className="flex items-center justify-between border-b border-purple-100 px-4 py-3">
                                    <p className="text-sm font-semibold text-[#281344]">
                                        Notifications
                                    </p>
                                    <button
                                        type="button"
                                        onClick={markAllRead}
                                        disabled={unreadCount === 0}
                                        className="flex items-center gap-1 text-xs font-medium text-[#7138D5] transition hover:text-[#9326D5] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <CheckCheck size={14} />
                                        Mark all read
                                    </button>
                                </div>

                                <div className="max-h-80 overflow-y-auto">
                                    {items.length === 0 ? (
                                        <p className="px-4 py-8 text-center text-sm text-slate-400">
                                            You&apos;re all caught up.
                                        </p>
                                    ) : (
                                        items.map((n) => {
                                            const Icon = n.icon;
                                            return (
                                                <div
                                                    key={n.id}
                                                    className={`flex gap-3 px-4 py-3 transition hover:bg-purple-50/60 ${
                                                        n.unread ? "bg-purple-50/30" : ""
                                                    }`}
                                                >
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-[#7138D5]">
                                                        {Icon && <Icon size={15} />}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <p className="text-[13px] font-semibold text-[#281344]">
                                                                {n.title}
                                                            </p>
                                                            {n.unread && (
                                                                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#FF4D83]" />
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-slate-500">
                                                            {n.desc}
                                                        </p>
                                                        <p className="mt-1 text-[10px] font-medium text-slate-400">
                                                            {n.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}