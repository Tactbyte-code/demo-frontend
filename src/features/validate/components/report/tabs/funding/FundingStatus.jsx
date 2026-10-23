import React from 'react'
import { Stat, StatGrid } from '@/features/validate/components/report/ui'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function FundingStatus({ status, score }) {
  return (
    <StatGrid cols={2}>
      <Stat label="Data status" value={titleCase(status)} tone={status === 'scored' ? 'text-emerald-600' : 'text-slate-500'} />
      <Stat label="Score" value={score ?? 'N/A'} sub={score == null ? 'excluded from the overall score' : undefined} tone="text-slate-500" />
    </StatGrid>
  )
}
