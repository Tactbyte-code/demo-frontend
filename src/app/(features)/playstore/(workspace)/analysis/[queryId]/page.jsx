"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  LockKeyhole,
  RefreshCw,
  Smartphone,
  Sparkles,
  Star,
  XCircle,
} from "lucide-react";
import { useCreditStore } from "@/store/useCreditStore";
import { useAuthStore } from "@/store/authStore";
import LoginModal from "@/components/auth/loginModal/LoginModal";
import { claimGuestReports } from "@/features/guest/guest.api";
// import {
//   usePlaystoreQueryStatus,
//   useTriggerFetch,
//   useTriggerSummarize,
//   useRetryFetch,
//   useRetrySummarize,
// } from "@/features/playstore/hooks/usePlaystoreAnalysis";
import {
  getQuery,
  getQueryStatus,
  triggerFetch,
  triggerSummarize,
  retryFetch,
  retrySummarize,
} from "@/lib/api/playstore";
import {
  PIPELINE_STEPS,
  PSTATUS,
  STAGE_LABELS,
  STATUS_PROGRESS,
  STATUS_TO_STEP,
  POLL_INTERVAL_MS,
  normalizeStatus,
} from "@/utils/playstore/status";

const reportPath = (queryId) => `/playstore/analysis/${queryId}/report`;

// Play Store green
const GREEN = "#01875F";

