"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import {
    triggerSearch,
    generateSummary,
    getStatus,
    triggerFilter,
    triggerExtract,
    triggerScore,
} from "@/features/validate/api/validate.api";
import { useGenerateContext } from "@/features/validate/hooks/useGenerateContext";
import {
    STAGE_LABELS,
    STATUS,
    PIPELINE_STEPS,
    STATUS_TO_STEP,
} from "@/utils/validate/status";
import {
    LoaderCircle,
    XCircle,
    ArrowLeft,
    ArrowRight,
    LockKeyhole,
    Sparkles,
} from "lucide-react";
import { useCreditStore } from "@/store/useCreditStore";
import { useAuthStore } from "@/store/authStore";
import LoginModal from "@/components/auth/loginModal/LoginModal";
import { claimGuestReports } from "@/features/guest/guest.api";

const POLL_INTERVAL_MS = 3000;

const normalizeStatus = (response) => {
    const raw =
        typeof response === "string" ? response : response?.status;

    return typeof raw === "string"
        ? raw.toUpperCase()
        : undefined;
};

const ValidateQueryIdPage = () => {
    const params = useParams();
    const router = useRouter();
    const queryId = params?.queryId;

    const [currentStage, setCurrentStage] = useState(
        STATUS.INITIALIZED
    );

    const [currentStageLabel, setCurrentStageLabel] = useState(
        STAGE_LABELS[STATUS.INITIALIZED]
    );

    const [statusFetched, setStatusFetched] = useState(false);

    const [failureReason, setFailureReason] = useState(
        "An unexpected error occurred while analyzing your idea."
    );

    const [hasError, setHasError] = useState(false);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [completedQueryId, setCompletedQueryId] = useState(null);

    // True once we determine that this completed analysis belongs
    // to a guest who must authenticate before viewing the report.
    const [requiresLogin, setRequiresLogin] = useState(false);

    const [claimingReports, setClaimingReports] = useState(false);

    const user = useAuthStore((state) => state.user);
    const authLoading = useAuthStore((state) => state.loading);

    const { mutateAsync: triggerGenerateContext } = useGenerateContext();

    const isCompleted = currentStage === STATUS.COMPLETED;

    // Determine the state of each pipeline step.
    const getStepState = (stepKey) => {
        const stepOrder = PIPELINE_STEPS.map((step) => step.key);

        const mappedStage =
            STATUS_TO_STEP[currentStage] ?? currentStage;

        const currentIndex = stepOrder.indexOf(mappedStage);
        const targetIndex = stepOrder.indexOf(stepKey);

        if (currentStage === STATUS.COMPLETED) {
            return "completed";
        }

        if (currentIndex === -1) {
            return "upcoming";
        }

        if (targetIndex < currentIndex) {
            return "completed";
        }

        if (targetIndex === currentIndex) {
            return "active";
        }

        return "upcoming";
    };

    // Decide what happens after the analysis completes.
    // This effect only handles the initial completion state.
    // Once a guest is identified, logging in is handled by
    // handleLoginSuccess after the reports have been claimed.
    useEffect(() => {
        if (!completedQueryId || authLoading || requiresLogin) {
            return;
        }

        if (user) {
            router.replace(
                `/validate-idea/analysis/${completedQueryId}/report`
            );
        } else {
            setRequiresLogin(true);
            setShowLoginModal(true);
        }
    }, [
        completedQueryId,
        authLoading,
        user,
        requiresLogin,
        router,
    ]);

    // Polling and analysis pipeline execution.
    useEffect(() => {
        if (!queryId) return;

        let cancelled = false;
        let isProcessing = false;
        let timeoutId = null;

        const firedActions = new Set();

        const stopPolling = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        };

        const scheduleNextPoll = () => {
            if (cancelled) return;

            timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
        };

        const runOnce = async (statusKey, action) => {
            if (firedActions.has(statusKey)) return null;

            firedActions.add(statusKey);
            isProcessing = true;

            try {
                return await action();
            } finally {
                isProcessing = false;
            }
        };

        const handleStatus = async (status) => {
            if (!status) {
                console.warn(
                    "Could not determine status from response"
                );
                return;
            }

            setCurrentStage(status);

            setCurrentStageLabel(
                STAGE_LABELS[status] || `Status: ${status}`
            );

            switch (status) {
                case STATUS.CREATED: {
                    try {
                        const contextResponse = await runOnce(
                            STATUS.CREATED,
                            () => triggerGenerateContext(queryId)
                        );

                        if (contextResponse) {
                            console.log(
                                "Context generated response:",
                                contextResponse
                            );
                        }
                    } catch (error) {
                        console.error(
                            "Error generating context:",
                            error
                        );

                        stopPolling();
                        setHasError(true);
                        setCurrentStageLabel(
                            "Failed to generate context. Please try again."
                        );
                    }

                    break;
                }

                case STATUS.VALIDATED: {
                    try {
                        const searchResponse = await runOnce(
                            STATUS.VALIDATED,
                            () => triggerSearch(queryId)
                        );

                        if (searchResponse) {
                            console.log(
                                "Search response:",
                                searchResponse
                            );
                        }
                    } catch (error) {
                        console.error(
                            "Error triggering search:",
                            error
                        );

                        stopPolling();
                        setHasError(true);
                        setCurrentStageLabel(
                            "Failed to trigger search. Please try again."
                        );
                    }

                    break;
                }

                case STATUS.SEARCH_COMPLETED: {
                    try {
                        const filterResponse = await runOnce(
                            STATUS.SEARCH_COMPLETED,
                            () => triggerFilter(queryId)
                        );

                        if (filterResponse) {
                            console.log(
                                "Filter job response:",
                                filterResponse
                            );
                        }
                    } catch (error) {
                        console.error("Error filtering:", error);

                        stopPolling();
                        setHasError(true);
                        setCurrentStageLabel(
                            "Failed to filter. Please try again."
                        );
                    }

                    break;
                }

                case STATUS.FILTERED: {
                    try {
                        const extractResponse = await runOnce(
                            STATUS.FILTERED,
                            () => triggerExtract(queryId)
                        );

                        if (extractResponse) {
                            console.log(
                                "Extraction response:",
                                extractResponse
                            );
                        }
                    } catch (error) {
                        console.error(
                            "Error extracting:",
                            error
                        );

                        stopPolling();
                        setHasError(true);
                        setCurrentStageLabel(
                            "Failed to extract. Please try again."
                        );
                    }

                    break;
                }

                case STATUS.EXTRACTED: {
                    try {
                        const scoreResponse = await runOnce(
                            STATUS.EXTRACTED,
                            () => triggerScore(queryId)
                        );

                        if (scoreResponse) {
                            console.log(
                                "Scoring response:",
                                scoreResponse
                            );
                        }
                    } catch (error) {
                        console.error("Error scoring:", error);

                        stopPolling();
                        setHasError(true);
                        setCurrentStageLabel(
                            "Failed to score. Please try again."
                        );
                    }

                    break;
                }

                case STATUS.SCORED: {
                    try {
                        const summaryResponse = await runOnce(
                            STATUS.SCORED,
                            () => generateSummary(queryId)
                        );

                        if (summaryResponse) {
                            console.log(
                                "Summarizing response:",
                                summaryResponse
                            );
                        }
                    } catch (error) {
                        console.error(
                            "Error summarizing:",
                            error
                        );

                        stopPolling();
                        setHasError(true);
                        setCurrentStageLabel(
                            "Failed to summarize. Please try again."
                        );
                    }

                    break;
                }

                case STATUS.INITIALIZED:
                case STATUS.VALIDATING:
                case STATUS.SEARCHING:
                case STATUS.FILTERING:
                case STATUS.EXTRACTING:
                case STATUS.SCORING:
                case STATUS.SUMMARIZING: {
                    break;
                }

                case STATUS.COMPLETED: {
                    stopPolling();

                    useCreditStore.setState({
                        loadingCredits: true,
                    });

                    setCurrentStageLabel(
                        "Your idea analysis has been completed successfully."
                    );

                    setCompletedQueryId(queryId);

                    break;
                }

                case STATUS.FAILED: {
                    stopPolling();

                    setHasError(true);

                    setFailureReason(
                        "The analysis could not be completed. Please try again."
                    );

                    break;
                }

                default: {
                    console.warn(
                        "Unhandled status from getStatus:",
                        status
                    );

                    break;
                }
            }
        };

        const poll = async () => {
            if (cancelled) return;

            if (isProcessing) {
                scheduleNextPoll();
                return;
            }

            try {
                const queryStatus = await getStatus(queryId);

                if (cancelled) return;

                console.log("Query status:", queryStatus);

                const status = normalizeStatus(queryStatus);

                if (status) {
                    setStatusFetched(true);
                }

                await handleStatus(status);

                // Do not schedule another poll after completion or failure.
                if (
                    status === STATUS.COMPLETED ||
                    status === STATUS.FAILED
                ) {
                    return;
                }
            } catch (error) {
                console.error("Error fetching status:", error);

                if (!cancelled) {
                    stopPolling();
                    setHasError(true);

                    setCurrentStageLabel(
                        "Could not fetch status. Please try again."
                    );
                }

                return;
            }

            if (!cancelled) {
                scheduleNextPoll();
            }
        };

        poll();

        return () => {
            cancelled = true;
            stopPolling();
        };
    }, [queryId, triggerGenerateContext]);

    // Reopen login modal from the guest access message.
    const handleOpenLogin = () => {
        setShowLoginModal(true);
    };

    // Called only after Firebase authentication succeeds.
    // Claim reports before navigating to the protected report route.
    const handleLoginSuccess = async () => {
        if (claimingReports || !completedQueryId) return;
        setClaimingReports(true);

        try {
            await claimGuestReports({
                feature: "validate",
                reportId: completedQueryId,
            });

            setShowLoginModal(false);

            router.replace(
                `/validate-idea/analysis/${completedQueryId}/report`
            );
        } catch (error) {
            console.error(
                "Failed to claim guest report:",
                error
            );

            setShowLoginModal(false);
        } finally {
            setClaimingReports(false);
        }
    };

    return (
        <div className="flex min-h-[91vh] w-full flex-col items-center justify-center px-4 py-12">

            {/* Error State */}
            {hasError ? (
                <div className="mx-auto w-full max-w-xl rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-[0_12px_50px_rgba(40,19,68,0.06)] sm:p-10">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50">
                        <XCircle className="h-9 w-9 text-rose-500" />
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-[#281344]">
                        Analysis Failed
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-rose-600">
                        Reason: {failureReason}
                    </p>

                    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            onClick={() =>
                                router.push("/validate-idea/analysis")
                            }
                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7138D5] to-[#C12D9B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            <ArrowLeft className="size-5" />
                            Back to Analysis
                        </button>
                    </div>
                </div>
            ) : !statusFetched ? (
                <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
                        <LoaderCircle className="h-9 w-9 animate-spin text-[#7138D5]" />
                    </div>

                    <p className="text-sm font-medium text-slate-500">
                        Connecting to analysis pipeline...
                    </p>
                </div>
            ) : (
                <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-purple-100/80 bg-white shadow-[0_16px_60px_rgba(40,19,68,0.08)]">

                    {/* Top Accent */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#7138D5] via-[#A43AC2] to-[#E044A0]" />

                    <div className="flex flex-col gap-8 p-6 sm:p-9">

                        {/* Header */}
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div
                                className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${isCompleted
                                    ? "bg-emerald-50"
                                    : "bg-gradient-to-br from-purple-50 to-pink-50"
                                    }`}
                            >
                                {isCompleted ? (
                                    <FaCheckCircle className="text-3xl text-emerald-500" />
                                ) : (
                                    <FaSpinner className="animate-spin text-3xl text-[#8B42CC]" />
                                )}

                                <div
                                    className={`absolute inset-0 rounded-2xl ring-1 ${isCompleted
                                        ? "ring-emerald-200"
                                        : "ring-purple-200/60"
                                        }`}
                                />
                            </div>

                            <div>
                                <div
                                    className={`mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 ${isCompleted
                                        ? "border-emerald-200 bg-emerald-50"
                                        : "border-purple-100 bg-purple-50"
                                        }`}
                                >
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full ${isCompleted
                                            ? "bg-emerald-500"
                                            : "animate-pulse bg-[#A43AC2]"
                                            }`}
                                    />

                                    <span
                                        className={`text-[10px] font-bold uppercase tracking-[0.16em] ${isCompleted
                                            ? "text-emerald-700"
                                            : "text-[#7138D5]"
                                            }`}
                                    >
                                        {isCompleted
                                            ? "Analysis completed"
                                            : "Analysis in progress"}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold tracking-tight text-[#281344] sm:text-2xl">
                                    {isCompleted
                                        ? "Your Idea Analysis Is Ready!"
                                        : "Processing Your Idea Validation"}
                                </h2>

                                <p className="mt-2 min-h-[20px] text-sm font-medium text-slate-500">
                                    {currentStageLabel}
                                </p>
                            </div>
                        </div>

                        {/* Guest Report Access Message */}
                        {isCompleted &&
                            requiresLogin &&
                            !user &&
                            !showLoginModal && (
                                <div className="relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-pink-50 p-5 shadow-[0_8px_30px_rgba(113,56,213,0.10)] sm:p-6">
                                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-200/30 blur-2xl" />

                                    <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7138D5] to-[#C12D9B] text-white shadow-lg shadow-purple-200">
                                            <LockKeyhole size={22} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="mb-1 flex items-center gap-2">
                                                <Sparkles
                                                    size={15}
                                                    className="text-[#9333C8]"
                                                />

                                                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7138D5]">
                                                    One last step
                                                </span>
                                            </div>

                                            <h3 className="text-base font-bold text-[#281344] sm:text-lg">
                                                Your full report is ready!
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                                                Log in or create an account
                                                to unlock your complete idea
                                                validation report and save
                                                this analysis to your account.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleOpenLogin}
                                            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#7138D5] to-[#C12D9B] px-5 text-sm font-semibold text-white shadow-lg shadow-purple-200/60 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                                        >
                                            Log in to view report
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                        {/* Divider */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-100 to-transparent" />

                        {/* Pipeline */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-1">
                                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                                    Execution Pipeline
                                </span>

                                <span
                                    className={`text-xs font-semibold ${isCompleted
                                        ? "text-emerald-600"
                                        : "text-[#8B42CC]"
                                        }`}
                                >
                                    {
                                        PIPELINE_STEPS.filter(
                                            (step) =>
                                                getStepState(step.key) ===
                                                "completed"
                                        ).length
                                    }{" "}
                                    / {PIPELINE_STEPS.length} completed
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {PIPELINE_STEPS.map((step, index) => {
                                    const state = getStepState(step.key);

                                    let stepStyles =
                                        "border-slate-200 bg-slate-50/80 text-slate-400";

                                    let icon = (
                                        <span className="h-4 w-4 rounded-full border-2 border-slate-300" />
                                    );

                                    let statusLabel = "Pending";

                                    if (state === "completed") {
                                        stepStyles =
                                            "border-emerald-200 bg-emerald-50/70 text-emerald-800";

                                        statusLabel = "Completed";

                                        icon = (
                                            <FaCheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
                                        );
                                    } else if (state === "active") {
                                        stepStyles =
                                            "border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50/70 text-[#54258D] shadow-sm ring-1 ring-purple-100";

                                        statusLabel = "Running";

                                        icon = (
                                            <FaSpinner className="h-4 w-4 shrink-0 animate-spin text-[#A43AC2]" />
                                        );
                                    }

                                    return (
                                        <div
                                            key={step.key}
                                            className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3.5 transition-all duration-300 ${stepStyles}`}
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/80 text-xs font-bold text-current">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>

                                                <span className="truncate text-sm font-semibold">
                                                    {step.title}
                                                </span>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-2">
                                                <span className="hidden text-[10px] font-bold uppercase tracking-wider opacity-75 sm:inline">
                                                    {statusLabel}
                                                </span>

                                                {icon}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer Note */}
                        <div
                            className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${isCompleted
                                ? "border-emerald-100 bg-emerald-50/70"
                                : "border-purple-100 bg-[#FAF7FF]"
                                }`}
                        >
                            <div
                                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${isCompleted
                                    ? "bg-emerald-500"
                                    : "bg-[#A43AC2]"
                                    }`}
                            />

                            <p className="text-xs leading-5 text-slate-600">
                                {isCompleted
                                    ? "All analysis stages have been completed successfully. Your research is ready."
                                    : "We're evaluating your idea across multiple stages. You can keep this page open while the analysis runs."}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            {showLoginModal && (
                <LoginModal
                    onClose={() => {
                        // Closing the modal only hides it.
                        // The completed pipeline and login CTA remain visible.
                        setShowLoginModal(false);
                    }}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </div>
    );
};

export default ValidateQueryIdPage;