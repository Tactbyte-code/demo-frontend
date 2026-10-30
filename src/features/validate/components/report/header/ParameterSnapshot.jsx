import React from 'react'
import { Bar, Pill, RatingPill } from '@/features/validate/components/report/ui'
import { scoreTone } from '@/features/validate/components/report/lib/tones'
import { Lock } from 'lucide-react'

/** Clickable tile per parameter; selecting one opens its tab. */
export default function ParameterSnapshot({ breakdown, parameters, onSelect }) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-semibold text-slate-800">Parameter snapshot</p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {breakdown.map((p) => {
          const t = scoreTone(p.score)
          
          // Check for the new boolean flag
          const paramData = parameters?.[p.parameter]
          const isLocked = paramData?.locked === true

          return (
            <button
              key={p.parameter}
              onClick={() => onSelect(p.parameter)}
              className={`rounded-xl border border-slate-200 p-3 text-left transition hover:border-indigo-300 hover:shadow-sm ${
                isLocked ? 'bg-slate-50 opacity-80 hover:opacity-100' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-1.5">
                  {isLocked && <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />}
                  <p className={`text-xs font-medium leading-snug ${isLocked ? 'text-slate-500' : 'text-slate-600'}`}>
                    {p.label}
                  </p>
                </div>
                {!isLocked && (
                  <span className={`text-lg font-bold leading-none ${t.text}`}>{p.score ?? 'N/A'}</span>
                )}
              </div>
              
              {!isLocked && (
                <div className="mt-2">
                  <Bar value={p.score ?? 0} max={100} color={t.bg} h="h-1.5" />
                </div>
              )}
              
              <div className={`flex items-center justify-between text-[11px] text-slate-400 ${isLocked ? 'mt-5' : 'mt-2'}`}>
                <span>Weight {(p.effective_weight * 100).toFixed(0)}%</span>
                {isLocked ? (
                  <Pill className="!bg-slate-200 !px-2 !py-0 !text-[10px] !text-slate-500">Locked</Pill>
                ) : p.rating ? (
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