export default function PlaystoreAnalysisPage() {
  const { queryId } = useParams();
  const router = useRouter();
  const getCredits = useCreditStore((s) => s.getCredits);

  const user = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.loading);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [requiresLogin, setRequiresLogin] = useState(false);
  const [claimingReports, setClaimingReports] = useState(false);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [pollVersion, setPollVersion] = useState(0);

  const status = normalizeStatus(data);

  const isCompleted = status === PSTATUS.COMPLETED;
  const isFailed = status === PSTATUS.FAILED;

  const firedRef = useRef(new Set());

  const refetch = () => {
    setIsError(false);
    setIsLoading(true);
    setPollVersion((version) => version + 1);
  };

  // ── Status-driven pipeline polling ────────────────────────────────────────
  useEffect(() => {
    if (!queryId) return;

    let cancelled = false;
    let timeoutId = null;

    firedRef.current = new Set();

    const poll = async () => {
      try {
        const statusData = await getQueryStatus(queryId);

        if (cancelled) return;

        setData((previous) => ({
          ...previous,
          ...statusData,
        }));

        setIsLoading(false);
        setIsError(false);

        const currentStatus = normalizeStatus(statusData);

        // Stop polling when the analysis reaches a terminal state.
        if (
          currentStatus === PSTATUS.COMPLETED ||
          currentStatus === PSTATUS.FAILED
        ) {
          return;
        }

        // Step 1: Fetch Play Store reviews.
        if (currentStatus === PSTATUS.CREATED) {
          const key = `${queryId}:fetch`;

          if (!firedRef.current.has(key)) {
            firedRef.current.add(key);

            try {
              const result = await triggerFetch(queryId);

              if (cancelled) return;

              setData((previous) => ({
                ...previous,
                ...result,
              }));
            } catch (error) {
              if (cancelled) return;

              console.error("Failed to trigger Play Store fetch:", error);

              setData((previous) => ({
                ...previous,
                status: PSTATUS.FAILED,
                failure_reason:
                  error?.response?.data?.detail || "UNKNOWN",
                failed_at_step: "fetch",
              }));

              return;
            }
          }
        }

        // Step 2: Generate the summary after reviews are fetched.
        if (currentStatus === PSTATUS.FETCH_COMPLETE) {
          const key = `${queryId}:summarize`;

          if (!firedRef.current.has(key)) {
            firedRef.current.add(key);

            try {
              const result = await triggerSummarize(queryId);

              if (cancelled) return;

              setData((previous) => ({
                ...previous,
                ...result,
              }));
            } catch (error) {
              if (cancelled) return;

              console.error("Failed to trigger Play Store summary:", error);

              setData((previous) => ({
                ...previous,
                status: PSTATUS.FAILED,
                failure_reason:
                  error?.response?.data?.detail || "UNKNOWN",
                failed_at_step: "summarize",
              }));

              return;
            }
          }
        }

        // Schedule the next status check.
        timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
      } catch (error) {
        if (cancelled) return;

        console.error("Failed to poll Play Store query status:", error);

        setIsLoading(false);
        setIsError(true);
      }
    };

    // Fetch full query details once, so the app name remains available.
    const initialize = async () => {
      try {
        const queryData = await getQuery(queryId);

        if (cancelled) return;

        setData(queryData);
        setIsLoading(false);

        await poll();
      } catch (error) {
        if (cancelled) return;

        console.error("Failed to initialize Play Store analysis:", error);

        setIsLoading(false);
        setIsError(true);
      }
    };

    initialize();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [queryId, pollVersion]);

  // const retrying = retryFetch.isPending || retrySummarize.isPending;

  // Retry whichever step failed.
  const handleRetry = async () => {
    if (retrying) return;

    setRetrying(true);
    setIsError(false);

    try {
      const result =
        data?.failed_at_step === "summarize"
          ? await retrySummarize(queryId)
          : await retryFetch(queryId);

      firedRef.current.clear();

      setData((previous) => ({
        ...previous,
        ...result,
      }));

      // Restart the polling effect.
      setPollVersion((version) => version + 1);
    } catch (error) {
      console.error("Failed to retry Play Store analysis:", error);
      setIsError(true);
    } finally {
      setRetrying(false);
    }
  };

  // Refresh credits once when the analysis completes.
  useEffect(() => {
    if (isCompleted) getCredits?.(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

  // After completion: signed-in users go straight to the report, guests get the login modal.
  useEffect(() => {
    if (!isCompleted || authLoading || requiresLogin) return;

    if (user) {
      router.replace(reportPath(queryId));
    } else {
      setRequiresLogin(true);
      setShowLoginModal(true);
    }
  }, [isCompleted, authLoading, user, requiresLogin, router, queryId]);

  const handleOpenLogin = () => setShowLoginModal(true);

  // Claim guest reports before navigating to the protected report route.
  const handleLoginSuccess = async () => {
    if (claimingReports || !isCompleted) return;
    setClaimingReports(true);

    try {
      await claimGuestReports();
      setShowLoginModal(false);
      router.replace(reportPath(queryId));
    } catch (error) {
      console.error("Failed to claim guest reports:", error);
      setShowLoginModal(false);
    } finally {
      setClaimingReports(false);
    }
  };

  const getStepState = (stepKey) => {
    if (isCompleted) return "completed";
    const order = PIPELINE_STEPS.map((s) => s.key);
    const current = order.indexOf(STATUS_TO_STEP[status]);
    const target = order.indexOf(stepKey);
    if (current === -1) return "upcoming";
    if (target < current) return "completed";
    if (target === current) return "active";
    return "upcoming";
  };

  const completedCount = PIPELINE_STEPS.filter((s) => getStepState(s.key) === "completed").length;
  const progress = STATUS_PROGRESS[status] ?? 0;

  // Best-effort label for what is being analyzed; adjust to your query shape.
  const subject = data?.app_name || data?.app_title || data?.query || data?.app_id;

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Shell>
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
            <LoaderCircle className="h-9 w-9 animate-spin" style={{ color: GREEN }} />
          </div>
          <p className="text-sm font-medium text-slate-500">Connecting to analysis pipeline...</p>
        </div>
      </Shell>
    );
  };

  // ── Error / failed ─────────────────────────────────────────────────────────
  if (isError || isFailed) {
    return (
      <Shell>
        <div className="mx-auto w-full max-w-xl rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-[0_12px_50px_rgba(1,135,95,0.07)] sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50">
            <XCircle className="h-9 w-9 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F2A22]">Analysis Failed</h2>
          <p className="mt-3 text-sm leading-6 text-rose-600">
            {isError
              ? "Could not fetch the status of this analysis."
              : `Reason: ${data?.failure_reason || "UNKNOWN"}${data?.failed_at_step ? ` (during ${data.failed_at_step})` : ""
              }`}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => router.push("/playstore")}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-emerald-300"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <button
              onClick={isError ? () => refetch() : handleRetry}
              disabled={retrying}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#01875F] to-[#00B67A] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/60 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
            >
              <RefreshCw className={`size-4 ${retrying ? "animate-spin" : ""}`} />
              Try again
            </button>
          </div>
        </div>
      </Shell>
    );
  };

  // ── Pipeline ───────────────────────────────────────────────────────────────
  return (
    <Shell>
      <div className="mx-auto w-full max-w-2xl">
        <button
          onClick={() => router.push("/playstore")}
          className="mb-4 flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-[#01875F]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>

        <div className="overflow-hidden rounded-3xl border border-emerald-100/80 bg-white shadow-[0_16px_60px_rgba(1,135,95,0.10)]">
          {/* Play-style accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#00A0FF] via-[#00D95F] to-[#FFD500]" />

          <div className="flex flex-col gap-7 p-6 sm:p-9">
            {/* Subject */}
            {subject && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-[#F3FBF7] px-4 py-3">
                <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-[#01875F]" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#01875F]">
                    Analyzing
                  </p>
                  <p className="mt-0.5 truncate text-sm font-medium text-[#0F2A22]">{subject}</p>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div
                className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${isCompleted ? "bg-emerald-50" : "bg-gradient-to-br from-emerald-50 to-sky-50"
                  }`}
              >
                {isCompleted ? (
                  <FaCheckCircle className="text-3xl text-emerald-500" />
                ) : (
                  <FaSpinner className="animate-spin text-3xl" style={{ color: GREEN }} />
                )}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-emerald-200/70" />
              </div>

              <div className="w-full">
                <div
                  className={`mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 ${isCompleted ? "border-emerald-200 bg-emerald-50" : "border-emerald-100 bg-[#F3FBF7]"
                    }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-[#01875F] ${isCompleted ? "" : "animate-pulse"}`}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#01875F]">
                    {isCompleted ? "Analysis completed" : "Analysis in progress"}
                  </span>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-[#0F2A22] sm:text-2xl">
                  {isCompleted ? "Your App Analysis Is Ready!" : "Mining Play Store Reviews"}
                </h2>
                <p className="mt-2 min-h-[20px] text-sm font-medium text-slate-500">
                  {STAGE_LABELS[status] || `Status: ${status}`}
                </p>

                {/* Progress bar */}
                <div className="mx-auto mt-5 max-w-md">
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-emerald-100">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00A0FF] via-[#00D95F] to-[#01875F]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                  <p className="mt-1.5 text-right font-mono text-[11px] font-semibold text-[#01875F]">
                    {progress}%
                  </p>
                </div>
              </div>
            </div>

            {/* Guest report access message */}
            {isCompleted && requiresLogin && !user && !showLoginModal && (
              <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 shadow-[0_8px_30px_rgba(1,135,95,0.10)] sm:p-6">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-200/30 blur-2xl" />
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#01875F] to-[#00B67A] text-white shadow-lg shadow-emerald-200">
                    <LockKeyhole size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Sparkles size={15} className="text-[#01875F]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#01875F]">
                        One last step
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0F2A22] sm:text-lg">
                      Your full report is ready!
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                      Log in or create an account to unlock your complete Play Store analysis and save
                      it to your account.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenLogin}
                    className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#01875F] to-[#00B67A] px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-200/60 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Log in to view report
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            <div className="h-px w-full bg-linear-to-r from-transparent via-emerald-100 to-transparent" />

            {/* Steps */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                  Execution Pipeline
                </span>
                <span
                  className={`text-xs font-semibold ${isCompleted ? "text-emerald-600" : "text-[#01875F]"}`}
                >
                  {completedCount} / {PIPELINE_STEPS.length} completed
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {PIPELINE_STEPS.map((step, index) => {
                  const state = getStepState(step.key);

                  let styles = "border-slate-200 bg-slate-50/80 text-slate-400";
                  let label = "Pending";
                  let icon = <span className="h-4 w-4 rounded-full border-2 border-slate-300" />;

                  if (state === "completed") {
                    styles = "border-emerald-200 bg-emerald-50/70 text-emerald-800";
                    label = "Completed";
                    icon = <FaCheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />;
                  } else if (state === "active") {
                    styles =
                      "border-emerald-300 bg-gradient-to-r from-emerald-50 to-sky-50/70 text-[#065F46] shadow-sm ring-1 ring-emerald-100";
                    label = "Running";
                    icon = <FaSpinner className="h-4 w-4 shrink-0 animate-spin text-[#01875F]" />;
                  }

                  return (
                    <div
                      key={step.key}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3.5 transition-all duration-300 ${styles}`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/80 text-xs font-bold text-current">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{step.title}</p>
                          {state === "active" && (
                            <p className="truncate text-[11px] font-medium opacity-70">{step.hint}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="hidden text-[10px] font-bold uppercase tracking-wider opacity-75 sm:inline">
                          {label}
                        </span>
                        {icon}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer note */}
            <div
              className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${isCompleted ? "border-emerald-100 bg-emerald-50/70" : "border-emerald-100 bg-[#F3FBF7]"
                }`}
            >
              <Star
                className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isCompleted ? "text-emerald-500" : "text-[#01875F]"}`}
              />
              <p className="text-xs leading-5 text-slate-600">
                {isCompleted
                  ? "All analysis stages have been completed successfully. Your research is ready."
                  : "We're reading through user reviews to surface what people love and what frustrates them. You can keep this page open while the analysis runs."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div className="flex min-h-[91vh] w-full flex-col items-center justify-center px-4 py-12">
      {children}
    </div>
  );
}