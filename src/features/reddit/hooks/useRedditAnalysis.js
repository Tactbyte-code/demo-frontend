import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import {
  getQuery,
  getQueryPosts,
  getQueryResult,
  submitClarification,
} from "@/lib/api/reddit";
// Adjust this path to wherever your existing streamRequest helper lives.
import {
  POLL_INTERVAL_MS,
  POLLING_STATUSES,
  normalizeStatus,
} from "@/utils/reddit/status";
import { streamRequest } from "./useStream";

export const redditKeys = {
  query: (id) => ["reddit-query", id],
  posts: (id) => ["reddit-query-posts", id],
  result: (id) => ["reddit-query-result", id],
};

/**
 * Single source of truth for the query. Polls every 3s while the backend is
 * working. Polling stops on CLARIFYING (waiting for the user), COMPLETED and FAILED.
 */
export const useRedditQueryStatus = (queryId) =>
  useQuery({
    queryKey: redditKeys.query(queryId),
    queryFn: () => getQuery(queryId),
    enabled: !!queryId,
    select: (data) => ({ ...data, status: normalizeStatus(data) }),
    refetchInterval: (query) => {
      const status = normalizeStatus(query.state.data);
      return status && POLLING_STATUSES.has(status) ? POLL_INTERVAL_MS : false;
    },
    refetchIntervalInBackground: false,
    retry: 2,
  });

export const useRedditPosts = (queryId, enabled) =>
  useQuery({
    queryKey: redditKeys.posts(queryId),
    queryFn: () => getQueryPosts(queryId),
    enabled: !!queryId && enabled,
    select: (data) => data?.posts || [],
  });

export const useRedditResult = (queryId, enabled) =>
  useQuery({
    queryKey: redditKeys.result(queryId),
    queryFn: () => getQueryResult(queryId),
    enabled: !!queryId && enabled,
  });

const useInvalidateLists = () => {
  const queryClient = useQueryClient();
  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")?.firebase_uid
      : null;
  return () => queryClient.invalidateQueries({ queryKey: ["queries", userId] });
};

/** Answer (or skip) the current clarifying question. */
export const useSubmitClarification = (queryId) => {
  const queryClient = useQueryClient();
  const invalidateLists = useInvalidateLists();

  return useMutation({
    mutationFn: ({ answer, skip = false }) =>
      submitClarification(queryId, answer, skip),
    onSuccess: (response) => {
      invalidateLists();

      queryClient.setQueryData(redditKeys.query(queryId), (old) => {
        if (!old) return old;

        // Another question: swap it in without waiting for a refetch.
        if (response?.status === "CLARIFYING") {
          return {
            ...old,
            status: "CLARIFYING",
            clarification_count: response.clarification_count,
            conversation_history: [
              ...(old.conversation_history || []),
              {
                role: "assistant",
                content: response.question,
                options: response.options || [],
              },
            ],
          };
        }

        // Clarification done: move to CLARIFIED so polling resumes and the
        // search auto-trigger fires.
        return { ...old, status: response?.status || "CLARIFIED" };
      });

      if (response?.status !== "CLARIFYING") {
        queryClient.invalidateQueries({ queryKey: redditKeys.query(queryId) });
      }
    },
  });
};

export const useTriggerSearch = (queryId) => {
  const queryClient = useQueryClient();
  const invalidateLists = useInvalidateLists();

  return useMutation({
    mutationFn: () => api.post(`/reddit/query/${queryId}/search`),
    onSuccess: () => {
      invalidateLists();
      queryClient.setQueryData(redditKeys.query(queryId), (old) =>
        old ? { ...old, status: "WEB_SEARCHING" } : old
      );
      queryClient.invalidateQueries({ queryKey: redditKeys.query(queryId) });
    },
  });
};

/** Summarization is streamed; the stream pushes status updates into the cache. */
export const useTriggerSummarize = (queryId) => {
  const queryClient = useQueryClient();
  const invalidateLists = useInvalidateLists();

  return useMutation({
    mutationFn: () =>
      streamRequest({
        queryId,
        endpoint: "summarize",
        onStatus: (status) =>
          queryClient.setQueryData(redditKeys.query(queryId), (old) =>
            old ? { ...old, status } : old
          ),
        onAnswer: () => {},
        onFailureReason: (failure_reason) =>
          queryClient.setQueryData(redditKeys.query(queryId), (old) =>
            old ? { ...old, failure_reason } : old
          ),
        onFailedAtStep: (failed_at_step) =>
          queryClient.setQueryData(redditKeys.query(queryId), (old) =>
            old ? { ...old, failed_at_step } : old
          ),
        onResults: () => {},
        onFetchPosts: () =>
          queryClient.invalidateQueries({ queryKey: redditKeys.posts(queryId) }),
        onChunk: () => {},
      }),
    onSettled: () => {
      invalidateLists();
      queryClient.invalidateQueries({ queryKey: redditKeys.query(queryId) });
    },
  });
};

const useRetry = (queryId, path, nextStatus) => {
  const queryClient = useQueryClient();
  const invalidateLists = useInvalidateLists();

  return useMutation({
    mutationFn: () => api.post(`/reddit/query/${queryId}/${path}`),
    onSuccess: () => {
      invalidateLists();
      queryClient.setQueryData(redditKeys.query(queryId), (old) =>
        old
          ? { ...old, status: nextStatus, failure_reason: null, failed_at_step: null }
          : old
      );
      queryClient.invalidateQueries({ queryKey: redditKeys.query(queryId) });
    },
  });
};

export const useRetrySearch = (queryId) =>
  useRetry(queryId, "retry-search", "CLARIFIED");

export const useRetrySummarize = (queryId) =>
  useRetry(queryId, "retry-summarize", "SEARCH_COMPLETE");