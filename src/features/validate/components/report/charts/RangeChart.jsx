import React from 'react'

/** Several low-high ranges on a shared axis (tornado style). rows: [{ label, low, base, high, color? }] */
export default function RangeChart({ rows, fmt, defaultColor = '#6366f1' }) {
  const max = Math.max(...rows.map((r) => r.high), 1)
  const pct = (v) => `${(v / max) * 100}%`
  return (
    <div className="space-y-5">
      {rows.map((r, i) => {
        const c = r.color ?? defaultColor
        return (
          <div key={i}>
            <div className="mb-1.5 flex justify-between gap-3 text-sm">
              <span className="text-slate-700">{r.label}</span>
              <span className="font-semibold text-slate-900">{fmt(r.base)}</span>
            </div>
            <div className="relative h-3 rounded-full bg-slate-100">
              <div className="absolute inset-y-0 rounded-full opacity-30" style={{ left: pct(r.low), width: `${((r.high - r.low) / max) * 100}%`, background: c }} />
              <div className="absolute -top-1 h-5 w-1.5 rounded" style={{ left: `calc(${pct(r.base)} - 3px)`, background: c }} />
            </div>
            <div className="mt-1 flex justify-between text-[11px] text-slate-400">
              <span>{fmt(r.low)}</span>
              <span>{fmt(r.high)}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
