import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { HBarList } from '@/features/validate/components/report/charts'
import { CHART } from '@/features/validate/components/report/lib/tones'

export default function SignalChangeChart({ signals }) {
  if (signals.length < 2) return null
  return (
    <Card>
      <SectionHeader title="Momentum comparison" sub="Change over the tracked period, per signal" />
      <HBarList
        labelWidth="w-72"
        rows={signals.map((s) => ({
          label: s.name,
          value: Math.abs(s.change_pct ?? 0),
          display: `${s.change_pct > 0 ? '+' : ''}${s.change_pct}%`,
          color: s.direction === 'rising' ? CHART.emerald : CHART.rose,
        }))}
      />
    </Card>
  )
}
