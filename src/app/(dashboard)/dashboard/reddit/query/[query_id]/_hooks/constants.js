export const STEPS = [
    { key: "WEB_SEARCHING", label: "Searching discussions", desc: "Scanning relevant Reddit threads" },
    { key: "SEARCH_COMPLETE", label: "Insights gathered", desc: "Found relevant conversations" },
    { key: "SUMMARIZING", label: "Crafting your answer", desc: "Turning discussions into clear insights" },
    { key: "COMPLETED", label: "Ready", desc: "Your answer is prepared" },
];

export const STEP_INDEX = Object.fromEntries(STEPS.map((s, i) => [s.key, i]));
export const MAX_APPROVED = 10;

export const FAILURE_MESSAGES = {
    LLM_ERROR: "Oops — something went wrong while thinking this through.",
    SEARCH_ERROR: "Hmm, couldn't pull Reddit threads right now.",
    SUMMARIZATION_ERROR: "We couldn't turn the data into a clear answer.",
    TIMEOUT: "This is taking longer than expected. Please retry.",
    UNKNOWN: "Something unexpected happened. Please try again.",
};