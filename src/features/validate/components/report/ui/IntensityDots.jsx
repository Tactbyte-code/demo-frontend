import React from 'react'

export default function IntensityDots({ n = 0, max = 5 }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`h-2 w-2 rounded-full ${i < n ? 'bg-rose-500' : 'bg-slate-200'}`} />
      ))}
    </span>
  )
}
