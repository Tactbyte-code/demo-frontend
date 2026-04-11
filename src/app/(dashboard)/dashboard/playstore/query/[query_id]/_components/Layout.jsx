"use client";
import { motion } from "framer-motion";

// ─── PageShell ─────────────────────────────────────────────────────────────────
export function PageShell({ children }) {
    return (
        <div
            className="min-h-screen font-sans"
            style={{ backgroundColor: "var(--background)", color: "var(--text-main)" }}
        >
            <div className="max-w-7xl mx-auto px-15 py-12 flex flex-col gap-6">
                {children}
            </div>
        </div>
    );
}

// ─── LoadingSkeleton ───────────────────────────────────────────────────────────
export function LoadingSkeleton() {
    return (
        <div className="flex flex-col gap-4 pt-10 animate-pulse">
            {/* back button placeholder */}
            <div className="h-4 w-16 rounded-none" style={{ backgroundColor: "var(--surface)" }} />

            {/* query card */}
            <div className="rounded-none p-6 flex flex-col gap-3" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)" }}>
                <div className="h-4 w-40 rounded-none" style={{ backgroundColor: "var(--border-solid)" }} />
                <div className="h-6 w-72 rounded-none" style={{ backgroundColor: "var(--border-solid)" }} />
                <div className="h-3 w-32 rounded-none" style={{ backgroundColor: "var(--border-solid)" }} />
            </div>

            {/* pipeline skeleton */}
            <div className="rounded-none p-6 flex flex-col gap-4" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)" }}>
                <div className="h-3 w-24 rounded-none" style={{ backgroundColor: "var(--border-solid)" }} />
                <div className="h-2 w-full rounded-none" style={{ backgroundColor: "var(--border-solid)" }} />
                <div className="flex gap-3">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-8 flex-1" style={{ backgroundColor: "var(--border-solid)" }} />
                    ))}
                </div>
            </div>
        </div>
    );
}