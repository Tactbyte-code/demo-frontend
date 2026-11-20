
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    Bell,
    HelpCircle,
    Coins,
    CheckCheck,
    Sparkles,
    FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLE_NOTIFICATIONS = [
    {
        id: 1,
        icon: Sparkles,
        title: "Play Store analysis ready",
        desc: "Your latest app analysis report has finished generating.",
        time: "2m ago",
        unread: true,
    },
    {
        id: 2,
        icon: FileText,
        title: "New review insights added",
        desc: "Fresh user review insights are available for your analyzed app.",
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

export default function PlaystoreWorkspaceTopbar({
    credits,
    onTopUp,
    notifications = SAMPLE_NOTIFICATIONS,
}) {
    const pathname = usePathname();
    const router = useRouter();

    const notifRef = useRef(null);

    const [notifOpen, setNotifOpen] = useState(false);
    const [items, setItems] = useState(notifications);

    useClickOutside(notifRef, () => setNotifOpen(false));

    useEffect(() => {
        const onKey = (e) => {
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

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[#DCEBE0] bg-white/90 px-5 backdrop-blur-md sm:px-8">
            {/* Left: page title */}
            <div className="min-w-0">
                <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-[#142B1B]">
                        {pageTitle}
                    </p>

                    <span className="hidden items-center gap-1.5 rounded-full bg-[#E5F5E9] px-2 py-0.5 text-[10px] font-semibold text-[#188038] sm:inline-flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
                        Live
                    </span>
                </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Credits chip */}
                {typeof credits === "number" && (
                    <button
                        type="button"
                        onClick={onTopUp}
                        title="Top up credits"
                        className="hidden items-center gap-1.5 rounded-lg border border-[#DCEBE0] bg-[#F8FCF9] px-3 py-2 text-xs font-semibold text-[#142B1B] transition hover:border-[#34A853] hover:bg-[#E5F5E9] sm:flex"
                    >
                        <Coins size={14} className="text-[#188038]" />
                        {credits.toLocaleString()}
                        <span className="font-medium text-[#718477]">
                            credits
                        </span>
                    </button>
                )}

                <div className="mx-1 hidden h-6 w-px bg-[#DCEBE0] sm:block" />

                {/* Help */}
                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[#718477] transition hover:bg-[#E5F5E9] hover:text-[#188038]"
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
                                ? "bg-[#E5F5E9] text-[#188038]"
                                : "text-[#718477] hover:bg-[#E5F5E9] hover:text-[#188038]"
                        }`}
                    >
                        <Bell size={19} />

                        {unreadCount > 0 && (
                            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#EA4335] px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
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
                                className="absolute right-0 top-full mt-2 w-80 origin-top-right overflow-hidden rounded-xl border border-[#DCEBE0] bg-white shadow-2xl shadow-[#142B1B]/10"
                            >
                                <div className="flex items-center justify-between border-b border-[#DCEBE0] px-4 py-3">
                                    <p className="text-sm font-semibold text-[#142B1B]">
                                        Notifications
                                    </p>

                                    <button
                                        type="button"
                                        onClick={markAllRead}
                                        disabled={unreadCount === 0}
                                        className="flex items-center gap-1 text-xs font-medium text-[#188038] transition hover:text-[#146C2E] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <CheckCheck size={14} />
                                        Mark all read
                                    </button>
                                </div>

                                <div className="max-h-80 overflow-y-auto">
                                    {items.length === 0 ? (
                                        <p className="px-4 py-8 text-center text-sm text-[#718477]">
                                            You&apos;re all caught up.
                                        </p>
                                    ) : (
                                        items.map((n) => {
                                            const Icon = n.icon;

                                            return (
                                                <div
                                                    key={n.id}
                                                    className={`flex gap-3 px-4 py-3 transition hover:bg-[#F8FCF9] ${
                                                        n.unread
                                                            ? "bg-[#F8FCF9]"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E5F5E9] text-[#188038]">
                                                        {Icon && <Icon size={15} />}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <p className="text-[13px] font-semibold text-[#142B1B]">
                                                                {n.title}
                                                            </p>

                                                            {n.unread && (
                                                                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#34A853]" />
                                                            )}
                                                        </div>

                                                        <p className="text-xs text-[#718477]">
                                                            {n.desc}
                                                        </p>

                                                        <p className="mt-1 text-[10px] font-medium text-[#718477]">
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
