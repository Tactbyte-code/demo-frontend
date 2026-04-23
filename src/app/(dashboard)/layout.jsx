"use client";

import React, { useEffect, useState } from 'react';
import {
    LayoutDashboard,
    Database,
    Globe,
    ChevronRight,
    CircleDot,
    PanelLeftClose,
    PanelLeftOpen,
    X,
    Search,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import UserProfileButton from '@/components/ui/UserProfileButton';
import { auth } from '@/lib/firebase';
import { useSidebarStore } from '@/context/useSidebarStore';
import Image from 'next/image';

export default function DashboardLayout({ children }) {

    const pathname = usePathname();
    const { sidebarOpen, setSidebarOpen, toggleSidebar } = useSidebarStore();
    const [userPlan, setUserPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // --- RESPONSIVE LOGIC ---
    useEffect(() => {
        const handleResize = () => {
            // Collapse sidebar by default on mobile/tablet (less than 1024px)
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        // Initialize on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setSidebarOpen]);

    // Auto-close sidebar when navigating on mobile
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    }, [pathname, setSidebarOpen]);

    const loadCredits = async () => {
        try {
            const firebaseUser = auth.currentUser;
            if (!firebaseUser) return;
            const token = await firebaseUser.getIdToken();
            const res = await fetch(`${apiUrl}/auth/me`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!res.ok) return;
            const data = await res.json();
            setUserPlan(data.plan ?? null);
        } catch (err) {
            console.error("Failed to fetch credits:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCredits();
        window.addEventListener("userUpdated", loadCredits);
        return () => window.removeEventListener("userUpdated", loadCredits);
    }, []);

    const mainItems = [
        { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    ];

    const engineItems = [
        { name: 'Playstore Analysis', icon: Globe, href: '/dashboard/playstore' },
        { name: 'Reddit Analysis', icon: Database, href: '/dashboard/reddit' },
    ];

    const leadGenerationItems = [
        { name: 'Keyword search', icon: Search, beta: true },
    ];

    return (
        <div
            className="flex h-screen overflow-hidden font-sans relative"
            style={{ backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
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
                            backgroundColor: 'var(--sidebar-bg)',
                            borderRight: '1px solid var(--sidebar-border)',
                        }}
                    >
                        <div className="w-[260px] flex flex-col h-full">
                            {/* Brand & Mobile Close */}
                            <div className="px-4 pt-7 pb-5">
                                <div className="flex items-center justify-between mb-8">
                                    <Link href="/" className="flex items-center no-underline group">
                                        <div className="relative h-10 w-40">
                                            <Image
                                                src="/images/logo_with_text_2.png"
                                                alt="Logo"
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="lg:hidden p-1 text-muted border border-border hover:bg-sidebar-hover transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <NavGroup label="General" items={mainItems} pathname={pathname} />

                                <div className="mt-7">
                                    <NavGroup label="Intelligence Engines" items={engineItems} pathname={pathname} />
                                </div>

                                <div className="mt-7">
                                    <NavGroup label="Lead Generation" items={leadGenerationItems} pathname={pathname} />
                                </div>
                            </div>

                            {/* Bottom Identity */}
                            <div className="mt-auto px-6 py-5" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
                                <div className="flex items-center gap-2 px-1">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: 'var(--success)' }} />
                                        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--success)' }} />
                                    </span>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] font-mono" style={{ color: 'var(--sidebar-muted)' }}>
                                        Made in India with ❤️
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* ── MAIN CONTENT AREA ── */}
            <div className="flex-1 flex flex-col overflow-hidden bg-surface">

                {/* Topbar */}
                <div className="flex items-center justify-between h-16 md:h-17.5 px-4 md:px-5 shrink-0 bg-sidebar border-b border-sidebar-border">

                    {/* Left: Toggle & Title */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            onClick={toggleSidebar}
                            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                            className="flex items-center justify-center w-9 h-9 md:w-8 md:h-8 transition-colors cursor-pointer border border-border-solid text-subtle hover:bg-sidebar-hover hover:text-foreground hover:border-primary rounded-md"
                        >
                            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                        </button>

                        <div className="w-px h-4 bg-border-solid hidden sm:block" />

                        <span className="text-[14px] md:text-[16px] font-bold text-muted truncate max-w-[140px] md:max-w-none">
                            {[...engineItems, ...mainItems].find(i => i.href === pathname)?.name || "Dashboard"}
                        </span>
                    </div>

                    {/* Right: Profile */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-foreground/85">
                            <UserProfileButton />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

function NavGroup({ label, items, pathname }) {
    return (
        <div>
            <p className="px-1 text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 font-mono" style={{ color: 'var(--sidebar-muted)' }}>
                {label}
            </p>
            <nav className="flex flex-col gap-2">
                {items.map(item => {
                    const isActive = pathname === item.href;

                    // 🔹 BETA ITEM (no routing)
                    if (item.beta) {
                        return (
                            <div
                                key={item.name}
                                className="flex mt-2 items-center justify-between px-3 py-2.5 text-sm font-semibold cursor-not-allowed select-none"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'var(--text-muted)',
                                    border: '1px dashed var(--sidebar-border)',
                                    opacity: 0.6,
                                }}
                            >
                                <div className="flex items-center gap-2.5">
                                    <item.icon
                                        className="w-4 h-4"
                                        style={{ color: 'var(--sidebar-main)' }}
                                    />
                                    <span className="tracking-tight">{item.name}</span>
                                </div>

                                {/* Beta badge */}
                                <span
                                    className="text-[9px] font-bold px-2 py-0.5 bg-yellow-300 text-black border border-black"
                                    style={{
                                        // border: '1px solid var(--accent)',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    BETA
                                </span>
                            </div>
                        );
                    }

                    // 🔹 NORMAL LINK
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold transition-all no-underline group"
                            style={{
                                backgroundColor: isActive ? 'var(--sidebar-item-active-bg)' : 'transparent',
                                color: isActive ? 'var(--sidebar-item-active-text)' : 'var(--text-muted)',
                                border: isActive
                                    ? '1px solid color-mix(in srgb, var(--primary) 25%, transparent)'
                                    : '1px solid transparent',
                            }}
                        >
                            <div className="flex items-center gap-2.5">
                                <item.icon
                                    className="w-4 h-4"
                                    style={{
                                        color: isActive
                                            ? 'var(--sidebar-item-active-text)'
                                            : 'var(--sidebar-main)'
                                    }}
                                />
                                <span className="tracking-tight">{item.name}</span>
                            </div>

                            {isActive ? (
                                <CircleDot className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                            ) : (
                                <ChevronRight
                                    className="w-3 h-3 -translate-x-1 group-hover:translate-x-0 transition-transform"
                                    style={{ color: 'var(--border-solid)' }}
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}