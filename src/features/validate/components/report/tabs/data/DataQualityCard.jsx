import React from 'react'
import { Caveats, Card, SectionHeader, Stat, StatGrid } from '@/features/validate/components/report/ui'
import { StackedBar } from '@/features/validate/components/report/charts'
import { LABEL_HEX } from '@/features/validate/components/report/lib/tones'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function DataQualityCard({ quality: q }) {
  const labels = Object.entries(q.value_labels ?? {})
  return (
    <Card>
      <SectionHeader title="Data quality" sub="How trustworthy each number in this report is" />
      <StackedBar format={(v) => `${v}`} segments={labels.map(([k, v]) => ({ label: `${titleCase(k)}`, value: v, color: LABEL_HEX[k] ?? '#94a3b8' }))} />
      <div className="mt-5">
        <StatGrid cols={4}>
          <Stat label="Parameters scored" value={q.parameters_scored} />
          <Stat label="Insufficient data" value={(q.parameters_insufficient ?? []).map(titleCase).join(', ') || 'None'} />
          <Stat label="Evidence used" value={`${q.evidence_items_used} / ${q.evidence_items_total}`} />
          <Stat label="Oldest data year" value={q.oldest_data_year} />
        </StatGrid>
      </div>
      <div className="mt-5">
        <Caveats items={q.limitations} title="Limitations" />
      </div>
    </Card>
  )
}
