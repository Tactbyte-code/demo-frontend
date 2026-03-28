"use client";

import React, { useState } from "react";
import { AlertCircle, Cpu, Zap, Search } from "lucide-react";
import { motion } from "framer-motion";
import { createQuery } from "@/lib/api/playstore";
import PlaystoreQueryHistoryTable from "./_components/PlaystoreQueryHistoryTable";
import { useRouter } from "next/navigation";

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AppAnalysisPage() {
    const [appUrl, setAppUrl] = useState("");
    const [error, setError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const router = useRouter();

    function getQueryParameter(urlString, paramName) {
        try {
            // Create a URL object to parse the input URL string
            const url = new URL(urlString);

            // Use the searchParams property to get the value of the specific parameter
            const value = url.searchParams.get(paramName);

            return value;
        } catch (error) {
            console.error("Invalid URL:", error);
            return null; // Handle cases where the input string is not a valid URL
        }
    }

    const submitPlaystoreQuery = async (e) => {
        e?.preventDefault();
        if (submitLoading) return;
        setSubmitLoading(true);
        setError(null);

        try {
            const body = {
                app_id: getQueryParameter(appUrl, "id"),
                max_review: 500
            }

            const response = await createQuery(body);
            // console.log(response);
            if (response.status === "CREATED") {
                router.push(`/dashboard/playstore/query/${response.id}`);
            }

            if (response.status === "FAILED") {
                setError(response.failure_reason || "Something went wrong");
            }

        } catch (err) {
            console.log(err);
            setError(err.response?.data?.detail || "Something went wrong");
        } finally {
            setSubmitLoading(false);
        }
    };

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: "var(--background)", color: "var(--text-main)" }}>
            <div className="max-w-5xl mx-auto px-8 py-10 flex flex-col gap-6">
                {/* ERROR */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold"
                        style={{ backgroundColor: "var(--destructive-bg)", border: "1px solid color-mix(in srgb, var(--destructive) 25%, transparent)", color: "var(--destructive)" }}
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                    </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center pt-16 pb-16 gap-10">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <div
                                className="w-24 h-24 rounded-3xl flex items-center justify-center"
                                style={{
                                    background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 15%, var(--surface)), color-mix(in srgb, var(--accent) 10%, var(--surface)))",
                                    border: "1px solid var(--glass-border)",
                                    boxShadow: "0 0 40px color-mix(in srgb, var(--primary) 15%, transparent), var(--shadow-md)",
                                }}
                            >
                                <Cpu className="w-11 h-11" style={{ color: "var(--primary)" }} />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}>
                                <Zap className="w-2.5 h-2.5" style={{ color: "#080f14" }} />
                            </div>
                        </div>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight mb-3" style={{ color: "var(--text-main)" }}>
                                PlayStore Analyzer
                            </h2>
                            <p className="text-base" style={{ color: "var(--text-muted)" }}>
                                Get a full app analysis under 5 minutes
                            </p>
                        </div>
                    </div>

                    <form onSubmit={submitPlaystoreQuery} className="w-full max-w-2xl mx-auto flex flex-col gap-3">
                        {/* App ID input */}
                        <motion.div
                            transition={{ duration: 0.2 }}
                            className="relative flex items-center rounded-2xl overflow-hidden"
                            style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)" }}
                        >
                            <motion.div className="absolute top-0 left-0 right-0 h-px" transition={{ duration: 0.3 }} />
                            <div className="pl-5 pr-3 flex items-center gap-3 shrink-0">
                                <Search className="w-4 h-4 transition-colors duration-200" />
                                <div className="w-px h-5 shrink-0" style={{ backgroundColor: "var(--border-solid)" }} />
                            </div>
                            <input
                                type="text"
                                value={appUrl}
                                onChange={(e) => setAppUrl(e.target.value)}
                                placeholder="Enter you app's playstore url"
                                className="flex-1 py-4 bg-transparent outline-none text-sm font-medium font-mono"
                                style={{ color: "var(--text-main)" }}
                            />
                        </motion.div>
                    </form>
                </motion.div>
                <PlaystoreQueryHistoryTable />
            </div>
        </div>
    );
}