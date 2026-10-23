import React from 'react'
import { linear, ticks } from '@/features/validate/components/report/lib/scale'

/** points: [{ x, y, label }] — each bubble shows its 1-based index; hover for the label. */
export default function BubbleChart({ points, xLabel, yLabel, xMax, yMax, color = '#6366f1' }) {
  const W = 440
  const H = 280
  const pl = 44
  const pr = 20
  const pt = 16
  const pb = 40
  const xm = xMax ?? Math.max(...points.map((p) => p.x)) * 1.2
  const ym = yMax ?? 5
  const sx = linear(0, xm, pl, W - pr)
  const sy = linear(0, ym, H - pb, pt)
  const maxX = Math.max(...points.map((p) => p.x), 1)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
      {ticks(0, ym, 5).map((t, i) => (
        <g key={i}>
          <line x1={pl} x2={W - pr} y1={sy(t)} y2={sy(t)} stroke="#f1f5f9" />
          <text x={pl - 8} y={sy(t)} textAnchor="end" dominantBaseline="middle" className="fill-slate-400 text-[9px]">{Number(t.toFixed(1))}</text>
        </g>
      ))}
      {ticks(0, xm, 5).map((t, i) => (
        <text key={i} x={sx(t)} y={H - pb + 14} textAnchor="middle" className="fill-slate-400 text-[9px]">{Math.round(t)}</text>
      ))}
      <text x={(pl + W - pr) / 2} y={H - 6} textAnchor="middle" className="fill-slate-500 text-[10px]">{xLabel}</text>
      <text transform={`translate(11 ${(pt + H - pb) / 2}) rotate(-90)`} textAnchor="middle" className="fill-slate-500 text-[10px]">{yLabel}</text>
      {points.map((p, i) => {
        const r = 11 + (p.x / maxX) * 8
        return (
          <g key={i}>
            <circle cx={sx(p.x)} cy={sy(p.y)} r={r} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2">
              <title>{`${p.label} — ${p.x} posts, intensity ${p.y}/5`}</title>
            </circle>
            <text x={sx(p.x)} y={sy(p.y)} textAnchor="middle" dominantBaseline="central" className="fill-indigo-800 text-[11px] font-bold">{i + 1}</text>
          </g>
        )
      })}
    </svg>
  )
}
