"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, RefreshCcw, Sparkles, CheckCircle2, Clock } from "lucide-react";
import { auth } from '@/config/firebase';
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

// ── PRIMITIVES ────────────────────────────────────────
const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function RedditIntelligencePage() {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const textareaRef = useRef(null);

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    const [countdown, setCountdown] = useState(REFRESH_INTERVAL_MS / 1000);

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

            if (!res.ok) throw new Error(`Fetch failed: ${res?.status}`);

            const data = await res.json();
            setJobs(data);
            setCountdown(REFRESH_INTERVAL_MS / 1000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userId) return;
        fetchJobs();

        const interval = setInterval(() => {
            fetchJobs(true);
        }, REFRESH_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [userId]);

    useEffect(() => {
        const ticker = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : REFRESH_INTERVAL_MS / 1000));
        }, 1000);
        return () => clearInterval(ticker);
    }, []);

    const canSubmit = query.trim() && !submitLoading;

    async function handleSubmit(e) {
        e?.preventDefault();
        if (!canSubmit) return;
        setError(null);

        // ── Check credits before submitting ──────────────────────
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.credits <= 0) {
                setError("You have no credits left. Please purchase a plan to continue.");
                return;
            }
        }

        setSubmitLoading(true);
        setShowSuccess(false);

        try {
            const firebaseUser = auth.currentUser;
            const token = await firebaseUser.getIdToken();

            const res = await fetch(`${apiUrl}/query`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ query: query.trim() }),
            });

            if (!res.ok) throw new Error(`Failed to submit job(${res.status})`);

            // ── Deduct 1 credit after successful query ────────────
            const creditRes = await fetch(`${apiUrl}/users/deduct-credit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (creditRes.ok) {
                window.dispatchEvent(new Event("userUpdated"));
            }

            setShowSuccess(true);
            setQuery("");
            fetchJobs(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitLoading(false);
        }
    };

    function handleKeyDown(e) {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && canSubmit) handleSubmit();
    };

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

                {/* Search card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <form onSubmit={handleSubmit}>
                        <motion.div
                            animate={{ boxShadow: focused ? "var(--shadow-lg)" : "var(--shadow-md)" }}
                            className="rounded-2xl overflow-hidden border"
                            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>

                            <div className="p-5 pb-4">
                                <textarea
                                    ref={textareaRef}
                                    value={query}
                                    onChange={e => setQuery(e.target.value)}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    onKeyDown={handleKeyDown}
                                    rows={3}
                                    placeholder="Describe the topic you want to analyze..."
                                    className="flex-1 w-full bg-transparent outline-none resize-none text-sm leading-relaxed"
                                    style={{ color: "var(--text-main)" }}
                                />
                            </div>

                            <div className="flex items-center justify-between px-5 py-3 border-t"
                                style={{ borderColor: "var(--border-solid)", backgroundColor: "var(--surface-card)" }}>
                                <span className="text-[10px] font-mono" style={{ color: "var(--text-subtle)" }}>
                                    {query.length > 0 ? `${query.length} chars` : "⌘↵ to run"}
                                </span>
                                <button type="submit" disabled={!canSubmit}
                                    className="flex items-center gap-2 px-5 h-9 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all"
                                    style={{
                                        background: canSubmit ? "var(--primary)" : "var(--surface-raised)",
                                        color: canSubmit ? "#fff" : "var(--text-subtle)",
                                        cursor: canSubmit ? "pointer" : "not-allowed",
                                    }}>
                                    {submitLoading ? "Analyzing..." : <>Analyze <ArrowRight className="w-3 h-3" /></>}
                                </button>
                            </div>
                        </motion.div>
                    </form>
                </motion.div>

                {/* Success Message */}
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="mt-4 p-4 rounded-xl border flex items-start gap-3"
                            style={{ backgroundColor: "var(--success-bg)", borderColor: "var(--success)" }}>
                            <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: "var(--success)" }} />
                            <div>
                                <p className="text-sm font-bold" style={{ color: "var(--success)" }}>Query successfully queued!</p>
                                <p className="text-xs" style={{ color: "var(--text-muted)" }}>We are gathering Reddit data. You'll be notified when the summary is ready.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error */}
                <AnimatePresence>
                    {error && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="mt-4 p-4 rounded-xl border flex items-start justify-between gap-3"
                            style={{ backgroundColor: "var(--destructive-bg)", borderColor: "var(--destructive)" }}>
                            <p className="text-sm font-semibold" style={{ color: "var(--destructive)" }}>{error}</p>
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
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    {EXAMPLES.map((ex) => (
                        <button key={ex} onClick={() => setQuery(ex)}
                            className="px-3 py-1 rounded-full text-[10px] border transition-all"
                            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)", color: "var(--text-muted)" }}>
                            {ex}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── SECTION DIVIDER ─── */}
            <div className="w-full max-w-5xl mt-20 mb-10 flex items-center gap-4">
                <div className="h-px flex-1" style={{ backgroundColor: "var(--border-solid)" }} />
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                    <Clock className="w-4 h-4" /> Syncing in {countdown}s
                </div>
                <div className="h-px flex-1" style={{ backgroundColor: "var(--border-solid)" }} />
            </div>

            {/* ─── JOB HISTORY SECTION ─── */}
            <div className="w-full max-w-5xl px-4">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-xl font-black tracking-tight" style={{ color: "var(--text-main)" }}>Recent Analysis</h2>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Your analysis history and status</p>
                    </div>
                    <button onClick={() => fetchJobs()}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg border transition-colors"
                        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)", color: "var(--text-main)" }}>
                        <RefreshCcw className={`w - 3 h - 3 ${loading ? 'animate-spin' : ''}`} /> Sync Now
                    </button>
                </div>

                <div className="rounded-2xl border overflow-hidden"
                    style={{ borderColor: 'var(--border-solid)', backgroundColor: 'var(--surface)', boxShadow: "var(--shadow-sm)" }}>
                    <table className="w-full text-left">
                        <thead style={{ backgroundColor: 'var(--surface-card)' }}>
                            <tr className="border-b" style={{ borderColor: 'var(--border-solid)' }}>
                                {['Topic', 'Created', 'Status', 'Action'].map(h => (
                                    <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: 'var(--border-solid)' }}>
                            {!loading && jobs.map((job) => <JobRow key={job.id} job={job} />)}
                            {loading && jobs.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-xs" style={{ color: "var(--text-subtle)" }}>
                                        Loading historical data...
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
            <td className="px-6 py-4 text-sm font-medium" style={{ color: "var(--text-main)" }}>{job.query}</td>
            <td className="px-6 py-4 text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>{formatDate(job.created_at)}</td>
            <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: style.bg, color: style.text }}>
                    {isProcessing && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                    {style.label}
                </span>
            </td>
            <td className="px-6 py-4">
                {job.status === "USER_PENDING" ? (
                    <Link href={`/dashboard/posts?jobId=${job.id}`} className="bg-primary inline-flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest text-white hover:opacity-90 transition-all shadow-sm">
                        Select Post
                    </Link>
                ) : job.status === "COMPLETED" ? (
                    <Link href={`/dashboard/posts/summary?jobId=${job.id}`}
                        className="text-xs font-bold flex items-center gap-1 hover:underline"
                        style={{ color: "var(--primary)" }}>
                        View Summary <ChevronRight className="w-3 h-3" />
                    </Link>
                ) : isProcessing ? (
                    <span className="text-[10px] font-mono italic" style={{ color: "var(--text-subtle)", opacity: 0.5 }}>
                        Analyzing...
                    </span>
                ) : null}
            </td>
        </tr>
    );
};