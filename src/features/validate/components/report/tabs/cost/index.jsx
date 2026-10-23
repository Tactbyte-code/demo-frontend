import React from 'react'
import { Stack, TwoCol } from '@/features/validate/components/report/ui'
import ParameterHeader from '../shared/ParameterHeader'
import CostTotals from './CostTotals'
import RunwayNotice from './RunwayNotice'
import CumulativeCostChart from './CumulativeCostChart'
import CostSplit from './CostSplit'
import CostItemRanges from './CostItemRanges'
import CostTable from './CostTable'

export default function CostTab({ report }) {
  const c = report.parameters.cost

  // Extract and filter the actual array of items based on their kind
  const items = c.items || []
  const oneTimeItems = items.filter(item => item.kind === 'one_time')
  const monthlyItems = items.filter(item => item.kind === 'monthly')

  return (
    <Stack>
      <ParameterHeader paramKey="cost" score={c.score} confidence={c.confidence} />
      {/* Assuming totals comes from somewhere in c, or needs to be calculated */}
      <CostTotals totals={c} currency={c.currency} />
      <RunwayNotice months={c.runway_months} note={c.runway_note} />
      <CumulativeCostChart totals={c.first_12_months} currency={c.currency} />

      <TwoCol>
        {/* Pass the filtered arrays instead of the summary objects */}
        <CostSplit title="One-time split" sub="Share of base one-time cost" rows={oneTimeItems} currency={c.currency} />
        <CostSplit title="Monthly split" sub="Share of base monthly burn" rows={monthlyItems} currency={c.currency} />
      </TwoCol>

      <TwoCol>
        <CostItemRanges title="One-time cost ranges" rows={oneTimeItems} currency={c.currency} />
        <CostItemRanges title="Monthly cost ranges" rows={monthlyItems} currency={c.currency} />
      </TwoCol>

      <CostTable title="One-time costs" rows={oneTimeItems} currency={c.currency} />
      <CostTable title="Monthly costs" rows={monthlyItems} currency={c.currency} />
    </Stack>
  )
}