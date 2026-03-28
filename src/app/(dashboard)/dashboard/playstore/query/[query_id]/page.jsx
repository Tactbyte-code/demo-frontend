"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { getQuery, getQueryStatus, getQueryResult, getQueryReviews, triggerFetch, triggerSummarize, retryFetch, retrySummarize } from "@/lib/api/playstore";

import { useQueryStatus } from "./_hooks/useQueryStatus";
import { usePolling } from "./_hooks/usePolling";

import { PageShell, LoadingSkeleton } from "./_components/Layout";
import { QueryCard } from "./_components/QueryCard";
import { Pipeline } from "./_components/Pipeline";
import { SummaryResult } from "./_components/SummaryResult";
import { ReviewsList } from "./_components/ReviewsList";

// Statuses that have reviews available
const REVIEWS_STATUSES = ["FETCH_COMPLETE", "SUMMARIZING", "COMPLETED"];

export default function PlaystoreQueryDetailPage() {
    const { query_id } = useParams();
    const router = useRouter();

    const [query, setQuery] = useState(null);
    const [status, setStatus] = useState(null);
    const [failureReason, setFailureReason] = useState(null);
    const [failedAtStep, setFailedAtStep] = useState(null);
    const [summary, setSummary] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoaded, setReviewsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [isPolling, setIsPolling] = useState(false);

    // ── fetch helpers ────────────────────────────────────────────────────────────
    const fetchReviews = useCallback(async () => {
        try {
            const data = await getQueryReviews(query_id);
            setReviews(data.reviews ?? data ?? []);
            setReviewsLoaded(true);
        } catch (e) {
            console.error("[fetchReviews]", e);
            setReviewsLoaded(true); // unblock UI even on error
        }
    }, [query_id]);

    const fetchResult = useCallback(async () => {
        try {
            const data = await getQueryResult(query_id);
            console.log('result: ', data);

            setSummary(data);
        } catch (e) {
            console.error("[fetchResult]", e);
        }
    }, [query_id]);

    // ── init ─────────────────────────────────────────────────────────────────────
    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            try {
                const data = await getQuery(query_id);
                if (cancelled) return;

                setQuery(data);
                setStatus(data.status);
                setFailureReason(data.failure_reason ?? null);
                setFailedAtStep(data.failed_at_step ?? null);

                if (REVIEWS_STATUSES.includes(data.status)) await fetchReviews();
                if (data.status === "COMPLETED") await fetchResult();

                // If still in-flight, activate polling
                if (!["COMPLETED", "FAILED"].includes(data.status)) {
                    setIsPolling(true);
                }
            } catch (e) {
                console.error("[init]", e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        init();
        return () => {
            cancelled = true;
        };
    }, [query_id, fetchReviews, fetchResult]);

    // ── polling ──────────────────────────────────────────────────────────────────
    usePolling({
        queryId: query_id,
        active: isPolling,
        onStatusChange: (newStatus, data) => {
            if (REVIEWS_STATUSES.includes(newStatus)) {
                setReviews([]);
                setReviewsLoaded(false);
            }
            setStatus(newStatus);
            if (data?.failure_reason) setFailureReason(data.failure_reason);
            if (data?.failed_at_step) setFailedAtStep(data.failed_at_step);
        },
        onDone: async (data) => {
            setIsPolling(false);
            if (data.status === "FETCH_COMPLETE") await fetchReviews();
            if (data.status === "COMPLETED") {
                setStatus("COMPLETED");
                await Promise.all([fetchReviews(), fetchResult()]);
            }
            if (data.status === "FAILED") {
                setStatus("FAILED");
                setFailureReason(data.failure_reason ?? "UNKNOWN");
                setFailedAtStep(data.failed_at_step ?? "fetch");
            }
        },
    });

    // ── derived status flags ─────────────────────────────────────────────────────
    const qs = useQueryStatus(status, failureReason, failedAtStep);

    // ── actions ──────────────────────────────────────────────────────────────────
    const handleFetch = async () => {
        setActionLoading(true);
        setReviews([]);
        setReviewsLoaded(false);
        setFailureReason(null);
        setFailedAtStep(null);
        try {
            await triggerFetch(query_id);
            setStatus("FETCHING");
            setIsPolling(true);
        } catch (e) {
            setStatus("FAILED");
            setFailureReason("UNKNOWN");
            setFailedAtStep("fetch");
        } finally {
            setActionLoading(false);
        }
    };

    const handleSummarize = async () => {
        setActionLoading(true);
        setFailureReason(null);
        setFailedAtStep(null);
        try {
            await triggerSummarize(query_id);
            setStatus("SUMMARIZING");
            setIsPolling(true);
        } catch (e) {
            setStatus("FAILED");
            setFailureReason("UNKNOWN");
            setFailedAtStep("summarize");
        } finally {
            setActionLoading(false);
        }
    };

    const handleRetryFetch = async () => {
        setActionLoading(true);
        setReviews([]);
        setReviewsLoaded(false);
        setFailureReason(null);
        setFailedAtStep(null);
        try {
            await retryFetch(query_id);
            setStatus("FETCHING");
            setIsPolling(true);
        } catch (e) {
            console.error(e);
        } finally {
            setActionLoading(false);
        }
    };

    const handleRetrySummarize = async () => {
        setActionLoading(true);
        setFailureReason(null);
        setFailedAtStep(null);
        try {
            await retrySummarize(query_id);
            setStatus("SUMMARIZING");
            setIsPolling(true);
        } catch (e) {
            console.error(e);
        } finally {
            setActionLoading(false);
        }
    };

    // ── render ───────────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <PageShell>
                <LoadingSkeleton />
            </PageShell>
        );
    };

    return (
        <PageShell>
            {/* Back */}
            <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.push("/dashboard/playstore")}
                className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-widest transition-all"
                style={{ color: "var(--text-subtle)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
            >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
            </motion.button>

            {/* Query metadata */}
            <QueryCard query={query} />

            {/* Pipeline progress + action buttons */}
            <Pipeline
                showPipeline={qs.showPipeline}
                status={status}
                progressPercent={qs.progressPercent}
                isProcessing={qs.isProcessing}
                isCheckpoint={qs.isCheckpoint}
                isFetchComplete={qs.isFetchComplete}
                isCompleted={qs.isCompleted}
                isFailed={qs.isFailed}
                isCreated={qs.isCreated}
                isTerminal={qs.isTerminal}
                canRetryFetch={qs.canRetryFetch}
                canRetrySummarize={qs.canRetrySummarize}
                actionLoading={actionLoading}
                getStatusLabel={qs.getStatusLabel}
                getStatusColor={qs.getStatusColor}
                getProgressColor={qs.getProgressColor}
                getTerminalMessage={qs.getTerminalMessage}
                onFetch={handleFetch}
                onSummarize={handleSummarize}
                onRetryFetch={handleRetryFetch}
                onRetrySummarize={handleRetrySummarize}
            />

            {/* Analysis results */}
            {status === "COMPLETED" && summary && (
                <>
                    <SummaryResult data={summary} />
                    {/* Raw reviews */}
                    <ReviewsList reviewsLoaded={reviewsLoaded} showReviews={qs.showReviews} reviews={reviews} />
                </>
            )}
        </PageShell>
    );
}