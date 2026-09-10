import api from "@/lib/axios";

// ─── Query lifecycle ───────────────────────────────────────────────────────────

/**
 * POST /playstore/query
 * Submit a new playstore analysis query.
 * Body: { app_id, query, ... } — shaped by PlaystoreQueryInput schema
 * Returns the created query object with id + status
 */
export const createQuery = async (body) => {
    const response = await api.post("/playstore/query", body);
    return response.data;
};

/**
 * GET /playstore/queries
 * Fetch all queries for the current user.
 * Optional: pass a status string to filter (e.g. "COMPLETED")
 */
export const getQueries = async (status = null) => {
    const params = status ? { status } : {};
    const response = await api.get("/playstore/queries", { params });
    return response.data;
};

/**
 * GET /playstore/query/:id
 * Fetch a single query by id.
 */
export const getQuery = async (queryId) => {
    const response = await api.get(`/playstore/query/${queryId}`);
    return response.data;
};

// ─── Status polling ────────────────────────────────────────────────────────────

/**
 * GET /playstore/query/:id/status
 * Poll current pipeline status.
 * Returns { id, status, failure_reason, ... }
 */
export const getQueryStatus = async (queryId) => {
    const response = await api.get(`/playstore/query/${queryId}/status`);
    return response.data;
};

// ─── Pipeline triggers ─────────────────────────────────────────────────────────

/**
 * POST /playstore/query/:id/fetch
 * Trigger the review-fetch step.
 * Returns immediately; poll status until FETCHED or FAILED.
 */
export const triggerFetch = async (queryId) => {
    const response = await api.post(`/playstore/query/${queryId}/fetch`);
    return response.data;
};

/**
 * POST /playstore/query/:id/summarize
 * Trigger the summarization step.
 * Call only when status === "FETCHED".
 */
export const triggerSummarize = async (queryId) => {
    console.log('trigger summarize called');
    const response = await api.post(`/playstore/query/${queryId}/summarize`);
    return response.data;
};

// ─── Results ───────────────────────────────────────────────────────────────────

/**
 * GET /playstore/query/:id/result
 * Fetch final summary/analysis. Only call when status === "COMPLETED".
 */
export const getQueryResult = async (queryId) => {
    const response = await api.get(`/playstore/query/${queryId}/result`);
    return response.data;
};

/**
 * GET /playstore/query/:id/reviews
 * Fetch the raw reviews that were scraped for this query.
 */
export const getQueryReviews = async (queryId) => {
    const response = await api.get(`/playstore/query/${queryId}/reviews`);
    return response.data;
};

// ─── Retries ───────────────────────────────────────────────────────────────────

/**
 * POST /playstore/query/:id/retry-fetch
 * Retry the fetch step after a failure.
 */
export const retryFetch = async (queryId) => {
    const response = await api.post(`/playstore/query/${queryId}/retry-fetch`);
    return response.data;
};

/**
 * POST /playstore/query/:id/retry-summarize
 * Retry the summarize step after a failure.
 */
export const retrySummarize = async (queryId) => {
    const response = await api.post(`/playstore/query/${queryId}/retry-summarize`);
    return response.data;
};