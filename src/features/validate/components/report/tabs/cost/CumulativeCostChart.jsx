import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { BandLineChart } from '@/features/validate/components/report/charts'
import { fmtMoney } from '@/features/validate/components/report/lib/format'

/** Cumulative spend over 12 months = one-time + monthly burn x month, for each scenario (derived). */
export default function CumulativeCostChart({ totals, currency }) {
  if (!totals?.one_time || !totals?.monthly_burn) return null
  const months = Array.from({ length: 13 }, (_, i) => i)
  const curve = (k) => months.map((m) => totals.one_time[k] + totals.monthly_burn[k] * m)
  return (
    <Card>
      <SectionHeader title="Cumulative spend, first 12 months" sub="One-time costs up front, then monthly burn — low, base and high scenarios (derived)" />
      <BandLineChart labels={months.map((m) => `M${m}`)} low={curve('low')} base={curve('base')} high={curve('high')} fmt={(v) => fmtMoney(Math.round(v), currency)} />
    </Card>
  )
}
