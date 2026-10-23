import React from 'react'
import { titleCase } from '@/features/validate/components/report/lib/format'

/** Renders any JSON value readably. Used for nullable blocks whose shape is not fixed (e.g. funding_activity). */
export default function GenericData({ data }) {
  if (data == null) return null
  if (Array.isArray(data))
    return (
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
        {data.map((d, i) => (
          <li key={i}>
            <GenericData data={d} />
          </li>
        ))}
      </ul>
    )
  if (typeof data === 'object')
    return (
      <dl className="divide-y divide-slate-100 text-sm">
        {Object.entries(data).map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-2">
            <dt className="text-slate-500">{titleCase(k)}</dt>
            <dd className="text-right font-medium text-slate-800">
              <GenericData data={v} />
            </dd>
          </div>
        ))}
      </dl>
    )
  return <span>{String(data)}</span>
}
