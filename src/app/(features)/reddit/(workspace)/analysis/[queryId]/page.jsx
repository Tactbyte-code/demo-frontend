"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { ArrowLeft, LoaderCircle, MessageSquare, RefreshCw, XCircle } from "lucide-react";
import { useCreditStore } from "@/store/useCreditStore";
import {
    useRedditQueryStatus,
    useRedditPosts,
    useRedditResult,
    useTriggerSearch,
    useTriggerSummarize,
    useRetrySearch,
    useRetrySummarize,
} from "@/features/reddit/hooks/useRedditAnalysis";
import {
    PIPELINE_STEPS,
    RSTATUS,
    STAGE_LABELS,
    STATUS_TO_STEP,
} from "@/utils/reddit/status";
import ClarifyPanel from "@/features/reddit/components/report/ClarifyPanel";
import { useAuthStore } from "@/store/authStore";
import { claimGuestReports } from "@/features/guest/guest.api";
// import { SummaryResult } from "@/app/dashboard/reddit/query/[query_id]/_components/SummaryResult";
// import { usePostApproval } from "@/app/dashboard/reddit/query/[query_id]/_hooks/usePostApproval";

const reportPath = (queryId) => `/reddit/analysis/${queryId}/report`;

export default function RedditAnalysisPage() {
    const { queryId } = useParams();
    const router = useRouter();
    const getCredits = useCreditStore((s) => s.getCredits);

    const user = useAuthStore((state) => state.user);
    const authLoading = useAuthStore((state) => state.loading);

    const [showLoginModal, setShowLoginModal] = useState(false);
    // True once we determine this completed analysis belongs to a guest
    // who must authenticate before viewing the report.
    const [requiresLogin, setRequiresLogin] = useState(false);
    const [claimingReports, setClaimingReports] = useState(false);

    const { data, isLoading, isError, refetch } = useRedditQueryStatus(queryId);
    const status = data?.status;

    const isClarifying = status === RSTATUS.CLARIFYING;
    const isCompleted = status === RSTATUS.COMPLETED;
    const isFailed = status === RSTATUS.FAILED;

    const searchMutation = useTriggerSearch(queryId);
    const summarizeMutation = useTriggerSummarize(queryId);
    const retrySearch = useRetrySearch(queryId);
    const retrySummarize = useRetrySummarize(queryId);

    // ── Status-driven pipeline actions: each fires at most once per status ──────
    const firedRef = useRef(new Set());
    useEffect(() => {
        firedRef.current = new Set();
    }, [queryId]);

    useEffect(() => {
        if (!status) return;
        const once = (key, fn) => {
            if (firedRef.current.has(key)) return;
            firedRef.current.add(key);
            fn();
        };

        if (status === RSTATUS.CLARIFIED) {
            once(RSTATUS.CLARIFIED, () => searchMutation.mutate());
        }

        if (status === RSTATUS.SEARCH_COMPLETE) {
            once(RSTATUS.SEARCH_COMPLETE, () => summarizeMutation.mutate());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    // Allow the actions to fire again after a retry resets the status.
    const handleRetry = () => {
        firedRef.current = new Set();
        if (data?.failed_at_step === "summarize") retrySummarize.mutate();
        else retrySearch.mutate();
    };

    // Refresh credits once when the analysis completes.
    useEffect(() => {
        if (isCompleted) getCredits?.(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCompleted]);

    // Decide what happens after the analysis completes.
    // Signed-in users go straight to the report; guests see the login modal.
    // Once a guest is identified, navigation is handled by handleLoginSuccess
    // after their reports have been claimed.
    useEffect(() => {
        if (!isCompleted || authLoading || requiresLogin) return;

        if (user) {
            router.replace(reportPath(queryId));
        } else {
            setRequiresLogin(true);
            setShowLoginModal(true);
        }
    }, [isCompleted, authLoading, user, requiresLogin, router, queryId]);

    // Reopen the login modal from the guest access message.
    const handleOpenLogin = () => setShowLoginModal(true);

    // Called only after authentication succeeds.
    // Claim guest reports before navigating to the protected report route.
    const handleLoginSuccess = async () => {
        if (claimingReports || !isCompleted) return;
        setClaimingReports(true);

        try {
            await claimGuestReports();
            setShowLoginModal(false);
            router.replace(reportPath(queryId));
        } catch (error) {
            console.error("Failed to claim guest reports:", error);
            setShowLoginModal(false);
        } finally {
            setClaimingReports(false);
        }
    };

    const getStepState = (stepKey) => {
        if (isCompleted) return "completed";
        const order = PIPELINE_STEPS.map((s) => s.key);
        const current = order.indexOf(STATUS_TO_STEP[status]);
        const target = order.indexOf(stepKey);
        if (current === -1) return "upcoming";
        if (target < current) return "completed";
        if (target === current) return isClarifying ? "waiting" : "active";
        return "upcoming";
    };

    const completedCount = PIPELINE_STEPS.filter(
        (s) => getStepState(s.key) === "completed"
    ).length;

    // ── Loading / hard error ────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <Shell>
                <div className="mx-auto flex flex-col items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
                        <LoaderCircle className="h-9 w-9 animate-spin text-[#FF4500]" />
                    </div>
                    <p className="text-sm font-medium text-slate-500">
                        Connecting to analysis pipeline...
                    </p>
                </div>
            </Shell>
        );
    }

    if (isError || isFailed) {
        const retrying = retrySearch.isPending || retrySummarize.isPending;
        return (
            <Shell>
                <div className="mx-auto w-full max-w-xl rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-[0_12px_50px_rgba(255,69,0,0.07)] sm:p-10">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50">
                        <XCircle className="h-9 w-9 text-rose-500" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-[#1A1A1B]">
                        Analysis Failed
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-rose-600">
                        {isError
                            ? "Could not fetch the status of this analysis."
                            : `Reason: ${data?.failure_reason || "UNKNOWN"}`}
                    </p>
                    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            onClick={() => router.push("/reddit/analysis")}
                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-orange-300"
                        >
                            <ArrowLeft className="size-4" />
                            Back
                        </button>
                        <button
                            onClick={isError ? () => refetch() : handleRetry}
                            disabled={retrying}
                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF4500] to-[#FF6A33] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/60 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
                        >
                            <RefreshCw className={`size-4 ${retrying ? "animate-spin" : ""}`} />
                            Try again
                        </button>
                    </div>
                </div>
            </Shell>
        );
    }

    // ── Pipeline / clarify card ─────────────────────────────────────────────────
    return (
        <Shell>
            <div className="mx-auto w-full max-w-2xl">
                <BackButton onClick={() => router.push("/dashboard/reddit")} />

                <div className="overflow-hidden rounded-3xl border border-orange-100/80 bg-white shadow-[0_16px_60px_rgba(255,69,0,0.10)]">
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#FF4500] via-[#FF6A33] to-[#FFA24D]" />

                    <div className="flex flex-col gap-7 p-6 sm:p-9">
                        <QueryBanner query={data?.query} flush />

                        {/* Header */}
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div
                                className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${isCompleted
                                    ? "bg-emerald-50"
                                    : "bg-gradient-to-br from-orange-50 to-amber-50"
                                    }`}
                            >
                                {isCompleted ? (
                                    <FaCheckCircle className="text-3xl text-emerald-500" />
                                ) : isClarifying ? (
                                    <MessageSquare className="h-7 w-7 text-[#FF4500]" />
                                ) : (
                                    <FaSpinner className="animate-spin text-3xl text-[#FF4500]" />
                                )}
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-orange-200/70" />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold tracking-tight text-[#1A1A1B] sm:text-2xl">
                                    {isClarifying
                                        ? "Help us sharpen your search"
                                        : isCompleted
                                            ? "Your Reddit Analysis Is Ready!"
                                            : "Analyzing Reddit for you"}
                                </h2>
                                <p className="mt-2 min-h-[20px] text-sm font-medium text-slate-500">
                                    {STAGE_LABELS[status] || `Status: ${status}`}
                                </p>
                            </div>
                        </div>

                        {/* Inline clarification (replaces nothing: sits above the pipeline) */}
                        <AnimatePresence initial={false}>
                            {isClarifying && (
                                <motion.div
                                    key="clarify"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50/70 via-white to-white p-5 shadow-[0_8px_30px_rgba(255,69,0,0.08)] sm:p-6">
                                        <ClarifyPanel queryId={queryId} data={data} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Guest Report Access Message */}
                        {isCompleted && requiresLogin && !user && !showLoginModal && (
                            <div className="relative overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-5 shadow-[0_8px_30px_rgba(255,69,0,0.10)] sm:p-6">
                                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-200/30 blur-2xl" />

                                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF4500] to-[#FF7A45] text-white shadow-lg shadow-orange-200">
                                        <LockKeyhole size={22} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex items-center gap-2">
                                            <Sparkles size={15} className="text-[#FF4500]" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF4500]">
                                                One last step
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-[#1A1A1B] sm:text-lg">
                                            Your full report is ready!
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                                            Log in or create an account to unlock your complete Reddit analysis
                                            and save it to your account.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleOpenLogin}
                                        className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FF4500] to-[#FF6A33] px-5 text-sm font-semibold text-white shadow-lg shadow-orange-200/60 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                                    >
                                        Log in to view report
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-100 to-transparent" />

                        {/* Pipeline */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                                    Execution Pipeline
                                </span>
                                <span className="text-xs font-semibold text-[#FF4500]">
                                    {completedCount} / {PIPELINE_STEPS.length} completed
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {PIPELINE_STEPS.map((step, index) => {
                                    const state = getStepState(step.key);

                                    let styles = "border-slate-200 bg-slate-50/80 text-slate-400";
                                    let label = "Pending";
                                    let icon = (
                                        <span className="h-4 w-4 rounded-full border-2 border-slate-300" />
                                    );

                                    if (state === "completed") {
                                        styles = "border-emerald-200 bg-emerald-50/70 text-emerald-800";
                                        label = "Completed";
                                        icon = <FaCheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />;
                                    } else if (state === "active") {
                                        styles =
                                            "border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50/70 text-[#B23A00] shadow-sm ring-1 ring-orange-100";
                                        label = "Running";
                                        icon = <FaSpinner className="h-4 w-4 shrink-0 animate-spin text-[#FF4500]" />;
                                    } else if (state === "waiting") {
                                        styles =
                                            "border-orange-300 bg-orange-50 text-[#B23A00] shadow-sm ring-1 ring-orange-200";
                                        label = "Needs input";
                                        icon = (
                                            <span className="relative flex h-3 w-3">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4500] opacity-60" />
                                                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#FF4500]" />
                                            </span>
                                        );
                                    }

                                    return (
                                        <div
                                            key={step.key}
                                            className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3.5 transition-all duration-300 ${styles}`}
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/80 text-xs font-bold text-current">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                                <span className="truncate text-sm font-semibold">{step.title}</span>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-2">
                                                <span className="hidden text-[10px] font-bold uppercase tracking-wider opacity-75 sm:inline">
                                                    {label}
                                                </span>
                                                {icon}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer note */}
                        <div className="flex items-start gap-3 rounded-xl border border-orange-100 bg-[#FFF8F4] px-4 py-3.5">
                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#FF4500]" />
                            <p className="text-xs leading-5 text-slate-600">
                                {isClarifying
                                    ? "Your answers help us search the right subreddits. The analysis resumes as soon as you continue."
                                    : isCompleted
                                        ? "All analysis stages have been completed successfully. Your research is ready."
                                        : "We're digging through Reddit threads for you. You can keep this page open while the analysis runs."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {showLoginModal && (
                <LoginModal
                    onClose={() => {
                        // Closing the modal only hides it.
                        // The completed pipeline and login CTA remain visible.
                        setShowLoginModal(false);
                    }}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </Shell>
    );
}

function Shell({ children }) {
    return (
        <div className="flex min-h-[91vh] w-full flex-col items-center justify-center px-4 py-12">
            {children}
        </div>
    );
}

function BackButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="mb-4 flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-[#FF4500]"
        >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
    );
}

function QueryBanner({ query, flush = false }) {
    if (!query) return null;
    return (
        <div
            className={`flex items-start gap-3 rounded-xl border border-orange-100 bg-[#FFF8F4] px-4 py-3 ${flush ? "" : "mb-6"
                }`}
        >
            <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4500]" />
            <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF4500]">
                    Your query
                </p>
                <p className="mt-0.5 text-sm font-medium leading-6 text-[#1A1A1B]">{query}</p>
            </div>
        </div>
    );
}