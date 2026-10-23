import React from 'react'
import { Card, Pill, SectionHeader, SourceChips } from '@/features/validate/components/report/ui'
import { LineChart } from '@/features/validate/components/report/charts'
import { CHART } from '@/features/validate/components/report/lib/tones'

export default function SignalCard({ signal: s }) {
  const rising = s.direction === 'rising'
  const series = (s.series ?? []).map((p) => ({ label: p.period, value: p.value }))
  const first = series[0]
  const last = series[series.length - 1]
  return (
    <Card>
      <SectionHeader
        title={s.name}
        sub={first && last ? `${first.label}: ${first.value} → ${last.label}: ${last.value}` : undefined}
        right={
          <Pill tone={rising ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-rose-50 text-rose-700 ring-rose-200'}>
            {rising ? '▲' : '▼'} {s.change_pct > 0 ? '+' : ''}{s.change_pct}%
          </Pill>
        }
      />
      {series.length > 0 && <LineChart data={series} color={rising ? CHART.emerald : CHART.rose} />}
      <div className="mt-3">
        <SourceChips ids={s.source_ids} />
      </div>
    </Card>
  )
}
