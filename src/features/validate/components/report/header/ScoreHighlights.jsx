import React from 'react'

const Extreme = ({ tone, title, item }) => (
  <div className={`rounded-xl p-3 ${tone.box}`}>
    <p className={`text-[10px] font-semibold uppercase tracking-wide ${tone.title}`}>{title}</p>
    <div className="mt-0.5 flex items-center justify-between gap-2">
      <p className="text-sm font-medium text-slate-800">{item.label}</p>
      <span className={`text-sm font-bold ${tone.title}`}>{item.score}</span>
    </div>
  </div>
)

export default function ScoreHighlights({ breakdown, scored, evidenceUsed }) {
  const withScore = breakdown.filter((p) => p.score != null)
  if (!withScore.length) return null
  const best = withScore.reduce((a, b) => (b.score > a.score ? b : a))
  const worst = withScore.reduce((a, b) => (b.score < a.score ? b : a))
  return (
    <div className="mt-auto w-full space-y-3 pt-5">
      <Extreme tone={{ box: 'bg-emerald-50', title: 'text-emerald-700' }} title="Strongest area" item={best} />
      <Extreme tone={{ box: 'bg-rose-50', title: 'text-rose-700' }} title="Weakest area" item={worst} />
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xl font-bold text-slate-900">{scored}/{breakdown.length}</p>
          <p className="text-[10px] text-slate-500">parameters scored</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xl font-bold text-slate-900">{evidenceUsed}</p>
          <p className="text-[10px] text-slate-500">evidence items used</p>
        </div>
      </div>
    </div>
  )
}
