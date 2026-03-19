"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, RefreshCcw, Sparkles, CheckCircle2, Clock, AlertCircle, Timer } from "lucide-react";
import { getToken } from '@/utils/getToken';
import Link from "next/link";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const EXAMPLES = [
    "gym culture in Mumbai",
    "solo travel north east India",
    "EV adoption challenges India",
    "street food safety Delhi",
    "remote work culture Bangalore",
    "startup funding climate 2024",
];

const REFRESH_INTERVAL_MS = 5000;

// ── PRIMITIVES ────────────────────────────────────────────────────────────────
const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function RedditIntelligencePage() {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [countdown, setCountdown] = useState(REFRESH_INTERVAL_MS / 1000);

    // ── Rate limit state ──────────────────────────────────────
    const [cooldownMinutes, setCooldownMinutes] = useState(0);
    const [cooldownSeconds, setCooldownSeconds] = useState(0);
    const [isOnCooldown, setIsOnCooldown] = useState(false);
    const [cooldownLoading, setCooldownLoading] = useState(true);

    const textareaRef = useRef(null);
    const jobsIntervalRef = useRef(null);
    const cooldownIntervalRef = useRef(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // ── Get fresh token ───────────────────────────────────────
    // const getToken = useCallback(async () => {
    //     const firebaseUser = auth.currentUser;
    //     if (!firebaseUser) throw new Error("Not authenticated");
    //     return await firebaseUser.getIdToken();
    // }, []);

    // ── Cooldown countdown timer ──────────────────────────────
    const startCooldownTimer = useCallback((totalSeconds) => {
        if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
        let remaining = totalSeconds;

        cooldownIntervalRef.current = setInterval(() => {
            remaining -= 1;
            if (remaining <= 0) {
                clearInterval(cooldownIntervalRef.current);
                setIsOnCooldown(false);
                setCooldownMinutes(0);
                setCooldownSeconds(0);
                return;
            }
            setCooldownMinutes(Math.floor(remaining / 60));
            setCooldownSeconds(remaining % 60);
        }, 1000);
    }, []);

    // ── Check cooldown from backend ───────────────────────────
    const checkCooldown = useCallback(async () => {
        try {
            const token = await getToken();

            const res = await fetch(`${apiUrl}/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) return;

            const data = await res.json();
            console.log('users data: ', data);

            const plan = data.plan;
            if (!plan) return;

            if (!plan.can_query && plan.next_query_at) {
                // ← Calculate exact seconds from next_query_at
                const now = new Date();
                const nextQueryAt = new Date(plan.next_query_at);
                const secondsLeft = Math.max(Math.floor((nextQueryAt - now) / 1000), 0);

                if (secondsLeft > 0) {
                    setIsOnCooldown(true);
                    setCooldownMinutes(Math.floor(secondsLeft / 60));
                    setCooldownSeconds(secondsLeft % 60);
                    startCooldownTimer(secondsLeft);
                } else {
                    setIsOnCooldown(false);
                    setCooldownMinutes(0);
                    setCooldownSeconds(0);
                }
            } else {
                setIsOnCooldown(false);
                setCooldownMinutes(0);
                setCooldownSeconds(0);
            }
        } catch (err) {
            console.error("Failed to check cooldown:", err);
        } finally {
            setCooldownLoading(false);
        }
    }, [apiUrl, getToken, startCooldownTimer]);

    // ── Fetch jobs ────────────────────────────────────────────
    const fetchJobs = useCallback(async (isSilent = false) => {
        if (!isSilent) setJobsLoading(true);
        try {
            const token = await getToken();

            const res = await fetch(`${apiUrl}/jobs`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error(`Fetch failed: ${res?.status}`);
            const data = await res.json();
            setJobs(data);
            setCountdown(REFRESH_INTERVAL_MS / 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setJobsLoading(false);
        }
    }, [apiUrl, getToken]);

    // ── Init ──────────────────────────────────────────────────
    useEffect(() => {
        fetchJobs();
        checkCooldown();
        jobsIntervalRef.current = setInterval(() => fetchJobs(true), REFRESH_INTERVAL_MS);

        return () => {
            clearInterval(jobsIntervalRef.current);
            clearInterval(cooldownIntervalRef.current);
        };
    }, [fetchJobs, checkCooldown]);

    // ── Countdown ticker ──────────────────────────────────────
    useEffect(() => {
        const ticker = setInterval(() => {
            setCountdown(prev => (prev > 0 ? prev - 1 : REFRESH_INTERVAL_MS / 1000));
        }, 1000);
        return () => clearInterval(ticker);
    }, []);

    const canSubmit = query.trim() && !submitLoading && !isOnCooldown;

    // ── Submit query ──────────────────────────────────────────
    async function handleSubmit(e) {
        e?.preventDefault();
        if (!canSubmit) return;
        setError(null);
        setSubmitLoading(true);
        setShowSuccess(false);

        try {
            const token = await getToken();

            const res = await fetch(`${apiUrl}/query`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ query: query.trim() }),
            });

            if (!res.ok) {
                const errData = await res.json();
                if (res.status === 429) {
                    await checkCooldown(); // ← use backend for accurate time
                    throw new Error(errData.detail || "Rate limit exceeded");
                }
                throw new Error(errData.detail || `Failed to submit job (${res.status})`);
            }

            // ── Deduct credit ─────────────────────────────────
            const creditRes = await fetch(`${apiUrl}/users/deduct-credit`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            });
            if (creditRes.ok) {
                window.dispatchEvent(new Event("userUpdated"));
            }

            setShowSuccess(true);
            setQuery("");
            fetchJobs(true);

            // ← Use actual next_query_at from backend instead of hardcoding
            await checkCooldown();

        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitLoading(false);
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && canSubmit) handleSubmit();
    }

    return (
        <div className="min-h-screen flex flex-col items-center px-6 py-16 relative overflow-hidden"
            style={{ backgroundColor: "var(--background)" }}>

            <div className="relative z-10 w-full max-w-3xl">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                    <div className="flex justify-center mb-5">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                            style={{ background: "var(--primary)" }}>
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-2" style={{ color: "var(--text-main)" }}>
                        Reddit Intelligence
                    </h1>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Deep sentiment analysis from Reddit communities.
                    </p>
                </motion.div>

                {/* Success */}
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="mb-4 p-4 rounded-xl border flex items-start gap-3"
                            style={{ backgroundColor: "var(--success-bg)", borderColor: "var(--success)" }}>
                            <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "var(--success)" }} />
                            <div>
                                <p className="text-[15px] font-bold mb-1" style={{ color: "var(--success)" }}>
                                    Query successfully queued!
                                </p>
                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                    We are gathering Reddit data. You'll be notified when the summary is ready.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Search card OR Skeleton ── */}
                {cooldownLoading ? (
                    <div className="rounded-2xl overflow-hidden border animate-pulse"
                        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>
                        <div className="p-5 pb-4 space-y-3">
                            <div className="h-4 rounded-lg w-3/4 bg-surface-raised" />
                            <div className="h-4 rounded-lg w-1/2 bg-surface-raised" />
                            <div className="h-4 rounded-lg w-2/3 bg-surface-raised" />
                        </div>
                        <div className="flex items-center justify-between px-5 py-3 border-t"
                            style={{ borderColor: "var(--border-solid)", backgroundColor: "var(--surface-card)" }}>
                            <div className="h-3 w-16 rounded bg-surface-raised" />
                            <div className="h-9 w-28 rounded-xl bg-surface-raised" />
                        </div>
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <form onSubmit={handleSubmit}>
                            <motion.div
                                animate={{ boxShadow: focused ? "var(--shadow-lg)" : "var(--shadow-md)" }}
                                className="rounded-2xl overflow-hidden border"
                                style={{
                                    backgroundColor: "var(--surface)",
                                    borderColor: isOnCooldown ? "var(--warning)" : "var(--border-solid)",
                                    opacity: isOnCooldown ? 0.7 : 1,
                                }}
                            >
                                <div className="p-5 pb-4">
                                    <textarea
                                        ref={textareaRef}
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        onKeyDown={handleKeyDown}
                                        rows={3}
                                        disabled={isOnCooldown}
                                        placeholder={isOnCooldown
                                            ? "Please wait for the cooldown to finish..."
                                            : "Describe the topic you want to analyze..."
                                        }
                                        className="flex-1 w-full bg-transparent outline-none resize-none text-sm leading-relaxed disabled:cursor-not-allowed"
                                        style={{ color: "var(--text-main)" }}
                                    />
                                </div>

                                <div className="flex items-center justify-between px-5 py-3 border-t"
                                    style={{ borderColor: "var(--border-solid)", backgroundColor: "var(--surface-card)" }}>
                                    <span className="text-[10px] font-mono" style={{ color: "var(--text-subtle)" }}>
                                        {isOnCooldown
                                            ? `⏳ ${String(cooldownMinutes).padStart(2, '0')}:${String(cooldownSeconds).padStart(2, '0')} remaining`
                                            : query.length > 0 ? `${query.length} chars` : "⌘↵ to run"
                                        }
                                    </span>
                                    <button
                                        type="submit"
                                        disabled={!canSubmit}
                                        className="flex items-center gap-2 px-5 h-9 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all"
                                        style={{
                                            background: canSubmit ? "var(--primary)" : "var(--surface-raised)",
                                            color: canSubmit ? "#fff" : "var(--text-subtle)",
                                            cursor: canSubmit ? "pointer" : "not-allowed",
                                        }}
                                    >
                                        {submitLoading
                                            ? "Analyzing..."
                                            : isOnCooldown
                                                ? "On Cooldown"
                                                : <> Analyze <ArrowRight className="w-3 h-3" /> </>
                                        }
                                    </button>
                                </div>
                            </motion.div>
                        </form>
                    </motion.div>
                )}

                {/* ── Cooldown banner ── */}
                <AnimatePresence>
                    {!cooldownLoading && isOnCooldown && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="mt-4 px-5 py-3 rounded-xl border flex items-center justify-between gap-4"
                            style={{ backgroundColor: "var(--warning-bg)", borderColor: "var(--warning)" }}
                        >
                            <div className="flex items-center gap-3">
                                <Timer className="w-4 h-4 shrink-0" style={{ color: "var(--warning)" }} />
                                <div>
                                    <p className="text-sm font-semibold" style={{ color: "var(--warning)" }}>
                                        Rate limit active — next query available in
                                    </p>
                                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                        You can submit one query every 30 minutes.
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0 font-mono text-lg font-black tabular-nums"
                                style={{ color: "var(--warning)" }}>
                                {String(cooldownMinutes).padStart(2, '0')}:{String(cooldownSeconds).padStart(2, '0')}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error */}
                <AnimatePresence>
                    {error && !isOnCooldown && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="mt-4 p-4 rounded-xl border flex items-start justify-between gap-3"
                            style={{ backgroundColor: "var(--destructive-bg)", borderColor: "var(--destructive)" }}>
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--destructive)" }} />
                                <p className="text-sm font-semibold" style={{ color: "var(--destructive)" }}>{error}</p>
                            </div>
                            {error.includes("credits") && (
                                <Link href="/pricing"
                                    className="shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest text-white bg-primary hover:bg-primary-hover transition-all">
                                    Buy Credits
                                </Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Examples */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="my-5 flex items-center justify-center gap-2 flex-wrap"
                >
                    <span className="text-[10px] font-mono uppercase shrink-0 font-extrabold"
                        style={{ color: 'var(--text-subtle)' }}>
                        Try:
                    </span>
                    {EXAMPLES.map((s, i) => (
                        <motion.button
                            key={s}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            type="button"
                            onClick={() => !isOnCooldown && setQuery(s)}
                            disabled={isOnCooldown}
                            className="px-3 py-1 cursor-pointer rounded-full text-[11px] font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-solid)', color: 'var(--text-muted)' }}
                            onMouseEnter={e => {
                                if (!isOnCooldown) {
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                    e.currentTarget.style.color = 'var(--primary)';
                                    e.currentTarget.style.backgroundColor = 'var(--info-bg)';
                                }
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'var(--border-solid)';
                                e.currentTarget.style.color = 'var(--text-muted)';
                                e.currentTarget.style.backgroundColor = 'var(--surface)';
                            }}
                        >
                            {s}
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {/* ─── DIVIDER ─── */}
            <div className="w-full max-w-5xl mt-20 mb-10 flex items-center gap-4">
                <div className="h-px flex-1" style={{ backgroundColor: "var(--border-solid)" }} />
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                    style={{ color: "var(--text-subtle)" }}>
                    <Clock className="w-4 h-4" /> Syncing in {countdown}s
                </div>
                <div className="h-px flex-1" style={{ backgroundColor: "var(--border-solid)" }} />
            </div>

            {/* ─── JOB HISTORY ─── */}
            <div className="w-full max-w-5xl px-4">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-xl font-black tracking-tight" style={{ color: "var(--text-main)" }}>
                            Recent Analysis
                        </h2>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Your analysis history and status
                        </p>
                    </div>
                    <button
                        onClick={() => fetchJobs()}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg border transition-colors"
                        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)", color: "var(--text-main)" }}
                    >
                        <RefreshCcw className={`w-3 h-3 ${jobsLoading ? 'animate-spin' : ''}`} /> Sync Now
                    </button>
                </div>

                <div className="rounded-2xl border overflow-hidden"
                    style={{ borderColor: 'var(--border-solid)', backgroundColor: 'var(--surface)', boxShadow: "var(--shadow-sm)" }}>
                    <table className="w-full text-left">
                        <thead style={{ backgroundColor: 'var(--surface-card)' }}>
                            <tr className="border-b" style={{ borderColor: 'var(--border-solid)' }}>
                                {['Topic', 'Created', 'Status', 'Action'].map(h => (
                                    <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest"
                                        style={{ color: "var(--text-subtle)" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: 'var(--border-solid)' }}>
                            {!jobsLoading && jobs.map(job => <JobRow key={job.id} job={job} />)}
                            {jobsLoading && jobs.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-xs"
                                        style={{ color: "var(--text-subtle)" }}>
                                        Syncing your personalized data...
                                    </td>
                                </tr>
                            )}
                            {!jobsLoading && jobs.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-xs"
                                        style={{ color: "var(--text-subtle)" }}>
                                        No analysis yet. Submit your first query above.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function JobRow({ job }) {
    const getStatusStyle = (status) => {
        switch (status) {
            case "COMPLETED": return { bg: 'var(--success-bg)', text: 'var(--success)', label: 'Ready' };
            case "PROCESSING": return { bg: 'var(--info-bg)', text: 'var(--info)', label: 'Processing' };
            case "USER_PENDING": return { bg: 'var(--warning-bg)', text: 'var(--warning)', label: 'Selection Needed' };
            case "FAILED": return { bg: 'var(--destructive-bg)', text: 'var(--destructive)', label: 'Failed' };
            default: return { bg: 'var(--surface-raised)', text: 'var(--text-subtle)', label: status };
        }
    };

    const style = getStatusStyle(job.status);
    const isProcessing = job.status === "PROCESSING";

    return (
        <tr className="transition-colors" style={{ backgroundColor: "var(--surface)" }}>
            <td className="px-6 py-4 text-sm font-medium max-w-xs truncate"
                style={{ color: "var(--text-main)" }}>{job.query}</td>
            <td className="px-6 py-4 text-[11px] font-mono"
                style={{ color: "var(--text-muted)" }}>{formatDate(job.created_at)}</td>
            <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: style.bg, color: style.text }}>
                    {isProcessing && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                    {style.label}
                </span>
            </td>
            <td className="px-6 py-4">
                {job.status === "USER_PENDING" ? (
                    <Link href={`/dashboard/posts?jobId=${job.id}`}
                        className="bg-primary inline-flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest text-white hover:opacity-90 transition-all shadow-sm">
                        Select Post
                    </Link>
                ) : job.status === "COMPLETED" ? (
                    <Link href={`/dashboard/posts/summary?jobId=${job.id}`}
                        className="text-xs font-bold flex items-center gap-1 hover:underline"
                        style={{ color: "var(--primary)" }}>
                        View Summary <ChevronRight className="w-3 h-3" />
                    </Link>
                ) : isProcessing ? (
                    <span className="text-[10px] font-mono italic"
                        style={{ color: "var(--text-subtle)", opacity: 0.5 }}>
                        Analyzing...
                    </span>
                ) : null}
            </td>
        </tr>
    );
}