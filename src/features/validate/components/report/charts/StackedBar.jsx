import React from 'react'

/** segments: [{ label, value, color }]. `format` controls the legend value; default is % share. */
export default function StackedBar({ segments, height = 'h-4', format }) {
  const items = segments.filter((s) => s.value > 0)
  const total = items.reduce((a, s) => a + s.value, 0) || 1
  return (
    <div>
      <div className={`flex overflow-hidden rounded-full bg-slate-100 ${height}`}>
        {items.map((s, i) => (
          <div key={i} style={{ width: `${(s.value / total) * 100}%`, background: s.color }} title={`${s.label}: ${format ? format(s.value) : s.value}`} />
        ))}
      </div>
      <div className="mt-3 grid gap-1.5 text-xs text-slate-600 sm:grid-cols-2">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
            <span className="truncate">{s.label}</span>
            <span className="ml-auto font-medium text-slate-800">
              {format ? format(s.value) : `${Math.round((s.value / total) * 100)}%`}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
