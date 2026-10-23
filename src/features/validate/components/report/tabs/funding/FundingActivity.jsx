import React from 'react'
import { Card, GenericData, SectionHeader } from '@/features/validate/components/report/ui'

export default function FundingActivity({ activity }) {
  if (activity == null) {
    return <p className="text-sm text-slate-500">Funding activity data is not available.</p>
  }
  return (
    <Card>
      <SectionHeader title="Funding activity" />
      <GenericData data={activity} />
    </Card>
  )
}
