import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { DonutChart } from '@/features/validate/components/report/charts'
import { CHART, PALETTE } from '@/features/validate/components/report/lib/tones'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function LandscapeCharts({ counts = {}, direct }) {
  const models = Object.entries(
    direct.reduce((acc, d) => ({ ...acc, [d.pricing_model]: (acc[d.pricing_model] ?? 0) + 1 }), {})
  )
  return (
    <Card>
      <SectionHeader title="Competitive landscape" sub="Who you are up against and how they charge" />
      <p className="mb-2 text-sm font-medium text-slate-800">Direct vs indirect</p>
      <DonutChart
        size={120}
        thickness={18}
        data={[
          { label: 'Direct competitors', value: counts.direct ?? 0, color: CHART.rose },
          { label: 'Indirect alternatives', value: counts.indirect ?? 0, color: CHART.amber },
        ]}
      >
        <span className="text-xl font-bold">{(counts.direct ?? 0) + (counts.indirect ?? 0)}</span>
      </DonutChart>
      {models.length > 0 && (
        <div className="mt-6 border-t border-slate-100 pt-5">
          <p className="mb-2 text-sm font-medium text-slate-800">Pricing models (profiled competitors)</p>
          <DonutChart
            size={120}
            thickness={18}
            data={models.map(([k, v], i) => ({ label: titleCase(k), value: v, color: PALETTE[i % PALETTE.length] }))}
          />
        </div>
      )}
    </Card>
  )
}
