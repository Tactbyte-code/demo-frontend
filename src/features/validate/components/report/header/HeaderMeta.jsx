import React from 'react'
import { Pill } from '@/features/validate/components/report/ui'
import { fmtDate, titleCase } from '@/features/validate/components/report/lib/format'

export default function HeaderMeta({ status, generatedAt }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
      <Pill tone="bg-emerald-50 text-emerald-700 ring-emerald-200">{titleCase(status)}</Pill>
      <span>Generated {fmtDate(generatedAt)}</span>
      <span>·</span>
      <span>Idea validation report</span>
      <button
        onClick={() => window.print()}
        className="ml-auto rounded-lg border border-slate-200 px-3 py-1 font-medium text-slate-600 hover:bg-slate-50 print:hidden"
      >
        Print / save PDF
      </button>
    </div>
  )
}
