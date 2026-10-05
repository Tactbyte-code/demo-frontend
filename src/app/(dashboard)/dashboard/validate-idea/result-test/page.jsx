"use client";

import React, { useState } from 'react';
import { triggerSearch, generateSummary, generateContext } from '@/features/validate/api/validate.api';

const Page = () => {
    // Shared input state
    const [queryId, setQueryId] = useState('');

    // State management for Search
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    // State management for Context
    const [contextLoading, setContextLoading] = useState(false);
    const [contextError, setContextError] = useState(null);

    // State management for Summary
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [summaryError, setSummaryError] = useState(null);

    const isAnyLoading = searchLoading || contextLoading || summaryLoading;

    const handleSearch = async () => {
        if (!queryId.trim()) return;

        setSearchLoading(true);
        setSearchError(null);

        try {
            const searchData = await triggerSearch(queryId);
            console.log("Search fetched successfully: ", searchData);
        } catch (err) {
            console.error("Failed to fetch search data:", err);
            setSearchError(err.message || "Search failed. Please try again.");
        } finally {
            setSearchLoading(false);
        }
    };

    const handleContext = async () => {
        if (!queryId.trim()) return;

        setContextLoading(true);
        setContextError(null);

        try {
            const contextData = await generateContext(queryId);
            console.log("Context generated successfully: ", contextData);
        } catch (err) {
            console.error("Failed to generate context:", err);
            setContextError(err.message || "Context generation failed. Please try again.");
        } finally {
            setContextLoading(false);
        }
    };

    const handleSummary = async () => {
        if (!queryId.trim()) return;

        setSummaryLoading(true);
        setSummaryError(null);

        try {
            const summaryData = await generateSummary(queryId);
            console.log("Summary generated successfully: ", summaryData);
        } catch (err) {
            console.error("Failed to generate summary:", err);
            setSummaryError(err.message || "Summary generation failed. Please try again.");
        } finally {
            setSummaryLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-100 text-gray-900">
            <h1 className="text-xl font-bold mb-4 text-gray-900">Test API Actions</h1>

            <div className="flex flex-col gap-6">
                {/* Single Input Box */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="queryId" className="text-sm font-medium text-gray-700">
                        Query ID
                    </label>
                    <input
                        id="queryId"
                        type="text"
                        value={queryId}
                        onChange={(e) => setQueryId(e.target.value)}
                        placeholder="Enter your Query ID..."
                        disabled={isAnyLoading}
                        className="p-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 placeholder-gray-400"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={handleSearch}
                        disabled={isAnyLoading || !queryId.trim()}
                        className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {searchLoading ? 'Searching...' : 'Trigger Search'}
                    </button>

                    <button
                        type="button"
                        onClick={handleContext}
                        disabled={isAnyLoading || !queryId.trim()}
                        className="w-full px-4 py-2 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {contextLoading ? 'Generating Context...' : 'Generate Context'}
                    </button>

                    <button
                        type="button"
                        onClick={handleSummary}
                        disabled={isAnyLoading || !queryId.trim()}
                        className="w-full px-4 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {summaryLoading ? 'Generating Summary...' : 'Generate Summary'}
                    </button>
                </div>

                {/* Error Messages */}
                {(searchError || contextError || summaryError) && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        {searchError && <p className="text-sm text-red-600 mb-1">{searchError}</p>}
                        {contextError && <p className="text-sm text-red-600 mb-1">{contextError}</p>}
                        {summaryError && <p className="text-sm text-red-600">{summaryError}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;