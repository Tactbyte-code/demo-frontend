import React from 'react'
import { Caveats, Stack, TwoCol } from '@/features/validate/components/report/ui'
import ParameterHeader from '../shared/ParameterHeader'
import CompetitionStats from './CompetitionStats'
import LandscapeCharts from './LandscapeCharts'
import PriceComparison from './PriceComparison'
import CompetitorGrid from './CompetitorGrid'
import IndirectAlternatives from './IndirectAlternatives'
import DifferentiationGaps from './DifferentiationGaps'
import PhysicalDensity from './PhysicalDensity'

export default function CompetitionTab({ report }) {
  const c = report.parameters.competition
  const direct = c.direct_competitors ?? []
  return (
    <Stack>
      <ParameterHeader paramKey="competition" score={c.score} confidence={c.confidence} />
      <CompetitionStats competition={c} />
      <TwoCol>
        <LandscapeCharts counts={c.counts} direct={direct} />
        <PriceComparison competitors={direct} />
      </TwoCol>
      <CompetitorGrid competitors={direct} totalDirect={c.counts?.direct} />
      <TwoCol>
        <IndirectAlternatives items={c.indirect_alternatives} />
        <DifferentiationGaps items={c.differentiation_gaps} />
      </TwoCol>
      <PhysicalDensity density={c.physical_density} />
      <Caveats items={c.caveats} />
    </Stack>
  )
}
