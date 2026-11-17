"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AnalysisHeader from "@/features/validate/components/workspace/analysis/AnalysisHeader";
import AnalysisStats from "@/features/validate/components/workspace/analysis/AnalysisStats";
import AnalysisList from "@/features/validate/components/workspace/analysis/AnalysisList";
import AnalysisEmptyState from "@/features/validate/components/workspace/analysis/AnalysisEmptyState";
import { useAuthStore } from "@/store/authStore";
import { useGetQueries } from "@/features/validate/hooks/useGetQueries";
import ValidateIdeaListPage from "@/features/validate/components/ValidateIdeaListPage";

const PAGE_SIZE = 10;

export default function AnalysisPage() {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const authLoading = useAuthStore((state) => state.loading);

    const [page, setPage] = useState(1);

    // Firebase UID for authenticated users; null for guests.
    // The backend identifies guests using their guest session cookie.
    const userId = user?.uid ?? null;

    const {
        data,
        isLoading,
        isError,
        error,
        isPlaceholderData,
    } = useGetQueries(userId, page, PAGE_SIZE);

    // Support common paginated API response shapes.
    const response = data?.data ?? data;

    const analyses = useMemo(() => {
        const items =
            response?.items ??
            response?.queries ??
            response?.results ??
            [];

        return Array.isArray(items) ? items : [];
    }, [response]);

    const total = Number(
        response?.total ??
        response?.total_count ??
        response?.count ??
        analyses.length
    );

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    const stats = useMemo(() => {
        return {
            total: analyses.length,
            completed: analyses.filter(
                (item) => item.status?.toLowerCase() === "completed"
            ).length,
            processing: analyses.filter((item) =>
                ["created", "queued", "pending", "processing", "running"].includes(
                    item.status?.toLowerCase()
                )
            ).length,
        };
    }, [analyses]);

    const handleOpenAnalysis = (queryId, status) => {
        if (status?.toLowerCase() === "completed") {
            router.push(`/validate-idea/analysis/${queryId}/report`);
        } else {
            router.push(`/validate-idea/analysis/${queryId}`);
        }
    };

    const handleNewAnalysis = () => {
        router.push("/validate-idea");
    };

    // Avoid showing guest content while Firebase is resolving auth.
    if (authLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-violet-600 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-8 lg:px-6">
            <AnalysisHeader
                isAuthenticated={!!user}
                onNewAnalysis={handleNewAnalysis}
            />

            {user && (
                <AnalysisStats
                    total={total}
                    completed={stats.completed}
                    processing={stats.processing}
                />
            )}

            {!user && analyses.length > 0 && (
                <div className="mb-8 rounded-xl border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-900 dark:bg-violet-950/20 sm:p-5">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                            <span className="text-lg">✦</span>
                        </div>

                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                Keep your ideas and reports safe
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Create an account to claim your guest analyses
                                and access your reports whenever you return.
                            </p>

                            <button
                                onClick={() => router.push("/login")}
                                className="mt-3 text-sm font-semibold text-violet-700 hover:text-violet-800 dark:text-violet-300"
                            >
                                Sign in or create an account →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <section className="mt-8">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Recent analyses
                        </h2>

                        <p className="mt-[0.5] text-sm text-slate-500 dark:text-slate-400">
                            {user
                                ? "Your latest idea validations."
                                : "Analyses from your current guest session."}
                        </p>
                    </div>

                    {total > 0 && (
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                            {total} {total === 1 ? "analysis" : "analyses"}
                        </span>
                    )}
                </div>

                {isLoading || (isPlaceholderData && analyses.length === 0) ? (
                    <div className="grid gap-4">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-32 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
                            />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20">
                        <h3 className="font-semibold text-red-700 dark:text-red-400">
                            Couldn't load your analyses
                        </h3>

                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {error?.message || "Something went wrong. Please try again."}
                        </p>
                    </div>
                ) : analyses.length === 0 ? (
                    <AnalysisEmptyState
                        onNewAnalysis={handleNewAnalysis}
                    />
                ) : (
                    <>
                        <AnalysisList
                            analyses={analyses}
                            onOpenAnalysis={handleOpenAnalysis}
                            isPlaceholderData={isPlaceholderData}
                        />

                        {totalPages > 1 && (
                            <div className="mt-6 flex items-center justify-between">
                                <button
                                    disabled={page <= 1 || isPlaceholderData}
                                    onClick={() => setPage((current) => current - 1)}
                                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:shadow-sm"
                                >
                                    Previous
                                </button>

                                <span className="text-sm font-medium text-slate-600">
                                    Page <span className="text-slate-900">{page}</span> of{" "}
                                    <span className="text-slate-900">{totalPages}</span>
                                </span>

                                <button
                                    disabled={page >= totalPages || isPlaceholderData}
                                    onClick={() => setPage((current) => current + 1)}
                                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:shadow-sm"
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