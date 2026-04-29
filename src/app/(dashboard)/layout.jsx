"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
    LayoutDashboard,
    ChevronRight,
    CircleDot,
    PanelLeftClose,
    PanelLeftOpen,
    X,
    Search,
    Sparkles,
} from "lucide-react";
import { FaReddit } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import UserProfileButton from "@/components/ui/UserProfileButton";
import { auth } from "@/lib/firebase";
import { useSidebarStore } from "@/context/useSidebarStore";
import Image from "next/image";
import FeedbackModal from "@/components/shared/FeedbackModal";
import TicketChatPopup from "@/app/(dashboard)/tickets/page";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const { sidebarOpen, setSidebarOpen, toggleSidebar } = useSidebarStore();
    const [userPlan, setUserPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasUnread, setHasUnread] = useState(false);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setSidebarOpen]);

    useEffect(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    }, [pathname, setSidebarOpen]);

    // Wrap in useCallback so it can be listed as a stable dep below.
    // This also satisfies react-hooks/exhaustive-deps.
    const loadCredits = useCallback(async () => {
        try {
            const firebaseUser = auth.currentUser;
            if (!firebaseUser) return;
            const token = await firebaseUser.getIdToken();
            const res = await fetch(`${apiUrl}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) return;
            const data = await res.json();
            setUserPlan(data.plan ?? null);
        } catch (err) {
            console.error("Failed to fetch credits:", err);
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    // Wrap in async IIFE so setState is never called synchronously in the effect body.
    // Also include loadCredits in the dep array (now stable via useCallback).
    useEffect(() => {
        void (async () => {
            await loadCredits();
        })();
        window.addEventListener("userUpdated", loadCredits);
        return () => window.removeEventListener("userUpdated", loadCredits);
    }, [loadCredits]);

    const mainItems = [
        { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    ];

    const engineItems = [
        { name: "Reddit Analysis", icon: FaReddit, href: "/dashboard/reddit" },
        {
            name: "Playstore Analysis",
            icon: FaGooglePlay,
            href: "/dashboard/playstore",
        },
    ];

    const leadGenerationItems = [
        { name: "Lead Generation", icon: Search, beta: true },
    ];

    return (
        <div
            className="flex h-screen overflow-hidden font-sans relative"
            style={{
                backgroundColor: "var(--background)",
                color: "var(--text-main)",
            }}
        >
            {/* ── MOBILE BACKDROP ── */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* ── SIDEBAR ── */}
            <AnimatePresence initial={false}>
                {sidebarOpen && (
                    <motion.aside
                        key="sidebar"
                        initial={{ x: -260, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -260, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="fixed lg:relative z-50 h-full shrink-0 overflow-hidden flex flex-col shadow-2xl lg:shadow-none"
                        style={{
                            width: 260,
                            backgroundColor: "var(--sidebar-bg)",
                            borderRight: "1px solid var(--sidebar-border)",
                        }}
                    >
                        <div className="w-65 flex flex-col h-full">
                            {/* Brand & Mobile Close */}
                            <div className="px-4 pt-7 pb-5">
                                <div className="flex justify-end mb-4 lg:hidden">
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="p-1 text-muted border border-border hover:bg-sidebar-hover transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Logo */}
                                <div className="mb-8">
                                    <Link
                                        href="/"
                                        className="relative inline-block no-underline group"
                                    >
                                        {/* Logo */}
                                        <div className="relative h-14 w-40">
                                            <Image
                                                src="/images/logo_with_text_2.png"
                                                alt="Logo"
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </div>

                                        {/* 🔥 Beta Badge (top-left attached) */}
                                        <span
                                            className="absolute -top-3.5 -left-0 flex bg-green-300 items-center gap-1 px-2 py-1 text-[9px] text-black tracking-wide font-bold uppercase border border-border"
                                        >
                                            <Sparkles className="w-3 h-3" />
                                            Beta
                                        </span>
                                    </Link>
                                </div>

                                <NavGroup
                                    label="General"
                                    items={mainItems}
                                    pathname={pathname}
                                />

                                <div className="mt-7">
                                    <NavGroup
                                        label="Intelligence Engines"
                                        items={engineItems}
                                        pathname={pathname}
                                    />
                                </div>

                                <div className="mt-7">
                                    <NavGroup
                                        label="Keyword Search"
                                        items={leadGenerationItems}
                                        pathname={pathname}
                                    />
                                </div>
                            </div>

                            {/* ── Bottom section ── */}
                            <div
                                className="mt-auto px-4 py-5 space-y-3"
                                style={{ borderTop: "1px solid var(--sidebar-border)" }}
                            >
                                {/* Support / ticket popup trigger */}
                                <TicketChatPopup
                                    hasUnread={hasUnread}
                                    setHasUnread={setHasUnread}
                                />

                                {/* Made in India */}
                                <div className="flex items-center gap-2 px-1 pt-1">
                                    <span className="relative flex h-2 w-2">
                                        <span
                                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                                            style={{ backgroundColor: "var(--success)" }}
                                        />
                                        <span
                                            className="relative inline-flex h-2 w-2 rounded-full"
                                            style={{ backgroundColor: "var(--success)" }}
                                        />
                                    </span>
                                    <span
                                        className="text-[9px] font-bold uppercase tracking-[0.18em] font-mono"
                                        style={{ color: "var(--sidebar-muted)" }}
                                    >
                                        Made in India with ❤️
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 flex flex-col overflow-hidden bg-surface">
                {/* Topbar */}
                <div className="flex items-center justify-between h-16 md:h-17.5 px-4 md:px-5 shrink-0 bg-sidebar border-b border-sidebar-border">
                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            onClick={toggleSidebar}
                            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                            className="flex items-center justify-center w-9 h-9 md:w-8 md:h-8 transition-colors cursor-pointer border border-border-solid text-subtle hover:bg-sidebar-hover hover:text-foreground hover:border-primary rounded-md"
                        >
                            {sidebarOpen ? (
                                <PanelLeftClose className="w-4 h-4" />
                            ) : (
                                <PanelLeftOpen className="w-4 h-4" />
                            )}
                        </button>

                        <div className="w-px h-4 bg-border-solid hidden sm:block" />

                        <span className="text-[14px] md:text-[16px] font-bold text-muted truncate max-w-35 md:max-w-none">
                            {[...engineItems, ...mainItems].find((i) => i.href === pathname)
                                ?.name || "Dashboard"}
                        </span>
                    </div>

                    <UserProfileButton />
                </div>

                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>

            <FeedbackModal />
        </div>
    );
}

// ─── NavGroup ─────────────────────────────────────────────────────────────────
function NavGroup({ label, items, pathname }) {
    return (
        <div>
            {/* LABEL ROW */}
            <div className="flex items-center justify-between mb-1.5 px-1">
                <p
                    className="text-xs font-semibold uppercase tracking-wide font-mono text-sidebar-muted"
                    // style={{ color: "var(--sidebar-muted)" }}
                >
                    {label}
                </p>

                {label === "Keyword Search" && (
                    <span
                        className="text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5"
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, #f59e0b 15%, transparent)",
                            color: "#f59e0b",
                            border:
                                "1px solid color-mix(in srgb, #f59e0b 30%, transparent)",
                        }}
                    >
                        Coming Soon
                    </span>
                )}
            </div>

            <nav className="flex flex-col gap-2">
                {items.map((item) => {
                    const isActive = pathname === item.href;

                    if (item.beta) {
                        return (
                            <div
                                key={item.name}
                                className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold cursor-not-allowed select-none rounded-md"
                                style={{
                                    backgroundColor: "transparent",
                                    color: "var(--text-muted)",
                                    border: "1px dashed var(--sidebar-border)",
                                    opacity: 0.65,
                                }}
                            >
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <item.icon
                                        className="w-4 h-4 shrink-0"
                                        style={{ color: "var(--sidebar-main)" }}
                                    />
                                    <span className="tracking-tight truncate">
                                        {item.name}
                                    </span>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold transition-all no-underline group"
                            style={{
                                backgroundColor: isActive
                                    ? "var(--sidebar-item-active-bg)"
                                    : "transparent",
                                color: isActive
                                    ? "var(--sidebar-item-active-text)"
                                    : "var(--text-muted)",
                                border: isActive
                                    ? "1px solid color-mix(in srgb, var(--primary) 25%, transparent)"
                                    : "1px solid transparent",
                            }}
                        >
                            <div className="flex items-center gap-2.5">
                                <item.icon
                                    className="w-5 h-5"
                                    style={{
                                        color:
                                            item.name === "Reddit Analysis"
                                                ? "#FF4500"
                                                : item.name === "Playstore Analysis"
                                                    ? "#4285F4"
                                                    : isActive
                                                        ? "var(--sidebar-item-active-text)"
                                                        : "var(--sidebar-main)",
                                    }}
                                />
                                <span className="tracking-tight">{item.name}</span>
                            </div>

                            {isActive ? (
                                <CircleDot
                                    className="w-3 h-3"
                                    style={{ color: "var(--accent)" }}
                                />
                            ) : (
                                <ChevronRight
                                    className="w-3 h-3 -translate-x-1 group-hover:translate-x-0 transition-transform"
                                    style={{ color: "var(--border-solid)" }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
