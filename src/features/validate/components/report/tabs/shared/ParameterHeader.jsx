'use client'

import React from 'react'
import { Bar, Card, ConfidencePill, RatingPill } from '@/features/validate/components/report/ui'
import { ScoreRing } from '@/features/validate/components/report/charts'
import { useReport } from '@/features/validate/components/report/context/ReportContext'
import { scoreTone } from '@/features/validate/components/report/lib/tones'
import { titleCase } from '@/features/validate/components/report/lib/format'

const Mini = ({ label, value }) => (
  <div>
    <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
    <p className="text-sm font-semibold text-slate-800">{value}</p>
  </div>
)

/** Top card shown on every parameter tab: score ring, rating, weight and share of the overall score. */
export default function ParameterHeader({ paramKey, score, confidence }) {
  const { report, breakdownByKey } = useReport()
  const b = breakdownByKey[paramKey]
  const tone = scoreTone(score)
  const overallScore = report.overall?.viability_score
  return (
    <Card className="flex flex-wrap items-center gap-6">
      <ScoreRing score={score} size={108} stroke={10}>
        <span className={`text-3xl font-bold ${tone.text}`}>{score ?? 'N/A'}</span>
        <span className="text-[10px] text-slate-400">/ 100</span>
      </ScoreRing>
      <div className="min-w-[220px] flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{b?.label ?? titleCase(paramKey)}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <RatingPill value={b?.rating} fallback={b?.status ?? 'No data'} />
          <ConfidencePill value={confidence ?? b?.confidence} />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4">
          <Mini label="Weight" value={b ? `${(b.weight * 100).toFixed(0)}%` : '—'} />
          <Mini label="Effective" value={b ? `${(b.effective_weight * 100).toFixed(1)}%` : '—'} />
          <Mini label="Contribution" value={b?.contribution != null ? `${b.contribution} pts` : '—'} />
        </div>
      </div>
      {b?.contribution != null && overallScore ? (
        <div className="w-full md:w-64">
          <p className="mb-1.5 text-xs text-slate-500">Share of the overall score ({overallScore})</p>
          <Bar value={b.contribution} max={overallScore} color={tone.bg} h="h-3" />
          <p className="mt-1 text-right text-xs text-slate-500">{Math.round((b.contribution / overallScore) * 100)}%</p>
        </div>
      ) : null}
    </Card>
  )
}
