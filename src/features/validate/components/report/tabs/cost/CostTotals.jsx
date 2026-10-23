import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { RangeBar } from '@/features/validate/components/report/charts'
import { fmtMoney } from '@/features/validate/components/report/lib/format'

export default function CostTotals({ totals, currency }) {
  if (!totals) return null
  const items = [
    ['One-time costs', totals.one_time],
    ['Monthly burn', totals.monthly_burn],
    ['First 12 months', totals.first_12_months],
  ]
  return (
    <Card>
      <SectionHeader title="Cost totals" sub="Low / base / high scenarios" />
      <div className="grid gap-6 lg:grid-cols-3">
        {items.map(([label, t]) => (
          <div key={label} className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{fmtMoney(t.base, currency)}</p>
            <div className="mt-3">
              <RangeBar low={t.low} base={t.base} high={t.high} fmt={(v) => fmtMoney(v, currency)} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
