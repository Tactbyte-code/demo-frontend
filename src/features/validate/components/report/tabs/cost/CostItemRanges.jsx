import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { RangeChart } from '@/features/validate/components/report/charts'
import { PALETTE } from '@/features/validate/components/report/lib/tones'
import { fmtMoney } from '@/features/validate/components/report/lib/format'

export default function CostItemRanges({ title, rows = [], currency }) {
  return (
    <Card>
      <SectionHeader title={title} sub="Low–high range per item on a shared scale; marker = base estimate" />
      <RangeChart fmt={(v) => fmtMoney(v, currency)} rows={rows.map((r, i) => ({ label: r.item, low: r.low, base: r.base, high: r.high, color: PALETTE[i % PALETTE.length] }))} />
    </Card>
  )
}
