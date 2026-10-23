import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { RadarChart } from '@/features/validate/components/report/charts'
import { paramShort } from '@/features/validate/components/report/config/parameters'

export default function ScoreRadar({ breakdown }) {
  return (
    <Card>
      <SectionHeader title="Parameter profile" sub="All nine parameters on one 0–100 scale; unscored ones sit at the centre" />
      <RadarChart axes={breakdown.map((p) => ({ label: paramShort(p.parameter), value: p.score }))} />
    </Card>
  )
}
