import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import CompetitorCard from './CompetitorCard'

export default function CompetitorGrid({ competitors, totalDirect }) {
  return (
    <Card>
      <SectionHeader title="Direct competitors" sub={`${totalDirect ?? competitors.length} identified; ${competitors.length} profiled`} />
      <div className="grid gap-4 lg:grid-cols-3">
        {competitors.map((x, i) => (
          <CompetitorCard key={i} competitor={x} />
        ))}
      </div>
    </Card>
  )
}
