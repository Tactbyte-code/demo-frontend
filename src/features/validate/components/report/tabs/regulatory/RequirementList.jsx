import React from 'react'
import { Card, Pill, SectionHeader, SourceChips } from '@/features/validate/components/report/ui'
import { appliesUi } from './appliesUi'

export default function RequirementList({ requirements, sourceIds }) {
  return (
    <Card>
      <SectionHeader title="Requirements checklist" sub="Whether each obligation applies to this idea" />
      <div className="divide-y divide-slate-100">
        {requirements.map((q, i) => {
          const ui = appliesUi(q.applies)
          return (
            <div key={i} className="flex flex-wrap items-start justify-between gap-3 py-4">
              <div className="max-w-2xl">
                <p className="font-medium text-slate-800">{q.item}</p>
                <p className="mt-0.5 text-sm text-slate-500">{q.note}</p>
              </div>
              <Pill tone={ui.tone}>{ui.text}</Pill>
            </div>
          )
        })}
      </div>
      <div className="mt-3">
        <SourceChips ids={sourceIds} />
      </div>
    </Card>
  )
}
