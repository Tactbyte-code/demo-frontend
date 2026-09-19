"use client"

import React, { useState, useMemo, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getSummary } from "@/features/validate/api/validate.api"

// Score → conviction tier, mapped onto your existing status palette
// (success/warning/destructive) rather than inventing new colors.
const CONVICTION = {
    high: { color: 'var(--success)', tint: 'var(--success-bg)', label: 'High conviction' },
    mid: { color: 'var(--warning)', tint: 'var(--warning-bg)', label: 'Moderate conviction' },
    low: { color: 'var(--destructive)', tint: 'var(--destructive-bg)', label: 'Low conviction' },
    none: { color: 'var(--text-subtle)', tint: 'var(--surface-raised)', label: 'Not yet scored' },
}

const getConviction = (score) => {
    if (typeof score !== 'number') return CONVICTION.none
    if (score >= 70) return CONVICTION.high
    if (score >= 40) return CONVICTION.mid
    return CONVICTION.low
}

// Same tier language reused for threat levels and signal strength — one
// consistent color vocabulary across the whole report.
const getTierColor = (level) => {
    const normalized = String(level || '').toLowerCase()
    if (['high', 'critical', 'severe'].includes(normalized)) return { color: 'var(--destructive)', tint: 'var(--destructive-bg)' }
    if (['medium', 'moderate'].includes(normalized)) return { color: 'var(--warning)', tint: 'var(--warning-bg)' }
    if (['low', 'minor'].includes(normalized)) return { color: 'var(--success)', tint: 'var(--success-bg)' }
    return { color: 'var(--text-subtle)', tint: 'var(--surface-raised)' }
}

const formatLabel = (key) =>
    String(key || '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

const getHostname = (url) => {
    try {
        return new URL(url).hostname.replace(/^www\./, '')
    } catch {
        return url
    }
}

const formatDate = (isoString) => {
    if (!isoString) return null
    const date = new Date(isoString)
    if (Number.isNaN(date.getTime())) return null
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

// Full circular progress ring — animates its fill on mount to show the
// score arriving, rather than appearing pre-filled.
const CircularScore = ({ score, color, reduceMotion }) => {
    const size = 120
    const strokeWidth = 10
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const clamped = Math.max(0, Math.min(100, score ?? 0))
    const offset = circumference - (clamped / 100) * circumference

    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth={strokeWidth}
                />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.1 }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold text-[var(--text-header)] tabular-nums">
                    {typeof score === 'number' ? score : '—'}
                </span>
                <span className="text-[10px] text-[var(--text-subtle)]">/ 100</span>
            </div>
        </div>
    )
}

const SkeletonBlock = ({ className }) => (
    <div className={`bg-[var(--surface-raised)] rounded-[var(--radius)] animate-pulse ${className}`} />
)

const SkeletonSummary = () => (
    <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between gap-6 mb-8">
            <div className="space-y-3 flex-1">
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-7 w-2/3" />
            </div>
            <SkeletonBlock className="h-[120px] w-[120px] rounded-full" />
        </div>
        <div className="flex gap-2 mb-8">
            {[...Array(4)].map((_, i) => (
                <SkeletonBlock key={i} className="h-8 w-24 rounded-full" />
            ))}
        </div>
        <div className="space-y-3">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-3/4" />
        </div>
    </div>
)

// ---- Tab panel content renderers ----

const VerdictPanel = ({ summary }) => (
    <div>
        <p className="text-base leading-relaxed text-[var(--text-main)] max-w-[65ch]">
            {summary?.executive_verdict || "No executive verdict is available for this query yet."}
        </p>
    </div>
)

