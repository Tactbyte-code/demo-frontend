import React from 'react'
import { BubbleChart } from '@/features/validate/components/report/charts'

export default function ThemeBubbleChart({ themes }) {
  return (
    <BubbleChart
      xLabel="Posts mentioning the theme"
      yLabel="Average intensity (1–5)"
      yMax={5}
      points={themes.map((t) => ({ x: t.post_count, y: t.avg_intensity, label: t.label }))}
    />
  )
}
