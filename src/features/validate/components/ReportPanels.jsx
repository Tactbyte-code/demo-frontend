"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { getConviction, getTierColor, formatLabel, getHostname } from '@/lib/utils'
import {
    AlertTriangle, ShieldAlert, ShieldCheck, Link2,
    ExternalLink, FileText, LayoutDashboard, Inbox
} from 'lucide-react'

export const EmptyPanel = ({ text }) => (
    <div className="py-16 flex flex-col items-center justify-center text-center">
        <Inbox className="w-12 h-12 text-[var(--text-subtle)] mb-4 opacity-50" />
        <p className="text-sm font-medium text-[var(--text-subtle)]">{text}</p>
    </div>
)

export const VerdictPanel = ({ summary }) => (
    <div className="flex gap-4 p-2">
        <LayoutDashboard className="w-6 h-6 shrink-0 text-[var(--primary)] mt-1" />
        <p className="text-lg leading-relaxed text-[var(--text-main)] font-medium max-w-[65ch]">
            {summary?.executive_verdict || "No executive verdict is available for this query yet."}
        </p>
    </div>
)

export const DimensionsPanel = ({ summary, reduceMotion }) => {
    const entries = summary?.dimensional_scores ? Object.entries(summary.dimensional_scores) : []
    if (entries.length === 0) return <EmptyPanel text="No dimensional scores are available yet." />

    return (
        <div className="grid gap-6 sm:grid-cols-2">
            {entries.map(([key, dim], i) => {
                const rawScore = typeof dim?.score === 'number' ? dim.score : null
                const scaledScore = rawScore !== null ? rawScore * 10 : 0
                const tier = getConviction(rawScore !== null ? scaledScore : null)
                const signal = getTierColor(dim?.signal_strength === 'High' ? 'low' : dim?.signal_strength === 'Low' ? 'high' : dim?.signal_strength)

                return (
                    <div key={key} className="p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-card)] hover:shadow-md transition-shadow">
                        <div className="flex items-baseline justify-between gap-4 mb-3">
                            <h3 className="font-semibold text-[var(--text-main)] truncate">{formatLabel(key)}</h3>
                            <div className="flex items-center gap-2 shrink-0">
                                {dim?.signal_strength && (
                                    <span
                                        className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full"
                                        style={{ color: signal.color, backgroundColor: signal.tint }}
                                    >
                                        {dim.signal_strength} Sig
                                    </span>
                                )}
                                <span className="text-sm font-bold tabular-nums" style={{ color: tier.color }}>
                                    {rawScore !== null ? rawScore : '—'}
                                    <span className="text-[var(--text-subtle)] font-normal">/10</span>
                                </span>
                            </div>
                        </div>
                        <div className="h-2 rounded-full bg-[var(--surface-raised)] overflow-hidden mb-3">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: tier.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${scaledScore}%` }}
                                transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.06 * i }}
                            />
                        </div>
                        {dim?.rationale && (
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{dim.rationale}</p>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export const CompetitorsPanel = ({ summary }) => {
    const list = Array.isArray(summary?.competitive_landscape) ? summary.competitive_landscape : []
    if (list.length === 0) return <EmptyPanel text="No competitive landscape data is available yet." />

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {list.map((competitor, i) => {
                const tier = getTierColor(competitor?.threat_level)
                return (
                    <div key={i} className="p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-card)]">
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4 text-[var(--text-subtle)]" />
                                <h3 className="font-semibold text-[var(--text-main)]">{competitor?.name || 'Unnamed'}</h3>
                            </div>
                            {competitor?.threat_level && (
                                <span
                                    className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                                    style={{ color: tier.color, backgroundColor: tier.tint }}
                                >
                                    {formatLabel(competitor.threat_level)} Threat
                                </span>
                            )}
                        </div>
                        {competitor?.description && (
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-2">{competitor.description}</p>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export const VulnerabilitiesPanel = ({ summary }) => {
    const list = Array.isArray(summary?.critical_vulnerabilities) ? summary.critical_vulnerabilities : []
    if (list.length === 0) return <EmptyPanel text="No critical vulnerabilities have been flagged yet." />

    return (
        <ul className="space-y-3">
            {list.map((item, i) => (
                <li
                    key={i}
                    className="flex gap-4 p-4 rounded-[var(--radius)] border border-[var(--destructive)] bg-[var(--destructive-bg)]"
                >
                    <AlertTriangle className="w-5 h-5 shrink-0 text-[var(--destructive)] mt-0.5" />
                    <span className="text-sm leading-relaxed text-[var(--text-main)] font-medium">{item}</span>
                </li>
            ))}
        </ul>
    )
}

export const NextStepsPanel = ({ summary }) => {
    const list = Array.isArray(summary?.actionable_next_steps) ? summary.actionable_next_steps : []
    if (list.length === 0) return <EmptyPanel text="No next steps have been generated yet." />

    return (
        <ol className="space-y-4">
            {list.map((step, i) => (
                <li key={i} className="flex gap-4 p-5 rounded-[var(--radius)] bg-[var(--surface-card)] border border-[var(--border)] shadow-sm">
                    <div className="shrink-0 mt-0.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--primary)] text-white font-bold text-sm shadow-inner">
                            {i + 1}
                        </div>
                    </div>
                    <span className="text-base leading-relaxed text-[var(--text-main)] font-medium">{step}</span>
                </li>
            ))}
        </ol>
    )
}

export const SourcesPanel = ({ summary }) => {
    const evidentiary = Array.isArray(summary?.evidentiary_sources) ? summary.evidentiary_sources : []
    const allSources = Array.isArray(summary?.all_sources) ? summary.all_sources : []

    if (evidentiary.length === 0 && allSources.length === 0) {
        return <EmptyPanel text="No sources are available yet." />
    }

    return (
        <div className="space-y-6">

            {/* Evidentiary Sources Card */}
            {evidentiary.length > 0 && (
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />
                        <h3 className="font-bold text-[var(--text-header)]">Evidentiary Sources</h3>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {evidentiary.map((source, i) => {
                            const url = typeof source === 'string' ? source : source?.url
                            const title = typeof source === 'object' ? source?.title : null
                            if (!url) return null
                            return (
                                <li key={i}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] hover:shadow-sm transition-all group h-full"
                                    >
                                        <ExternalLink className="w-4 h-4 shrink-0 text-[var(--text-subtle)] group-hover:text-[var(--primary)] transition-colors" />
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--primary)] truncate transition-colors">
                                                {title || getHostname(url)}
                                            </span>
                                            <span className="text-xs text-[var(--text-subtle)] truncate">{getHostname(url)}</span>
                                        </div>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}

            {/* All Explored Sources Card */}
            {allSources.length > 0 && (
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Link2 className="w-5 h-5 text-[var(--text-subtle)]" />
                        <h3 className="font-bold text-[var(--text-header)]">All Explored Sources</h3>
                    </div>
                    <ul className="flex flex-col gap-3">
                        {allSources.map((source, i) => {
                            if (!source?.url) return null;
                            return (
                                <li key={i}>
                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] transition-all group"
                                    >
                                        <h4 className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors mb-1 line-clamp-1">
                                            {source.title || getHostname(source.url)}
                                        </h4>
                                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-subtle)]">
                                            <ExternalLink className="w-3 h-3 shrink-0" />
                                            <span className="truncate">{source.url}</span>
                                        </div>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}

        </div>
    )
}

export const MetaPanel = ({ summary }) => {
    const entries = summary?.meta ? Object.entries(summary.meta).filter(([, v]) => v !== null && v !== undefined) : []
    if (entries.length === 0) return <EmptyPanel text="No generation metadata is available." />

    return (
        <dl className="divide-y divide-[var(--border)] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-card)] overflow-hidden">
            {entries.map(([key, value]) => (
                <div key={key} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[var(--surface-hover)] transition-colors">
                    <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-[var(--text-subtle)]" />
                        <dt className="text-sm font-medium text-[var(--text-muted)]">{formatLabel(key)}</dt>
                    </div>
                    <dd className="text-sm font-bold text-[var(--text-main)] tabular-nums">{String(value)}</dd>
                </div>
            ))}
        </dl>
    )
}