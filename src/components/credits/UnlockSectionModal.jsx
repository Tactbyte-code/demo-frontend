"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, AlertCircle, Loader2 } from "lucide-react";

export default function UnlockSectionModal({ isOpen, onClose, sectionLabel, credits, cost, onUnlock }) {
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [error, setError] = useState("");

    const handleUnlock = async () => {
        setError("");
        setIsUnlocking(true);
        try {
            await onUnlock();
            onClose();
        } catch (err) {
            setError(
                err?.response?.data?.detail ||
                err?.message ||
                "Could not unlock this section. Please try again."
            );
        } finally {
            setIsUnlocking(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!isUnlocking ? onClose : undefined}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="relative w-full max-w-md bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden pointer-events-auto"
                        >
                            <div className="flex justify-between items-start p-6 border-b border-zinc-800/60 bg-zinc-900/50">
                                <div className="flex items-start gap-3.5">
                                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-zinc-100">Unlock {sectionLabel}</h2>
                                        <p className="text-sm text-zinc-400 mt-1">
                                            Your current credit balance is enough to unlock this section.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    disabled={isUnlocking}
                                    aria-label="Close"
                                    className="p-2 rounded-full hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6">
                                {error && (
                                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <p className="text-sm font-medium">{error}</p>
                                    </div>
                                )}

                                <dl className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                                    <div className="flex justify-between"><dt>Current balance</dt><dd className="font-semibold">{credits} credits</dd></div>
                                    <div className="flex justify-between"><dt>Cost to unlock</dt><dd className="font-semibold">{cost} credits</dd></div>
                                    <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-2">
                                        <dt>Balance after</dt><dd className="font-semibold">{credits - cost} credits</dd>
                                    </div>
                                </dl>

                                <button
                                    onClick={handleUnlock}
                                    disabled={isUnlocking}
                                    className="w-full mt-6 py-3 rounded-xl cursor-pointer font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 text-white transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isUnlocking ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Unlocking...</>
                                    ) : (
                                        "Unlock section"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}