import React from 'react'
import { Bar, Pill, RatingPill } from '@/features/validate/components/report/ui'
import { scoreTone } from '@/features/validate/components/report/lib/tones'

/** Clickable tile per parameter; selecting one opens its tab. */
export default function ParameterSnapshot({ breakdown, onSelect }) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-semibold text-slate-800">Parameter snapshot</p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {breakdown.map((p) => {
          const t = scoreTone(p.score)
          return (
            <button
              key={p.parameter}
              onClick={() => onSelect(p.parameter)}
              className="rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-indigo-300 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium leading-snug text-slate-600">{p.label}</p>
                <span className={`text-lg font-bold leading-none ${t.text}`}>{p.score ?? 'N/A'}</span>
              </div>
              <div className="mt-2">
                <Bar value={p.score ?? 0} max={100} color={t.bg} h="h-1.5" />
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Weight {(p.effective_weight * 100).toFixed(0)}%</span>
                {p.rating ? (
                  <RatingPill value={p.rating} className="!px-2 !py-0 !text-[10px]" />
                ) : (
                  <Pill className="!px-2 !py-0 !text-[10px]">No data</Pill>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
