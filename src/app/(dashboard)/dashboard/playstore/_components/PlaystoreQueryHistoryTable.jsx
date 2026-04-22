"use client";

import { useGetPlaystoreQueries } from "@/features/playstore/hooks/useGetPlaystoreQueries";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RedditQueryHistoryTable() {

    const [userId, setUserId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(localStorage?.getItem('user') || '{}');
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

    const handleRowClick = (query) => {
        if (query?.status === "FAILED") return;

        if (query?.status === "CLARIFYING") {
            router.push(`/dashboard/playstore/query/${query.id}/clarify`);
        } else if (query?.status === "COMPLETED") {
            router.push(`/dashboard/playstore/summary/${query.id}`);
        } else {
            router.push(`/dashboard/playstore/query/${query.id}`);
        }
    };

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
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead style={{ backgroundColor: "var(--surface-card)" }}>
                            <tr className="border-b border-border">
                                {["App ID", "Created", "Status"].map((h) => (
                                    <th key={h} className="px-6 py-4 text-[12px] font-bold uppercase tracking-wide whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y" style={{ borderColor: "var(--border-solid)" }}>
                            {isLoading && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-xs" style={{ color: "var(--text-subtle)" }}>
                                        Loading your queries...
                                    </td>
                                </tr>
                            )}

                            {!isLoading && queries?.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-xs" style={{ color: "var(--text-subtle)" }}>
                                        No queries yet. Submit your first query above.
                                    </td>
                                </tr>
                            )}

                            {isError && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-xs font-medium" style={{ color: "var(--color-error, #ef4444)" }}>
                                                Failed to load queries
                                            </span>
                                            <button
                                                onClick={() => refetch()}
                                                disabled={isFetching}
                                                className="text-xs px-3 py-1 mt-1 border rounded"
                                                style={{
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

                            {queries?.map((query) => {
                                const isDisabled = query.status === "FAILED";

                                return (
                                    <tr
                                        key={query.id}
                                        onClick={() => handleRowClick(query)}
                                        className={`transition ${isDisabled
                                                ? "cursor-not-allowed opacity-60"
                                                : "cursor-pointer hover:bg-[var(--surface-card)]"
                                            }`}
                                    >
                                        <td className="px-6 py-4 text-sm whitespace-nowrap" style={{ color: "var(--text)" }}>
                                            {query.app_id}
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap" style={{ color: "var(--text-subtle)" }}>
                                            {new Date(query.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap" style={{ color: "var(--text-subtle)" }}>
                                            {query.status}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}