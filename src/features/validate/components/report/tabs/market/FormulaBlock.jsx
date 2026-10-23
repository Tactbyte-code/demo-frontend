import React from 'react'
import { LabelPill, SourceChips } from '@/features/validate/components/report/ui'
import { formatByUnit, titleCase } from '@/features/validate/components/report/lib/format'

export default function FormulaBlock({ formula, inputs = [] }) {
  const sourceIds = [...new Set(inputs.flatMap((i) => i.source_ids || []))]
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Formula</p>
      <p className="mt-1 font-mono text-sm text-slate-800">{formula}</p>
      <div className="mt-3 space-y-2">
        {inputs.map((inp, i) => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="text-slate-600">{titleCase(inp.name)}</span>
            <span className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">{formatByUnit(inp.value, inp.unit)}</span>
              <LabelPill value={inp.label} />
            </span>
          </div>
        ))}
      </div>
      {sourceIds.length > 0 && (
        <div className="mt-3">
          <SourceChips ids={sourceIds} />
        </div>
      )}
    </div>
  )
}
