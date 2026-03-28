/**
 * useQueryStatus
 * Derives all UI-facing booleans + helpers from the raw pipeline status string.
 * Mirrors the Reddit implementation exactly — just adapted for the Playstore pipeline.
 *
 * Pipeline: CREATED → FETCHING → FETCH_COMPLETE → SUMMARIZING → COMPLETED | FAILED
 */

const STEP_ORDER = ["CREATED", "FETCHING", "FETCH_COMPLETE", "SUMMARIZING", "COMPLETED"];

const PROGRESS_MAP = {
    CREATED: 5,
    FETCHING: 30,
    FETCH_COMPLETE: 55,
    SUMMARIZING: 80,
    COMPLETED: 100,
    FAILED: 0,
};

const STATUS_LABELS = {
    CREATED: "Query created",
    FETCHING: "Fetching reviews…",
    FETCH_COMPLETE: "Reviews ready",
    SUMMARIZING: "Analyzing reviews…",
    COMPLETED: "Analysis complete",
    FAILED: "Failed",
};

const STATUS_COLORS = {
    CREATED: "var(--text-muted)",
    FETCHING: "var(--primary)",
    FETCH_COMPLETE: "var(--accent)",
    SUMMARIZING: "var(--primary)",
    COMPLETED: "var(--success)",
    FAILED: "var(--destructive)",
};

const PROGRESS_COLORS = {
    CREATED: "var(--primary)",
    FETCHING: "var(--primary)",
    FETCH_COMPLETE: "var(--accent)",
    SUMMARIZING: "var(--primary)",
    COMPLETED: "var(--success)",
    FAILED: "var(--destructive)",
};

const FAILURE_MESSAGES = {
    FETCH_ERROR: "Failed to fetch reviews from the Play Store.",
    NO_RESULTS: "No reviews were found for this app.",
    LLM_ERROR: "The AI model encountered an error during analysis.",
    SUMMARIZATION_ERROR: "Summarization failed. Please retry.",
    TIMEOUT: "The pipeline timed out. Please retry.",
    UNKNOWN: "An unexpected error occurred.",
};

export function useQueryStatus(status, failureReason, failedAtStep) {
    const isFailed = status === "FAILED";
    const isCompleted = status === "COMPLETED";
    const isFetching = status === "FETCHING";
    const isFetchComplete = status === "FETCH_COMPLETE";
    const isSummarizing = status === "SUMMARIZING";
    const isCreated = status === "CREATED";
    const isTerminal = isCompleted || isFailed;
    const isProcessing = isFetching || isSummarizing;

    // Checkpoint = user can trigger next step manually
    const isCheckpoint = isFetchComplete;

    // Whether to show the pipeline progress UI at all
    const showPipeline = !!status;

    // Whether to show reviews panel
    const showReviews = ["FETCH_COMPLETE", "SUMMARIZING", "COMPLETED"].includes(status);

    // Retry capabilities
    const canRetryFetch = isFailed && failedAtStep === "fetch";
    const canRetrySummarize = isFailed && failedAtStep === "summarize";

    const currentStep = STEP_ORDER.indexOf(isFailed ? "FAILED" : status);
    const progressPercent = PROGRESS_MAP[status] ?? 0;

    const getStatusLabel = (s) => STATUS_LABELS[s] ?? s;
    const getStatusColor = (s) => STATUS_COLORS[s] ?? "var(--text-muted)";
    const getProgressColor = (s) => PROGRESS_COLORS[s] ?? "var(--primary)";

    const getTerminalMessage = () => {
        if (!isFailed) return null;
        return FAILURE_MESSAGES[failureReason] ?? FAILURE_MESSAGES.UNKNOWN;
    };

    return {
        // booleans
        isCreated,
        isFetching,
        isFetchComplete,
        isSummarizing,
        isCompleted,
        isFailed,
        isTerminal,
        isProcessing,
        isCheckpoint,
        // display
        showPipeline,
        showReviews,
        // retries
        canRetryFetch,
        canRetrySummarize,
        // progress
        currentStep,
        progressPercent,
        // helpers
        getStatusLabel,
        getStatusColor,
        getProgressColor,
        getTerminalMessage,
    };
}