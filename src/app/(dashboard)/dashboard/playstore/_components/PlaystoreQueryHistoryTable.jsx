"use client";

import { useGetPlaystoreQueries } from "@/features/playstore/hooks/useGetPlaystoreQueries";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RedditQueryHistoryTable() {
    const [userId, setUserId] = useState(null);

    // Safely access localStorage after mount to prevent hydration mismatch
    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setUserId(user?.firebase_uid);
        }
    }, []);

    const {
        data: queries,
        isLoading,
        isError,
        isFetching,
        refetch
    } = useGetPlaystoreQueries(userId);

    return (
        <div className="w-full px-4">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-xl font-black tracking-tight" style={{ color: "var(--text-main)" }}>
                        Recent Analysis
                    </h2>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Your analysis history and status
                    </p>
                </div>
            </div>

            <div
                className="border border-border rounded-lg overflow-hidden"
                style={{
                    backgroundColor: "var(--surface)",
                    boxShadow: "var(--shadow-sm)",
                }}
            >
                {/* The wrapper below is the key. 
                    - 'overflow-x-auto' enables the scrollbar when the table is wider than the screen.
                    - 'whitespace-nowrap' ensures text doesn't wrap awkwardly in small cells.
                */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead style={{ backgroundColor: "var(--surface-card)" }}>
                            <tr className="border-b border-border">
                                {["App ID", "Created", "Status", "Action"].map((h) => (
                                    <th key={h} className="px-6 py-4 text-[12px] font-bold uppercase tracking-wide whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: "var(--border-solid)" }}>
                            {(isLoading || isFetching) && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-xs" style={{ color: "var(--text-subtle)" }}>
                                        Loading your queries...
                                    </td>
                                </tr>
                            )}
                            {!isLoading && queries?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-xs" style={{ color: "var(--text-subtle)" }}>
                                        No queries yet. Submit your first query above.
                                    </td>
                                </tr>
                            )}
                            {isError && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-error, #ef4444)" }}>
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="12" y1="8" x2="12" y2="12" />
                                                <line x1="12" y1="16" x2="12.01" y2="16" />
                                            </svg>
                                            <span className="text-xs font-medium" style={{ color: "var(--color-error, #ef4444)" }}>
                                                Failed to load queries
                                            </span>
                                            <button
                                                onClick={() => refetch()}
                                                disabled={isFetching}
                                                className="text-xs px-3 py-1 mt-1 border rounded"
                                                style={{
                                                    color: "var(--text-main)",
                                                    borderColor: "var(--border-solid)",
                                                    backgroundColor: "var(--surface-card)",
                                                    cursor: isFetching ? "not-allowed" : "pointer",
                                                    opacity: isFetching ? 0.5 : 1
                                                }}
                                            >
                                                {isFetching ? "Retrying..." : "Try again"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {queries?.map((query) => (
                                <tr key={query.id}>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap" style={{ color: "var(--text)" }}>
                                        {query.app_id}
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap" style={{ color: "var(--text-subtle)" }}>
                                        {new Date(query.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap" style={{ color: "var(--text-subtle)" }}>
                                        {query.status}
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                                        {query.status === "CLARIFYING" ? (
                                            <Link href={`/dashboard/playstore/query/${query.id}/clarify`} className="flex items-center gap-3 no-underline group font-bold">
                                                Clarify
                                            </Link>
                                        ) : (
                                            <Link href={`/dashboard/playstore/query/${query.id}`} className="flex items-center gap-3 no-underline group font-bold">
                                                Detail
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}