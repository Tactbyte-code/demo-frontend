"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getQueries } from "@/features/validate/api/validate.api"
import { Lightbulb } from 'lucide-react'

// Collapses the full ValidateQueryStatus enum into four display tiers mapped to the theme
const STATUS_TIER = {
    INITIALIZED: { label: 'Queued', color: 'var(--info)', tint: 'var(--info-bg)' },
    CREATED: { label: 'Queued', color: 'var(--info)', tint: 'var(--info-bg)' },
    VALIDATING: { label: 'In progress', color: 'var(--warning)', tint: 'var(--warning-bg)' },
    VALIDATED: { label: 'In progress', color: 'var(--warning)', tint: 'var(--warning-bg)' },
    SEARCHING: { label: 'In progress', color: 'var(--warning)', tint: 'var(--warning-bg)' },
    SEARCH_COMPLETED: { label: 'In progress', color: 'var(--warning)', tint: 'var(--warning-bg)' },
    SCORING: { label: 'In progress', color: 'var(--warning)', tint: 'var(--warning-bg)' },
    COMPLETED: { label: 'Completed', color: 'var(--success)', tint: 'var(--success-bg)' },
    FAILED: { label: 'Failed', color: 'var(--destructive)', tint: 'var(--destructive-bg)' },
}

const getStatusTier = (status) =>
    STATUS_TIER[String(status || '').toUpperCase()] || { label: formatLabel(status) || 'Unknown', color: 'var(--text-muted)', tint: 'var(--surface-raised)' }

function formatLabel(key) {
    return String(key || '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const getHrefForQuery = (query) =>
    String(query?.status || '').toUpperCase() === 'COMPLETED'
        ? `/dashboard/validate-idea/${query.id}/summary`
        : `/dashboard/validate-idea/${query.id}`

const formatDate = (isoString) => {
    if (!isoString) return null
    const date = new Date(isoString)
    if (Number.isNaN(date.getTime())) return null
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const SkeletonBlock = ({ className }) => (
    <div className={`bg-[var(--surface-raised)] rounded-[var(--radius)] animate-pulse ${className}`} />
)

const SkeletonRow = () => (
    <div className="w-full grid grid-cols-[40px_1fr_110px_90px] md:grid-cols-[60px_1fr_120px_100px] gap-4 px-4 py-4 border-b border-[var(--border)] last:border-0 items-center bg-[var(--sidebar-bg)]">
        <SkeletonBlock className="h-4 w-6 mx-auto md:mx-0" />
        <SkeletonBlock className="h-5 w-3/4 max-w-[400px]" />
        <SkeletonBlock className="h-6 w-20 rounded-full" />
        <SkeletonBlock className="h-4 w-16 justify-self-end" />
    </div>
)

const QueryRow = ({ query, index, reduceMotion }) => {
    const tier = getStatusTier(query?.status)
    const date = formatDate(query?.created_at)

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1], delay: reduceMotion ? 0 : 0.04 * index }}
            className="border-b border-[var(--border)] last:border-0 bg-[var(--sidebar-bg)] w-full"
        >
            <Link
                href={getHrefForQuery(query)}
                className="grid grid-cols-[40px_1fr_110px_90px] md:grid-cols-[60px_1fr_120px_100px] items-center gap-4 px-4 py-4 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--primary)] transition-all hover:bg-[var(--surface-hover)] w-full"
            >
                <span className="text-sm font-medium text-[var(--text-subtle)] text-center md:text-left">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-medium text-[var(--text-main)] truncate pr-4">
                    {query?.title || 'Untitled idea'}
                </h3>
                <div>
                    <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full border border-[var(--glass-border)] shadow-sm whitespace-nowrap"
                        style={{ color: tier.color, backgroundColor: tier.tint }}
                    >
                        {tier.label}
                    </span>
                </div>
                <span className="text-sm text-[var(--text-muted)] text-right whitespace-nowrap">
                    {date || '-'}
                </span>
            </Link>
        </motion.div>
    )
}

const ValidateIdeaListPage = () => {
    const reduceMotion = useReducedMotion()

    const [queries, setQueries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        const fetchQueries = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await getQueries();
                if (cancelled) return;

                const list = Array.isArray(response) ? response : []
                const sorted = [...list].sort((a, b) => {
                    const dateA = a?.created_at ? new Date(a.created_at).getTime() : 0
                    const dateB = b?.created_at ? new Date(b.created_at).getTime() : 0
                    return dateB - dateA
                })
                setQueries(sorted)
            } catch (err) {
                console.error("Error fetching queries:", err)
                if (!cancelled) setError("Your ideas couldn't be loaded. Try refreshing the page.")
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchQueries();
        return () => { cancelled = true }
    }, []);

    return (
        <div className={`w-full min-h-[91vh] bg-[var(--background)] text-[var(--text-main)]`}>
            <div className="w-full mx-auto px-10 py-16">
                <div className="mb-10 flex items-start gap-2">
                    <Lightbulb className="w-6 h-6 mt-1 text-[var(--accent)] shrink-0" strokeWidth={2} />
                    <div>
                        <h1 className="text-2xl mb-0.5 text-[var(--text-header)] tracking-tight font-medium">
                            Your recent ideas
                        </h1>
                        <p className="text-sm text-[var(--text-muted)]">
                            Track the validation status and review reports for your submitted ideas.
                        </p>
                    </div>
                </div>

                {/* Main Table Container */}
                <div className="w-full border border-[var(--border)] rounded-[var(--radius)] shadow-sm bg-[var(--sidebar-bg)] overflow-hidden">

                    {/* Table Header */}
                    <div className="w-full grid grid-cols-[40px_1fr_110px_90px] md:grid-cols-[60px_1fr_120px_100px] items-center gap-4 px-4 py-3 bg-[var(--surface)] border-b border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                        <div className="text-center md:text-left">Sl No</div>
                        <div>Title</div>
                        <div>Status</div>
                        <div className="text-right">Date</div>
                    </div>

                    {/* Table Body */}
                    <div className="w-full flex flex-col">
                        {error ? (
                            <div className="py-20 text-center flex-1 flex flex-col justify-center bg-[var(--sidebar-bg)] w-full">
                                <p className="text-[var(--destructive)] font-medium mb-1">Ideas unavailable</p>
                                <p className="text-[var(--text-muted)] text-sm">{error}</p>
                            </div>
                        ) : loading ? (
                            <div className="w-full flex flex-col">
                                {[...Array(5)].map((_, i) => (
                                    <SkeletonRow key={i} />
                                ))}
                            </div>
                        ) : queries.length === 0 ? (
                            <div className="py-24 text-center flex-1 flex flex-col justify-center bg-[var(--sidebar-bg)] w-full">
                                <p className="text-[var(--text-main)] font-medium mb-2 text-lg">No ideas yet</p>
                                <p className="text-[var(--text-subtle)] text-sm">Ideas you submit for validation will show up here.</p>
                            </div>
                        ) : (
                            <AnimatePresence>
                                {queries.map((query, i) => (
                                    <QueryRow key={query.id} query={query} index={i} reduceMotion={reduceMotion} />
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ValidateIdeaListPage;