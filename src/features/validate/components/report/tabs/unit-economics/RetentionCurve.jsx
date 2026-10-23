import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { LineChart } from '@/features/validate/components/report/charts'
import { CHART } from '@/features/validate/components/report/lib/tones'

export default function RetentionCurve({ model: m }) {
  if (m?.monthly_churn_pct == null) return null
  const churn = m.monthly_churn_pct / 100
  const data = Array.from({ length: 13 }, (_, i) => ({ label: `M${i}`, value: 100 * Math.pow(1 - churn, i) }))
  return (
    <Card>
      <SectionHeader title="Customer retention" sub={`Share of a cohort still subscribed, at ${m.monthly_churn_pct}% monthly churn (derived)`} />
      <LineChart data={data} color={CHART.violet} fmt={(v) => `${Number(v.toFixed(0))}%`} showValues={false} />
      <p className="mt-2 text-center text-xs text-slate-500">After 12 months about {data[12].value.toFixed(0)}% of customers remain.</p>
    </Card>
  )
}
