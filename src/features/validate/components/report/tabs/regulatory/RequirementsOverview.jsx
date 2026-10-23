import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { DonutChart } from '@/features/validate/components/report/charts'
import { appliesUi } from './appliesUi'

export default function RequirementsOverview({ requirements }) {
  const buckets = {}
  requirements.forEach((q) => {
    const u = appliesUi(q.applies)
    buckets[u.key] = { label: u.text, color: u.color, value: (buckets[u.key]?.value ?? 0) + 1 }
  })
  return (
    <Card>
      <SectionHeader title="Obligations at a glance" sub="How many requirements apply" />
      <DonutChart size={140} data={Object.values(buckets)}>
        <span className="text-2xl font-bold">{requirements.length}</span>
        <span className="text-[10px] text-slate-500">requirements</span>
      </DonutChart>
    </Card>
  )
}
