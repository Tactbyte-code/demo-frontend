import { STEP_INDEX, STEPS, FAILURE_MESSAGES } from "./constants";

export function useQueryStatus(status, postsLoaded, failureReason, failedAtStep) {
    const currentStep = STEP_INDEX[status] ?? 0;
    const progressPercent = ["FAILED", "TIMEOUT", "CANCELLED"].includes(status)
        ? 100
        : Math.round((currentStep / (STEPS.length - 1)) * 100);

    const isProcessing = ["WEB_SEARCHING", "SUMMARIZING"].includes(status);
    const isCheckpoint = ["CLARIFIED", "SEARCH_COMPLETE"].includes(status);
    const isClarifying = status === "CLARIFYING";
    const isClarified = status === "CLARIFIED";
    const isSearchComplete = status === "SEARCH_COMPLETE";
    const isCompleted = status === "COMPLETED";
    const isFailed = status === "FAILED";
    const isTimeout = status === "TIMEOUT";
    const isCancelled = status === "CANCELLED";
    const isTerminal = isFailed || isTimeout || isCancelled;
    const showPipeline = !!status;
    const showSources = postsLoaded && ["SEARCH_COMPLETE", "SUMMARIZING", "COMPLETED"].includes(status);

    // which retry button to show based on where it failed
    const canRetrySearch = isFailed && failedAtStep !== "summarize";
    const canRetrySummarize = isFailed && failedAtStep === "summarize";

    const getStatusLabel = () => {
        if (isFailed) return "Search failed";
        if (isTimeout) return "Request timed out";
        if (isCancelled) return "Cancelled";
        if (isCompleted) return "Analysis complete";
        if (isSearchComplete) return "Results found";
        if (isClarified) return "Ready to search";
        return STEPS[currentStep]?.label ?? status;
    };

    const getStatusColor = () => {
        if (isFailed) return "var(--destructive)";
        if (isTimeout) return "var(--warning)";
        if (isCancelled) return "var(--text-subtle)";
        if (isCompleted || isCheckpoint) return "var(--success)";
        return "var(--text-main)";
    };

    const getProgressColor = () => {
        if (isFailed || isTimeout) return "var(--destructive)";
        if (isCompleted) return "var(--success)";
        return "var(--primary)";
    };

    const getTerminalMessage = () => {
        if (isFailed) return FAILURE_MESSAGES[failureReason] ?? FAILURE_MESSAGES.UNKNOWN;
        if (isTimeout) return "The request took too long. Please try again.";
        if (isCancelled) return "This query was cancelled.";
        return null;
    };

    return {
        currentStep,
        progressPercent,
        isProcessing,
        isCheckpoint,
        isClarifying,
        isClarified,
        isSearchComplete,
        isCompleted,
        isFailed,
        isTimeout,
        isCancelled,
        isTerminal,
        showPipeline,
        showSources,
        canRetrySearch,
        canRetrySummarize,
        getStatusLabel,
        getStatusColor,
        getProgressColor,
        getTerminalMessage,
    };
}