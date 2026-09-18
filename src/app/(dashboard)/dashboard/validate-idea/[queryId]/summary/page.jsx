"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Source_Serif_4, IBM_Plex_Sans } from 'next/font/google'
import { getSummary } from "@/features/validate/api/validate.api"

const serif = Source_Serif_4({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-serif' })
const sans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans' })

// Score → conviction tier. Color is functional throughout this page: it
// always encodes a score or threat level, never decoration.
// Expects a 0–100 scale.
const CONVICTION = {
    high: { color: '#3F6C51', tint: '#E4EBE6', label: 'High conviction' },
    mid: { color: '#B9862E', tint: '#F1E8D8', label: 'Moderate conviction' },
    low: { color: '#A63B2E', tint: '#F1DFDB', label: 'Low conviction' },
}

const getConviction = (score) => {
    if (typeof score !== 'number') return { color: '#5B615C', tint: '#E7E8E4', label: 'Not yet scored' }
    if (score >= 70) return CONVICTION.high
    if (score >= 40) return CONVICTION.mid
    return CONVICTION.low
}

// Threat / risk level → same three-tier language, inverted meaning (high threat = red).
const getTierColor = (level) => {
    const normalized = String(level || '').toLowerCase()
    if (['high', 'critical', 'severe'].includes(normalized)) return '#A63B2E'
    if (['medium', 'moderate'].includes(normalized)) return '#B9862E'
    if (['low', 'minor'].includes(normalized)) return '#3F6C51'
    return '#9CA39B'
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

// Semicircular gauge. The arc fill is the one piece of "decorative" motion
// on this page — it's functional, though: it shows the number arriving.
const ScoreGauge = ({ score, color, reduceMotion }) => {
    const radius = 80
    const circumference = Math.PI * radius
    const clamped = Math.max(0, Math.min(100, score ?? 0))
    const offset = circumference - (clamped / 100) * circumference

    return (
        <div className="relative w-[220px] h-[130px] mx-auto md:mx-0">
            <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#D8DBD3"
                    strokeWidth="10"
                    strokeLinecap="round"
                />
                <motion.path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke={color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.15 }}
                />
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center md:items-start md:left-1/2 md:-translate-x-1/2">
                <span className="font-serif text-5xl leading-none" style={{ color }}>
                    {typeof score === 'number' ? score : '—'}
                </span>
                <span className="text-xs text-[#5B615C] mt-1">out of 100</span>
            </div>
        </div>
    )
}

// Dimension objects arrive as { score, rationale, signal_strength } on a
// 0–10 scale (e.g. pain_point_severity: 7). The bar fill and conviction
// tiering below are calibrated for 0–100, so we scale internally — the
// numeral shown to the user stays in its native 0–10 form.
const DimensionBar = ({ label, dimension, index, reduceMotion }) => {
    const rawScore = typeof dimension?.score === 'number' ? dimension.score : null
    const scaledScore = rawScore !== null ? rawScore * 10 : 0
    const tier = getConviction(rawScore !== null ? scaledScore : null)

    return (
        <div className="py-4 first:pt-0 border-b border-[#D8DBD3] last:border-none">
            <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className="font-medium text-[#191C1A]">{label}</h3>
                <div className="flex items-baseline gap-3 shrink-0">
                    {dimension?.signal_strength && (
                        <span className="text-xs text-[#5B615C]">{formatLabel(dimension.signal_strength)} signal</span>
                    )}
                    <span className="text-sm font-medium tabular-nums" style={{ color: tier.color }}>
                        {rawScore !== null ? rawScore : '—'}
                    </span>
                </div>
            </div>
            <div className="h-1.5 rounded-full bg-[#E7E8E4] overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: tier.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${scaledScore}%` }}
                    transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.1 * index }}
                />
            </div>
            {dimension?.rationale && (
                <p className="text-sm text-[#5B615C] mt-2 leading-relaxed max-w-[62ch]">{dimension.rationale}</p>
            )}
        </div>
    )
}

const SkeletonBlock = ({ className }) => (
    <div className={`bg-[#E7E8E4] rounded animate-pulse ${className}`} />
)

const SkeletonSummary = () => (
    <div className="max-w-[760px] mx-auto px-6 py-16">
        <SkeletonBlock className="h-4 w-32 mb-8" />
        <div className="flex flex-col md:flex-row md:items-end gap-10 mb-12">
            <div className="flex-1 space-y-3">
                <SkeletonBlock className="h-8 w-full" />
                <SkeletonBlock className="h-8 w-5/6" />
                <SkeletonBlock className="h-8 w-3/4" />
            </div>
            <SkeletonBlock className="h-[130px] w-[220px] rounded-full" />
        </div>
        <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <SkeletonBlock className="h-4 w-40" />
                    <SkeletonBlock className="h-1.5 w-full" />
                </div>
            ))}
        </div>
    </div>
)

