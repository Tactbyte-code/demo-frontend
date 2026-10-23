import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import ThemeBubbleChart from './ThemeBubbleChart'
import ThemeList from './ThemeList'

export default function ThemesSection({ themes }) {
  if (!themes?.length) return null
  return (
    <Card>
      <SectionHeader title="Pain themes" sub="Recurring themes in relevant posts — bubble position shows volume vs intensity" />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        <ThemeBubbleChart themes={themes} />
        <ThemeList themes={themes} />
      </div>
    </Card>
  )
}
