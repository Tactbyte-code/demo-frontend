import React from 'react'

export default function VerdictBanner({ verdict }) {
  if (!verdict) return null
  return (
    <div className="mt-6 rounded-xl border-l-4 border-indigo-500 bg-indigo-50 p-4 text-sm text-indigo-950">
      <span className="font-semibold">Verdict: </span>
      {verdict}
    </div>
  )
}
