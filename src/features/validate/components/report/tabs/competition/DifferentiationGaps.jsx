import React from 'react'
import { BulletList, Card, SectionHeader } from '@/features/validate/components/report/ui'

export default function DifferentiationGaps({ items }) {
  if (!items?.length) return null
  return (
    <Card className="border-emerald-200 bg-emerald-50/40">
      <SectionHeader title="Differentiation gaps" sub="Where you can stand out" />
      <BulletList items={items} icon="★" iconClass="text-emerald-600" />
    </Card>
  )
}
