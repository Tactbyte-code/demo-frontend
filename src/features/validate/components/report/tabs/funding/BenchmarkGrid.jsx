import React from 'react'
import { Card, LabelPill, Pill, SectionHeader, SourceChips } from '@/features/validate/components/report/ui'
import { Gauge } from '@/features/validate/components/report/charts'
import { CHART } from '@/features/validate/components/report/lib/tones'

export default function BenchmarkGrid({ benchmarks }) {
  if (!benchmarks?.length) return null
  return (
    <Card>
      <SectionHeader title="Reference benchmarks" sub="For context only; not scored" />
      <div className="grid gap-4 md:grid-cols-2">
        {benchmarks.map((b, i) => (
          <div key={i} className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-slate-800">{b.metric}</p>
              <Pill>{b.region}</Pill>
            </div>
            <Gauge value={b.value_pct} max={100} display={`${b.value_pct}%`} color={CHART.slate} size={200} />
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <LabelPill value={b.label} />
              {b.reference_only && <Pill>Reference only</Pill>}
            </div>
            <div className="mt-3">
              <SourceChips ids={b.source_ids} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
