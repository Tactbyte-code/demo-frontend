import React from 'react'
import { Card, Notice, SectionHeader } from '@/features/validate/components/report/ui'
import { HBarList } from '@/features/validate/components/report/charts'
import { fmtMoney } from '@/features/validate/components/report/lib/format'
import { CHART } from '@/features/validate/components/report/lib/tones'

const monthly = (p) => (p.period === 'year' ? p.amount / 12 : p.amount)

export default function PriceComparison({ competitors }) {
  const priced = competitors.filter((c) => c.price_from)
  const unpriced = competitors.filter((c) => !c.price_from)
  return (
    <Card>
      <SectionHeader title="Entry price comparison" sub="Cheapest paid or free plan per month" />
      {priced.length ? (
        <HBarList
          labelWidth="w-36"
          rows={priced.map((c) => ({
            label: c.name,
            value: monthly(c.price_from),
            display: c.price_from.amount === 0 ? 'Free' : fmtMoney(monthly(c.price_from), c.price_from.currency),
            color: CHART.indigo,
          }))}
        />
      ) : (
        <p className="text-sm text-slate-500">No fixed entry prices were found.</p>
      )}
      {unpriced.length > 0 && (
        <div className="mt-5">
          <Notice tone="slate">
            {unpriced.map((c) => c.name).join(', ')} {unpriced.length > 1 ? 'have' : 'has'} variable pricing (no fixed entry price).
          </Notice>
        </div>
      )}
    </Card>
  )
}
