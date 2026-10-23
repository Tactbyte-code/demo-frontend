import React from 'react'
import { Stat, StatGrid } from '@/features/validate/components/report/ui'
import { scoreTone } from '@/features/validate/components/report/lib/tones'
import { fmtNum } from '@/features/validate/components/report/lib/format'

export default function PainStats({ pain }) {
  const c = pain.counts ?? {}
  return (
    <StatGrid cols={4}>
      <Stat label="Severity band" value={pain.band} tone={scoreTone(pain.score).text} sub={`Score ${pain.score}`} />
      <Stat label="Effective sample" value={pain.effective_sample} sub="weighted evidence size" />
      <Stat label="Relevant posts" value={fmtNum(c.relevant)} sub={`of ${fmtNum(c.collected)} collected`} />
      <Stat
        label="Relevance rate"
        value={c.collected ? `${((c.relevant / c.collected) * 100).toFixed(1)}%` : '—'}
        sub={`${Object.keys(c.by_source ?? {}).length} sources searched`}
      />
    </StatGrid>
  )
}
