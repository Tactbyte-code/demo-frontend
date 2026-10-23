import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { FunnelChart } from '@/features/validate/components/report/charts'
import { CHART } from '@/features/validate/components/report/lib/tones'

export default function EvidenceFunnel({ counts = {} }) {
  const stages = [
    { label: 'Collected', value: counts.collected, color: '#94a3b8' },
    { label: 'After de-duplication', value: counts.after_dedupe, color: CHART.sky },
    { label: 'After filtering', value: counts.after_filter, color: CHART.indigo },
    { label: 'Relevant', value: counts.relevant, color: CHART.emerald },
  ].filter((s) => s.value != null)
  return (
    <Card>
      <SectionHeader title="Evidence funnel" sub="How raw posts were narrowed down" />
      <FunnelChart stages={stages} />
    </Card>
  )
}
