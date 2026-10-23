import React from 'react'

/** Semi-circular gauge. `target` draws a tick (e.g. 3x LTV:CAC). */
export default function Gauge({ value, max = 100, target, color = '#6366f1', display, label, size = 220 }) {
  const cx = 100
  const cy = 100
  const r = 80
  const f = Math.max(0, Math.min(1, (value ?? 0) / max))
  const at = (frac, radius = r) => {
    const t = Math.PI * (1 - frac)
    return [cx + radius * Math.cos(t), cy - radius * Math.sin(t)]
  }
  const [ex, ey] = at(f)
  const tf = target != null ? Math.max(0, Math.min(1, target / max)) : null
  const [tx1, ty1] = tf != null ? at(tf, r - 13) : [0, 0]
  const [tx2, ty2] = tf != null ? at(tf, r + 13) : [0, 0]
  return (
    <svg viewBox="0 0 200 128" style={{ width: size, maxWidth: '100%' }} className="mx-auto">
      <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round" />
      {f > 0 && <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${ex} ${ey}`} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" />}
      {tf != null && <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#0f172a" strokeWidth="2" strokeDasharray="3 2" />}
      <text x={cx} y={cy - 6} textAnchor="middle" className="fill-slate-900 text-[26px] font-bold">
        {display ?? value}
      </text>
      {label && (
        <text x={cx} y={cy + 14} textAnchor="middle" className="fill-slate-500 text-[10px]">
          {label}
        </text>
      )}
      <text x={cx - r} y={cy + 22} textAnchor="middle" className="fill-slate-400 text-[9px]">0</text>
      <text x={cx + r} y={cy + 22} textAnchor="middle" className="fill-slate-400 text-[9px]">{max}</text>
    </svg>
  )
}
