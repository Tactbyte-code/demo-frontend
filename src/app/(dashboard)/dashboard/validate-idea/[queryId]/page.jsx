"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import { generateContext, triggerSearch, generateSummary, getStatus } from "@/features/validate/api/validate.api";

const POLL_INTERVAL_MS = 3000;

// Mirrors the backend's ValidateQueryStatus enum
const STATUS = {
    INITIALIZED: "INITIALIZED",
    CREATED: "CREATED",
    VALIDATING: "VALIDATING",
    VALIDATED: "VALIDATED",
    SEARCHING: "SEARCHING",
    SEARCH_COMPLETED: "SEARCH_COMPLETED",
    SCORING: "SCORING",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
}

const STAGE_LABELS = {
    [STATUS.INITIALIZED]: "Initializing...",
    [STATUS.CREATED]: "Generating Context...",
    [STATUS.VALIDATING]: "Validating on RunPod...",
    [STATUS.VALIDATED]: "Query validated, kicking off search...",
    [STATUS.SEARCHING]: "Searching the web for insights...",
    [STATUS.SEARCH_COMPLETED]: "Generating summary...",
    [STATUS.SCORING]: "Scoring results...",
    [STATUS.COMPLETED]: "Completed",
    [STATUS.FAILED]: "Failed",
}

// Handles getStatus/generateContext/triggerSearch/generateSummary returning
// either a bare string or an object with a `status` field, and normalizes casing.
const normalizeStatus = (response) => {
    const raw = typeof response === 'string' ? response : response?.status
    return typeof raw === 'string' ? raw.toUpperCase() : undefined
}

const ValidateQueryIdPage = () => {
    const params = useParams()
    const queryId = params?.queryId

    const [isCompleted, setIsCompleted] = useState(false)
    const [currentStage, setCurrentStage] = useState("Initializing...")
    const [validationData, setValidationData] = useState(null)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        if (!queryId) return;

        // All of this is local to a single effect run (i.e. a single queryId).
        // No refs needed — closures give us fresh state per mount, and
        // `cancelled` guarantees a stray loop from a previous run (e.g. React
        // Strict Mode's dev double-invoke) can never take further action.
        let cancelled = false
        let isProcessing = false
        let timeoutId = null

        // Tracks which statuses we've ALREADY dispatched an action for.
        // This is the key fix: an action is fired at most ONCE per status,
        // even if the backend is slow to move past that status and repeated
        // polls keep observing it. Without this, every poll tick that still
        // sees VALIDATED (because the backend hasn't flipped to SEARCHING
        // yet) would call triggerSearch again, registering a new RunPod job
        // each time.
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
            // Guard against ever firing the same action twice for this queryId.
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

            setCurrentStage(STAGE_LABELS[status] || `Status: ${status}`)

            switch (status) {
                case STATUS.CREATED: {
                    try {
                        const contextResponse = await runOnce(STATUS.CREATED, () => generateContext(queryId))
                        if (contextResponse) console.log("Context generated response: ", contextResponse)
                    } catch (error) {
                        console.error("Error generating context:", error)
                        stopPolling()
                        setHasError(true)
                        setCurrentStage("Failed to generate context. Please try again.")
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
                        setCurrentStage("Failed to trigger search. Please try again.")
                    }
                    break
                }

                case STATUS.SEARCH_COMPLETED: {
                    try {
                        const summaryResponse = await runOnce(STATUS.SEARCH_COMPLETED, () => generateSummary(queryId))
                        if (summaryResponse) {
                            console.log("Summary generated response: ", summaryResponse)
                            setValidationData(summaryResponse)
                        }
                        // Only finalize the UI once generateSummary has actually
                        // been dispatched (runOnce returns null on a repeat call).
                        if (summaryResponse !== null) {
                            stopPolling()
                            setIsCompleted(true)
                        }
                    } catch (error) {
                        console.error("Error generating summary:", error)
                        stopPolling()
                        setHasError(true)
                        setCurrentStage("Failed to generate summary. Please try again.")
                    }
                    break
                }

                case STATUS.INITIALIZED:
                case STATUS.VALIDATING:
                case STATUS.SEARCHING:
                case STATUS.SCORING: {
                    // Purely in-progress on the backend — nothing to fire, just keep polling.
                    break
                }

                case STATUS.COMPLETED: {
                    stopPolling()
                    setIsCompleted(true)
                    break
                }

                case STATUS.FAILED: {
                    stopPolling()
                    setHasError(true)
                    break
                }

                default: {
                    console.warn("Unhandled status from getStatus:", status)
                    break
                }
            }
        }

        const poll = async () => {
            if (cancelled) return

            // Belt-and-suspenders: even though runOnce/firedActions already
            // prevent duplicate dispatch, skip re-checking status entirely
            // while an action is mid-flight so we don't do wasted work.
            if (isProcessing) {
                scheduleNextPoll()
                return
            }

            try {
                const queryStatus = await getStatus(queryId)
                if (cancelled) return
                console.log("Query status: ", queryStatus)
                await handleStatus(normalizeStatus(queryStatus))
            } catch (error) {
                console.error("Error fetching status:", error)
                if (!cancelled) {
                    stopPolling()
                    setHasError(true)
                    setCurrentStage("Could not fetch status. Please try again.")
                }
                return
            }

            if (!cancelled) scheduleNextPoll()
        }

        poll() // check immediately on mount/focus

        return () => {
            cancelled = true
            stopPolling()
        }
    }, [queryId])

    if (!isCompleted) {
        return (
            <div className="min-h-[91vh] flex flex-col items-center justify-center px-4 bg-slate-50 text-slate-900">
                <div className="flex flex-col items-center space-y-5 text-center">
                    <FaSpinner className={`animate-spin text-5xl ${hasError ? 'text-red-500' : 'text-indigo-600'}`} />
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-1">
                            Processing Query
                        </h2>
                        <p className="text-sm font-medium text-slate-500">
                            {currentStage}
                        </p>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className="min-h-[91vh] flex flex-col items-center px-4 py-8 md:py-12 bg-slate-50 text-slate-900">
            <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">
                    Vertex Search Completed
                </h1>
                <p className="text-slate-600 mb-6">
                    Search results successfully loaded for query ID: <span className="font-mono bg-slate-100 px-2 py-1 rounded text-sm">{queryId}</span>
                </p>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm overflow-auto">
                    <pre className="text-slate-700 whitespace-pre-wrap">
                        {JSON.stringify(validationData, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    )
};

export default ValidateQueryIdPage;