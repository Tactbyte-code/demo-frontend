import React from 'react'
import { Card, Pill, SectionHeader } from '@/features/validate/components/report/ui'

export default function IndirectAlternatives({ items }) {
  if (!items?.length) return null
  return (
    <Card>
      <SectionHeader title="Indirect alternatives" sub="What users do today instead" />
      <div className="flex flex-wrap gap-2">
        {items.map((a, i) => (
          <Pill key={i} className="!px-3 !py-1 !text-sm">{a}</Pill>
        ))}
      </div>
    </Card>
  )
}
