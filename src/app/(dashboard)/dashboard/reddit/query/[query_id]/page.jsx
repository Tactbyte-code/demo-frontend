"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { getQuery, getQueryResult, getQueryPosts } from "@/lib/api/reddit";
import api from "@/lib/axios";

import { useQueryStatus } from "./_hooks/useQueryStatus";
import { usePostApproval } from "./_hooks/usePostApproval";
import { useStreamLabel, streamRequest } from "./_hooks/useStream";
import { usePolling } from "./_hooks/usePolling";

import { PageShell, LoadingSkeleton } from "./_components/Layout";
import { QueryCard } from "./_components/QueryCard";
import { Pipeline } from "./_components/Pipeline";
import { AnswerCard } from "./_components/AnswerCard";
import { SourcesList } from "./_components/SourcesList";
import { SummaryResult } from "./_components/SummaryResult";

const POSTS_STATUSES = ["SEARCH_COMPLETE", "SUMMARIZING", "COMPLETED"];

export default function QueryResultPage() {
    const { query_id } = useParams();
    const router = useRouter();

    const [query, setQuery] = useState(null);
    const [status, setStatus] = useState(null);
    const [failureReason, setFailureReason] = useState(null);
    const [failedAtStep, setFailedAtStep] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [sources, setSources] = useState([]);
    const [streamChunks, setStreamChunks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [postsLoaded, setPostsLoaded] = useState(false);
    const [isPolling, setIsPolling] = useState(false);
    const [summary, setSummary] = useState(null);

    // ── fetch helpers ──────────────────────────────────────────────────────────
    const fetchPosts = useCallback(async () => {
        try {
            const data = await getQueryPosts(query_id);
            setSources(data.posts || []);
            setPostsLoaded(true);
        } catch (e) {
            console.error(e);
            setPostsLoaded(true); // unblock UI even on error
        }
    }, [query_id]);

    const fetchResult = useCallback(async () => {
        try {
            const data = await getQueryResult(query_id);
            // setAnswer(data.answer);
            setSummary(data); // store full summary object
        } catch (e) {
            console.error(e);
        }
    }, [query_id]);

    // ── init ───────────────────────────────────────────────────────────────────
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

                if (POSTS_STATUSES.includes(data.status)) await fetchPosts();
                if (data.status === "COMPLETED") await fetchResult();
            } catch (e) {
                console.error(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        init();
        return () => {
            cancelled = true;
        };
    }, [query_id, fetchPosts, fetchResult]);

    // ── polling ────────────────────────────────────────────────────────────────
    usePolling({
        queryId: query_id,
        active: isPolling,
        onStatusChange: (newStatus, data) => {
            // reset posts state before status update so SourcesList
            // stays hidden during the fetchPosts network gap
            if (POSTS_STATUSES.includes(newStatus)) {
                setSources([]);
                setPostsLoaded(false);
            }
            setStatus(newStatus);
            if (data?.failure_reason) setFailureReason(data.failure_reason);
            if (data?.failed_at_step) setFailedAtStep(data.failed_at_step);
        },
        onDone: async (data) => {
            setIsPolling(false);
            if (data.status === "SEARCH_COMPLETE") await fetchPosts();
            if (data.status === "COMPLETED") {
                setStatus("COMPLETED");
                await fetchResult();
            }
            if (data.status === "FAILED") {
                setFailureReason(data.failure_reason ?? "UNKNOWN");
                setFailedAtStep(data.failed_at_step ?? "search");
            }
        },
    });

    // ── hooks ──────────────────────────────────────────────────────────────────
    const qs = useQueryStatus(status, postsLoaded, failureReason, failedAtStep);

    const { approvedCount, approvalError, setApprovalError, handleToggleApproval, handleSelectTop10, pendingIds } = usePostApproval(query_id, sources, setSources);

    const getStreamLabel = useStreamLabel(sources);

    // ── stream ─────────────────────────────────────────────────────────────────
    const runStream = useCallback(
        async (endpoint) => {
            await streamRequest({
                queryId: query_id,
                endpoint,
                onStatus: setStatus,
                onAnswer: setAnswer,
                onFailureReason: setFailureReason,
                onFailedAtStep: setFailedAtStep,
                onResults: setSources,
                onFetchPosts: fetchPosts,
                onChunk: (chunk) => setStreamChunks((prev) => [...prev, chunk]),
            });
        },
        [query_id, fetchPosts],
    );

    // ── actions ────────────────────────────────────────────────────────────────
    const handleTriggerSearch = async () => {
        setActionLoading(true);
        setStreamChunks([]);
        setSources([]);
        setPostsLoaded(false);
        setApprovalError(null);
        setFailureReason(null);
        setFailedAtStep(null);
        try {
            await api.post(`/reddit/query/${query_id}/search`);
            setStatus("WEB_SEARCHING");
            setIsPolling(true);
        } catch (e) {
            setStatus("FAILED");
            setFailureReason("UNKNOWN");
            setFailedAtStep("search");
        } finally {
            setActionLoading(false);
        }
    };

    const handleContinueToSummarize = async () => {
        if (approvedCount === 0) {
            setApprovalError("Please select at least 1 post before summarizing.");
            return;
        }
        setActionLoading(true);
        setFailureReason(null);
        setFailedAtStep(null);
        try {
            await runStream("summarize");
            // If the stream handed off to a background job, the status will
            // be SUMMARIZING — activate polling to track it to completion.
            setStatus((prev) => {
                if (prev === "SUMMARIZING") setIsPolling(true);
                return prev;
            });
        } catch (e) {
            setStatus("FAILED");
            setFailureReason("UNKNOWN");
            setFailedAtStep("summarize");
        } finally {
            setActionLoading(false);
        }
    };

    const handleRetrySearch = async () => {
        setActionLoading(true);
        try {
            await api.post(`/reddit/query/${query_id}/retry-search`);
            setStatus("CLARIFIED");
            setFailureReason(null);
            setFailedAtStep(null);
            setSources([]);
            setPostsLoaded(false);
            setStreamChunks([]);
            setIsPolling(true);
        } catch (e) {
            console.error(e);
        } finally {
            setActionLoading(false);
        }
    };

    const handleRetrySummarize = async () => {
        setActionLoading(true);
        try {
            await api.post(`/reddit/query/${query_id}/retry-summarize`);
            setStatus("SEARCH_COMPLETE");
            setFailureReason(null);
            setFailedAtStep(null);
            setStreamChunks([]);
            setIsPolling(true);
        } catch (e) {
            console.error(e);
        } finally {
            setActionLoading(false);
        }
    };

    // ── render ─────────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <PageShell>
                <LoadingSkeleton />
            </PageShell>
        );
    }

    return (
        <PageShell>
            {/* back */}
            <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.push("/dashboard/reddit")}
                className="flex items-center gap-2 mb-8 text-xs font-semibold uppercase tracking-widest transition-all"
                style={{ color: "var(--text-subtle)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
            >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
            </motion.button>

            <QueryCard query={query} />

            <Pipeline
                showPipeline={qs.showPipeline}
                status={status}
                currentStep={qs.currentStep}
                progressPercent={qs.progressPercent}
                isProcessing={qs.isProcessing}
                isCheckpoint={qs.isCheckpoint}
                isClarifying={qs.isClarifying}
                isClarified={qs.isClarified}
                isSearchComplete={qs.isSearchComplete}
                isCompleted={qs.isCompleted}
                isFailed={qs.isFailed}
                isTimeout={qs.isTimeout}
                isCancelled={qs.isCancelled}
                isTerminal={qs.isTerminal}
                canRetrySearch={qs.canRetrySearch}
                canRetrySummarize={qs.canRetrySummarize}
                actionLoading={actionLoading}
                sources={sources}
                approvedCount={approvedCount}
                streamChunks={streamChunks}
                getStatusLabel={qs.getStatusLabel}
                getStatusColor={qs.getStatusColor}
                getProgressColor={qs.getProgressColor}
                getTerminalMessage={qs.getTerminalMessage}
                getStreamLabel={getStreamLabel}
                onClarify={() => router.push(`/dashboard/reddit/query/${query_id}/clarify`)}
                onSearch={handleTriggerSearch}
                onSummarize={handleContinueToSummarize}
                onRetrySearch={handleRetrySearch}
                onRetrySummarize={handleRetrySummarize}
            />

            {status === "COMPLETED" && summary && (
                <>
                    <SummaryResult data={summary} />
                </>
            )}

            <SourcesList
                postsLoaded={postsLoaded}
                showSources={qs.showSources}
                sources={sources}
                approvedCount={approvedCount}
                approvalError={approvalError}
                isSearchComplete={qs.isSearchComplete}
                onDismissError={() => setApprovalError(null)}
                onToggle={handleToggleApproval}
                pendingIds={pendingIds}
                onSelectTop10={handleSelectTop10}
            />
        </PageShell>
    );
}