import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { PipelineSteps } from "./PipelineSteps";
import { StreamLog } from "./StreamLog";
import { PipelineActions } from "./PipelineActions";

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
        if (isProcessing) return <Loader2 className="w-4 h-4 animate-spin" style={{ color: "var(--primary)" }} />;
        if (isCompleted || isCheckpoint) return <CheckCircle2 className="w-4 h-4" style={{ color: "var(--success)" }} />;
        if (isFailed) return <AlertCircle className="w-4 h-4" style={{ color: "var(--destructive)" }} />;
        if (isTimeout) return <Clock className="w-4 h-4" style={{ color: "var(--warning)" }} />;
        if (isCancelled) return <AlertCircle className="w-4 h-4" style={{ color: "var(--text-subtle)" }} />;
        return null;
    };

    return (
        <AnimatePresence>
            {showPipeline && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border mb-8 overflow-hidden"
                    style={{
                        backgroundColor: "var(--surface)",
                        borderColor: isTerminal
                            ? "var(--destructive)"
                            : isCheckpoint || isCompleted
                                ? "var(--success)"
                                : "var(--border-solid)",
                    }}
                >
                    {/* header — status + progress bar */}
                    <div className="px-6 pt-5 pb-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                {getStatusIcon()}
                                <span className="text-sm font-semibold" style={{ color: getStatusColor() }}>
                                    {getStatusLabel()}
                                </span>
                            </div>
                            {!isTerminal && (
                                <span className="text-[11px] font-mono tabular-nums" style={{ color: "var(--text-subtle)" }}>
                                    {progressPercent}%
                                </span>
                            )}
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--surface-raised)" }}>
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: getProgressColor() }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    <PipelineSteps
                        currentStep={currentStep}
                        isCompleted={isCompleted}
                        isTerminal={isTerminal}
                    />

                    <StreamLog
                        streamChunks={streamChunks}
                        getStreamLabel={getStreamLabel}
                    />

                    <PipelineActions
                        isClarifying={isClarifying}
                        isClarified={isClarified}
                        isSearchComplete={isSearchComplete}
                        isTerminal={isTerminal}
                        isFailed={isFailed}
                        isTimeout={isTimeout}
                        canRetrySearch={canRetrySearch}
                        canRetrySummarize={canRetrySummarize}
                        actionLoading={actionLoading}
                        sources={sources}
                        approvedCount={approvedCount}
                        getTerminalMessage={getTerminalMessage}
                        onClarify={onClarify}
                        onSearch={onSearch}
                        onSummarize={onSummarize}
                        onRetrySearch={onRetrySearch}
                        onRetrySummarize={onRetrySummarize}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}