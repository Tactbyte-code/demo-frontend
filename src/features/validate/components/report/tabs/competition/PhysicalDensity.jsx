import React from 'react'
import { Card, GenericData, Notice, SectionHeader } from '@/features/validate/components/report/ui'

export default function PhysicalDensity({ density }) {
  if (density == null) {
    return <Notice tone="slate">Physical competitor density does not apply to this digital business.</Notice>
  }
  return (
    <Card>
      <SectionHeader title="Physical competitor density" />
      <GenericData data={density} />
    </Card>
  )
}
