import React from 'react'
import { ConfidencePill, ExternalLink, Pill } from '@/features/validate/components/report/ui'
import { fmtDate, fmtMoney, titleCase } from '@/features/validate/components/report/lib/format'

const priceLabel = (p) => (!p ? 'Price varies' : p.amount === 0 ? 'Free tier' : `From ${fmtMoney(p.amount, p.currency)}/${p.period}`)

const Points = ({ title, items, tone }) => (
  <div>
    <p className={`mb-1 text-xs font-semibold uppercase ${tone}`}>{title}</p>
    <ul className="list-disc space-y-0.5 pl-4 text-slate-600">
      {(items ?? []).map((s, j) => (
        <li key={j}>{s}</li>
      ))}
    </ul>
  </div>
)

export default function CompetitorCard({ competitor: x }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-2">
        <ExternalLink href={x.url} className="font-semibold text-indigo-700">{x.name}</ExternalLink>
        <ConfidencePill value={x.confidence} />
      </div>
      <p className="mt-2 text-sm text-slate-600">{x.offering}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Pill>{titleCase(x.pricing_model)}</Pill>
        <Pill tone="bg-indigo-50 text-indigo-700 ring-indigo-200">{priceLabel(x.price_from)}</Pill>
      </div>
      <p className="mt-3 text-xs text-slate-500">Target: <span className="text-slate-700">{x.target_segment}</span></p>
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <Points title="Strengths" items={x.strengths} tone="text-emerald-600" />
        <Points title="Weaknesses" items={x.weaknesses} tone="text-rose-600" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
        <span>Funding: {x.funding ?? 'Not available'}</span>
        <span>Revenue: {x.revenue ?? 'Not available'}</span>
      </div>
      <div className="mt-auto flex items-center justify-between pt-3 text-xs text-slate-400">
        <ExternalLink href={x.evidence_url}>Pricing evidence</ExternalLink>
        <span>Retrieved {fmtDate(x.retrieved_at)}</span>
      </div>
    </div>
  )
}
