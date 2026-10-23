import React from 'react'

/** axes: [{ label, value }] — null values plot at the centre and read "N/A". */
export default function RadarChart({ axes, max = 100, size = 320, color = '#6366f1' }) {
  const W = size + 140
  const H = size
  const cx = W / 2
  const cy = H / 2
  const R = size / 2 - 55
  const n = axes.length
  const angle = (i) => (Math.PI * 2 * i) / n - Math.PI / 2
  const pt = (i, v) => [cx + (v / max) * R * Math.cos(angle(i)), cy + (v / max) * R * Math.sin(angle(i))]
  const ring = (k) => axes.map((_, i) => pt(i, max * k).join(',')).join(' ')
  const shape = axes.map((a, i) => pt(i, a.value ?? 0).join(',')).join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-lg" role="img" aria-label="Radar chart">
      {[0.25, 0.5, 0.75, 1].map((k) => (
        <polygon key={k} points={ring(k)} fill={k === 1 ? '#f8fafc' : 'none'} stroke="#e2e8f0" />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pt(i, max)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e2e8f0" />
      })}
      <polygon points={shape} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {axes.map((a, i) => {
        const [x, y] = pt(i, a.value ?? 0)
        return (
          <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke={a.value == null ? '#94a3b8' : color} strokeWidth="2">
            <title>{`${a.label}: ${a.value ?? 'N/A'}`}</title>
          </circle>
        )
      })}
      {axes.map((a, i) => {
        const [x, y] = pt(i, max * 1.17)
        const cos = Math.cos(angle(i))
        const anchor = Math.abs(cos) < 0.25 ? 'middle' : cos > 0 ? 'start' : 'end'
        return (
          <text key={i} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" className="fill-slate-600 text-[11px] font-medium">
            {a.label}
            <tspan x={x} dy="13" className="fill-slate-400 text-[10px]">
              {a.value ?? 'N/A'}
            </tspan>
          </text>
        )
      })}
    </svg>
  )
}
