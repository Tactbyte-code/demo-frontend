import { motion, AnimatePresence } from "framer-motion";
import { MAX_APPROVED } from "../_hooks/constants";
import { SourceCard } from "./SourceCard";

export function SourcesList({
    showSources,
    postsLoaded,
    sources,
    approvedCount,
    approvalError,
    isSearchComplete,
    onDismissError,
    onToggle,
    pendingIds,
    onSelectTop10,
}) {
    return (
        <AnimatePresence>
            {showSources && postsLoaded && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                    {/* header */}
                    <div className="flex items-center justify-between mb-4">
                        <span
                            className="text-[10px] font-mono font-extrabold uppercase tracking-widest"
                            style={{ color: "var(--text-subtle)" }}
                        >
                            Reddit sources
                        </span>
                        <div className="flex items-center gap-3">
                            {approvedCount > 0 && (
                                <span
                                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                                    style={{ backgroundColor: "var(--info-bg)", color: "var(--primary)" }}
                                >
                                    {approvedCount}/{MAX_APPROVED} selected
                                </span>
                            )}
                            {isSearchComplete && (
                                <button
                                    onClick={onSelectTop10}
                                    className="text-[10px] font-bold uppercase tracking-widest px-3 h-7 rounded-lg transition-all"
                                    style={{ backgroundColor: "var(--surface-raised)", color: "var(--text-muted)", cursor: "pointer" }}
                                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = "var(--info-bg)"; e.currentTarget.style.color = "var(--primary)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "var(--surface-raised)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                                >
                                    Select top {MAX_APPROVED}
                                </button>
                            )}
                            <span className="text-[10px] font-mono" style={{ color: "var(--text-subtle)" }}>
                                {sources.length} posts
                            </span>
                        </div>
                    </div>

                    {/* approval error */}
                    <AnimatePresence>
                        {approvalError && (
                            <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-4 px-4 py-3 rounded-xl border flex items-center justify-between gap-3"
                                style={{ backgroundColor: "var(--warning-bg)", borderColor: "var(--warning)" }}
                            >
                                <p className="text-xs font-semibold" style={{ color: "var(--warning)" }}>{approvalError}</p>
                                <button
                                    onClick={onDismissError}
                                    className="text-[10px] font-bold shrink-0"
                                    style={{ color: "var(--warning)" }}
                                >
                                    Dismiss
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isSearchComplete && (
                        <p className="text-xs mb-4" style={{ color: "var(--text-subtle)" }}>
                            Click a post to select it for analysis. Select up to {MAX_APPROVED}.
                        </p>
                    )}

                    {/* post list */}
                    <div className="flex flex-col gap-3">
                        {sources.map((source, i) => {
                            const selected = !!source.user_approved;
                            const atMax = approvedCount >= MAX_APPROVED && !selected;
                            return (
                                <SourceCard
                                    key={source.id ?? i}
                                    source={source}
                                    index={i}
                                    selected={selected}
                                    atMax={atMax}
                                    pending={pendingIds.has(source.id)}
                                    onToggle={onToggle}
                                />
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}