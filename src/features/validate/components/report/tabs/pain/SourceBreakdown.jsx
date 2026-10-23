import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { DonutChart } from '@/features/validate/components/report/charts'
import { PALETTE } from '@/features/validate/components/report/lib/tones'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function SourceBreakdown({ bySource }) {
  const entries = Object.entries(bySource ?? {})
  if (!entries.length) return null
  const total = entries.reduce((a, [, v]) => a + v, 0)
  return (
    <Card>
      <SectionHeader title="Posts by source" sub="Where the evidence was collected from" />
      <DonutChart data={entries.map(([k, v], i) => ({ label: titleCase(k), value: v, color: PALETTE[i % PALETTE.length] }))}>
        <span className="text-2xl font-bold text-slate-900">{total}</span>
        <span className="text-[10px] text-slate-500">posts</span>
      </DonutChart>
    </Card>
  )
}
