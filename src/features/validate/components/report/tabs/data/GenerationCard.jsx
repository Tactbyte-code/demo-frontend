import React from 'react'
import { Card, SectionHeader, Stat, StatGrid } from '@/features/validate/components/report/ui'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function GenerationCard({ generation: g }) {
  if (!g) return null
  const calls = Object.entries(g.llm_calls ?? {})
  return (
    <Card>
      <SectionHeader title="Generation details" sub="How this report was produced" />
      <StatGrid cols={4}>
        <Stat label="Pipeline" value={`v${g.pipeline_version}`} />
        <Stat label="Model" value={g.llm_model} sub={titleCase(g.llm_provider)} />
        <Stat label="Duration" value={`${g.duration_seconds}s`} />
        <Stat label="LLM calls" value={calls.reduce((a, [, v]) => a + v, 0)} sub={calls.map(([k, v]) => `${v} ${k.replace(/_/g, ' ')}`).join(' · ')} />
      </StatGrid>
    </Card>
  )
}
