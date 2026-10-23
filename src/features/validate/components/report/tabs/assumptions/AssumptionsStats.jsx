import React from 'react'
import { Stat, StatGrid } from '@/features/validate/components/report/ui'

export default function AssumptionsStats({ items }) {
  const assumed = items.filter((a) => a.label === 'assumed').length
  const editable = items.filter((a) => a.editable).length
  return (
    <StatGrid cols={3}>
      <Stat label="Assumptions" value={items.length} />
      <Stat label="Purely assumed" value={assumed} sub="no source behind them" tone="text-amber-600" />
      <Stat label="Editable" value={`${editable} / ${items.length}`} sub="change one and figures recalculate" />
    </StatGrid>
  )
}
