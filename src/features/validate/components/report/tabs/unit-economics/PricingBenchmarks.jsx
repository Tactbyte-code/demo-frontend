import React from 'react'
import { Card, LabelPill, SectionHeader, SourceChips, Stat } from '@/features/validate/components/report/ui'
import { DonutChart, RangeBar } from '@/features/validate/components/report/charts'
import { PALETTE } from '@/features/validate/components/report/lib/tones'
import { fmtMoney, titleCase } from '@/features/validate/components/report/lib/format'

export default function PricingBenchmarks({ benchmarks: pb }) {
  if (!pb) return null
  const price = pb.monthly_price ?? {}
  return (
    <Card>
      <SectionHeader title="Pricing benchmarks" sub={`${pb.sample_size} competitor price points`} right={<LabelPill value={pb.label} />} />
      <div className="mb-4 grid grid-cols-3 gap-3">
        <Stat label="Min" value={fmtMoney(price.min, price.currency)} />
        <Stat label="Median" value={fmtMoney(price.median, price.currency)} tone="text-indigo-600" />
        <Stat label="Max" value={fmtMoney(price.max, price.currency)} />
      </div>
      <RangeBar low={price.min} base={price.median} high={price.max} fmt={(v) => fmtMoney(v, price.currency)} labels={['Min', 'Median', 'Max']} />
      <div className="mt-6 border-t border-slate-100 pt-4">
        <p className="mb-3 text-sm font-medium text-slate-800">Pricing models in the market</p>
        <DonutChart size={120} thickness={18} data={Object.entries(pb.models ?? {}).map(([k, v], i) => ({ label: titleCase(k), value: v, color: PALETTE[i % PALETTE.length] }))} />
      </div>
      <div className="mt-3">
        <SourceChips ids={pb.source_ids} />
      </div>
    </Card>
  )
}
