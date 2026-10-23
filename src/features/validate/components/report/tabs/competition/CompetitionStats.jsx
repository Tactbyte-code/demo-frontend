import React from 'react'
import { LevelMeter, Stat, StatGrid } from '@/features/validate/components/report/ui'
import { INCUMBENT_STRENGTH, SATURATION } from '@/features/validate/components/report/config/levels'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function CompetitionStats({ competition: c }) {
  return (
    <StatGrid cols={3}>
      <Stat label="Market saturation" value={titleCase(c.saturation)} tone="text-rose-600">
        <LevelMeter level={c.saturation} {...SATURATION} />
      </Stat>
      <Stat label="Incumbent strength" value={titleCase(c.incumbent_strength)}>
        <LevelMeter level={c.incumbent_strength} {...INCUMBENT_STRENGTH} />
      </Stat>
      <Stat label="Competitors found" value={`${c.counts?.direct ?? 0} + ${c.counts?.indirect ?? 0}`} sub="direct + indirect" />
    </StatGrid>
  )
}
