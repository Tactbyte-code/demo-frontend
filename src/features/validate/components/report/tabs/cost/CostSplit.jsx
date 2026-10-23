import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { DonutChart } from '@/features/validate/components/report/charts'
import { PALETTE } from '@/features/validate/components/report/lib/tones'
import { fmtMoney } from '@/features/validate/components/report/lib/format'

export default function CostSplit({ title, sub, rows = [], currency }) {
  const total = rows.reduce((a, r) => a + r.base, 0)
  return (
    <Card>
      <SectionHeader title={title} sub={sub} />
      <DonutChart
        size={160}
        format={(v) => fmtMoney(v, currency)}
        data={rows.map((r, i) => ({ label: r.item, value: r.base, color: PALETTE[i % PALETTE.length] }))}
      >
        <span className="text-lg font-bold text-slate-900">{fmtMoney(total, currency)}</span>
        <span className="text-[10px] text-slate-500">base total</span>
      </DonutChart>
    </Card>
  )
}
