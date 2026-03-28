"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Play, RefreshCw, AlertTriangle } from "lucide-react";

const STEPS = [
    { key: "CREATED", label: "Created" },
    { key: "FETCHING", label: "Fetch Reviews" },
    { key: "FETCH_COMPLETE", label: "Reviews Ready" },
    { key: "SUMMARIZING", label: "Analyze" },
    { key: "COMPLETED", label: "Done" },
];

const STEP_INDEX = Object.fromEntries(STEPS.map((s, i) => [s.key, i]));

export function Pipeline({
    showPipeline,
    status,
    progressPercent,
    isProcessing,
    isCheckpoint,
    isFetchComplete,
    isCompleted,
    isFailed,
    isCreated,
    isTerminal,
    canRetryFetch,
    canRetrySummarize,
    actionLoading,
    getStatusLabel,
    getStatusColor,
    getProgressColor,
    getTerminalMessage,
    onFetch,
    onSummarize,
    onRetryFetch,
    onRetrySummarize,
}) {
    if (!showPipeline) return null;

    const currentIdx = STEP_INDEX[status] ?? (isFailed ? -1 : 0);
    const terminalMsg = getTerminalMessage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl p-6 flex flex-col gap-5"
            style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border-solid)",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                    {isProcessing && (
                        <Loader2 className="w-4 h-4 animate-spin" style={{ color: "var(--primary)" }} />
                    )}
                    {isCompleted && <CheckCircle2 className="w-4 h-4" style={{ color: "var(--success)" }} />}
                    {isFailed && <XCircle className="w-4 h-4" style={{ color: "var(--destructive)" }} />}
                    <span
                        className="text-sm font-semibold"
                        style={{ color: getStatusColor(status) }}
                    >
                        {getStatusLabel(status)}
                    </span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    {isCreated && (
                        <ActionButton
                            icon={Play}
                            label="Start Fetch"
                            loading={actionLoading}
                            onClick={onFetch}
                            variant="primary"
                        />
                    )}
                    {isFetchComplete && (
                        <ActionButton
                            icon={Play}
                            label="Run Analysis"
                            loading={actionLoading}
                            onClick={onSummarize}
                            variant="primary"
                        />
                    )}
                    {canRetryFetch && (
                        <ActionButton
                            icon={RefreshCw}
                            label="Retry Fetch"
                            loading={actionLoading}
                            onClick={onRetryFetch}
                            variant="warning"
                        />
                    )}
                    {canRetrySummarize && (
                        <ActionButton
                            icon={RefreshCw}
                            label="Retry Analysis"
                            loading={actionLoading}
                            onClick={onRetrySummarize}
                            variant="warning"
                        />
                    )}
                </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border-solid)" }}>
                <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ backgroundColor: getProgressColor(status) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            </div>

            {/* Step chips */}
            <div className="flex gap-2 flex-wrap">
                {STEPS.map((step, idx) => {
                    const isDone = !isFailed && idx < currentIdx;
                    const isCurrent = !isFailed && idx === currentIdx;
                    const isPending = idx > currentIdx;
                    const isFailedStep = isFailed && idx === currentIdx;

                    return (
                        <div
                            key={step.key}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                            style={{
                                backgroundColor: isDone
                                    ? "color-mix(in srgb, var(--success) 12%, var(--surface))"
                                    : isCurrent && isProcessing
                                        ? "color-mix(in srgb, var(--primary) 12%, var(--surface))"
                                        : isFailedStep
                                            ? "color-mix(in srgb, var(--destructive) 12%, var(--surface))"
                                            : isCurrent
                                                ? "color-mix(in srgb, var(--accent) 12%, var(--surface))"
                                                : "color-mix(in srgb, var(--border-solid) 50%, var(--surface))",
                                border: `1px solid ${isDone ? "color-mix(in srgb, var(--success) 25%, transparent)"
                                        : isCurrent && isProcessing ? "color-mix(in srgb, var(--primary) 25%, transparent)"
                                            : isFailedStep ? "color-mix(in srgb, var(--destructive) 25%, transparent)"
                                                : isCurrent ? "color-mix(in srgb, var(--accent) 25%, transparent)"
                                                    : "var(--border-solid)"
                                    }`,
                                color: isDone
                                    ? "var(--success)"
                                    : isCurrent && isProcessing
                                        ? "var(--primary)"
                                        : isFailedStep
                                            ? "var(--destructive)"
                                            : isCurrent
                                                ? "var(--accent)"
                                                : "var(--text-subtle)",
                                opacity: isPending ? 0.45 : 1,
                            }}
                        >
                            {isDone && <CheckCircle2 className="w-3 h-3" />}
                            {isCurrent && isProcessing && <Loader2 className="w-3 h-3 animate-spin" />}
                            {isFailedStep && <XCircle className="w-3 h-3" />}
                            {step.label}
                        </div>
                    );
                })}
            </div>

            {/* Failure message */}
            <AnimatePresence>
                {isFailed && terminalMsg && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm"
                        style={{
                            backgroundColor: "var(--destructive-bg)",
                            border: "1px solid color-mix(in srgb, var(--destructive) 25%, transparent)",
                            color: "var(--destructive)",
                        }}
                    >
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{terminalMsg}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── ActionButton ──────────────────────────────────────────────────────────────
function ActionButton({ icon: Icon, label, loading, onClick, variant = "primary" }) {
    const colors = {
        primary: {
            bg: "color-mix(in srgb, var(--primary) 12%, var(--surface))",
            border: "color-mix(in srgb, var(--primary) 30%, transparent)",
            color: "var(--primary)",
        },
        warning: {
            bg: "color-mix(in srgb, var(--warning, #f59e0b) 12%, var(--surface))",
            border: "color-mix(in srgb, var(--warning, #f59e0b) 30%, transparent)",
            color: "var(--warning, #f59e0b)",
        },
    }[variant];

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, color: colors.color }}
        >
            {loading
                ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                : <Icon className="w-3.5 h-3.5" />
            }
            {label}
        </button>
    );
}