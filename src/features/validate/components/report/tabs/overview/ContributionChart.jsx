import React from 'react'
import { Card, SectionHeader } from '@/features/validate/components/report/ui'
import { HBarList, StackedBar } from '@/features/validate/components/report/charts'
import { paramShort } from '@/features/validate/components/report/config/parameters'
import { PALETTE, scoreTone } from '@/features/validate/components/report/lib/tones'

export default function ContributionChart({ breakdown, viability }) {
  const segments = breakdown
    .map((p, i) => ({ label: paramShort(p.parameter), value: p.contribution ?? 0, color: PALETTE[i % PALETTE.length] }))
    .filter((s) => s.value > 0)
  const rows = breakdown.map((p) => ({
    label: paramShort(p.parameter),
    value: p.score ?? 0,
    display: p.score ?? 'N/A',
    color: scoreTone(p.score).ring,
  }))
  return (
    <Card>
      <SectionHeader title="How the score adds up" sub={`Weighted points contributing to the ${viability} overall score`} />
      <StackedBar segments={segments} format={(v) => `${v} pts`} />
      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="mb-3 text-sm font-medium text-slate-800">Score by parameter</p>
        <HBarList rows={rows} max={100} labelWidth="w-24" />
      </div>
    </Card>
  )
}
