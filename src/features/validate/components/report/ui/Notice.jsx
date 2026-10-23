import React from 'react'

const TONES = {
  amber: 'border-amber-200 bg-amber-50 text-amber-900',
  slate: 'border-slate-200 bg-slate-50 text-slate-700',
  rose: 'border-rose-200 bg-rose-50 text-rose-900',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-900',
}

export default function Notice({ tone = 'amber', title, children }) {
  return (
    <div className={`rounded-xl border p-4 text-sm ${TONES[tone]}`}>
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div>{children}</div>
    </div>
  )
}
