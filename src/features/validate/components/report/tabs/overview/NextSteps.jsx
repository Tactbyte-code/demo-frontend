import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'

export default function NextSteps({ steps }) {
  if (!steps?.length) return null
  return (
    <Card>
      <SectionHeader title="Recommended next steps" />
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">{i + 1}</span>
            <span className="text-sm text-slate-700">{s}</span>
          </li>
        ))}
      </ol>
    </Card>
  )
}
