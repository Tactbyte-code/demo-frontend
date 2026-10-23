import React from 'react'
import { Card, LabelPill, SectionHeader, Stat } from '@/features/validate/components/report/ui'
import { fmtMoney, fmtNum } from '@/features/validate/components/report/lib/format'

export default function DerivedMetrics({ derived: d }) {
  if (!d) return null
  return (
    <Card>
      <SectionHeader title="Derived metrics" sub="Calculated from the assumed model" right={<LabelPill value="assumed" />} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Stat label="Lifetime value" value={fmtMoney(d.ltv, d.currency)} sub="per customer" />
        <Stat label="CAC payback" value={`${d.cac_payback_months} mo`} sub="to recover acquisition cost" />
        <Stat label="Break-even users" value={fmtNum(d.break_even_paying_users)} sub="paying users to cover burn" />
        <Stat label="LTV : CAC" value={`${d.ltv_cac_ratio}x`} sub="3x or above is generally healthy" tone="text-emerald-600" />
      </div>
    </Card>
  )
}
