import React from 'react'

export const SkeletonBlock = ({ className }) => (
    <div className={`bg-[var(--surface-raised)] rounded-[var(--radius)] animate-pulse ${className}`} />
)

export const SkeletonSummary = () => (
    <div className="max-w-full mx-auto p-6 md:p-16">
        <SkeletonBlock className="h-10 w-10 rounded-full mb-8" />
        <div className="flex items-center justify-between gap-6 mb-12">
            <div className="space-y-4 flex-1">
                <SkeletonBlock className="h-6 w-32 rounded-full" />
                <SkeletonBlock className="h-10 w-3/4" />
                <SkeletonBlock className="h-4 w-48" />
            </div>
            <SkeletonBlock className="h-[120px] w-[120px] rounded-full" />
        </div>
        <div className="flex gap-3 mb-8">
            {[...Array(5)].map((_, i) => (
                <SkeletonBlock key={i} className="h-10 w-28 rounded-full" />
            ))}
        </div>
        <div className="space-y-4 p-6 border border-[var(--border)] rounded-[var(--radius)]">
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-3/4" />
        </div>
    </div>
)