import React from 'react'
import { Caveats, Stack, TwoCol } from '@/features/validate/components/report/ui'
import ParameterHeader from '../shared/ParameterHeader'
import PainStats from './PainStats'
import PainComponents from './PainComponents'
import EvidenceFunnel from './EvidenceFunnel'
import SourceBreakdown from './SourceBreakdown'
import ThemesSection from './ThemesSection'
import TopEvidence from './TopEvidence'

export default function PainTab({ report }) {
  const p = report.parameters.pain
  return (
    <Stack>
      <ParameterHeader paramKey="pain" score={p.score} confidence={p.confidence} />
      <PainStats pain={p} />
      <TwoCol>
        <PainComponents components={p.components} />
        <div className="space-y-6">
          <EvidenceFunnel counts={p.counts} />
          <SourceBreakdown bySource={p.counts?.by_source} />
        </div>
      </TwoCol>
      <ThemesSection themes={p.themes} />
      <TopEvidence items={p.top_evidence} />
      <Caveats items={p.caveats} />
    </Stack>
  )
}
