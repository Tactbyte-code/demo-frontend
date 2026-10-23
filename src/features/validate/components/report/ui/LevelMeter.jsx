import React from 'react'
import { titleCase } from '@/features/validate/components/report/lib/format'

/** Segmented meter for ordered qualitative values. Pass a preset from config/levels.js. */
export default function LevelMeter({ level, levels, colors }) {
  const idx = levels.indexOf(level)
  return (
    <div>
      <div className="flex gap-1">
        {levels.map((l, i) => (
          <div key={l} title={titleCase(l)} className="h-2 flex-1 rounded-full" style={{ background: i <= idx ? colors[i] : '#e2e8f0' }} />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-slate-400">
        <span>{titleCase(levels[0])}</span>
        <span>{titleCase(levels[levels.length - 1])}</span>
      </div>
    </div>
  )
}
