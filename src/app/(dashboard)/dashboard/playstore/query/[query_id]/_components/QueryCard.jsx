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
            className="rounded-2xl p-6 flex flex-col gap-4"
            style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border-solid)",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                            background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 15%, var(--surface)), color-mix(in srgb, var(--accent) 10%, var(--surface)))",
                            border: "1px solid var(--glass-border)",
                        }}
                    >
                        <Cpu className="w-5 h-5" style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "var(--text-subtle)" }}>
                            App Analysis
                        </p>
                        <h1 className="text-lg font-bold leading-tight" style={{ color: "var(--text-main)" }}>
                            {query.app_name || query.app_id}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                <Meta icon={Hash} label="App ID" value={query.app_id} mono />
                <Meta icon={Calendar} label="Created" value={fmt(query.created_at)} />
                {query.fetched_at && <Meta icon={Calendar} label="Fetched" value={fmt(query.fetched_at)} />}
                {query.summarized_at && <Meta icon={Calendar} label="Analyzed" value={fmt(query.summarized_at)} />}
            </div>
        </motion.div>
    );
}

function Meta({ icon: Icon, label, value, mono = false }) {
    return (
        <div className="flex items-center gap-2">
            <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--text-subtle)" }} />
            <span className="text-xs" style={{ color: "var(--text-subtle)" }}>{label}:</span>
            <span
                className={`text-xs font-semibold ${mono ? "font-mono" : ""}`}
                style={{ color: "var(--text-main)" }}
            >
                {value}
            </span>
        </div>
    );
}