const DimensionsPanel = ({ summary, reduceMotion }) => {
    const entries = summary?.dimensional_scores ? Object.entries(summary.dimensional_scores) : []
    if (entries.length === 0) return <EmptyPanel text="No dimensional scores are available yet." />

    return (
        <div>
            {entries.map(([key, dim], i) => {
                const rawScore = typeof dim?.score === 'number' ? dim.score : null
                const scaledScore = rawScore !== null ? rawScore * 10 : 0
                const tier = getConviction(rawScore !== null ? scaledScore : null)
                const signal = getTierColor(dim?.signal_strength === 'High' ? 'low' : dim?.signal_strength === 'Low' ? 'high' : dim?.signal_strength)

                return (
                    <div key={key} className="py-4 first:pt-0 border-b border-[var(--border)] last:border-0">
                        <div className="flex items-baseline justify-between gap-4 mb-2">
                            <h3 className="font-medium text-[var(--text-main)]">{formatLabel(key)}</h3>
                            <div className="flex items-center gap-3 shrink-0">
                                {dim?.signal_strength && (
                                    <span
                                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                                        style={{ color: signal.color, backgroundColor: signal.tint }}
                                    >
                                        {formatLabel(dim.signal_strength)} signal
                                    </span>
                                )}
                                <span className="text-sm font-semibold tabular-nums" style={{ color: tier.color }}>
                                    {rawScore !== null ? rawScore : '—'}
                                    <span className="text-[var(--text-subtle)] font-normal">/10</span>
                                </span>
                            </div>
                        </div>
                        <div className="h-1.5 rounded-full bg-[var(--surface-raised)] overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: tier.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${scaledScore}%` }}
                                transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.06 * i }}
                            />
                        </div>
                        {dim?.rationale && (
                            <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed max-w-[62ch]">{dim.rationale}</p>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

const CompetitorsPanel = ({ summary }) => {
    const list = Array.isArray(summary?.competitive_landscape) ? summary.competitive_landscape : []
    if (list.length === 0) return <EmptyPanel text="No competitive landscape data is available yet." />

    return (
        <div className="space-y-4">
            {list.map((competitor, i) => {
                const tier = getTierColor(competitor?.threat_level)
                return (
                    <div key={i} className="p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-card)]">
                        <div className="flex items-center justify-between gap-3 flex-wrap mb-1.5">
                            <h3 className="font-medium text-[var(--text-main)]">{competitor?.name || 'Unnamed competitor'}</h3>
                            {competitor?.threat_level && (
                                <span
                                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                                    style={{ color: tier.color, backgroundColor: tier.tint }}
                                >
                                    {formatLabel(competitor.threat_level)} threat
                                </span>
                            )}
                        </div>
                        {competitor?.description && (
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{competitor.description}</p>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

const VulnerabilitiesPanel = ({ summary }) => {
    const list = Array.isArray(summary?.critical_vulnerabilities) ? summary.critical_vulnerabilities : []
    if (list.length === 0) return <EmptyPanel text="No critical vulnerabilities have been flagged yet." />

    return (
        <ul className="space-y-3">
            {list.map((item, i) => (
                <li
                    key={i}
                    className="p-4 pl-4 rounded-[var(--radius)] border-l-4 text-sm leading-relaxed text-[var(--text-main)] bg-[var(--destructive-bg)]"
                    style={{ borderColor: 'var(--destructive)' }}
                >
                    {item}
                </li>
            ))}
        </ul>
    )
}

const NextStepsPanel = ({ summary }) => {
    const list = Array.isArray(summary?.actionable_next_steps) ? summary.actionable_next_steps : []
    if (list.length === 0) return <EmptyPanel text="No next steps have been generated yet." />

    return (
        <ol className="space-y-3">
            {list.map((step, i) => (
                <li key={i} className="flex gap-3 p-4 rounded-[var(--radius)] bg-[var(--surface-card)] border border-[var(--border)]">
                    <span
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                        style={{ color: 'var(--text-light)', backgroundColor: 'var(--primary)' }}
                    >
                        {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-[var(--text-main)] pt-0.5">{step}</span>
                </li>
            ))}
        </ol>
    )
}

const SourcesPanel = ({ summary }) => {
    const list = Array.isArray(summary?.evidentiary_sources) ? summary.evidentiary_sources : []
    if (list.length === 0) return <EmptyPanel text="No evidentiary sources are available yet." />

    return (
        <ul className="space-y-2">
            {list.map((source, i) => {
                const url = typeof source === 'string' ? source : source?.url
                const title = typeof source === 'object' ? source?.title : null
                if (!url) return null
                return (
                    <li key={i}>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-card)] hover:bg-[var(--surface-hover)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                        >
                            <span className="text-sm font-medium text-[var(--primary)] truncate">{title || getHostname(url)}</span>
                            <span className="text-xs text-[var(--text-subtle)] truncate">{getHostname(url)}</span>
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

const MetaPanel = ({ summary }) => {
    const entries = summary?.meta ? Object.entries(summary.meta).filter(([, v]) => v !== null && v !== undefined) : []
    if (entries.length === 0) return <EmptyPanel text="No generation metadata is available." />

    return (
        <dl className="divide-y divide-[var(--border)] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-card)] overflow-hidden">
            {entries.map(([key, value]) => (
                <div key={key} className="flex items-center justify-between gap-4 px-4 py-3">
                    <dt className="text-sm text-[var(--text-muted)]">{formatLabel(key)}</dt>
                    <dd className="text-sm font-medium text-[var(--text-main)] tabular-nums">{String(value)}</dd>
                </div>
            ))}
        </dl>
    )
}

const EmptyPanel = ({ text }) => (
    <div className="py-10 text-center">
        <p className="text-sm text-[var(--text-subtle)]">{text}</p>
    </div>
)

const TABS = [
    { id: 'verdict', label: 'Verdict', Component: VerdictPanel },
    { id: 'dimensions', label: 'Dimensions', Component: DimensionsPanel },
    { id: 'competitors', label: 'Competitors', Component: CompetitorsPanel },
    { id: 'vulnerabilities', label: 'Risks', Component: VulnerabilitiesPanel },
    { id: 'nextSteps', label: 'Next steps', Component: NextStepsPanel },
    { id: 'sources', label: 'Sources', Component: SourcesPanel },
    { id: 'meta', label: 'Details', Component: MetaPanel },
]

const SWIPE_THRESHOLD = 60

const SummaryPage = () => {
    const params = useParams()
    const queryId = params?.queryId
    const reduceMotion = useReducedMotion()

    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    useEffect(() => {
        if (!queryId) return
        let cancelled = false

        const fetchSummary = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await getSummary(queryId)
                console.log("Summary fetched successfully: ", response)
                if (!cancelled) setSummary(response)
            } catch (err) {
                console.error("Error fetching summary:", err)
                if (!cancelled) setError("This report couldn't be loaded. Try refreshing the page.")
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchSummary()
        return () => { cancelled = true }
    }, [queryId])

    const conviction = useMemo(() => getConviction(summary?.aggregate_score), [summary])

    const goToTab = (index) => {
        if (index < 0 || index >= TABS.length) return
        setDirection(index > activeIndex ? 1 : -1)
        setActiveIndex(index)
    }

    const handleDragEnd = (_, info) => {
        if (info.offset.x < -SWIPE_THRESHOLD) goToTab(activeIndex + 1)
        else if (info.offset.x > SWIPE_THRESHOLD) goToTab(activeIndex - 1)
    }

    if (error) {
        return (
            <div className="min-h-[91vh] flex items-center justify-center bg-[var(--background)] px-6">
                <div className="max-w-md text-center">
                    <p className="text-[var(--destructive)] font-medium mb-1">Report unavailable</p>
                    <p className="text-[var(--text-muted)] text-sm">{error}</p>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-[91vh] bg-[var(--background)]">
                <SkeletonSummary />
            </div>
        )
    }

    const ActivePanel = TABS[activeIndex].Component

    return (
        <div className="min-h-[91vh] bg-[var(--background)] text-[var(--text-main)]">
            <div className="max-w-full mx-auto p-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start justify-between gap-6 mb-8 pb-8 border-b border-[var(--border)]"
                >
                    <div className="flex-1 min-w-0">
                        <span
                            className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3"
                            style={{ color: conviction.color, backgroundColor: conviction.tint }}
                        >
                            {conviction.label}
                        </span>
                        <h1 className="text-xl font-semibold text-[var(--text-header)] mb-1 truncate">
                            {summary?.title || 'Idea validation report'}
                        </h1>
                        {summary?.created_at && (
                            <p className="text-sm text-[var(--text-subtle)]">
                                Generated {formatDate(summary.created_at)}
                            </p>
                        )}
                    </div>
                    <CircularScore score={summary?.aggregate_score} color={conviction.color} reduceMotion={reduceMotion} />
                </motion.div>

                {/* Tab bar — horizontally scrollable / swipable */}
                <div
                    className="flex gap-2 overflow-x-auto mb-6 pb-1 -mx-6 px-6 snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {TABS.map((tab, i) => {
                        const isActive = i === activeIndex
                        return (
                            <button
                                key={tab.id}
                                onClick={() => goToTab(i)}
                                className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${isActive
                                        ? 'bg-[var(--sidebar-item-active-bg)] text-[var(--sidebar-item-active-text)]'
                                        : 'text-[var(--text-subtle)] hover:bg-[var(--surface-hover)]'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

                {/* Swipeable content panel */}
                <div className="relative overflow-hidden rounded-[var(--radius)] bg-[var(--sidebar-bg)] border border-[var(--border)] shadow-[var(--shadow-sm)] p-6 min-h-[240px]">
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                        <motion.div
                            key={TABS[activeIndex].id}
                            custom={direction}
                            drag={reduceMotion ? false : "x"}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.15}
                            onDragEnd={handleDragEnd}
                            initial={{ x: reduceMotion ? 0 : direction >= 0 ? 40 : -40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: reduceMotion ? 0 : direction >= 0 ? -40 : 40, opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <ActivePanel summary={summary} reduceMotion={reduceMotion} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default SummaryPage