"use client";

import React, { useEffect, useState, useRef } from "react";
import {
    MessageSquare,
    Star,
    CheckCircle2,
    Clock,
    XCircle,
    Activity,
    ChevronRight
} from "lucide-react";
import { FaReddit } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getToken } from "@/utils/getToken";
import RedditQueryHistoryTable from "./reddit/_components/RedditQueryHistoryTable";
import PlaystoreQueryHistoryTable from "./playstore/_components/PlaystoreQueryHistoryTable";

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

/* ── STAT CARD ───────────────────────── */
function StatCard({ label, value, icon: Icon, colorClass, bgClass, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            className="bg-surface border border-border p-5 flex flex-col gap-3 shadow-sm"
        >
            <div className="flex items-center justify-between">
                <span className="text-sm font-black uppercase tracking-wider font-mono text-muted">
                    {label}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-border-input ${bgClass}`}>
                    <Icon className={`w-3.5 h-3.5 ${colorClass}`} />
                </div>
            </div>

            <span className={`text-3xl font-black tracking-tight ${colorClass}`}>
                {value ?? "—"}
            </span>
        </motion.div>
    );
}

/* ── QUICK ACTIONS ───────────────────── */
function QuickActions({ isMobile = false }) {
    const actions = [
        {
            label: "Reddit Analyser",
            href: "/dashboard/reddit",
            icon: FaReddit,
            color: "#FF4500"
        },
        {
            label: "Playstore Analyser",
            href: "/dashboard/playstore",
            icon: FaGooglePlay,
            color: "#4285F4"
        }
    ];

    return (
        <div className={isMobile ? "w-full px-4 py-3 bg-background/80 backdrop-blur" : "bg-surface border border-border p-5"}>

            {/* ✅ Desktop Header */}
            {!isMobile && (
                <p className="text-xs font-black uppercase tracking-wider font-mono text-muted mb-3">
                    Quick Actions
                </p>
            )}

            <div
                className={
                    isMobile
                        ? "flex w-full gap-2"
                        : "flex flex-col gap-2"
                }
            >
                {actions.map(({ label, href, icon: Icon, color, bg }) => (
                    <Link
                        key={label}
                        href={href}
                        className={`
                            flex items-center gap-3 px-3 py-2.5 border border-border-input bg-surface-card hover:border-primary/40 hover:bg-info-bg transition-all group
                            ${isMobile ? "flex-1 justify-center" : ""}
                        `}
                    >
                        <Icon
                            className="w-5 h-5 shrink-0"
                            style={{ color }}
                        />

                        <span className="text-[12px] font-semibold whitespace-nowrap">
                            {label}
                        </span>

                        {!isMobile && (
                            <ChevronRight className="w-3.5 h-3.5 ml-auto text-subtle group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}

/* ── ACTIVITY FEED ───────────────────── */
function ActivityFeed({ jobs }) {
    const recent = [...jobs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

    const iconMap = {
        COMPLETED: { Icon: CheckCircle2, color: "text-success", bg: "bg-success-bg" },
        FAILED: { Icon: XCircle, color: "text-destructive", bg: "bg-destructive-bg" },
        PROCESSING: { Icon: Activity, color: "text-primary", bg: "bg-info-bg" },
        USER_PENDING: { Icon: Clock, color: "text-warning", bg: "bg-warning-bg" },
    };

    return (
        <div className="bg-surface border border-border rounded-none p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-wider font-mono text-muted">Recent Activity</p>
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            </div>

            {recent.length === 0 ? (
                <p className="text-xs text-muted text-center py-4">No activity yet</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {recent.map((job, i) => {
                        const s = iconMap[job.status] || iconMap.PROCESSING;
                        return (
                            <motion.div key={job.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 bg-surface-card px-4 py-2 border border-border">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${s.bg}`}>
                                    <s.Icon className={`w-3.5 h-3.5 ${s.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[12px] font-semibold text-foreground truncate">{job.query}</p>
                                    <p className="text-[10px] text-subtle font-mono">{formatDate(job.created_at)}</p>
                                </div>
                                {/* <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 border border-glass-border rounded-none font-mono ${s.bg} ${s.color}`}>
                                    {job.status === "USER_PENDING" ? "Pending" : job.status.charAt(0) + job.status.slice(1).toLowerCase()}
                                </span> */}
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/* ── TABS ───────────────────────────── */
const TABS = [
    { id: "reddit", label: "Reddit", icon: MessageSquare },
    { id: "playstore", label: "Playstore Review", icon: Star }
];

