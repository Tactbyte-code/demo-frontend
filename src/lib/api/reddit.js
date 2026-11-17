import api from "@/lib/axios";

// ─── Query lifecycle ──────────────────────────────────────────────────────────

/**
 * POST /reddit/query
 * Submit initial query.
 * Returns { id, status: "CLARIFYING", question } or { id, status: "CLARIFIED" }
 */
export const createQuery = async (query) => {
    const response = await api.post("/reddit/query", {
        query,
    });

    return response.data;
};

/**
 * GET /reddit/queries
 * Fetch all queries for the current user.
 */
export const getQueries = async () => {
    const response = await api.get("/reddit/queries");
    console.log('fetched queries: ', response);
    return response?.data;
};

/**
 * GET /reddit/query/:id
 * Fetch a single query by id.
 */
export const getQuery = async (queryId) => {
    const response = await api.get(`/reddit/query/${queryId}`);
    // console.log('fetched query: ', response);

    return response.data;
};

// ─── Clarification ────────────────────────────────────────────────────────────
/**
 * POST /reddit/query/:id/clarify
 * Submit answer to a clarifying question.
 * Returns { id, status: "CLARIFYING", question } or { id, status: "CLARIFIED" }
 */
export const submitClarification = async (queryId, answer, skip) => {
    const response = await api.post(`/reddit/query/${queryId}/clarify`, { answer, skip });
    console.log('clarification submitted: ', response);
    return response.data;
};

// ─── Search ───────────────────────────────────────────────────────────────────

/**
 * POST /reddit/query/:id/search
 * Trigger background search. Returns immediately with 202.
 * Returns { id, status: "WEB_SEARCHING" }
 */
export const triggerSearch = async (queryId) => {
    const response = await api.post(`/reddit/query/${queryId}/search`);
    return response.data;
};

/**
 * GET /reddit/query/:id/status
 * Poll current pipeline status.
 * Returns { id, status, failure_reason }
 */
export const getQueryStatus = async (queryId) => {
    const response = await api.get(`/reddit/query/${queryId}/status`);
    return response.data;
};

/**
 * GET /reddit/query/:id/result
 * Fetch final answer. Only call when status === "COMPLETED".
 * Returns { id, status, answer }
 */
export const getQueryResult = async (queryId) => {
    const response = await api.get(`/reddit/query/${queryId}/result`);
    return response.data;
};

export const getQueryPosts = async (queryId) => {
    const response = await api.get(`/reddit/query/${queryId}/posts`);
    return response.data;
};

const handleToggleApproval = async (postId, currentValue) => {
    try {
        await api.patch(`/reddit/query/${queryId}/posts/${postId}`, {
            user_approved: !currentValue
        })
        // update local state
    } catch (err) {
        if (err.response?.status === 400) {
            setApprovalError(err.response.data.detail)
        }
    }
}