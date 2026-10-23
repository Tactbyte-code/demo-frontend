import React from 'react'
import { Card, Notice, SectionHeader } from '@/features/validate/components/report/ui'
import { PairedBars } from '@/features/validate/components/report/charts'
import { paramShort } from '@/features/validate/components/report/config/parameters'

export default function WeightShiftChart({ breakdown }) {
  const dropped = breakdown.filter((p) => p.effective_weight === 0).map((p) => paramShort(p.parameter))
  return (
    <Card>
      <SectionHeader title="Weight redistribution" sub="Nominal weight vs the weight actually applied after excluding parameters with no data" />
      <PairedBars
        aLabel="Nominal weight"
        bLabel="Effective weight"
        fmt={(v) => `${Number(v.toFixed(1))}%`}
        rows={breakdown.map((p) => ({ label: paramShort(p.parameter), a: p.weight * 100, b: p.effective_weight * 100 }))}
      />
      {dropped.length > 0 && (
        <div className="mt-5">
          <Notice tone="slate">
            {dropped.join(', ')} had insufficient data, so {dropped.length > 1 ? 'their' : 'its'} weight was spread across the other parameters.
          </Notice>
        </div>
      )}
    </Card>
  )
}
