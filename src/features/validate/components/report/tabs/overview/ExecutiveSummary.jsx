import React from 'react'
import { Card, SectionHeader, SourceChips } from '@/features/validate/components/report/ui'

export default function ExecutiveSummary({ summary, citations }) {
  if (!summary) return null
  return (
    <Card>
      <SectionHeader title="What this report says" sub="Executive summary" />
      <p className="leading-relaxed text-slate-700">{summary}</p>
      <div className="mt-4">
        <SourceChips ids={citations} />
      </div>
    </Card>
  )
}
