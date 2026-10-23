import React from 'react'
import { Stat, StatGrid } from '@/features/validate/components/report/ui'

export default function DemandStats({ signals }) {
  const rising = signals.filter((s) => s.direction === 'rising').length
  const avg = signals.length ? signals.reduce((a, s) => a + (s.change_pct ?? 0), 0) / signals.length : null
  return (
    <StatGrid cols={3}>
      <Stat label="Signals tracked" value={signals.length} />
      <Stat label="Rising signals" value={`${rising} / ${signals.length}`} tone={rising ? 'text-emerald-600' : 'text-rose-600'} />
      <Stat label="Average change" value={avg == null ? '—' : `${avg > 0 ? '+' : ''}${avg.toFixed(1)}%`} sub="across all signals" />
    </StatGrid>
  )
}
