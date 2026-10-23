import React from 'react'

/** data: [{ label, value, color }]. Children render in the centre of the ring. */
export default function DonutChart({ data, size = 150, thickness = 22, format, children, className = '' }) {
  const items = data.filter((d) => d.value > 0)
  const total = items.reduce((a, d) => a + d.value, 0) || 1
  const r = (size - thickness) / 2
  const C = 2 * Math.PI * r
  let acc = 0
  return (
    <div className={`flex flex-wrap items-center gap-5 ${className}`}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={thickness} />
          {items.map((d, i) => {
            const len = (d.value / total) * C
            const el = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth={thickness}
                strokeDasharray={`${len} ${C - len}`}
                strokeDashoffset={-acc}
              >
                <title>{`${d.label}: ${format ? format(d.value) : d.value}`}</title>
              </circle>
            )
            acc += len
            return el
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
      </div>
      <ul className="min-w-[140px] flex-1 space-y-1.5 text-sm">
        {data.map((d, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
            <span className="flex-1 text-slate-600">{d.label}</span>
            <span className="font-medium text-slate-900">{format ? format(d.value) : d.value}</span>
            <span className="w-10 text-right text-xs text-slate-400">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
