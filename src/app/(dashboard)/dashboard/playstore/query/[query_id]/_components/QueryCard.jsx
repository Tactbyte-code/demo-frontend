"use client";
import { motion } from "framer-motion";
import { Cpu, Calendar, Hash } from "lucide-react";

function fmt(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString(undefined, {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    });
}

export function QueryCard({ query }) {
    if (!query) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex"
        >
            {/* Left Accent */}
            <div style={{ width: "3px", backgroundColor: "var(--primary)" }} />

            {/* Main Card */}
            <div
                className="flex-1 p-6 flex flex-col gap-5"
                style={{
                    backgroundColor: "var(--surface)",
                    borderTop: "1px solid var(--border-solid)",
                    borderRight: "1px solid var(--border-solid)",
                    borderBottom: "1px solid var(--border-solid)",
                    boxShadow: "var(--shadow-sm)",
                }}
            >
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 flex items-center justify-center shrink-0"
                        style={{
                            backgroundColor: "var(--surface-raised)",
                            border: "1px solid var(--border-solid)",
                        }}
                    >
                        <Cpu className="w-4 h-4" style={{ color: "var(--primary)" }} />
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                            App Analysis
                        </p>
                        <h1 className="text-base font-bold leading-tight" style={{ color: "var(--text-main)" }}>
                            {query.app_name || query.app_id}
                        </h1>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", backgroundColor: "var(--border-solid)" }} />

                {/* Meta */}
                <div className="flex flex-wrap gap-3">
                    <Meta icon={Hash} label="App ID" value={query.app_id} mono />
                    <Meta icon={Calendar} label="Created" value={fmt(query.created_at)} />
                    {query.fetched_at && <Meta icon={Calendar} label="Fetched" value={fmt(query.fetched_at)} />}
                    {query.summarized_at && <Meta icon={Calendar} label="Analyzed" value={fmt(query.summarized_at)} />}
                </div>
            </div>
        </motion.div>
    );
}

function Meta({ icon: Icon, label, value, mono = false }) {
    return (
        <div
            className="flex items-center gap-2 px-2 py-1"
            style={{
                backgroundColor: "var(--surface-raised)",
                border: "1px solid var(--border-solid)",
            }}
        >
            <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--text-subtle)" }} />
            <span className="text-[10px]" style={{ color: "var(--text-subtle)" }}>
                {label}
            </span>
            <span
                className={`text-[11px] font-semibold ${mono ? "font-mono" : ""}`}
                style={{ color: "var(--text-main)" }}
            >
                {value}
            </span>
        </div>
    );
}