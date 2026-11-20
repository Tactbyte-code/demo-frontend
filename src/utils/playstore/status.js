export const PSTATUS = {
  CREATED: "CREATED",
  FETCHING: "FETCHING",
  FETCH_COMPLETE: "FETCH_COMPLETE",
  SUMMARIZING: "SUMMARIZING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
};

export const POLL_INTERVAL_MS = 3000;

// Every non-terminal status is a "backend is working / we must trigger the next step" state.
export const POLLING_STATUSES = new Set([
  PSTATUS.CREATED,
  PSTATUS.FETCHING,
  PSTATUS.FETCH_COMPLETE,
  PSTATUS.SUMMARIZING,
]);

export const STAGE_LABELS = {
  [PSTATUS.CREATED]: "Getting your analysis ready...",
  [PSTATUS.FETCHING]: "Collecting reviews from the Play Store...",
  [PSTATUS.FETCH_COMPLETE]: "Reviews collected. Preparing the analysis...",
  [PSTATUS.SUMMARIZING]: "Reading every review and extracting insights...",
  [PSTATUS.COMPLETED]: "Your Play Store analysis is ready.",
  [PSTATUS.FAILED]: "Something went wrong.",
};

export const PIPELINE_STEPS = [
  { key: "prepare", title: "Preparing request", hint: "Validating the app and settings" },
  { key: "fetch", title: "Fetching reviews", hint: "Pulling user reviews from Google Play" },
  { key: "analyze", title: "Analyzing feedback", hint: "Finding themes, pain points and sentiment" },
  { key: "done", title: "Report ready", hint: "Your insights are good to go" },
];

export const STATUS_TO_STEP = {
  [PSTATUS.CREATED]: "prepare",
  [PSTATUS.FETCHING]: "fetch",
  [PSTATUS.FETCH_COMPLETE]: "analyze",
  [PSTATUS.SUMMARIZING]: "analyze",
  [PSTATUS.COMPLETED]: "done",
};

export const STATUS_PROGRESS = {
  [PSTATUS.CREATED]: 8,
  [PSTATUS.FETCHING]: 32,
  [PSTATUS.FETCH_COMPLETE]: 58,
  [PSTATUS.SUMMARIZING]: 82,
  [PSTATUS.COMPLETED]: 100,
};

export const normalizeStatus = (data) => {
  const raw = typeof data === "string" ? data : data?.status;
  return typeof raw === "string" ? raw.toUpperCase() : undefined;
};