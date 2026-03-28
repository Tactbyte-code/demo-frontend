"use client"

import React, { useState } from 'react'
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ${small ? 'text-[10px]' : 'text-xs'} ${c.bg} ${c.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            {c.label}
        </span>
    )
};

const Pill = ({ label, muted = false }) => (
    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${muted
        ? 'border-border-solid text-muted'
        : 'border-primary bg-info-bg text-primary'
        }`}>
        {label}
    </span>
);

// ── Tabs config ───────────────────────────────────────────
const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'themes', label: 'Themes' },
    // { id: 'painpoints', label: 'Pain Points' },
    { id: 'actions', label: 'Next Steps' },
    { id: 'signals', label: 'Signals' },
    { id: 'meta', label: 'Meta' },
];

const PainPointRow = ({ pp }) => {
    const [open, setOpen] = useState(false);
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
                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${ic}`}>
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
                                    <p className="text-[10px] uppercase tracking-widest text-subtle mb-2">
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
                                    <p className="text-[10px] uppercase tracking-widest text-subtle mb-2">
                                        User Suggestions
                                    </p>
                                    <div className="space-y-2">
                                        {pp.user_suggested_solutions.map((s, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
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
                                    <p className="text-[10px] uppercase tracking-widest text-subtle mb-2">
                                        System Actions
                                    </p>
                                    <div className="space-y-2">
                                        {pp.system_actions.map((a, i) => (
                                            <div
                                                key={i}
                                                className="rounded-lg border border-border-solid bg-surface p-3 space-y-1.5"
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
                <div key={label} className="rounded-xl border border-border-solid bg-surface p-4">
                    <p className="text-2xl font-semibold text-foreground">{value ?? '—'}</p>
                    <p className="mt-0.5 text-xs text-muted">{label}</p>
                </div>
            ))}
        </div>

        {/* Direct answer */}
        {data.direct_answer && (
            <div className="rounded-xl border border-border-solid bg-surface p-5">
                <p className="text-[10px] uppercase tracking-widest text-subtle mb-2">Direct Answer</p>
                <p className="text-sm leading-relaxed text-foreground">{data.direct_answer}</p>
            </div>
        )}

        {/* Executive summary */}
        {data.executive_summary && (
            <div className="rounded-xl border border-border-solid bg-surface p-5">
                <p className="text-[10px] uppercase tracking-widest text-subtle mb-2">Executive Summary</p>
                <p className="text-sm leading-relaxed text-foreground">{data.executive_summary}</p>
            </div>
        )}
    </div>
)

// ── Tab: Themes ───────────────────────────────────────────
const ThemesTab = ({ data }) => {
    const [activeTheme, setActiveTheme] = useState(data.themes?.[0]?.id ?? null)
    const theme = data.themes?.find(t => t.id === activeTheme)

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
            {/* Theme list */}
            <div className="flex shrink-0 flex-col gap-1 lg:w-60">
                {data.themes?.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTheme(t.id)}
                        className={`flex w-full cursor-pointer flex-col items-start rounded-lg border px-3 py-2.5 text-left transition-all ${activeTheme === t.id
                            ? 'border-primary bg-info-bg'
                            : 'border-border-solid bg-surface hover:bg-surface-card'
                            }`}
                    >
                        <span className={`text-xs font-medium leading-snug ${activeTheme === t.id ? 'text-primary' : 'text-foreground'}`}>
                            {t.title}
                        </span>
                        <div className="mt-1 flex flex-wrap gap-x-2">
                            <span className="font-mono text-[10px] text-subtle">{t.signal_count} signals</span>
                            <span className="font-mono text-[10px] text-subtle">{t.relevance_score}%</span>
                        </div>
                        <div className="mt-1.5">
                            <SentimentBadge sentiment={t.sentiment} small />
                        </div>
                    </button>
                ))}
            </div>

            {/* Theme detail */}
            {theme && (
                <div className="min-w-0 flex-1 space-y-4">
                    <div className="rounded-xl border border-border-solid bg-surface p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                                <h2 className="text-sm font-semibold text-foreground">{theme.title}</h2>
                                <p className="font-mono text-[10px] text-subtle mt-0.5">
                                    {theme.signal_count} signals · {theme.relevance_score}% relevance
                                </p>
                            </div>
                            <SentimentBadge sentiment={theme.sentiment} small />
                        </div>
                        <p className="text-sm leading-relaxed text-muted">{theme.summary}</p>

                        {theme.brands_mentioned?.length > 0 && (
                            <div className="mt-4">
                                <p className="text-[10px] uppercase tracking-widest text-subtle mb-2">Brands</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {theme.brands_mentioned.map(b => <Pill key={b} label={b} />)}
                                </div>
                            </div>
                        )}
                        {theme.demographic_signals?.length > 0 && (
                            <div className="mt-3">
                                <p className="text-[10px] uppercase tracking-widest text-subtle mb-2">Demographics</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {theme.demographic_signals.map(d => <Pill key={d} label={d} muted />)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pain points for this theme */}
                    {theme.pain_points?.length > 0 && (
                        <div className="rounded-xl border border-border-solid bg-surface overflow-hidden">
                            <div className="px-4 py-3 border-b border-border-solid">
                                <p className="text-[10px] uppercase tracking-widest text-subtle">
                                    Pain Points ({theme.pain_points.length})
                                </p>
                            </div>
                            {theme.pain_points.map((pp, i) => <PainPointRow key={i} pp={pp} />)}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

// ── Tab: All Pain Points ──────────────────────────────────
const PainPointsTab = ({ data }) => {
    const allPainPoints = data.themes?.flatMap(t =>
        (t.pain_points ?? []).map(pp => ({ ...pp, _theme: t.title }))
    ) ?? []

    if (!allPainPoints.length) return (
        <p className="text-sm text-muted py-8 text-center">No pain points found.</p>
    )

    return (
        <div className="rounded-xl border border-border-solid bg-surface overflow-hidden">
            {allPainPoints.map((pp, i) => (
                <div key={i}>
                    {/* Theme label */}
                    <div className="px-4 pt-3 pb-1">
                        <span className="text-[9px] uppercase tracking-widest text-subtle font-mono">{pp._theme}</span>
                    </div>
                    <PainPointRow pp={pp} />
                </div>
            ))}
        </div>
    )
}

// ── Tab: Actions ──────────────────────────────────────────
const ActionsTab = ({ data }) => {
    const steps = [...(data.actionable_next_steps ?? [])].sort((a, b) => a.priority - b.priority)

    if (!steps.length) return (
        <p className="text-sm text-muted py-8 text-center">No actions found.</p>
    )

    return (
        <div className="space-y-3">
            {steps.map((item, i) => (
                <div key={i} className="rounded-xl border border-border-solid bg-surface p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-black px-2 py-0.5 rounded-full bg-info-bg text-primary">
                                #{item.priority}
                            </span>
                            <p className="text-sm font-semibold text-foreground">{item.step}</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {item.quick_win && (
                                <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-success-bg text-success">
                                    Quick Win
                                </span>
                            )}
                            <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-surface-raised text-muted">
                                {item.effort}
                            </span>
                        </div>
                    </div>

                    <p className="text-xs text-muted leading-relaxed mb-3">{item.rationale}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border-solid pt-3">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-subtle mb-1">How</p>
                            <p className="text-xs text-foreground leading-relaxed">{item.how}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-subtle mb-1">Impact</p>
                            <p className="text-xs text-foreground leading-relaxed">{item.impact}</p>
                        </div>
                    </div>

                    {item.addresses_themes?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.addresses_themes.map(t => (
                                <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-border-solid text-muted">
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

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
                <div key={label} className="rounded-xl border border-border-solid bg-surface p-4">
                    <p className="text-[10px] uppercase tracking-widest text-subtle mb-3">{label}</p>
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
}

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
        <div className="rounded-xl border border-border-solid bg-surface overflow-hidden">
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
}

// ── Main Component ────────────────────────────────────────
export const SummaryResult = ({ data }) => {
    const [activeTab, setActiveTab] = useState('overview')

    if (!data) return null

    const painPointCount = data.themes?.reduce((acc, t) => acc + (t.pain_points?.length ?? 0), 0) ?? 0

    return (
        <div className="py-4 space-y-4">

            {/* ── Header ── */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-subtle mb-1">
                        {data.subreddit}
                    </p>
                    <h1 className="text-lg font-semibold text-foreground leading-snug">
                        {data.search_query}
                    </h1>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <SentimentBadge sentiment={data.overall_sentiment} />
                    <p className="font-mono text-[11px] text-subtle">{fmt(data.analyzed_at)}</p>
                </div>
            </div>

            {/* ── Tab bar ── */}
            <div className="flex items-center gap-0.5 border-b border-border-solid">
                {TABS.map(tab => {
                    const count = tab.id === 'painpoints' ? painPointCount
                        : tab.id === 'themes' ? (data.themes?.length ?? 0)
                            : tab.id === 'actions' ? (data.actionable_next_steps?.length ?? 0)
                                : null

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === tab.id
                                ? 'text-primary'
                                : 'text-muted hover:text-foreground'
                                }`}
                        >
                            {tab.label}
                            {count != null && count > 0 && (
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full font-mono ${activeTab === tab.id ? 'bg-info-bg text-primary' : 'bg-surface-raised text-subtle'
                                    }`}>
                                    {count}
                                </span>
                            )}
                            {/* Active indicator */}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* ── Tab content ── */}
            <div>
                {activeTab === 'overview' && <OverviewTab data={data} />}
                {activeTab === 'themes' && <ThemesTab data={data} />}
                {/* {activeTab === 'painpoints' && <PainPointsTab data={data} />} */}
                {activeTab === 'actions' && <ActionsTab data={data} />}
                {activeTab === 'signals' && <SignalsTab data={data} />}
                {activeTab === 'meta' && <MetaTab data={data} />}
            </div>
        </div>
    )
};