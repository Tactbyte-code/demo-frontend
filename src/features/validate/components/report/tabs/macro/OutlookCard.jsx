import React from 'react'
import { Card, LevelMeter } from '@/features/validate/components/report/ui'
import { OUTLOOK } from '@/features/validate/components/report/config/levels'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function OutlookCard({ outlook }) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Macro outlook</p>
      <p className="mb-4 mt-1 text-2xl font-semibold text-emerald-600">{titleCase(outlook)}</p>
      <LevelMeter level={outlook} {...OUTLOOK} />
    </Card>
  )
}
