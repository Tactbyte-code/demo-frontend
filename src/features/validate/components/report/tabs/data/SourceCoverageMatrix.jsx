import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { Heatmap } from '@/features/validate/components/report/charts'
import { PARAM_ORDER, paramShort } from '@/features/validate/components/report/config/parameters'

export default function SourceCoverageMatrix({ sources }) {
  const used = new Set(sources.flatMap((s) => s.used_for ?? []))
  const cols = PARAM_ORDER.filter((k) => used.has(k)).map((k) => ({ key: k, label: paramShort(k) }))
  return (
    <Card>
      <SectionHeader title="Source coverage" sub="Which sources fed which parameter" />
      <Heatmap
        rows={sources.map((s, i) => ({ key: String(i), label: s.name }))}
        cols={cols}
        isOn={(rowKey, colKey) => sources[Number(rowKey)].used_for?.includes(colKey)}
        onClass="bg-emerald-500"
      />
    </Card>
  )
}
