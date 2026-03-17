"use client";

import React, { useEffect, useState } from 'react';
import {
    TrendingUp, AlertCircle, Zap,
    ChevronRight, ArrowUpRight, RefreshCcw,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ── PRIMITIVES ────────────────────────────────────────
const Label = ({ children }) => (
    <p className="text-[9px] font-black uppercase tracking-[0.18em] font-mono mb-1.5"
        style={{ color: 'var(--text-subtle)' }}>
        {children}
    </p>
);

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// ── MAIN DASHBOARD ─────────────────────────────────────
export default function DashboardPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            const parsed = JSON.parse(stored);
            setUserId(parsed.id);
        }
    }, []);

    async function fetchJobs(isSilent = false) {
        if (!isSilent) setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${apiUrl}/jobs`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

            const data = await res.json();
            setJobs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!userId) return;
        fetchJobs();

        const interval = setInterval(() => {
            fetchJobs(true);
        }, 120000); // 2 minutes

        return () => clearInterval(interval);
    }, [userId]);

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--text-main)' }}>
            <header className="sticky top-0 z-20 px-10 h-[52px] flex items-center justify-between"
                style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border-solid)' }}>
                <h1 className="text-sm font-bold">Overview</h1>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--success)' }} />
                    <span className="text-[9px] font-mono" style={{ color: 'var(--text-subtle)' }}>LIVE POLLING ON</span>
                </div>
            </header>

            <div className="px-10 py-10 flex flex-col gap-8">
                <section className="flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-bold">Job History</h2>
                        <button onClick={() => fetchJobs()} className="p-2 border rounded-lg transition-colors hover:bg-zinc-100">
                            <RefreshCcw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-solid)', backgroundColor: 'var(--surface)' }}>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b" style={{ borderColor: 'var(--border-solid)' }}>
                                    {['Query', 'Date', 'Status', 'Action'].map(h => (
                                        <th key={h} className="px-5 py-3 text-left text-[10px] font-mono uppercase text-subtle">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {!loading && jobs.map((job) => (
                                    <JobRow key={job.id} job={job} />
                                ))}
                                {loading && jobs.length === 0 && (
                                    <tr><td colSpan={4} className="p-10 text-center text-xs opacity-50">Syncing engine data...</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}

// ── UPDATED JOB ROW ────────────────────────────────
function JobRow({ job }) {
    const [hovered, setHovered] = useState(false);

    console.log('job: ', job);

    // Dynamic Style logic checking raw API status directly
    const getStatusStyle = (status) => {
        switch (status) {
            case "COMPLETED":
                return { bg: 'var(--success-bg)', text: 'var(--success)', label: 'Summary generated' };
            case "FAILED":
                return { bg: 'var(--destructive-bg)', text: 'var(--destructive)', label: 'Failed' };
            case "PROCESSING":
                return { bg: 'var(--info-bg)', text: 'var(--info)', label: 'Processing' };
            case "USER_PENDING":
                return { bg: 'var(--warning-bg)', text: 'var(--warning)', label: 'User Action Pending' };
            default:
                return { bg: 'var(--surface-raised)', text: 'var(--text-muted)', label: status };
        }
    };

    const style = getStatusStyle(job.status);
    const isUserPending = job.status === "USER_PENDING";
    const isCompleted = job.status === "COMPLETED";

    return (
        <tr
            className="transition-colors border-b"
            style={{
                borderColor: 'var(--border-solid)',
                backgroundColor: hovered ? 'var(--surface-card)' : 'transparent'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <td className="px-5 py-4 font-medium">{job.query}</td>
            <td className="px-5 py-4 font-mono text-xs text-muted">{formatDate(job.created_at)}</td>

            <td className="px-5 py-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: style.bg, color: style.text }}>
                    {(job.status === "PROCESSING" || isUserPending) && (
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: style.text }} />
                    )}
                    {style.label}
                </div>
            </td>

            <td className="px-5 py-4">
                {isUserPending ? (
                    <Link
                        href={`/dashboard/posts?jobId=${job.id}`}
                        className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all bg-primary text-white hover:opacity-90"
                        style={{ boxShadow: '0 2px 8px -2px var(--primary)' }}
                    >
                        Select Post <Zap className="w-3 h-3 fill-current" />
                    </Link>
                ) : isCompleted ? (
                    <Link
                        href={`/dashboard/posts/summary?jobId=${job.id}`}
                        className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                        View Summary <ChevronRight className="w-3 h-3" />
                    </Link>
                ) : (
                    <Link
                        href={`/dashboard/history/posts?jobId=${job.id}`}
                        className="flex items-center gap-1 text-xs font-bold text-muted hover:text-primary transition-colors"
                    >
                        Check Status <ChevronRight className="w-3 h-3" />
                    </Link>
                )}
            </td>
        </tr>
    );
}