import React from 'react'
import { BulletList, Card, SectionHeader } from '@/features/validate/components/report/ui'

export default function TimingNotes({ notes }) {
  if (!notes?.length) return null
  return (
    <Card>
      <SectionHeader title="Timing notes" />
      <BulletList items={notes} />
    </Card>
  )
}
