// _components/SummaryResult.jsx
"use client"

import React, { useEffect, useState } from 'react'

// ── Config maps ───────────────────────────────────────────────────────────────
const sentimentConfig = {
    negative: { bg: 'bg-[var(--destructive-bg)]', text: 'text-[var(--destructive)]', dot: 'bg-[var(--destructive)]', label: 'Negative' },
    positive: { bg: 'bg-[var(--success-bg)]', text: 'text-[var(--success)]', dot: 'bg-[var(--success)]', label: 'Positive' },
    neutral: { bg: 'bg-[var(--surface-raised)]', text: 'text-[var(--text-muted)]', dot: 'bg-[var(--text-muted)]', label: 'Neutral' },
    mixed: { bg: 'bg-[var(--warning-bg)]', text: 'text-[var(--warning)]', dot: 'bg-[var(--warning)]', label: 'Mixed' },
}

const impactConfig = {
    financial: { bg: 'bg-[var(--destructive-bg)]', text: 'text-[var(--destructive)]' },
    Financial: { bg: 'bg-[var(--destructive-bg)]', text: 'text-[var(--destructive)]' },
    operational: { bg: 'bg-[var(--warning-bg)]', text: 'text-[var(--warning)]' },
    technical: { bg: 'bg-[var(--info-bg)]', text: 'text-[var(--info)]' },
    ux: { bg: 'bg-[var(--success-bg)]', text: 'text-[var(--success)]' },
}

const severityColor = {
    High: 'text-[var(--destructive)]',
    Medium: 'text-[var(--warning)]',
    Low: 'text-[var(--text-muted)]',
}

