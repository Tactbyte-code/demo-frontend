import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { Gauge } from '@/features/validate/components/report/charts'
import { CHART } from '@/features/validate/components/report/lib/tones'

export default function HealthGauge({ ratio }) {
  if (ratio == null) return null
  const color = ratio >= 3 ? CHART.emerald : ratio >= 1 ? CHART.amber : CHART.rose
  return (
    <Card>
      <SectionHeader title="LTV : CAC" sub="Lifetime value earned per rupee spent on acquiring a customer" />
      <Gauge value={ratio} max={6} target={3} display={`${ratio}x`} label="dashed tick = 3x healthy threshold" color={color} size={260} />
      <p className="mt-2 text-center text-sm text-slate-600">
        {ratio >= 3 ? 'Above the 3x rule of thumb' : ratio >= 1 ? 'Positive, but under the 3x rule of thumb' : 'Customers cost more than they return'}
      </p>
    </Card>
  )
}
