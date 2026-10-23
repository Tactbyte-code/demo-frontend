import React from 'react'
import { Card, LabelPill, Pill } from '@/features/validate/components/report/ui'
import { RangeBar } from '@/features/validate/components/report/charts'
import { fmtBig, fmtMoney, fmtNum, titleCase } from '@/features/validate/components/report/lib/format'
import FormulaBlock from './FormulaBlock'

/** One of TAM / SAM / SOM: headline value, low-base-high range, and the formula that produced it. */
export default function MarketLevelCard({ name, desc, data, users, userNoun, color }) {
  if (!data) return null
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md px-2 py-0.5 text-xs font-bold text-white" style={{ background: color }}>{name}</span>
            <p className="text-sm text-slate-500">{desc}</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">{fmtBig(data.value, data.currency)}</p>
          <p className="mt-1 text-xs text-slate-500">{fmtNum(users)} {userNoun} users</p>
        </div>
        <div className="flex gap-2">
          <LabelPill value={data.label} />
          <Pill>{titleCase(data.method)}</Pill>
        </div>
      </div>
      {data.range && (
        <div className="mt-5">
          <RangeBar low={data.range.low} base={data.range.base} high={data.range.high} fmt={(v) => fmtMoney(v, data.currency)} />
        </div>
      )}
      <div className="mt-5">
        <FormulaBlock formula={data.formula} inputs={data.inputs} />
      </div>
    </Card>
  )
}
