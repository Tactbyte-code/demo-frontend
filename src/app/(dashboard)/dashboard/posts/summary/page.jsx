"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// ── Config maps ───────────────────────────────────────────────────────────────
const sentimentConfig = {
    negative: { bg: 'bg-[var(--destructive-bg)]', text: 'text-[var(--destructive)]', dot: 'bg-[var(--destructive)]', label: 'Negative' },
    positive: { bg: 'bg-[var(--success-bg)]', text: 'text-[var(--success)]', dot: 'bg-[var(--success)]', label: 'Positive' },
    neutral: { bg: 'bg-[var(--surface-raised)]', text: 'text-[var(--text-muted)]', dot: 'bg-[var(--text-muted)]', label: 'Neutral' },
    mixed: { bg: 'bg-[var(--warning-bg)]', text: 'text-[var(--warning)]', dot: 'bg-[var(--warning)]', label: 'Mixed' },
}

// pain_points.impact maps to severity style
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
    <p className="mb-3 text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]">{children}</p>
)

const Card = ({ children, className = '' }) => (
    <div className={`rounded-xl border border-[var(--border-solid)] bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] ${className}`}>
        {children}
    </div>
)

// ── Skeletons ─────────────────────────────────────────────────────────────────
const Skeleton = ({ className = '' }) => (
    <div className={`animate-pulse rounded bg-[var(--surface-raised)] ${className}`} />
)

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-[var(--background)] px-6 py-10 lg:px-10 space-y-6">
        <div className="space-y-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20" />)}
        </div>
        <Skeleton className="h-32 w-full" />
        <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-64">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20" />)}
            </div>
            <Skeleton className="flex-1 h-64" />
        </div>
    </div>
)

// ── Pain Point Card ───────────────────────────────────────────────────────────
const PainPointCard = ({ pp }) => {
    const [expanded, setExpanded] = useState(false)
    const ic = impactConfig[pp.impact] ?? impactConfig.operational

    return (
        <div className="rounded-lg border border-[var(--border-solid)] bg-[var(--surface-card)] overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setExpanded(e => !e)}
                className="w-full text-left p-4 cursor-pointer hover:bg-[var(--surface-raised)] transition-colors"
            >
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="text-sm font-medium text-[var(--text-main)] flex-1">{pp.issue}</p>
                    <div className="flex shrink-0 flex-wrap gap-1.5 items-center">
                        {/* Impact badge */}
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${ic.bg} ${ic.text}`}>
                            {pp.impact}
                        </span>
                        {/* Severity */}
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

                {/* Sentiment */}
                {pp.sentiment && (
                    <div className="mt-1.5">
                        <SentimentBadge sentiment={pp.sentiment} small />
                    </div>
                )}
            </button>

            {/* Expanded */}
            {expanded && (
                <div className="px-4 pb-4 space-y-4 border-t border-[var(--border-solid)]">

                    {/* Example quote — string in this schema */}
                    {pp.example_quote && (
                        <div className="pt-4">
                            <SectionLabel>Example Quote</SectionLabel>
                            <div className="rounded-lg bg-[var(--surface-card)] p-3 border-l-2 border-[var(--primary)]">
                                <p className="text-xs italic leading-relaxed text-[var(--text-muted)]">"{pp.example_quote}"</p>
                            </div>
                        </div>
                    )}

                    {/* User suggested solutions — array of strings */}
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

                    {/* System actions — action / how / why */}
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

// ── Main Page ─────────────────────────────────────────────────────────────────
const SummaryPage = () => {
    const searchParams = useSearchParams()
    const jobId = searchParams.get('jobId')

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeTheme, setActiveTheme] = useState(null)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Set first theme once data loads
    useEffect(() => {
        if (data?.themes?.length) {
            setActiveTheme(data.themes[0].id)
        }
    }, [data])

    useEffect(() => {
        if (!jobId) {
            setError('No job ID provided')
            setLoading(false)
            return
        }

        const fetchSummary = async () => {
            try {
                console.log('Fetching summary for jobId:', jobId)
                const res = await fetch(`${apiUrl}/job/${jobId}/summary`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                if (!res.ok) throw new Error(`Summarization failed (${res.status})`)
                const json = await res.json()
                console.log('Summary data:', json)
                setData(json)
            } catch (err) {
                console.error('Error fetching summary:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchSummary()
    }, [jobId])

    if (loading) return <LoadingSkeleton />

    if (error) return (
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
            <div className="rounded-xl border border-[var(--destructive)] bg-[var(--destructive-bg)] p-6 max-w-md text-center">
                <p className="text-sm font-medium text-[var(--destructive)]">Failed to load summary</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">{error}</p>
            </div>
        </div>
    )

    if (!data) return null

    const theme = data.themes?.find(t => t.id === activeTheme)

    return (
        <div className="min-h-screen bg-[var(--background)] px-6 py-10 lg:px-10">

            {/* ── Header ── */}
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                    <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                        Research Summary
                    </p>
                    <h1 className="text-2xl font-semibold leading-snug tracking-tight text-[var(--text-main)]">
                        {data.query}
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
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
            <Card className="mb-6">
                <SectionLabel>Executive Summary</SectionLabel>
                <p className="leading-relaxed text-sm text-[var(--text-main)]">{data.executive_summary}</p>
            </Card>

            {/* ── Themes ── */}
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start">

                {/* Theme nav */}
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

                {/* Theme detail */}
                {theme && (
                    <div className="min-w-0 flex-1 space-y-4">

                        {/* Overview */}
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

                        {/* Pain Points */}
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

            {/* ── Market Signals ── */}
            {data.market_signals && (
                <Card className="mb-6">
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

export default function Page() {
    return <SummaryPage />
}