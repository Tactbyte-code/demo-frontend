import React from 'react'
import { Stack, TwoCol } from '@/features/validate/components/report/ui'
import ExecutiveSummary from './ExecutiveSummary'
import ScoreRadar from './ScoreRadar'
import ContributionChart from './ContributionChart'
import StrengthsRisks from './StrengthsRisks'
import ScoreBreakdownTable from './ScoreBreakdownTable'
import WeightShiftChart from './WeightShiftChart'
import SectionHighlights from './SectionHighlights'
import NextSteps from './NextSteps'

export default function OverviewTab({ report }) {
  const { overall, narrative } = report
  return (
    <Stack>
      <ExecutiveSummary summary={narrative?.executive_summary} citations={narrative?.citations} />
      <TwoCol>
        <ScoreRadar breakdown={overall.score_breakdown} />
        <ContributionChart breakdown={overall.score_breakdown} viability={overall.viability_score} />
      </TwoCol>
      <StrengthsRisks strengths={overall.strengths} risks={overall.risks} />
      <ScoreBreakdownTable breakdown={overall.score_breakdown} />
      <WeightShiftChart breakdown={overall.score_breakdown} />
      <SectionHighlights sections={narrative?.sections} />
      <NextSteps steps={narrative?.next_steps} />
    </Stack>
  )
}
