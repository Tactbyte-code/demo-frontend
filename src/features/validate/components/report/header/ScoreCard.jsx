import React from 'react'
import { ScoreRing } from '@/features/validate/components/report/charts'
import { ConfidencePill, Pill } from '@/features/validate/components/report/ui'
import { scoreTone } from '@/features/validate/components/report/lib/tones'
import BandScale from './BandScale'
import ScoreHighlights from './ScoreHighlights'
// import { ScoreRing } from '../charts'

export default function ScoreCard({ overall, dataQuality }) {
  const tone = scoreTone(overall.viability_score)
  return (
    <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:w-72">
      <ScoreRing score={overall.viability_score}>
        <span className={`text-5xl font-bold ${tone.text}`}>{overall.viability_score}</span>
        <span className="text-xs text-slate-500">out of 100</span>
      </ScoreRing>
      <Pill tone={tone.soft} className="mt-4 !px-4 !py-1 !text-sm">{overall.band}</Pill>
      <div className="mt-2">
        <ConfidencePill value={overall.confidence} />
      </div>
      <BandScale bands={overall.band_scale} activeBand={overall.band} scaleNote={overall.scale} />
      <ScoreHighlights
        breakdown={overall.score_breakdown}
        scored={dataQuality?.parameters_scored ?? overall.score_breakdown.filter((p) => p.score != null).length}
        evidenceUsed={dataQuality?.evidence_items_used ?? '—'}
      />
    </div>
  )
}
