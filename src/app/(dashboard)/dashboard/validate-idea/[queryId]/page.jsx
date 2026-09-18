"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import { generateContext, triggerSearch, getStatus } from "@/features/validate/api/validate.api";

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
    [STATUS.VALIDATED]: "Query validated and context generated, searching...",
    [STATUS.SEARCHING]: "Searching the web for insights...",
    [STATUS.SEARCH_COMPLETED]: "Search completed, finalizing...",
    [STATUS.SCORING]: "Scoring results...",
    [STATUS.COMPLETED]: "Completed",
    [STATUS.FAILED]: "Failed",
}

const ValidateQueryIdPage = () => {
    const params = useParams()
    const queryId = params?.queryId

    const [isCompleted, setIsCompleted] = useState(false)
    const [currentStage, setCurrentStage] = useState("Initializing...")
    const [validationData, setValidationData] = useState(null)
    const [hasError, setHasError] = useState(false)

    // Prevents a second poll tick from re-firing generateContext/triggerSearch
    // while one of them is already in flight for this queryId.
    const isProcessingRef = useRef(false)
    const pollIntervalRef = useRef(null)

    useEffect(() => {
        if (!queryId) return;

        const stopPolling = () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current)
                pollIntervalRef.current = null
            }
        }

        const handleStatus = async (status) => {
            setCurrentStage(STAGE_LABELS[status] || `Status: ${status}`)

            if (isProcessingRef.current) return; // an action is already running

            switch (status) {
                case STATUS.CREATED: {
                    // Fire generateContext exactly once from CREATED.
                    // Its success moves the backend status to VALIDATING,
                    // so the next poll tick will just wait, not re-fire this.
                    isProcessingRef.current = true
                    try {
                        const contextResponse = await generateContext(queryId)
                        console.log("Context generated response: ", contextResponse)
                        // contextResponse may just ack the RunPod job submission
                        // (e.g. { jobId, status: "VALIDATING" }) — the real
                        // VALIDATED status will show up on a later poll.
                        if (contextResponse?.status) {
                            setCurrentStage(STAGE_LABELS[contextResponse.status] || `Status: ${contextResponse.status}`)
                        }
                    } catch (error) {
                        console.error("Error generating context:", error)
                        stopPolling()
                        setHasError(true)
                        setCurrentStage("Failed to generate context. Please try again.")
                    } finally {
                        isProcessingRef.current = false
                    }
                    break
                }

                case STATUS.VALIDATED: {
                    // RunPod finished successfully — move to search.
                    isProcessingRef.current = true
                    try {
                        const searchResponse = await triggerSearch(queryId)
                        console.log("Search response: ", searchResponse)
                        if (searchResponse?.status) {
                            setCurrentStage(STAGE_LABELS[searchResponse.status] || `Status: ${searchResponse.status}`)
                        }
                        if (searchResponse?.status === STATUS.SEARCH_COMPLETED) {
                            setValidationData(searchResponse)
                        }
                    } catch (error) {
                        console.error("Error triggering search:", error)
                        stopPolling()
                        setHasError(true)
                        setCurrentStage("Failed to trigger search. Please try again.")
                    } finally {
                        isProcessingRef.current = false
                    }
                    break
                }

                case STATUS.INITIALIZED:
                case STATUS.VALIDATING:
                case STATUS.SEARCHING:
                case STATUS.SCORING: {
                    // In-progress on the backend — nothing to fire, just keep polling.
                    break
                }

                case STATUS.SEARCH_COMPLETED:
                case STATUS.COMPLETED: {
                    // Terminal success state.
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
            try {
                const queryStatus = await getStatus(queryId)
                console.log("Query status: ", queryStatus)
                await handleStatus(queryStatus);
            } catch (error) {
                console.error("Error fetching status:", error)
                stopPolling()
                setHasError(true)
                setCurrentStage("Could not fetch status. Please try again.")
            }
        }

        poll() // check immediately on mount/focus
        pollIntervalRef.current = setInterval(poll, POLL_INTERVAL_MS)

        return () => stopPolling()
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