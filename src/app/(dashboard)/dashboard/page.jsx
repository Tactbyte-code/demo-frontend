"use client";

import React, { useEffect, useState, useRef } from 'react';
import {
    TrendingUp, ArrowUpRight, RefreshCcw,
    MessageSquare, Star, Zap, CheckCircle2,
    Clock, XCircle, Activity, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import JobRow from '@/components/ui/JobRow';
import { getToken } from '@/utils/getToken';

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// stat card
function StatCard({ label, value, icon: Icon, colorClass, bgClass, delta, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            className="bg-surface border border-border-solid rounded-2xl p-5 flex flex-col gap-3 shadow-sm"
        >
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono text-subtle">{label}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${bgClass}`}>
                    <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
                </div>
            </div>
            <div className="flex items-end justify-between">
                <span className={`text-3xl font-black tracking-tight leading-none ${colorClass}`}>{value ?? '—'}</span>
                {delta != null && (
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${delta >= 0 ? 'text-success bg-success-bg' : 'text-destructive bg-destructive-bg'}`}>
                        {delta >= 0 ? '+' : ''}{delta}%
                    </span>
                )}
            </div>
        </motion.div>
    );
};

// ── TABS ──────────────────────────────────────────────
const TABS = [
    { id: 'reddit', label: 'Reddit', icon: MessageSquare },
    { id: 'playstore', label: 'Playstore Review', icon: Star },
];

// ── EMPTY STATE ───────────────────────────────────────
function EmptyState({ href, cta }) {
    return (
        <tr>
            <td colSpan={4}>
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                    <div className="p-4 rounded-full border border-border-solid">
                        <TrendingUp className="w-5 h-5 text-subtle" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-foreground">No jobs yet</p>
                        <p className="text-xs text-muted">Start by running your first query</p>
                    </div>
                    <Link
                        href={href}
                        className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-primary shadow-sm transition-all hover:opacity-90"
                    >
                        {cta} <ArrowUpRight className="w-3 h-3" />
                    </Link>
                </div>
            </td>
        </tr>
    );
}

// ── JOBS TABLE ────────────────────────────────────────
function JobsTable({ jobs, loading }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-border-solid bg-surface">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border-solid">
                        {['Query', 'Date', 'Status', 'Action'].map(h => (
                            <th key={h} className="px-5 py-3.5 text-left text-[10px] font-black font-mono uppercase tracking-widest text-subtle">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {!loading && jobs.map((job, i) => (
                        <motion.tr
                            key={job.id}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                        // JobRow renders a <tr> — pass as component if needed, else keep as-is
                        >
                        </motion.tr>
                    ))}
                    {/* Render actual JobRows (tr elements) */}
                    {!loading && jobs.map(job => <JobRow key={job.id} job={job} />)}

                    {loading && jobs.length === 0 && (
                        <tr>
                            <td colSpan={4} className="p-10 text-center text-xs text-muted">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                    Syncing engine data…
                                </div>
                            </td>
                        </tr>
                    )}

                    {!loading && jobs.length === 0 && (
                        <EmptyState href="/dashboard/reddit-analysis" cta="Start New Query" />
                    )}
                </tbody>
            </table>
        </div>
    );
}

// ── PLAYSTORE PLACEHOLDER ─────────────────────────────
function PlaystoreComingSoon() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border-solid bg-surface flex flex-col items-center justify-center py-20 gap-5"
        >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-info-bg border border-primary/20">
                <Star className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
                <p className="text-sm font-bold text-foreground mb-1">Playstore Review Analysis</p>
                <p className="text-xs text-muted max-w-xs">
                    App Store review intelligence is coming soon. You'll be able to track sentiment, ratings trends and user feedback from Google Play.
                </p>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.25em] font-mono px-3 py-1.5 rounded-full bg-warning-bg text-warning border border-warning/20">
                Coming Soon
            </span>
        </motion.div>
    );
}

// ── ACTIVITY FEED ─────────────────────────────────────
function ActivityFeed({ jobs }) {
    const recent = [...jobs]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    const iconMap = {
        COMPLETED: { Icon: CheckCircle2, color: 'text-success', bg: 'bg-success-bg' },
        FAILED: { Icon: XCircle, color: 'text-destructive', bg: 'bg-destructive-bg' },
        PROCESSING: { Icon: Activity, color: 'text-primary', bg: 'bg-info-bg' },
        USER_PENDING: { Icon: Clock, color: 'text-warning', bg: 'bg-warning-bg' },
    };

    return (
        <div className="bg-surface border border-border-solid rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] font-mono text-subtle">Recent Activity</p>
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            </div>

            {recent.length === 0 ? (
                <p className="text-xs text-muted text-center py-4">No activity yet</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {recent.map((job, i) => {
                        const s = iconMap[job.status] || iconMap.PROCESSING;
                        return (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="flex items-center gap-3"
                            >
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                                    <s.Icon className={`w-3.5 h-3.5 ${s.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[12px] font-semibold text-foreground truncate">{job.query}</p>
                                    <p className="text-[10px] text-subtle font-mono">{formatDate(job.created_at)}</p>
                                </div>
                                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full font-mono ${s.bg} ${s.color}`}>
                                    {job.status === 'USER_PENDING' ? 'Pending' : job.status.charAt(0) + job.status.slice(1).toLowerCase()}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ── QUICK ACTIONS ─────────────────────────────────────
function QuickActions() {
    const actions = [
        { label: 'New Reddit Scan', href: '/dashboard/reddit-analysis', icon: MessageSquare, color: 'text-primary', bg: 'bg-info-bg' },
        { label: 'View App Analysis', href: '/dashboard/app-analysis', icon: Star, color: 'text-warning', bg: 'bg-warning-bg' },
        // { label: 'Browse History', href: '/dashboard/history', icon: Clock, color: 'text-muted', bg: 'bg-surface-raised' },
    ];

    return (
        <div className="bg-surface border border-border-solid rounded-2xl p-5 flex flex-col gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] font-mono text-subtle">Quick Actions</p>
            <div className="flex flex-col gap-2">
                {actions.map(({ label, href, icon: Icon, color, bg }) => (
                    <Link
                        key={label}
                        href={href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border-solid bg-surface-card hover:border-primary/40 hover:bg-info-bg transition-all group"
                    >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bg}`}>
                            <Icon className={`w-3.5 h-3.5 ${color}`} />
                        </div>
                        <span className="text-[12px] font-semibold text-foreground flex-1">{label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-subtle group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>
                ))}
            </div>
        </div>
    );
}

// ── MAIN DASHBOARD ─────────────────────────────────────
export default function DashboardPage() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [activeTab, setActiveTab] = useState('reddit');

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const isFetchingRef = useRef(false);
    const jobsRef = useRef([]);

    useEffect(() => { jobsRef.current = jobs; }, [jobs]);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) setUserId(JSON.parse(stored).id);
    }, []);

    async function fetchJobs(isSilent = false) {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        if (!isSilent) setLoading(true);
        try {
            const token = await getToken();

            const res = await fetch(`${apiUrl}/jobs`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
            setJobs(await res.json());
        } catch (err) {
            setError(err.message);
        } finally {
            isFetchingRef.current = false;
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!userId) return;
        fetchJobs();
        const interval = setInterval(() => {
            const hasActive = jobsRef.current.some(j => j.status === "PROCESSING" || j.status === "USER_PENDING");
            if (!hasActive || document.hidden) return;
            fetchJobs(true);
        }, 30000);
        return () => clearInterval(interval);
    }, [userId]);

    // Derived stats
    const total = jobs.length;
    const completed = jobs.filter(j => j.status === 'COMPLETED').length;
    const pending = jobs.filter(j => j.status === 'USER_PENDING' || j.status === 'PROCESSING').length;
    const failed = jobs.filter(j => j.status === 'FAILED').length;

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* HEADER */}
            <header className="sticky top-0 z-20 px-8 h-[52px] flex items-center justify-between bg-surface border-b border-border-solid">
                <div className="flex items-center gap-3">
                    <h1 className="text-sm font-bold text-foreground">Overview</h1>
                    <span className="text-border-solid">·</span>
                    <span className="text-[10px] font-mono text-subtle">
                        {total} {total === 1 ? 'job' : 'jobs'} total
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        <span className="text-[9px] font-mono text-subtle">LIVE POLLING</span>
                    </div>
                    <button
                        onClick={() => fetchJobs()}
                        className="p-1.5 rounded-lg border border-border-solid bg-surface-card hover:border-primary/40 transition-all"
                    >
                        <RefreshCcw className={`w-3 h-3 text-muted ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </header>

            <div className="px-8 py-8 flex flex-col gap-8">

                {/* STAT CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Jobs" value={total} icon={Activity} colorClass="text-primary" bgClass="bg-info-bg" delay={0} />
                    <StatCard label="Completed" value={completed} icon={CheckCircle2} colorClass="text-success" bgClass="bg-success-bg" delay={0.06} />
                    <StatCard label="In Progress" value={pending} icon={Clock} colorClass="text-warning" bgClass="bg-warning-bg" delay={0.12} />
                    <StatCard label="Failed" value={failed} icon={XCircle} colorClass="text-destructive" bgClass="bg-destructive-bg" delay={0.18} />
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">

                    {/* LEFT — TABS + TABLE */}
                    <div className="flex flex-col gap-4">

                        {/* Sliding tab bar */}
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-raised border border-border-solid w-fit">
                            {TABS.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className="relative flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold transition-all duration-200 cursor-pointer"
                                    style={{ color: activeTab === id ? 'var(--primary)' : 'var(--text-subtle)' }}
                                >
                                    {activeTab === id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 rounded-lg bg-surface shadow-sm border border-border-solid"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <Icon className="w-3.5 h-3.5 relative z-10" />
                                    <span className="relative z-10">{label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'reddit' ? (
                                <motion.div
                                    key="reddit"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <JobsTable jobs={jobs} loading={loading} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="playstore"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <PlaystoreComingSoon />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error banner */}
                        {error && (
                            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold bg-destructive-bg border border-destructive/20 text-destructive">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="flex flex-col gap-4">
                        <QuickActions />
                        <ActivityFeed jobs={jobs} />
                    </div>
                </div>
            </div>
        </div>
    );
}