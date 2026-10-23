import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { LineChart } from '@/features/validate/components/report/charts'
import { CHART } from '@/features/validate/components/report/lib/tones'
import { fmtMoney } from '@/features/validate/components/report/lib/format'

export default function PaybackChart({ model: m, derived: d }) {
  if (m?.arpu_monthly == null || m?.cac == null) return null
  const gp = (m.arpu_monthly * m.gross_margin_pct) / 100
  const data = Array.from({ length: 13 }, (_, i) => ({ label: `M${i}`, value: gp * i - m.cac }))
  return (
    <Card>
      <SectionHeader
        title="Payback per customer"
        sub={`Cumulative gross profit minus CAC${d?.cac_payback_months ? ` — breaks even around month ${d.cac_payback_months}` : ''} (derived, ignores churn)`}
      />
      <LineChart data={data} color={CHART.emerald} fmt={(v) => fmtMoney(Math.round(v), m.currency)} showValues={false} />
    </Card>
  )
}
