export const RSTATUS = {
  CREATED: "CREATED",
  CLARIFYING: "CLARIFYING",
  CLARIFIED: "CLARIFIED",
  WEB_SEARCHING: "WEB_SEARCHING",
  SEARCH_COMPLETE: "SEARCH_COMPLETE",
  SUMMARIZING: "SUMMARIZING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
};

export const POLL_INTERVAL_MS = 3000;

// Statuses where the backend is working and we should keep polling.
// CLARIFYING is intentionally excluded: we are waiting on the user, so polling pauses
// until they answer (the submit mutation refetches and polling resumes automatically).
export const POLLING_STATUSES = new Set([
  RSTATUS.CREATED,
  RSTATUS.CLARIFIED,
  RSTATUS.WEB_SEARCHING,
  RSTATUS.SEARCH_COMPLETE,
  RSTATUS.SUMMARIZING,
]);

export const STAGE_LABELS = {
  [RSTATUS.CREATED]: "Understanding your query...",
  [RSTATUS.CLARIFYING]: "We need a little more detail from you.",
  [RSTATUS.CLARIFIED]: "Intent locked in. Preparing the search...",
  [RSTATUS.WEB_SEARCHING]: "Searching Reddit threads and discussions...",
  [RSTATUS.SEARCH_COMPLETE]: "Threads collected. Getting ready to analyze...",
  [RSTATUS.SUMMARIZING]: "Reading the threads and writing your insights...",
  [RSTATUS.COMPLETED]: "Your Reddit analysis is ready.",
  [RSTATUS.FAILED]: "Something went wrong.",
};

export const PIPELINE_STEPS = [
  { key: "understand", title: "Understanding query" },
  { key: "clarify", title: "Clarifying intent" },
  { key: "search", title: "Searching Reddit" },
  { key: "summarize", title: "Analyzing discussions" },
  { key: "done", title: "Report ready" },
];

export const STATUS_TO_STEP = {
  [RSTATUS.CREATED]: "understand",
  [RSTATUS.CLARIFYING]: "clarify",
  [RSTATUS.CLARIFIED]: "search",
  [RSTATUS.WEB_SEARCHING]: "search",
  [RSTATUS.SEARCH_COMPLETE]: "summarize",
  [RSTATUS.SUMMARIZING]: "summarize",
  [RSTATUS.COMPLETED]: "done",
};

// failed_at_step values coming from the backend that map to a retry action
export const normalizeStatus = (data) => {
  const raw = typeof data === "string" ? data : data?.status;
  return typeof raw === "string" ? raw.toUpperCase() : undefined;
};