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
import { useQueryClient } from "@tanstack/react-query";
import { useGetSummary } from "@/features/reddit/hooks/useGetSummary";

const POSTS_STATUSES = ["SEARCH_COMPLETE", "SUMMARIZING", "COMPLETED", "WEB_SEARCHING"];

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
    const [autoSearchFired, setAutoSearchFired] = useState(false);
    const [autoSummarizeFired, setAutoSummarizeFired] = useState(false);
    const [isSummarized, setIsSummarized] = useState(false);
    const [isRequerying, setIsRequerying] = useState(false);

    const user_id = localStorage.getItem('user').firebase_uid;

    const queryClient = useQueryClient();

    const { data: summData } = useGetSummary(query_id);
    console.log('summ data: ', summData);

    // ── fetch helpers ──────────────────────────────────────────────────────────
    const fetchPosts = useCallback(async () => {
        try {
            const data = await getQueryPosts(query_id);
            console.log('resource posts: ', data);

            setSources(data?.posts || []);
            setPostsLoaded(true);
        } catch (e) {
            console.error(e);
            setPostsLoaded(true); // unblock UI even on error
        }
    }, [query_id]);

    // get summary when completed
    const fetchResult = useCallback(async () => {
        setIsSummarized(false);

        try {
            const data = await getQueryResult(query_id);
            console.log('final summary: ', data);

            setSummary(data); // store full summary object
        } catch (e) {
            console.error(e);
        } finally {
            setIsSummarized(true);
        }
    }, [query_id]);

    // ── get the query on load - status, query, etc.
    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            try {
                const data = await getQuery(query_id);
                console.log('get a query: ', data);

                if (cancelled) return;

                setQuery(data?.query);
                setStatus(data?.status);
                setFailureReason(data.failure_reason ?? null);
                setFailedAtStep(data.failed_at_step ?? null);

                if (POSTS_STATUSES?.includes(data.status)) await fetchPosts();
                if (data?.status === "COMPLETED") await fetchResult();
                // if (data?.status === "COMPLETED") handleFetch();
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
    // }, [query_id, fetchPosts]);

    // ── polling ────────────────────────────────────────────────────────────────
    usePolling({
        queryId: query_id,
        active: isPolling,
        onStatusChange: (newStatus, data) => {
            if (POSTS_STATUSES.includes(newStatus)) {
                // setSources([]);
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
    const handleTriggerSearch = useCallback(async () => {
        setActionLoading(true);
        setStreamChunks([]);
        setSources([]);
        setPostsLoaded(false);
        setApprovalError(null);
        setFailureReason(null);
        setFailedAtStep(null);
        try {
            const response = await api.post(`/reddit/query/${query_id}/search`);
            console.log('handle trigger search: ', response);
            if (response) queryClient.invalidateQueries({ queryKey: ["queries", user_id] });

            setStatus("WEB_SEARCHING");
            setIsPolling(true);
        } catch (e) {
            setStatus("FAILED");
            setFailureReason("UNKNOWN");
            setFailedAtStep("search");
        } finally {
            setActionLoading(false);
        }
    }, [query_id, setApprovalError]);

    // ── Auto-trigger search on mount when status is CLARIFIED ──────────────────
    useEffect(() => {
        if (!loading && status === "CLARIFIED" && !autoSearchFired) {
            setAutoSearchFired(true);
            handleTriggerSearch();
        }
    }, [loading, status, autoSearchFired, handleTriggerSearch]);

    const handleContinueToSummarize = useCallback(async ({ skipApprovalCheck = false } = {}) => {
        if (!skipApprovalCheck && approvedCount === 0) {
            setApprovalError("Please select at least 1 post before summarizing.");
            return;
        };

        setActionLoading(true);
        setFailureReason(null);
        setFailedAtStep(null);

        try {
            const response = await runStream("summarize");
            console.log('run stream: ', response);

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
    }, [approvedCount, runStream, setApprovalError]);

    // ── Auto-trigger summarize when SEARCH_COMPLETE and posts are loaded ───────
    useEffect(() => {
        if (
            status === "SEARCH_COMPLETE" &&
            postsLoaded &&
            !autoSummarizeFired &&
            !actionLoading
        ) {
            setAutoSummarizeFired(true);
            handleContinueToSummarize({ skipApprovalCheck: true });
        }
    }, [status, postsLoaded, autoSummarizeFired, actionLoading, handleContinueToSummarize]);

    const handleRetrySearch = async () => {
        setActionLoading(true);
        try {
            const response = await api.post(`/reddit/query/${query_id}/retry-search`);
            if (response) queryClient.invalidateQueries({ queryKey: ["queries", user_id] });

            console.log('handle retry search: ', response);

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
            const response = await api.post(`/reddit/query/${query_id}/retry-summarize`);
            if (response) queryClient.invalidateQueries({ queryKey: ["queries", user_id] });

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

    // console.log('parent page status: ', status);
    const isCompleted = status === "COMPLETED";

    // loading
    if (loading) {
        return (
            <PageShell>
                <LoadingSkeleton />
            </PageShell>
        );
    };

    return (
        <PageShell>
            {/* Back button */}
            <motion.button
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.push("/dashboard/reddit")}
                className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-widest transition-all"
                style={{ color: "var(--text-subtle)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
            >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
            </motion.button>

            <QueryCard
                query={query}
                isCompleted={isCompleted}
                onRequeryStart={() => setIsRequerying(true)}
            />

            {/* Processing Stages */}
            {(!isSummarized) && !isRequerying && (
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
            )}

            {status === "COMPLETED" && isSummarized && !isRequerying && (
                <>
                    <SummaryResult data={summary} sources={sources} approvedCount={10} onToggleSource={handleToggleApproval} />
                </>
            )}
        </PageShell>
    );
}