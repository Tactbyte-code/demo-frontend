"use client"

import React, { useState, useMemo, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getConviction, formatDate } from '@/lib/utils'
import {
    VerdictPanel, DimensionsPanel, CompetitorsPanel,
    VulnerabilitiesPanel, NextStepsPanel, SourcesPanel, MetaPanel
} from '@/features/validate/components/ReportPanels'
import {
    ArrowLeft, CheckCircle, BarChart2, Users,
    AlertOctagon, ListTodo, Globe, Info, FileText
} from 'lucide-react'
import { CircularScore } from '@/features/validate/components/CircularScore'
import { SkeletonSummary } from '@/features/validate/components/Skeletons'
import { useGetSummary } from '@/features/validate/hooks/useGetSummary'
import { DownloadPdfButton } from '@/features/validate/components/DownloadPdfButton'

const TABS = [
    { id: 'verdict', label: 'Verdict', Icon: CheckCircle, Component: VerdictPanel },
    { id: 'dimensions', label: 'Dimensions', Icon: BarChart2, Component: DimensionsPanel },
    { id: 'competitors', label: 'Competitors', Icon: Users, Component: CompetitorsPanel },
    { id: 'vulnerabilities', label: 'Risks', Icon: AlertOctagon, Component: VulnerabilitiesPanel },
    { id: 'nextSteps', label: 'Next steps', Icon: ListTodo, Component: NextStepsPanel },
    { id: 'sources', label: 'Sources', Icon: Globe, Component: SourcesPanel },
    { id: 'meta', label: 'Details', Icon: Info, Component: MetaPanel },
];

const SWIPE_THRESHOLD = 60
const BACK_ROUTE = '/dashboard/validate-idea'

export default function SummaryPage() {
    const params = useParams()
    const router = useRouter()
    const queryId = params?.queryId
    const reduceMotion = useReducedMotion()

    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    // Handle Browser Back Button (PopState)
    useEffect(() => {
        window.history.pushState(null, '', window.location.href)

        const handlePopState = (e) => {
            e.preventDefault()
            router.push(BACK_ROUTE)
        }

        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [router])

    const {
        data: summary,
        isPending,
        isError,
        error
    } = useGetSummary(queryId);

    console.log('summary: ', summary);

    const conviction = useMemo(() => getConviction(summary?.aggregate_score), [summary])

    const goToTab = (index) => {
        if (index < 0 || index >= TABS.length) return
        setDirection(index > activeIndex ? 1 : -1)
        setActiveIndex(index)
    };

    const handleDragEnd = (_, info) => {
        if (info.offset.x < -SWIPE_THRESHOLD) goToTab(activeIndex + 1)
        else if (info.offset.x > SWIPE_THRESHOLD) goToTab(activeIndex - 1)
    };

    if (isError) {
        return (
            <div className="min-h-[91vh] flex items-center justify-center bg-[var(--background)] px-6">
                <div className="max-w-md text-center">
                    <AlertOctagon className="w-12 h-12 text-[var(--destructive)] mx-auto mb-4" />
                    <p className="text-[var(--destructive)] font-semibold text-lg mb-2">Report unavailable</p>
                    <p className="text-[var(--text-muted)] text-sm mb-6">{error?.message || "Your summary couldn't be loaded. Try refreshing the page."}</p>
                    <button
                        onClick={() => router.push(BACK_ROUTE)}
                        className="px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--radius)] font-medium"
                    >
                        Go back to Dashboard
                    </button>
                </div>
            </div>
        )
    };

    if (isPending) return <div className="min-h-[91vh] bg-[var(--background)]"><SkeletonSummary /></div>;

    const ActivePanel = TABS[activeIndex].Component;

    return (
        <div className="min-h-[91vh] bg-[var(--background)] text-[var(--foreground)]">
            <div className="max-w-full mx-auto p-6 md:p-16">

                {/* Top Actions Bar */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => router.push(BACK_ROUTE)}
                        className="group flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-medium text-sm"
                    >
                        <div className="p-1.5 rounded-full bg-[var(--surface-raised)] group-hover:bg-[var(--border)] transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        Back to validation
                    </button>

                    {/* Download PDF Button */}
                    {summary && <DownloadPdfButton summary={summary} conviction={conviction} />}
                </div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8 mb-10 pb-10 border-b border-[var(--border)]"
                >
                    <div className="flex-1 min-w-0">
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 shadow-sm border border-transparent"
                            style={{
                                color: conviction.color,
                                backgroundColor: conviction.tint,
                                borderColor: `${conviction.color}30`
                            }}
                        >
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: conviction.color }} />
                            <span className="text-xs font-bold uppercase tracking-wide">{conviction.label}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-[var(--text-header)] mb-2 tracking-tight">
                            {summary?.title || 'Idea validation report'}
                        </h1>
                        {summary?.created_at && (
                            <p className="text-sm font-medium text-[var(--text-subtle)] flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Generated on {formatDate(summary.created_at)}
                            </p>
                        )}
                    </div>
                    <CircularScore score={summary?.aggregate_score} color={conviction.color} reduceMotion={reduceMotion} />
                </motion.div>

                {/* Tab bar */}
                <div
                    className="flex gap-2 overflow-x-auto mb-8 pb-2 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {TABS.map((tab, i) => {
                        const isActive = i === activeIndex
                        const Icon = tab.Icon
                        return (
                            <button
                                key={tab.id}
                                onClick={() => goToTab(i)}
                                className={`shrink-0 snap-start flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] ${isActive
                                    ? 'bg-[var(--text-header)] text-[var(--background)]'
                                    : 'text-[var(--text-subtle)] bg-[var(--surface-raised)] hover:bg-[var(--surface-hover)]'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-70'}`} />
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

                {/* Swipeable content panel */}
                <div className="relative overflow-hidden rounded-2xl bg-[var(--sidebar-bg)] border border-[var(--border)] shadow-lg p-6 md:p-8 min-h-[300px]">
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
                            className="h-full"
                        >
                            <ActivePanel summary={summary} reduceMotion={reduceMotion} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}