const confidenceConfig = {
    High: 'text-[var(--success)]',
    Medium: 'text-[var(--warning)]',
    Low: 'text-[var(--destructive)]',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// ── Atoms ─────────────────────────────────────────────────────────────────────
const SentimentBadge = ({ sentiment, small = false }) => {
    const c = sentimentConfig[sentiment?.toLowerCase()] ?? sentimentConfig.neutral
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ${small ? 'text-[10px]' : 'text-xs'} ${c.bg} ${c.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            {c.label}
        </span>
    )
}

const Pill = ({ label, muted = false }) => (
    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${muted
        ? 'border-[var(--border-solid)] text-[var(--text-muted)]'
        : 'border-[var(--primary)] bg-[var(--info-bg)] text-[var(--primary)]'
        }`}>
        {label}
    </span>
)

const SectionLabel = ({ children }) => (
    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">{children}</p>
)

const Card = ({ children, className = '' }) => (
    <div className={`rounded-xl border border-[var(--border-solid)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] ${className}`}>
        {children}
    </div>
)

// ── Pain Point Card ───────────────────────────────────────────────────────────
const PainPointCard = ({ pp }) => {
    const [expanded, setExpanded] = useState(false)
    const ic = impactConfig[pp.impact] ?? impactConfig.operational

    return (
        <div className="rounded-lg border border-[var(--border-solid)] bg-[var(--surface-card)] overflow-hidden">
            <button
                onClick={() => setExpanded(e => !e)}
                className="w-full text-left p-4 cursor-pointer hover:bg-[var(--surface-raised)] transition-colors"
            >
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="text-sm font-medium text-[var(--text-main)] flex-1">{pp.issue}</p>
                    <div className="flex shrink-0 flex-wrap gap-1.5 items-center">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${ic.bg} ${ic.text}`}>
                            {pp.impact}
                        </span>
                        {pp.severity && (
                            <span className={`text-[10px] font-medium ${severityColor[pp.severity] ?? ''}`}>
                                {pp.severity}
                            </span>
                        )}
                        <span className="text-[10px] text-[var(--text-muted)] font-mono">
                            {expanded ? '▲' : '▼'}
                        </span>
                    </div>
                </div>
                {pp.sentiment && (
                    <div className="mt-1.5">
                        <SentimentBadge sentiment={pp.sentiment} small />
                    </div>
                )}
            </button>

            {expanded && (
                <div className="px-4 pb-4 space-y-4 border-t border-[var(--border-solid)]">
                    {pp.example_quote && (
                        <div className="pt-4">
                            <SectionLabel>Example Quote</SectionLabel>
                            <div className="rounded-lg bg-[var(--surface-card)] p-3 border-l-2 border-[var(--primary)]">
                                <p className="text-xs italic leading-relaxed text-[var(--text-muted)]">"{pp.example_quote}"</p>
                            </div>
                        </div>
                    )}
                    {pp.user_suggested_solutions?.length > 0 && (
                        <div>
                            <SectionLabel>User-Suggested Solutions</SectionLabel>
                            <div className="space-y-2">
                                {pp.user_suggested_solutions.map((s, i) => (
                                    <div key={i} className="flex items-start gap-2 rounded-lg bg-[var(--surface)] border border-[var(--border-solid)] p-3">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                                        <p className="text-xs text-[var(--text-main)]">{s}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {pp.system_actions?.length > 0 && (
                        <div>
                            <SectionLabel>System Actions</SectionLabel>
                            <div className="space-y-3">
                                {pp.system_actions.map((a, i) => (
                                    <div key={i} className="rounded-lg bg-[var(--surface)] border border-[var(--border-solid)] p-3 space-y-2">
                                        <p className="text-xs font-semibold text-[var(--text-main)]">{a.action}</p>
                                        {a.how && (
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-0.5">How</p>
                                                <p className="text-xs text-[var(--text-muted)]">{a.how}</p>
                                            </div>
                                        )}
                                        {a.why && (
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-0.5">Why</p>
                                                <p className="text-xs text-[var(--text-muted)]">{a.why}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

// ── Main Component ────────────────────────────────────────────────────────────
export const SummaryResult = ({ data }) => {
    const [activeTheme, setActiveTheme] = useState(null)

    useEffect(() => {
        if (data?.themes?.length) {
            setActiveTheme(data.themes[0].id)
        }
    }, [data])

    if (!data) return null;
    console.log('reddit data: ', data);

    const theme = data.themes?.find(t => t.id === activeTheme)

    return (
        <div className="px-0 py-6 space-y-6">
            {/* ── Header ── */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                        Research Summary
                    </p>
                    <h1 className="text-2xl font-semibold leading-snug tracking-tight text-[var(--text-main)]">
                        {data.search_query}
                    </h1>
                    <p className="mt-1.5 text-xs text-[var(--text-muted)]">{data.subreddit}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <SentimentBadge sentiment={data.overall_sentiment} />
                    <p className="font-mono text-[11px] text-[var(--text-muted)]">
                        Analyzed: {formatDate(data.analyzed_at)}
                    </p>
                </div>
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                    { label: 'Total Signals', value: data.total_signals },
                    { label: 'Themes', value: data.themes?.length ?? 0 },
                    { label: 'Posts Analyzed', value: data.meta?.total_posts },
                    { label: 'Comments', value: data.meta?.total_comments },
                ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl border border-[var(--border-solid)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)]">
                        <p className="text-2xl font-semibold text-[var(--text-main)]">{value ?? '—'}</p>
                        <p className="mt-0.5 text-xs text-[var(--text-muted)]">{label}</p>
                    </div>
                ))}
            </div>

            {/* ── Executive Summary ── */}
            <Card>
                <SectionLabel>Direct Answer</SectionLabel>
                <p className="leading-6 text-[13px] text-[var(--text-main)]">{data.direct_answer}</p>
            </Card>

            <Card>
                <SectionLabel>Executive Summary</SectionLabel>
                <p className="leading-6 text-[13px] text-[var(--text-main)]">{data.executive_summary}</p>
            </Card>

            {/* ── Themes ── */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                <div className="flex shrink-0 flex-col gap-2 lg:w-64">
                    <p className="px-1 text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]">Themes</p>
                    {data.themes?.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTheme(t.id)}
                            className={`flex w-full cursor-pointer flex-col items-start rounded-xl border px-4 py-3 text-left transition-all duration-150 ${activeTheme === t.id
                                ? 'border-[var(--primary)] bg-[var(--info-bg)]'
                                : 'border-[var(--border-solid)] bg-[var(--surface)] hover:bg-[var(--surface-card)]'
                                }`}
                        >
                            <span className={`text-xs font-medium leading-snug ${activeTheme === t.id ? 'text-[var(--primary)]' : 'text-[var(--text-main)]'}`}>
                                {t.title}
                            </span>
                            <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5">
                                <span className="font-mono text-[10px] text-[var(--text-muted)]">{t.signal_count} signals</span>
                                <span className="font-mono text-[10px] text-[var(--text-muted)]">{t.relevance_score}% relevance</span>
                            </div>
                            <div className="mt-1.5">
                                <SentimentBadge sentiment={t.sentiment} small />
                            </div>
                        </button>
                    ))}
                </div>

                {theme && (
                    <div className="min-w-0 flex-1 space-y-4">
                        <Card>
                            <div className="mb-3 flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-base font-semibold text-[var(--text-main)]">{theme.title}</h2>
                                    <p className="mt-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                                        {theme.id} · {theme.signal_count} signals · {theme.relevance_score}% relevance
                                    </p>
                                </div>
                                <SentimentBadge sentiment={theme.sentiment} small />
                            </div>
                            <p className="text-sm leading-relaxed text-[var(--text-muted)]">{theme.summary}</p>
                            {theme.brands_mentioned?.length > 0 && (
                                <div className="mt-4">
                                    <SectionLabel>Brands Mentioned</SectionLabel>
                                    <div className="flex flex-wrap gap-1.5">
                                        {theme.brands_mentioned.map(b => <Pill key={b} label={b} />)}
                                    </div>
                                </div>
                            )}
                            {theme.demographic_signals?.length > 0 && (
                                <div className="mt-4">
                                    <SectionLabel>Demographic Signals</SectionLabel>
                                    <div className="flex flex-wrap gap-1.5">
                                        {theme.demographic_signals.map(d => <Pill key={d} label={d} muted />)}
                                    </div>
                                </div>
                            )}
                        </Card>

                        {theme.pain_points?.length > 0 && (
                            <Card>
                                <SectionLabel>Pain Points ({theme.pain_points.length})</SectionLabel>
                                <div className="space-y-3">
                                    {theme.pain_points.map((pp, i) => (
                                        <PainPointCard key={i} pp={pp} />
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>
                )}
            </div>

            {/* ── Actionable Next Steps ── */}
            {data?.actionable_next_steps?.length > 0 && (
                <Card>
                    <SectionLabel>Actionable Next Steps</SectionLabel>
                    <div className="space-y-3">
                        {data.actionable_next_steps.sort((a, b) => a.priority - b.priority).map((item, i) => (
                            <div key={i} className="rounded-lg border border-[var(--border-solid)] bg-[var(--surface-card)] p-4">
                                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-[10px] font-black px-2 py-0.5 rounded-full bg-[var(--info-bg)] text-[var(--primary)]">
                                            #{item.priority}
                                        </span>
                                        <p className="text-sm font-semibold text-[var(--text-main)]">{item.step}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {item.quick_win && (
                                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-[var(--success-bg)] text-[var(--success)]">
                                                Quick Win
                                            </span>
                                        )}
                                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[var(--surface-raised)] text-[var(--text-muted)]">
                                            {item.effort}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs leading-relaxed text-[var(--text-muted)] mb-3">{item.rationale}</p>
                                <div className="border-t border-[var(--border-solid)] pt-3 space-y-2">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">How</p>
                                        <p className="text-xs leading-relaxed text-[var(--text-main)]">{item.how}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">Impact</p>
                                        <p className="text-xs leading-relaxed text-[var(--text-main)]">{item.impact}</p>
                                    </div>
                                </div>
                                {item.addresses_themes?.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {item.addresses_themes.map(theme => (
                                            <span key={theme} className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-[var(--border-solid)] text-[var(--text-muted)]">
                                                {theme}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* ── Market Signals ── */}
            {data.market_signals && (
                <Card>
                    <SectionLabel>Market Signals</SectionLabel>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'Emerging Topics', items: data.market_signals.emerging_topics },
                            { label: 'Brands Mentioned', items: data.market_signals.brands_mentioned },
                            { label: 'Geographic Signals', items: data.market_signals.geographic_signals },
                            { label: 'Demographic Signals', items: data.market_signals.demographic_signals },
                        ].map(({ label, items }) => (
                            <div key={label}>
                                <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]">{label}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {items?.map(item => <Pill key={item} label={item} muted />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* ── Meta ── */}
            {data.meta && (
                <Card>
                    <SectionLabel>Meta</SectionLabel>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Model</p>
                            <p className="mt-0.5 font-mono text-sm text-[var(--text-main)]">{data.meta.model}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Confidence</p>
                            <p className={`mt-0.5 text-sm font-medium ${confidenceConfig[data.meta.confidence] ?? ''}`}>
                                {data.meta.confidence}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Date Range</p>
                            <p className="mt-0.5 font-mono text-xs text-[var(--text-main)]">{data.meta.date_range}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Total Posts</p>
                            <p className="mt-0.5 text-sm font-semibold text-[var(--text-main)]">{data.meta.total_posts}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Total Comments</p>
                            <p className="mt-0.5 text-sm font-semibold text-[var(--text-main)]">{data.meta.total_comments}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Caveats</p>
                            <p className="mt-0.5 text-xs italic leading-relaxed text-[var(--text-muted)]">{data.meta.caveats}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    )
}