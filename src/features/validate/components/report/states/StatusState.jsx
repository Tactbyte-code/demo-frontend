import React from 'react'
import { Notice } from '@/features/validate/components/report/ui'
import { titleCase } from '@/features/validate/components/report/lib/format'

export default function StatusState({ status }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-xl px-4 py-24">
        <Notice tone="amber" title={`Report is ${titleCase(status)}`}>
          This report is not finished yet. Check back in a moment.
        </Notice>
      </div>
    </div>
  )
}
