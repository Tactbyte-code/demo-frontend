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
    Zap,
    Clock,
    CreditCard,
    TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import UserProfileButton from '@/components/ui/UserProfileButton';
import { auth } from '@/lib/firebase';
import { useSidebarStore } from '@/context/useSidebarStore';

export default function DashboardLayout({ children }) {

    const pathname = usePathname();
    const { sidebarOpen, setSidebarOpen, toggleSidebar } = useSidebarStore();
    const [userPlan, setUserPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

    const creditsRemaining = userPlan?.credits_remaining ?? 0;
    const creditsTotal = userPlan?.credits_total ?? 0;
    const expiresInDays = userPlan?.expires_in_days ?? 0;
    const planName = userPlan?.plan ?? null;
    const percentage = creditsTotal > 0 ? (creditsRemaining / creditsTotal) * 100 : 0;
    const isLow = creditsTotal > 0 && percentage <= 20 && creditsRemaining > 0;
    const isEmpty = creditsRemaining === 0;
    const hasNoPlan = !planName;

    return (
        <div
            className="flex h-screen overflow-hidden font-sans"
            style={{ backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
        >
            {/* ── SIDEBAR ── */}
            <AnimatePresence initial={false}>
                {sidebarOpen && (
                    <motion.aside
                        key="sidebar"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 260, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                        className="shrink-0 overflow-hidden flex flex-col"
                        style={{
                            backgroundColor: 'var(--sidebar-bg)',
                            borderRight: '1px solid var(--sidebar-border)',
                        }}
                    >
                        <div className="w-65 flex flex-col h-full">
                            {/* Brand */}
                            <div className="px-6 pt-7 pb-5">
                                <Link href="/" className="flex items-center gap-3 mb-8 no-underline group">
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                            boxShadow: '0 4px 12px color-mix(in srgb, var(--primary) 30%, transparent)',
                                        }}
                                    >
                                        <Zap className="w-4 h-4 fill-white text-white" />
                                    </div>
                                    <div>
                                        <p className="text-base font-black tracking-tighter leading-none" style={{ color: 'var(--text-main)' }}>
                                            DEMO
                                        </p>
                                        <p className="text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5" style={{ color: 'var(--primary)' }}>
                                            Intelligence
                                        </p>
                                    </div>
                                </Link>

                                <NavGroup label="General" items={mainItems} pathname={pathname} />
                                <div className="mt-7">
                                    <NavGroup label="Intelligence Engines" items={engineItems} pathname={pathname} />
                                </div>
                            </div>

                            {/* Bottom */}
                            <div className="mt-auto px-6 py-5 space-y-4" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
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

            {/* ── MAIN ── */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <div className="flex items-center justify-between h-17.5 px-5 shrink-0 bg-sidebar border-b border-sidebar-border">

                    {/* Left */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer border border-border-solid text-subtle hover:bg-sidebar-hover hover:text-foreground hover:border-primary"
                        >
                            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                        </button>
                        <div className="w-px h-4 bg-border-solid" />
                        <span className="text-[16px] font-bold text-muted">
                            {[...engineItems, ...mainItems].find(i => i.href === pathname)?.name || "Dashboard"}
                        </span>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">

                        {loading && (
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-48 rounded-2xl bg-surface-raised animate-pulse" />
                                <div className="h-8 w-20 rounded-xl bg-surface-raised animate-pulse" />
                            </div>
                        )}

                        {!loading && hasNoPlan && (
                            <motion.div
                                animate={{ scale: [1, 1.03, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Link
                                    href="/pricing"
                                    className="relative flex items-center gap-2 px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(135deg, #b8860b, #ffd700, #daa520, #ffd700, #b8860b)',
                                        backgroundSize: '200% 200%',
                                        color: '#3d2b00',
                                        boxShadow: '0 0 20px rgba(255, 215, 0, 0.4), 0 2px 8px rgba(184, 134, 11, 0.5)',
                                    }}
                                >
                                    <motion.div
                                        className="absolute inset-0"
                                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)' }}
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                                    />
                                    <CreditCard className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10 text-[13px] tracking-wider font-bold">Buy a Plan</span>
                                </Link>
                            </motion.div>
                        )}

                        {!loading && !hasNoPlan && (
                            <div
                                className="flex items-center gap-3 px-4 py-2 rounded-xl border transition-all"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: isEmpty ? 'var(--destructive)' : isLow ? 'var(--warning)' : 'var(--glass-border)',
                                }}
                            >
                                <div
                                    className="px-2 py-2 rounded-full text-[10px] font-bold uppercase bg-info-bg"
                                    style={{ color: 'var(--primary)' }}
                                >
                                    {planName}
                                </div>
                                <div className="w-px h-4 bg-border-solid" />
                                <div className="flex flex-row items-center gap-1.5">
                                    <Zap className={`w-3.5 h-3.5 ${isEmpty ? 'text-destructive' : isLow ? 'text-warning' : 'text-primary'}`} />
                                    <span className="text-xs font-bold text-foreground">{creditsRemaining.toLocaleString()}</span>
                                    <span className="text-xs font-medium text-muted">/ {creditsTotal.toLocaleString()}</span>
                                </div>
                                <div className="w-16 h-1.5 rounded-full bg-surface-raised overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{ backgroundColor: isEmpty ? 'var(--destructive)' : isLow ? 'var(--warning)' : 'var(--primary)' }}
                                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                {isEmpty && (
                                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-destructive-bg text-destructive">
                                        Empty
                                    </span>
                                )}
                                {isLow && (
                                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-warning-bg text-warning">
                                        Low
                                    </span>
                                )}
                                <div className="w-px h-4 bg-border-solid" />
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3 h-3 text-primary" />
                                    <span className="text-[11px] font-semibold text-main">{expiresInDays}d left</span>
                                </div>
                            </div>
                        )}

                        {!loading && !hasNoPlan && (isEmpty || isLow) && (
                            <motion.div
                                animate={{ scale: [1, 1.03, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Link
                                    href="/pricing"
                                    className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest text-white overflow-hidden"
                                    style={{
                                        background: isEmpty
                                            ? 'linear-gradient(135deg, var(--destructive), var(--warning))'
                                            : 'linear-gradient(135deg, var(--warning), var(--primary))',
                                        boxShadow: isEmpty
                                            ? '0 0 16px color-mix(in srgb, var(--destructive) 30%, transparent)'
                                            : '0 0 16px color-mix(in srgb, var(--warning) 30%, transparent)',
                                    }}
                                >
                                    <motion.div
                                        className="absolute inset-0 opacity-30"
                                        style={{ background: 'linear-gradient(90deg, transparent, white, transparent)' }}
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                                    />
                                    <TrendingUp className="w-3.5 h-3.5 relative z-10" />
                                    <span className="relative z-10">{isEmpty ? 'Buy Credits' : 'Top Up'}</span>
                                </Link>
                            </motion.div>
                        )}

                        <div className="rounded-full bg-foreground/85">
                            <UserProfileButton />
                        </div>
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

function NavGroup({ label, items, pathname }) {
    return (
        <div>
            <p className="px-1 text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 font-mono" style={{ color: 'var(--sidebar-muted)' }}>
                {label}
            </p>
            <nav className="flex flex-col gap-2">
                {items.map(item => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all no-underline group"
                            style={{
                                backgroundColor: isActive ? 'var(--sidebar-item-active-bg)' : 'transparent',
                                color: isActive ? 'var(--sidebar-item-active-text)' : 'var(--text-muted)',
                                border: isActive
                                    ? '1px solid color-mix(in srgb, var(--primary) 25%, transparent)'
                                    : '1px solid transparent',
                            }}
                            onMouseEnter={e => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'var(--sidebar-item-hover)';
                                    e.currentTarget.style.color = 'var(--text-main)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isActive) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = 'var(--text-muted)';
                                }
                            }}
                        >
                            <div className="flex items-center gap-2.5">
                                <item.icon className="w-4 h-4" style={{ color: isActive ? 'var(--sidebar-item-active-text)' : 'var(--sidebar-main)' }} />
                                <span className="tracking-tight text-muted">{item.name}</span>
                            </div>
                            {isActive
                                ? <CircleDot className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                                : <ChevronRight className="w-3 h-3 -translate-x-1 group-hover:translate-x-0 transition-transform" style={{ color: 'var(--border-solid)' }} />
                            }
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};