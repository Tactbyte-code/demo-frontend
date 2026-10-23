import React from 'react'

/** Single low / base / high marker on one track. */
export default function RangeBar({ low, base, high, fmt, labels = ['Low', 'Base', 'High'] }) {
  const span = high - low || 1
  const pos = ((base - low) / span) * 100
  return (
    <div>
      <div className="relative h-2 rounded-full bg-slate-200">
        <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-indigo-200" />
        <div className="absolute -top-1 h-4 w-1.5 rounded bg-indigo-600" style={{ left: `calc(${pos}% - 3px)` }} />
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-slate-500">
        <span>{labels[0]} {fmt(low)}</span>
        <span className="font-semibold text-indigo-700">{labels[1]} {fmt(base)}</span>
        <span>{labels[2]} {fmt(high)}</span>
      </div>
    </div>
  )
}
