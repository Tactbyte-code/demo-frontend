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
  return (
    <Stack>
      <ParameterHeader paramKey="cost" score={c.score} confidence={c.confidence} />
      <CostTotals totals={c.totals} currency={c.currency} />
      <RunwayNotice months={c.runway_months} note={c.runway_note} />
      <CumulativeCostChart totals={c.totals} currency={c.currency} />
      <TwoCol>
        <CostSplit title="One-time split" sub="Share of base one-time cost" rows={c.one_time} currency={c.currency} />
        <CostSplit title="Monthly split" sub="Share of base monthly burn" rows={c.monthly} currency={c.currency} />
      </TwoCol>
      <TwoCol>
        <CostItemRanges title="One-time cost ranges" rows={c.one_time} currency={c.currency} />
        <CostItemRanges title="Monthly cost ranges" rows={c.monthly} currency={c.currency} />
      </TwoCol>
      <CostTable title="One-time costs" rows={c.one_time} currency={c.currency} />
      <CostTable title="Monthly costs" rows={c.monthly} currency={c.currency} />
    </Stack>
  )
}
