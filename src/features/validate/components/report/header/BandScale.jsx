import React from 'react'
import { scoreTone } from '@/features/validate/components/report/lib/tones'

export default function BandScale({ bands = [], activeBand, scaleNote }) {
  return (
    <>
      <div className="mt-4 flex w-full gap-1">
        {[...bands].reverse().map((b) => {
          const on = b.label === activeBand
          return (
            <div key={b.label} className="flex-1 text-center">
              <div className={`h-1.5 rounded-full ${on ? scoreTone(b.min + 1).bg : 'bg-slate-200'}`} />
              <p className={`mt-1 text-[10px] ${on ? 'font-semibold text-slate-800' : 'text-slate-400'}`}>{b.label}</p>
              <p className="text-[9px] text-slate-400">{b.min}+</p>
            </div>
          )
        })}
      </div>
      {scaleNote && <p className="mt-3 text-center text-[11px] text-slate-400">{scaleNote}</p>}
    </>
  )
}
