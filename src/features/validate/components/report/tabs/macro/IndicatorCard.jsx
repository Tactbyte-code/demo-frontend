import React from 'react'
import { Card, LabelPill, Pill, SourceChips } from '@/features/validate/components/report/ui'
import { Gauge } from '@/features/validate/components/report/charts'
import { CHART } from '@/features/validate/components/report/lib/tones'

/** Pick a readable gauge ceiling for a percentage indicator (10, 20, 50 or 100). */
const niceMax = (v) => [10, 20, 50, 100].find((m) => v * 1.25 <= m) ?? 100

export default function IndicatorCard({ indicator: i }) {
  return (
    <Card>
      <p className="min-h-[2.5rem] text-sm text-slate-500">{i.name}</p>
      <Gauge value={i.value} max={niceMax(i.value)} display={`${i.value}%`} color={CHART.sky} size={210} />
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
        <Pill>{i.year}</Pill>
        <LabelPill value={i.label} />
        <span className="font-mono">{i.indicator_code}</span>
      </div>
      <div className="mt-3">
        <SourceChips ids={i.source_ids} />
      </div>
    </Card>
  )
}
