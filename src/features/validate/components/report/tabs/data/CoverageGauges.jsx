import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { Gauge } from '@/features/validate/components/report/charts'
import { CHART } from '@/features/validate/components/report/lib/tones'

export default function CoverageGauges({ quality: q, totalParameters }) {
  return (
    <Card>
      <SectionHeader title="Coverage" sub="How much of the evidence and how many parameters made it into the score" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="text-center">
          <Gauge value={q.evidence_items_used ?? 0} max={q.evidence_items_total || 1} display={`${q.evidence_items_used}`} label={`of ${q.evidence_items_total} items`} color={CHART.indigo} size={190} />
          <p className="text-sm font-medium text-slate-700">Evidence used</p>
        </div>
        <div className="text-center">
          <Gauge value={q.parameters_scored ?? 0} max={totalParameters || 9} display={`${q.parameters_scored}`} label={`of ${totalParameters} parameters`} color={CHART.emerald} size={190} />
          <p className="text-sm font-medium text-slate-700">Parameters scored</p>
        </div>
      </div>
    </Card>
  )
}
