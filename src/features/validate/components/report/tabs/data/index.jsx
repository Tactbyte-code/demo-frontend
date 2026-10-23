import React from 'react'
import { Stack, TwoCol } from '@/features/validate/components/report/ui'
import DataQualityCard from './DataQualityCard'
import CoverageGauges from './CoverageGauges'
import SourceTypeMix from './SourceTypeMix'
import SourcesGrid from './SourcesGrid'
import SourceCoverageMatrix from './SourceCoverageMatrix'
import GenerationCard from './GenerationCard'

export default function DataTab({ report }) {
  const q = report.data_quality ?? {}
  const sources = report.sources ?? []
  return (
    <Stack>
      <DataQualityCard quality={q} />
      <TwoCol>
        <CoverageGauges quality={q} totalParameters={report.overall?.score_breakdown?.length} />
        <SourceTypeMix sources={sources} />
      </TwoCol>
      <SourceCoverageMatrix sources={sources} />
      <SourcesGrid sources={sources} />
      <GenerationCard generation={report.generation} />
    </Stack>
  )
}
