"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const PostsPage = () => {

    const searchParams = useSearchParams()
    const jobId = searchParams.get('jobId')

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [toggling, setToggling] = useState(new Set())
    const [summarizing, setSummarizing] = useState(false)
    const [summarizeError, setSummarizeError] = useState(null)
    const [summarizeSuccess, setSummarizeSuccess] = useState(false)
    const [expanded, setExpanded] = useState(new Set())

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Selection Constraint
    const MAX_SELECTION = 10;

    async function fetchPosts() {
        if (!jobId) {
            setError('No job ID provided.')
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            const res = await fetch(`${apiUrl}/jobs/${jobId}/posts`)
            if (!res.ok) throw new Error(`Failed to fetch posts (${res.status})`)

            const data = await res.json()

            // ✅ FILTER EMPTY POSTS HERE
            const filtered = data?.filter(post => {
                const titleValid = post?.reddit_title?.trim()
                // const descValid = post?.reddit_selftext?.trim()

                return titleValid
            })

            setPosts(filtered)

        } catch (err) {
            console.log('fetching posts error: ', err);
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchPosts() }, [jobId])

    const toggleApproved = async (post) => {
        const isCurrentlyApproved = !!post.user_approved
        const newValue = !isCurrentlyApproved

        // Check selection limit: Only block if the user is trying to approve (true)
        if (newValue === true) {
            const currentlyApprovedCount = posts.filter(p => p.user_approved).length
            if (currentlyApprovedCount >= MAX_SELECTION) {
                alert(`Selection limit reached. You can only select up to ${MAX_SELECTION} posts for summarization.`)
                return
            }
        }

        // Optimistic update
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, user_approved: newValue } : p))
        setToggling(prev => new Set(prev).add(post.id))

        try {
            const res = await fetch(`${apiUrl}/jobs/${post?.job_id}/posts/${post?.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_approved: newValue }),
            })

            if (!res.ok) throw new Error(`PATCH failed (${res.status})`)
        } catch {
            // Revert on failure
            setPosts(prev => prev.map(p => p.id === post.id ? { ...p, user_approved: isCurrentlyApproved } : p))
        } finally {
            setToggling(prev => { const next = new Set(prev); next.delete(post.id); return next })
        }
    }

    const toggleSelectAll = () => {
        const allApproved = posts.every(p => p.user_approved)

        if (allApproved) {
            // Unselect all is always allowed
            posts.forEach(post => {
                if (post.user_approved) toggleApproved({ ...post, user_approved: true })
            })
        } else {
            // Guard: If trying to select all, check if the list exceeds the limit
            if (posts.length > MAX_SELECTION) {
                alert(`Cannot select all. There are ${posts.length} posts, but the limit is ${MAX_SELECTION}.`)
                return
            }
            posts.forEach(post => {
                if (!post.user_approved) toggleApproved({ ...post, user_approved: false })
            })
        }
    }

    const handleSummarize = async () => {
        const approvedIds = posts.filter(p => p.user_approved).map(p => p.id)
        if (approvedIds.length === 0) return
        setSummarizing(true)
        setSummarizeError(null)
        setSummarizeSuccess(false)
        try {
            const res = await fetch(`${apiUrl}/jobs/${jobId}/generate-summary`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ job_id: jobId, post_ids: approvedIds }),
            })
            if (!res.ok) throw new Error(`Summarization failed (${res.status})`)
            setSummarizeSuccess(true)
        } catch (err) {
            setSummarizeError(err.message)
        } finally {
            setSummarizing(false)
        }
    }

    const toggleExpand = (id, e) => {
        e.stopPropagation()
        setExpanded(prev => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    const approvedCount = posts.filter(p => p.user_approved).length
    const allApproved = posts.length > 0 && approvedCount === posts.length
    const someApproved = approvedCount > 0 && !allApproved

    return (
        <div className="min-h-screen bg-[var(--background)] px-8 py-12">

            {/* Header */}
            <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-main)]">
                        Posts
                    </h1>
                    {jobId && (
                        <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                            Job ID: {jobId}
                        </p>
                    )}
                </div>

                {approvedCount > 0 && (
                    <button
                        onClick={handleSummarize}
                        disabled={summarizing}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white shadow-[var(--shadow-sm)] transition-all duration-150 hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {summarizing ? (
                            <>
                                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Summarizing…
                            </>
                        ) : (
                            <>
                                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                                Summarize {approvedCount}/{MAX_SELECTION}
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Success/Error Banners */}
            {summarizeSuccess && (
                <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-[var(--success-bg)] bg-[var(--success-bg)] px-4 py-3 text-sm text-[var(--success)]">
                    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Summarization request sent successfully.
                </div>
            )}

            {summarizeError && (
                <div className="mb-6 rounded-xl border border-[var(--destructive-bg)] bg-[var(--destructive-bg)] px-4 py-3 text-sm text-[var(--destructive)]">
                    {summarizeError}
                </div>
            )}

            {/* States */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="mb-3 h-5 w-5 animate-spin rounded-full border-2 border-[var(--border-solid)] border-t-[var(--primary)]" />
                    <span className="text-sm text-[var(--text-muted)]">Loading posts…</span>
                </div>
            )}

            {!loading && error && (
                <div className="rounded-xl border border-[var(--destructive-bg)] bg-[var(--destructive-bg)] px-5 py-4 text-sm text-[var(--destructive)]">
                    {error}
                </div>
            )}

            {!loading && !error && posts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 text-sm text-[var(--text-muted)]">
                    No posts found for this job.
                </div>
            )}

            {/* List */}
            {!loading && !error && posts.length > 0 && (
                <div className="overflow-hidden rounded-xl border border-[var(--border-solid)] bg-[var(--surface)] shadow-[var(--shadow)]">

                    <div className="flex items-center gap-3 border-b border-[var(--border-solid)] bg-[var(--surface-card)] px-5 py-3">
                        <button
                            onClick={toggleSelectAll}
                            className={`flex h-4 w-4 flex-shrink-0 cursor-pointer items-center justify-center rounded border transition-colors duration-150
                                ${allApproved || someApproved
                                    ? 'border-[var(--primary)] bg-[var(--primary)]'
                                    : 'border-[var(--border-solid)] bg-[var(--surface)]'
                                }`}
                        >
                            {allApproved && (
                                <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                            {someApproved && (
                                <span className="h-0.5 w-2 rounded-full bg-white" />
                            )}
                        </button>
                        <span className="text-xs text-[var(--text-muted)] font-medium">
                            {approvedCount} of {posts.length} selected (Limit {MAX_SELECTION})
                        </span>
                    </div>

                    {posts.map((post, i) => {
                        const isApproved = !!post.user_approved
                        const isExpanded = expanded.has(post.id)
                        const hasDesc = !!post.reddit_selftext
                        const isToggling = toggling.has(post.id)

                        return (
                            <div
                                key={post.id}
                                className={`border-b border-[var(--border-solid)] last:border-b-0 transition-colors duration-150
                                    ${isApproved ? 'bg-[var(--info-bg)]' : 'bg-[var(--surface)]'}`}
                            >
                                <div
                                    onClick={() => toggleApproved(post)}
                                    className={`flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors duration-150
                                        ${!isApproved ? 'hover:bg-[var(--surface-card)]' : ''}`}
                                >
                                    <div className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors duration-150
                                        ${isApproved
                                            ? 'border-[var(--primary)] bg-[var(--primary)]'
                                            : 'border-[var(--border-solid)] bg-[var(--surface)]'
                                        } ${isToggling ? 'opacity-50' : ''}`}
                                    >
                                        {isToggling ? (
                                            <span className="h-2 w-2 animate-spin rounded-full border border-white/40 border-t-white" />
                                        ) : isApproved ? (
                                            <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        ) : null}
                                    </div>

                                    <p className={`flex-1 text-sm leading-relaxed ${isApproved ? 'font-medium text-[var(--text-main)]' : 'text-[var(--text-main)]'}`}>
                                        {post.reddit_title}
                                    </p>

                                    {hasDesc && (
                                        <button
                                            onClick={(e) => toggleExpand(post.id, e)}
                                            className="ml-2 flex-shrink-0 cursor-pointer rounded p-0.5 text-[var(--text-muted)] transition-all duration-200 hover:text-[var(--primary)]"
                                        >
                                            <svg
                                                className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            >
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {hasDesc && isExpanded && (
                                    <div className="px-5 pb-4 pt-1 border-t border-[var(--border-solid)]/30">
                                        <p className="ml-8 text-xs leading-relaxed text-[var(--text-muted)] whitespace-pre-wrap">
                                            {post.reddit_selftext}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default PostsPage