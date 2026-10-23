import React from 'react'
import { Stack } from '@/features/validate/components/report/ui'
import ParameterHeader from '../shared/ParameterHeader'
import OutlookCard from './OutlookCard'
import IndicatorGrid from './IndicatorGrid'
import TimingNotes from './TimingNotes'

export default function MacroTab({ report }) {
  const m = report.parameters.macro
  return (
    <Stack>
      <ParameterHeader paramKey="macro" score={m.score} confidence={m.confidence} />
      <OutlookCard outlook={m.outlook} />
      <IndicatorGrid indicators={m.indicators} />
      <TimingNotes notes={m.timing_notes} />
    </Stack>
  )
}
