import React from 'react'

export default function Stat({ label, value, sub, tone = 'text-slate-900', children }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${tone}`}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  )
}
