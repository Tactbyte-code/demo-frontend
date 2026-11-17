"use client"

import React, { useEffect, useRef, useState } from 'react'
import { CheckCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ActionsTab } from './summary/ActionsTab';
import { SummaryExport } from "./SummaryExport";

// panel variants
const panelVariants = {
    hidden: (direction) => ({
        opacity: 0,
        x: direction > 0 ? 40 : -40,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.2 },
    },
    exit: (direction) => ({
        opacity: 0,
        x: direction > 0 ? -40 : 40,
        transition: { duration: 0.15 },
    }),
};

// ── Config maps ───────────────────────────────────────────
const sentimentConfig = {
    negative: { bg: 'bg-destructive-bg', text: 'text-destructive', dot: 'bg-destructive', label: 'Negative' },
    positive: { bg: 'bg-success-bg', text: 'text-success', dot: 'bg-success', label: 'Positive' },
    neutral: { bg: 'bg-surface-raised', text: 'text-muted', dot: 'bg-muted', label: 'Neutral' },
    mixed: { bg: 'bg-warning-bg', text: 'text-warning', dot: 'bg-warning', label: 'Mixed' },
};

const severityColor = {
    High: 'text-destructive',
    Medium: 'text-warning',
    Low: 'text-muted',
};

const confidenceColor = {
    High: 'text-success',
    Medium: 'text-warning',
    Low: 'text-destructive',
};

const impactBg = {
    financial: 'bg-destructive-bg text-destructive',
    Financial: 'bg-destructive-bg text-destructive',
    operational: 'bg-warning-bg text-warning',
    technical: 'bg-info-bg text-info',
    ux: 'bg-success-bg text-success',
};

// ── Helpers ───────────────────────────────────────────────
const fmt = (iso) => iso ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'

