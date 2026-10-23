import React from 'react'

/** Horizontal progress bar. `color` is a Tailwind bg class. */
export default function Bar({ value = 0, max = 1, color = 'bg-indigo-500', h = 'h-2' }) {
  const pct = Math.max(0, Math.min(100, (value / (max || 1)) * 100))
  return (
    <div className={`w-full overflow-hidden rounded-full bg-slate-100 ${h}`}>
      <div className={`${h} rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  )
}
