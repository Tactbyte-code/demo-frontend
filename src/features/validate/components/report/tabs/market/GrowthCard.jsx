import React from 'react'
import { Card, ConfidencePill, LabelPill, SectionHeader, SourceChips } from '@/features/validate/components/report/ui'
import { LineChart } from '@/features/validate/components/report/charts'
import { fmtMoney, fmtPct } from '@/features/validate/components/report/lib/format'

/** TAM compounded at the reported CAGR across the stated horizon (derived, illustrative). */
const project = (tam, growth) => {
  const match = String(growth?.horizon ?? '').match(/(\d{4})\D+(\d{4})/)
  if (!match || !tam?.value || growth?.cagr_pct == null) return null
  const [start, end] = [Number(match[1]), Number(match[2])]
  return Array.from({ length: end - start + 1 }, (_, i) => ({
    label: String(start + i),
    value: tam.value * Math.pow(1 + growth.cagr_pct / 100, i),
  }))
}

export default function GrowthCard({ growth, tam }) {
  if (!growth) return null
  const series = project(tam, growth)
  return (
    <Card>
      <SectionHeader title="Market growth" sub="Growth outlook" />
      <div className="flex items-end gap-3">
        <p className="text-4xl font-bold text-emerald-600">{fmtPct(growth.cagr_pct)}</p>
        <p className="pb-1 text-sm text-slate-500">CAGR · {growth.horizon}</p>
      </div>
      <p className="mt-3 text-sm text-slate-600">{growth.basis}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <LabelPill value={growth.label} />
        <ConfidencePill value={growth.confidence} />
      </div>
      {series && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="mb-1 text-xs text-slate-500">TAM if it compounds at this rate (illustrative projection)</p>
          <LineChart data={series} color="#10b981" fmt={(v) => fmtMoney(tam.currency === "INR" ? Math.round(v / 1e7) * 1e7 : Math.round(v), tam.currency)} height={190} />
        </div>
      )}
      <div className="mt-3">
        <SourceChips ids={growth.source_ids} />
      </div>
    </Card>
  )
}