const SummaryPage = () => {
    const params = useParams()
    const queryId = params?.queryId
    const reduceMotion = useReducedMotion()

    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    if (error) {
        return (
            <div className={`${sans.variable} ${serif.variable} font-sans min-h-[91vh] flex items-center justify-center bg-[#F4F5F0] px-6`}>
                <div className="max-w-md text-center">
                    <p className="text-[#191C1A] font-medium mb-1">Report unavailable</p>
                    <p className="text-[#5B615C] text-sm">{error}</p>
                </div>
            </div>
        )
    }

    const conviction = getConviction(summary?.aggregate_score)

    return (
        <div className={`${sans.variable} ${serif.variable} font-sans min-h-[91vh] bg-[#F4F5F0] text-[#191C1A]`}>
            <style jsx global>{`
                .font-serif { font-family: var(--font-serif); }
                .font-sans { font-family: var(--font-sans); }
            `}</style>

            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div key="skeleton" exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }}>
                        <SkeletonSummary />
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-[760px] mx-auto px-6 py-16"
                    >
                        <p className="text-sm text-[#5B615C] mb-8">
                            Conviction report
                            {summary?.created_at && (
                                <> · {new Date(summary.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</>
                            )}
                        </p>

                        {/* Hero: verdict + score */}
                        <div className="flex flex-col md:flex-row md:items-center gap-10 mb-14 pb-10 border-b border-[#D8DBD3]">
                            <div className="flex-1 order-2 md:order-1">
                                <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4" style={{ color: conviction.color, backgroundColor: conviction.tint }}>
                                    {conviction.label}
                                </span>
                                <p className="font-serif text-2xl md:text-[28px] leading-snug">
                                    {summary?.executive_verdict || "No executive verdict is available for this query yet."}
                                </p>
                            </div>
                            <div className="order-1 md:order-2">
                                <ScoreGauge score={summary?.aggregate_score} color={conviction.color} reduceMotion={reduceMotion} />
                            </div>
                        </div>

                        {/* Dimensional scores — arrives as an object keyed by dimension name */}
                        {summary?.dimensional_scores && Object.keys(summary.dimensional_scores).length > 0 && (
                            <section className="mb-14">
                                <h2 className="font-serif text-xl mb-4">Dimensional scores</h2>
                                <div>
                                    {Object.entries(summary.dimensional_scores).map(([key, dim], i) => (
                                        <DimensionBar key={key} label={formatLabel(key)} dimension={dim} index={i} reduceMotion={reduceMotion} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Competitive landscape */}
                        {Array.isArray(summary?.competitive_landscape) && summary.competitive_landscape.length > 0 && (
                            <section className="mb-14">
                                <h2 className="font-serif text-xl mb-4">Competitive landscape</h2>
                                <div className="space-y-5">
                                    {summary.competitive_landscape.map((competitor, i) => (
                                        <div key={i} className="flex gap-3">
                                            <span
                                                className="mt-2 h-2 w-2 rounded-full shrink-0"
                                                style={{ backgroundColor: getTierColor(competitor?.threat_level) }}
                                            />
                                            <div>
                                                <div className="flex items-baseline gap-2 flex-wrap">
                                                    <h3 className="font-medium">{competitor?.name || 'Unnamed competitor'}</h3>
                                                    {competitor?.threat_level && (
                                                        <span className="text-xs text-[#5B615C]">{formatLabel(competitor.threat_level)} threat</span>
                                                    )}
                                                </div>
                                                {competitor?.description && (
                                                    <p className="text-sm text-[#5B615C] mt-1 leading-relaxed max-w-[62ch]">{competitor.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Critical vulnerabilities */}
                        {Array.isArray(summary?.critical_vulnerabilities) && summary.critical_vulnerabilities.length > 0 && (
                            <section className="mb-14">
                                <h2 className="font-serif text-xl mb-4">Critical vulnerabilities</h2>
                                <ul className="space-y-3">
                                    {summary.critical_vulnerabilities.map((item, i) => (
                                        <li key={i} className="pl-4 border-l-2 text-sm leading-relaxed max-w-[62ch]" style={{ borderColor: '#A63B2E' }}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Actionable next steps — the one genuinely sequential list */}
                        {Array.isArray(summary?.actionable_next_steps) && summary.actionable_next_steps.length > 0 && (
                            <section className="mb-14">
                                <h2 className="font-serif text-xl mb-4">Next steps</h2>
                                <ol className="space-y-3">
                                    {summary.actionable_next_steps.map((step, i) => (
                                        <li key={i} className="flex gap-3 text-sm leading-relaxed max-w-[62ch]">
                                            <span className="font-serif text-[#5B615C] shrink-0">{i + 1}</span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </section>
                        )}

                        {/* Evidentiary sources */}
                        {Array.isArray(summary?.evidentiary_sources) && summary.evidentiary_sources.length > 0 && (
                            <section className="mb-14">
                                <h2 className="font-serif text-xl mb-4">Sources</h2>
                                <ul className="space-y-2">
                                    {summary.evidentiary_sources.map((source, i) => {
                                        const url = typeof source === 'string' ? source : source?.url
                                        const title = typeof source === 'object' ? source?.title : null
                                        if (!url) return null
                                        return (
                                            <li key={i}>
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-[#191C1A] hover:text-[#5B615C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B615C] underline decoration-[#D8DBD3] underline-offset-4"
                                                >
                                                    {title || getHostname(url)}
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </section>
                        )}

                        {/* Meta footer */}
                        {summary?.meta && Object.keys(summary.meta).length > 0 && (
                            <p className="text-xs text-[#9CA39B] pt-6 border-t border-[#D8DBD3]">
                                {Object.entries(summary.meta)
                                    .filter(([, v]) => v !== null && v !== undefined)
                                    .map(([k, v]) => `${formatLabel(k)}: ${v}`)
                                    .join('  ')}
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SummaryPage