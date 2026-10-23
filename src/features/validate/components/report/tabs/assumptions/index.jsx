import React from 'react'
import { Stack, TwoCol } from '@/features/validate/components/report/ui'
import AssumptionsStats from './AssumptionsStats'
import AssumptionsTable from './AssumptionsTable'
import ImpactMatrix from './ImpactMatrix'
import BasisMix from './BasisMix'

export default function AssumptionsTab({ report }) {
  const items = report.assumptions ?? []
  return (
    <Stack>
      <AssumptionsStats items={items} />
      <AssumptionsTable items={items} />
      <TwoCol className="lg:grid-cols-[2fr_1fr]">
        <ImpactMatrix items={items} />
        <BasisMix items={items} />
      </TwoCol>
    </Stack>
  )
}
