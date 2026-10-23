import React from 'react'
import { linear, ticks, round1 } from '@/features/validate/components/report/lib/scale'

/** Low / base / high scenario lines with the range shaded. */
export default function BandLineChart({ labels, low, base, high, fmt = round1, height = 240 }) {
  const W = 480
  const H = height
  const pl = 64
  const pr = 16
  const pt = 16
  const pb = 30
  const hi = Math.max(...high) * 1.05
  const x = linear(0, Math.max(labels.length - 1, 1), pl, W - pr)
  const y = linear(0, hi, H - pb, pt)
  const path = (arr) => arr.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  const band = `${path(high)} ${low.map((v, i) => `${x(i)},${y(v)}`).reverse().join(' ')}`
  const step = Math.ceil(labels.length / 7)
  const series = [
    ['High', high, '#f43f5e'],
    ['Base', base, '#6366f1'],
    ['Low', low, '#10b981'],
  ]
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-3xl" role="img">
        {ticks(0, hi, 4).map((t, i) => (
          <g key={i}>
            <line x1={pl} x2={W - pr} y1={y(t)} y2={y(t)} stroke="#f1f5f9" />
            <text x={pl - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" className="fill-slate-400 text-[9px]">
              {fmt(t)}
            </text>
          </g>
        ))}
        <polygon points={band} fill="#6366f1" opacity="0.1" />
        {series.map(([name, arr, c]) => (
          <polyline key={name} points={path(arr)} fill="none" stroke={c} strokeWidth={name === 'Base' ? 2.75 : 1.75} strokeDasharray={name === 'Base' ? '' : '5 3'} strokeLinejoin="round" />
        ))}
        {labels.map((l, i) =>
          i % step === 0 ? (
            <text key={i} x={x(i)} y={H - 10} textAnchor="middle" className="fill-slate-400 text-[10px]">
              {l}
            </text>
          ) : null
        )}
        {series.map(([name, arr, c]) => (
          <circle key={name} cx={x(arr.length - 1)} cy={y(arr[arr.length - 1])} r="4" fill={c}>
            <title>{`${name}: ${fmt(arr[arr.length - 1])}`}</title>
          </circle>
        ))}
      </svg>
      <div className="mt-2 flex justify-center gap-5 text-xs text-slate-500">
        {series.map(([name, , c]) => (
          <span key={name} className="flex items-center gap-1.5">
            <i className="h-0.5 w-4" style={{ background: c }} />
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
