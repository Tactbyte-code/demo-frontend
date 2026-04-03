"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, RefreshCcw, Sparkles, CheckCircle2, Clock, AlertCircle, Timer } from "lucide-react";
import { getToken } from "@/utils/getToken";
import Link from "next/link";
import { createQuery, getQueries } from "@/lib/api/reddit";
import RedditQueryHistoryTable from "./_components/RedditQueryHistoryTable";
import { useRouter } from "next/navigation";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const EXAMPLES = ["gym culture in Mumbai", "solo travel north east India", "EV adoption challenges India", "street food safety Delhi", "remote work culture Bangalore", "startup funding climate 2024"];

const REFRESH_INTERVAL_MS = 5000;

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

    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQueries = async () => {
        setLoading(true);
        const data = await getQueries();
        setQueries(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    // ── Rate limit state ──────────────────────────────────────
    const [cooldownMinutes, setCooldownMinutes] = useState(0);
    const [cooldownSeconds, setCooldownSeconds] = useState(0);
    const [isOnCooldown, setIsOnCooldown] = useState(false);
    const [cooldownLoading, setCooldownLoading] = useState(true);

    const textareaRef = useRef(null);
    const jobsIntervalRef = useRef(null);
    const cooldownIntervalRef = useRef(null);
    const canSubmit = query.trim() && !submitLoading && !isOnCooldown;
    const router = useRouter();

    // const fetched_queries = getQueries();
    // console.log(fetched_queries);

    const submitQuery = async (e) => {
        e?.preventDefault();
        setSubmitLoading(true);
        setError(null);

        try {
            const response = await createQuery(query);

            if (response?.status === "CLARIFYING") {
                router.push(`/dashboard/reddit/query/${response.id}/clarify`);
            };

            if (response?.status === "CLARIFIED") {
                router.push(`/dashboard/reddit/query/${response.id}`);
            };

            if (response?.status === "FAILED") {
                setError(response?.failure_reason || "Something went wrong");
            };
        } catch (err) {
            console.log('submit query error: ', err);
            setError(err?.response?.data?.detail || "Something went wrong");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleSubmitQuery = (e) => {
        e.preventDefault();

        router.push(`/dashboard/reddit/processing?query=${encodeURIComponent(query)}`);
    }

    return (
        <div className="min-h-screen flex flex-col items-center px-6 py-16 pb-14 relative overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
            <div className="relative z-10 w-full max-w-3xl">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                    <div className="flex justify-center mb-5">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md" style={{ background: "var(--primary)" }}>
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
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-4 p-4 rounded-xl border flex items-start gap-3"
                            style={{ backgroundColor: "var(--success-bg)", borderColor: "var(--success)" }}
                        >
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
                {!cooldownLoading ? (
                    <div className="rounded-2xl overflow-hidden border animate-pulse" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border-solid)" }}>
                        <div className="p-5 pb-4 space-y-3">
                            <div className="h-4 rounded-lg w-3/4 bg-surface-raised" />
                            <div className="h-4 rounded-lg w-1/2 bg-surface-raised" />
                            <div className="h-4 rounded-lg w-2/3 bg-surface-raised" />
                        </div>
                        <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: "var(--border-solid)", backgroundColor: "var(--surface-card)" }}>
                            <div className="h-3 w-16 rounded bg-surface-raised" />
                            <div className="h-9 w-28 rounded-xl bg-surface-raised" />
                        </div>
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        {/* <form onSubmit={submitQuery}> */}
                        <form onSubmit={handleSubmitQuery}>
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
                                        onChange={(e) => setQuery(e.target.value)}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        // onKeyDown={handleKeyDown}
                                        rows={3}
                                        disabled={isOnCooldown}
                                        placeholder={isOnCooldown ? "Please wait for the cooldown to finish..." : "Describe the topic you want to analyze..."}
                                        className="flex-1 w-full bg-transparent outline-none resize-none text-sm leading-relaxed disabled:cursor-not-allowed"
                                        style={{ color: "var(--text-main)" }}
                                    />
                                </div>

                                <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: "var(--border-solid)", backgroundColor: "var(--surface-card)" }}>
                                    <span className="text-[10px] font-mono" style={{ color: "var(--text-subtle)" }}>
                                        {isOnCooldown ? `⏳ ${String(cooldownMinutes).padStart(2, "0")}:${String(cooldownSeconds).padStart(2, "0")} remaining` : query.length > 0 ? `${query.length} chars` : "⌘↵ to run"}
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
                                        {submitLoading ? (
                                            "Analyzing..."
                                        ) : isOnCooldown ? (
                                            "On Cooldown"
                                        ) : (
                                            <>
                                                {" "}
                                                Analyze <ArrowRight className="w-3 h-3" />{" "}
                                            </>
                                        )}
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
                            <div className="shrink-0 font-mono text-lg font-black tabular-nums" style={{ color: "var(--warning)" }}>
                                {String(cooldownMinutes).padStart(2, "0")}:{String(cooldownSeconds).padStart(2, "0")}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error */}
                <AnimatePresence>
                    {error && !isOnCooldown && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 p-4 rounded-xl border flex items-start justify-between gap-3"
                            style={{ backgroundColor: "var(--destructive-bg)", borderColor: "var(--destructive)" }}
                        >
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--destructive)" }} />
                                <p className="text-sm font-semibold" style={{ color: "var(--destructive)" }}>
                                    {error}
                                </p>
                            </div>
                            {error.includes("credits") && (
                                <Link href="/pricing" className="shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest text-white bg-primary hover:bg-primary-hover transition-all">
                                    Buy Credits
                                </Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Examples */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="my-5 flex items-center justify-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono uppercase shrink-0 font-extrabold" style={{ color: "var(--text-subtle)" }}>
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
                            style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)", color: "var(--text-muted)" }}
                            onMouseEnter={(e) => {
                                if (!isOnCooldown) {
                                    e.currentTarget.style.borderColor = "var(--primary)";
                                    e.currentTarget.style.color = "var(--primary)";
                                    e.currentTarget.style.backgroundColor = "var(--info-bg)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "var(--border-solid)";
                                e.currentTarget.style.color = "var(--text-muted)";
                                e.currentTarget.style.backgroundColor = "var(--surface)";
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
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                    <Clock className="w-4 h-4" /> Syncing in {countdown}s
                </div>
                <div className="h-px flex-1" style={{ backgroundColor: "var(--border-solid)" }} />
            </div>

            <RedditQueryHistoryTable />

        </div>
    );
}