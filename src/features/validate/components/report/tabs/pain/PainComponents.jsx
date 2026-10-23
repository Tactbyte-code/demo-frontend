import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { HBarList, RadarChart } from '@/features/validate/components/report/charts'
import { CHART } from '@/features/validate/components/report/lib/tones'
import { titleCase } from '@/features/validate/components/report/lib/format'

const LABELS = { volume: 'Volume', intensity: 'Intensity', breadth: 'Breadth', payment: 'Payment signal', gap: 'Solution gap' }
const colorFor = (v) => (v >= 0.7 ? CHART.emerald : v >= 0.5 ? CHART.indigo : CHART.amber)

export default function PainComponents({ components }) {
  const entries = Object.entries(components ?? {})
  return (
    <Card>
      <SectionHeader title="Score components" sub="0 to 1 scale — what makes up the pain score" />
      <RadarChart max={1} axes={entries.map(([k, v]) => ({ label: LABELS[k] ?? titleCase(k), value: v }))} />
      <div className="mt-4">
        <HBarList
          max={1}
          labelWidth="w-28"
          rows={entries.map(([k, v]) => ({ label: LABELS[k] ?? titleCase(k), value: v, display: v.toFixed(2), color: colorFor(v) }))}
        />
      </div>
    </Card>
  )
}
