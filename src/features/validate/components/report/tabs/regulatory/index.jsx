import React from 'react'
import { Notice, Stack, TwoCol } from '@/features/validate/components/report/ui'
import ParameterHeader from '../shared/ParameterHeader'
import RegulatoryStats from './RegulatoryStats'
import RequirementsOverview from './RequirementsOverview'
import RequirementList from './RequirementList'

export default function RegulatoryTab({ report }) {
  const r = report.parameters.regulatory
  return (
    <Stack>
      <ParameterHeader paramKey="regulatory" score={r.score} confidence={r.confidence} />
      <RegulatoryStats complexity={r.complexity} legalReview={r.legal_review_recommended} />
      {r.legal_review_recommended && (
        <Notice tone="amber" title="Legal review recommended">
          Confirm these requirements with a qualified professional before launch.
        </Notice>
      )}
      <TwoCol className="lg:grid-cols-[1fr_2fr]">
        <RequirementsOverview requirements={r.requirements ?? []} />
        <RequirementList requirements={r.requirements ?? []} sourceIds={r.source_ids} />
      </TwoCol>
    </Stack>
  )
}
