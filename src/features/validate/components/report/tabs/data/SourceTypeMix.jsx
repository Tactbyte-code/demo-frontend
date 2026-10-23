import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { DonutChart } from '@/features/validate/components/report/charts'
import { PALETTE } from '@/features/validate/components/report/lib/tones'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function SourceTypeMix({ sources }) {
  const counts = sources.reduce((acc, s) => ({ ...acc, [s.type]: (acc[s.type] ?? 0) + 1 }), {})
  return (
    <Card>
      <SectionHeader title="Source types" sub={`${sources.length} sources behind this report`} />
      <DonutChart size={140} data={Object.entries(counts).map(([k, v], i) => ({ label: titleCase(k), value: v, color: PALETTE[i % PALETTE.length] }))}>
        <span className="text-2xl font-bold">{sources.length}</span>
        <span className="text-[10px] text-slate-500">sources</span>
      </DonutChart>
    </Card>
  )
}
