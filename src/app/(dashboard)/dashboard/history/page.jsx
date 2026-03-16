"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const statusStyles = {
    USER_PENDING: { bg: 'bg-[var(--warning-bg)]', text: 'text-[var(--warning)]', dot: 'bg-[var(--warning)]' },
    PROCESSING: { bg: 'bg-[var(--info-bg)]', text: 'text-[var(--info)]', dot: 'bg-[var(--info)]' },
    COMPLETED: { bg: 'bg-[var(--success-bg)]', text: 'text-[var(--success)]', dot: 'bg-[var(--success)]' },
    FAILED: { bg: 'bg-[var(--destructive-bg)]', text: 'text-[var(--destructive)]', dot: 'bg-[var(--destructive)]' },
}

const getStatusStyle = (status) =>
    statusStyles[status] ?? {
        bg: 'bg-[var(--surface-raised)]',
        text: 'text-[var(--text-muted)]',
        dot: 'bg-[var(--text-muted)]',
    }

const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const Page = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()

    async function fetchJobs() {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`http://localhost:8000/32/jobs`)
            if (!res.ok) throw new Error(`Failed to fetch jobs (${res.status})`)
            const data = await res.json()
            console.log('data:', data)
            setJobs(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchJobs() }, [])

    const handleContinue = (jobId) =>
        router.push(`/dashboard/history/posts?jobId=${jobId}`)

    return (
        <div className="min-h-screen bg-[var(--background)] px-8 py-12">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-main)]">
                    Job History
                </h1>
                <p className="mt-1 text-sm font-light text-[var(--text-muted)]">
                    Showing all research jobs for user #32
                </p>
            </div>

            {/* Table card */}
            <div className="overflow-hidden rounded-xl border border-[var(--border-solid)] bg-[var(--surface)] shadow-[var(--shadow)]">
                <table className="w-full border-collapse text-sm">

                    <thead>
                        <tr className="border-b border-[var(--border-solid)] bg-[var(--surface-card)]">
                            {['Query', 'Date', 'Status', 'Action'].map((h) => (
                                <th
                                    key={h}
                                    className="px-5 py-3 text-left text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {/* Loading */}
                        {loading && (
                            <tr>
                                <td colSpan={4} className="py-16 text-center">
                                    <div className="mx-auto mb-3 h-5 w-5 animate-spin rounded-full border-2 border-[var(--border-solid)] border-t-[var(--primary)]" />
                                    <span className="text-sm text-[var(--text-muted)]">Loading jobs…</span>
                                </td>
                            </tr>
                        )}

                        {/* Error */}
                        {!loading && error && (
                            <tr>
                                <td colSpan={4} className="py-16 text-center text-sm text-[var(--destructive)]">
                                    {error}
                                </td>
                            </tr>
                        )}

                        {/* Empty */}
                        {!loading && !error && jobs.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-16 text-center text-sm text-[var(--text-muted)]">
                                    No jobs found.
                                </td>
                            </tr>
                        )}

                        {/* Rows */}
                        {!loading && !error && jobs.map((job, i) => {
                            const s = getStatusStyle(job.status)
                            return (
                                <tr
                                    key={job.id}
                                    className="border-b border-[var(--border-solid)] bg-[var(--surface)] last:border-b-0 hover:bg-[var(--surface-card)] transition-colors duration-150"
                                    style={{ animationDelay: `${i * 40}ms` }}
                                >
                                    {/* Query */}
                                    <td className="max-w-xs px-5 py-4 leading-relaxed text-[var(--text-main)]">
                                        {job.query}
                                    </td>

                                    {/* Date */}
                                    <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-[var(--text-muted)]">
                                        {formatDate(job.created_at)}
                                    </td>

                                    {/* Status badge */}
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.bg} ${s.text}`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                                            {job.status.replace(/_/g, ' ')}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td className="px-5 py-4">
                                        <button
                                            onClick={() => handleContinue(job.id)}
                                            className="group inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border-solid)] bg-[var(--surface-raised)] px-3.5 py-1.5 text-xs font-medium text-[var(--primary)] transition-all duration-150 hover:border-[var(--primary)] hover:bg-[var(--surface-card)]"
                                        >
                                            Continue
                                            <svg
                                                className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page