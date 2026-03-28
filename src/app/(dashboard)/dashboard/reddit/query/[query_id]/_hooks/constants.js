export const STEPS = [
    { key: "CREATED", label: "Created", desc: "Query saved" },
    { key: "CLARIFYING", label: "Clarifying", desc: "Gathering context" },
    { key: "CLARIFIED", label: "Intent understood", desc: "Ready to search" },
    { key: "WEB_SEARCHING", label: "Searching Reddit", desc: "Scanning relevant threads" },
    { key: "SEARCH_COMPLETE", label: "Results found", desc: "Reddit data collected" },
    { key: "SUMMARIZING", label: "Generating answer", desc: "Synthesising insights" },
    { key: "COMPLETED", label: "Done", desc: "Your answer is ready" },
];

export const STEP_INDEX = Object.fromEntries(STEPS.map((s, i) => [s.key, i]));
export const MAX_APPROVED = 10;

export const FAILURE_MESSAGES = {
    LLM_ERROR: "Something went wrong with the AI.",
    SEARCH_ERROR: "Reddit search failed. Please try again.",
    //   NO_RESULTS:          "No relevant Reddit threads found for your query.",
    SUMMARIZATION_ERROR: "Failed to generate an answer.",
    TIMEOUT: "The request timed out.",
    UNKNOWN: "An unexpected error occurred.",
};