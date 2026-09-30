"use client"

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react'
import { useGetQueries } from '../hooks/useGetQueries'
import { STATUS_TIER } from '@/utils/data'

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

const QueryRow = ({ query, index, serialNumber, reduceMotion }) => {
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
                    {String(serialNumber).padStart(2, '0')}
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
    const [page, setPage] = useState(1)
    const pageSize = 10

    // Safely parse localStorage for Next.js SSR to avoid hydration errors
    const userId = typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('user') || '{}')?.firebase_uid
        : null;

    const {
        data,
        isLoading,
        isError,
        error,
        isPlaceholderData // Useful to show a subtle loading state while fetching next page
    } = useGetQueries(userId, page, pageSize);

    // Extract items safely from the new paginated response structure.
    // Sorting by date is removed here because the backend handles it via .order_by()
    const queriesList = data?.items || []
    const totalPages = data?.total_pages || 1

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
                    <div className={`w-full flex flex-col transition-opacity duration-200 ${isPlaceholderData ? 'opacity-60' : 'opacity-100'}`}>
                        {isError ? (
                            <div className="py-20 text-center flex-1 flex flex-col justify-center bg-[var(--sidebar-bg)] w-full">
                                <p className="text-[var(--destructive)] font-medium mb-1">Ideas unavailable</p>
                                <p className="text-[var(--text-muted)] text-sm">
                                    {error?.message || "Your ideas couldn't be loaded. Try refreshing the page."}
                                </p>
                            </div>
                        ) : isLoading ? (
                            <div className="w-full flex flex-col">
                                {[...Array(pageSize)].map((_, i) => (
                                    <SkeletonRow key={i} />
                                ))}
                            </div>
                        ) : queriesList.length === 0 ? (
                            <div className="py-24 text-center flex-1 flex flex-col justify-center bg-[var(--sidebar-bg)] w-full">
                                <p className="text-[var(--text-main)] font-medium mb-2 text-lg">No ideas yet</p>
                                <p className="text-[var(--text-subtle)] text-sm">Ideas you submit for validation will show up here.</p>
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                {queriesList.map((query, i) => {
                                    // Calculate global serial number based on current page
                                    const serialNumber = (page - 1) * pageSize + i + 1;
                                    return (
                                        <QueryRow
                                            key={query.id}
                                            query={query}
                                            index={i}
                                            serialNumber={serialNumber}
                                            reduceMotion={reduceMotion}
                                        />
                                    )
                                })}
                            </AnimatePresence>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {!isLoading && !isError && totalPages > 1 && (
                        <div className="w-full flex items-center justify-between px-4 py-3 bg-[var(--surface)] border-t border-[var(--border)]">
                            <span className="text-sm text-[var(--text-muted)]">
                                Page <span className="font-medium text-[var(--text-main)]">{page}</span> of {totalPages}
                            </span>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage(old => Math.max(old - 1, 1))}
                                    disabled={page === 1}
                                    className="p-1.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--sidebar-bg)] hover:bg-[var(--surface-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[var(--text-main)]"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setPage(old => (old < totalPages ? old + 1 : old))}
                                    disabled={page === totalPages || isPlaceholderData}
                                    className="p-1.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--sidebar-bg)] hover:bg-[var(--surface-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[var(--text-main)]"
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ValidateIdeaListPage;