"use client";

import { useGetPlaystoreQueries } from "@/features/playstore/hooks/useGetPlaystoreQueries";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

// shadcn
import { Button } from "@/components/ui/button";

// ── Pagination Config ─────────────────────────────────────────────
const ROWS_PER_PAGE = 10;

function Pagination({ page, totalPages, onPage }) {
    const [jump, setJump] = useState("");

    const handleJump = (e) => {
        if (e.key === "Enter") {
            const p = parseInt(jump);
            if (!isNaN(p) && p >= 1 && p <= totalPages) onPage(p);
            setJump("");
        }
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center gap-3 mt-4">
            <p className="text-[13px] tabular-nums" style={{ color: "var(--text-muted)" }}>
                Page <span className="font-bold" style={{ color: "var(--text-main)" }}>{page}</span> of{" "}
                <span className="font-bold" style={{ color: "var(--text-main)" }}>{totalPages}</span>
            </p>

            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-none border border-border-input"
                    disabled={page === 1}
                    onClick={() => onPage(1)}
                >
                    <ChevronFirst className="w-4 h-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-none border border-border-input"
                    disabled={page === 1}
                    onClick={() => onPage(page - 1)}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-none border border-border-input"
                    disabled={page === totalPages}
                    onClick={() => onPage(page + 1)}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-none border border-border-input"
                    disabled={page === totalPages}
                    onClick={() => onPage(totalPages)}
                >
                    <ChevronLast className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}

// ── Main Component ─────────────────────────────────────────────
export default function PlaystoreQueryHistoryTable() {
    const [userId, setUserId] = useState(null);
    const [page, setPage] = useState(1);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const user = JSON.parse(localStorage?.getItem("user") || "{}");
            setUserId(user?.firebase_uid);
        }
    }, []);

    const {
        data: queries,
        isLoading,
        isError,
        isFetching,
        refetch,
    } = useGetPlaystoreQueries(userId);

    // ── Pagination logic ─────────────────────────────────────────
    const totalPages = Math.ceil((queries?.length || 0) / ROWS_PER_PAGE);
    const paginatedQueries = queries?.slice(
        (page - 1) * ROWS_PER_PAGE,
        page * ROWS_PER_PAGE
    );

    // ── Row click ────────────────────────────────────────────────
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
        <div className="w-full max-w-5xl">
            {/* Header */}
            <div className="flex items-end justify-between mb-5 mt-4">
                <div>
                    <h2 className="text-xl font-black tracking-tight" style={{ color: "var(--text-main)" }}>
                        Recent Analysis
                    </h2>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Your analysis history and status
                    </p>
                </div>
            </div>

            {/* Table */}
            <div
                className="border border-border overflow-hidden"
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
                                    <th
                                        key={h}
                                        className="px-6 py-4 text-[12px] font-bold uppercase tracking-wide whitespace-nowrap"
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y" style={{ borderColor: "var(--border-solid)" }}>
                            {isLoading && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-xs">
                                        Loading your queries...
                                    </td>
                                </tr>
                            )}

                            {!isLoading && queries?.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-xs">
                                        No queries yet. Submit your first query above.
                                    </td>
                                </tr>
                            )}

                            {isError && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-xs text-red-500">
                                                Failed to load queries
                                            </span>
                                            <button
                                                onClick={() => refetch()}
                                                disabled={isFetching}
                                                className="text-xs px-3 py-1 border"
                                            >
                                                {isFetching ? "Retrying..." : "Try again"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}

                            {paginatedQueries?.map((query) => {
                                const isDisabled = query.status === "FAILED";

                                return (
                                    <tr
                                        key={query.id}
                                        onClick={() => handleRowClick(query)}
                                        className={`transition ${
                                            isDisabled
                                                ? "cursor-not-allowed opacity-60"
                                                : "cursor-pointer hover:bg-[var(--surface-card)]"
                                        }`}
                                    >
                                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                                            {query.app_id}
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                                            {new Date(query.created_at).toLocaleDateString("en-IN")}
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                                            {query.status}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {!isLoading && queries?.length > 0 && (
                <div className="flex justify-end mt-1">
                    <Pagination page={page} totalPages={totalPages} onPage={setPage} />
                </div>
            )}
        </div>
    );
}