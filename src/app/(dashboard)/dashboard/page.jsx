"use client";

import React, { useEffect } from 'react';
import {
    Search,
    TrendingUp,
    AlertCircle,
    Zap,
    Filter,
    ChevronRight,
    ArrowUpRight,
    MessageSquare
} from 'lucide-react';

// ── SHARED PRIMITIVES ─────────────────────────────────
const Box = ({ children, className = "", style = {}, onMouseEnter, onMouseLeave }) => (
    <div
        className={`rounded-xl p-7 transition-all ${className}`}
        style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border-solid)',
            ...style,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {children}
    </div>
);

const Label = ({ children }) => (
    <p
        className="text-[9px] font-black uppercase tracking-[0.18em] font-mono mb-1.5"
        style={{ color: 'var(--text-subtle)' }}
    >
        {children}
    </p>
);

const Tag = ({ children, className = "", style = {} }) => (
    <span
        className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase font-mono border ${className}`}
        style={style}
    >
        {children}
    </span>
);

// ── PAGE ─────────────────────────────────────────────
export default function DashboardPage() {

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log("📦 localStorage user:", user ? JSON.parse(user) : null);
        console.log("🔑 localStorage token:", token);
    }, []);

    return (
        <div
            className="min-h-screen font-sans"
            style={{ backgroundColor: 'var(--background)', color: 'var(--text-main)' }}
        >
            {/* ── TOPBAR ── */}
            <header
                className="sticky top-0 z-20 px-10 h-[52px] flex items-center justify-between"
                style={{
                    backgroundColor: 'var(--surface)',
                    borderBottom: '1px solid var(--border-solid)',
                }}
            >
                <div>
                    <h1 className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
                        Overview
                    </h1>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] font-mono" style={{ color: 'var(--text-subtle)' }}>
                        Engine Status: <span style={{ color: 'var(--success)' }}>Optimal</span>
                    </p>
                </div>

                {/* <div className="flex items-center gap-3"> */}
                {/* Search */}
                {/* <div className="relative hidden md:block">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
                            style={{ color: 'var(--text-subtle)' }}
                        />
                        <input
                            type="text"
                            placeholder="Search pain points..."
                            className="rounded-lg pl-9 pr-4 py-2 text-xs font-medium w-56 outline-none transition-colors"
                            style={{
                                backgroundColor: 'var(--surface-card)',
                                border: '1px solid var(--border-solid)',
                                color: 'var(--text-main)',
                            }}
                            onFocus={e => {
                                e.currentTarget.style.borderColor = 'var(--primary)';
                                e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent)';
                            }}
                            onBlur={e => {
                                e.currentTarget.style.borderColor = 'var(--border-solid)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div> */}

                {/* Avatar */}
                {/* <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                        }}
                    >
                        <span className="text-[10px] font-bold font-mono" style={{ color: '#080f14' }}>DX</span>
                    </div> */}
                {/* </div> */}
            </header>

            {/* ── CONTENT ── */}
            <div className="max-w-full mx-auto px-10 py-10 flex flex-col gap-8">

                {/* ── STAT WIDGETS ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                        {
                            label: 'Trending Problems',
                            value: '1,284',
                            icon: AlertCircle,
                            iconColor: 'var(--destructive)',
                            iconBg: 'var(--destructive-bg)',
                            iconBorder: 'color-mix(in srgb, var(--destructive) 20%, transparent)',
                        },
                        {
                            label: 'Opportunities',
                            value: '412',
                            icon: Zap,
                            iconColor: 'var(--warning)',
                            iconBg: 'var(--warning-bg)',
                            iconBorder: 'color-mix(in srgb, var(--warning) 20%, transparent)',
                        },
                        {
                            label: 'Market Highlights',
                            value: '89',
                            icon: TrendingUp,
                            iconColor: 'var(--primary)',
                            iconBg: 'var(--info-bg)',
                            iconBorder: 'color-mix(in srgb, var(--primary) 20%, transparent)',
                        },
                    ].map((widget) => (
                        <HoverBox key={widget.label} className="cursor-pointer group">
                            <div className="flex justify-between items-start mb-5">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        backgroundColor: widget.iconBg,
                                        border: `1px solid ${widget.iconBorder}`,
                                    }}
                                >
                                    <widget.icon className="w-4.5 h-4.5" style={{ color: widget.iconColor }} />
                                </div>
                                <ArrowUpRight
                                    className="w-4 h-4 transition-colors"
                                    style={{ color: 'var(--border-solid)' }}
                                />
                            </div>
                            <Label>{widget.label}</Label>
                            <p
                                className="text-3xl font-bold font-mono tracking-tight mt-1"
                                style={{ color: 'var(--text-main)' }}
                            >
                                {widget.value}
                            </p>
                        </HoverBox>
                    ))}
                </div>

                {/* ── RECENT SIGNALS ── */}
                <section className="flex flex-col gap-5">

                    {/* Section header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-base font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
                                Recent Signals
                            </h2>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                High-velocity market frustrations detected in the last 24h.
                            </p>
                        </div>
                        <FilterButton />
                    </div>

                    {/* Signal cards */}
                    <div className="flex flex-col gap-3">
                        {[
                            { title: "API Latency in Checkout", source: "Reddit", frustration: 8.9, category: "Fintech", time: "2h ago" },
                            { title: "Missing Dark Mode in Dashboard", source: "Play Store", frustration: 4.2, category: "SaaS", time: "5h ago" },
                            { title: "Inconsistent Calorie Tracking", source: "Reddit", frustration: 9.1, category: "Health", time: "8h ago" },
                        ].map((problem, i) => (
                            <SignalCard key={i} problem={problem} />
                        ))}
                    </div>

                    {/* Load more */}
                    <LoadMoreButton />
                </section>
            </div>
        </div>
    );
};

// ── SUB-COMPONENTS ────────────────────────────────────
function HoverBox({ children, className = "" }) {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            className={`rounded-xl p-7 transition-all ${className}`}
            style={{
                backgroundColor: 'var(--surface)',
                border: `1px solid ${hovered ? 'var(--primary)' : 'var(--border-solid)'}`,
                boxShadow: hovered ? 'var(--shadow)' : 'none',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {children}
        </div>
    );
};

function FilterButton() {
    const [hovered, setHovered] = React.useState(false);
    return (
        <button
            className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] font-mono px-3 py-2 rounded-lg transition-all cursor-pointer"
            style={{
                color: hovered ? 'var(--primary)' : 'var(--text-muted)',
                border: `1px solid ${hovered ? 'var(--primary)' : 'var(--border-solid)'}`,
                backgroundColor: hovered ? 'var(--info-bg)' : 'var(--surface)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Filter className="w-3 h-3" /> Filter
        </button>
    );
};

function SignalCard({ problem }) {
    const [hovered, setHovered] = React.useState(false);
    const isHigh = problem.frustration > 7;

    return (
        <div
            className="rounded-xl p-7 py-5 flex items-center justify-between gap-4 cursor-pointer transition-all"
            style={{
                backgroundColor: 'var(--surface)',
                border: `1px solid ${hovered ? 'var(--primary)' : 'var(--border-solid)'}`,
                boxShadow: hovered ? 'var(--shadow)' : 'none',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex items-center gap-5">
                {/* Icon */}
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                        backgroundColor: hovered ? 'var(--info-bg)' : 'var(--surface-card)',
                        border: `1px solid ${hovered ? 'color-mix(in srgb, var(--primary) 25%, transparent)' : 'var(--border-solid)'}`,
                        color: hovered ? 'var(--primary)' : 'var(--text-subtle)',
                    }}
                >
                    <MessageSquare className="w-4.5 h-4.5" />
                </div>

                {/* Info */}
                <div>
                    <Tag
                        style={{
                            color: 'var(--primary)',
                            borderColor: 'color-mix(in srgb, var(--primary) 25%, transparent)',
                            backgroundColor: 'var(--info-bg)',
                            marginBottom: '0.5rem',
                        }}
                    >
                        {problem.category}
                    </Tag>
                    <h4
                        className="text-sm font-bold tracking-tight leading-snug transition-colors"
                        style={{ color: hovered ? 'var(--primary)' : 'var(--text-main)' }}
                    >
                        {problem.title}
                    </h4>
                    <p className="text-xs mt-1 font-mono" style={{ color: 'var(--text-subtle)' }}>
                        Via <span className="font-bold" style={{ color: 'var(--text-muted)' }}>{problem.source}</span> · {problem.time}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6 flex-shrink-0">
                {/* Frustration score */}
                <div className="text-right">
                    <Label>Frustration</Label>
                    <div className="flex items-center gap-1.5 justify-end mt-1">
                        <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isHigh ? 'animate-pulse' : ''}`}
                            style={{ backgroundColor: isHigh ? 'var(--destructive)' : 'var(--warning)' }}
                        />
                        <span
                            className="text-xl font-bold font-mono"
                            style={{ color: isHigh ? 'var(--destructive)' : 'var(--warning)' }}
                        >
                            {problem.frustration}
                        </span>
                    </div>
                </div>

                <div className="h-8 w-px hidden sm:block" style={{ backgroundColor: 'var(--border-solid)' }} />

                <ChevronRight
                    className="w-4 h-4 transition-all"
                    style={{
                        color: hovered ? 'var(--primary)' : 'var(--border-solid)',
                        transform: hovered ? 'translateX(2px)' : 'translateX(0)',
                    }}
                />
            </div>
        </div>
    );
};

function LoadMoreButton() {
    const [hovered, setHovered] = React.useState(false);
    return (
        <button
            className="w-full py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.18em] font-mono transition-all cursor-pointer"
            style={{
                border: `1px dashed ${hovered ? 'var(--primary)' : 'var(--border-solid)'}`,
                backgroundColor: hovered ? 'var(--info-bg)' : 'var(--surface)',
                color: hovered ? 'var(--primary)' : 'var(--text-subtle)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            Load More Intelligence
        </button>
    );
};