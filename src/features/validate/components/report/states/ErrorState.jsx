import React from 'react'
import { Notice } from '@/features/validate/components/report/ui'

export default function ErrorState({ title = 'Could not load this report', error, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-xl px-4 py-24">
        <Notice tone="rose" title={title}>
          <p>{error?.message ?? children ?? 'Something went wrong while fetching the report.'}</p>
          <button onClick={() => window.location.reload()} className="mt-3 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700">
            Try again
          </button>
        </Notice>
      </div>
    </div>
  )
}
