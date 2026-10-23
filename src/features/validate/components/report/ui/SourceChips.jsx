'use client'

import React from 'react'
import { useReport } from '@/features/validate/components/report/context/ReportContext'

/** Resolves source ids against report.sources and renders them as small links. */
export default function SourceChips({ ids }) {
  const { sourceMap } = useReport()
  const resolved = (ids || []).map((id) => sourceMap[id]).filter(Boolean)
  if (!resolved.length) return null
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-xs text-slate-400">Sources:</span>
      {resolved.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          title={s.name}
          className="max-w-[220px] truncate rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200"
        >
          {s.name}
        </a>
      ))}
    </div>
  )
}
