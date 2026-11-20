"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PlaystoreAnalysisHeader from "@/features/playstore/components/workspace/analysis/PlaystoreAnalysisHeader";
import PlaystoreAnalysisStats from "@/features/playstore/components/workspace/analysis/PlaystoreAnalysisStats";
import PlaystoreAnalysisList from "@/features/playstore/components/workspace/analysis/PlaystoreAnalysisList";
import PlaystoreAnalysisEmptyState from "@/features/playstore/components/workspace/analysis/PlaystoreAnalysisEmptyState";
import { useAuthStore } from "@/store/authStore";
import { useGetPlaystoreQueries } from "@/features/playstore/hooks/useGetPlaystoreQueries";

const PAGE_SIZE = 10;

export default function PlaystoreAnalysisPage() {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const authLoading = useAuthStore((state) => state.loading);

    const [page, setPage] = useState(1);

    // Firebase UID for authenticated users; null for guests.
    // The backend identifies guests using their guest session cookie.
    const userId = user?.uid ?? null;

    const {
        data: analyses = [],
        isLoading,
        isError,
        error,
        isPlaceholderData,
    } = useGetPlaystoreQueries(userId, page, PAGE_SIZE);

    const total = analyses.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    const stats = useMemo(
        () => ({
            total,
            completed: analyses.filter(
                (item) => item.status?.toLowerCase() === "completed"
            ).length,
            processing: analyses.filter((item) =>
                [
                    "created",
                    "queued",
                    "pending",
                    "processing",
                    "running",
                ].includes(item.status?.toLowerCase())
            ).length,
        }),
        [analyses, total]
    );

    const handleOpenAnalysis = (queryId, status) => {
        if (status?.toLowerCase() === "completed") {
            router.push(`/playstore/analysis/${queryId}/report`);
        } else {
            router.push(`/playstore/analysis/${queryId}`);
        }
    };

    const handleNewAnalysis = () => {
        router.push("/playstore");
    };

    // Avoid showing guest content while Firebase is resolving auth.
    if (authLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#F8FCF9]">
                <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#E5F5E9] border-t-[#188038]" />
            </div>
        );
    }

    return (
        <div className="mx-auto min-h-screen w-full max-w-7xl bg-[#F8FCF9] px-5 py-6 sm:px-8 lg:px-6">
            <PlaystoreAnalysisHeader
                isAuthenticated={!!user}
                onNewAnalysis={handleNewAnalysis}
            />

            {user && (
                <PlaystoreAnalysisStats
                    total={total}
                    completed={stats.completed}
                    processing={stats.processing}
                />
            )}

            {!user && analyses.length > 0 && (
                <div className="mb-8 overflow-hidden rounded-2xl border border-[#DCEBE0] bg-gradient-to-r from-[#E5F5E9] to-white p-4 shadow-sm sm:p-5">
                    <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#188038]/10 text-[#188038]">
                            <span className="text-xl font-bold">G</span>
                        </div>

                        <div>
                            <h3 className="font-semibold text-[#142B1B]">
                                Keep your app insights safe
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-[#718477]">
                                Create an account to claim your guest analyses
                                and access your app reports whenever you return.
                            </p>

                            <button
                                onClick={() => router.push("/login")}
                                className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#188038] transition-colors hover:text-[#146C2E]"
                            >
                                Sign in or create an account
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <section className="mt-9">
                {/* Section Header */}
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <div className="mb-1 flex items-center gap-2">
                            <div className="h-5 w-1 rounded-full bg-[#188038]" />
                            <h2 className="text-lg font-bold tracking-tight text-[#142B1B]">
                                Recent analyses
                            </h2>
                        </div>

                        <p className="mt-1 text-sm text-[#718477]">
                            {user
                                ? "Your latest Play Store app analyses."
                                : "Analyses from your current guest session."}
                        </p>
                    </div>

                    {total > 0 && (
                        <span className="rounded-full border border-[#DCEBE0] bg-white px-3 py-1.5 text-xs font-semibold text-[#718477]">
                            {total} {total === 1 ? "analysis" : "analyses"}
                        </span>
                    )}
                </div>

                {/* Loading State */}
                {isLoading || (isPlaceholderData && analyses.length === 0) ? (
                    <div className="grid gap-4">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-32 animate-pulse rounded-xl border border-[#DCEBE0] bg-white"
                            />
                        ))}
                    </div>
                ) : isError ? (
                    /* Error State */
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                                !
                            </div>

                            <div>
                                <h3 className="font-semibold text-red-700">
                                    Couldn&apos;t load your analyses
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-red-600">
                                    {error?.message ||
                                        "Something went wrong. Please try again."}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : analyses.length === 0 ? (
                    /* Empty State */
                    <PlaystoreAnalysisEmptyState
                        onNewAnalysis={handleNewAnalysis}
                    />
                ) : (
                    <>
                        <PlaystoreAnalysisList
                            analyses={analyses}
                            onOpenAnalysis={handleOpenAnalysis}
                            isPlaceholderData={isPlaceholderData}
                        />

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-7 flex items-center justify-between rounded-xl border border-[#DCEBE0] bg-white px-4 py-3 shadow-sm sm:px-5">
                                <button
                                    disabled={page <= 1 || isPlaceholderData}
                                    onClick={() =>
                                        setPage((current) => current - 1)
                                    }
                                    className="rounded-lg border border-[#DCEBE0] bg-white px-4 py-2 text-sm font-semibold text-[#718477] transition-all duration-200 hover:border-[#34A853]/50 hover:bg-[#E5F5E9] hover:text-[#188038] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#DCEBE0] disabled:hover:bg-white disabled:hover:text-[#718477]"
                                >
                                    Previous
                                </button>

                                <span className="text-sm font-medium text-[#718477]">
                                    Page{" "}
                                    <span className="font-bold text-[#142B1B]">
                                        {page}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-bold text-[#142B1B]">
                                        {totalPages}
                                    </span>
                                </span>

                                <button
                                    disabled={
                                        page >= totalPages || isPlaceholderData
                                    }
                                    onClick={() =>
                                        setPage((current) => current + 1)
                                    }
                                    className="rounded-lg border border-[#DCEBE0] bg-white px-4 py-2 text-sm font-semibold text-[#718477] transition-all duration-200 hover:border-[#34A853]/50 hover:bg-[#E5F5E9] hover:text-[#188038] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#DCEBE0] disabled:hover:bg-white disabled:hover:text-[#718477]"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}