/* ── MAIN ───────────────────────────── */
export default function DashboardPage() {
    const [jobs, setJobs] = useState([]);
    const [activeTab, setActiveTab] = useState("reddit");
    const [userId, setUserId] = useState(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const jobsRef = useRef([]);
    const isFetchingRef = useRef(false);

    useEffect(() => {
        jobsRef.current = jobs;
    }, [jobs]);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUserId(JSON.parse(stored).id);
    }, []);

    async function fetchJobs() {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        try {
            const token = await getToken();
            const res = await fetch(`${apiUrl}/reddit/queries`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setJobs(await res.json());
        } catch (err) {
            console.log(err);
        } finally {
            isFetchingRef.current = false;
        }
    }

    useEffect(() => {
        if (!userId) return;
        fetchJobs();
    }, [userId]);

    const total = jobs.length;
    const completed = jobs.filter((j) => j.status === "COMPLETED").length;
    const pending = jobs.filter((j) => j.status !== "COMPLETED").length;
    const failed = jobs.filter((j) => j.status === "FAILED").length;

    return (
        <div className="min-h-screen bg-background text-foreground">

            <div className="xl:hidden sticky top-0 z-20 bg-background border-b border-border">
                <QuickActions isMobile />
            </div>

            {/* MAIN CONTENT */}
            <div className="px-4 md:px-8 py-6 flex flex-col gap-6">

                {/* STATS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Jobs" value={total} icon={Activity} colorClass="text-primary" bgClass="bg-info-bg" />
                    <StatCard label="Completed" value={completed} icon={CheckCircle2} colorClass="text-success" bgClass="bg-success-bg" />
                    <StatCard label="In Progress" value={pending} icon={Clock} colorClass="text-warning" bgClass="bg-warning-bg" />
                    <StatCard label="Failed" value={failed} icon={XCircle} colorClass="text-destructive" bgClass="bg-destructive-bg" />
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-6">

                    {/* LEFT — TABS + TABLE */}
                    <div className="flex flex-col gap-4">
                        {/* MOBILE: Activity Feed */}
                        <div className="xl:hidden">
                            <ActivityFeed jobs={jobs} />
                        </div>

                        {/* Sliding tab bar */}
                        <div className="flex items-center gap-1 p-1 rounded-none bg-surface-raised border border-border w-fit">
                            {TABS.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className="relative flex items-center gap-2 px-4 py-2 text-[11px] font-bold transition-all duration-200 cursor-pointer"
                                    style={{ color: activeTab === id ? "var(--primary)" : "var(--text-muted)" }}
                                >
                                    {activeTab === id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-surface-card shadow-sm border border-border-input"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <Icon className="w-3.5 h-3.5 relative z-10" />
                                    <span className="relative z-10">{label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <AnimatePresence mode="wait">
                            {activeTab === "reddit" ? (
                                <RedditQueryHistoryTable />
                            ) : (
                                <motion.div key="playstore" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                                    {/* <PlaystoreComingSoon /> */}
                                    <PlaystoreQueryHistoryTable />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error banner */}
                        {/* {error && <div className="flex items-center gap-2.5 px-4 py-3 rounded-none text-xs font-semibold bg-destructive-bg border border-destructive/20 text-destructive">{error}</div>} */}
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="hidden xl:flex flex-col gap-4">
                        <QuickActions />
                        <ActivityFeed jobs={jobs} />
                    </div>
                </div>
            </div>
        </div>
    );
};