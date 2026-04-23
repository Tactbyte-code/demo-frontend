"use client";

import { ArrowRight, Clock, AlertCircle, CheckCircle2, Loader2, HelpCircle, XCircle, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetQueries } from "@/features/reddit/hooks/useGetQueries";
import { useRouter } from "next/navigation";

// ── Status config ──────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    COMPLETED: {
        label: "Completed",
        icon: CheckCircle2,
        color: "var(--success)",
        bg: "var(--success-bg)",
        border: "color-mix(in srgb, var(--success) 30%, transparent)",
    },
    CLARIFYING: {
        label: "Clarifying",
        icon: HelpCircle,
        color: "var(--warning)",
        bg: "var(--warning-bg)",
        border: "color-mix(in srgb, var(--warning) 30%, transparent)",
    },
    CLARIFIED: {
        label: "Clarified",
        icon: CheckCircle2,
        color: "var(--info)",
        bg: "var(--info-bg)",
        border: "color-mix(in srgb, var(--info) 30%, transparent)",
    },
    FAILED: {
        label: "Failed",
        icon: XCircle,
        color: "var(--destructive)",
        bg: "var(--destructive-bg)",
        border: "color-mix(in srgb, var(--destructive) 30%, transparent)",
    },
    PROCESSING: {
        label: "Processing",
        icon: Loader2,
        color: "var(--primary)",
        bg: "var(--info-bg)",
        border: "color-mix(in srgb, var(--primary) 30%, transparent)",
    },
};

function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] ?? {
        label: status,
        icon: AlertCircle,
        color: "var(--text-muted)",
        bg: "var(--surface-card)",
        border: "var(--border-solid)",
    };
    const Icon = cfg.icon;
    const isSpinning = status === "PROCESSING";

    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider border"
            style={{
                color: cfg.color,
                backgroundColor: cfg.bg,
                borderColor: cfg.border,
            }}
        >
            <Icon className={`w-3 h-3 shrink-0 ${isSpinning ? "animate-spin" : ""}`} />
            {cfg.label}
        </span>
    );
}

// ── Route resolver ─────────────────────────────────────────────────────────────
const getQueryRoute = (query) => {
    if (query.status === "CLARIFYING") {
        return `/dashboard/reddit/query/${query.id}/clarify`;
    }

    if (["SEARCH_COMPLETE", "WEB_SEARCHING", "CLARIFIED", "SUMMARIZING"].includes(query.status)) {
        return `/dashboard/reddit/query/${query.id}`;
    }

    return `/dashboard/reddit/summary/${query.id}`;
};

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
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none border border-border-input"
                    disabled={page === 1} onClick={() => onPage(1)}>
                    <ChevronFirst className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none border border-border-input"
                    disabled={page === 1} onClick={() => onPage(page - 1)}>
                    <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none border border-border-input"
                    disabled={page === totalPages} onClick={() => onPage(page + 1)}>
                    <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-none border border-border-input"
                    disabled={page === totalPages} onClick={() => onPage(totalPages)}>
                    <ChevronLast className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function RedditQueryHistoryTable() {

    const [page, setPage] = useState(1);
    const router = useRouter();

    const userId = localStorage?.getItem('user')?.firebase_uid;

    const {
        data,
        isLoading,
    } = useGetQueries(userId);

    const totalPages = Math.ceil(data?.length / ROWS_PER_PAGE);
    const paginatedQueries = data?.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

    return (
        <div className="w-full max-w-5xl">
            {/* Header */}
            <div className="flex items-end justify-between mb-5 mt-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-0.75 h-5" style={{ backgroundColor: "var(--primary)" }} />
                        <h2 className="text-xl font-black tracking-tight" style={{ color: "var(--text-main)" }}>
                            Recent Analysis
                        </h2>
                    </div>
                    <p className="text-xs pl-2.75" style={{ color: "var(--text-muted)" }}>
                        Your analysis history and current status
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="border border-border overflow-hidden" style={{
                backgroundColor: "var(--surface)",
                boxShadow: "var(--shadow-sm)",
            }}>
                <Table>
                    <TableHeader style={{ backgroundColor: "var(--surface-card)" }}>
                        <TableRow className="border-b border-border hover:bg-transparent">
                            {["Query", "Created", "Status"].map((h) => (
                                <TableHead key={h} className="px-6 py-4 text-[12px] font-bold uppercase tracking-[0.15em] text-muted">
                                    {h}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading && [...Array(3)].map((_, i) => (
                            <TableRow key={i}>
                                <TableCell className="px-6 py-4"><Skeleton className="h-4 w-56" /></TableCell>
                                <TableCell className="px-6 py-4"><Skeleton className="h-4 w-20" /></TableCell>
                                <TableCell className="px-6 py-4"><Skeleton className="h-5 w-24" /></TableCell>
                            </TableRow>
                        ))}

                        {!isLoading && (!data || data.length === 0) && (
                            <tr>
                                <td colSpan={3} className="px-6 py-10 text-center text-xs" style={{ color: "var(--text-subtle)" }}>
                                    No queries yet. Submit your first query above.
                                </td>
                            </tr>
                        )}

                        {!isLoading && paginatedQueries?.map((query) => {
                            const isDisabled = query.status === "FAILED";

                            return (
                                <TableRow
                                    key={query.id}
                                    onClick={() => {
                                        if (isDisabled) return;
                                        router.push(getQueryRoute(query));
                                    }}
                                    className={`border-b transition-colors duration-75 ${isDisabled
                                        ? "cursor-not-allowed opacity-60"
                                        : "cursor-pointer hover:bg-[var(--surface-card)]"
                                        }`}
                                >
                                    <TableCell className="px-6 py-4 max-w-xs">
                                        <p className="text-sm font-medium truncate" title={query.query}>
                                            {query.query}
                                        </p>
                                    </TableCell>

                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3 opacity-50" />
                                            <span className="text-xs tabular-nums">
                                                {new Date(query.created_at).toLocaleDateString("en-IN")}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="px-6 py-4">
                                        <StatusBadge status={query.status} />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {!isLoading && data?.length > 0 && (
                <div className="flex justify-end mt-1">
                    <Pagination page={page} totalPages={totalPages} onPage={setPage} />
                </div>
            )}
        </div>
    );
}