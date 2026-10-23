import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { Gauge } from '@/features/validate/components/report/charts'
import { CHART } from '@/features/validate/components/report/lib/tones'
import { titleCase } from '@/features/validate/components/report/lib/format'

const LABELS = { size_adequacy: 'Size adequacy', growth: 'Growth', data_agreement: 'Data agreement' }

export default function MarketComponents({ components }) {
  const entries = Object.entries(components ?? {})
  if (!entries.length) return null
  return (
    <Card>
      <SectionHeader title="Score components" sub="0 to 1 scale — what drove the market score" />
      <div className="grid gap-6 sm:grid-cols-3">
        {entries.map(([k, v]) => (
          <div key={k} className="text-center">
            <Gauge value={v} max={1} display={v.toFixed(2)} color={v >= 0.7 ? CHART.emerald : v >= 0.5 ? CHART.indigo : CHART.amber} size={170} />
            <p className="mt-1 text-sm font-medium text-slate-700">{LABELS[k] ?? titleCase(k)}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
