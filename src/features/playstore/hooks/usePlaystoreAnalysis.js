import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQueryStatus,
  triggerFetch,
  triggerSummarize,
  retryFetch,
  retrySummarize,
} from "@/lib/api/playstore";
import {
  POLL_INTERVAL_MS,
  POLLING_STATUSES,
  normalizeStatus,
} from "@/utils/playstore/status";

export const playstoreKeys = {
  query: (id) => ["playstore-query", id],
};

/**
 * Single source of truth for the query. Polls every 3s while the query is
 * in-flight and stops on COMPLETED / FAILED.
 */
export const usePlaystoreQueryStatus = (queryId) =>
  useQuery({
    queryKey: playstoreKeys.query(queryId),
    queryFn: () => getQueryStatus(queryId),
    enabled: !!queryId,
    select: (data) => ({ ...data, status: normalizeStatus(data) }),
    refetchInterval: (query) => {
      const status = normalizeStatus(query.state.data);
      return status && POLLING_STATUSES.has(status) ? POLL_INTERVAL_MS : false;
    },
    refetchIntervalInBackground: false,
    retry: 2,
  });

const useInvalidateLists = () => {
  const queryClient = useQueryClient();
  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")?.firebase_uid
      : null;
  return () => queryClient.invalidateQueries({ queryKey: ["play-queries", userId] });
};

/**
 * Builds a mutation that fires a pipeline step and optimistically moves the
 * cached status forward so polling picks up from the right place.
 * On failure it flags the cached query as FAILED at the given step.
 */
const usePipelineMutation = ({ queryId, mutationFn, nextStatus, failedAtStep }) => {
  const queryClient = useQueryClient();
  const invalidateLists = useInvalidateLists();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      invalidateLists();
      queryClient.setQueryData(playstoreKeys.query(queryId), (old) =>
        old
          ? { ...old, status: nextStatus, failure_reason: null, failed_at_step: null }
          : old
      );
      queryClient.invalidateQueries({ queryKey: playstoreKeys.query(queryId) });
    },
    onError: () => {
      // Set FAILED locally. Do not refetch: that would overwrite the state we just set.
      queryClient.setQueryData(playstoreKeys.query(queryId), (old) =>
        old
          ? {
              ...old,
              status: "FAILED",
              failure_reason: "UNKNOWN",
              failed_at_step: failedAtStep,
            }
          : old
      );
    },
  });
};

export const useTriggerFetch = (queryId) =>
  usePipelineMutation({
    queryId,
    mutationFn: () => triggerFetch(queryId),
    nextStatus: "FETCHING",
    failedAtStep: "fetch",
  });

export const useTriggerSummarize = (queryId) =>
  usePipelineMutation({
    queryId,
    mutationFn: () => triggerSummarize(queryId),
    nextStatus: "SUMMARIZING",
    failedAtStep: "summarize",
  });

export const useRetryFetch = (queryId) =>
  usePipelineMutation({
    queryId,
    mutationFn: () => retryFetch(queryId),
    nextStatus: "FETCHING",
    failedAtStep: "fetch",
  });

export const useRetrySummarize = (queryId) =>
  usePipelineMutation({
    queryId,
    mutationFn: () => retrySummarize(queryId),
    nextStatus: "SUMMARIZING",
    failedAtStep: "summarize",
  });