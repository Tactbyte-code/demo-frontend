"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { triggerSearch, generateSummary, getStatus, triggerFilter, triggerExtract, triggerScore } from "@/features/validate/api/validate.api";
import { useGenerateContext } from '@/features/validate/hooks/useGenerateContext';
import { STAGE_LABELS, STATUS, PIPELINE_STEPS, STATUS_TO_STEP } from '@/utils/validate/status';
import { LoaderCircle, XCircle, RotateCcw } from 'lucide-react';

const POLL_INTERVAL_MS = 3000;

// Handles getStatus/generateContext/triggerSearch/generateSummary returning
// either a bare string or an object with a `status` field, and normalizes casing.
const normalizeStatus = (response) => {
    const raw = typeof response === 'string' ? response : response?.status
    return typeof raw === 'string' ? raw.toUpperCase() : undefined
};

const ValidateQueryIdPage = () => {
    const params = useParams();
    const router = useRouter();
    const queryId = params?.queryId

    const [currentStage, setCurrentStage] = useState(STATUS.INITIALIZED)
    const [currentStageLabel, setCurrentStageLabel] = useState(STAGE_LABELS[STATUS.INITIALIZED])
    const [statusFetched, setStatusFetched] = useState(false);
    const [failureReason, setFailureReason] = useState(
        "An unexpected error occurred while analyzing your idea."
    );
    const [hasError, setHasError] = useState(false)

    // 1. Initialize the mutation hook
    const { mutateAsync: triggerGenerateContext } = useGenerateContext();

    // Helper to determine step state relative to active status
    const getStepState = (stepKey) => {
        const stepOrder = PIPELINE_STEPS.map(s => s.key);
        const mappedStage = STATUS_TO_STEP[currentStage] ?? currentStage;
        const currentIndex = stepOrder.indexOf(mappedStage);
        const targetIndex = stepOrder.indexOf(stepKey);

        if (currentStage === STATUS.COMPLETED) return 'completed';
        if (currentIndex === -1) return 'upcoming';
        if (targetIndex < currentIndex) return 'completed';
        if (targetIndex === currentIndex) return 'active';
        return 'upcoming';
    };

    useEffect(() => {
        if (!queryId) return;

        let cancelled = false
        let isProcessing = false
        let timeoutId = null

        const firedActions = new Set()

        const stopPolling = () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = null
            }
        }

        const scheduleNextPoll = () => {
            if (cancelled) return
            timeoutId = setTimeout(poll, POLL_INTERVAL_MS)
        }

        const runOnce = async (statusKey, action) => {
            if (firedActions.has(statusKey)) return null
            firedActions.add(statusKey)
            isProcessing = true
            try {
                return await action()
            } finally {
                isProcessing = false
            }
        }

        const handleStatus = async (status) => {
            if (!status) {
                console.warn("Could not determine status from response")
                return
            }

            setCurrentStage(status)
            setCurrentStageLabel(STAGE_LABELS[status] || `Status: ${status}`)

            switch (status) {
                case STATUS.CREATED: {
                    try {
                        const contextResponse = await runOnce(STATUS.CREATED, () => triggerGenerateContext(queryId))
                        if (contextResponse) console.log("Context generated response: ", contextResponse)
                    } catch (error) {
                        console.error("Error generating context:", error)
                        stopPolling()
                        setHasError(true)
                        setCurrentStageLabel("Failed to generate context. Please try again.")
                    }
                    break
                }

                case STATUS.VALIDATED: {
                    try {
                        const searchResponse = await runOnce(STATUS.VALIDATED, () => triggerSearch(queryId))
                        if (searchResponse) console.log("Search response: ", searchResponse)
                    } catch (error) {
                        console.error("Error triggering search:", error)
                        stopPolling()
                        setHasError(true)
                        setCurrentStageLabel("Failed to trigger search. Please try again.")
                    }
                    break
                }

                case STATUS.SEARCH_COMPLETED: {
                    try {
                        const filterResponse = await runOnce(STATUS.SEARCH_COMPLETED, () => triggerFilter(queryId))
                        if (filterResponse) console.log("Filter job response: ", filterResponse)
                    } catch (error) {
                        console.error("Error filtering: ", error)
                        stopPolling()
                        setHasError(true)
                        setCurrentStageLabel("Failed to filter. Please try again.")
                    }
                    break
                }

                case STATUS.FILTERED: {
                    try {
                        const extractResponse = await runOnce(STATUS.FILTERED, () => triggerExtract(queryId))
                        if (extractResponse) console.log("Extraction response: ", extractResponse)
                    } catch (error) {
                        console.error("Error extracting:", error)
                        stopPolling()
                        setHasError(true)
                        setCurrentStageLabel("Failed to extract. Please try again.")
                    }
                    break
                }

                case STATUS.EXTRACTED: {
                    try {
                        const scoreResponse = await runOnce(STATUS.EXTRACTED, () => triggerScore(queryId))
                        if (scoreResponse) console.log("Scoring response: ", scoreResponse)
                    } catch (error) {
                        console.error("Error scoring:", error)
                        stopPolling()
                        setHasError(true)
                        setCurrentStageLabel("Failed to score. Please try again.")
                    }
                    break
                }

                case STATUS.SCORED: {
                    try {
                        const summaryResponse = await runOnce(STATUS.SCORED, () => generateSummary(queryId))
                        if (summaryResponse) console.log("Summarizing response: ", summaryResponse)
                    } catch (error) {
                        console.error("Error summarizing:", error)
                        stopPolling()
                        setHasError(true)
                        setCurrentStageLabel("Failed to summarize. Please try again.")
                    }
                    break
                }

                case STATUS.INITIALIZED:
                case STATUS.VALIDATING:
                case STATUS.SEARCHING:
                case STATUS.FILTERING:
                case STATUS.EXTRACTING:
                case STATUS.SCORING:
                case STATUS.SUMMARIZING: {
                    break
                }

                case STATUS.COMPLETED: {
                    stopPolling()
                    router.push(`/dashboard/validate-idea/${queryId}/summary`)
                    break
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
                    console.warn("Unhandled status from getStatus:", status)
                    break
                }
            }
        }

        const poll = async () => {
            if (cancelled) return

            if (isProcessing) {
                scheduleNextPoll()
                return
            }

            try {
                const queryStatus = await getStatus(queryId);
                if (cancelled) return;

                console.log("Query status: ", queryStatus);

                const status = normalizeStatus(queryStatus);

                if (status) {
                    setStatusFetched(true);
                };

                await handleStatus(status);
            } catch (error) {
                console.error("Error fetching status:", error)
                if (!cancelled) {
                    stopPolling()
                    setHasError(true)
                    setCurrentStageLabel("Could not fetch status. Please try again.")
                }
                return
            }

            if (!cancelled) scheduleNextPoll()
        }

        poll()

        return () => {
            cancelled = true
            stopPolling()
        }
    }, [queryId, router])

    return (
        <div className="min-h-[91vh] flex flex-col items-center justify-center px-4 bg-slate-50 text-slate-900 py-12">

            {hasError ? (
                <div className="w-full max-w-xl rounded-2xl text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                        <XCircle className="h-9 w-9 text-red-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Analysis Failed
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-red-600">
                        Reason: {failureReason}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        {/* <button
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            <RotateCcw className="h-4 w-4" />
                            Try Again
                        </button> */}

                        <button
                            onClick={() => router.push('/dashboard/validate-idea')}
                            className="inline-flex items-center justify-center gap-2 cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            ) : !statusFetched ? (
                <LoaderCircle className="h-10 w-10 animate-spin text-indigo-600" />
            ) : (
                <div className="w-full max-w-2xl bg-white border border-slate-200 shadow-xl rounded-2xl p-8 flex flex-col space-y-8">

                    {/* Header info */}
                    <div className="flex flex-col items-center space-y-3 text-center">
                        <FaSpinner
                            className={`animate-spin text-4xl ${hasError ? 'text-red-500' : 'text-indigo-600'
                                }`}
                        />

                        <div>
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                                Processing Your Idea Validation
                            </h2>

                            <p className="text-sm font-medium text-slate-500 mt-1 min-h-[20px]">
                                {currentStageLabel}
                            </p>
                        </div>
                    </div>

                    {/* Pipeline Stages Display */}
                    <div className="flex flex-col space-y-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                            Execution Pipeline
                        </span>

                        <div className="grid grid-cols-1 gap-2.5">
                            {PIPELINE_STEPS.map((step) => {
                                const state = getStepState(step.key);

                                let buttonStyles =
                                    "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed";

                                let icon = (
                                    <span className="w-4 h-4 rounded-full border-2 border-slate-300 inline-block" />
                                );

                                if (state === 'completed') {
                                    buttonStyles =
                                        "bg-emerald-50/60 border-emerald-200 text-emerald-800 shadow-sm";

                                    icon = (
                                        <FaCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" />
                                    );
                                } else if (state === 'active') {
                                    buttonStyles =
                                        "bg-indigo-50 border-indigo-300 text-indigo-900 ring-2 ring-indigo-500/20 shadow-md";

                                    icon = (
                                        <FaSpinner className="animate-spin text-indigo-600 w-4 h-4 shrink-0" />
                                    );
                                }

                                return (
                                    <div
                                        key={step.key}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300 ${buttonStyles}`}
                                    >
                                        <span className="truncate">{step.title}</span>

                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs uppercase tracking-wider font-semibold opacity-75">
                                                {state === 'completed'
                                                    ? 'Done'
                                                    : state === 'active'
                                                        ? 'Running'
                                                        : 'Pending'}
                                            </span>

                                            {icon}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ValidateQueryIdPage;