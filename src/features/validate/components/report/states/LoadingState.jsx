import React from 'react'

const Block = ({ className }) => <div className={`animate-pulse rounded-2xl bg-slate-200/70 ${className}`} />

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6" aria-busy="true">
        <Block className="h-6 w-64" />
        <div className="grid gap-8 lg:grid-cols-[1fr_288px]">
          <div className="space-y-4">
            <Block className="h-10 w-3/4" />
            <Block className="h-4 w-1/2" />
            <div className="grid gap-3 sm:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <Block key={i} className="h-20" />
              ))}
            </div>
          </div>
          <Block className="h-96" />
        </div>
        <Block className="h-72" />
      </div>
    </div>
  )
}
