import React from 'react'
import { Stack, TwoCol } from '@/features/validate/components/report/ui'
import ParameterHeader from '../shared/ParameterHeader'
import DemandStats from './DemandStats'
import SearchInterestNotice from './SearchInterestNotice'
import SignalChangeChart from './SignalChangeChart'
import SignalCard from './SignalCard'

export default function DemandTab({ report }) {
  const d = report.parameters.demand
  return (
    <Stack>
      <ParameterHeader paramKey="demand" score={d.score} confidence={d.confidence} />
      <DemandStats signals={d.signals ?? []} />
      <SearchInterestNotice searchInterest={d.search_interest} />
      <SignalChangeChart signals={d.signals ?? []} />
      <TwoCol>
        {(d.signals ?? []).map((s, i) => (
          <SignalCard key={i} signal={s} />
        ))}
      </TwoCol>
    </Stack>
  )
}
