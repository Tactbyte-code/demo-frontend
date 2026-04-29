"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Clock, Search, Brain, Sparkles, FileText } from "lucide-react";
import { PipelineSteps } from "./PipelineSteps";
import { StreamLog } from "./StreamLog";

export function Pipeline({
    showPipeline,
    status,
    currentStep,
    progressPercent,
    isProcessing,
    isCheckpoint,
    isClarifying,
    isClarified,
    isSearchComplete,
    isCompleted,
    isFailed,
    isTimeout,
    isCancelled,
    isTerminal,
    canRetrySearch,
    canRetrySummarize,
    actionLoading,
    sources,
    approvedCount,
    streamChunks,
    getStatusLabel,
    getStatusColor,
    getProgressColor,
    getTerminalMessage,
    getStreamLabel,
    onClarify,
    onSearch,
    onSummarize,
    onRetrySearch,
    onRetrySummarize,
}) {
    const getStatusIcon = () => {
        if (isProcessing)
            return <Loader2 className="w-4 h-4 animate-spin" />;
        if (isCompleted || isCheckpoint)
            return <CheckCircle2 className="w-4 h-4" />;
        if (isFailed)
            return <AlertCircle className="w-4 h-4" />;
        if (isTimeout)
            return <Clock className="w-4 h-4" />;
        if (isCancelled)
            return <AlertCircle className="w-4 h-4 opacity-50" />;
        return null;
    };

    console.log('pipeline status: ', status);

    const borderColor = isTerminal
        ? "var(--destructive)"
        : isCompleted
            ? "var(--success)"
            : "var(--border-solid)";

    return (
        <AnimatePresence>
            {showPipeline && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8 border shadow-lg backdrop-blur-xl overflow-hidden"
                    style={{
                        background: "linear-gradient(145deg, var(--surface), var(--surface-raised))",
                        borderColor,
                    }}
                >
                    {/* ── Header with progress bar ───────────────────────────── */}
                    <div className="px-6 pt-6 pb-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div
                                    className="p-2 rounded-full"
                                    style={{ background: "var(--surface-raised)" }}
                                >
                                    {getStatusIcon()}
                                </div>
                                <div>
                                    <p
                                        className="text-sm font-semibold"
                                        style={{ color: getStatusColor() }}
                                    >
                                        {getStatusLabel()}
                                    </p>
                                    <p className="text-xs opacity-60">Pipeline execution flow</p>
                                </div>
                            </div>

                            {!isTerminal && (
                                <div className="text-right">
                                    <p className="text-xs opacity-60">Progress</p>
                                    <p className="text-sm font-mono font-semibold">{progressPercent}%</p>
                                </div>
                            )}
                        </div>

                        {/* Progress bar */}
                        <div className="relative h-2 overflow-hidden bg-gray-300 dark:bg-gray-700">
                            {/* Filled progress */}
                            <motion.div
                                className="absolute top-0 left-0 h-full"
                                style={{ background: getProgressColor() }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    {/* ── Stage Cards ────────────────────────────────────────── */}
                    <div className="px-6 py-3">
                        <PipelineSteps
                            currentStep={currentStep}
                            isCompleted={isCompleted}
                            isTerminal={isTerminal}
                            status={status}
                        />
                    </div>

                    {/* ── Stream Log ─────────────────────────────────────────── */}
                    <div
                        className="h-px mx-6 opacity-40"
                        style={{ background: "var(--border-solid)" }}
                    />

                    <div className="px-6 py-4 max-h-48 overflow-y-auto">
                        <StreamLog
                            sources={sources}
                            // streamChunks={streamChunks}
                            getStreamLabel={getStreamLabel}
                            status={status}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}