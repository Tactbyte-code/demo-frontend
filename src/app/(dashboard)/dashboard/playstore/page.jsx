"use client";

import React, { useState } from "react";
import { AlertCircle, Cpu, Zap, Search } from "lucide-react";
import { motion } from "framer-motion";
import { createQuery } from "@/lib/api/playstore";
import PlaystoreQueryHistoryTable from "./_components/PlaystoreQueryHistoryTable";
import { useRouter } from "next/navigation";

// shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

export default function AppAnalysisPage() {
    const [appUrl, setAppUrl] = useState("");
    const [error, setError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const router = useRouter();

    function getQueryParameter(urlString, paramName) {
        try {
            const url = new URL(urlString);
            return url.searchParams.get(paramName);
        } catch {
            return null;
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
                max_review: 500,
            };

            const response = await createQuery(body);

            if (response.status === "CREATED") {
                router.push(`/dashboard/playstore/query/${response.id}`);
            }

            if (response.status === "FAILED") {
                setError(response.failure_reason || "Something went wrong");
            }
        } catch (err) {
            setError(err?.response?.data?.detail || "Something went wrong");
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
            <div className="max-w-7xl mx-auto px-8 py-10 flex flex-col gap-6">

                {/* ERROR */}
                {error && (
                    <Alert variant="destructive" className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center pt-16 pb-16 gap-10"
                >
                    {/* HEADER */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <div
                                className="w-24 h-24 rounded-full flex items-center justify-center border shadow-md"
                                style={{
                                    background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 15%, var(--surface)), color-mix(in srgb, var(--accent) 10%, var(--surface)))"
                                }}
                            >
                                <Cpu className="w-11 h-11 text-primary" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center bg-accent">
                                <Zap className="w-2.5 h-2.5 text-black" />
                            </div>
                        </div>

                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-2">PlayStore Analyzer</h2>
                            <p className="text-muted-foreground">
                                Get a full app analysis under 5 minutes
                            </p>
                        </div>
                    </div>

                    {/* FORM */}
                    <Card className="w-full max-w-2xl">
                        <CardContent className="p-6 flex flex-col gap-4">
                            <form onSubmit={submitPlaystoreQuery} className="flex flex-col gap-4">

                                {/* Input */}
                                <div className="flex items-center gap-2 border rounded-md px-3">
                                    <Search className="w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={appUrl}
                                        onChange={(e) => setAppUrl(e.target.value)}
                                        placeholder="Enter your app's Play Store URL"
                                        className="border-none focus-visible:ring-0"
                                    />
                                </div>

                                {/* Analyze Button */}
                                <Button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="w-full"
                                >
                                    {submitLoading ? "Analyzing..." : "Analyze"}
                                </Button>

                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                <PlaystoreQueryHistoryTable />
            </div>
        </div>
    );
}