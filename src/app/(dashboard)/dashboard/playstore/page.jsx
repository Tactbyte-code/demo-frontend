"use client";

import React, { useState } from "react";
import { AlertCircle, Cpu, Zap, Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { createQuery } from "@/lib/api/playstore";
import PlaystoreQueryHistoryTable from "./_components/PlaystoreQueryHistoryTable";
import { useRouter } from "next/navigation";
import AILoader from "@/components/shared/AiLoader";
import { useQueryClient } from "@tanstack/react-query";
import { useCreditStore } from "@/store/useCreditStore";
import CreditPurchaseModal from "@/components/credits/CreditPurchaseModal";

export default function AppAnalysisPage() {

    const [appUrl, setAppUrl] = useState("");
    const [error, setError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
    const router = useRouter();

    const { credits } = useCreditStore();

    const user_id = typeof window !== 'undefined'
        ? JSON.parse(localStorage?.getItem('user') || '{}')?.firebase_uid
        : null; console.log('user id: ', user_id);

    const queryClient = useQueryClient();

    function getQueryParameter(urlString, paramName) {
        try {
            const url = new URL(urlString);
            return url.searchParams.get(paramName);
        } catch (error) {
            console.error("Invalid URL:", error);
            return null;
        }
    };

    const submitPlaystoreQuery = async (e) => {
        e?.preventDefault();

        if (credits < 15) {
            setIsCreditModalOpen(true);
            return;
        };

        if (submitLoading) return;
        setSubmitLoading(true);
        setError(null);

        try {
            const appId = getQueryParameter(appUrl, "id");

            if (!appId) {
                setError("Please enter a valid Play Store URL");
                setSubmitLoading(false);
                return;
            }

            const body = {
                app_id: appId,
                max_review: 500
            };

            const response = await createQuery(body);
            // if (response) queryClient.removeQueries({ queryKey: ["play-queries", user_id] });

            if (response?.status === "CREATED") {
                queryClient.removeQueries({ queryKey: ["play-queries", user_id] });
                router.push(`/dashboard/playstore/query/${response.id}`);
            }

            if (response.status === "FAILED") {
                setError(response.failure_reason || "Something went wrong");
                setSubmitLoading(false);
            }

        } catch (err) {
            let message = err?.response?.data?.detail || err?.message || "Something went wrong";
            setError(String(message));
            setSubmitLoading(false);
        }
    };

    if (submitLoading) {
        return (
            <div className="flex items-center justify-center h-[80vh] px-4">
                <AILoader />
            </div>
        )
    };

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: "var(--background)", color: "var(--text-main)" }}>
            {/* Reduced px-8 to px-4 on mobile for more room */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col gap-6">

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center pt-8 md:pt-16 pb-12 md:pb-16 gap-5"
                >
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            {/* Responsive icon size */}
                            <div
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                                style={{
                                    background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 15%, var(--surface)), color-mix(in srgb, var(--accent) 10%, var(--surface)))",
                                    border: "1px solid var(--glass-border)",
                                    boxShadow: "0 0 40px color-mix(in srgb, var(--primary) 15%, transparent), var(--shadow-md)",
                                }}
                            >
                                <Cpu className="w-9 h-9 md:w-11 md:h-11" style={{ color: "var(--primary)" }} />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}>
                                <Zap className="w-2.5 h-2.5" style={{ color: "#080f14" }} />
                            </div>
                        </div>

                        <div className="text-center px-2">
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 md:mb-3" style={{ color: "var(--text-main)" }}>
                                PlayStore Analyzer
                            </h2>
                            <p className="text-sm md:text-base" style={{ color: "var(--text-muted)" }}>
                                Get a full app analysis under 5 minutes
                            </p>
                        </div>
                    </div>

                    {/* Responsive Form: Stacks on mobile, row on desktop */}
                    <form onSubmit={submitPlaystoreQuery} className="w-full mt-5 max-w-3xl mx-auto flex flex-col md:flex-row gap-3">
                        <motion.div
                            transition={{ duration: 0.2 }}
                            className="relative flex items-center overflow-hidden flex-1"
                            style={{
                                backgroundColor: "var(--surface)",
                                border: "1px solid var(--border-solid)",
                            }}
                        >
                            <div className="pl-4 md:pl-5 pr-3 flex items-center gap-3 shrink-0">
                                <Search className="w-4 h-4" />
                                <div className="w-px h-5 shrink-0" style={{ backgroundColor: "var(--border-solid)" }} />
                            </div>

                            <input
                                type="text"
                                value={appUrl}
                                onChange={(e) => setAppUrl(e.target.value)}
                                placeholder="Paste playstore url"
                                className="flex-1 py-3.5 md:py-4 bg-transparent outline-none text-sm font-medium mr-5"
                                style={{ color: "var(--text-main)" }}
                                onFocus={(e) => {
                                    e.target.parentElement.style.border = "1px solid var(--primary)";
                                }}
                                onBlur={(e) => {
                                    e.target.parentElement.style.border = "1px solid var(--border-solid)";
                                }}
                            />
                        </motion.div>

                        <button
                            type="submit"
                            disabled={submitLoading}
                            className="w-full md:w-auto px-8 py-3.5 text-light md:py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                            style={{
                                backgroundColor: "var(--primary)",
                                // color: "#fff",
                                border: "1px solid var(--primary)",
                                opacity: submitLoading ? 0.7 : 1,
                                cursor: submitLoading ? "not-allowed" : "pointer",
                            }}
                        >
                            Analyze
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center w-full max-w-3xl gap-2.5 px-4 py-3 text-xs font-semibold"
                            style={{
                                backgroundColor: "var(--destructive-bg)",
                                border: "1px solid color-mix(in srgb, var(--destructive) 25%, transparent)",
                                color: "var(--destructive)"
                            }}
                        >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span className="break-words">{error}</span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Wrapper for the table to handle overflow if the table isn't internally responsive */}
                <div className="overflow-x-auto">
                    <PlaystoreQueryHistoryTable />
                </div>
            </div>

            {/* Mount the modal outside of your standard document flow */}
            <CreditPurchaseModal
                isOpen={isCreditModalOpen}
                onClose={() => setIsCreditModalOpen(false)}
            />
        </div>
    );
}