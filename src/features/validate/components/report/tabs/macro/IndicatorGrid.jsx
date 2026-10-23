import React from 'react'
import IndicatorCard from './IndicatorCard'

export default function IndicatorGrid({ indicators = [] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {indicators.map((i, k) => (
        <IndicatorCard key={k} indicator={i} />
      ))}
    </div>
  )
}
