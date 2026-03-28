"use client";

import { getQueries } from "@/lib/api/reddit";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RedditQueryHistoryTable() {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQueries = async () => {
        setLoading(true);
        const data = await getQueries();
        setQueries(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    return (
        <div className="w-full max-w-5xl">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-xl font-black tracking-tight" style={{ color: "var(--text-main)" }}>
                        Recent Analysis
                    </h2>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Your analysis history and status
                    </p>
                </div>
                <button
                    onClick={fetchQueries}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg border transition-colors"
                    style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border-solid)",
                        color: "var(--text-main)",
                    }}
                >
                    <RefreshCcw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                    Sync Now
                </button>
            </div>

            <div
                className="rounded-2xl border overflow-hidden"
                style={{
                    borderColor: "var(--border-solid)",
                    backgroundColor: "var(--surface)",
                    boxShadow: "var(--shadow-sm)",
                }}
            >
                <table className="w-full text-left">
                    <thead style={{ backgroundColor: "var(--surface-card)" }}>
                        <tr className="border-b" style={{ borderColor: "var(--border-solid)" }}>
                            {["Query", "Created", "Status", "Action"].map((h) => (
                                <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: "var(--border-solid)" }}>
                        {loading && queries.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-xs" style={{ color: "var(--text-subtle)" }}>
                                    Loading your queries...
                                </td>
                            </tr>
                        )}
                        {!loading && queries.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-xs" style={{ color: "var(--text-subtle)" }}>
                                    No queries yet. Submit your first query above.
                                </td>
                            </tr>
                        )}
                        {queries.map((query) => (
                            <tr key={query.id}>
                                <td className="px-6 py-4 text-sm" style={{ color: "var(--text)" }}>
                                    {query.query}
                                </td>
                                <td className="px-6 py-4 text-sm" style={{ color: "var(--text-subtle)" }}>
                                    {new Date(query.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm" style={{ color: "var(--text-subtle)" }}>
                                    {query.status}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {query.status === "CLARIFYING" ? (
                                        <Link href={`/dashboard/reddit/query/${query.id}/clarify`} className="flex items-center gap-3 no-underline group">
                                            Clarify
                                        </Link>
                                    ) : (
                                        <Link href={`/dashboard/reddit/query/${query.id}`} className="flex items-center gap-3 no-underline group">
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
    );
}