"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
};

const ValidateQueryIdPage = () => {
    const params = useParams();
    const router = useRouter();
    const queryId = params?.queryId

    const [currentStage, setCurrentStage] = useState("Initializing...")
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        if (!queryId) return;

        let cancelled = false
        let isProcessing = false
        let timeoutId = null

        // Tracks which statuses we've ALREADY dispatched an action for, so
        // generateContext / triggerSearch / generateSummary each fire at
        // most once per queryId, no matter how many poll ticks still see
        // the same status while the backend catches up.
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
                        // generateSummary's response here is just FastAPI acking
                        // that the summary job was submitted — RunPod is still
                        // working on it in the background. So dispatch it once
                        // and keep polling; do NOT treat this response as terminal.
                        const summaryResponse = await runOnce(STATUS.SEARCH_COMPLETED, () => generateSummary(queryId))
                        if (summaryResponse) console.log("Summary job response: ", summaryResponse)
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
                    // The only true terminal state now. Stop polling and hand
                    // off to the dedicated summary page.
                    stopPolling()
                    router.push(`/dashboard/validate-idea/${queryId}/summary`)
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
    }, [queryId, router])

    // This page is now a pure loading/redirect screen — navigation to the
    // summary page happens as soon as status hits COMPLETED.
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

export default ValidateQueryIdPage;