// ── Atoms ─────────────────────────────────────────────────
const SentimentBadge = ({ sentiment, small = false }) => {
    const c = sentimentConfig[sentiment?.toLowerCase()] ?? sentimentConfig.neutral
    return (
        <span className={`inline-flex items-center gap-1.5 border border-border px-2.5 py-1 font-medium ${small ? 'text-[10px]' : 'text-xs'} ${c.bg} ${c.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            {c.label}
        </span>
    )
};

const Pill = ({ label, muted = false }) => (
    <span className={`border px-2.5 py-0.5 text-[11px] font-medium ${muted
        ? 'border-border-solid text-muted bg-info-bg'
        : 'border-primary bg-info-bg text-primary'
        }`}>
        {label}
    </span>
);

// ── Tabs config ───────────────────────────────────────────
const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'themes', label: 'Core Issues' },
    { id: 'actions', label: 'Actions' },
    { id: 'sources', label: 'Sources' },
    { id: 'signals', label: 'Signals' },
    { id: 'meta', label: 'Meta' },
];

// ── Tab: Overview ─────────────────────────────────────────
const OverviewTab = ({ data }) => (
    <div className="space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
                { label: 'Total Signals', value: data.total_signals },
                { label: 'Themes', value: data.themes?.length ?? 0 },
                { label: 'Posts', value: data.meta?.total_posts },
                { label: 'Comments', value: data.meta?.total_comments },
            ].map(({ label, value }) => (
                <div key={label} className="border border-border-solid bg-surface p-4">
                    <p className="text-2xl font-semibold text-foreground">{value ?? '—'}</p>
                    <p className="mt-0.5 text-xs text-muted">{label}</p>
                </div>
            ))}
        </div>

        {/* Direct answer */}
        {data.direct_answer && (
            <div className="border border-border-solid bg-surface p-5">
                <p className="text-[12px] uppercase tracking-widest text-muted mb-2">Direct Answer</p>
                <p className="text-sm leading-relaxed text-foreground">{data.direct_answer}</p>
            </div>
        )}

        {/* Executive summary */}
        {data.executive_summary && (
            <div className="border border-border-solid bg-surface p-5">
                <p className="text-[12px] uppercase tracking-widest text-muted mb-2">Executive Summary</p>
                <p className="text-sm leading-relaxed text-foreground">{data.executive_summary}</p>
            </div>
        )}
    </div>
);

// pain point 
const PainPointRow = ({ pp, initialOpen = false }) => {
    const [open, setOpen] = useState(initialOpen);
    const ic = impactBg[pp.impact] ?? "bg-warning-bg text-warning";

    return (
        <div className="border-b border-border-solid last:border-0">

            {/* 🔽 HEADER */}
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full px-4 py-4 text-left transition-all hover:bg-surface-card cursor-pointer"
            >
                <div className="flex items-start gap-3">

                    {/* Chevron */}
                    <motion.div
                        animate={{ rotate: open ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 shrink-0"
                    >
                        <ChevronRight size={16} />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">

                        {/* Issue */}
                        <p className="text-sm text-foreground leading-snug mb-2">
                            {pp.issue}
                        </p>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-2">

                            {pp.severity && (
                                <span className={`text-[10px] font-semibold ${severityColor[pp.severity] ?? 'text-muted'}`}>
                                    {pp.severity}
                                </span>
                            )}

                            {pp.impact && (
                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 ${ic}`}>
                                    {pp.impact}
                                </span>
                            )}

                            {pp.sentiment && (
                                <SentimentBadge sentiment={pp.sentiment} small />
                            )}

                        </div>
                    </div>
                </div>
            </button>

            {/* 🔽 EXPANDABLE CONTENT */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 space-y-4 bg-surface-card border-t border-border-solid">

                            {/* Quote */}
                            {pp.example_quote && (
                                <div className="pt-3">
                                    <p className="text-[10px] uppercase tracking-widest text-header mb-2">
                                        Quote
                                    </p>
                                    <p className="text-xs italic text-muted leading-relaxed border-l-2 border-primary pl-3">
                                        "{pp.example_quote}"
                                    </p>
                                </div>
                            )}

                            {/* User Suggestions */}
                            {pp.user_suggested_solutions?.length > 0 && (
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-header mb-2">
                                        User Suggestions
                                    </p>
                                    <div className="space-y-2 bg-surface border border-border p-3">
                                        {pp.user_suggested_solutions.map((s, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1.5 w-1.5 bg-primary shrink-0" />
                                                <p className="text-xs text-foreground leading-relaxed">
                                                    {s}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* System Actions */}
                            {pp.system_actions?.length > 0 && (
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-header mb-2">
                                        System Actions
                                    </p>
                                    <div className="space-y-2">
                                        {pp.system_actions.map((a, i) => (
                                            <div
                                                key={i}
                                                className="border border-border-solid bg-surface p-3 space-y-1.5"
                                            >
                                                <p className="text-xs font-semibold text-foreground">
                                                    {a.action}
                                                </p>

                                                {a.how && (
                                                    <p className="text-xs text-muted leading-relaxed">
                                                        <span className="text-subtle uppercase text-[9px] tracking-widest mr-1">
                                                            How
                                                        </span>
                                                        {a.how}
                                                    </p>
                                                )}

                                                {a.why && (
                                                    <p className="text-xs text-muted leading-relaxed">
                                                        <span className="text-subtle uppercase text-[9px] tracking-widest mr-1">
                                                            Why
                                                        </span>
                                                        {a.why}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ── Tab: Themes ───────────────────────────────────────────
/* Circular progress ring for relevance score */
const RelevanceRing = ({ score, size = 36, strokeWidth = 3, className = '' }) => {
    const radius = (size - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`} style={{ width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                {/* Track */}
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-border-solid"
                />
                {/* Fill */}
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="text-primary transition-all duration-500"
                />
            </svg>
            {/* Label */}
            <span
                className="absolute font-mono font-semibold text-primary"
                style={{ fontSize: size * 0.24 }}
            >
                {score}
            </span>
        </div>
    );
};

/* Inline bar progress for relevance score — compact variant for sidebar */
const RelevanceBar = ({ score, className = '' }) => (
    <div className={`flex items-center gap-1.5 w-full ${className}`}>
        <div className="relative flex-1 h-1 bg-border-solid rounded-full overflow-hidden">
            <div
                className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500"
                style={{ width: `${score}%` }}
            />
        </div>
        <span className="font-mono text-[10px] font-semibold text-primary shrink-0 w-7 text-right">
            {score}%
        </span>
    </div>
);

/* Labelled bar for detail panel — wider, taller, with header label */
const RelevanceBarDetail = ({ score, className = '' }) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-subtle">Relevance</span>
            <span className="font-mono text-xs font-semibold text-primary">{score}%</span>
        </div>
        <div className="relative w-full h-1.5 bg-border-solid rounded-full overflow-hidden">
            <div
                className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500"
                style={{ width: `${score}%` }}
            />
        </div>
    </div>
);

const ThemesTab = ({ data }) => {
    console.log('core issues: ', data);

    const [activeTheme, setActiveTheme] = useState(data.themes?.[0]?.id ?? null);
    const [expandedPainPoints, setExpandedPainPoints] = useState({ 0: true });
    const theme = data.themes?.find(t => t.id === activeTheme);

    const togglePainPoint = (i) => {
        setExpandedPainPoints(prev => ({ ...prev, [i]: !prev[i] }));
    };

    return (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

            {/* ── Sidebar ── */}
            <div className="flex shrink-0 gap-2 overflow-x-auto pb-2 lg:flex-col lg:w-56 lg:overflow-visible lg:pb-0">
                {data.themes?.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTheme(t.id)}
                        className={`
                            flex flex-col items-start px-3 py-2.5 text-left transition-all shrink-0
                            w-[180px] lg:w-full cursor-pointer border-l-2
                            ${activeTheme === t.id
                                ? 'border-l-primary bg-info-bg border border-border-solid shadow-sm'
                                : 'border-l-transparent border border-border-solid bg-surface hover:bg-surface-card'
                            }
                        `}
                    >
                        {/* Title */}
                        <span className={`text-xs font-medium leading-snug w-full ${activeTheme === t.id ? 'text-primary' : 'text-foreground'}`}>
                            {t.title}
                        </span>

                        {/* Relevance bar — spans full width under title */}
                        <RelevanceBar score={t.relevance_score} className="mt-2" />

                        {/* Bottom row: sentiment left, signal count right */}
                        <div className="flex items-center justify-between w-full mt-2 gap-2">
                            <SentimentBadge sentiment={t.sentiment} small />
                            <span className="font-mono text-[10px] text-subtle shrink-0">{t.signal_count} signals</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* ── Detail Panel ── */}
            {theme && (
                <div className="min-w-0 flex-1 space-y-3 animate-in fade-in slide-in-from-right-2 duration-300">

                    {/* ── System Analysis Card ── */}
                    <div className="border border-border-solid bg-surface">

                        {/* Card header with system label */}
                        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-solid bg-surface-raised/40">
                            {/* Square icon = system/machine generated */}
                            <span className="inline-block w-2 h-2 rounded-[2px] bg-primary/40 shrink-0" />
                            <p className="text-[10px] uppercase tracking-widest text-subtle font-medium">
                                System Analysis
                            </p>
                        </div>

                        <div className="p-4 md:p-5">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <h2 className="text-sm md:text-base font-semibold text-foreground">{theme.title}</h2>
                                        <div className="shrink-0 self-start">
                                            <SentimentBadge sentiment={theme.sentiment} small />
                                        </div>
                                    </div>
                                    <p className="font-mono text-[10px] text-subtle mt-1 mb-3">
                                        {theme.signal_count} signals
                                    </p>
                                    <RelevanceBarDetail score={theme.relevance_score} />
                                </div>
                            </div>

                            <p className="text-sm leading-relaxed text-muted">{theme.summary}</p>

                            {/* Metadata Grid */}
                            {(theme.brands_mentioned?.length > 0 || theme.demographic_signals?.length > 0) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-4 border-t border-border-solid">
                                    {theme.brands_mentioned?.length > 0 && (
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-subtle mb-2">Brands</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {theme.brands_mentioned.map((b, index) => <Pill key={index} label={b} />)}
                                            </div>
                                        </div>
                                    )}
                                    {theme.demographic_signals?.length > 0 && (
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-subtle mb-2">Demographics</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {theme.demographic_signals.map(d => <Pill key={d} label={d} muted />)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Pain Points (System-generated) ── */}
                    {theme.pain_points?.length > 0 && (
                        <div className="border border-border-solid bg-surface overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-solid bg-surface-raised/40">
                                {/* Square icon = system/machine generated */}
                                <span className="inline-block w-2 h-2 rounded-[2px] bg-primary/40 shrink-0" />
                                <p className="text-[10px] uppercase tracking-widest text-subtle font-medium">
                                    Pain Points
                                    <span className="ml-1.5 text-subtle/60">({theme.pain_points.length})</span>
                                </p>
                            </div>
                            <div className="divide-y divide-border-solid">
                                {theme.pain_points.map((pp, i) => (
                                    <PainPointRow
                                        key={i}
                                        pp={pp}
                                        initialOpen={i === 0}
                                        isOpen={!!expandedPainPoints[i]}
                                        onToggle={() => togglePainPoint(i)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── User Signals (visually distinct from system analysis) ── */}
                    {theme.user_signals?.length > 0 && (
                        <div className="border border-border-solid bg-surface overflow-hidden">

                            {/* Header — circle icon to contrast with system's square */}
                            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border-solid bg-info-bg/30">
                                <span className="inline-block w-2 h-2 rounded-full bg-primary/60 shrink-0" />
                                <p className="text-[10px] uppercase tracking-widest text-primary/70 font-medium">
                                    User Signals
                                    <span className="ml-1.5 text-primary/40">({theme.user_signals.length})</span>
                                </p>
                            </div>

                            <div className="divide-y divide-border-solid">
                                {theme.user_signals.map((signal, i) => (
                                    <div key={i} className="flex gap-3 px-4 py-3 hover:bg-surface-card transition-colors">

                                        {/* Left accent bar — the primary signal that this is a human voice */}
                                        <div className="w-0.5 rounded-full bg-primary/30 shrink-0 self-stretch min-h-[2rem]" />

                                        <div className="min-w-0 flex-1">
                                            {/* Quoted user text — italic to signal "verbatim human voice" */}
                                            <p className="text-sm italic text-muted leading-relaxed">
                                                "{signal.text}"
                                            </p>

                                            {/* Footer: source attribution + tags */}
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                                                {signal.source && (
                                                    <span className="font-mono text-[10px] text-subtle">
                                                        {signal.source}
                                                    </span>
                                                )}
                                                {signal.author && (
                                                    <span className="font-mono text-[10px] text-subtle">
                                                        — {signal.author}
                                                    </span>
                                                )}
                                                {signal.tags?.map((tag, ti) => (
                                                    <span
                                                        key={ti}
                                                        className="text-[10px] px-1.5 py-0.5 bg-info-bg text-primary font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

// ── Tab: Signals ──────────────────────────────────────────
const SignalsTab = ({ data }) => {
    const ms = data.market_signals
    if (!ms) return <p className="text-sm text-muted py-8 text-center">No signals found.</p>

    const sections = [
        { label: 'Emerging Topics', items: ms.emerging_topics },
        { label: 'Brands Mentioned', items: ms.brands_mentioned },
        { label: 'Geographic Signals', items: ms.geographic_signals },
        { label: 'Demographic Signals', items: ms.demographic_signals },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sections.map(({ label, items }) => (
                <div key={label} className="border border-border-solid bg-surface p-4">
                    <p className="text-[10px] uppercase tracking-widest text-muted mb-3">{label}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {items?.length
                            ? items.map(item => <Pill key={item} label={item} muted />)
                            : <span className="text-xs text-subtle">—</span>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
};

// ── Tab: Meta ─────────────────────────────────────────────
const MetaTab = ({ data }) => {
    const meta = data.meta
    if (!meta) return <p className="text-sm text-muted py-8 text-center">No metadata found.</p>

    const rows = [
        { label: 'Model', value: meta.model, mono: true },
        { label: 'Confidence', value: meta.confidence, color: confidenceColor[meta.confidence] },
        { label: 'Date Range', value: meta.date_range, mono: true },
        { label: 'Total Posts', value: meta.total_posts },
        { label: 'Total Comments', value: meta.total_comments },
        { label: 'Subreddit Rank', value: meta.subreddit_rank != null ? `#${meta.subreddit_rank}` : null },
        { label: 'Caveats', value: meta.caveats, italic: true },
    ]

    return (
        <div className="border border-border-solid bg-surface overflow-hidden">
            {rows.filter(r => r.value != null).map(({ label, value, mono, color, italic }, i) => (
                <div key={label} className={`flex items-start gap-4 px-5 py-3.5 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-card'}`}>
                    <p className="text-[10px] uppercase tracking-widest text-subtle w-36 shrink-0 pt-0.5">{label}</p>
                    <p className={`text-sm flex-1 ${mono ? 'font-mono' : ''} ${color ?? 'text-foreground'} ${italic ? 'italic text-muted' : ''}`}>
                        {value}
                    </p>
                </div>
            ))}
        </div>
    )
};

// ── Tab: Sources ──────────────────────────────────────────
const SourcesTab = ({ sources = [], approvedCount = 0, maxApproved = 10, onToggle }) => {

    if (!sources.length) return (
        <p className="text-sm text-muted py-8 text-center">No sources found.</p>
    );

    return (
        <div className="space-y-3">
            {/* Header meta */}
            <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-widest text-subtle">
                    Total: {sources.length} posts
                </p>
                {approvedCount > 0 && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-info-bg text-primary">
                        {approvedCount}/{maxApproved} selected
                        {/* 10/{maxApproved} selected */}
                    </span>
                )}
            </div>

            {/* Source cards */}
            <div className="flex flex-col gap-3">
                {sources.map((source, i) => {
                    const selected = !!source.user_approved
                    const atMax = approvedCount >= maxApproved && !selected

                    return (
                        <button
                            key={source.id ?? i}
                            onClick={() => !atMax && onToggle?.(source.id)}
                            disabled={atMax}
                            className={`w-full text-left border p-4 transition-all ${selected
                                ? 'border-border bg-info-bg'
                                : atMax
                                    ? 'border-border-solid bg-surface opacity-40 cursor-not-allowed'
                                    : 'border-border-solid bg-surface hover:bg-surface-card cursor-pointer'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-3 mb-1.5">
                                <p className={`text-sm font-medium leading-snug ${selected ? 'text-primary' : 'text-foreground'
                                    }`}>
                                    {source.title}
                                </p>

                                {selected && (
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                {source.subreddit && (
                                    <span className="text-[10px] font-mono text-subtle">r/{source.subreddit}</span>
                                )}
                                {source.score != null && (
                                    <span className="text-[10px] font-mono text-subtle">↑ {source.score}</span>
                                )}
                                {source.num_comments != null && (
                                    <span className="text-[10px] font-mono text-subtle">{source.num_comments} comments</span>
                                )}
                                {source.created_utc && (
                                    <span className="text-[10px] font-mono text-subtle">
                                        {fmt(source.created_utc * 1000)}
                                    </span>
                                )}
                            </div>

                            {/* URL */}
                            {source.url && (
                                <a
                                    href={selected ? source.url : undefined}
                                    target={selected ? "_blank" : undefined}
                                    rel={selected ? "noopener noreferrer" : undefined}
                                    onClick={(e) => {
                                        if (!selected) {
                                            e.preventDefault();
                                            return;
                                        }
                                        e.stopPropagation();
                                    }}
                                    className={`block mt-2 text-xs truncate ${selected
                                        ? "text-blue-500 underline cursor-pointer"
                                        : "text-gray-400 cursor-not-allowed no-underline"
                                        }`}
                                >
                                    {source.url}
                                </a>
                            )}

                            {source.selftext && (
                                <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-2">
                                    {source.selftext}
                                </p>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
};

// ── Main Component ────────────────────────────────────────
export const SummaryResult = ({ data, sources = [], approvedCount = 0, maxApproved = 10, onToggleSource = null }) => {
    // console.log('summary data: ', data);
    console.log('sources: ', sources);

    const tabContainerRef = useRef(null);
    const tabRefs = useRef({});

    const [activeTab, setActiveTab] = useState('overview');
    const [direction, setDirection] = useState(0);

    if (!data) return null;

    useEffect(() => {
        const activeEl = tabRefs.current[activeTab];
        const container = tabContainerRef.current;

        if (activeEl && container) {
            const elLeft = activeEl.offsetLeft;
            const elWidth = activeEl.offsetWidth;
            const containerWidth = container.offsetWidth;

            container.scrollTo({
                left: elLeft - containerWidth / 2 + elWidth / 2,
                behavior: "smooth",
            });
        }
    }, [activeTab]);

    const painPointCount = data?.themes?.reduce((acc, t) => acc + (t.pain_points?.length ?? 0), 0) ?? 0;

    const handleSwipe = (e, info) => {
        const threshold = 50;
        const currentIndex = TABS.findIndex(t => t.id === activeTab);

        if (info.offset.x < -threshold && currentIndex < TABS.length - 1) {
            setDirection(1);
            setActiveTab(TABS[currentIndex + 1].id);
        }

        if (info.offset.x > threshold && currentIndex > 0) {
            setDirection(-1);
            setActiveTab(TABS[currentIndex - 1].id);
        }
    };

    return (
        <div className="py-4 space-y-4">
            {/* ── Header ── */}
            <div className='mb-4'>
                <SummaryExport  data={data} />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-subtle mb-1">
                        {data.subreddit}
                    </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <SentimentBadge sentiment={data.overall_sentiment} />
                    <p className="font-mono text-[11px] text-subtle">{fmt(data.analyzed_at)}</p>
                </div>
            </div>

            {/* ── Tab bar ── */}
            <div ref={tabContainerRef} className="flex overflow-x-auto md:overflow-hidden border border-border-solid bg-surface-raised">
                {TABS.map((tab, i) => {
                    const count =
                        tab.id === "themes" ? (data.themes?.length ?? 0)
                            : tab.id === "actions" ? (data.actionable_next_steps?.length ?? 0)
                                : tab.id === "sources" ? (sources?.length ?? 0)
                                    : null;

                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            ref={(el) => (tabRefs.current[tab.id] = el)}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                relative
                                flex items-center justify-center gap-1.5
                                
                                shrink-0 px-5 py-2.5 text-[12px]
                                
                                md:flex-1 md:shrink md:px-0 md:py-3
                                
                                whitespace-nowrap
                                transition-colors duration-200
                                cursor-pointer
                                
                                ${isActive
                                    ? "text-primary font-medium"
                                    : "text-foreground hover:text-foreground"
                                }
                                
                                ${i < TABS.length - 1
                                    ? "border-r border-border-solid"
                                    : ""
                                }
                            `}
                        >
                            {/* Active bottom indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="tab-indicator"
                                    className="absolute inset-0 border-b-2 border-secondary"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <div className="relative z-10 flex items-center gap-1.5">
                                <span>{tab.label}</span>

                                {count != null && count > 0 && (
                                    <span className={`
                            text-[9px] font-bold px-1.5 py-0.5 rounded-full font-mono
                            ${isActive
                                            ? "bg-primary text-light"
                                            : "bg-accent text-light"
                                        }
                        `}>
                                        {count}
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* ── Tab content ── */}
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleSwipe}
                className="touch-pan-y"
            >
                <AnimatePresence mode="wait">

                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            variants={panelVariants}
                            custom={direction}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <OverviewTab data={data} />
                        </motion.div>
                    )}

                    {activeTab === 'themes' && (
                        <motion.div
                            key="themes"
                            variants={panelVariants}
                            custom={direction}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <ThemesTab data={data} />
                        </motion.div>
                    )}

                    {activeTab === 'actions' && (
                        <motion.div
                            key="actions"
                            variants={panelVariants}
                            custom={direction}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <ActionsTab
                                data={data}
                                onReachEndSwipe={() => handleSwipe(null, { offset: { x: -100 } })}
                                onReachStartSwipe={() => handleSwipe(null, { offset: { x: 100 } })}
                            />
                        </motion.div>
                    )}

                    {activeTab === 'signals' && (
                        <motion.div
                            key="signals"
                            variants={panelVariants}
                            custom={direction}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <SignalsTab data={data} />
                        </motion.div>
                    )}

                    {activeTab === 'meta' && (
                        <motion.div
                            key="meta"
                            variants={panelVariants}
                            custom={direction}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <MetaTab data={data} />
                        </motion.div>
                    )}

                    {activeTab === 'sources' && (
                        <motion.div
                            key="sources"
                            variants={panelVariants}
                            custom={direction}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <SourcesTab
                                sources={sources}
                                approvedCount={approvedCount}
                                maxApproved={maxApproved}
                                onToggle={onToggleSource}
                            />
                        </motion.div>
                    )}

                </AnimatePresence>
            </motion.div>
        </div>
    )
};