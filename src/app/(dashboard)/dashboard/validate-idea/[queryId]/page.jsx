"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { FaSpinner } from 'react-icons/fa'
import { generateContext, triggerSearch } from "@/features/validate/api/validate.api"

const ValidateQueryIdPage = () => {
    const params = useParams()
    const queryId = params?.queryId

    const [isCompleted, setIsCompleted] = useState(false)
    const [currentStage, setCurrentStage] = useState("Initializing...")
    const [validationData, setValidationData] = useState(null)

    useEffect(() => {
        if (!queryId) return

        const processValidationStages = async () => {
            try {
                setCurrentStage("Generating Context...")

                // Stage 1: Generate Context
                const contextResponse = await generateContext(queryId)
                console.log("Context generated response: ", contextResponse)

                // Check if context generation was successful
                if (contextResponse?.status === "VALIDATED") {
                    setCurrentStage("Searching the web for insights...")

                    // Stage 2: Trigger Search
                    const searchResponse = await triggerSearch(queryId)
                    console.log("Search response: ", searchResponse)

                    // Check if search completed successfully
                    if (searchResponse?.status === "SEARCH_COMPLETED") {
                        setValidationData(searchResponse)
                        setIsCompleted(true) // Stops the loader and shows the UI
                    } else {
                        setCurrentStage(`Search paused or failed. Status: ${searchResponse?.status || 'Unknown'}`)
                    }
                } else {
                    setCurrentStage(`Validation paused or failed. Status: ${contextResponse?.status || 'Unknown'}`)
                }

            } catch (error) {
                console.error("Error processing validation stages:", error)
                setCurrentStage("An error occurred. Please try again.")
            }
        }

        processValidationStages()
    }, [queryId])

    // Universal Loader UI - shows by default until isCompleted becomes true
    if (!isCompleted) {
        return (
            <div className="min-h-[91vh] flex flex-col items-center justify-center px-4 bg-slate-50 text-slate-900">
                <div className="flex flex-col items-center space-y-5 text-center">
                    <FaSpinner className="animate-spin text-5xl text-indigo-600" />
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-1">
                            Processing Query
                        </h2>
                        {/* <p className="text-sm font-medium text-slate-500 animate-pulse">
                            {currentStage}
                        </p> */}
                    </div>
                </div>
            </div>
        )
    }

    // Final UI once all stages are completed
    return (
        <div className="min-h-[91vh] flex flex-col items-center px-4 py-8 md:py-12 bg-slate-50 text-slate-900">
            <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">
                    Vertex Search Completed
                </h1>
                <p className="text-slate-600 mb-6">
                    Search results successfully loaded for query ID: <span className="font-mono bg-slate-100 px-2 py-1 rounded text-sm">{queryId}</span>
                </p>

                {/* Example of rendering the final data */}
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