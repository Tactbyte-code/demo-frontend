"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
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
    const [isOpen, setIsOpen] = useState(false); // collapsed by default

    return (
        <AnimatePresence>
            {showSources && postsLoaded && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

                    {/* 🔽 HEADER */}
                    <div
                        onClick={() => setIsOpen(prev => !prev)}
                        className="group mb-3 flex items-center justify-between px-4 py-3 rounded-xl border transition-all cursor-pointer"
                        style={{
                            backgroundColor: "var(--surface-raised)",
                            borderColor: "var(--border-subtle)",
                        }}
                    >
                        {/* LEFT */}
                        <div className="flex items-center gap-3">
                            {/* caret */}
                            <motion.div
                                animate={{ rotate: isOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-center"
                            >
                                <ChevronRight size={16} />
                            </motion.div>

                            {/* title + meta */}
                            <div className="flex flex-col">
                                <span
                                    className="text-xs font-semibold"
                                    style={{ color: "var(--text-primary)" }}
                                >
                                    Reddit Sources
                                </span>
                                <span
                                    className="text-[10px] font-mono"
                                    style={{ color: "var(--text-subtle)" }}
                                >
                                    {sources.length} posts • Select up to {MAX_APPROVED}
                                </span>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-2">
                            {approvedCount > 0 && (
                                <span
                                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                                    style={{
                                        backgroundColor: "var(--info-bg)",
                                        color: "var(--primary)",
                                    }}
                                >
                                    {approvedCount}/{MAX_APPROVED}
                                </span>
                            )}

                            {isSearchComplete && isOpen && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectTop10();
                                    }}
                                    className="text-[10px] font-semibold px-3 h-7 rounded-md transition-all opacity-0 group-hover:opacity-100"
                                    style={{
                                        backgroundColor: "var(--info-bg)",
                                        color: "var(--primary)",
                                    }}
                                >
                                    Auto-select
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 🔽 COLLAPSIBLE CONTENT */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >

                                {/* approval error */}
                                <AnimatePresence>
                                    {approvalError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="mb-4 px-4 py-3 rounded-xl border flex items-center justify-between gap-3"
                                            style={{
                                                backgroundColor: "var(--warning-bg)",
                                                borderColor: "var(--warning)",
                                            }}
                                        >
                                            <p className="text-xs font-semibold" style={{ color: "var(--warning)" }}>
                                                {approvalError}
                                            </p>
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

                </motion.div>
            )}
        </AnimatePresence>
    );
}