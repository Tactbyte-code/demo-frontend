import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Search, ArrowRight, Sparkles, RotateCcw, SearchX } from "lucide-react";
import { MAX_APPROVED } from "../_hooks/constants";

function ActionBar({ children, danger = false }) {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t px-6 py-4 flex items-center justify-between gap-4"
            style={{
                borderColor: danger ? "var(--destructive)" : "var(--border-solid)",
                backgroundColor: danger ? "var(--destructive-bg)" : "var(--surface-card)",
            }}
        >
            {children}
        </motion.div>
    );
}

function PrimaryButton({ onClick, disabled, children }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex items-center gap-2 px-5 h-9 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all shrink-0"
            style={{
                background: disabled ? "var(--surface-raised)" : "var(--primary)",
                color: disabled ? "var(--text-subtle)" : "#fff",
                cursor: disabled ? "not-allowed" : "pointer",
            }}
        >
            {children}
        </button>
    );
}

function RetryButton({ onClick, disabled, children }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="flex items-center gap-2 px-5 h-9 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all shrink-0"
            style={{
                background: "transparent",
                color: disabled ? "var(--text-subtle)" : "var(--destructive)",
                border: `1.5px solid ${disabled ? "var(--border-solid)" : "var(--destructive)"}`,
                cursor: disabled ? "not-allowed" : "pointer",
            }}
        >
            {children}
        </button>
    );
}

export function PipelineActions({
    isClarifying,
    isClarified,
    isSearchComplete,
    isTerminal,
    isFailed,
    isTimeout,
    actionLoading,
    sources,
    approvedCount,
    canRetrySearch,
    canRetrySummarize,
    getTerminalMessage,
    onClarify,
    onSearch,
    onSummarize,
    onRetrySearch,
    onRetrySummarize,
}) {
    return (
        <AnimatePresence>
            {/* clarifying */}
            {isClarifying && (
                <ActionBar>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        We need a bit more context to find the best Reddit threads.
                    </p>
                    <PrimaryButton onClick={onClarify}>
                        <ArrowRight className="w-3.5 h-3.5" /> Answer question
                    </PrimaryButton>
                </ActionBar>
            )}

            {/* clarified — ready to search */}
            {isClarified && (
                <ActionBar>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Intent is clear. Search Reddit to find your answer.
                    </p>
                    <PrimaryButton onClick={onSearch} disabled={actionLoading}>
                        {actionLoading ? (
                            <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Starting...
                            </>
                        ) : (
                            <>
                                <Search className="w-3.5 h-3.5" /> Continue to Reddit analysis <ArrowRight className="w-3.5 h-3.5" />
                            </>
                        )}
                    </PrimaryButton>
                </ActionBar>
            )}

            {/* search complete — no results found */}
            {isSearchComplete && sources.length === 0 && (
                <ActionBar>
                    <div className="flex items-start gap-3">
                        <SearchX className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--warning)" }} />
                        <div>
                            <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-main)" }}>
                                Not much on Reddit about this
                            </p>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                We couldn't find relevant reddit data, but we can still generate an answer based on your query.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <PrimaryButton onClick={onSummarize} disabled={actionLoading}>
                            {actionLoading ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-3.5 h-3.5" /> Generate anyway <ArrowRight className="w-3.5 h-3.5" />
                                </>
                            )}
                        </PrimaryButton>
                    </div>
                </ActionBar>
            )}

            {/* search complete — posts found, ready to summarize */}
            {isSearchComplete && sources.length > 0 && (
                <ActionBar>
                    <div>
                        <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-main)" }}>
                            {sources.length} Reddit posts found
                            {approvedCount > 0 && (
                                <span className="ml-2 font-normal" style={{ color: "var(--primary)" }}>
                                    · {approvedCount}/{MAX_APPROVED} selected
                                </span>
                            )}
                        </p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Select up to {MAX_APPROVED} posts then generate your answer.
                        </p>
                    </div>
                    <PrimaryButton onClick={onSummarize} disabled={actionLoading}>
                        {actionLoading ? (
                            <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-3.5 h-3.5" /> Generate answer <ArrowRight className="w-3.5 h-3.5" />
                            </>
                        )}
                    </PrimaryButton>
                </ActionBar>
            )}

            {/* terminal — show appropriate retry */}
            {isTerminal && (
                <ActionBar danger={isFailed || isTimeout}>
                    <p className="text-xs" style={{ color: isFailed || isTimeout ? "var(--destructive)" : "var(--text-muted)" }}>
                        {getTerminalMessage()}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                        {canRetrySearch && (
                            <RetryButton onClick={onRetrySearch} disabled={actionLoading}>
                                {actionLoading ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Retrying...
                                    </>
                                ) : (
                                    <>
                                        <RotateCcw className="w-3.5 h-3.5" /> Retry search
                                    </>
                                )}
                            </RetryButton>
                        )}
                        {canRetrySummarize && (
                            <RetryButton onClick={onRetrySummarize} disabled={actionLoading}>
                                {actionLoading ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Retrying...
                                    </>
                                ) : (
                                    <>
                                        <RotateCcw className="w-3.5 h-3.5" /> Retry summarize
                                    </>
                                )}
                            </RetryButton>
                        )}
                    </div>
                </ActionBar>
            )}
        </AnimatePresence>
    );
}