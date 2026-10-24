// Mirrors the backend's ValidateQueryStatus enum
export const STATUS = {
    INITIALIZED: "INITIALIZED",
    CREATED: "CREATED",
    VALIDATING: "VALIDATING",
    VALIDATED: "VALIDATED",
    SEARCHING: "SEARCHING",
    SEARCH_COMPLETED: "SEARCH_COMPLETED",
    FILTERING: "FILTERING",
    FILTERED: "FILTERED",
    EXTRACTING: "EXTRACTING",
    EXTRACTED: "EXTRACTED",
    SCORING: "SCORING",
    SCORED: "SCORED",
    SUMMARIZING: "SUMMARIZING",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
}

export const STAGE_LABELS = {
    [STATUS.INITIALIZED]: "Initializing your request and setting up the execution environment...",
    [STATUS.CREATED]: "Generating contextual parameters and preparing the query pipeline...",
    [STATUS.VALIDATING]: "Validating the query parameters on the RunPod cluster...",
    [STATUS.VALIDATED]: "Query successfully validated; initiating the deep search process...",
    [STATUS.SEARCHING]: "Searching the web and gathering relevant insights...",
    [STATUS.SEARCH_COMPLETED]: "Search finished successfully; filtering the validated data...",
    [STATUS.FILTERING]: "Filtering out irrelevant data and cleaning the collected sources...",
    [STATUS.FILTERED]: "Data filtration complete; preparing content for extraction...",
    [STATUS.EXTRACTING]: "Extracting key information and structured details from sources...",
    [STATUS.EXTRACTED]: "Information extraction complete; evaluating content relevance...",
    [STATUS.SCORING]: "Scoring and ranking results based on accuracy and quality...",
    [STATUS.SCORED]: "Scoring finished; preparing the final synthesis...",
    [STATUS.SUMMARIZING]: "Synthesizing insights and generating the final report...",
    [STATUS.COMPLETED]: "Process completed successfully. Ready to view results.",
    [STATUS.FAILED]: "An error occurred during execution. Please try again.",
}

// Ordered pipeline stages for the visual stepper display
export const PIPELINE_STEPS = [
    { key: STATUS.INITIALIZED, title: "Initialization" },
    { key: STATUS.CREATED, title: "Context Generation" },
    // { key: STATUS.VALIDATING, title: "Cluster Validation" },
    { key: STATUS.SEARCHING, title: "Web Search" },
    { key: STATUS.FILTERING, title: "Data Filtering" },
    { key: STATUS.EXTRACTING, title: "Information Extraction" },
    { key: STATUS.SCORING, title: "Relevance Scoring" },
    { key: STATUS.SUMMARIZING, title: "Synthesis & Summary" },
    { key: STATUS.COMPLETED, title: "Completed" },
];

// Transitional statuses are not rendered as steps, so map each one to the
// pipeline step it leads into. This keeps progress from resetting to "all pending".
export const STATUS_TO_STEP = {
    [STATUS.INITIALIZED]: STATUS.INITIALIZED,
    [STATUS.CREATED]: STATUS.CREATED,
    [STATUS.VALIDATING]: STATUS.VALIDATING,
    [STATUS.VALIDATED]: STATUS.SEARCHING,
    [STATUS.SEARCHING]: STATUS.SEARCHING,
    [STATUS.SEARCH_COMPLETED]: STATUS.FILTERING,
    [STATUS.FILTERING]: STATUS.FILTERING,
    [STATUS.FILTERED]: STATUS.EXTRACTING,
    [STATUS.EXTRACTING]: STATUS.EXTRACTING,
    [STATUS.EXTRACTED]: STATUS.SCORING,
    [STATUS.SCORING]: STATUS.SCORING,
    [STATUS.SCORED]: STATUS.SUMMARIZING,
    [STATUS.SUMMARIZING]: STATUS.SUMMARIZING,
    [STATUS.COMPLETED]: STATUS.COMPLETED,
};