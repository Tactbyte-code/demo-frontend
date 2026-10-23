import React from 'react'
import { LevelMeter, Pill, Stat, StatGrid } from '@/features/validate/components/report/ui'
import { COMPLEXITY } from '@/features/validate/components/report/config/levels'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function RegulatoryStats({ complexity, legalReview }) {
  return (
    <StatGrid cols={2}>
      <Stat label="Regulatory complexity" value={titleCase(complexity)}>
        <LevelMeter level={complexity} {...COMPLEXITY} />
      </Stat>
      <Stat label="Legal review" value={legalReview ? 'Recommended' : 'Not flagged'} tone={legalReview ? 'text-amber-600' : 'text-emerald-600'}>
        <Pill>{legalReview ? 'Talk to a professional before launch' : 'No specific flag'}</Pill>
      </Stat>
    </StatGrid>
  )
}
