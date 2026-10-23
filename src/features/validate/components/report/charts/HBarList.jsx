import React from 'react'

/** rows: [{ label, value, display?, color? (hex), sub? }] */
export default function HBarList({ rows, max, labelWidth = 'w-32', defaultColor = '#6366f1' }) {
  const m = max ?? Math.max(...rows.map((r) => r.value), 1)
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3 text-sm">
          <span className={`${labelWidth} shrink-0 text-slate-600`}>
            {r.label}
            {r.sub && <span className="block text-[11px] text-slate-400">{r.sub}</span>}
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${Math.max(0, Math.min(100, (r.value / m) * 100))}%`, background: r.color ?? defaultColor }}
            />
          </div>
          <span className="w-24 shrink-0 whitespace-nowrap text-right font-semibold text-slate-900">{r.display ?? r.value}</span>
        </div>
      ))}
    </div>
  )
}
