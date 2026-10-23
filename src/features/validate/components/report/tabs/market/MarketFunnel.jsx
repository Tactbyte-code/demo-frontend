import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { FunnelChart } from '@/features/validate/components/report/charts'
import { fmtBig, fmtNum } from '@/features/validate/components/report/lib/format'

export default function MarketFunnel({ market: m, users }) {
  const stage = (label, d, u, color) => ({
    label: `${label} · ${fmtNum(u)} users`,
    value: d?.value ?? 0,
    display: fmtBig(d?.value, d?.currency),
    color,
  })
  return (
    <Card>
      <SectionHeader title="Market funnel" sub="From everyone who could buy, down to what you can realistically capture (widths are illustrative, not to scale)" />
      <FunnelChart
        mode="steps"
        minRatio={0.55}
        stages={[stage('TAM', m.tam, users.tam, '#4f46e5'), stage('SAM', m.sam, users.sam, '#7c3aed'), stage('SOM', m.som, users.som, '#c026d3')]}
      />
    </Card>
  )
}
