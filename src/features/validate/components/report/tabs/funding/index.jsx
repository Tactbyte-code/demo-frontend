import React from 'react'
import { Notice, Stack } from '@/features/validate/components/report/ui'
import ParameterHeader from '../shared/ParameterHeader'
import FundingStatus from './FundingStatus'
import BenchmarkGrid from './BenchmarkGrid'
import FundingActivity from './FundingActivity'

export default function FundingTab({ report }) {
  const f = report.parameters.survival_funding
  const insufficient = f.score == null
  return (
    <Stack>
      <ParameterHeader paramKey="survival_funding" score={f.score} />
      <FundingStatus status={f.status} score={f.score} />
      {insufficient && (
        <Notice tone="amber" title="Not enough data">
          {f.reason}
        </Notice>
      )}
      <BenchmarkGrid benchmarks={f.reference_benchmarks} />
      <FundingActivity activity={f.funding_activity} />
    </Stack>
  )
}
