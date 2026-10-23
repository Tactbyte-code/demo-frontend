import React from 'react'

/** Two thin bars per row, e.g. nominal vs effective weight. rows: [{ label, a, b }] */
export default function PairedBars({ rows, aLabel, bLabel, aColor = '#cbd5e1', bColor = '#6366f1', fmt = (v) => v }) {
  const max = Math.max(...rows.flatMap((r) => [r.a, r.b]), 1)
  const Track = ({ v, c }) => (
    <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
      <div className="h-1.5 rounded-full" style={{ width: `${(v / max) * 100}%`, background: c }} />
    </div>
  )
  return (
    <div>
      <div className="mb-4 flex gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ background: aColor }} />{aLabel}</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full" style={{ background: bColor }} />{bLabel}</span>
      </div>
      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-slate-700">{r.label}</span>
              <span className="text-xs text-slate-500">
                {fmt(r.a)} → <b className="text-slate-900">{fmt(r.b)}</b>
              </span>
            </div>
            <Track v={r.a} c={aColor} />
            <Track v={r.b} c={bColor} />
          </div>
        ))}
      </div>
    </div>
  )
}
