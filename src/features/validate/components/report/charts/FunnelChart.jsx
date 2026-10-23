import React from 'react'

/**
 * stages: [{ label, value, color, display? }]
 * mode 'proportional' sizes by value (with a floor so labels fit); 'steps' shrinks evenly (for values of very different magnitude).
 */
export default function FunnelChart({ stages, mode = 'proportional', minRatio = 0.34 }) {
  const max = Math.max(...stages.map((s) => s.value), 1)
  return (
    <div className="space-y-1.5">
      {stages.map((s, i) => {
        const ratio =
          mode === 'steps'
            ? 1 - (i * (1 - minRatio)) / Math.max(stages.length - 1, 1)
            : Math.max(s.value / max, minRatio)
        const prev = stages[i - 1]
        return (
          <div key={i}>
            {prev && mode === 'proportional' && prev.value > 0 && (
              <p className="text-center text-[11px] text-slate-400">↓ {Math.round((s.value / prev.value) * 100)}% kept</p>
            )}
            <div
              className="mx-auto flex items-center justify-between gap-3 rounded-lg px-4 py-2.5 text-white transition-all duration-700"
              style={{ width: `${ratio * 100}%`, background: s.color }}
            >
              <span className="truncate text-sm font-medium">{s.label}</span>
              <span className="shrink-0 text-sm font-bold">{s.display ?? s.value}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
