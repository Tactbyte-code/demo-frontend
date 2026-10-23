import React from 'react'
import { linear, ticks, round1 } from '@/features/validate/components/report/lib/scale'

/** data: [{ label, value }]. Draws a zero line automatically when values cross it. */
export default function LineChart({ data, color = '#6366f1', height = 200, fmt = round1, showValues }) {
  const W = 440
  const H = height
  const pl = 68
  const pr = 30
  const pt = 22
  const pb = 30
  const vals = data.map((d) => d.value)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const pad = (max - min || Math.abs(max) || 1) * 0.15
  let lo = min - pad
  const hi = max + pad
  if (min >= 0 && lo < 0) lo = 0
  const x = linear(0, Math.max(data.length - 1, 1), pl, W - pr)
  const y = linear(lo, hi, H - pb, pt)
  const pts = data.map((d, i) => ({ ...d, x: x(i), y: y(d.value) }))
  const line = pts.map((p) => `${p.x},${p.y}`).join(' ')
  const area = `${pts[0].x},${H - pb} ${line} ${pts[pts.length - 1].x},${H - pb}`
  const step = Math.ceil(data.length / 8)
  const labelled = showValues ?? data.length <= 6

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
      {ticks(lo, hi, 4).map((t, i) => (
        <g key={i}>
          <line x1={pl} x2={W - pr} y1={y(t)} y2={y(t)} stroke="#f1f5f9" />
          <text x={pl - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" className="fill-slate-400 text-[9px]">
            {fmt(t)}
          </text>
        </g>
      ))}
      {lo < 0 && hi > 0 && <line x1={pl} x2={W - pr} y1={y(0)} y2={y(0)} stroke="#94a3b8" strokeDasharray="4 3" />}
      <polygon points={area} fill={color} opacity="0.1" />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke={color} strokeWidth="2">
            <title>{`${p.label}: ${fmt(p.value)}`}</title>
          </circle>
          {labelled && (
            <text x={p.x} y={p.y - 10} textAnchor="middle" className="fill-slate-600 text-[10px] font-medium">
              {fmt(p.value)}
            </text>
          )}
          {i % step === 0 && (
            <text x={p.x} y={H - 10} textAnchor="middle" className="fill-slate-400 text-[10px]">
              {p.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}
