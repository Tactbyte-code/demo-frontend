import React from 'react'
import { Bar, Card, ConfidencePill, DataTable, Pill, RatingPill, SectionHeader } from '@/features/validate/components/report/ui'
import { scoreTone } from '@/features/validate/components/report/lib/tones'

const COLUMNS = [
  { key: 'label', label: 'Parameter', className: 'font-medium text-slate-800' },
  { key: 'weight', label: 'Weight', align: 'right', render: (p) => `${(p.weight * 100).toFixed(0)}%` },
  { key: 'eff', label: 'Effective', align: 'right', render: (p) => `${(p.effective_weight * 100).toFixed(1)}%` },
  {
    key: 'score',
    label: 'Score',
    className: 'w-48',
    render: (p) => {
      const tone = scoreTone(p.score)
      return p.score != null ? (
        <div className="flex items-center gap-2">
          <Bar value={p.score} max={100} color={tone.bg} />
          <span className={`w-9 text-right text-sm font-semibold ${tone.text}`}>{p.score}</span>
        </div>
      ) : (
        <Pill>No data</Pill>
      )
    },
  },
  { key: 'rating', label: 'Rating', render: (p) => <RatingPill value={p.rating} fallback={p.status} /> },
  { key: 'confidence', label: 'Confidence', render: (p) => <ConfidencePill value={p.confidence} /> },
  { key: 'contribution', label: 'Contribution', align: 'right', className: 'font-semibold text-slate-800', render: (p) => p.contribution ?? '—' },
]

export default function ScoreBreakdownTable({ breakdown }) {
  return (
    <Card>
      <SectionHeader title="Score breakdown" sub="Weighted contribution of each parameter to the overall score" />
      <DataTable columns={COLUMNS} rows={breakdown} minWidth={720} />
      <p className="mt-3 text-xs text-slate-500">
        Parameters without sufficient data are excluded and their weight is redistributed across the rest.
      </p>
    </Card>
  )
}
