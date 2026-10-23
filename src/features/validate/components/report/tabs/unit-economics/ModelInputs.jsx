import React from 'react'
import { Card, KeyValueList, LabelPill, SectionHeader } from '@/features/validate/components/report/ui'
import { fmtMoney } from '@/features/validate/components/report/lib/format'

export default function ModelInputs({ model: m }) {
  if (!m) return null
  return (
    <Card>
      <SectionHeader title="Unit economics model" sub="Editable inputs" right={<LabelPill value={m.label} />} />
      <KeyValueList
        items={[
          ['ARPU (monthly)', fmtMoney(m.arpu_monthly, m.currency)],
          ['Gross margin', `${m.gross_margin_pct}%`],
          ['Gross profit per customer / month', fmtMoney((m.arpu_monthly * m.gross_margin_pct) / 100, m.currency)],
          ['Monthly churn', `${m.monthly_churn_pct}%`],
          ['Customer acquisition cost', fmtMoney(m.cac, m.currency)],
        ]}
      />
    </Card>
  )
}
