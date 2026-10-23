'use client'

import React from 'react'
import { Card, SectionHeader, SourceChips } from '@/features/validate/components/report/ui'
import { useReport } from '@/features/validate/components/report/context/ReportContext'
import { scoreTone } from '@/features/validate/components/report/lib/tones'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function SectionHighlights({ sections }) {
  const { breakdownByKey } = useReport()
  const entries = Object.entries(sections ?? {})
  if (!entries.length) return null
  return (
    <Card>
      <SectionHeader title="Highlights by section" sub="Narrative summary of key parameters" />
      <div className="grid gap-4 md:grid-cols-2">
        {entries.map(([k, v]) => {
          const b = breakdownByKey[k]
          return (
            <div key={k} className="rounded-xl bg-slate-50 p-4">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800">{b?.label ?? titleCase(k)}</p>
                {b?.score != null && <span className={`text-sm font-bold ${scoreTone(b.score).text}`}>{b.score}</span>}
              </div>
              <p className="mb-3 text-sm text-slate-600">{v.summary}</p>
              <SourceChips ids={v.source_ids} />
            </div>
          )
        })}
      </div>
    </Card>
  )
}
